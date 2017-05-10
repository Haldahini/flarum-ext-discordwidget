/**
 * This file is part of hugogit/flarum-ext-discordwidget
 * See README.md for details and license
 */
 
import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage'

app.initializers.add('discordwidget', function() {
  extend(IndexPage.prototype, 'view', function(vdom) {

  	var id = app.forum.attribute('discord_widget_id');

    vdom.children.push(
    	<div class="container">
	    	<div class="discordBox">
	    		<div class="discordHover">
	    			<div class="discordArrow">
	    			</div>
	    		</div>
	    		<div class="discordFrame">
	    			<iframe src="https://discordapp.com/widget?id={{ id }}&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
	    		</div>
	    	</div>
    	</div>);
  });
});