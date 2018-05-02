module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'personalfinances',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Personal Finances Project ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
      {src: '~/plugins/firebase', ssr: false},
      {src: '~/plugins/localStorage.js', ssr: false},
      {src: '~/plugins/notifications.js', ssr: false},
      {src: '~/plugins/csv.js', ssr: false}
  ],
  modules: [
   'bootstrap-vue/nuxt'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ee6e73' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
