<?php
/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */

namespace HugoGit\DiscordWidget\Listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class AddApiAttributes {
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
    }
    public function prepareApiAttributes(PrepareApiAttributes $event) {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['discord_widget_id'] = $this->settings->get('discord_widget_id');
        }
    }
}