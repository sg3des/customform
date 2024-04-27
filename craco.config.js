const CracoLessPlugin = require('craco-less')
const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {},
      },
    },
  ],
  webpack: {
    configure: {
      target: 'web',
      entry: './src/index.tsx',
      resolve: {
        fallback: {},
      },
      ignoreWarnings: [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          )
        },
      ],
    },
  },
}
