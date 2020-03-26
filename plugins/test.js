  // const tpl = `
  // <!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"><title>Eztalk</title><meta name="keywords" content=""><meta name="description" content=""><meta name="renderer" content="webkit"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><link rel="stylesheet" href="//at.alicdn.com/t/font_555617_v2mirapvbu.css"><script>// window.KUAIZI_CDN = ['/', (/(dev|test)/.test(location.hostname) ? /(dev|test)/.exec(location.hostname)[0] + '_static.qdtech.ai/static' : 'img.qdtech.ai/static'), 'eztalk2', ''].join('/')
  //       window.KUAIZI_CDN = '/static'</script><link href="/static/css/m.css?1574f96170767d5f2f2d&1574f96170767d5f2f2d" rel="stylesheet"></head><body><!--[if lt IE 11]>
  //       <div class="old-browser">
  //         <a href="http://browsehappy.com/">
  //           <img src="/static/img/older-browsers.png" alt="您的浏览器版本过低，为了保障您的访问安全，以及获得更友好的用户体验，建议您升级您的浏览器到最新版本。">
  //         </a>
  //       </div>
  //     <![endif]--><div id="app"></div>
  //     <script type="text/javascript" src="/static/js/pcui.dll.js?88204d952ba9f4b615f5"></script>
  //     <script type="text/javascript" src="/static/js/vendor.dll.js?f6aaa03a016596e15cfc"></script>
  //     <script type="text/javascript" src="/static/js/manifest.js?1574f96170767d5f2f2d"></script>
  //     <script type="text/javascript" src="/static/js/m.js?1574f96170767d5f2f2d"></script></body></html>
  // `
  // var scriptReg = /<script(.*?)>.*?<\/script>/g
  // const content = tpl.replace(scriptReg, ($1, $2) => {
  //   // console.log($2)
  //   const idx = $1.indexOf('pcui.dll.js')
  //   if ( idx === -1) {
  //     console.log($1)
  //     return $1
  //   } else {
  //     return ''
  //   }
  // })
  // console.log('content', content)

  function queue(arr) {
    arr.reduce((promises, next) => {
      return promises.then(_ => {
        return next()
      })
    }, Promise.resolve())
  }

  function p1 () {
    return new Promise((resolve) => {
      setTimeout(_ => {
        console.log('p1')
        resolve()
      }, 1000)
    })
  }

  function p2 () {
    return new Promise((resolve) => {
      setTimeout(_ => {
        console.log('p2')
        resolve()
      }, 1000)
    })
  }
  function p3 () {
    return new Promise((resolve) => {
      setTimeout(_ => {
        console.log('p3')
        resolve()
      }, 1000)
    })
  }

  queue([p1, p2, p3])
