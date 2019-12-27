<template>
  <!-- <div class=""> -->
    <!-- <div>中文</div> -->
    <!-- <div>{{this.$store.state.mymodule.name}}</div> -->
      <!-- <div>{{this.$db.state.a}}</div> -->
      <!-- <div>{{this.$db.state.son.y}}</div> -->
       <!-- {{this.$store.state.age}} -->
       <!-- <div> {{this.$store.getters.myAge}}</div> -->
       <!-- <div>----{{this.$store.state.a.age}}----</div>
       <h1>{{this.$store.state.bbbb}}</h1>
       <button @click="whateverGets(10)">aa</button> -->
      <!-- <button @click="testNFf('更新在这晨在')">aa</button> -->
      <!-- <button @click="getLocalData">getData</button> -->
      <!-- <router-link to="/test">aa</router-link> -->
      <!-- <router-view></router-view> -->
  <!-- </div> -->
  <div>
    <video-comp />
  </div>
</template>

<script>
// import {mapActions, mapMutations, mapState, mapGetters} from './vuex/testmapAction'
// import {getData} from '@/api'
import videoComp from './views/video.vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    videoComp
  },
  created () {
    // console.log(this.$store)
    // setTimeout(_ => {
    //   this.$store.state.age = 100
    // }, 1000)
    // this.$store.state.bbbb = 100
    // this.$set(this.$store.state, 'bbbb', '去段段段段d')
    // console.log('store', this.$store)
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
    // console.log('aaaaa---------', this.$store.state)
  },
  // computed: {
  //   name () {
  //     console.log('1', 1)
  //   }
  // },
  // methods: {
  //   testNFf (payload) {
  //     this.$store.dispatch('fixName', payload)
  //   },
  //   // add () {
  //   //   console.log(111)
  //   //   // this.$store.dispatch('syncAdd', 10)
  //   //   // this.$store.commit('add', 10)
  //   //   this.syncAdd(10)
  //   // },
  //   ...mapMutations({
  //     randAdd: (commit, payload) => {
  //       console.log('commit', commit, payload)
  //       commit('add', payload)
  //     }
  //   }),
  //   ...mapActions([
  //     'syncAdd' // -> this['some/nested/module/foo']()
  //   ]),

  //   // syncAdd: function mappedAction (add) {
  //   //   this.$store.dispatch('syncAdd', add)
  //   //   // return dispatch.apply(this.$store, [val].concat(args))
  //   // }

  //   // ...mapActions({
  //   //   bbbbb: (dispatch, a, cc) => {
  //   //     dispatch('minus', a)
  //   //     console.log('aaaaaaaa', dispatch, a, cc)
  //   //   }
  //   // })
  //   ...mapState({
  //     whatever: (state, getters, a) => {
  //       console.log('state', state)
  //       console.log('getters', getters)
  //       console.log('a', a)
  //     }
  //   }),

  //    ...mapGetters({
  //      whateverGets: (getters, self, a) => {
  //       console.log('getters', getters)
  //       console.log('a', a)
  //       console.log('self.$store.state', self.$store.state)
  //       self.$store.state.bbbb = 'cccc'
  //     },
  //     test () {
  //       setInterval(_ => {
  //         this.$db.state.a += 2
  //       }, 1000)
  //       // this.$db.commit('add', 10)
  //     }
  //   }),
  //   getLocalData () {
  //     getData({}).then(res => {
  //       console.log('res', res)
  //     })
  //   }
  // }
}
</script>

<style lang='less' scoped>

</style>

