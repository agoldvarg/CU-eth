const path = require('path');

// PATHS
const entryPath = path.join(__dirname, 'src/js', 'index.js');
const outputPath = path.join(__dirname, 'dist');

module.exports = {
  entry: entryPath,
  output: {
    path: outputPath,
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
            ]
          },
          {
            test: /\.scss$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'sass-loader' },
            ]
          },
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'stage-2']
            }
          },
        ],
        exclude: /node_modules/,

      },
      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' },
        ],
      },
    ],
  }
}
