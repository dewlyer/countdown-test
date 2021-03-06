// CountDown类方法定义
// 函数式定义形式
// 没有任何依赖，需做些Setup工作
define(function(){
    // TODO: Setup工作
    return {
        init: function() {
            var self = this;
            self.appoint = new Date(self.settings.appoint);
            self.current = new Date(self.settings.current);
            self.fontSize = 50;
            self.build();
            self.start();
        },
        build: function() {
            var self = this;
            // if(self.settings.days) {
            //     self.$days = $(self.settings.days);
            //     self.$days.appendTo(self.element);
            // }
            // if(self.settings.hours) {
            //     self.$hours = $(self.settings.hours);
            //     self.$hours.appendTo(self.element);
            // }
            // if(self.settings.minutes) {
            //     self.$minutes = $(self.settings.minutes);
            //     self.$minutes.appendTo(self.element);
            // }
            // if(self.settings.seconds) {
            //     self.$seconds = $(self.settings.seconds);
            //     self.$seconds.appendTo(self.element);
            // }
            console.log(self.element);
            self.$canvas = $(self.settings.canvas);
            self.$canvas.appendTo(self.element);
            var width = $(window).innerWidth();
            var height = $(window).innerHeight();
            self.$canvas[0].width = width;
            self.$canvas[0].height = height;
            self.$canvas.css({
                display: 'block',
                width: width,
                height: height
            });
            self.canvas = self.$canvas.get(0);
            self.ctx = self.canvas.getContext('2d');

            self.calculate();
            self.offset = {
                days: {
                    x: 200,
                    y: 0
                },
                hours: {
                    x: 380,
                    y: 0
                },
                minutes: {
                    x: 460,
                    y: 0
                },
                seconds: {
                    x: 540,
                    y: 0
                }
            };
            var strDaysLength = self.days.toString().length < 2 ? 2 : self.days.toString().length;
            var strHoursLength = self.hours.toString().length < 2 ? 2 : self.hours.toString().length;
            var strMinutesLength = self.minutes.toString().length < 2 ? 2 : self.minutes.toString().length;
            var strSecondsLength = self.seconds.toString().length < 2 ? 2 : self.seconds.toString().length;
            var strAllLength =  strDaysLength + strHoursLength + strMinutesLength + strSecondsLength;
            self.offset.days = {
                x: 0 - strAllLength*self.fontSize/2,
                y: 0
            };
            self.offset.hours = {
                x: self.offset.days.x + self.fontSize*strDaysLength,
                y: 0
            };
            self.offset.minutes = {
                x: self.offset.hours.x + self.fontSize*strHoursLength,
                y: 0
            };
            self.offset.seconds = {
                x: self.offset.minutes.x + self.fontSize*strMinutesLength,
                y: 0
            };
        },
        start: function() {
            var self = this;
            self.refresh();
            if(self.settings.auto) {
                self.timer = setInterval(function(){
                    self.refresh();
                }, 1000);
            }
        },
        refresh: function() {
            var self = this;
            self.calculate(Date.now());
            self.refreshCanvas();
            // self.refreshUnit(self.$days, self.days);
            // self.refreshUnit(self.$hours, self.hours);
            // self.refreshUnit(self.$minutes, self.minutes);
            // self.refreshUnit(self.$seconds, self.seconds);
        },
        refreshCanvas: function() {
            var self = this;
            self.cleanCanvas();
            self.render();
        },
        refreshUnit: function(obj, val) {
            var self = this;
            if(typeof(obj) == 'undefined') return;
            var numbers = self.splitNum(val);

            // numbers change
            var differ = numbers.length - obj.find('.unit-set').length;
            if(differ > 0) {
                obj.find('.unit-set').slice(0, differ).clone().prependTo(obj);
                //console.debug(obj.find('.unit-set').slice(0, 1));
            }
            else if(differ < 0) {
                obj.find('.unit-set').slice(differ).remove();
            }

            var $unitSet = obj.find('.unit-set');
            $.each(numbers, function(index, value) {
                var $unit = $unitSet.eq(index).find('.unit');
                if($unit.data('value') == value) return true;

                $unit.data('value', value);
                var unitPrev = value-1;
                var unitNext = value==$unit.length-1 ? 0 : value+1;
                $unit.removeClass('active previous following');
                if(self.comming) {
                    $unit.eq(unitNext).addClass('following');
                }
                else {
                    $unit.eq(unitPrev).addClass('previous');
                }
                $unit.eq(value).addClass('active');
            });

        },
        render: function() {
            var self = this;
            self.renderCanvas(self.days, self.offset.days, self.settings.marker.days);
            self.renderCanvas(self.hours, self.offset.hours, self.settings.marker.hours);
            self.renderCanvas(self.minutes, self.offset.minutes, self.settings.marker.minutes);
            self.renderCanvas(self.seconds, self.offset.seconds, self.settings.marker.seconds);
            // self.renderUnit(self.$days, self.days, self.settings.marker.days, 9);
            // self.renderUnit(self.$hours, self.hours, self.settings.marker.hours, [2,9]);
            // self.renderUnit(self.$minutes, self.minutes, self.settings.marker.minutes, [5,9]);
            // self.renderUnit(self.$seconds, self.seconds, self.settings.marker.seconds, [5,9]);
            // $(self.element).css({
            //     'width':        $(self.element).outerWidth(),
            //     'margin-top':   -$(self.element).height() / 2,
            //     'margin-left':  -$(self.element).width() / 2,
            //     'left':         '50%',
            //     'top':          '50%'
            // });
        },
        renderCanvas: function(val, offset, mark) {
            var self = this;
            var ctx = self.ctx;
            self.setRenderStyle();
            ctx.save();
            ctx.translate(self.canvas.width/2, self.canvas.height/2);
            val = val < 10 ? '0' + val : val;
            ctx.fillText(val, offset.x, offset.y);
            ctx.fillText(mark, offset.x-self.fontSize, offset.y);
            ctx.restore();
            // var numbers = self.splitNum(val);
            // $.each(numbers, function(index, value) {
            //     var counts = 9;
            //     if(radix) {
            //         counts = $.isArray(radix) ? radix[index] : radix;
            //     }
            //     var $unitSetClone = self.clone(counts);
            //     $unitSetClone.data('value', value);
            //     obj.append($unitSetClone);
            // });
            // obj.append('<div class="split">'+ mark +'</div>');
        },
        renderUnit: function(obj, val, mark, radix) {
            if(typeof(obj) == 'undefined') return;
            var self = this;
            var numbers = self.splitNum(val);
            $.each(numbers, function(index, value) {
                var counts = 9;
                if(radix) {
                    counts = $.isArray(radix) ? radix[index] : radix;
                }
                var $unitSetClone = self.clone(counts);
                $unitSetClone.data('value', value);
                obj.append($unitSetClone);
            });
            obj.append('<div class="split">'+ mark +'</div>');
        },
        cleanCanvas: function () {
            var self = this;
            var ctx = self.ctx;
            ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        },
        setRenderStyle: function () {
            var self = this;
            var ctx = self.ctx;
            ctx.font = self.fontSize+"px Arial";
            ctx.fillStyle = '#333333';
            ctx.textAlign='center';//文本水平对齐方式
            ctx.textBaseline='middle';//文本垂直方向，基线位置

            // ctx.shadowColor = 'rgba(0,0,0,0.5)';
            // ctx.shadowOffsetX = 2;
            // ctx.shadowOffsetY = 2;
            // ctx.shadowBlur = 3;
        },
        clone: function(counts) {
            var self = this;
            var $unitSet = $('<div class="unit-set">');
            for(var i=0; i<=counts; i++) {
                $unitSet.append(self.settings.template);
                $('.unit:last', $unitSet).find('.unit-wrap').text(i);
            }
            return $unitSet;
        },
        splitNum: function(val) {
            var numbs = [], digit = 0;
            do {
                digit = val % 10;
                val = parseInt(val / 10);
                numbs.push(digit);
            }
            while(val>=1);
            if(numbs.length<=1){
                numbs.push(0);
            }
            numbs.reverse();
            return numbs;
        },
        calculate: function(current) {
            var self = this;
            current = current || self.current;
            self.comming  = current < self.appoint;

            var totalMsec = Math.abs(current - self.appoint);
            var totalSec = totalMsec / 1000;
            self.seconds = Math.floor(totalSec) % 60;
            self.minutes = Math.floor(totalSec/60) % 60;
            self.hours = Math.floor(totalSec/3600) % 24;
            self.days = Math.floor(totalSec/86400);
        }
    };
});