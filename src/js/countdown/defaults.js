// CountDown 默认参数定义
// 模块仅含值对，没有任何依赖的定义形式
define({
    auto:       true,
    appoint:    Date.now() + 86400*1000*100,
    current:    Date.now(),
    days:       '<div class="digit days">',
    hours:      '<div class="digit hours">',
    minutes:    '<div class="digit minutes">',
    seconds:    '<div class="digit seconds">',
    marker: {
        seconds:    ':',
        minutes:    ':',
        hours:      '-',
        days:       ''
    },
    canvas: '<canvas id="canvas" class="canvas" width="600" height="300">' +
                '<p>您的浏览器不支持Canvas！</p>' +
            '</canvas>',
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