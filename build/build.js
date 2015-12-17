({
    appDir: '../',
    dir: '../dist',
    optimize: "uglify",
    optimizeCss: "standard",
    mainConfigFile: "../js/main.js",
    removeCombined: true,
    fileExclusionRegExp: /(^\.|^build)/,
    //baseUrl: 'js',
    //paths: {
    //    jquery: 'jquery/1.9.1/jquery.min'
    //},
    modules: [
        {
            name: 'app',
            exclude: [
                "jquery"
            ]
        },
        {
            name: 'countdown/constructor'
        },
        {
            name: 'countdown/defaults'
        },
        {
            name: 'countdown/prototype'
        }
    ]
})
