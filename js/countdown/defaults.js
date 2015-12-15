define({
    auto:       true,
    appoint:    Date.now() + 86400*1000*100,
    current:    Date.now(),
    days:       '<div class="digit days">',
    hours:      '<div class="digit hours">',
    minutes:    '<div class="digit minutes">',
    seconds:    '<div class="digit seconds">',
    marker: {
        seconds:    '',
        minutes:    ':',
        hours:      ':',
        days:       '-'
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