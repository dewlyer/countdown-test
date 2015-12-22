// CountDown类定义
// 本模块依赖于defaults，prototype两个模块
// PS：'./defaults', './prototype' 查询当前文档所在目录中的 defaults.js & prototype.js
define(['./defaults', './prototype'], function(defaults, prototype){
    var CountDown = function(element, options) {
        this.timer = null;
        this.comming = true;
        this.element = element;
        this.defaults = defaults;
        this.options = options;
        this.settings = $.extend({}, this.defaults, this.options);
    };
    CountDown.prototype = prototype;
    return CountDown;
});