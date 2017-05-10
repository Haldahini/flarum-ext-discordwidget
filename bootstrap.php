<?php
/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */

namespace HugoGit\DiscordWidget;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events, Application $app) {

    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddApiAttributes::class);

};