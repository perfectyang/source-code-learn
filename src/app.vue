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
  <div style="height: 100%;">
    <!-- <video-comp /> -->
    <!-- <test /> -->
    <!-- <div style="height: 500px; width: 600px; margin: 0 auto;">
        <split v-model="splitVal" @on-moving="handleMove">
          <split mode="vertical" v-model="splitVal2" slot="left">
            <div slot="top">aa</div>
            <div slot="bottom">bb</div>
          </split>
          <split mode="vertical" v-model="splitVal3" slot="right">
            <div slot="top">ccc</div>
            <div slot="bottom">ddd</div>
          </split>
        </split>
    </div> -->
    <!-- <router-view></router-view> -->
    <position />
  </div>
</template>

<script>
// import {mapActions, mapMutations, mapState, mapGetters} from './vuex/testmapAction'
import {getData} from '@/api'
// import videoComp from './views/video.vue'
// import test from './views/test.vue'
// import split from './views/split/index.vue'
import position from './views/position.vue'
// import vertical from './views/split/vertical.vue'
// console.log('sourcesource')
import mixinName from './mixin'
export default {
  mixins: [mixinName],
  name: 'app',
  data () {
    return {
      // splitVal: 50,
      // splitVal2: 50,
      // splitVal3: 40
    }
  },
  components: {
    position
    // vertical: () => import('./views/split/vertical.vue')
    // videoComp,
    // test,
    // split,
    // vertical
  },
  beforeMount () {
    // localSocket.test()
    // localSocket.test()
    // console.log('localSocket', localSocket)
    // console.log('parent-beforeMount')
  },
  beforeCreate () {
    console.log('parent-beforecrated------')
    // console.log(localSocket)
    localSocket2.test()
  },
  created () {
    console.log('paren')
    // localSocket.test()
    // console.log(localSocket.test())
    // localSocket.test()
    // console.log('parent-created')
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
  methods: {
    handleMove (e) {
      // console.log('ee111', e)
      // localSocket.test()
    }
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
  // asdf
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

<style lang='less'>
body , html{
  margin: 0;
  padding: 0;
  height: 100%;
  // background: red;
}
</style>

 
