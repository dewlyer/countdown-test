define({
    auto:       true,
    appoint:    '1988-09-07 00:00:00',
    current:    Date.now(),
    seconds:    '<div class="digit seconds">',
    minutes:    '<div class="digit minutes">',
    hours:      '<div class="digit hours">',
    days:       '<div class="digit days">',
    marker: {
        seconds:    'S',
        minutes:    'M',
        hours:      'H',
        days:       'D'
    },
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
        '<div>'
});