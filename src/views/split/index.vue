<template>
  <div class="split" ref="outerWrapper">
    <div class="horizal" v-if="mode == 'horizal'">
      <div class="horizal-split-panel left-panel" :style="{right: offset}">
        <slot name="left"></slot>
      </div>
      <div class="horizal-trigger" @mousedown="handleMousedown" :style="{left: leftOffset}">
        <div ref="gap" class="horizal-trigger-icon">
          <div class="horizal-icon-list">
            <i class="horizal-bar" v-once v-for="i in 8" :key="`trigger-${i}`"></i>
          </div>
        </div>
      </div>
      <div class="horizal-split-panel right-panel" :style="{left: leftOffset}">
        <slot name="right"></slot>
      </div>
    </div>

    <div class="vertical" v-else>
      <div class="vertical-split-panel top-panel" :style="{bottom: offset}">
        <slot name="top"></slot>
      </div>
      <div class="vertical-trigger" @mousedown="handleMousedown" :style="{top: leftOffset}">
        <div ref="gap" class="vertical-trigger-icon">
          <div class="vertical-icon-list">
            <i class="vertical-bar" v-once v-for="i in 8" :key="`trigger-${i}`"></i>
          </div>
        </div>
      </div>
      <div class="vertical-split-panel bottom-panel" :style="{top: leftOffset}">
        <slot name="bottom"></slot>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'horizal'
    },
    value: {
      type: Number,
      default: 30
    },
    max: {
      type: [Number, String],
      default: 100
    },
    min: {
      type: [Number, String],
      default: 30
    }
  },
  data () {
    return {
      isMove: false,
      initOffset: 0,
    }
  },
  computed: {
    offset () {
      return this.value + '%'
    },
    leftOffset () {
      return (100 - this.value) + '%'
    }
  },
  methods: {
    handleUp () {
      this.isMoving = false
      document.removeEventListener('mouseup', this.handleUp, false)
      document.removeEventListener('mousemove', this.handleMove, false)
      this.$emit('on-move-end')

    },
    handleMove (e) {
      const pageOffset = this.mode === 'horizal' ? e.pageX : e.pageY
      const outerTarget = this.$refs.outerWrapper.getBoundingClientRect()
      const curentGepW = this.mode === 'horizal' ? outerTarget.left : outerTarget.top
      const totalWH = this.mode === 'horizal' ? outerTarget.width : outerTarget.height
      const percent = (pageOffset - this.initOffset - curentGepW) / (totalWH) * 100
      let value = 100 - percent
      const countPx = (percent / 100) * totalWH
      if (countPx < this.min) {
        value = ((totalWH - this.min) / totalWH) * 100
      } else if (countPx > (totalWH - this.max)) {
        value = (this.max / totalWH) * 100
      }
      this.$emit('input', value)
      this.$emit('on-moving', e)
    },
    handleMousedown (e) {
      this.isMoving = true
      const pageOffset = this.mode === 'horizal' ? e.pageX : e.pageY
      const gapTarget = this.$refs.gap.getBoundingClientRect()
      this.initOffset = this.mode === 'horizal' ? (pageOffset - gapTarget.left) : (pageOffset - gapTarget.top)
      document.addEventListener('mouseup', this.handleUp)
      document.addEventListener('mousemove', this.handleMove)
      this.$emit('on-move-start')
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
  // 水平样式
  .horizal {
    width: 100%;
    height: 100%;
    //  position: relative;
    .horizal-split-panel {
      position: absolute;
      top: 0;
      bottom: 0;
    }
    .left-panel {
      left: 0;
    }
    .right-panel {
      right: 0;
      background: pink;
    }
    .horizal-trigger {
      position: absolute;
      top: 50%;
      height: 100%;
      width: 0;
      transform: translate(-50%,-50%);
      z-index: 10;
      background: #f8f8f9;
      user-select:none;
      &-icon {
        width: 6px;
        height: 100%;
        background: #f8f8f9;
        border-top: none;
        border-bottom: none;
        cursor: col-resize;
      }
    }
    .horizal-icon-list {
      position: absolute;
      left: 1px;
      top: 50%;
      height: 32px;
      overflow: hidden;
      transform: translateY(-50%);
      .horizal-bar {
        width: 4px;
        height: 1px;
        background: rgba(23,35,61,.25);
        float: left;
        margin-top: 3px;
      }
    }
  }
  // 竖直样式
  .vertical {
    width: 100%;
    height: 100%;
    // position: relative;
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
    }
    .vertical-trigger {
      position: absolute;
      left: 50%;
      height: 0;
      width: 100%;
      transform: translate(-50%,-50%);
      z-index: 10;
      background: #f8f8f9;
      user-select:none;
      &-icon {
        height: 6px;
        width: 100%;
        background: #f8f8f9;
        border-left: none;
        border-right: none;
        cursor: row-resize;
      }
    }
    .vertical-icon-list {
      position: absolute;
      left: 50%;
      top: 1px;
      width: 32px;
      transform: translate(-50%);
      .vertical-bar {
        height: 4px;
        width: 1px;
        background: rgba(23,35,61,.25);
        float: left;
        margin-right: 3px;
      }
    }
  }
}
</style>
