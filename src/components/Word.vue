<template>
  <div id="wordWrapper" class="word">
    <div class="inputLoaderWrapper fixed" v-show="isGettingNewWord">
      <div class="loader ball-scale-multiple">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-if="isError" class="wrapper errorWrapper">
      {{ errorMsg }}
    </div>
    <descriptions v-if="!isError" :source="source"></descriptions>
  </div>
</template>

<script>
import axios from 'axios'
import ez from '../assets/js/ezUtil.js'
import descriptions from './Descriptions.vue'
import config from '../assets/js/config.ez.js'

export default {
  name: 'word',
  components: {
    descriptions
  },
  data () {
    return {
      source: '',
      isGettingNewWord: false,
      isError: false,
      errorMsg: '',
      axiosSource: axios.CancelToken.source()
    }
  },
  computed: {
    viewStyle () {
      let height = window.innerHeight - 52
      return `height: ${height}px`
    },
    kw () {
      return this.$route.params.keyword.toLowerCase()
    }
  },
  methods: {
    searchWord (kw) {
      let me = this

      // 取消上一次请求，更新 token
      // me.axiosSource.cancel()
      // me.axiosSource = axios.CancelToken.source()

      // UI 渲染
      me.isGettingNewWord = true
      function refreshSource (source) {
        if (source.results) {
          me.source = source
          me.isError = false
          // ez.scrollToTop()
          me.isGettingNewWord = false

          // 更新历史记录
          var historyLength = config.historyLength
          var history = ez.localStorage.getJSON("history") || []
          history = history.length > length ? history.slice(length,) : history
          history.indexOf(me.kw) >= 0 && history.splice(history.indexOf(me.kw), 1)
          history.unshift(me.kw)
          ez.localStorage.setJSON('history', history)
        } else {
          handleError('word not found')
        }
      }

      // 错误处理
      function handleError (msg) {
        me.isError = true
        me.errorMsg = msg
        me.isGettingNewWord = false
      }
      
      // 尝试从 localStorage 获取数据，如果为空，发送 Ajax
      let source = ez.localStorageMgr.getJSON('[wd]' + kw)
      if(source) {
        refreshSource(source)
      } else {
        axios.get(`${config.requestPrefix.words}?keyword=${kw}`, { cancelToken: me.axiosSource.token })
          .then(function (res,b,c) {
            if(me.kw === kw) {
              if (res.status === 200 && res.data && res.data.word) { // 数据正常
                ez.localStorageMgr.setJSON('[wd]' + kw, res.data)
                refreshSource(res.data)
              } else if (res.data && res.data.success === false) {
                handleError('word not found')
              } else {
                handleError('Sorry, there\'s something wrong with the server, just try again later...')
              }
            } else {
              if (res.status === 200 && res.data && res.data.word) { // 数据正常
                ez.localStorageMgr.setJSON('[wd]' + kw, res.data)
              }
            }
          }).catch(function (e) {
            console.log(e)
            if(me.kw === kw) {
              handleError('Sorry, there\'s something wrong with the server, just try again later :(')
            }
          })
      }
    }
  },
  mounted: function () {
    let me = this
    me.searchWord(me.kw)
  },
  watch: {
    // 路由变化不会触发 Vue 实例的生命周期钩子，此处对路由变化作出响应
    $route (to, from) {
      let me = this
      me.searchWord(me.kw)
      me.isError = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputLoaderWrapper .loader {
  top: 5rem;
}
</style>
