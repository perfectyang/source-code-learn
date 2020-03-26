<template>
  <div class="split" ref="outerWrapper">
    <div class="vertical">
      <div class="vertical-split-panel top-panel" :style="{bottom: topVal}">
        <slot name="top"></slot>
      </div>
      <div class="vertical-trigger" @mousedown="handleMousedown" :style="{top: bottomVal}">
        <div ref="gap" class="vertical-trigger-icon"></div>
      </div>
      <div class="vertical-split-panel bottom-panel" :style="{top: bottomVal}">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      left: 40,
      isMove: false,
      initOffset: 0
    }
  },
  computed: {
    topVal () {
      return this.left + '%'
    },
    bottomVal () {
      return (100 - this.left) + '%'
    }
  },
  methods: {
    handleUp () {
      this.isMoving = false
      document.removeEventListener('mouseup', this.handleUp)
      document.removeEventListener('mousemove', this.handleMove)
    },
    handleMove (e) {
      let pageOffset = e.pageY
      let outerTarget = this.$refs.outerWrapper.getBoundingClientRect()
      const percent = (pageOffset - this.initOffset - outerTarget.top) / (outerTarget.height) * 100
      this.left = 100 - percent
    },
    handleMousedown (e) {
      this.isMoving = true
      this.initOffset = e.pageY - this.$refs.gap.getBoundingClientRect().top
      document.addEventListener('mouseup', this.handleUp)
      document.addEventListener('mousemove', this.handleMove)
    }
  }
}
</script>

<style lang='less' scoped>
.split {
  width: 100%;
  height: 100%;
  background: red;
  position: relative;
  .vertical {
    .vertical-split-panel {
      position: absolute;
      left: 0;
      right: 0;
    }
    .top-panel {
      top: 0;
    }
    .bottom-panel {
      bottom: 0;
      background: pink;
    }
    .vertical-trigger {
      position: absolute;
      left: 50%;
      height: 0;
      width: 100%;
      transform: translate(-50%,-50%);
      z-index: 10;
      &-icon {
        height: 6px;  
        width: 100%;
        background: #f8f8f9;
        border-left: none;
        border-right: none;
        cursor: row-resize;
      }
    }
  }
}
</style>
