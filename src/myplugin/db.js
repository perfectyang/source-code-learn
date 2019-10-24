
const forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key])
  })
}

let Vue
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.db) {
        this.$db = this.$options.db
      } else {
        this.$db = this.$parent && this.$parent.$db
      }
    }
  })
}

class CollectModule {
  constructor(options) {
    this.register([], options)
  }

  register(path, rootModule) {
    let newModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    }
    if (path.length === 0) {
      this.root = newModule
    } else { // ['a', 'c']
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current]
      }, this.root)
      parent._children[path[path.length - 1]] = newModule
    }
    if (rootModule.module) {
      forEach(rootModule.module, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}

const installModule = (store, state, path, rootModule) => {

  if (path.length > 0) {
    let parent = path.slice(0, -1).reduce((state, current) => {
      return state[current]
    }, state)
    Vue.set(parent, path[path.length - 1], rootModule.state)
  }

  let actions = rootModule._raw.actions || {}
  forEach(actions, (actionName, fn) => {
    store.actions[actionName] || (store.actions[actionName] = [])
    let arr = store.actions[actionName] // [fn, fn]
    arr.push((payload) => {
      fn({commit: store.commit.bind(store), dispatch: store.dispatch.bind(store)}, payload)
    })
  })
  let mutations = rootModule._raw.mutations || {}
  forEach(mutations, (moduleName, fn) => {
    store.mutations[moduleName] || (store.mutations[moduleName] = [])
    let arr = store.mutations[moduleName]
    arr.push((payload) => {
      fn(rootModule.state, payload)
    })
  })

  let getters = rootModule._raw.getters || {}
  forEach(getters, (getterName, fn) => {
    Object.defineProperty(store.getters, getterName, {
      get: () => {
        return fn(rootModule.state)
      }
    })
  })

  forEach(rootModule._children, (moduleName, module) => {
    installModule(store, state, path.concat(moduleName), module)
  })


}



class DB {
  constructor(options) {
    this.options = options
    this._vm = new Vue({
      data () {
        return {
          state: options.state
        }
      }
    })
    this.mutations = {}
    this.getters = {}
    this.actions = {}
    this.modules = new CollectModule(options)
    installModule(this, this.state, [], this.modules.root)
  }

  commit (type, payload) {
    console.log('this----aa', this)
    this.mutations[type].forEach(fn => fn(payload))
  }

  dispatch (type, payload) {
    console.log('this----bb', this)
    console.log('typetype', this.actions[type])
    this.actions[type].forEach(fn => fn(payload))
  }

  get state () {
    return this._vm.state
  }

}


export default {
  install,
  DB
}