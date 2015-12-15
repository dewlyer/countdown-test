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
