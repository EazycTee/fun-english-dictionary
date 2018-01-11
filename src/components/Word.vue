<template>
  <div id="wordWrapper" class="word">
    <div class="inputLoaderWrapper" v-show="isGettingNewWord">
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
import config from '../assets/js/config.js'

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
      errorMsg: ''
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
    searchWord () {
      let me = this
      let source = ez.localStorage.get('[wd]' + me.kw)
      if(!source) {
        me.isGettingNewWord = true
        axios.get(`${config.requestPrefix.words}?keyword=${me.kw}`)
          .then(function (res,b,c) {
            if (res.status === 200 && res.data && res.data.results) { // 数据正常
              me.source = res.data
              me.isError = false
              ez.localStorage.set('[wd]' + me.kw, res.data)
            } else if (res.data && !res.data.results && res.data.word) {
              console.log(res.message)
              me.isError = true
              me.errorMsg = 'word not found'
            } else if (res.data && res.data.success === false) {
              console.log(res.message)
              me.isError = true
              me.errorMsg = 'word not found'
            } else {
              me.isError = true
              me.errorMsg = 'Sorry, some bad things happened here, just try again later...'
            }
          }).catch(function (e) {
            console.log(e)
            me.isError = true
            me.errorMsg = 'Sorry, there\'s something wrong here, just try again later...'
          }).then(function () {
            me.isGettingNewWord = false
          })
      } else {
        me.source = source
        me.isError = false
      }
    }
  },
  mounted: function () {
    let me = this
    me.searchWord()
  },
  watch: {
    // 路由变化不会触发 Vue 实例的生命周期钩子，此处对路由变化作出响应
    $route (to, from) {
      let me = this
      me.searchWord()
      me.isError = false
      ez.scrollToTop()
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
