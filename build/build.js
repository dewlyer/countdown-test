({
    appDir: './',
    baseUrl: 'js',
    dir: '../built',
    paths: {
        jquery: 'jquery/1.9.1/jquery.min'
    },
    modules: [
        {
            name: 'app'
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