module.exports = {
  entry: ['webpack/hot/dev-server', './client/app.js'],
  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['jsx-loader?insertPragma=React.DOM&harmony', 'babel']
      }
    ]
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
