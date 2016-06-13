define("countdown/defaults",{auto:!0,appoint:Date.now()+864e7,current:Date.now(),days:'<div class="digit days">',hours:'<div class="digit hours">',minutes:'<div class="digit minutes">',seconds:'<div class="digit seconds">',marker:{seconds:"",minutes:":",hours:":",days:"-"},template:'<div class="unit">  <div class="unit-top">    <span class="unit-wrap"></span>  </div>  <div class="unit-shadow-top"></div>  <div class="unit-bottom">    <span class="unit-wrap"></span>  </div>  <div class="unit-shadow-bottom"></div><div>'}),define("countdown/prototype",[],function(){return{init:function(){var t=this;t.appoint=new Date(t.settings.appoint),t.current=new Date(t.settings.current),t.build(),t.render(),t.start()},build:function(){var t=this;t.settings.days&&(t.$days=$(t.settings.days),t.$days.appendTo(t.element)),t.settings.hours&&(t.$hours=$(t.settings.hours),t.$hours.appendTo(t.element)),t.settings.minutes&&(t.$minutes=$(t.settings.minutes),t.$minutes.appendTo(t.element)),t.settings.seconds&&(t.$seconds=$(t.settings.seconds),t.$seconds.appendTo(t.element))},start:function(){var t=this;t.refresh(),t.settings.auto&&(t.timer=setInterval(function(){t.refresh()},1e3))},render:function(){var t=this;t.calculate(),t.renderUnit(t.$days,t.days,t.settings.marker.days,9),t.renderUnit(t.$hours,t.hours,t.settings.marker.hours,[2,9]),t.renderUnit(t.$minutes,t.minutes,t.settings.marker.minutes,[5,9]),t.renderUnit(t.$seconds,t.seconds,t.settings.marker.seconds,[5,9]),$(t.element).css({width:$(t.element).outerWidth(),"margin-top":-$(t.element).height()/2,"margin-left":-$(t.element).width()/2,left:"50%",top:"50%"})},renderUnit:function(t,e,n,s){if("undefined"!=typeof t){var i=this,o=i.splitNum(e);$.each(o,function(e,n){var o=9;s&&(o=$.isArray(s)?s[e]:s);var a=i.clone(o);a.data("value",n),t.append(a)}),t.append('<div class="split">'+n+"</div>")}},clone:function(t){for(var e=this,n=$('<div class="unit-set">'),s=0;t>=s;s++)n.append(e.settings.template),$(".unit:last",n).find(".unit-wrap").text(s);return n},refresh:function(){var t=this;t.calculate(Date.now()),t.refreshUnit(t.$days,t.days),t.refreshUnit(t.$hours,t.hours),t.refreshUnit(t.$minutes,t.minutes),t.refreshUnit(t.$seconds,t.seconds)},refreshUnit:function(t,e){var n=this;if("undefined"!=typeof t){var s=n.splitNum(e),i=s.length-t.find(".unit-set").length;i>0?t.find(".unit-set").slice(0,i).clone().prependTo(t):0>i&&t.find(".unit-set").slice(i).remove();var o=t.find(".unit-set");$.each(s,function(t,e){var s=o.eq(t).find(".unit");if(s.data("value")==e)return!0;s.data("value",e);var i=e-1,a=e==s.length-1?0:e+1;s.removeClass("active previous following"),n.comming?s.eq(a).addClass("following"):s.eq(i).addClass("previous"),s.eq(e).addClass("active")})}},splitNum:function(t){var e=[],n=0;do n=t%10,t=parseInt(t/10),e.push(n);while(t>=1);return e.length<=1&&e.push(0),e.reverse(),e},calculate:function(t){var e=this;t=t||e.current,e.comming=t<e.appoint;var n=Math.abs(t-e.appoint),s=n/1e3;e.seconds=Math.floor(s)%60,e.minutes=Math.floor(s/60)%60,e.hours=Math.floor(s/3600)%24,e.days=Math.floor(s/86400)}}}),define("countdown/constructor",["./defaults","./prototype"],function(t,e){var n=function(e,n){this.timer=null,this.comming=!0,this.element=e,this.defaults=t,this.options=n,this.settings=$.extend({},this.defaults,this.options)};return n.prototype=e,n}),define("app",["jquery","countdown/constructor"],function(t,e){t.fn.countdown=function(n){return this.each(function(){var s=new e(this,n);t(this).data("countdown")||t(this).data("countdown",s),s.init()})}}),requirejs.config({baseUrl:"../dist/js",paths:{jquery:"../../libs/jquery/dist/jquery.min"},shim:{}}),requirejs(["app"],function(){$("<div>",{id:"countdown","class":"countdown"}).prependTo(document.body).countdown({appoint:"1988/09/07 00:00:00"})}),define("main.js",function(){});