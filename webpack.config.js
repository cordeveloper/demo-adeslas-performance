const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngQuant = require('imagemin-pngquant');
const imageminOptiPng = require('imagemin-optipng');
const CompressionPlugin = require('compression-webpack-plugin');

function getArg(key, defaultVal) {
    var index = process.argv.indexOf(key),
        next = process.argv[index + 1];

    defaultVal = defaultVal || null;

    return (index < 0) ? defaultVal : (!next || next[0] === "-") ? true : next;
}

const prod =  getArg('--mode') === 'production'  ? true : false;


// Desarrollo

module.exports = {
    entry: './entry.js',
    output: {
        filename: 'assets/js/app.[contenthash].js'
    },
    module: {
        rules: [
         
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: true,
                }
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/i, 
                exclude: [/webfonts/],
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                    outputPath: 'assets/images'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/i,
                exclude: [ /images/],
                loader: 'file-loader',
                options:{
                    outputPath: 'assets/webfonts'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            ignoreOrder: true,
                        }
                    },
                   
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            ignoreOrder: false,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        } 
                    }
                   
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            title: 'Adeslas Performance',
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/style.css',
            chunkFilename: 'chunk-[name].css',
        }),

      

            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
    

        new CopyPlugin([{
            from: './assets/images',
            to: path.resolve("./dist/assets/", `images`)
          }]),
        
        new CopyPlugin([{
        from: './assets/webfonts',
        to: path.resolve("./dist/assets/", `webfonts`)
        }]),  

        new CopyPlugin([{
            from: './assets/css/fonts',
            to: path.resolve("./dist/assets/css", `./`)
        }]),  
        new CompressionPlugin({
            algorithm: 'gzip'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',    
        }
      
    }

}

// Produccion

if(prod) {
    module.exports.plugins.push(
        new CleanWebpackPlugin(),
       new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 1920,
            height: 1080,
            penthouse: {
                blockJSRequests: false,
              }
           
        }),
      
        new ImageminPlugin({
          
            test: 'assets/images/**',
            plugins: [
              imageminMozjpeg({
                quality: 65,
                progressive: true
              }),
              imageminOptiPng({
      
              }),
              imageminPngQuant({
                quality: [0.65, 0.90],
                speed: 4
              })
            ]
          }),
          new CopyPlugin([{
            from: './assets/images',
            to: path.resolve("./dist/assets/", `images`)
          }]),
        new PurgecssPlugin({
            paths: glob.sync(path.join(__dirname, './**/*'),  { nodir: true }),
        }),
    )
}


