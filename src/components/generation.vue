<template>
  <div>
    <div>
      <canvas canvas-id="pattice" style="width:300px; height:300px"  class="picture"></canvas>
    </div>
    <button type="primary" @click="saveImage">保存图片</button>
  </div>
</template>

<script>
var pinyin = require('pinyin')
export default {
  props: {
    word: {
      type: String
    },
    oldMeaning: {
      type: String
    }
  },
  data() {
    return {
      imageTempPath: ''
    }
  },
  methods: {
    saveImage() {
      console.log(1)
      const Canvas = wx.createCanvasContext('pattice')
      var _that = this
      let thisWord = this.word.split('')
      Canvas.fillStyle = '#fff'
      Canvas.fillRect(0, 0, 375, 375)
      draw(1, 50, 50, thisWord)
      function draw(posX, posY, width, word) {
        for (let i = 0; i <thisWord.length; i++) {
          drawPattice(posX, posY, width, word[i])
          posX = posX+width
        }
        Canvas.save()
        Canvas.restore()
        Canvas.setFontSize(25)
        Canvas.setTextAlign('left')
        Canvas.fillText(_that.word+':', 0, 130)
        Canvas.save()
        Canvas.restore()
        Canvas.setFontSize(20)
        fillTextWrap(Canvas, _that.oldMeaning, 0, 160, 300, 25)
        Canvas.draw(true, setTimeout(
          function() {
            wx.getSetting({
              success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  wx.authorize({
                    scope: 'scope.writePhotoAlbum',
                    success() {
                      console.log('授权成功')
                    }
                  })
                }
              }
            })
            wx.canvasToTempFilePath({
              canvasId: 'pattice',
              x: 0,
              y: 0,
              width: 375,
              height: 375,
              fileType: 'jpg',
              success: function(res) {
                _that.imageTempPath = res.tempFilePath
                console.log(res.tempFilePath)
                wx.saveImageToPhotosAlbum({
                  filePath: _that.imageTempPath,
                  success(res) {
                    console.log('success')
                  },
                  fail(res) {
                    console.log('false')
                  }
                })
              }
            })
          }, 1000)
        )
      }
      function drawPattice(posX, posY, width, word) {
        Canvas.save()
        Canvas.restore()
        Canvas.beginPath()
        Canvas.setLineWidth(1)
        Canvas.setStrokeStyle('#FF7A7A')
        Canvas.setLineDash([0, 0])
        Canvas.rect(posX, posY, width, width)
        Canvas.closePath()
        Canvas.stroke()
        Canvas.beginPath()
        Canvas.restore()
        Canvas.setLineDash([4, 4])
        Canvas.setStrokeStyle('#FF7A7A')
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
        Canvas.font = 'normal normal 40px HiraMinProN-W3' 
        Canvas.fillText(word, posX+25, 75)
        Canvas.setFontSize(20)
        Canvas.fillText(pinyin(word), posX+25, 30)
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
        let isFirstLine = true
        for (let letter of arrText) {
          currentText = currentText + letter
          currentWidth = ctx.measureText(currentText).width
          if (isFirstLine === false && currentWidth + 20 > maxWidth) {
            ctx.fillText(currentText, posX, posY)
            currentText = ''
            posY = posY + lineHeight
          } else if (isFirstLine === true && currentWidth + 40 > maxWidth) {
            ctx.fillText(currentText, posX+20, posY)
            isFirstLine = false
            currentText = ''
            posY = posY + lineHeight
          }
        }
        if (isFirstLine) {
          ctx.fillText(currentText, posX+20, posY)
        } else {
          ctx.fillText(currentText, posX, posY)
        }
        currentText = ''
        posY = posY + lineHeight
      }
    }
  },
  computed: {
    watcher: function() {
      const word = this.word
      const oldMeaning = this.oldMeaning
      return {
        word,
        oldMeaning
      }
    }
  },
  watch: {
    watcher: function() {
      var _that = this
      let thisWord = this.word.split('')
      const Canvas = wx.createCanvasContext('pattice')
      Canvas.clearRect(0, 0, 375, 375)
      draw(1, 50, 50, thisWord)
      function draw(posX, posY, width, word) {
        for (let i = 0; i <thisWord.length; i++) {
          drawPattice(posX, posY, width, word[i])
          posX = posX+width
        }
        Canvas.save()
        Canvas.restore()
        Canvas.setFontSize(25)
        Canvas.setTextAlign('left')
        Canvas.fillText(_that.word+':', 0, 130)
        Canvas.save()
        Canvas.restore()
        Canvas.setFontSize(20)
        fillTextWrap(Canvas, _that.oldMeaning, 0, 160, 300, 25)
        Canvas.draw()
      }
      function drawPattice(posX, posY, width, word) {
        Canvas.restore()
        Canvas.beginPath()
        Canvas.setLineWidth(1)
        Canvas.setStrokeStyle('#FF7A7A')
        Canvas.setLineDash([0, 0])
        Canvas.rect(posX, posY, width, width)
        Canvas.closePath()
        Canvas.stroke()
        Canvas.beginPath()
        Canvas.restore()
        Canvas.setLineDash([4, 4])
        Canvas.setStrokeStyle('#FF7A7A')
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
        Canvas.fillText(word, posX+25, 75)
        Canvas.setFontSize(20)
        Canvas.fillText(pinyin(word), posX+25, 30)
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
        let isFirstLine = true
        for (let letter of arrText) {
          currentText = currentText + letter
          currentWidth = ctx.measureText(currentText).width
          if (isFirstLine === false && currentWidth + 20 > maxWidth) {
            ctx.fillText(currentText, posX, posY)
            currentText = ''
            posY = posY + lineHeight
          } else if (isFirstLine === true && currentWidth + 40 > maxWidth) {
            ctx.fillText(currentText, posX+20, posY)
            isFirstLine = false
            currentText = ''
            posY = posY + lineHeight
          }
        }
        if (isFirstLine) {
          ctx.fillText(currentText, posX+20, posY)
        } else {
          ctx.fillText(currentText, posX, posY)
        }
      }
    }
  },
  mounted() {
    let thisWord = this.word.split('')
    var _that = this
    const Canvas = wx.createCanvasContext('pattice')
    Canvas.width = '300px'
    draw(1, 50, 50, thisWord)
    function draw(posX, posY, width, word) {
      for (let i = 0; i <thisWord.length; i++) {
        drawPattice(posX, posY, width, word[i])
        posX = posX+width
      }
      Canvas.save()
      Canvas.restore()
      Canvas.setFontSize(25)
      Canvas.setTextAlign('left')
      Canvas.fillText(_that.word+':', 0, 130)
      Canvas.save()
      Canvas.restore()
      Canvas.setFontSize(20)
      fillTextWrap(Canvas, _that.oldMeaning, 0, 160, 300, 25)
      Canvas.draw()
    }
    function drawPattice(posX, posY, width, word) {
      Canvas.restore()
      Canvas.beginPath()
      Canvas.setLineWidth(1)
      Canvas.setStrokeStyle('#FF7A7A')
      Canvas.setLineDash([0, 0])
      Canvas.rect(posX, posY, width, width)
      Canvas.closePath()
      Canvas.stroke()
      Canvas.beginPath()
      Canvas.restore()
      Canvas.setLineDash([4, 4])
      Canvas.setStrokeStyle('#FF7A7A')
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
      Canvas.fillText(word, posX+25, 75)
      Canvas.setFontSize(20)
      Canvas.fillText(pinyin(word), posX+25, 30)
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
      let isFirstLine = true
      for (let letter of arrText) {
        currentText = currentText + letter
        currentWidth = ctx.measureText(currentText).width
        if (isFirstLine === false && currentWidth + 20 > maxWidth) {
          ctx.fillText(currentText, posX, posY)
          currentText = ''
          posY = posY + lineHeight
        } else if (isFirstLine === true && currentWidth + 40 > maxWidth) {
          ctx.fillText(currentText, posX+20, posY)
          isFirstLine = false
          currentText = ''
          posY = posY + lineHeight
        }
      }
      if (isFirstLine) {
        ctx.fillText(currentText, posX+20, posY)
      } else {
        ctx.fillText(currentText, posX, posY)
      }
      currentText = ''
      posY = posY + lineHeight
    }
  }
}
</script>

<style>
  .picture{
    border:4px double  black;
    padding:0px;
    margin:10px;
  }
</style>

