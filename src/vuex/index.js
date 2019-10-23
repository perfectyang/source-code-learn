
let Vue

const forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => callback(key, obj[key]))
}

const install = (_Vue, opts) => {
  console.log(opts)
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      console.log('大达时在在', this)
      if (this.$options && this.$options.store) { // 有store是父组件
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

// 安装模块
const installModule = (store, state, path, rootModule) => {
  if (path.length > 0) { // 子模块 {x: 1, a: {}} [a]
    let parent = path.slice(0, -1).reduce((state, current) => {
      return state[current]
    }, state)
    Vue.set(parent, path[path.length - 1], rootModule.state)
  }

  let getters = rootModule._raw.getters || {}
  forEach(getters, (getterName, fn) => {
    Object.defineProperty(store.getters, getterName, {
      get: () => {
        return fn(rootModule.state)
      }
    })
  })

  let actions = rootModule._raw.actions || {}
  forEach(actions, (actionName, fn) => {
    store.actions[actionName] || (store.actions[actionName] = [])
    let arr = store.actions[actionName] // []
    arr.push((payload) => {
      fn(store, payload)
    })
  })

  let mutations = rootModule._raw.mutations || {}
  forEach(mutations, (mutationName, fn) => {
    store.mutations[mutationName] || (store.mutations[mutationName] = [])
    let arr = store.mutations[mutationName] // []
    arr.push((payload) => {
      fn(rootModule.state, payload)
    })
  })

  forEach(rootModule._children, (moduleName, module) => {
    installModule(store, state, path.concat(moduleName), module)
  })

}

class CollectModules { // 收集模块树
   constructor (options) {
      this.register([], options)
   }
   register(path, rootModule) {
    console.log('rootModule', rootModule)
    let newModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    }
    if (path.length === 0) { // 说明是根模块 [a]
      this.root = newModule
    } else { // [a, c, d]
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current]
      }, this.root)
      parent._children[path[path.length - 1]] = newModule
    }
    if (rootModule.modules) { // [a, c, d]
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
   }
}

class Store {
  constructor (options) {

    this._vm = new Vue({
      data () {
        return {
          state: options.state
        }
      }
    })
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    this.modules = new CollectModules(options)
    installModule(this, this.state, [], this.modules.root)
    // let newModule = {
    //   _raw: rootModule,
    //   state: rootModule.state,
    //   _children: {}
    // }
    // 此操作绑定 当前实例this
    // let self = this
    // let {commit, dispatch} = this
    // this.commit = (type, payload) => {
    //   commit.call(this, type, payload)
    // }
    // this.dispatch = (type, payload) => {
    //   dispatch.call(this, type, payload)
    // }
  }

  commit = (type, payload) => {
    this.mutations[type].forEach(fn => fn(payload))
  }

  dispatch = (type, payload) => {
    console.log('this.actions[type]', this.actions[type])
    this.actions[type].forEach(fn => fn(payload))
  }

  get state () {
    return this._vm.state
  }

}



export default {
  install,
  Store
}