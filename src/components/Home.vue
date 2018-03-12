<template>
  <div>
    <div class="tips">
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
export default {
  name: 'home',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
em {
  font-weight: normal;
  font-style: normal;
  color: #a33;
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
.tips {
  font-size: .9rem;
  margin: 1.2rem auto 1rem;
  padding: 0 1.5rem;
  text-align: center;
}
.info {
  text-align: center;
  font-size: .9rem;
  margin-top: 1.5rem;
  padding: 0;
  color: #999;
}
table {
  width: 100%;
  line-height: 1.4rem;
  font-size: .9rem;
}
table th, table td {
  padding: .2rem 0;
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
