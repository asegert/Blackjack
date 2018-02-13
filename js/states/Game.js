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
        
        this.cardArray = this.preShuffle();
        this.cardArray = this.cardArray[0];
        this.playerHand = new Array();//group?
        this.dealerHand = new Array();//group?
        this.playerCards = this.deal(true);
        this.dealerCards = this.playerCards[1];
        this.playerCards = this.playerCards[0];
        
        this.hitMe = this.add.button(50, 470, 'hitMe', function()
        {
            this.deal(false);
            this.checkPlay('dealer');
        }, this);
        
        this.call = this.add.button(50, 535, 'call', function()
        {
            //deal out and end
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
            var dealer = new Array(this.cardArray.length - 5);
            
            for(var i=0, len = this.cardArray.length; i<len; i++)
            {
                if(i<5)
                {
                    player[i]=this.cardArray[i];
                }
                else
                {
                    dealer[i-5] = this.cardArray[i];
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
            //check card values for over 21
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