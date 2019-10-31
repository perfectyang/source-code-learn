import Vue from 'vue'
import Vuex from '../lib/vuex'

Vue.use(Vuex)
let outerState = {}
const createOuter = (socket) => {
  return (store) => {
    let prevState = JSON.parse(JSON.stringify(store.state))
    let watch = store.subscribe((mutation, state) => {
      let nextState = JSON.parse(JSON.stringify(store.state))
      console.log('prevState', prevState)
      console.log('nextState', nextState)
      prevState = nextState
    })
    // console.log('watch', watch()) 这个是

    store.subscribeAction({
      before (action, state) {
        console.log('before---actions', action)
        console.log('before---actions---state', state)
      },
      after (action, state) {
        console.log('after ---actions', action)
        console.log('after ---actions---state', state)
      },
    })

    // store.watch((state, getters) => {
    //   console.log('watch', state)
    //   console.log('getters', getters)
    //   return state.age
    // }, (newVal, oldVal) => {
    //   console.log('newVal', newVal)
    //   console.log('oldVal', oldVal)
    //   store.replaceState(outerState)
    // }, '')

  }
}

const testFn = createOuter('outsocket')


export default new Vuex.Store({
  state: {
    age: 10,
    nosee: 100
  },
  modules: {
    a: {
      state: {
        age: 20
      },
      mutations: {
        add (state, payload) {
          console.log('里面的state', state)
          state.age += payload
          return state
        },
        plus (state, payload) {
          state.age -= payload
          return state
        }
      },
      actions : {
        syncAdd ({commit, dispatch}, payload) {
          // console.log('里面的')
          commit('add', payload)
        }
      },
      modules: {
        d: {
          state: {
            dddd: 6666
          },
          getters: {
            getState (state) {
              return state
            }
          }
        }
      }
    }
  },
  getters: {
    myAge (state) {
      return state.age + 10
    }
  },
  actions : {
    syncAdd ({commit, dispatch}, payload) {
      // console.log('外面的')
      commit('add', payload)
      // setTimeout(_ => {
      //   dispatch('minus', 100)
      // }, 5000)
    },
    minus ({commit, dispatch}, payload) {
      commit('plus', 10)
    }
  },
  mutations: {
    add (state, payload) {
      console.log('外面的state', state)
      state.age += payload
      return state
    },
    plus (state, payload) {
      state.age -= payload
      return state
    }
  },
  // plugins: [testFn]
})
