<template>
  <div class="position">
    <div class="nav">
      <div v-for="idx in 10" :key="idx" @click="jumpToTarget(idx)">{{idx}}</div>
    </div>
    <div class="" id="target" style="position: relative; overflow: auto;">
      <div class="content" id="content">
        <div class="content__section" v-for="id in 10" :key="id" :id="`item-${id}`">{{id}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    jumpToTarget (idx) {
      const item = document.getElementById(`item-${idx}`)
      console.log('item', item)
      const styleCompute = item.getBoundingClientRect()
      const offsetTop = item.offsetTop - (styleCompute.height / 2)
      console.log(`item-${idx}`, offsetTop)
      const dom = document.getElementById('target')
      console.log('target', dom)
      dom.scrollTop = offsetTop
    }
  }
}
</script>

<style lang='less' scoped>
.position {
  height: 100%;
  display: flex;
}
.nav {
  width: 200px;
  background: red;
}
.content {
  background: pink;
  &__section {
    width: 500px;
    height: 300px;
  }
}
</style>
