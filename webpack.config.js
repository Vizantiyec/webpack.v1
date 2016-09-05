'use strict';

module.exports = {
    entry: "./home", // что будет входной точкой
    output: {
        filename: "build.js", //куда будет компилиться
        library: 'home' // создаем глобальную переменную
    },
    watch: true, //следить за изминениями
    //задает опции для перезапуска сборки по умолчанию 300мс
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: "source-map"
};