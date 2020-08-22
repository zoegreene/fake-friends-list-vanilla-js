module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    mode: 'development',
    output: {
      path: __dirname,
      filename: './public/bundle.js',
    },
    context: __dirname,
    devtool: 'source-maps',
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
}