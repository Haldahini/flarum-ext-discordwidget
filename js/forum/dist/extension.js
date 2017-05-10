'use strict';

System.register('hugogit/discordwidget/main', ['flarum/extend', 'flarum/components/IndexPage'], function (_export, _context) {
	"use strict";

	var extend, IndexPage;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumComponentsIndexPage) {
			IndexPage = _flarumComponentsIndexPage.default;
		}],
		execute: function () {
			/**
    * This file is part of hugogit/flarum-ext-discordwidget
    * See README.md for details and license
    */

			app.initializers.add('discordwidget', function () {
				extend(IndexPage.prototype, 'view', function (vdom) {

					var id = app.forum.attribute('discord_widget_id');

					vdom.children.push(m('div', { 'class': 'container' }, m('div', { 'class': 'discordBox' }, m('div', { 'class': 'discordHover' }, m('div', { 'class': 'discordArrow' })), m('div', { 'class': 'discordFrame' }, m('iframe', { src: 'https://discordapp.com/widget?id=' + id + '&theme=dark', width: '350', height: '500', allowtransparency: 'true', frameborder: '0' })))));
				});
			});
		}
	};
});