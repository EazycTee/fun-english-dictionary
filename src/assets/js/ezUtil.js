// ezUtil
// @eazyc www.eazyc.info

var ezUtil = {

  // 简单的函数去抖
  debounce: function (idle, action) {
    var last
    function debouncer () {
      clearTimeout(last)
      var me = this
      var args = arguments
      last = setTimeout(function () {
        action.apply(me, args)
      }, idle)
      return last
    }
    return debouncer
  },

  // 本地存储
  localStorage: {
    getJSON: function (name) {
      var item
      try {
        item = JSON.parse(localStorage.getItem(name))
      } catch (e) { console.log(e) }
      return item
    },
    setJSON: function (name, obj) {
      try {
        localStorage.setItem(name, JSON.stringify(obj))
      } catch (e) { console.log(e) }
    }
  },

  // 本地存储管理 (有容量上限)
  localStorageMgr: (function (params) {
    // 配置
    var defaultOpt = {
      max: 300, // 储存容量上限 (条)
      lastestVersion: '0.1.1' // 更新版本号以在旧用户的环境生效
    }

    var catalog = {
      nextIndex: 0,
      max: defaultOpt.max,
      version: defaultOpt.lastestVersion,
      data: []
    }
    function getItemIndex (name) {
      try {
        var item = JSON.parse(localStorage.getItem('[catalog]'))
      } catch (e) { console.log(e) }

      // 不使用旧版本的数据
      item = (item && item.version && item.version !== defaultOpt.lastestVersion) ? null : item
      catalog = item === null ? catalog : item

      return catalog.data.indexOf(name)
    }
    function markItem (name, str) {
      var item
      try {
        item = JSON.parse(localStorage.getItem('[catalog]'))
      } catch (e) { console.log(e) }

      // 不使用旧版本的数据
      item = (item && item.version && item.version !== defaultOpt.lastestVersion) ? null : item
      catalog = item === null ? catalog : item

      var index = catalog.data.indexOf(name)
      if (index >= 0) { // 目录有记录
        if (localStorage.getItem('[data-' + index + ']')) {
          // 对应的数据已存在，什么都不做
        } else {
          // 对应的数据已丢失，更新数据
          localStorage.setItem('[data-' + index + ']', str)
        }
      } else { // 目录无记录
        var nextIndex = catalog.nextIndex

        // 更新对应的数据
        localStorage.setItem('[data-' + nextIndex + ']', str)

        // 更新目录
        catalog.data[nextIndex] = name
        catalog.nextIndex = nextIndex >= catalog.max ? 0 : nextIndex + 1
        try {
          localStorage.setItem('[catalog]', JSON.stringify(catalog))
        } catch (e) { console.log(e) }
      }
    }

    // 接口暴露
    return {
      getJSON: function (name) {
        var index = getItemIndex(name)
        var res = null
        try {
          res = JSON.parse(localStorage.getItem('[data-' + index + ']'))
        } catch (e) { console.log(e) }
        return res
      },
      setJSON: function (name, obj) {
        var str = ''
        try {
          str = JSON.stringify(obj)
        } catch (e) { console.log(e) }
        markItem(name, str)
      }
    }
  })(),

  // 回到顶部
  scrollToTop: function () {
    document.documentElement.scrollTop = 0
    window.scrollTo(0, 0)
  }
}

export default ezUtil
