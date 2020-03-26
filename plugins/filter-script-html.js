class FilterScriptHtml {
  constructor(options) {
    this.options = options
    this.filterHtml = options.filterHtml
    this.removeScriptName = options.removeScriptName
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('filter-script-html', (compliation, cb) => {
      let allAssets = compliation.assets
      const allUrls = Object.keys(allAssets)
      const htmlArr = allUrls.filter(asset => /\.html$/i.test(asset)).filter(html => filterHtml.includes(html))
      console.log('htmlArr', htmlArr)
      htmlArr.forEach(url => {
        const targetContent = allAssets[url].source()
        delete allAssets[url]
        const scriptReg = /<script(.*?)>.*?<\/script>/g
        const content = targetContent.replace(scriptReg, ($1) => {
          let result = ''
          this.removeScriptName.forEach(scriptName => {
            const idx = $1.indexOf(scriptName)
            if (idx === -1) { // 去掉引入的js
              console.log($1)
              result = $1
            }
          })
          return result
        })
        allAssets[url] = {
          source() {
            return content
          },
          size() {
            return content.length
          }
        }
      })
      console.log()
      cb()
    })

  }
}

module.exports = FilterScriptHtml