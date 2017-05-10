/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */
 
import Component from "flarum/Component";
import Button from "flarum/components/Button";
import saveSettings from "flarum/utils/saveSettings";
import Alert from "flarum/components/Alert";
import FieldSet from "flarum/components/FieldSet";

export default class DiscordWidgetPage extends Component {

    init() {
        // whether we are saving the settings or not right now
        this.loading = false;

        // the fields we need to watch and to save
        this.fields = [
            'discord_widget_id'
        ];

        this.values = {};

        // get the saved settings from the database
        const settings = app.data.settings;

        this.fields.forEach(key => this.values[key] = m.prop(settings[key]));
    }

    /**
    * Show the actual DiscordWidgetPage.
    *
    * @returns {*}
    */
    view() {
        return [
            m('div', {className: 'DiscordWidgetPage'}, [
                m('div', {className: 'container'}, [
                    m('form', {onsubmit: this.onsubmit.bind(this)}, [
                        m('div', {className: 'DiscordWidgetPage-id'}, [
                            FieldSet.component({
                                label: 'Discord Widget Settings',
                                children: [
                                    m('label', {}, 'Set your discord server id here :'),
                                    m('input', {
                                        className: 'FormControl',
                                        value: this.values.discord_widget_id() || '',
                                        oninput: m.withAttr('value', this.values.discord_widget_id)
                                    }),
                                ]
                            })
                        ]),
                        Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: 'Envoyer',
                            loading: this.loading
                        }),
                    ])
                ])
            ])
        ];
    }

    /**
    * Saves the settings to the database and redraw the page
    *
    * @param e
    */
    onsubmit(e) {
        // prevent the usual form submit behaviour
        e.preventDefault();

        // if the page is already saving, do nothing
        if (this.loading) return;

        // prevents multiple savings
        this.loading = true;
        app.alerts.dismiss(this.successAlert);

        const settings = {};

        // gets all the values from the form
        this.fields.forEach(key => settings[key] = this.values[key]());

        // actually saves everything in the database
        saveSettings(settings)
            .then(() => {
                // on succes, show an alert
                app.alerts.show(this.successAlert = new Alert({
                    type: 'success',
                    children: 'Your Discord ID save !'
                }));
            })
            .catch(() => {
            })
            .then(() => {
                // return to the initial state and redraw the page
                this.loading = false;
                m.redraw();
            });
    }

}
