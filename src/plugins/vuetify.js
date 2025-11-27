import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'flat',
      class: 'text-none font-weight-bold action-btn text-white',
    },
  },
  theme: {
    defaultTheme: 'redfoxTheme',
    themes: {
      redfoxTheme: {
        dark: false,
        colors: {
          primary: '#B22222',
          secondary: '#ffffff',
          background: '#f8f8f8',
          surface: '#ffffff',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})