define(['jquery'], function($){
    return {
        calculate: function() {
            var totalMsec = Math.abs(this.current - this.appoint);
            var totalSec = totalMsec / 1000;
            this.seconds = Math.floor(totalSec) % 60;
            this.minutes = Math.floor(totalSec/60) % 60;
            this.hours = Math.floor(totalSec/3600) % 24;
            this.days = Math.floor(totalSec/86400);
            //this.days = parseInt(this.totalSec / 3600 / 24);
            //this.hours = parseInt((this.totalSec - this.days*24*3600) / 3600);
            //this.minutes = parseInt((this.totalSec - this.days*24*3600 - this.hours*3600) / 60);
            //this.seconds = parseInt(this.totalSec - this.days*24*3600 - this.hours*3600 - this.minutes*60);
        },
        init: function() {
            var self = this;
            self.build();
            self.calculate();
            self.render();

            setTimeout(function(){
                self.refreshUnit(self.$seconds, 1);
            }, 1000);
        },
        build: function() {
            this.appoint = new Date(this.settings.appoint);
            this.current = new Date(this.settings.current);
            this.$days = $(this.settings.days);
            this.$hours = $(this.settings.hours);
            this.$minutes = $(this.settings.minutes);
            this.$seconds = $(this.settings.seconds);
            $(this.element).append(this.$days).append(this.$hours).append(this.$minutes).append(this.$seconds);
        },
        render: function() {
            this.renderUnit(this.$days, this.days, this.settings.marker.days);
            this.renderUnit(this.$hours, this.hours, this.settings.marker.hours);
            this.renderUnit(this.$minutes, this.minutes, this.settings.marker.minutes);
            this.renderUnit(this.$seconds, this.seconds, this.settings.marker.seconds);

            $(this.element).css({
                'width':        $(this.element).outerWidth(),
                'margin-top':   -$(this.element).height() / 2,
                'margin-left':  -$(this.element).width() / 2,
                'left':         '50%',
                'top':          '50%'
            });
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
        refreshUnit: function(obj, val){
            var numbers = this.splitNum(val);
            for(var j in numbers) {
                obj.find('.unit-set').eq(j).find('.unit').removeClass('active').eq(numbers[j]).addClass('active');
            }
            //debugger;
            console.info('%crefreshUnit','font-weight:bold');
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