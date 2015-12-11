requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: '../jquery/1.9.1/jquery.min'
    }
});

requirejs(['app'], function(){
    var $countdown = $('<div id="countdown" class="countdown"></div>');
    $countdown.prependTo(document.body).countdown({
        appoint: '1988/09/07 00:00:00',
        //appoint: '2016/01/18 00:00:00',
        auto: false,
        marker: {
            //seconds:    '\u79D2',
            //minutes:    '\u5206',
            //hours:      '\u65F6',
            //days:       '\u5929'
            seconds:    '',
            minutes:    ':',
            hours:      ':',
            days:       '-'
        }
    });
});