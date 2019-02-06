<template>
  <div>
    <p>III</p>
    <input type="text" v-model= "word">
    <input type="text" v-model= "oldMeaning">
    <generation :word="word" :oldMeaning="oldMeaning"></generation>
  </div>
</template>

<script>
import generation from '@/components/generation.vue'
export default {
  data () {
    return {
      word: '旧词新',
      oldMeaning: '这是一个示例',
      newMeaning: 'sss'
    }
  }, 
  components: {
    generation
  }
}
</script>

<style scoped>

</style>
