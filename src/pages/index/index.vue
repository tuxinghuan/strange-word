<template>
  <div>
    <p>III</p>
    <input type="text" v-model= "word">
    <generation :word="word"></generation>
    <bottom-nav>
    </bottom-nav>
  </div>
</template>

<script>
import bottomNav from '@/components/bottom-nav.vue'
import generation from '@/components/generation.vue'

export default {
  data () {
    return {
      word: '旧词新'
    }
  }, 
  components: {
    bottomNav, 
    generation
  }, 
  methods: {
  }
  /* mounted() {
    const Canvas = wx.createCanvasContext('pattice')
    Canvas.beginPath()
    Canvas.setLineWidth(1)
    Canvas.setStrokeStyle('red')
    Canvas.rect(1, 1, 51, 51)
    Canvas.closePath()
    Canvas.stroke()
    Canvas.beginPath()
    Canvas.setLineDash([4, 4])
    Canvas.moveTo(1, 1)
    Canvas.lineTo(51, 51)
    Canvas.moveTo(51, 1)
    Canvas.lineTo(1, 51)
    Canvas.moveTo(26, 1)
    Canvas.lineTo(26, 51)
    Canvas.moveTo(1, 26)
    Canvas.lineTo(51, 26)
    Canvas.closePath()
    Canvas.stroke()
    Canvas.draw()
  } */
}
</script>

<style scoped>

</style>
