var Blackjack = Blackjack || {};

Blackjack.GameState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'background');
        this.deck = this.add.sprite(50, 200, 'deck');
        this.dealer = this.add.sprite(50, 0, 'dealer');
        Blackjack.round = Blackjack.round || 1;
        Blackjack.loses = Blackjack.loses || 0;

        this.cardArray = [
                            ['diamond2', 'diamond3', 'diamond4', 'diamond5', 'diamond6', 'diamond7', 'diamond8', 'diamond9', 'diamond10', 'diamondJ', 'diamondQ', 'diamondK', 'diamondA'],
                            ['club2', 'club3', 'club4', 'club5', 'club6', 'club7', 'club8', 'club9', 'club10', 'clubJ', 'clubQ', 'clubK', 'clubA'],
                            ['heart2', 'heart3', 'heart4', 'heart5', 'heart6', 'heart7', 'heart8', 'heart9', 'heart10', 'heartJ', 'heartQ', 'heartK', 'heartA'],
                            ['spade2', 'spade3', 'spade4', 'spade5', 'spade6', 'spade7', 'spade8', 'spade9', 'spade10', 'spadeJ', 'spadeQ', 'spadeK', 'spadeA']
                         ];
        this.cardArray = this.createCards(this.cardArray);
        
        this.blackChip = this.add.button(650, 425, 'blackChip', this.chipFlip, this);
        this.blackChip.animations.add('flip');
        this.blackChip.value = 1;
        this.blackChip.play('flip', 10, true);
        this.add.text(670, 400, '$1', {fill: '#ffffff'});
        
        this.whiteChip = this.add.button(725, 425, 'whiteChip', this.chipFlip, this);
        this.whiteChip.animations.add('flip');
        this.whiteChip.value = 5;
        this.whiteChip.play('flip', 12, true);
        this.add.text(745, 400, '$5', {fill: '#ffffff'});
        
        this.blueChip = this.add.button(800, 425, 'blueChip', this.chipFlip, this);
        this.blueChip.animations.add('flip');
        this.blueChip.value = 10;
        this.blueChip.play('flip', 12, true);
        this.add.text(805, 400, '$10', {fill: '#ffffff'});
        
        this.greenChip = this.add.button(875, 425, 'greenChip', this.chipFlip, this);
        this.greenChip.animations.add('flip');
        this.greenChip.value = 50;
        this.greenChip.play('flip', 11, true);
        this.add.text(880, 400, '$50', {fill: '#ffffff'});
        
        this.redChip = this.add.button(650, 500, 'redChip', this.chipFlip, this);
        this.redChip.animations.add('flip');
        this.redChip.value = 100;
        this.redChip.play('flip', 10, true);
        this.add.text(655, 560, '$100', {fill: '#ffffff'});
        
        this.solidWhiteChip = this.add.button(725, 500, 'solidWhiteChip', this.chipFlip, this);
        this.solidWhiteChip.animations.add('flip');
        this.solidWhiteChip.value = 500;
        this.solidWhiteChip.play('flip', 11, true);
        this.add.text(730, 560, '$500', {fill: '#ffffff'});
        
        this.solidBlueChip = this.add.button(800, 500, 'solidBlueChip', this.chipFlip, this);
        this.solidBlueChip.animations.add('flip');
        this.solidBlueChip.value = 1000;
        this.solidBlueChip.play('flip', 10, true);
        this.add.text(800, 560, '$1000', {fill: '#ffffff'});
        
        this.solidGreenChip = this.add.button(875, 500, 'solidGreenChip', this.chipFlip, this);
        this.solidGreenChip.animations.add('flip');
        this.solidGreenChip.value = 5000;
        this.solidGreenChip.play('flip', 11, true);
        this.add.text(875, 560, '$5000', {fill: '#ffffff'});
        
        if(Blackjack.loses === 1)
        {
            this.blackChip.alpha = 1;   
            this.whiteChip.alpha = 1;  
            this.blueChip.alpha = 1;  
            this.greenChip.alpha = 1; 
            this.redChip.alpha = 0.5;  
            this.solidWhiteChip.alpha = 0.5;
            this.solidBlueChip.alpha = 0.5;
            this.solidGreenChip.alpha = 0.5;
            
            this.blackChip.inputEnabled = true;   
            this.whiteChip.inputEnabled = true;  
            this.blueChip.inputEnabled = true;   
            this.greenChip.inputEnabled = true;  
            this.redChip.inputEnabled = false;   
            this.solidWhiteChip.inputEnabled = false;  
            this.solidBlueChip.inputEnabled = false;  
            this.solidGreenChip.inputEnabled = false; 
        }
        else if(Blackjack.loses > 1)
        {
            this.blackChip.alpha = 1;   
            this.whiteChip.alpha = 0.5;  
            this.blueChip.alpha = 0.5;  
            this.greenChip.alpha = 0.5; 
            this.redChip.alpha = 0.5;  
            this.solidWhiteChip.alpha = 0.5;
            this.solidBlueChip.alpha = 0.5;
            this.solidGreenChip.alpha = 0.5;
            
            this.blackChip.inputEnabled = true;   
            this.whiteChip.inputEnabled = false;  
            this.blueChip.inputEnabled = false;   
            this.greenChip.inputEnabled = false;  
            this.redChip.inputEnabled = false;   
            this.solidWhiteChip.inputEnabled = false;  
            this.solidBlueChip.inputEnabled = false;  
            this.solidGreenChip.inputEnabled = false;  
        }
        else
        {
            this.blackChip.alpha = 1;   
            this.whiteChip.alpha = 1;  
            this.blueChip.alpha = 1;  
            this.greenChip.alpha = 1; 
            this.redChip.alpha = 1;  
            this.solidWhiteChip.alpha = 1;
            this.solidBlueChip.alpha = 1;
            this.solidGreenChip.alpha = 1;
            
            this.blackChip.inputEnabled = true;   
            this.whiteChip.inputEnabled = true;  
            this.blueChip.inputEnabled = true;   
            this.greenChip.inputEnabled = true;  
            this.redChip.inputEnabled = true;   
            this.solidWhiteChip.inputEnabled = true;  
            this.solidBlueChip.inputEnabled = true;  
            this.solidGreenChip.inputEnabled = true; 
        }
        
        this.bet = this.add.text(200, 350, "Current Bet: $0", {fill: '#ffffff'});
        this.betted = false;
        this.betNum = 0;
        
        this.cardsOrig = this.cardArray;
        
        this.hitMe = this.add.button(50, 470, 'hitMe', function()
        {
            this.input.enabled = false;
            if(!this.betted)
                this.betted = true;
            //If dealer has played all cards don't play another
            if(this.dealerHand.length < 3)
            {
                //player always gets a card
                this.deal(false, true, true, 1, 1);
                this.input.enabled = false;
            }
            else
            {
                this.deal(false, true, false, 1, 0);
            }
            this.displayCards('player');
        }, this);
        
        this.call = this.add.button(50, 535, 'call', function()
        {
            this.input.enabled = false;
            this.standing = true;
            if(!this.betted)
                this.betted = true;
            //deal out and end
            if(this.dealerHand.length < 3)
            {
                this.deal(false, false, true, 0, 1);
            }
        }, this);
        this.initGame();
    },
    initGame: function()
    {
        this.cardArray = this.preShuffle();
        this.cardArray = this.cardArray[0];
        this.dealerHand = new Array();
        this.playerCards = this.deal(true, false, false, 0, 0);
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
        this.dealer1=undefined;
        this.dealer2=undefined;
        this.dealer3=undefined;
        this.nextMove = null;
        
        this.input.enabled = false;
        this.deal(false, true, true, 2, 1);
        console.log(this.playerCards);
    },
    preShuffle: function()
    {
        var initShuffle = new Array(this.cardsOrig.length);
        
        for(var i = 0, initLen = this.cardsOrig.length; i<initLen; i++)
        {
            initShuffle[i] = this.shuffle(this.cardsOrig[i], null);
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
    deal: function(initDeal, playerDeal, dealerDeal, playerNum, dealerNum)
    {
        if(initDeal)
        {
            var player = new Array(1);
            var dealer = new Array(this.cardArray.length - 1);

            for(var i=0, len = this.cardArray.length; i<len; i++)
            {
                if(i<1)
                {
                    player[i]=this.cardArray[i];
                }
                else
                {
                    dealer[i-1] = this.cardArray[i];
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
                this.displayCards('player', playerNum);
            }
            
            if(dealerDeal)
            {
                this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
                this.displayCards('dealer', dealerNum);
                console.log(this.dealerHand);
            }
            //Call for animation flip to show card and add card to dealer total-> make appropriate move
            return null;
        }
    },
    checkPlay: function(party, added, msg)
    {
        if(this.gameOver)
        {
            return null;
        }
        //If dealer ifo is being checked
        else if(party == 'dealer')
        {
            //If a card has been added increase the dealer value and check for 11
            if(added > 0)
            {
                for(var i = 1; i<=added; i++)
                {
                    console.log(i);
                    console.log(this.dealerHand);
                    this.currentDealerValue +=this.dealerHand[this.dealerHand.length-i].value;
                    
                    if(this.dealerHand[this.dealerHand.length-i].value == 1)
                    {
                        this.dealerEleven = true;
                    }
                }
            }
            //If it is unknown if a card was added or not
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
            //If the dealer has busted, check if player also busted
            if(this.currentDealerValue > 21 && !this.dealerBusted)
            {
                console.log('Bust');
                this.dealerBusted = true;
                if(this.playerBusted)
                {
                    return 'endGame';
                }
                return this.checkPlay('player', -1);
                
                //If more cards need to be displayed
                if(this.dealerHand.length < 3)
                {
                    return 'deal';

                }
                return 'endGame';
            }
            //If dealer hasn't busted but player has game is over
            else if(this.playerBusted)
            {
                return 'endGame';
            }
            //If no more cards need to be dealt
            else if(this.dealerHand.length > 2 && this.currentDealerValue >= 16)
            {
                return 'endGame';
            }
            //If the bonus card can be used
            else if(this.dealerHand.length > 2 && this.currentDealerValue < 16)
            {
                //If an ace is one of the cards check if adding 10 as ace is 1 or 11 will get it in the right margin, otherwise continue adding the additional card
                if(this.dealerEleven)
                {
                    //If using the ace as an eleven will be good to end the game
                    if(this.currentDealerValue + 10 < 22 || this.currentDealerValue + 10 > 16)
                    {
                        return 'endGame';
                    }
                    //If the 11 cannot be used, but more cards can be dealt do so
                    else if(this.dealerHand.length < 3)
                    {
                        return 'deal';
                    }
                    this.dealerBusted = true;
                    return 'endGame';
                }
                //If there is no 11 and one more can be displayed
                else if(this.dealerHand.length < 3)
                {
                    return 'deal';
                }
                else
                {
                    return 'endGame';
                }
            }
            else if(this.dealerHand.length < 3)
            {
                return 'deal';
            }
            return null;
        }
        else if(party == 'player')
        {
            //If the player has a new card
            if(added > 0)
            {
                for(var i = 1; i<=added; i++)
                {
                    console.log(added);
                    console.log(this.playerCards);
                    this.currentPlayerValue += this.playerCards[this.playerCards.length-i].value;   
            
                    if(this.playerCards[this.playerCards.length-i].value == 1)
                    {
                        this.playerEleven = true;
                    }
                }
            }
            //If a card may or may not have been added
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
                    console.log(tempValue);
                }
                if(tempValue > this.currentPlayerValue)
                {
                    this.currentPlayerValue = tempValue;
                }
            }
            
 console.log("player: "+this.currentPlayerValue);  
 
            if(this.currentPlayerValue > 21 && !this.playerBusted)
            {
                this.playerBusted = true;
                console.log('Bust');
                if(this.dealerBusted)
                {
                    return 'endGame';
                }
                
                return this.checkPlay('dealer', -1);
            }
            else if(this.dealerBusted)
            {
                return 'endGame';
            }
            else if(this.currentPlayerValue === 21)
            {
                this.twentyOneAnimation('21', true, false, 2000, false, 1);
                
                return null;
            }
            else if(this.currentPlayerValue === 11 && this.playerEleven)
            {
                this.twentyOneAnimation('21', true, false, 5000, false, 1);
                
                return null;
            }
            return null;
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
    displayCards: function(party, num)
    {
        if(party == 'dealer')
        {
            console.log('ok');
            console.log(this.dealerHand[1]);
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
                console.log('k');
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
                    this.nextMove = this.checkPlay(party, num);
                    
                    if(this.nextMove === 'deal' && this.standing)
                    {
                        this.nextMove = null;
                        this.deal(false, false, true, 0, 1);
                    }
                    else if(this.nextMove === 'endGame')
                    {
                        this.nextMove = null;
                        this.processEndGame();
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
                temp = this.add.sprite(480, 200, 'cardBack');
                temp.anchor.setTo(0.5, 0.5);
                
                this.dealerHand[1].addSprite(480, 200);
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
                    this.nextMove = this.checkPlay(party, num, 'hand 1 call');

                    if(this.nextMove === 'deal' && this.standing)
                    {
                        this.nextMove = null;
                        this.deal(false, false, true, 0, 1);
                    }
                    else if(this.nextMove === 'endGame')
                    {
                        this.nextMove = null;
                        this.processEndGame();
                    }
                }, this);
                
                handTween.chain(backFlip);
                backFlip.chain(frontFlip);
                frontFlip.chain(retHand);
                
                handTween.start();
            }
            else if(this.dealerHand[1] === undefined)
            {
                this.dealer2 = this.add.sprite(480, 200, 'cardBack');
                this.dealer2.anchor.setTo(0.5, 0.5);
            }
            
            if(this.dealerHand[2] != undefined && this.dealerHand[2].sprite === null)
            {
                temp = this.add.sprite(660, 200, 'cardBack');
                temp.anchor.setTo(0.5, 0.5);
                
                this.dealerHand[2].addSprite(660, 200);
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
                    this.nextMove = this.checkPlay(party, num);
                    
                    if(this.nextMove === 'deal' && this.standing)
                    {
                        this.nextMove = null;
                        this.deal(false, false, true, 0, 1);
                    }
                    else if(this.nextMove === 'endGame')
                    {
                        this.nextMove = null;
                        this.processEndGame();
                    }
                }, this);
                
                handTween.chain(backFlip);
                backFlip.chain(frontFlip);
                frontFlip.chain(retHand);
                
                handTween.start();
            }
            else if(this.dealerHand[2] === undefined)
            {
                this.dealer3 = this.add.sprite(660, 200, 'cardBack');
                this.dealer3.anchor.setTo(0.5, 0.5);
            }
            else
            {
                if(this.dealerHand[3] != undefined && this.dealerHand[3].sprite === null)
                {
                    temp = this.add.sprite(840, 200, 'cardBack');
                    temp.anchor.setTo(0.5, 0.5);
                
                    this.dealerHand[3].addSprite(840, 200);
                    this.dealerHand[3].sprite.scale.setTo(0, 1);
                    this.dealerHand[3].sprite.anchor.setTo(0.5, 0.5);
                
                    this.world.bringToTop(this.dealer);
                
                    handTween = this.add.tween(this.dealer).to({x: 800}, 800, "Linear");
                    backFlip = this.add.tween(temp.scale).to({x: 0}, 300, "Linear");
                    frontFlip = this.add.tween(this.dealerHand[3].sprite.scale).to({x: 1}, 300, "Linear");
                    retHand = this.add.tween(this.dealer).to({x: 50}, 800, "Linear");
                    retHand.onComplete.add(function()
                    {
                        this.input.enabled = true;
                        this.nextMove = this.checkPlay(party, num);
                    }, this);
                
                    handTween.chain(backFlip);
                    backFlip.chain(frontFlip);
                    frontFlip.chain(retHand);
                
                    handTween.start();
                }
            }
        }
        else if(party == 'player')
        {
            console.log(this.playerCards);
            for(var i=0, len = this.playerCards.length; i<len; i++)
            {
                if(this.playerCards[i] == undefined)
                {
                    break;
                }
                else if(this.playerCards[i].sprite != null)
                {
                    
                }
                else
                {
                    if(i == this.playerCards.length-1)
                    {
                        temp = this.add.sprite(120, 295, 'cardBack');
                        temp.anchor.setTo(0.5, 0.5);
                
                        this.playerCards[i].addSprite(120, 295);
                        this.playerCards[i].sprite.scale.setTo(0, 1);
                        this.playerCards[i].sprite.anchor.setTo(0.5, 0.5);
                        
                        this.world.bringToTop(this.dealer);
                        
                        var travel = this.add.tween(this.playerCards[i].sprite).to({x: 200 + (50 * i), y: 400}, 1000, "Linear");
                        var reAnchor = this.add.tween(this.playerCards[i].sprite.anchor).to({x: 0, y: 0}, 0, "Linear");
                        backFlip = this.add.tween(temp.scale).to({x: 0}, 300, "Linear");
                        frontFlip = this.add.tween(this.playerCards[i].sprite.scale).to({x: 1}, 300, "Linear");
                        frontFlip.onComplete.add(function()
                        {
                            reAnchor.start();
                            travel.start();
                            
                        }, this);
                
                        backFlip.chain(frontFlip);
                        frontFlip.chain(retHand);
                
                        backFlip.start();
                    }
                    else
                    {
                        this.playerCards[i].addSprite(200 + (50 * i), 400);
                    }
                }
            }
            this.nextMove = this.checkPlay(party, num);
        }
    },
     processEndGame: function()
    {
        this.input.enabled=false;
        this.gameOver = true;
        this.betNum = 0;
        this.bet.setText("Current Bet: $0");
        
        if(this.playerBusted && this.dealerBusted)
        {
            this.twentyOneAnimation('Both Bust! \nTie!', true, true, 5000, true, 2);
            console.log('Both Bust! \nTie!');
            Blackjack.loses++;
        }
        else if(this.playerBusted)
        {
            this.twentyOneAnimation('Player Busted. \nDealer Wins!', true, true, 5000, true, 2);
            console.log('Player Busted. \nDealer Wins!');
            Blackjack.loses++;
        }
        else if(this.dealerBusted)
        {
            this.twentyOneAnimation('Dealer Busted. \nPlayer Wins!', true, true, 5000, true, 2);
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
            console.log(this.currentDealerValue);
            console.log(this.currentPlayerValue);
            if(this.currentDealerValue > this.currentPlayerValue)
            {
                this.twentyOneAnimation("Dealer Wins!", true, true, 5000, true, 2);
                console.log("Dealer Wins!");
                this.loses++;
            }
            else if( this.currentDealerValue < this.currentPlayerValue)
            {
                this.twentyOneAnimation("Player Wins!", true, true, 5000, true, 2);
                console.log("Player Wins!");
            }
            else if(this.currentDealerValue === this.currentPlayerValue)
            {
                this.twentyOneAnimation("Tie!", true, true, 5000, true, 2);
                console.log("Tie!");
                this.loses++;
            }
            else
            {
                this.twentyOneAnimation("Player Wins!", true, true, 5000, true, 2);
                console.log("Player Wins By Default!");
            }
        }
        Blackjack.round++;
    },
    twentyOneAnimation: function(tex, destroy, final, time, string, scale)
    {
        if(this.twentyOne != undefined)
        {
            this.twentyOne.destroy();
        }
        var emitters = this.add.group();
        
        if(final)
        {
            var emit1 = this.createEmitter(100, -10, 'blackChip', true, 0.3);
            var emit2 = this.createEmitter(300, -10, 'blueChip', true, 0.3);
            var emit3 = this.createEmitter(450, -10, 'redChip', true, 0.3);
            var emit4 = this.createEmitter(600, -10, 'greenChip', true, 0.3);
            var emit5 = this.createEmitter(900, -10, 'whiteChip', true, 0.3);
            
            emitters.add(emit1);
            emitters.add(emit2);
            emitters.add(emit3);
            emitters.add(emit4);
            emitters.add(emit5);
        }
        else if (final === undefined)
        {
            
        }
        else
        {
            console.log(emitters);
            
            emit1 = this.createEmitter(100, -10, 'solidBlueChip', true, 0.3);
            emit2 = this.createEmitter(450, -10, 'solidWhiteChip', true, 0.3);
            emit3 = this.createEmitter(900, -10, 'solidGreenChip', true, 0.3);
            
            emitters.add(emit1);
            emitters.add(emit2);
            emitters.add(emit3);
        }
        if(string)
        {
            this.twentyOne = this.add.text(this.world.centerX, this.world.centerY, tex);
        }
        else
        {
            this.twentyOne = this.add.sprite(this.world.centerX, this.world.centerY, tex);
        }
        
        this.twentyOne.anchor.setTo(0.5, 0.5);
        this.twentyOne.scale.setTo(0, 0);
        var tween = this.add.tween(this.twentyOne.scale).to({x: scale, y: scale}, time, "Linear", true);
        this.world.bringToTop(this.twentyOne);
        tween.onComplete.add(function()
        {
            if(destroy)
                this.twentyOne.destroy();
            emitters.removeAll();
            
            if(final)
            {
                console.log('round: '+Blackjack.round);
                if(Blackjack.round > 3)
                {
                    document.getElementById('form1').submit;
                }
                else
                {
                    this.state.start('Game');
                }
            }
        }, this);
    },
    createEmitter: function(x, y, tex, sprite, scale)
    {
        var emitter = this.add.emitter(x, y, 200);
        
        if(sprite)
            emitter.makeParticles(tex, [0, 1, 2, 3, 4]);
        else
            emitter.makeParticles(tex);
        
        emitter.minParticleScale = scale;
        emitter.maxParticleScale = scale;
        
        emitter.start(false, 5000, 20);
        
        return emitter;
    },
    chipFlip: function(chip)
    {
        var x = chip.x;
        var y = chip.y;
        this.betNum += chip.value;
        this.bet.setText("Current Bet: $"+this.betNum);
        
        this.world.bringToTop(chip);
            
        var scale1 = this.add.tween(chip.scale).to({x: 1.5, y: 1.5}, 1000, "Linear");
        var scale2 = this.add.tween(chip.scale).to({x: 0.5, y: 0.5}, 1000, "Linear");
        var reset1 = this.add.tween(chip).to({alpha: 0}, 0, "Linear");
        var reset2 = this.add.tween(chip).to({x: x, y: y}, 0, "Linear");
        var reset3 = this.add.tween(chip.scale).to({x: 1, y: 1}, 0, "Linear");
        var reset4 = this.add.tween(chip).to({alpha: 1}, 0, "Linear");
            
        scale1.chain(scale2);
        scale2.chain(reset1);
        reset1.chain(reset2);
        reset2.chain(reset3);
        reset3.chain(reset4);
        scale1.start();
            
        this.add.tween(chip).to({x: 50, y: -50}, 2000, "Linear", true);
    },
    update: function ()
    {
        if(this.betted)
        {
            this.blackChip.animations.stop();
            this.blackChip.loadTexture('blackChip', 1);
            
            this.whiteChip.animations.stop();
            this.whiteChip.loadTexture('whiteChip', 1);
            
            this.blueChip.animations.stop();
            this.blueChip.loadTexture('blueChip', 1);
            
            this.greenChip.animations.stop();
            this.greenChip.loadTexture('greenChip', 1);
            
            this.redChip.animations.stop();
            this.redChip.loadTexture('redChip', 1);
            
            this.solidWhiteChip.animations.stop();
            this.solidWhiteChip.loadTexture('solidWhiteChip', 1);
            
            this.solidBlueChip.animations.stop();
            this.solidBlueChip.loadTexture('solidBlueChip', 1);
            
            this.solidGreenChip.animations.stop();
            this.solidGreenChip.loadTexture('solidGreenChip', 1);
        }
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/