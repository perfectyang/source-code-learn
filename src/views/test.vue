<template>
  <div>
    cccc---{{testComputed}}
    <button @click="handle">change</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstName: 'aa',
      secondName: 'bbb',
      thirdName: 'ccc'
    }
  },
  beforeMount () {
    console.log('son-beforeMount')
  },
  mounted () {
    console.log('son-mounted', this)
  },
  beforeCreate () {
    console.log('son-beforecrated')
  },
  created () {
    console.log('son-created')
  },
  watch: {
    firstName (val, oldVal) {
      console.log(val, oldVal)
    }
  },
  computed: {
    testComputed () {
      return this.firstName + this.secondName + this.thirdName
    }
  },
  methods: {
    handle () {
      this.firstName = 'perfectyang'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
