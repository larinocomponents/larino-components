const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DtsBundleWebpack = require('dts-bundle-webpack')

module.exports = (_, {mode}) => {
    const isDevelopment = mode === 'development'

    return {
        target: 'web',
        entry: './main.ts',
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
            new DtsBundleWebpack({
                name: '@larinonpm/components',
                main: 'main.d.ts',
                out: 'build/main.d.ts',
            })
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        {
                            loader: 'lit-scss-loader',
                            options: { minify: !isDevelopment }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                api: 'modern',
                                sassOptions: {
                                    outputStyle: 'compressed'
                                },
                            }
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