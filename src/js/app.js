// App主程模块定义
// Require.js模块定义：存在依赖的函数式定义（常用方式）
// 第一个参数是依赖的名称数组；第二个参数是回调函数，回调函数参数列表应与依赖名称一一对应
define(['jquery', 'countdown/constructor'], function($, CountDown) {
    $.fn.countdown = function(options) {
        return this.each(function() {
            var countdown = new CountDown(this, options);
            if(!$(this).data('countdown')) {
                $(this).data('countdown', countdown);
            }
            countdown.init();
        });
    };
});
