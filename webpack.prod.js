const HtmlWebPackPlugin =           require('html-webpack-plugin');
const MiniCSS =                     require('mini-css-extract-plugin');
const optimizeCssAssetsPlugin =     require('optimize-css-assets-webpack-plugin')
const copyPlugin =                  require('copy-webpack-plugin');
const MinifyPlugin =                require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } =      require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    optimization: {
        minimizer:[ new optimizeCssAssetsPlugin() ]
    },
    output: {
        filename: "main.[contentHash].js"
    },
    module: {
        rules: [
            {
              test: /\.css$/,
                exclude: /styles\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use:[
                    MiniCSS.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: "html-loader",
                        options: {
                            attributes: false,
                        },
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        esModule: false
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCSS({
            filename: "[name].[contentHash].css",
            ignoreOrder: false
        }),
        new copyPlugin({
            patterns: [
                {from: "src/assets", to: "assets/"}
            ],
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
]}
