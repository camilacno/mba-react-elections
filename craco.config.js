// craco.config.js
// https://tailwindcss.com/docs/guides/create-react-app
const emotionPresetOptions = {}
const emotionPreset =
  require('@emotion/react').emotionPresetMap[emotionPresetOptions]
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(
  undefined,
  emotionPreset
)

module.exports = {
  babel: {
    plugins: [emotionBabelPreset],
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}
