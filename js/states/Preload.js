var Blackjack = Blackjack || {};

Blackjack.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('background', 'assets/images/Blackjack_background.png');
        this.load.image('story', 'assets/images/Blackjack_instructions.png');
        this.load.image('start', 'assets/images/Blackjack_start_button.png');
        //Buttons
        this.load.image('hitMe', 'assets/images/Blackjack_hitMe.png');
        this.load.image('call', 'assets/images/Blackjack_call.png');
        //Dealer
        this.load.image('cardBack', 'assets/images/Blackjack_cardBack_red5.png');
        this.load.image('deck', 'assets/images/Blackjack_cardDeck_red5.png');
        this.load.image('dealer', 'assets/images/Blackjack_dealerHand.png');
        //Coupons
        this.load.image('coupon1', 'assets/images/coupon1.png');
        this.load.image('coupon2', 'assets/images/coupon2.png');
        this.load.image('coupon3', 'assets/images/coupon3.png');
        
        this.load.image('21', 'assets/images/Blackjack_21.png');
        //Cards
        this.load.image('diamond2', 'assets/images/Blackjack_cardDiamonds2.png');
        this.load.image('diamond3', 'assets/images/Blackjack_cardDiamonds3.png');
        this.load.image('diamond4', 'assets/images/Blackjack_cardDiamonds4.png');
        this.load.image('diamond5', 'assets/images/Blackjack_cardDiamonds5.png');
        this.load.image('diamond6', 'assets/images/Blackjack_cardDiamonds6.png');
        this.load.image('diamond7', 'assets/images/Blackjack_cardDiamonds7.png');
        this.load.image('diamond8', 'assets/images/Blackjack_cardDiamonds8.png');
        this.load.image('diamond9', 'assets/images/Blackjack_cardDiamonds9.png');
        this.load.image('diamond10', 'assets/images/Blackjack_cardDiamonds10.png');
        this.load.image('diamondJ', 'assets/images/Blackjack_cardDiamondsJ.png');
        this.load.image('diamondQ', 'assets/images/Blackjack_cardDiamondsQ.png');
        this.load.image('diamondK', 'assets/images/Blackjack_cardDiamondsK.png');
        this.load.image('diamondA', 'assets/images/Blackjack_cardDiamondsA.png');
        
        this.load.image('club2', 'assets/images/Blackjack_cardClubs2.png');
        this.load.image('club3', 'assets/images/Blackjack_cardClubs3.png');
        this.load.image('club4', 'assets/images/Blackjack_cardClubs4.png');
        this.load.image('club5', 'assets/images/Blackjack_cardClubs5.png');
        this.load.image('club6', 'assets/images/Blackjack_cardClubs6.png');
        this.load.image('club7', 'assets/images/Blackjack_cardClubs7.png');
        this.load.image('club8', 'assets/images/Blackjack_cardClubs8.png');
        this.load.image('club9', 'assets/images/Blackjack_cardClubs9.png');
        this.load.image('club10', 'assets/images/Blackjack_cardClubs10.png');
        this.load.image('clubJ', 'assets/images/Blackjack_cardClubsJ.png');
        this.load.image('clubQ', 'assets/images/Blackjack_cardClubsQ.png');
        this.load.image('clubK', 'assets/images/Blackjack_cardClubsK.png');
        this.load.image('clubA', 'assets/images/Blackjack_cardClubsA.png');
        
        this.load.image('heart2', 'assets/images/Blackjack_cardHearts2.png');
        this.load.image('heart3', 'assets/images/Blackjack_cardHearts3.png');
        this.load.image('heart4', 'assets/images/Blackjack_cardHearts4.png');
        this.load.image('heart5', 'assets/images/Blackjack_cardHearts5.png');
        this.load.image('heart6', 'assets/images/Blackjack_cardHearts6.png');
        this.load.image('heart7', 'assets/images/Blackjack_cardHearts7.png');
        this.load.image('heart8', 'assets/images/Blackjack_cardHearts8.png');
        this.load.image('heart9', 'assets/images/Blackjack_cardHearts9.png');
        this.load.image('heart10', 'assets/images/Blackjack_cardHearts10.png');
        this.load.image('heartJ', 'assets/images/Blackjack_cardHeartsJ.png');
        this.load.image('heartQ', 'assets/images/Blackjack_cardHeartsQ.png');
        this.load.image('heartK', 'assets/images/Blackjack_cardHeartsK.png');
        this.load.image('heartA', 'assets/images/Blackjack_cardHeartsA.png');
        
        this.load.image('spade2', 'assets/images/Blackjack_cardSpades2.png');
        this.load.image('spade3', 'assets/images/Blackjack_cardSpades3.png');
        this.load.image('spade4', 'assets/images/Blackjack_cardSpades4.png');
        this.load.image('spade5', 'assets/images/Blackjack_cardSpades5.png');
        this.load.image('spade6', 'assets/images/Blackjack_cardSpades6.png');
        this.load.image('spade7', 'assets/images/Blackjack_cardSpades7.png');
        this.load.image('spade8', 'assets/images/Blackjack_cardSpades8.png');
        this.load.image('spade9', 'assets/images/Blackjack_cardSpades9.png');
        this.load.image('spade10', 'assets/images/Blackjack_cardSpades10.png');
        this.load.image('spadeJ', 'assets/images/Blackjack_cardSpadesJ.png');
        this.load.image('spadeQ', 'assets/images/Blackjack_cardSpadesQ.png');
        this.load.image('spadeK', 'assets/images/Blackjack_cardSpadesK.png');
        this.load.image('spadeA', 'assets/images/Blackjack_cardSpadesA.png');
        //Chips
        this.load.spritesheet('blackChip', 'assets/images/Blackjack_blackChipSpritesheet.png', 70.4, 68, 5);
        this.load.spritesheet('greenChip', 'assets/images/Blackjack_greenChipSpritesheet.png', 70.4, 68, 5);
        this.load.spritesheet('blueChip', 'assets/images/Blackjack_blueChipSpritesheet.png', 70.4, 68, 5);
        this.load.spritesheet('redChip', 'assets/images/Blackjack_redChipSpritesheet.png', 70.4, 68, 5);
        this.load.spritesheet('whiteChip', 'assets/images/Blackjack_whiteChipSpritesheet.png', 70.4, 68, 5);
        this.load.spritesheet('solidGreenChip', 'assets/images/Blackjack_solidGreenChipSpritesheet.png', 70.4, 68, 5);
        this.load.spritesheet('solidBlueChip', 'assets/images/Blackjack_solidBlueChipSpritesheet.png', 70.4, 68, 5);
        this.load.spritesheet('solidWhiteChip', 'assets/images/Blackjack_solidWhiteChipSpritesheet.png', 70.4, 68, 5);
        //Audio
        this.load.audio('background', ['assets/audio/Blackjack_Background.mp3','assets/audio/Blackjack_Background.m4A', 'assets/audio/Blackjack_Background.ogg']);
        this.load.audio('card', ['assets/audio/Blackjack_cardFlip.mp3','assets/audio/Blackjack_cardFlip.m4A', 'assets/audio/Blackjack_cardFlip.ogg']);
        this.load.audio('chip', ['assets/audio/Blackjack_pokerChip.mp3','assets/audio/Blackjack_assets/audio/Blackjack_pokerChip.m4A', 'assets/audio/Blackjack_assets/audio/Blackjack_pokerChip.ogg']);
        this.load.audio('applause', ['assets/audio/Blackjack_applause.mp3','assets/audio/Blackjack_assets/audio/Blackjack_applause.m4A', 'assets/audio/Blackjack_assets/audio/Blackjack_applause.ogg']);
    },
    create: function ()
    {
        this.state.start('Story');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/