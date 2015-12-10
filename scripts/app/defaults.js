define({
    auto:       true,
    appoint:    '1988-09-07 00:00:00',
    current:    Date.now(),
    seconds:    '<div class="digit seconds"></div>',
    minutes:    '<div class="digit minutes"></div>',
    hours:      '<div class="digit hours"></div>',
    days:       '<div class="digit days"></div>',
    template: '' +
        '<div class="unit">' +
        '  <div class="unit-top">' +
        '    <span class="unit-wrap"></span>' +
        '  </div>' +
        '  <div class="unit-shadow-top"></div>' +
        '  <div class="unit-bottom">' +
        '    <span class="unit-wrap"></span>' +
        '  </div>' +
        '  <div class="unit-shadow-bottom"></div>' +
        '<div>',
    marker: {
        seconds:    'S',
        minutes:    'M',
        hours:      'H',
        days:       'D'
    }
});