define("countdownprototype.js",[],function(){return{init:function(){var t=this;t.appoint=new Date(t.settings.appoint),t.current=new Date(t.settings.current),t.fontSize=50,t.build(),t.start()},build:function(){var t=this;console.log(t.element),t.$canvas=$(t.settings.canvas),t.$canvas.appendTo(t.element);var e=$(window).innerWidth(),n=$(window).innerHeight();t.$canvas[0].width=e,t.$canvas[0].height=n,t.$canvas.css({display:"block",width:e,height:n}),t.canvas=t.$canvas.get(0),t.ctx=t.canvas.getContext("2d"),t.calculate(),t.offset={days:{x:200,y:0},hours:{x:380,y:0},minutes:{x:460,y:0},seconds:{x:540,y:0}};var s=t.days.toString().length<2?2:t.days.toString().length,a=t.hours.toString().length<2?2:t.hours.toString().length,i=t.minutes.toString().length<2?2:t.minutes.toString().length,r=t.seconds.toString().length<2?2:t.seconds.toString().length,o=s+a+i+r;t.offset.days={x:0-o*t.fontSize/2,y:0},t.offset.hours={x:t.offset.days.x+t.fontSize*s,y:0},t.offset.minutes={x:t.offset.hours.x+t.fontSize*a,y:0},t.offset.seconds={x:t.offset.minutes.x+t.fontSize*i,y:0}},start:function(){var t=this;t.refresh(),t.settings.auto&&(t.timer=setInterval(function(){t.refresh()},1e3))},refresh:function(){var t=this;t.calculate(Date.now()),t.refreshCanvas()},refreshCanvas:function(){var t=this;t.cleanCanvas(),t.render()},refreshUnit:function(t,e){var n=this;if("undefined"!=typeof t){var s=n.splitNum(e),a=s.length-t.find(".unit-set").length;a>0?t.find(".unit-set").slice(0,a).clone().prependTo(t):0>a&&t.find(".unit-set").slice(a).remove();var i=t.find(".unit-set");$.each(s,function(t,e){var s=i.eq(t).find(".unit");if(s.data("value")==e)return!0;s.data("value",e);var a=e-1,r=e==s.length-1?0:e+1;s.removeClass("active previous following"),n.comming?s.eq(r).addClass("following"):s.eq(a).addClass("previous"),s.eq(e).addClass("active")})}},render:function(){var t=this;t.renderCanvas(t.days,t.offset.days,t.settings.marker.days),t.renderCanvas(t.hours,t.offset.hours,t.settings.marker.hours),t.renderCanvas(t.minutes,t.offset.minutes,t.settings.marker.minutes),t.renderCanvas(t.seconds,t.offset.seconds,t.settings.marker.seconds)},renderCanvas:function(t,e,n){var s=this,a=s.ctx;s.setRenderStyle(),a.save(),a.translate(s.canvas.width/2,s.canvas.height/2),t=10>t?"0"+t:t,a.fillText(t,e.x,e.y),a.fillText(n,e.x-s.fontSize,e.y),a.restore()},renderUnit:function(t,e,n,s){if("undefined"!=typeof t){var a=this,i=a.splitNum(e);$.each(i,function(e,n){var i=9;s&&(i=$.isArray(s)?s[e]:s);var r=a.clone(i);r.data("value",n),t.append(r)}),t.append('<div class="split">'+n+"</div>")}},cleanCanvas:function(){var t=this,e=t.ctx;e.clearRect(0,0,t.canvas.width,t.canvas.height)},setRenderStyle:function(){var t=this,e=t.ctx;e.font=t.fontSize+"px Arial",e.fillStyle="#333333",e.textAlign="center",e.textBaseline="middle"},clone:function(t){for(var e=this,n=$('<div class="unit-set">'),s=0;t>=s;s++)n.append(e.settings.template),$(".unit:last",n).find(".unit-wrap").text(s);return n},splitNum:function(t){var e=[],n=0;do n=t%10,t=parseInt(t/10),e.push(n);while(t>=1);return e.length<=1&&e.push(0),e.reverse(),e},calculate:function(t){var e=this;t=t||e.current,e.comming=t<e.appoint;var n=Math.abs(t-e.appoint),s=n/1e3;e.seconds=Math.floor(s)%60,e.minutes=Math.floor(s/60)%60,e.hours=Math.floor(s/3600)%24,e.days=Math.floor(s/86400)}}});