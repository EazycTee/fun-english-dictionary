<template>
  <div>
    <div class="tips">
      <p class="title">tips</p>
      <p>To enter an entry immediately, press <em>enter</em>/<em>return</em> after typing a whole word.</p>
      <p>The <em class="star">*</em> (star) matches any character, which means <em class="star">*</em><em>ment</em> matches words ending with "ment".</p>
    </div>
    <footer class="info"> 
      <span>powered by</span> <a href="https://www.wordsapi.com/" target="_blank">WordsAPI</a>
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
  margin-top: 1rem;
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
