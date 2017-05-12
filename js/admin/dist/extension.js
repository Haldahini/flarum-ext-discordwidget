'use strict';

System.register('hugogit/discordwidget/addDiscordWidgetPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'hugogit/discordwidget/components/DiscordWidgetPage'], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, DiscordWidgetPage;

    _export('default', function () {
        // create the route
        app.routes['discord-widget'] = { path: '/discord-widget', component: DiscordWidgetPage.component() };

        app.extensionSettings['hugogit-discord-widget'] = function () {
            return m.route(app.route('discord-widget'));
        };

        extend(AdminNav.prototype, 'items', function (items) {

            items.add('discord-widget', AdminLinkButton.component({
                href: app.route('discord-widget'),
                icon: 'comments-o',
                children: 'Discord Widget',
                description: 'Edit Discord Widget'
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_hugogitDiscordwidgetComponentsDiscordWidgetPage) {
            DiscordWidgetPage = _hugogitDiscordwidgetComponentsDiscordWidgetPage.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("hugogit/discordwidget/components/DiscordWidgetPage", ["flarum/Component", "flarum/components/Button", "flarum/utils/saveSettings", "flarum/components/Alert", "flarum/components/FieldSet"], function (_export, _context) {
    "use strict";

    var Component, Button, saveSettings, Alert, FieldSet, DiscordWidgetPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet.default;
        }],
        execute: function () {
            DiscordWidgetPage = function (_Component) {
                babelHelpers.inherits(DiscordWidgetPage, _Component);

                function DiscordWidgetPage() {
                    babelHelpers.classCallCheck(this, DiscordWidgetPage);
                    return babelHelpers.possibleConstructorReturn(this, (DiscordWidgetPage.__proto__ || Object.getPrototypeOf(DiscordWidgetPage)).apply(this, arguments));
                }

                babelHelpers.createClass(DiscordWidgetPage, [{
                    key: "init",
                    value: function init() {
                        var _this2 = this;

                        // whether we are saving the settings or not right now
                        this.loading = false;

                        // the fields we need to watch and to save
                        this.fields = ['discord_widget_id'];

                        this.values = {};

                        // get the saved settings from the database
                        var settings = app.data.settings;

                        this.fields.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[key]);
                        });
                    }
                }, {
                    key: "view",
                    value: function view() {
                        return [m('div', { className: 'DiscordWidgetPage' }, [m('div', { className: 'container' }, [m('form', { onsubmit: this.onsubmit.bind(this) }, [m('div', { className: 'DiscordWidgetPage-id' }, [FieldSet.component({
                            label: 'Discord Widget Settings',
                            children: [m('label', {}, 'Set your discord server id here :'), m('input', {
                                className: 'FormControl',
                                value: this.values.discord_widget_id() || '',
                                oninput: m.withAttr('value', this.values.discord_widget_id)
                            })]
                        })]), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: 'Envoyer',
                            loading: this.loading
                        })])])])];
                    }
                }, {
                    key: "onsubmit",
                    value: function onsubmit(e) {
                        var _this3 = this;

                        // prevent the usual form submit behaviour
                        e.preventDefault();

                        // if the page is already saving, do nothing
                        if (this.loading) return;

                        // prevents multiple savings
                        this.loading = true;
                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        // gets all the values from the form
                        this.fields.forEach(function (key) {
                            return settings[key] = _this3.values[key]();
                        });

                        // actually saves everything in the database
                        saveSettings(settings).then(function () {
                            // on succes, show an alert
                            app.alerts.show(_this3.successAlert = new Alert({
                                type: 'success',
                                children: 'Your Discord ID save !'
                            }));
                        }).catch(function () {}).then(function () {
                            // return to the initial state and redraw the page
                            _this3.loading = false;
                            m.redraw();
                        });
                    }
                }]);
                return DiscordWidgetPage;
            }(Component);

            _export("default", DiscordWidgetPage);
        }
    };
});;
'use strict';

System.register('hugogit/discordwidget/main', ['flarum/extend', 'flarum/app', 'flarum/utils/saveSettings', 'flarum/components/PermissionGrid', 'hugogit/discordwidget/addDiscordWidgetPane'], function (_export, _context) {
    "use strict";

    var extend, app, saveSettings, PermissionGrid, addDiscordWidgetPane;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }, function (_flarumComponentsPermissionGrid) {
            PermissionGrid = _flarumComponentsPermissionGrid.default;
        }, function (_hugogitDiscordwidgetAddDiscordWidgetPane) {
            addDiscordWidgetPane = _hugogitDiscordwidgetAddDiscordWidgetPane.default;
        }],
        execute: function () {

            app.initializers.add('hugogit-discord-widget', function (app) {

                // add the admin pane
                addDiscordWidgetPane();

                // add the permission option to the relative pane
                extend(PermissionGrid.prototype, 'startItems', function (items) {
                    items.add('discordWidget', {
                        icon: 'comments-o',
                        label: 'Discord Widget',
                        permission: 'hugogit.discordwidget.edit'
                    });
                });
            }); /**
                 * This file is part of hugogit/flarum-ext-discordwidget
                 * See README.md for details and license
                 */
        }
    };
});