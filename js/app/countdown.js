define(['jquery', './defaults', './prototype'], function($, defaults, prototype){
    var CountDown = function(element, options) {
        this.timer = null;
        this.element = element;
        this.defaults = defaults;
        this.options = options;
        this.settings = $.extend({}, this.defaults, this.options);

        this.init();
    };
    CountDown.prototype = prototype;
    return CountDown;
});