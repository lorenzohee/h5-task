/**
 * Created by Administrator on 2016/6/23.
 */
requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        zepto: 'zepto.min',
        underscore: 'underscore',
        bootstrap: 'bootstrap.min',
        handlebars: 'handlebars-v4.0.5.js'
    },
    shim: {
        zepto: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        }
    }
});
require(['zepto', 'underscore'], function($, _){
    console.log('log test!');
})