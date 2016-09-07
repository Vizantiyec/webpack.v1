'use strict';

document.getElementById('login').onclick = function(){
    require.ensure([], function(require){
        let login = require('./login');
        login();
    });

};