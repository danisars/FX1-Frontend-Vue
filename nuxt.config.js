import fs from 'fs'
import capitalize from 'lodash/capitalize'

export default {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
  }, // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FX1',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Show the world who you support',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
    // script: [
    //   {
    //     type: 'text/javascript',
    //     innerHTML: `!function(f,b,e,v,n,t,s)
    //     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    //     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    //     n.queue=[];t=b.createElement(e);t.async=!0;
    //     t.src=v;s=b.getElementsByTagName(e)[0];
    //     s.parentNode.insertBefore(t,s)}(window, document,'script',
    //     'https://connect.facebook.net/en_US/fbevents.js');
    //     fbq('init', '607703250800987');
    //     fbq('track', 'PageView');`,
    //   },
    // ],
    // noscript: [
    //   {
    //     type: 'text/javascript',
    //     innerHTML: `<img height="1" width="1" style="display:none"
    //     src="https://www.facebook.com/tr?id=607703250800987&ev=PageView&noscript=1"
    //     />`,
    //   },
    // ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/buefy.scss',
    '@/assets/css/fonts/Rotunda.scss',
    '@/assets/css/fonts/Georgia.scss',
    '@/assets/css/fonts/Inter.scss',
    '@/assets/css/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/graphql.ts',
    '~/plugins/app.js',
    '~/plugins/app.client.js',
    '~/plugins/facebook-events.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  serverMiddleware: ['~/middleware/redirects'],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/sentry',
  ],

  // Style Resources
  styleResources: {
    scss: ['./assets/css/vars/*.scss'],
    sass: ['./assets/css/bulma-utilities.sass'],
    hoistUseStatements: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  //
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false }], // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios', // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa', // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sentry',
    [
      '@nuxtjs/firebase',
      {
        config: process.env.FIREBASE_CONFIG
          ? JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG, 'base64'))
          : null,
        services: {
          messaging: {
            createServiceWorker: true,
            fcmPublicVapidKey: process.env.FCM_WEB_KEY,
            inject: fs.readFileSync('./scripts/services/messages.js'),
          },
          auth: {
            ssr: true,
            initialize: {
              onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
            },
          },
          storage: true,
          performance: false,
          analytics: {
            collectionEnabled: true, // default
          },
          firestore: true,
        },
      },
    ],
    '@nuxtjs/toast',
    'nuxt-socket-io',
    'nuxt-compress',
    '@nuxt/image',
    '@nuxtjs/robots',
    'vue-social-sharing/nuxt',
  ],

  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {
      environment: process.env.APP_ENV
        ? capitalize(process.env.APP_ENV)
        : 'localhost',
    },
    tracing: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'FX1',
      short_name: 'FX1',
      description: 'Show the world who you support',
      lang: 'en',
    },
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      // dev: process.env.APP_ENV === 'develop',
      dev: true,
    },
  },

  robots: {
    UserAgent: '*',
    Allow: process.env.APP_ENV === 'production' ? '/' : undefined,
    Disallow: process.env.APP_ENV !== 'production' ? '/' : undefined,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // parallel: true,
    // hardSource: true,
    // cache: true,
    extractCSS: process.env.APP_ENV === 'production',
    terser: {
      sourceMap: true,
    },
    hotMiddleware: {
      client: {
        overlay: false,
      },
    },
  },

  // Custom Environment
  publicRuntimeConfig: {
    graphqlURL: process.env.GRAPHQL_URL,
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
  },

  env: {
    mixpanelToken: process.env.MIXPANEL_TOKEN,
    baseURL:
      process.env.APP_ENV === 'production'
        ? 'https://fx1.io'
        : 'https://staging.fx1.io',
    FCM_SERVER_KEY: process.env.FCM_SERVER_KEY,
  },

  // Router
  router: {
    linkActiveClass: 'active',
  },

  // Loading style on each route change
  loading: {
    color: '#f85454',
    height: '3px',
    throttle: 0,
  },

  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: process.env.SOCKET_URL || 'https://api.dev.fx1.io/',
      },
    ],
  },

  image: {
    dir: 'assets/images',
  },
}
