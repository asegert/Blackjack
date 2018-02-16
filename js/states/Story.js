var Blackjack = Blackjack || {};

Blackjack.StoryState = {
    create: function ()
    {
        Blackjack.music = this.add.audio('background');
        Blackjack.music.play('', 0, 1, true);
        
        this.add.sprite(0, 0, 'story');
        var start = this.add.button(485, 440, 'start', function()
        {
            this.game.state.start('Game');
        }, this);
        start.scale.setTo(0.7, 0.7);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/