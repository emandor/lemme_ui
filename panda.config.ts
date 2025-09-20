import { defineConfig, defineGlobalStyles, definePreset } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import pandaBase from '@pandacss/preset-base'
import { createPreset } from '@park-ui/panda-preset'
import amber from '@park-ui/panda-preset/colors/orange'
import sand from '@park-ui/panda-preset/colors/sand'

 
const globalCss = defineGlobalStyles({
//   'html, body': {
//     // color: 'gray.900',
//     // backgroundColor: 'gray.200',
// h: '100%',   
//     w: '100%',
//     lineHeight: '1.5'
//   },
  body: {
 bg: {
      base: 'white',
      _dark: 'gray.900',
    },
    },
})

const preset = definePreset({
 name: 'lemme_ui',
  globalCss,
  theme: {
    tokens: {
      colors: {
        brand: { value: '#f59e0b' },           // orange seperti logo “Lemme”
        bg:    { value: '#1f2937' },           // slate-800
        panel: { value: '#111827' },           // gray-900
        card:  { value: '#0b1220' },           // gelap untuk kartu
        line:  { value: '#374151' },           // border
        success:{ value: '#22c55e' },
        warning:{ value: '#f59e0b' }
      }
    },
  },
  presets: [createPreset({ accentColor: amber, grayColor: sand, radius: 'sm' })],

})
 

export default defineConfig({
  globalCss,
  preflight: true,

  // presets: [createPreset({ accentColor: amber, grayColor: sand, radius: 'sm' })],
  presets: [pandaBase, pandaPreset, preset],

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  jsxFramework: 'solid',

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },
  // presets: ['@acmecorp/panda-preset'],

  // The output directory for your css system
  outdir: "styled-system",
});
