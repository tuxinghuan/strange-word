<template>
  <div>
    <p>第一个微信小程序</p>
    <input-words></input-words>
    <generation></generation>
    <bottom-nav>
    </bottom-nav>
  </div>
</template>

<script>
import bottomNav from '@/components/bottom-nav.vue'
import inputWords from '@/components/input-words.vue'
import generation from '@/components/generation.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    bottomNav,
    inputWords,
    generation
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
