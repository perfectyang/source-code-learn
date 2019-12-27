<template>
  <div class="">
    <div>aa</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    initA () {
      var constraints = { audio: true, video: { width: 1280, height: 720 } };
      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); });
    }
  }
}
</script>

<style lang='less' scoped>

</style>
