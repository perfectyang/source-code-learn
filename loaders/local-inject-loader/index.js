let loaderUtils = require('loader-utils')
let valiation = require('schema-utils')
const compiler = require('vue-template-compiler')
const transtJs = require('./transt')

function loader(source) {
  console.log('进来的内容', source)
  let cb = this.async()
  let options = loaderUtils.getOptions(this)
  console.log('options', options)
  let schema = {
    type: 'object',
    properties: {
      default: {
        type: 'string'
      },
      autoImport: {
        type: 'array'
      }
    }
  }
  valiation(schema, options, 'auto-import')

  if (options.default === 'js') {
    const outCode = transtJs(source, options)
    console.log('出来', outCode)
    cb(null, outCode)
  } else {
    cb(null, source)
    // valiation(schema, options, 'auto-import')
    // let vuecontent = compiler.parseComponent(source)
    // if (vuecontent.script) {
    //   const outCode = transtJs(vuecontent.script.content, options)
    //   const styleTpl = vuecontent.styles.map(style => {
    //     return `<${style.type} ` + `${style.lang ? 'lang="' + style.lang + '"' : '' }` + ` ${style.scoped ? 'scoped' : ''}>${style.content}</${style.type}>`
    //   }).join('\n')
    //   const allTpl = `
    //   <template>
    //   ${vuecontent.template.content}
    //   </template>
    //   <script>
    //   ${outCode}
    //   </script>
    //   ${styleTpl}
    //   `
    //   cb(null, allTpl)
    // } else {
    //   cb(null, source)
    // }
  }
}

module.exports = loader