/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */
 
import { extend } from 'flarum/extend';
import app from 'flarum/app';
import saveSettings from 'flarum/utils/saveSettings';
import PermissionGrid from 'flarum/components/PermissionGrid';

import addDiscordWidgetPane from 'hugogit/discordwidget/addDiscordWidgetPane'

app.initializers.add('hugogit-discord-widget', app => {
    
    // add the admin pane
    addDiscordWidgetPane();

    // add the permission option to the relative pane
    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('discordWidget', {
            icon: 'comments-o',
            label: 'Discord Widget',
            permission: 'hugogit.discordwidget.edit'
        });
    });
});
