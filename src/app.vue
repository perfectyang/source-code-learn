<template>
  <div class="">
       {{this.$store.state.age}}
       <!-- <div> {{this.$store.getters.myAge}}</div> -->
       <div>----{{this.$store.state.a.age}}----</div>
       <h1>{{this.$store.state.bbbb}}</h1>
       <button @click="whateverGets(10)">aa</button>
      <router-view></router-view>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from './vuex/testmapAction'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
    // console.log(this.$store)
    // setTimeout(_ => {
    //   this.$store.state.age = 100
    // }, 1000)
    // this.$store.state.bbbb = 100
    this.$set(this.$store.state, 'bbbb', '去段段段段d')
  },
  computed: {
    name () {
      console.log('1', 1)
    }
  },
  methods: {
    // add () {
    //   console.log(111)
    //   // this.$store.dispatch('syncAdd', 10)
    //   // this.$store.commit('add', 10)
    //   this.syncAdd(10)
    // },
    ...mapMutations({
      randAdd: (commit, payload) => {
        console.log('commit', commit, payload)
        commit('add', payload)
      }
    }),
    // ...mapActions([
    //   'syncAdd' // -> this['some/nested/module/foo']()
    // ]),

    // syncAdd: function mappedAction (add) {
    //   this.$store.dispatch('syncAdd', add)
    //   // return dispatch.apply(this.$store, [val].concat(args))
    // }

    // ...mapActions({
    //   bbbbb: (dispatch, a, cc) => {
    //     dispatch('minus', a)
    //     console.log('aaaaaaaa', dispatch, a, cc)
    //   }
    // })
    ...mapState({
      whatever: (state, getters, a) => {
        console.log('state', state)
        console.log('getters', getters)
        console.log('a', a)
      }
    }),

     ...mapGetters({
       whateverGets: (getters, self, a) => {
        console.log('getters', getters)
        console.log('a', a)
        console.log('self.$store.state', self.$store.state)
        self.$store.state.bbbb = 'cccc'
      }
    }),
  }
}
</script>

<style lang='less' scoped>

</style>

