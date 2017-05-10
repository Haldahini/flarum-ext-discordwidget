<?php 
/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */

namespace HugoGit\DiscordWidget\Listeners;

use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{

    /**
    * Subscribes to the Flarum events.
    *
    * @param Dispatcher $events
    */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addForumAssets']);
        $events->listen(ConfigureClientView::class, [$this, 'addAdminAssets']);
    }

    /**
    * Modifies the client view for the Forum.
    *
    * @param ConfigureClientView $event
    */
    public function addForumAssets(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $event->addAssets([
                __DIR__ . '/../../js/forum/dist/extension.js',
                __DIR__ . '/../../less/forum/extension.less',
            ]);
          $event->addBootstrapper('hugogit/discordwidget/main');
        }
    }

    /**
    * Modifies the client view for the Admin.
    *
    * @param ConfigureClientView $event
    */
    public function addAdminAssets(ConfigureClientView $event)
    {
        if ($event->isAdmin()) {
            $event->addAssets([
                __DIR__ . '/../../js/admin/dist/extension.js',
                __DIR__ . '/../../less/admin/extension.less',
            ]);
          $event->addBootstrapper('hugogit/discordwidget/main');
        }
    }
    
}
