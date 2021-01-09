const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "./js/[name].js",
        library: 'myApp'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "src/scss"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, "src/includes"),
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    ['svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false
                                }
                            ]
                        }
                    ]
                ]
            }
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: "src/images", 
                    to: "images" 
                },
                { 
                    from: "src/fonts",
                    to: "./" 
                },
                { 
                    from: "src/images/favicon.ico", 
                    to: "./" 
                },
            ]
        })
    ],
    optimization: {
        splitChunks: { 
            chunks: "all" 
        }
    }
};
