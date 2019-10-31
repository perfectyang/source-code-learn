
let Vue

const forEach = (obj, callback) => {
  console.log('obj', obj)
  Object.keys(obj).forEach(key => callback(key, obj[key]))
}

const install = (_Vue, opts) => {
  console.log(opts)
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
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

   get (path) {
    return path.reduce((root, current) => {
      return root._children[current]
    }, this.root)
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
      let parent = this.get(path.slice(0, -1))
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
    this.plugins = options.plugins || []
    this._subscribers = []
    this.modules = new CollectModules(options)

    installModule(this, this.state, [], this.modules.root)
    this.plugins.forEach(plugin => plugin(this))
  }

  commit = (type, payload) => {
    let entry = this.mutations[type]
    entry.forEach((handler) => { handler(payload)})
    // let result = entry.length > 1 ? Promise.all(entry.map(handler => handler(payload))) : entry[0](payload)
  }

  dispatch = (type, payload) => {
    console.log('this.actions[type]', this.actions[type])
    this.actions[type].forEach(fn => {
      fn(payload)
    })
  }

  get state () {
    return this._vm.state
  }

  registerModule(path, rawModule) {
    path = typeof path === 'string' ? [path] : path
    this.modules.register(path, rawModule) // 收集模块 {state: {}, _raw: rawModule ,_children: {'mymodule': {_raw: rawModule,}}}
    installModule(this, this.state, path, this.modules.get(path))
  }

  subscribe (fn) {
    return genericSubscribe(fn, this._subscribers)
  }

}

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < -1) {
    subs.push(fn)
  }
  return () => {
    if (subs.indexOf(fn) > -1) {
      let idx = subs.indexOf(fn)
      subs.splice(idx, 1)
    }
  }
}



export default {
  install,
  Store
}