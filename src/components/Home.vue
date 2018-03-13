<template>
  <div>
    <div class="history box" v-if="history.length >= 1">
      <p class="title">历史记录</p>
      <ul class="historyUl">
        <li @click="handleClickWord(encodeURIComponent(word.trim()))" v-for="(word, index) in history" :key="index">{{word}}</li>
      </ul>
    </div>
    <div class="tips box">
      <p class="title">提示</p>
      <p>输入 <em class="star">*</em><em>ment</em> 将会列出以 "ment" 结尾的单词，也就是说通过星号 <em class="star">*</em> 可以通配搜索</p>
      <p>在输入一个单词后按<em>回车</em>/<em>换行</em>即可进入对应词条</p>
      <p class="title">tips</p>
      <p>typing in <em class="star">*</em><em>ment</em> will list words ending with "ment", which means the star <em class="star">*</em> can match any character(s) </p>
      <p>to enter an entry immediately, press <em>enter</em>/<em>return</em> after typing a whole word</p>
    </div>
    <footer class="info"> 
      <span>powered by <a href="https://www.wordsapi.com/" target="_blank">WordsAPI</a></span>&nbsp;
      <span>&copy; 2018 <a href="http://www.eazyc.info/" target="_blank">eazyc</a></span>
    </footer>
  </div>
</template>

<script>
import router from '../router'
import ez from "../assets/js/ezUtil.js";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    history() {
      return ez.localStorage.getJSON("history") || [];
    }
  },
  methods: {
    handleClickWord (wordEncoded) {
      router.push('/word/' + wordEncoded)
    }
  }
};
</script>

<style scoped>
em {
  font-weight: normal;
  font-style: normal;
  color: #a33;
}
.box {
  color: #333;
  font-size: 0.9rem;
  margin: 1.2rem auto 1rem;
  padding: 0 1.5rem;
  text-align: center;
}
.history {
  margin-bottom: 2rem;
}
.history li {
  font-size: 1rem;
  padding: .6rem .8rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin: 0;
}
.history li:first-of-type {
  border-top: 1px solid #ddd;
  margin-top: .2rem;
}
.star {
  font-weight: bold;
}
.title {
  font-weight: bold;
  margin-top: 1rem;
}
.title:first-child {
  margin-top: 0rem;
}
.info {
  text-align: center;
  font-size: 0.9rem;
  margin: 1.5rem auto;
  padding: 0;
  color: #999;
}
table {
  width: 100%;
  line-height: 1.4rem;
  font-size: 0.9rem;
}
table th,
table td {
  padding: 0.2rem 0;
}
table th {
  font-weight: bold;
  position: relative;
  right: 1rem;
  padding-left: 3.5rem;
  text-align: right;
  width: 50%;
  vertical-align: text-top;
}
table td {
  width: 50%;
  position: relative;
  left: 0rem;
  text-align: left;
}
</style>
