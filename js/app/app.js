define(['jquery', './countdown'], function($, CountDown) {
    $.fn.countdown = function(options) {
        return this.each(function() {
            if(!$(this).data('countdown')) {
                $(this).data('countdown', new CountDown(this, options));
            }
        });
    };
});
