// Require.js参数配置
requirejs.config({
    // 所有模块的查找根路径
    baseUrl: 'js',
    // 映射那些不直接放置于baseUrl下的模块名。路径相对于baseUrl开始
    paths: {
        jquery: 'jquery/1.9.1/jquery.min'
    },
    // 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置（可选）
    shim: {
        //'foo': {
        //    deps: ['bar'],
        //    exports: 'Foo'
        //}
    }
});

// 主程启动，加载依赖-app.js，完成后启用插件-countdown
// PS:这里requirejs方法等同于require方法
requirejs(['app'], function(){
    // app模块加载 执行回调函数
    // 这里可以使用app以及app所依赖模块的代码
    $('<div>', {
        'id':       "countdown",
        'class':    "countdown"
    }).prependTo(document.body).countdown({
        appoint:    '2016/01/18 00:00:00'
    });
});