const path = require('path')
const process = require('process')
const files = path.join(process.cwd(), 'karma.entry.js')

module.exports = config =>
  config.set({
    frameworks: ['jasmine'],
    files: [files],
    preprocessors: {
      [files]: ['webpack']
    },
    browsers: ['ChromeHeadless'],
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader'
          }
        ]
      }
    },
    plugins: [
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  })