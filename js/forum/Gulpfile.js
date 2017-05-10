var flarum = require('flarum-gulp');

flarum({
    modules: {
        'hugogit/discordwidget': [
            'src/**/*.js'
        ]
    }
});