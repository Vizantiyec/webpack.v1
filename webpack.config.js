'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development'; // константа переключения между разработкой и сборкой для прод. версии!
const webpack = require('webpack');

module.exports = {
    entry: "./home", // что будет входной точкой
    output: {
        filename: "build.js", //куда будет компилиться
        library: 'home' // создаем глобальную переменную
    },
    watch: NODE_ENV == 'development', //следить за изминениями
    //задает опции для перезапуска сборки по умолчанию 300мс
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? "source-map" : null,
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ],
    resolve: { //https://webpack.github.io/docs/configuration.html#resolve
        modulesDirectories: ['node_modules'], // говорит в какой папке искать модули
        extensions: ['', '.js'] // с каким расширением искать
    },
    resolveLoaders: { //конкретно к модулям
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'], // например если просто babel = то будет искать babel-loader или то что передали
        extensions: ['', '.js']
    },
    module: {
          loaders: [{
              test: /\.js$/, //проверяет путь к файлу, все файлы которые заканчиваються на .js будут проходить через лдоадер байбла
              loader: "babel?presets[]=es2015" //версия бабеля которая будет использоваться
          }]
    }
};
    if(NODE_ENV == 'production') { //если запустить NODE_ENV='production' webpack все консол логи уберуться. а файлы будут сжаты!
        module.exports.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                    unsafe: true
                }
            })
        )
    }
