<template>
  <div>
    <div class="tipWrapper">
      <p class="title">tips</p>
      <p>To enter an entry immediately, press <em>enter</em>/<em>return</em> after typing a whole word.</p>
      <p>The <em class="star">*</em> (star) matches any character, which means <em class="star">*</em><em>ment</em> matches words ending with "ment".</p>
      <!-- <table>
        <tbody>
          <tr>
            <th rowspan="2">tips</th>
            <td>to enter an entry immediately, press <em>enter</em>/<em>return</em> after typing a whole word</td>
          </tr>
          <tr>
            <td>
              the <em class="star">*</em> (star) matches any character, which means <em class="star">*</em><em>ment</em> matches words ending with "ment"
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <footer class="info">
      <table>
        <tbody>
          <tr>
            <th>powered by</th>
            <td>
              WordsAPI<br>unirest<br>
              Vue.js<br>axios<br>
              Loaders.css<br>
            </td>
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
  font-size: .9rem;
  margin: 1.2rem auto 1rem;
  padding: 0 1.5rem;
  /* text-align: left; */
}
.title {
  font-weight: bold;
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
  right: 1rem;
  padding-left: 3.5rem;
  text-align: right;
  width: 50%;
  vertical-align: text-top;
}
table td {
  width: 60%;
  position: relative;
  left: 0rem;
  text-align: left;
}
</style>
