<template>
  <div class="">
    <!-- <button @click="downloadFn">download</button> -->
    <button id="stopBtn">stop</button>
    <button id="pause">pause</button>
    <!-- <button id="restart">restart</button> -->
    <button @click="startRecord">开始录屏111</button>
    <video id="video"></video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      recordedChunks: []
    }
  },
  mounted () {
  },
  methods: {
    startRecord () {
      this.initA()
    },
    downloadFn () {
      var blob = new Blob(this.recordedChunks, {
        type: "video/webm"
      })
      var url = URL.createObjectURL(blob)
      const fileName = `${Math.random() * 100}.webm`;
      let evt = document.createEvent('HTMLEvents')
      let aLink = document.createElement('a')
      evt.initEvent('click', true, true) // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = url
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
      window.URL.revokeObjectURL(url)
    },
    async initA () {
      const videoElem = document.getElementById('video')
      const stopBtn = document.getElementById('stopBtn')
      // const download = document.getElementById("download")
      const pause = document.getElementById("pause")
      const restart = document.getElementById("restart")
      const self = this
      const options = {
        video: {
          cursor: 'never',
          displaySurface: 'monitor',
          // resolutions: 'default'
          // width: 1280,
          // height: 760
        }
      }
      const stream = await navigator.mediaDevices.getDisplayMedia(options)
      videoElem.srcObject = stream  // 将流赋值给video标签 用于播放
      videoElem.onloadedmetadata = (e) => video.play()
      let videoType
      if (MediaRecorder.isTypeSupported("video/webm; codecs=vp9")) {
        videoType = { mimeType: "video/webm; codecs=vp9" }
      } else if (MediaRecorder.isTypeSupported("video/mp4; codecs=H264")){
        videoType = { mimeType: "video/mp4; codecs=H264" }
      } else {
        videoType = { mimeType: "video/webm" }
      }
      const recorder = new MediaRecorder(stream, videoType) // 用于视频保存
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data)
        }
      }
      recorder.start()
      pause.onclick = () => {
        if(recorder.state === 'recording') {
          videoElem.pause()
          recorder.pause()
        } else if(recorder.state === 'paused') {
          videoElem.play()
          recorder.resume()
        }
      }

      stopBtn.onclick = () => {
          videoElem.pause()
          recorder.stop()
      }

      recorder.onstop = () => {
        self.downloadFn()
        this.recordedChunks = []
        const tracks = videoElem.srcObject.getTracks()
        for (let i = 0; i < tracks.length; i++) {
          tracks[i].stop()
        }
        videoElem.srcObject = null
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
