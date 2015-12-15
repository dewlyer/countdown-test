define(['jquery'], function($){
    return {
        init: function() {
            var self = this;
            self.appoint = new Date(self.settings.appoint);
            self.current = new Date(self.settings.current);
            self.build();
            self.render();
            self.start();
        },
        build: function() {
            var self = this;
            if(self.settings.days) {
                self.$days = $(self.settings.days);
                self.$days.appendTo(self.element);
            }
            if(self.settings.hours) {
                self.$hours = $(self.settings.hours);
                self.$hours.appendTo(self.element);
            }
            if(self.settings.minutes) {
                self.$minutes = $(self.settings.minutes);
                self.$minutes.appendTo(self.element);
            }
            if(self.settings.seconds) {
                self.$seconds = $(self.settings.seconds);
                self.$seconds.appendTo(self.element);
            }
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
        render: function() {
            var self = this;
            self.calculate();
            self.renderUnit(self.$days, self.days, self.settings.marker.days, 9);
            self.renderUnit(self.$hours, self.hours, self.settings.marker.hours, [2,3]);
            self.renderUnit(self.$minutes, self.minutes, self.settings.marker.minutes, [5,9]);
            self.renderUnit(self.$seconds, self.seconds, self.settings.marker.seconds, [5,9]);
            $(self.element).css({
                'width':        $(self.element).outerWidth(),
                'margin-top':   -$(self.element).height() / 2,
                'margin-left':  -$(self.element).width() / 2,
                'left':         '50%',
                'top':          '50%'
            });
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
        clone: function(counts) {
            var self = this;
            var $unitSet = $('<div class="unit-set">');
            for(var i=0; i<=counts; i++) {
                $unitSet.append(self.settings.template);
                $('.unit:last', $unitSet).find('.unit-wrap').text(i);
            }
            return $unitSet;
        },
        refresh: function() {
            var self = this;
            self.calculate(Date.now());
            self.refreshUnit(self.$days, self.days);
            self.refreshUnit(self.$hours, self.hours);
            self.refreshUnit(self.$minutes, self.minutes);
            self.refreshUnit(self.$seconds, self.seconds);
        },
        refreshUnit: function(obj, val) {
            var self = this;
            if(typeof(obj) == 'undefined') return;
            var numbers = self.splitNum(val);

            // numbers change
            var differ = numbers.length - obj.find('.unit-set').length;
            if(differ > 0) {
                obj.find('.unit-set').slice(0, differ).clone().prependTo(obj);
                console.debug(obj.find('.unit-set').slice(0, 1))
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
    }
});