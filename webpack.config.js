'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development'; // константа переключения между разработкой и сборкой для прод. версии!
const webpack = require('webpack');

module.exports = {
  //  entry: "./home", // что будет входной точкой? если она одна
    context: __dirname + '/frontend', // специальная переменная относительно которой будет идти поиск модулей
    entry: { // если же множественная то нам нужно указать явно все файлы для сборки ентрипоинт становиться обьектом!
        app: './app',
        home: "./home",
        about: "./about",
    //  common : "./common" // можно добавить не только одинаковый код но и дописать свой
    },
    output: {
        path: __dirname + '/public/js', //указываем абсолютный путь к директории
       // filename: "build.js", //куда будет компилиться если у нас 1 точка входу
        publicPath: '/js/', // явно указывает откуда подгружать скрипты
        filename: "[name].js" // специальная конструкция в которую будут собираться соответствующие файлы home = home.js

    //    library: '[name]' // создаем глобальную переменную что бы явно использовать в проекте
    },
    watch: NODE_ENV == 'development', //следить за изминениями
    //задает опции для перезапуска сборки по умолчанию 300мс
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? "source-map" : null,
    plugins: [   // https://webpack.github.io/docs/list-of-plugins.html
        new webpack.NoErrorsPlugin(), // плагин для того что бы во время сборки с ошибками вебпак не гинерил файлы с ошибками
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        }),
        new webpack.optimize.CommonsChunkPlugin({ // создает файл в котором собирается дублирующийся код* webpack --display-modules
            name : "common",
            // minChunks: 2, // если в 2 файлах сборки используеться одинаковый код он уже будет его выносить
            // по умолчанию не будет если хоть в одном не используеться
         //   chunks: ['about', 'home'] //явно указываем откуда взять повторяющийся код и положить в файл common.js
        }),
        /*new webpack.optimize.CommonsChunkPlugin({ // можем использовать много раз для того тчо бы указать нужные файлы явно
            name : "common-price",
            chunks: ['price', 'order'] //выберем из этих страниц
        })*/
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
