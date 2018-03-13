<template>
  <div id="listWrapper" class="list">
    <div class="inputLoaderWrapper fixed" v-show="isRefreshingList && currentPage === 1">
      <div class="loader pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <ul v-show="(currentPage === 1 && !isUnusualNew) || currentPage > 1">
      <li @click="handleClickWord(encodeURIComponent(word.trim()))" v-for="(word, index) in wordList" :key="index">{{ word }}</li>
    </ul>
    <div v-show="isUnusualNew" class="wrapper error">
      {{ errorMsg }}
    </div>
    <div v-show="isAllIn && !isUnusualNew" class="wrapper msg">there's nothing more</div>
    <div v-show="!isAllIn && !isUnusualNew && total > 0" class="wrapper bottomWrapper">
      <div v-show="isLoadingMore" class="loader pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-show="isUnusualMore" class="error">
        {{ errorMsg }}
      </div>
      <div v-show="!isLoadingMore" class="loadMore" @click="loadMore">more...</div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import ez from '../assets/js/ezUtil.js'
import config from '../assets/js/config.ez.js'

export default {
  name: 'list',
  data () {
    return {
      wordList: [],
      currentPage: 1,
      isUnusualNew: false,
      isUnusualMore: false,
      errorMsg: '',
      isRefreshingList: true,
      isLoadingMore: false,
      isAllIn: false,
      total: 0,
      axiosSource: axios.CancelToken.source()
    }
  },
  computed: {
    kw () {
      return this.$route.params.keyword.toLowerCase()
    },
    requestUrl () {
      let me = this
      let url = ''
      if (me.kw.indexOf('*') >= 0) {
        let kwFix = me.kw.replace(/\*/g, '.*')
        url = `${config.requestPrefix.search}?keyword=^${kwFix}$&page=${me.currentPage}`
      } else {
        // url = `./src/assets/data/${kwFix}.p${me.currentPage}.json`
        url = `${config.requestPrefix.search}?keyword=^${me.kw}.*$&page=${me.currentPage}`
      }
      return url
    }
  },
  methods: {

    // 检验词语是否已全部请求回来并显示
    checkAllIn () {
      let me = this
      me.isAllIn = me.wordList.length >= me.total ? true : false
    },

    // 获取全新的相关词汇列表
    newList (kw) {
      let me = this
      me.currentPage = 1

      // 取消上一次请求，更新 token
      // me.axiosSource.cancel()
      // me.axiosSource = axios.CancelToken.source()

      // UI 渲染
      me.isRefreshingList = true
      function refreshList (data) {
        if (!me.isUnusualNew) {
          me.wordList = data.results.data
        }
        me.isRefreshingList = false
        // ez.scrollToTop()
        me.checkAllIn()
      }

      // 数据处理
      function handleData (data) {
        let total = me.total = data.results.total
        if (total > 0) { // 有词条
          refreshList(data)
          me.isUnusualNew = false
        } else {
          handleError('words not found')
        }
      }

      // 错误处理
      function handleError (msg) {
        if (me.kw === kw) {
          me.isUnusualNew = true
          me.errorMsg = msg
          refreshList()
        }
      }

      // 尝试从 localStorage 获取数据，如果为空，发送 Ajax
      let data = ez.localStorageMgr.getJSON('[wl-p1]' + me.kw)
      if (data) {
        handleData(data)
      } else {
        axios.get(me.requestUrl, { cancelToken: me.axiosSource.token })
          .then(function (res) {
            var data = res.data
            if (res.status === 200 && data && data.results && data.results.data && data.results.total > -1) { // 数据正常
              ez.localStorageMgr.setJSON('[wl-p1]' + kw, data)
              if (me.kw === kw) {
                handleData(data)
              }
            } else {
              handleError('Sorry, there\'s something wrong with the server, just try again later...')
            }
          })
          .catch(function(thrown) {
            console.log(thrown)
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              handleError('Sorry, there\'s something wrong here, just try again later :(')
            }
          })
      }
    },

    // 获取当前词汇的下一页
    loadMore () {
      let me = this
      me.currentPage += 1

      // UI 渲染
      me.isLoadingMore = true
      function updateList (data) {
        if (!me.isUnusualMore) {
          me.wordList = me.wordList.concat(data.results.data)
        }
        me.isLoadingMore = false
        me.checkAllIn()
      }

      // 数据处理
      function handleData (data) {
        me.isUnusualMore = false
        updateList(data)
      }

      // 错误处理
      function handleError (msg) {
        me.currentPage -= 1
        me.isUnusualMore = true
        me.errorMsg = msg
        updateList()
      }
      
      // 获取数据
      axios
        .get(me.requestUrl)
        .then(function (res) {
          var data = res.data
          if (res.status === 200 && data && data.results && data.results.data && data.results.total > -1) { // 数据正常
            handleData(data)
          } else {
            handleError('Sorry, there\'s something wrong here, just try again later...')
          }
        })
        .catch(function(thrown) {
          handleError('Sorry, there\'s something wrong here, just try again later :(')
        })
    },
    handleClickWord (wordEncoded) {
      router.push('/word/' + wordEncoded)
    }
  },
  mounted () {
    this.newList(this.kw)
  },
  watch: {
    // 路由变化不会触发 Vue 实例的生命周期钩子，此处对路由变化作出响应
    $route (to, from) {
      this.newList(this.kw)
    }
  }
};
</script>

<style scoped>
li {
  padding: .8rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin: 0 1rem;
}
li:first-of-type {
  margin-top: .2rem;
}
.bottomWrapper {
  position: relative;
  padding: 2rem;
}
.bottomWrapper .loader {
  left: 50%;
  position: relative;
  height: 3rem;
  width: 3rem;
}
.bottomWrapper .loader>div {
  background-color: #ccc;
  border-color: #ccc;
}
.pacman > div:first-of-type, .pacman > div:nth-child(2) {
  border-right-color: transparent;
  background-color: transparent;
}
.bottomWrapper .error {
  padding-bottom: 2rem;
}
.btnWrapper {
  padding-top: 0;
}
.loadMore {
  border: 1px solid #ccc;
  height: 3rem;
  line-height: 3rem;
  width: auto;
  margin: auto;
  text-align: center;
  border-radius: 2rem;
  background-color: #eee;
}
</style>
