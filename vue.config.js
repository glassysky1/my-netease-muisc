
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('zepto')
      .test(require.resolve('zepto'))
      .use('exports')
      .loader('exports-loader?window.Zepto')
      .end()
      .use('script')
      .loader('script-loader')
      .end()
    //  if you want import zepto in the main.js you can not use this
    //  如果你想在main.js中引入zepto，下面的配置可以不用复制
    config
      .plugin('env')
      .use(require.resolve('webpack/lib/ProvidePlugin'), [{ $: 'zepto' }])
  }
}
