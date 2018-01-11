<template>
  <div>
    <div class="tipWrapper">
      <table>
        <tbody>
          <tr>
            <th rowspan="2">tips</th>
            <td>
              the <em class="star">*</em> (star) matches any character
            </td>
          </tr>
          <tr><td>try pressing <em>enter</em>/<em>return</em> after typing</td></tr>
        </tbody>
      </table>
    </div>
    <footer class="info">
      <table>
        <tbody>
          <tr>
            <th>powered by</th>
            <td>
              WordsAPI<br>
              Vue.js<br>
              axios<br>
              Loaders.css<br>
              unirest
            </td>
          </tr>
          <tr>
            <th>blog</th>
            <td>www.eazyc.info</td>
          </tr>
        </tbody>
      </table>
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
.tipWrapper {
  margin: 2rem auto;
  padding: 0;
}
.info {
  /* margin-top: 1rem; */
  padding: 0;
  color: #ccc;
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
  right: 2.5rem;
  padding-left: 3.5rem;
  text-align: right;
  width: 50%;
  vertical-align: text-top;
}
table td {
  width: 60%;
  position: relative;
  left: -1.5rem;
  text-align: left;
}
</style>
