<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  beforeCreate () {
    // this.$store.registerModule('mymodule', {
    //   state: {
    //     name: 'perfectyang'
    //   },
    //   actions: {
    //     fixName ({commit, dispatch}, payload) {
    //       commit('setName', payload)
    //     }
    //   },
    //   mutations: {
    //     setName (state, payload) {
    //       state.name = payload
    //     }
    //   }
    // })
  },
  created () {
    console.log('this.$store', this.$store)
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>

</style>
