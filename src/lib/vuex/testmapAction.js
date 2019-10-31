
// ...mapMutations('some/nested/module', {
//   a: state => state.a,
//   b: state => state.b
// })
// ...mapMutations({
//   a: state => state.some.nested.module.a,
//   b: state => state.some.nested.module.b
// })
// ...mapMutations([
//   'some/nested/module/foo', // -> this['some/nested/module/foo']()
//   'some/nested/module/bar' // -> this['some/nested/module/bar']()
// ])
const norizeMap = (mapMutaions) => {
  return Array.isArray(mapMutaions)
        ? mapMutaions.map(k => ({key: k, val: k}))
        : Object.keys(mapMutaions).map(k => ({key: k, val: mapMutaions[k]}))
}

// const commFn = (spacename, map, type, self) => {
//   let res = {}
//   norizeMap(map).forEach(({key, val}) => {
//     const typeFn = self.$store[type]
//     res[key] = (...args) => {
//       if (typeof val === 'function') {
//         return val.apply(self, [typeFn].concat(args))
//       } else {
//         return typeFn.apply(self.$store, [val].concat(args))
//       }
//     }
//   })
//   return res
// }

function normalizeNamespace(fn) {
  return (spacename, map) => {
    if (typeof spacename !== 'string') { // 此情况下，说明没有命名空间
      map = spacename
      spacename = ''
    } else if (spacename.charAt(spacename.length - 1) !== '/') {
      spacename += '/'
    }
    return fn(spacename, map)
  }
}

export const mapMutations = normalizeNamespace((spacename, map) => {
  let res = {}
  norizeMap(map).forEach(({key, val}) => {
    res[key] = function (...args) {
      console.log('aaa', this)
      const commit = this.$store.commit
      if (typeof val === 'function') {
        return val.apply(this, [commit].concat(args))
      } else {
        return commit.apply(this.$store, [val].concat(args))
      }
    }
  })
  return res
})
export const mapActions = normalizeNamespace((spacename, map) => {
  let res = {}
  norizeMap(map).forEach(({key, val}) => {
    res[key] = function (...args) {
      const typeFn = this.$store.dispatch
      if (typeof val === 'function') {
        return val.apply(this, [typeFn].concat(args))
      } else {
        return typeFn.apply(this.$store, [val].concat(args))
      }
    }
  })
  return res
})

export const mapState = normalizeNamespace((spacename, map) => {
  const res = {}
  norizeMap(map).forEach(({key, val}) => {
    res[key] = function (...args) {
      let state = this.$store.state
      let getters = this.$store.getters
      if (typeof val === 'function') {
        return val.apply(this, [state, getters].concat(args))
      } else {
        return state[val]
      }
    }
  })
  return res
})

export const mapGetters = normalizeNamespace((spacename, map) => {
  const res = {}
  norizeMap(map).forEach(({key, val}) => {
    res[key] = function (...args) {
      let getters = this.$store.getters
      if (typeof val === 'function') {
        return val.apply(this, [getters, this].concat(args))
      } else {
        return getters[val]
      }
    }
  })
  return res
})