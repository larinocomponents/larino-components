const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, {mode}) => {
    const isDevelopment = mode === 'development'

    return {
        target: 'web',
        entry: './index.ts',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            clean: true,
            module: true,
            library: {
                type: 'module'
            }
        },
        experiments: {
          outputModule: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename : 'styles/[name].css'
            }),
        ],
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