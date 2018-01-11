<template>
<div>
  <ul v-if="source && source.results">
    <li v-for="(des, i) in source.results" :key="i">
      <p class="first" v-if="des.definition">
        <!-- partOfSpeech -->
        <span v-if="des.partOfSpeech" class="part">{{ des.partOfSpeech }}</span>
        <!-- pronunciation -->
        <span v-if="source.pronunciation && source.pronunciation[des.partOfSpeech]" class="sound">| {{ source.pronunciation[des.partOfSpeech] }} |</span>
        <span v-else-if="source.pronunciation && source.pronunciation.all" class="sound">| {{ source.pronunciation.all }} |</span>
        <span v-else-if="source.pronunciation && typeof source.pronunciation === 'string'" class="sound">| {{ source.pronunciation }} |</span>
        <br>
      </p>
      <p class="def" v-if="des.definition">
        <!-- <span class="title">definition</span> -->
        <span>{{ des.definition }}</span>
      </p>
      <!-- <hr v-if="des.examples"> -->
      <p class="examples" v-for="(synonym, i) in des.examples" :key="i">
        <span class="tag">·</span><span >{{ synonym }}</span>
      </p>
      <hr v-if="des.derivation || des.synonyms || des.antonyms">
      <p v-if="des.derivation">
        <span class="title">derivation</span>
        <span>
          <span v-for="(der, i) in des.derivation" :key="i">
            <span class="word" @click="goToWord(encodeURIComponent(der))" >{{ der }}</span><span v-if="i !== des.derivation.length - 1">, </span>
          </span>
        </span>
      </p>
      <p v-if="des.synonyms">
        <span class="title">synonyms</span>
        <span>
          <span v-for="(synonym, i) in des.synonyms" :key="i">
            <span class="word" @click="goToWord(encodeURIComponent(synonym))" >{{ synonym }}</span><span v-if="i !== des.synonyms.length - 1">, </span>
          </span>
        </span>
      </p>
      <p v-if="des.antonyms">
        <span class="title">antonyms</span>
        <span>
          <span v-for="(antonym, i) in des.antonyms" :key="i">
            <span class="word" @click="goToWord(encodeURIComponent(antonym))" >{{ antonym }}</span><span v-if="i !== des.antonyms.length - 1">, </span>
          </span>
        </span>
      </p>
    </li>
  </ul>

</div>
</template>

<script>
import router from '../router'
export default {
  name: 'descriptions',
  props: ['source'],
  data () {
    return {

    }
  },
  methods: {
    goToWord (wordEncoded) {
      router.push('/Word/' + wordEncoded)
    }
  }
}
</script>

<style scoped>
hr {
  border: none;
  border-bottom: 1px solid #fff;
  margin: .8rem 0 .7rem 0;
  padding: 0;
  width: 100%;
}
li {
  padding: .4rem 0rem .5rem 0;
  margin: 1rem .8rem;
  background-color: #ddd;
  /* border: 1px solid #eee; */
  border-radius: 1rem;
}
li:first-of-type {
  margin-top: 1.2rem;
}
li>p {
  padding: 0 .8rem;
}
.first {
  font-size: 1.1rem;
}
.def {
  /* font-weight: bold; */
}
.examples {
  /* padding-left: 1.8rem; */
}
.word {
  color: #060;
}
.word:active {
  color: #000;
}
.tag, .title, .part {
  font-weight: bold;
  margin-right: .5rem;
}
.part {
  color: #a33;
}
.part, .sound {
  font-size: 1.1rem;
}
</style>
