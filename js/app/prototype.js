define(['jquery'], function($){
    return {
        init: function() {
            var self = this;
            self.appoint = new Date(self.settings.appoint);
            self.current = new Date(self.settings.current);
            self.build();
            self.render();
        },
        build: function() {
            var self = this;
            self.$days = $(self.settings.days);
            self.$hours = $(self.settings.hours);
            self.$minutes = $(self.settings.minutes);
            self.$seconds = $(self.settings.seconds);
            $(self.element).append(self.$days).append(self.$hours).append(self.$minutes).append(self.$seconds);
            self.calculate();
        },
        calculate: function(current) {
            var self = this;
            current = current || self.current;
            var totalMsec = Math.abs(current - self.appoint);
            var totalSec = totalMsec / 1000;
            self.seconds = Math.floor(totalSec) % 60;
            self.minutes = Math.floor(totalSec/60) % 60;
            self.hours = Math.floor(totalSec/3600) % 24;
            self.days = Math.floor(totalSec/86400);
            //this.days = parseInt(this.totalSec / 3600 / 24);this.hours = parseInt((this.totalSec - this.days*24*3600) / 3600);this.minutes = parseInt((this.totalSec - this.days*24*3600 - this.hours*3600) / 60);this.seconds = parseInt(this.totalSec - this.days*24*3600 - this.hours*3600 - this.minutes*60);
        },
        render: function() {
            var self = this;
            self.renderUnit(self.$days, self.days, self.settings.marker.days);
            self.renderUnit(self.$hours, self.hours, self.settings.marker.hours);
            self.renderUnit(self.$minutes, self.minutes, self.settings.marker.minutes);
            self.renderUnit(self.$seconds, self.seconds, self.settings.marker.seconds);
            $(self.element).css({
                'width':        $(self.element).outerWidth(),
                'margin-top':   -$(self.element).height() / 2,
                'margin-left':  -$(self.element).width() / 2,
                'left':         '50%',
                'top':          '50%'
            });
            self.timer = setInterval(function(){
                self.refresh();
            }, 1000);
        },
        renderUnit: function(obj, val, mark) {
            var $unitSet = $('<div class="unit-set"></div>');
            for(var i=0; i<=9; i++) {
                $unitSet.append(this.settings.template);
                $('.unit:last', $unitSet).find('.unit-wrap').text(i);
            }

            var numbers = this.splitNum(val);
            for(var j in numbers) {
                var $unitSetClone = $unitSet.clone();
                $unitSetClone.find('.unit').eq(numbers[j]).addClass('active');
                obj.append($unitSetClone);
            }
            obj.append('<div class="split">'+ mark +'</div>');
        },
        refresh: function(){
            var self = this;
            self.calculate(Date.now());
            self.refreshUnit(self.$days, self.days);
            self.refreshUnit(self.$hours, self.hours);
            self.refreshUnit(self.$minutes, self.minutes);
            self.refreshUnit(self.$seconds, self.seconds);
        },
        refreshUnit: function(obj, val){
            var numbers = this.splitNum(val);
            for(var j in numbers) {
                var $units = obj.find('.unit-set').eq(j).find('.unit');
                $units.removeClass('active previous');
                $units.eq(numbers[j]-1).addClass('previous');
                $units.eq(numbers[j]).addClass('active');
            }
        },
        splitNum: function(val) {
            var numbs = [], digit = 0;
            do {
                digit = val % 10;
                val = parseInt(val / 10);
                numbs.push(digit);
            }
            while(val>=1);

            if(numbs.length<=1){ numbs.push(0); }
            numbs.reverse();
            return numbs;
        },
        count: function() {
            var self = this;
            this.timer = setInterval(function() {
                //self.calculate();
                //console.log(self.seconds);
                //self.settings.seconds.find('unit-set>.unit').eq(self.seconds).addClass('active');
            }, 1000);
        }
    }
});