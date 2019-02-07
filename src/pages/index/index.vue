<template>
  <div class="page">
    <div class="background"></div>
    <i-input :value="word" type="text" title="旧词" autofocus placeholder="输入内容" @change="updateWord" maxlength="-1" />
    <i-input :value="oldMeaning" type="text" title="新意" autofocus placeholder="输入内容" @change="updateMeaning" maxlength="-1" />
    <generation :word="word" :oldMeaning="oldMeaning"></generation>
  </div>
</template>

<script>
import generation from '@/components/generation.vue'
export default {
  data () {
    return {
      word: '',
      oldMeaning: '',
      newMeaning: 'sss'
    }
  }, 
  components: {
    generation
  },
  methods: {
    updateWord(e) {
      this.word = e.target.detail.value
    },
    updateMeaning(e) {
      this.oldMeaning = e.target.detail.value
    }
  }
}
</script>

<style scoped>
.page{
  width:100%;
  height: 100%;
}
</style>
