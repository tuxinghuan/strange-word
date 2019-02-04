<template>
  <div>
    <canvas canvas-id="pattice" width="300" height="300"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    word: {
      type: String
    }
  },
  watch: {
    word: function() {
      var _that = this
      let thisWord = this.word.split('')
      const Canvas = wx.createCanvasContext('pattice')
      Canvas.clearRect(0, 0, 300, 300)
      draw(1, 1, 50, thisWord)
      function draw(posX, posY, width, word) {
        for (let i = 0; i <thisWord.length; i++) {
          drawPattice(posX, posY, width, word[i])
          posX = posX+width
        }
        Canvas.save()
        Canvas.restore()
        Canvas.setFontSize(20)
        Canvas.setTextAlign('left')
        Canvas.fillText(_that.word, 40, 80)
        Canvas.draw()
      }
      function drawPattice(posX, posY, width, word) {
        Canvas.restore()
        Canvas.beginPath()
        Canvas.setLineWidth(1)
        Canvas.setStrokeStyle('red')
        Canvas.setLineDash([0, 0])
        Canvas.rect(posX, posY, width, width)
        Canvas.closePath()
        Canvas.stroke()
        Canvas.beginPath()
        Canvas.restore()
        Canvas.setLineDash([4, 4])
        Canvas.setStrokeStyle('red')
        Canvas.moveTo(posX, posY)
        Canvas.lineTo(posX+width, posY+width)
        Canvas.moveTo(posX+width, posY)
        Canvas.lineTo(posX, posY+width)
        Canvas.moveTo(posX+(width/2), posY)
        Canvas.lineTo(posX+(width/2), posY+width)
        Canvas.moveTo(posX, posY+(width/2))
        Canvas.lineTo(posX+width, posY+(width/2))
        Canvas.closePath()
        Canvas.stroke()
        Canvas.setFontSize(40)
        Canvas.setTextAlign('center')
        Canvas.setTextBaseline('middle')
        Canvas.fillText(word, posX+25, 25)
        Canvas.save()
      }
    }
  },
  mounted() {
    let thisWord = this.word.split('')
    var _that = this
    const Canvas = wx.createCanvasContext('pattice')
    draw(1, 1, 50, thisWord)
    function draw(posX, posY, width, word) {
      for (let i = 0; i <thisWord.length; i++) {
        drawPattice(posX, posY, width, word[i])
        posX = posX+width
      }
      Canvas.save()
      Canvas.restore()
      Canvas.setFontSize(20)
      Canvas.setTextAlign('left')
      Canvas.fillText(_that.word+':', 0, 80)
      Canvas.save()
      Canvas.restore()
      fillTextWrap(Canvas, 'ahhhh是事实', 200, 100)
      Canvas.draw()
    }
    function drawPattice(posX, posY, width, word) {
      Canvas.restore()
      Canvas.beginPath()
      Canvas.setLineWidth(1)
      Canvas.setStrokeStyle('red')
      Canvas.setLineDash([0, 0])
      Canvas.rect(posX, posY, width, width)
      Canvas.closePath()
      Canvas.stroke()
      Canvas.beginPath()
      Canvas.restore()
      Canvas.setLineDash([4, 4])
      Canvas.setStrokeStyle('red')
      Canvas.moveTo(posX, posY)
      Canvas.lineTo(posX+width, posY+width)
      Canvas.moveTo(posX+width, posY)
      Canvas.lineTo(posX, posY+width)
      Canvas.moveTo(posX+(width/2), posY)
      Canvas.lineTo(posX+(width/2), posY+width)
      Canvas.moveTo(posX, posY+(width/2))
      Canvas.lineTo(posX+width, posY+(width/2))
      Canvas.closePath()
      Canvas.stroke()
      Canvas.setFontSize(40)
      Canvas.setTextAlign('center')
      Canvas.setTextBaseline('middle')
      Canvas.fillText(word, posX+25, 25)
      Canvas.save()
    }
    function fillTextWrap(ctx, text, posX, posY, maxWidth, lineHeight) {
      const systemInfo = wx.getSystemInfoSync()
      const deviceWidth = systemInfo.screenWidth
      maxWidth = maxWidth || deviceWidth
      lineHeight = lineHeight || 20
      const arrText = text.split('')
      let currentText= ''
      let currentWidth
      for (let letter of arrText) {
        currentText = letter + currentText
        console.log(currentText)
        currentWidth = ctx.measureText(currentText).width
        if (currentWidth > maxWidth) {
          ctx.fillText(currentText, posX, posY)
          currentText = ''
          posY = posY + lineHeight
        }
      }
    }
  }
}
</script>
