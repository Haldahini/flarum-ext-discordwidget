<?php
/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */


use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up'   => function (Builder $schema) {
        $schema->table('settings', function (Blueprint $table) {

            $table->integer('discord_widget_id')->nullable();

        });
    },
    'down' => function (Builder $schema) {
        $schema->dropColumn('discord_widget_id');
    }
];
