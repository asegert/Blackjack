var Blackjack = Blackjack || {};

Blackjack.GameState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'background');
        
        this.cardArray = [
                            ['diamond2', 'diamond3', 'diamond4', 'diamond5', 'diamond6', 'diamond7', 'diamond8', 'diamond9', 'diamond10', 'diamondJ', 'diamondQ', 'diamondK', 'diamondA'],
                            ['club2', 'club3', 'club4', 'club5', 'club6', 'club7', 'club8', 'club9', 'club10', 'clubJ', 'clubQ', 'clubK', 'clubA'],
                            ['heart2', 'heart3', 'heart4', 'heart5', 'heart6', 'heart7', 'heart8', 'heart9', 'heart10', 'heartJ', 'heartQ', 'heartK', 'heartA'],
                            ['spade2', 'spade3', 'spade4', 'spade5', 'spade6', 'spade7', 'spade8', 'spade9', 'spade10', 'spadeJ', 'spadeQ', 'spadeK', 'spadeA']
                         ];
        this.cardArray = this.createCards(this.cardArray);
        
        this.cardArray = this.preShuffle();
        this.cardArray = this.cardArray[0];
        this.playerHand = new Array();//group?
        this.dealerHand = new Array();//group?
        this.playerCards = this.deal(true);
        this.dealerCards = this.playerCards[1];
        this.playerCards = this.playerCards[0];
        this.dealer1;
        this.dealer2;
        this.dealer3;
        
        this.deal(false);
        this.displayCards('dealer');
        this.checkPlay('dealer');
        
        this.hitMe = this.add.button(50, 470, 'hitMe', function()
        {
            //Add player hit me here
            //If dealer has played all cards don't play another
            if(this.dealerHand.length < 3)
            {
                this.deal(false);
                this.displayCards('dealer');
                this.checkPlay('dealer');
            }
        }, this);
        
        this.call = this.add.button(50, 535, 'call', function()
        {
            //deal out and end
            while(this.dealerHand.length < 3)
            {
                this.deal(false);
                this.displayCards('dealer');
                this.checkPlay('dealer');
            }
            //Check if higher than dealer
        }, this);
    },
    preShuffle: function()
    {
        var initShuffle = new Array(this.cardArray.length);
        
        for(var i = 0, initLen = this.cardArray.length; i<initLen; i++)
        {
            initShuffle[i] = this.shuffle(this.cardArray[i], null);
        }
        
        //If the array has an odd number add the two last ones together to ensure iteration in two's in the while loop
        if(initShuffle.length > 1 && initShuffle.length % 2 != 0)
        {
            var tempArr = new Array(initShuffle.length-1);
            
            for(var k = 0, remLen = initShuffle.length-1; k<remLen; k++)
            {
                if(k+1 == remLen)
                {
                    tempArr[k] = this.shuffle(initShuffle[k], initShuffle[k+1]);
                }
                else
                {
                    tempArr[k] = initShuffle[k];
                }
            }
            initShuffle = tempArr;
        }
        
        //While there are two potential combinations shuffle them
        //Due to the if statement catch above the array will be either a multiple of 2 or only 1 array by the time it reaches this loop
        //The loop completes when only one array is present
        while(initShuffle.length % 2 == 0)
        {
            var secondShuffle = new Array();
            
            for(var j = 0, secLen = initShuffle.length/2; j<secLen; j++)
            {
                secondShuffle[secondShuffle.length] = this.shuffle(initShuffle[(j * 2)], initShuffle[(j * 2 + 1)]);
            }
            initShuffle = secondShuffle;
        }
        //Return shuffled cards
        return initShuffle;
    },
    shuffle: function(arr1, arr2)
    {
        var retArr = new Array();
        var used = new Array(arr1.length);
        
        //If only one array needs mixed
        if(arr2 == null)
        {
            for(var i=0, len = used.length; i<len; i++)
            {
                used[i] = false;
            }
            
            for(var j=0; j<len; j++)
            {
                var rand = Math.floor(Math.random() * len);
                
                if(used[rand])
                {
                    j--;
                }
                else
                {
                    used[rand] = true;
                    retArr[retArr.length] = arr1[rand];
                }
            }
        }
        //Two shuffled arrays need combined
        else
        {
            var used = new Array(arr1.length+arr2.length);
            
            for(var i=0, len = used.length; i<len; i++)
            {
                used[i] = false;
            }
            
            for(var j=0; j<len; j++)
            {
                var rand = Math.floor(Math.random() * len);
                
                if(used[rand])
                {
                    j--;
                }
                else
                {
                    used[rand] = true;
                    if(rand>=arr1.length)
                    {
                        retArr[retArr.length] = arr2[rand-arr1.length];
                    }
                    else
                    {
                        retArr[retArr.length] = arr1[rand];
                    }
                }
            }
        }
        return retArr;
    },
    deal: function(initDeal)
    {
        if(initDeal)
        {
            var player = new Array(5);
            var dealer = new Array(this.cardArray.length - 2);
            
            for(var i=0, len = this.cardArray.length; i<len; i++)
            {
                if(i<5)
                {
                    player[i]=this.cardArray[i];
                }
                else
                {
                    dealer[i-2] = this.cardArray[i];
                }
            }
            
            var retArr = new Array(2);
            retArr[0] = player;
            retArr[1] = dealer;
            
            return retArr;
        }
        else
        {
            this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
            //Call for animation flip to show card and add card to dealer total-> make appropriate move
            return null;
        }
    },
    checkPlay: function(party)
    {
        if(party == 'dealer')
        {
            var dealerValue = 0;
            var eleven = false;
            
            for(var i=0, len = this.dealerHand.length; i<len; i++)
            {
                dealerValue = dealerValue + this.dealerHand[i].value;
                
                if(this.dealerHand[i].value == 1)
                {
                    eleven = true;
                }
            }
            
            if(eleven && (dealerValue + 10) <= 21)
                {
                    dealerValue = dealerValue + 10;
                    eleven = false;
                }

            if(dealerValue > 21)
            {
                console.log('Bust');
            }
            else if(this.dealerHand.length > 2 && dealerValue < 16)
            {
                //If an ace is one of the cards check if adding 10 as ace is 1 or 11 will get it in the right margin, otherwise continue adding the additional card
                if(eleven)
                {
                    if(dealerValue + 10 > 21 || dealerValue + 10 < 16)
                    {
                        this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
                        this.dealerHand[3].addSprite(800, 100);
                        this.checkPlay(party);
                    }
                }
                else
                {
                    this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
                    this.dealerHand[3].addSprite(800, 100);
                    this.checkPlay(party);
                }
            }
        }
    },
    createCards: function(cardArr)
    {
        for(var i=0, len = cardArr.length; i<len; i++)
        {
            for(var j=0, secLen = cardArr[i].length; j<secLen; j++)
            {
                var card = new Blackjack.Card(this);
                card.init(cardArr[i][j]);
                cardArr[i][j] = card;
            }
        }
        return cardArr;
    },
    displayCards: function(party)
    {
        if(party == 'dealer')
        {
            if(this.dealer1 != undefined)
            {
                this.dealer1.destroy();
                this.dealer2.destroy();
                this.dealer3.destroy();
            }
            
            if(this.dealerHand[0] != undefined)
            {
                this.dealerHand[0].addSprite(200, 100);
            }
            else
            {
                this.dealer1 = this.add.sprite(200, 100, 'cardBack');
            }
            if(this.dealerHand[1] != undefined)
            {
                this.dealerHand[1].addSprite(400, 100);
            }
            else
            {
                this.dealer2 = this.add.sprite(400, 100, 'cardBack');
            }
            if(this.dealerHand[2] != undefined)
            {
                this.dealerHand[2].addSprite(600, 100);
            }
            else
            {
                this.dealer3 = this.add.sprite(600, 100, 'cardBack');
            }
        }
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/