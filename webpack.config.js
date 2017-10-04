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
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-2']
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
