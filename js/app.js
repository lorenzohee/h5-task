/**
 * Created by Administrator on 2016/6/23.
 */
requirejs.config({
    baseUrl: 'js/app',
    paths: {
        zepto: '../lib/zepto.min',
        underscore: '../lib/underscore',
        bootstrap: '../lib/bootstrap.min',
        handlebars: '../lib/handlebars-v4.0.5'
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
require(['main', 'zepto'], function(task, $){
    $(document).ready(task.init());
})