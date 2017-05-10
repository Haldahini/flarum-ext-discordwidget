var gulp = require('flarum-gulp');

gulp({
    modules: {
        'hugogit/discordwidget': [
            'src/**/*.js'
        ]
    }
});