var Blackjack = Blackjack || {};

Blackjack.GameState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'background');
        this.deck = this.add.sprite(50, 200, 'deck');
        this.dealer = this.add.sprite(50, 0, 'dealer');
        
        this.cardArray = [
                            ['diamond2', 'diamond3', 'diamond4', 'diamond5', 'diamond6', 'diamond7', 'diamond8', 'diamond9', 'diamond10', 'diamondJ', 'diamondQ', 'diamondK', 'diamondA'],
                            ['club2', 'club3', 'club4', 'club5', 'club6', 'club7', 'club8', 'club9', 'club10', 'clubJ', 'clubQ', 'clubK', 'clubA'],
                            ['heart2', 'heart3', 'heart4', 'heart5', 'heart6', 'heart7', 'heart8', 'heart9', 'heart10', 'heartJ', 'heartQ', 'heartK', 'heartA'],
                            ['spade2', 'spade3', 'spade4', 'spade5', 'spade6', 'spade7', 'spade8', 'spade9', 'spade10', 'spadeJ', 'spadeQ', 'spadeK', 'spadeA']
                         ];
        this.cardArray = this.createCards(this.cardArray);
        
        this.cardArray = this.preShuffle();
        this.cardArray = this.cardArray[0];
        this.dealerHand = new Array();
        this.playerCards = this.deal(true, false, false);
        this.dealerCards = this.playerCards[1];
        this.playerCards = this.playerCards[0];
        this.gameOver = false;
        this.standing = false;
        this.dealerBusted = false;
        this.playerBusted = false;
        this.dealerEleven = false;
        this.playerEleven = false;
        this.currentDealerValue = 0;
        this.currentPlayerValue = 0;
        this.dealer1;
        this.dealer2;
        this.dealer3;
        
        this.input.enabled = false;
        this.deal(false, false, true);
        this.displayCards('dealer');
        this.checkPlay('dealer', 1);
        this.displayCards('player');
        this.checkPlay('player', 2);
        
        this.hitMe = this.add.button(50, 470, 'hitMe', function()
        {
            this.input.enabled = false;
            //If dealer has played all cards don't play another
            if(this.dealerHand.length < 3)
            {
                //player always gets a card
                this.deal(false, true, true);
                this.displayCards('dealer');
                this.checkPlay('dealer', 1);
                this.input.enabled = false;
            }
            else
            {
                this.deal(false, true, false);
            }
            this.displayCards('player');
            this.checkPlay('player', 1);
        }, this);
        
        this.call = this.add.button(50, 535, 'call', function()
        {
            //deal out and end
            if(this.dealerHand.length < 3)
            {
                this.standing = true;
                this.deal(false, false, true);
                this.checkPlay('dealer', 1);
                this.displayCards('dealer');
            }
            //Check if higher than dealer
            if(!this.gameOver)
            {
                this.processEndGame();
            }
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
    deal: function(initDeal, playerDeal, dealerDeal)
    {
        if(initDeal)
        {
            var player = new Array(2);
            var dealer = new Array(this.cardArray.length - 2);
            
            for(var i=0, len = this.cardArray.length; i<len; i++)
            {
                if(i<2)
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
            if(playerDeal)
            {
                this.playerCards[this.playerCards.length] = this.dealerCards.pop();
            }
            
            if(dealerDeal)
            {
                this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
            }
            //Call for animation flip to show card and add card to dealer total-> make appropriate move
            return null;
        }
    },
    checkPlay: function(party, added)//fix run time with compound value
    {
        if(this.gameOver)
        {
            
        }
        else if(party == 'dealer')
        {
            if(added > 0)
            {
                for(var i = 1; i<=added; i++)
                {
                    this.currentDealerValue +=this.dealerHand[this.dealerHand.length-i].value;
                    
                    if(this.dealerHand[this.dealerHand.length-i].value == 1)
                    {
                        this.dealerEleven = true;
                    }
                }
            }
            else if(added === -1)
            {
                var tempValue = 0;
                for(var i = 0; i<this.dealerHand.length; i++)
                {
                    tempValue +=this.dealerHand[i].value;
                    
                    if(this.dealerHand[i].value == 1)
                    {
                        this.dealerEleven = true;
                    }
                }
                if(tempValue > this.currentDealerValue)
                {
                    this.currentDealerValue = tempValue;
                }
            }
            
console.log(this.currentDealerValue);
            if(this.currentDealerValue > 21)
            {
                console.log('over');
                this.dealerBusted = true;
                console.log('Bust');
                if(this.playerBusted != true)
                {
                    this.checkPlay('player', -1);
                }
                else
                {
                    this.processEndGame();
                }
            }
            else if(this.dealerHand.length > 2 && this.currentDealerValue < 16)
            {
                //If an ace is one of the cards check if adding 10 as ace is 1 or 11 will get it in the right margin, otherwise continue adding the additional card
                if(this.dealerEleven)
                {
                    //If using the ace as an eleven will bust the dealer or still keep the dealer below 16
                    if(this.currentDealerValue + 10 > 22 || this.currentDealerValue + 10 < 16)
                    {
                        this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
                        this.dealerHand[this.dealerHand.length-1].addSprite(800, 100);
                        this.checkPlay(party, 1);
                    }
                }
                else if(this.playerBusted)
                {
                    this.processEndGame();
                }
                else
                {
                    this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
                    this.dealerHand[this.dealerHand.length-1].addSprite(800, 100);
                    this.checkPlay(party, 1);
                }
            }
            else if(this.playerBusted)
            {
                this.processEndGame();
            }
        }
        else if(party == 'player')
        {
            //If the player has not 'hit me', player will only have two cards so both must be checked
            if(added > 0)
            {
                for(var i = 1; i<=added; i++)
                {
                    this.currentPlayerValue += this.playerCards[this.playerCards.length-i].value;   
            
                    if(this.playerCards[this.playerCards.length-i].value == 1)
                    {
                        this.playerEleven = true;
                    }
                }
            }
            else if(added === -1)
            {
                var tempValue = 0;
                for(var i = 0; i<this.playerCards.length; i++)
                {
                    tempValue +=this.playerCards[i].value;
                    
                    if(this.playerCards[i].value == 1)
                    {
                        this.playerEleven = true;
                    }
                }
                if(tempValue > this.currentPlayerValue)
                {
                    this.currentPlayerValue = tempValue;
                }
            }

            if(this.currentPlayerValue > 21)
            {
                this.playerBusted = true;
                console.log('Bust');
                if(this.dealerBusted != true)
                {
                    this.checkPlay('dealer', -1);
                }
                else
                {
                    this.processEndGame();
                }
            }
            else if(this.currentPlayerValue === 21)
            {
                while(this.dealerHand.length < 3)
                {
                    this.deal(false, false, true);
                    this.displayCards('dealer');
                    this.checkPlay('dealer', 1);
                }
                //Check if higher than dealer
                if(!this.gameOver)
                {
                    this.processEndGame();
                }
            }
            else if(this.dealerBusted)
            {
                this.processEndGame();
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
            }
            if(this.dealer2 != undefined)
            {
                this.dealer2.destroy();
            }
            if(this.dealer3 != undefined)
            {
                this.dealer3.destroy();
            }
            
            if(this.dealerHand[0] != undefined && this.dealerHand[0].sprite === null)
            {
                var temp = this.add.sprite(300, 200, 'cardBack');
                temp.anchor.setTo(0.5, 0.5);
                
                this.dealerHand[0].addSprite(300, 200);
                this.dealerHand[0].sprite.scale.setTo(0, 1);
                this.dealerHand[0].sprite.anchor.setTo(0.5, 0.5);
                
                this.world.bringToTop(this.dealer);
                
                var handTween = this.add.tween(this.dealer).to({x: 200}, 400, "Linear");
                var backFlip = this.add.tween(temp.scale).to({x: 0}, 150, "Linear");
                var frontFlip = this.add.tween(this.dealerHand[0].sprite.scale).to({x: 1}, 150, "Linear");
                var retHand = this.add.tween(this.dealer).to({x: 50}, 400, "Linear");
                retHand.onComplete.add(function()
                {
                    this.input.enabled = true;
                    
                    if(this.standing)
                    {
                        if(this.dealerHand.length < 3)
                        {
                             this.deal(false, false, true);
                             this.checkPlay('dealer', 1);
                             this.displayCards('dealer');
                             this.inputEnabled = false;
                        }
                    }
                }, this);
                
                handTween.chain(backFlip);
                backFlip.chain(frontFlip);
                frontFlip.chain(retHand);
                
                handTween.start();
            }
            else if(this.dealerHand[0] === undefined)
            {
                this.dealer1 = this.add.sprite(300, 200, 'cardBack');
                this.dealer1.anchor.setTo(0.5, 0.5);
            }
            
            if(this.dealerHand[1] != undefined && this.dealerHand[1].sprite === null)
            {
                temp = this.add.sprite(500, 200, 'cardBack');
                temp.anchor.setTo(0.5, 0.5);
                
                this.dealerHand[1].addSprite(500, 200);
                this.dealerHand[1].sprite.scale.setTo(0, 1);
                this.dealerHand[1].sprite.anchor.setTo(0.5, 0.5);
                
                this.world.bringToTop(this.dealer);
                
                handTween = this.add.tween(this.dealer).to({x: 400}, 600, "Linear");
                backFlip = this.add.tween(temp.scale).to({x: 0}, 200, "Linear");
                frontFlip = this.add.tween(this.dealerHand[1].sprite.scale).to({x: 1}, 200, "Linear");
                retHand = this.add.tween(this.dealer).to({x: 50}, 600, "Linear");
                retHand.onComplete.add(function()
                {
                    this.input.enabled = true;
                    
                    if(this.standing)
                    {
                        if(this.dealerHand.length < 3)
                        {
                             this.deal(false, false, true);
                             this.checkPlay('dealer', 1);
                             this.displayCards('dealer');
                             this.inputEnabled = false;
                        }
                    }
                }, this);
                
                handTween.chain(backFlip);
                backFlip.chain(frontFlip);
                frontFlip.chain(retHand);
                
                handTween.start();
            }
            else if(this.dealerHand[1] === undefined)
            {
                this.dealer2 = this.add.sprite(500, 200, 'cardBack');
                this.dealer2.anchor.setTo(0.5, 0.5);
            }
            
            if(this.dealerHand[2] != undefined && this.dealerHand[2].sprite === null)
            {
                temp = this.add.sprite(700, 200, 'cardBack');
                temp.anchor.setTo(0.5, 0.5);
                
                this.dealerHand[2].addSprite(700, 200);
                this.dealerHand[2].sprite.scale.setTo(0, 1);
                this.dealerHand[2].sprite.anchor.setTo(0.5, 0.5);
                
                this.world.bringToTop(this.dealer);
                
                handTween = this.add.tween(this.dealer).to({x: 600}, 800, "Linear");
                backFlip = this.add.tween(temp.scale).to({x: 0}, 300, "Linear");
                frontFlip = this.add.tween(this.dealerHand[2].sprite.scale).to({x: 1}, 300, "Linear");
                retHand = this.add.tween(this.dealer).to({x: 50}, 800, "Linear");
                retHand.onComplete.add(function()
                {
                    this.input.enabled = true;
                    
                    if(this.standing)
                    {
                        if(this.dealerHand.length < 3)
                        {
                             this.deal(false, false, true);
                             this.checkPlay('dealer', 1);
                             this.displayCards('dealer');
                             this.inputEnabled = false;
                        }
                    }
                }, this);
                
                handTween.chain(backFlip);
                backFlip.chain(frontFlip);
                frontFlip.chain(retHand);
                
                handTween.start();
            }
            else if(this.dealerHand[2] === undefined)
            {
                this.dealer3 = this.add.sprite(700, 200, 'cardBack');
                this.dealer3.anchor.setTo(0.5, 0.5);
            }
        }
        else if(party == 'player')
        {
            for(var i=0, len = this.playerCards.length; i<len; i++)
            {
                if(this.playerCards[i] == undefined)
                {
                    break;
                }
                else
                {
                    this.playerCards[i].addSprite(200 + (50 * i), 400);
                }
            }
        }
    },
    processEndGame: function()
    {
        this.gameOver = true;
        
        if(this.playerBusted && this.dealerBusted)
        {
            console.log('Both Bust! \nTie!');
        }
        else if(this.playerBusted)
        {
            console.log('Player Busted. \nDealer Wins!');
        }
        else if(this.dealerBusted)
        {
            console.log('Dealer Busted. \nPlayer Wins!');
        }
        else
        {
            //Check if player has higher score than dealer
            if(this.playerEleven && this.currentPlayerValue + 10 < 22)
            {
                this.currentPlayerValue += 10;
            }
            
            if(this.dealerEleven && this.currentDealerValue + 10 < 22)
            {
                this.currentDealerValue += 10;
            }
            
            if(this.currentDealerValue > this.currentPlayerValue)
            {
                console.log("Dealer Wins!");
            }
            else if( this.currentDealerValue < this.currentPlayerValue)
            {
                console.log("Player Wins!");
            }
            else if(this.currentDealerValue === this.currentPlayerValue)
            {
                console.log("Tie!");
            }
            else
            {
                console.log("Player Wins By Default!");
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