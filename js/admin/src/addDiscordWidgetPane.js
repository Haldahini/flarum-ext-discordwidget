/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */
 
import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';

import DiscordWidgetPage from 'hugogit/discordwidget/components/DiscordWidgetPage';

export default function() {
    // create the route
    app.routes['discord-widget'] = {path: '/discord-widget', component: DiscordWidgetPage.component()};

    // bind the route we created to the three dots settings button
    app.extensionSettings['hugogit-discord-widget'] = () => m.route(app.route('discord-widget'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('discord-widget', AdminLinkButton.component({
            href: app.route('discord-widget'),
            icon: 'comments-o',
            children: 'Discord Widget',
            description: 'Edit Discord Widget'
        }));
    });
}
