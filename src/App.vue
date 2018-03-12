<template>
  <div id="app">
    <div class="searchBar fixed">
      <div class="inputWrapper">
        <form @submit.prevent="goToWord"> 
          <input type="text" @focus="handleFocus" @input="handleInput" v-model="keyword" icon="ios-clock-outline" placeholder="word to search...">
          <div class="clearBtn" @click="goHome" v-show="!!keyword"></div>
        </form>
      </div>
      <div class="starFiveBg" :class="{active : isStar}">★</div>
    </div>
    <router-view class="routerView" />
  </div>
</template>

<script>
import './assets/css/global.css'
import './assets/css/loaders-reduce.css'
import router from './router'
import ez from './assets/js/ezUtil'

export default {
  name: "app",
  data() {
    return {
      keyword: this.$route.params.keyword || "",
      isStar: false,
      toNarrowDown: false,
      toWiden: false
    };
  },
  computed: {
    isPageWord() {
      let me = this;
      return me.$route.name === "word";
    },
    keywordEncoded() {
      let str = this.keyword || "";
      return encodeURIComponent(str.trim());
    }
  },
  methods: {
    handleStar() {
      let me = this;
      me.isStar = !me.isStar;
    },
    handleFocus() {
      let me = this;
      if (router.history.current.name !== "list") {
        me.goTo();
        ez.scrollToTop();
      }
    },
    handleInput: ez.debounce(300, function() {
      let me = this;
      me.goTo();
    }),
    goHome() {
      router.push("/");
    },
    goTo() {
      let me = this;
      if (me.keywordEncoded === "") {
        router.push("/");
      } else {
        router.push("/list/" + me.keywordEncoded);
      }
    },
    goToWord () {
      let me = this
      if (me.keyword.trim().indexOf('*') === -1) { // 用户输入不含'*'
        clearTimeout(me.handleInput())
        router.push('/word/' + me.keywordEncoded)
      } else { // 用户输入含'*'
        return
      }
    }
  },
  mounted() {
    console.log("app mounted");
  },
  watch: {
    // 路由变化不会触发 Vue 实例的生命周期钩子，此处对路由变化作出响应
    $route(to, from) {
      let me = this;

      me.keyword = me.$route.params.keyword;

      // star animation control
      var showStarPages = ['word']
      me.toWiden = me.$route.name === 'word';
      if(showStarPages.indexOf(from.name) > -1 && showStarPages.indexOf(to.name) === -1) {
        me.toWiden = false;
        me.toNarrowDown = !me.toWiden;
      } else if(showStarPages.indexOf(from.name) === -1 && showStarPages.indexOf(to.name) > -1) {
        me.toWiden = true;
        me.toNarrowDown = !me.toWiden;
      }
    }
  }
};
</script>

<style scoped>
.searchBar {
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
  z-index: 9;
  width: 100%;
  padding: 0.4rem 0.8rem;
  margin: 0;
  box-sizing: border-box;
  background-color: #eee;
  top: 0;
  left: 0;
}
.fixedInner {
  height: 2.2rem;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  position: relative;
}
.starFive,
.starFiveBg {
  color: #ccc;
  text-align: right;
  font-size: 1.6rem;
  font-family: serif;
  cursor: default;
  line-height: 2.2rem;
  height: 2.2rem;
  width: 2.2rem;
  border: 1px solid transparent;
}
.starFive {
  width: 0;
  color: transparent;
}
.starFive.active {
  width: 2.2rem;
}
.starFive.disabled {
  width: 0rem;
}
.toNarrowDown {
  animation: narrowDown 0.3s;
}
.toWiden {
  animation: widen 0.3s;
}
@keyframes narrowDown {
  0% {
    width: 2.2rem;
  }
  100% {
    width: 0rem;
  }
}
@keyframes widen {
  0% {
    width: 0rem;
  }
  100% {
    width: 2.2rem;
  }
}
.starFiveBg {
  position: absolute;
  right: 0.8rem;
  top: 0.4rem;
}
.starFiveBg.active {
  color: #f99;
}
.inputWrapper {
  width: 100%;
  display: block;
  padding: 0.3rem 1rem;
  margin: 0;
  border-radius: 2rem;
  box-shadow: inset 1px 1px 1px 1px #eee;
  border: 1px solid #ddd;
  box-sizing: border-box;
  background-color: #fff;
  flex: 1;
}
form {
  position: relative;
}
form,
input {
  border: none;
  width: 100%;
  padding: 0;
  margin: 0;
}

input {
  font-size: 1.2rem;
  line-height: 1.6rem;
  height: 1.6rem;
  padding: 0 1.5rem 0 0.2rem;
  box-sizing: border-box;
}
input:focus {
  outline: none;
}
.clearBtn {
  position: absolute;
  right: -0.5rem;
  top: 0;
  bottom: 0;
  height: 0rem;
  width: 0rem;
  padding: 0.4rem;
  margin: 0.1rem;
  border-width: 0.3rem;
}
.routerView {
  padding-top: 2.9rem;
}
</style>
