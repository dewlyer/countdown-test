requirejs.config({baseUrl:"dist/js",paths:{jquery:"jquery/1.9.1/jquery.min"},shim:{}}),requirejs(["app"],function(){$("<div>",{id:"countdown","class":"countdown"}).prependTo(document.body).countdown({appoint:"2016/01/18 00:00:00"})});