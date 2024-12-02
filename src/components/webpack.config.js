const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackObfuscator = require('webpack-obfuscator')

module.exports = (_, {mode}) => {
    const isDevelopment = mode === 'development'

    return {
        target: 'web',
        entry: { index: './index.ts' },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            clean: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename : 'styles/[name].css'
            }),
            !isDevelopment && new WebpackObfuscator({
                rotateStringArray: true
            })
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    // For *.component.scss
                    test: /\.component\.s[ac]ss$/,
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: { api: 'modern' }
                        }
                    ],
                },
                // For *.scss
                {
                    test: /\.s[ac]ss$/,
                    exclude: /\.component\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: { api: 'modern' }
                        }
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname),
            }
        },
        devtool: isDevelopment ? 'inline-source-map' : false
    }
}