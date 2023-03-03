const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        'larino-components': './src/components/index.ts',
        'examples': './src/examples/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/examples/index.html',
            chunks: ['examples']
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3001,
    },
    devtool: 'eval-source-map'
}