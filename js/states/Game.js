var GameName = GameName || {};

GameName.GameState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'background');
        
        this.cardArray = [
                            ['diamond2', 'diamond3', 'diamond4', 'diamond5', 'diamond6', 'diamond7', 'diamond8', 'diamond9', 'diamond10', 'diamondJ', 'diamondQ', 'diamondK', 'diamondA'],
                            ['club2', 'club3', 'club4', 'club5', 'club6', 'club7', 'club8', 'club9', 'club10', 'clubJ', 'clubQ', 'clubK', 'clubA'],
                            ['heart2', 'heart3', 'heart4', 'heart5', 'heart6', 'heart7', 'heart8', 'heart9', 'heart10', 'heartJ', 'heartQ', 'heartK', 'heartA'],
                            ['spade2', 'spade3', 'spade4', 'spade5', 'spade6', 'spade7', 'spade8', 'spade9', 'spade10', 'spadeJ', 'spadeQ', 'spadeK', 'spadeA']
                         ];
        
        this.hitMe = this.add.button(50, 470, 'hitMe', function()
        {
            //deal a card
        }, this);
        
        this.call = this.add.button(50, 535, 'call', function()
        {
            //deal out and end
        }, this);
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/