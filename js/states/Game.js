var Blackjack = Blackjack || {};

Blackjack.GameState = {
    create: function ()
    {
        //Display Sprites
        this.background = this.add.sprite(0, 0, 'background');
        this.deck = this.add.sprite(50, 200, 'deck');
        this.dealer = this.add.sprite(50, 0, 'dealer');
        //Constants
        Blackjack.round = Blackjack.round || 1;
        Blackjack.loses = Blackjack.loses || 0;
        //Deck of cards
        this.cardArray = [
                            ['diamond2', 'diamond3', 'diamond4', 'diamond5', 'diamond6', 'diamond7', 'diamond8', 'diamond9', 'diamond10', 'diamondJ', 'diamondQ', 'diamondK', 'diamondA'],
                            ['club2', 'club3', 'club4', 'club5', 'club6', 'club7', 'club8', 'club9', 'club10', 'clubJ', 'clubQ', 'clubK', 'clubA'],
                            ['heart2', 'heart3', 'heart4', 'heart5', 'heart6', 'heart7', 'heart8', 'heart9', 'heart10', 'heartJ', 'heartQ', 'heartK', 'heartA'],
                            ['spade2', 'spade3', 'spade4', 'spade5', 'spade6', 'spade7', 'spade8', 'spade9', 'spade10', 'spadeJ', 'spadeQ', 'spadeK', 'spadeA']
                         ];
        //Create the cards using the prefab
        this.cardArray = this.createCards(this.cardArray);
        //Chips for betting
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
        //Change the chip display based on the number of loses
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
        //Bet indicators
        this.bet = this.add.text(200, 350, "Current Bet: $0", {fill: '#ffffff'});
        this.betted = false;
        this.betNum = 0;
        //Stores the card array for computing
        this.cardsOrig = this.cardArray;
        //Hit me button
        this.hitMe = this.add.button(50, 470, 'hitMe', function()
        {
            //Do not allow input until action is complete
            this.input.enabled = false;
            //Do not allow betting
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
                //If dealer has no more cards only add to the player
                this.deal(false, true, false, 1, 0);
            }
            //Display the player cards
            this.displayCards('player');
        }, this);
        //Button to stand with the cards already on the board
        this.call = this.add.button(50, 535, 'call', function()
        {
            //Do not allow input until action is complete
            this.input.enabled = false;
            //Boolean indicating the player has 'stood'
            this.standing = true;
            //Do not allow betting
            if(!this.betted)
                this.betted = true;
            //deal out and end
            if(this.dealerHand.length < 3)
            {
                this.deal(false, false, true, 0, 1);
            }
            //If player 'stands' once dealer has been dealt out, just end
            else
            {
                this.processEndGame();
            }
        }, this);
        //Initialize the game
        this.initGame();
        //Tell player to place bets
        this.twentyOneAnimation("Place your Bets", true, undefined, 3000, true, 1.5);
    },
    initGame: function()
    {
        //Variables, initialize cards, set defaults
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
        
        //Turn off input until initial deal is complete
        this.input.enabled = false;
        //Initial deal -> 2 cards to the player, one to the dealer
        this.deal(false, true, true, 2, 1);
    },
    preShuffle: function()
    {
        //Create an array to be filled
        var initShuffle = new Array(this.cardsOrig.length);
        
        //Fill with all the cards
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
        //If it si the initial deal
        if(initDeal)
        {
            //Deal most into the dealer stack and the first one into the player stack
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
            //Create a return array with the player array at index 0 and the dealer array at index 1
            var retArr = new Array(2);
            retArr[0] = player;
            retArr[1] = dealer;
            
            //Audio for the deal
            Blackjack.music.volume = 0.3;
            var sound = this.add.audio('card');
            sound.play();
            Blackjack.music.volume = 1;

            return retArr;
        }
        //If not the initial deal
        else
        {
            //If the player is being dealt to
            if(playerDeal)
            {
                //Audio for the deal
                Blackjack.music.volume = 0.3;
                var sound = this.add.audio('card');
                sound.play();
                Blackjack.music.volume = 1;
                //Deal the card
                this.playerCards[this.playerCards.length] = this.dealerCards.pop();
                //Display the card
                this.displayCards('player', playerNum);
            }
            //If the dealer is being dealt to
            if(dealerDeal)
            {
                //Audio for the deal
                Blackjack.music.volume = 0.3;
                var sound = this.add.audio('card');
                sound.play();
                Blackjack.music.volume = 1;
                //Deal the card
                this.dealerHand[this.dealerHand.length] = this.dealerCards.pop();
                //Display the card
                this.displayCards('dealer', dealerNum);
            }
            //Call for animation flip to show card and add card to dealer total-> make appropriate move
            return null;
        }
    },
    //Check for actions needed to be taken based on cards
    checkPlay: function(party, added)
    {
        //If the game is over do nothing
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
            
            //If the dealer has busted, check if player also busted
            if(this.currentDealerValue > 21 && !this.dealerBusted)
            {
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
                }
                if(tempValue > this.currentPlayerValue)
                {
                    this.currentPlayerValue = tempValue;
                }
            }
 
            //Check if player busted and end game if dealer has as well or do a double check on the dealer
            if(this.currentPlayerValue > 21 && !this.playerBusted)
            {
                this.playerBusted = true;
                if(this.dealerBusted)
                {
                    return 'endGame';
                }
                
                return this.checkPlay('dealer', -1);
            }
            //If the dealer busted, but the player didn't end the game the player has won
            else if(this.dealerBusted)
            {
                return 'endGame';
            }
            //If the player gets 21 exactly
            else if(this.currentPlayerValue === 21)
            {
                this.twentyOneAnimation('21', true, false, 2000, false, 1);
                
                return null;
            }
            //If the player gets 21 exactly via an 11
            else if(this.currentPlayerValue === 11 && this.playerEleven)
            {
                this.twentyOneAnimation('21', true, false, 2000, false, 1);
                
                return null;
            }
            return null;
        }
    },
    createCards: function(cardArr)
    {
        //For each card in the array passed in (assuming 2D) create a card via the prefab
        for(var i=0, len = cardArr.length; i<len; i++)
        {
            for(var j=0, secLen = cardArr[i].length; j<secLen; j++)
            {
                var card = new Blackjack.Card(this);
                card.init(cardArr[i][j]);
                cardArr[i][j] = card;
            }
        }
        //Return the array of prefab cards
        return cardArr;
    },
    displayCards: function(party, num)
    {
        if(party == 'dealer')
        {
            //Check if cards that are face down already exist and need to be removed
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
            //If the card has not been flipped, flip it with most recently dealt card
            if(this.dealerHand[0] != undefined && this.dealerHand[0].sprite === null)
            {
                //Temporarily add the back of the card
                var temp = this.add.sprite(300, 200, 'cardBack');
                temp.anchor.setTo(0.5, 0.5);
                //Add the correct card, turned so it is unseen
                this.dealerHand[0].addSprite(300, 200);
                this.dealerHand[0].sprite.scale.setTo(0, 1);
                this.dealerHand[0].sprite.anchor.setTo(0.5, 0.5);
                //Bring the dealer hand up to the top so it is not under the new card
                this.world.bringToTop(this.dealer);
                //Tween to move the hand to the card
                var handTween = this.add.tween(this.dealer).to({x: 200}, 400, "Linear");
                //Flips the temporary card back over so it is unseen
                var backFlip = this.add.tween(temp.scale).to({x: 0}, 150, "Linear");
                //Flips the new card face so it is visible
                var frontFlip = this.add.tween(this.dealerHand[0].sprite.scale).to({x: 1}, 150, "Linear");
                //Return the dealer hand to the deck
                var retHand = this.add.tween(this.dealer).to({x: 50}, 400, "Linear");
                //Once the hand has returned...
                retHand.onComplete.add(function()
                {
                    //Turn input back on
                    this.input.enabled = true;
                    //Check for a new action which is stored in nextMove
                    this.nextMove = this.checkPlay(party, num);
                    //If the next action is to deal and the player has stood (does not need to manually cause a new deal), deal
                    if(this.nextMove === 'deal' && this.standing)
                    {
                        this.nextMove = null;
                        this.deal(false, false, true, 0, 1);
                    }
                    //If the game should be ended and the player has stood (is happy with the number he/she has), end the game
                    else if(this.nextMove === 'endGame' && this.standing)
                    {
                        this.nextMove = null;
                        this.processEndGame();
                    }
                    //If the game is to be ended and the player busted (cannot deal more cards), end the game
                    else if(this.nextMove === 'endGame' && this.playerBusted)
                    {
                        this.nextMove = null;
                        this.processEndGame();
                    }
                }, this);
                //Chain the tweens
                handTween.chain(backFlip);
                backFlip.chain(frontFlip);
                frontFlip.chain(retHand);
                //Start the animations
                handTween.start();
            }
            //If the card should not be flipped yet create a card that is facedown
            else if(this.dealerHand[0] === undefined)
            {
                this.dealer1 = this.add.sprite(300, 200, 'cardBack');
                this.dealer1.anchor.setTo(0.5, 0.5);
            }
            //If the card has not been flipped, flip it with most recently dealt card
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
                    else if(this.nextMove === 'endGame' && this.standing)
                    {
                        this.nextMove = null;
                        this.processEndGame();
                    }
                    else if(this.nextMove === 'endGame' && this.playerBusted)
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
            //If the card has not been flipped, flip it with most recently dealt card
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
                    else if(this.nextMove === 'endGame' && this.standing)
                    {
                        this.nextMove = null;
                        this.processEndGame();
                    }
                    else if(this.nextMove === 'endGame' && this.playerBusted)
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
            //If the 'bonus' card should be used
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
                        
                        if(this.nextMove === 'deal' && this.standing)
                        {
                            this.nextMove = null;
                            this.deal(false, false, true, 0, 1);
                        }
                        else if(this.nextMove === 'endGame' && this.standing)
                        {
                            this.nextMove = null;
                            this.processEndGame();
                        }
                        else if(this.nextMove === 'endGame' && this.playerBusted)
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
            }
        }
        else if(party == 'player')
        {
            //Check if there is not card to be displayed
            for(var i=0, len = this.playerCards.length; i<len; i++)
            {
                if(this.playerCards[i] == undefined)
                {
                    break;
                }
                else if(this.playerCards[i].sprite != null)
                {
                    
                }
                //If there is...
                else
                {
                    if(i == this.playerCards.length-1)
                    {
                        //Create a temporary back for flipping
                        temp = this.add.sprite(120, 295, 'cardBack');
                        temp.anchor.setTo(0.5, 0.5);
                
                        //Add the face
                        this.playerCards[i].addSprite(120, 295);
                        this.playerCards[i].sprite.scale.setTo(0, 1);
                        this.playerCards[i].sprite.anchor.setTo(0.5, 0.5);
                        
                        this.world.bringToTop(this.dealer);
                        //Move the card from the deck
                        var travel = this.add.tween(this.playerCards[i].sprite).to({x: 200 + (50 * i), y: 400}, 1000, "Linear");
                        //Change the anchor of the card so it sits right once moved
                        var reAnchor = this.add.tween(this.playerCards[i].sprite.anchor).to({x: 0, y: 0}, 0, "Linear");
                        //Flip the card
                        backFlip = this.add.tween(temp.scale).to({x: 0}, 300, "Linear");
                        frontFlip = this.add.tween(this.playerCards[i].sprite.scale).to({x: 1}, 300, "Linear");
                        frontFlip.onComplete.add(function()
                        {
                            //Once the card is flipped move it
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
            //Check the next move based on the new player card, mainly to update value
            this.nextMove = this.checkPlay(party, num);
        }
    },
    processEndGame: function()
    {
        //Stop game play as game is ending
        this.input.enabled=false;
        //Game is over
        this.gameOver = true;
        
        //If both bust -> tie, losses goes up so player can only bet lower values
        if(this.playerBusted && this.dealerBusted)
        {
            this.twentyOneAnimation('Both Bust! \nTie!', true, true, 5000, true, 2);
            console.log('Both Bust! \nTie!');
            Blackjack.loses++;
        }
        //If only the player busts, dealer wins, losses goes up so player can only bet lower values
        else if(this.playerBusted)
        {
            this.twentyOneAnimation('Player Busted. \nDealer Wins!', true, true, 5000, true, 2);
            console.log('Player Busted. \nDealer Wins!');
            Blackjack.loses++;
        }
        //If only the dealer busts, player wins
        else if(this.dealerBusted)
        {
            this.twentyOneAnimation('Dealer Busted. \nPlayer Wins!', true, true, 5000, true, 2);
            console.log('Dealer Busted. \nPlayer Wins!');
        }
        //If no one has busted
        else
        {
            //Check if player has higher score than dealer, caluculating is 11's play a role
            if(this.playerEleven && this.currentPlayerValue + 10 < 22)
            {
                this.currentPlayerValue += 10;
            }
            
            if(this.dealerEleven && this.currentDealerValue + 10 < 22)
            {
                this.currentDealerValue += 10;
            }
            
            //If the dealer has more than the player, dealer wins, losses goes up so player can only bet lower values
            if(this.currentDealerValue > this.currentPlayerValue)
            {
                this.twentyOneAnimation("Dealer Wins!", true, true, 5000, true, 2);
                console.log("Dealer Wins!");
                Blackjack.loses++;
            }
            //If the player has more than the player, player wins
            else if( this.currentDealerValue < this.currentPlayerValue)
            {
                this.twentyOneAnimation("Player Wins!", true, true, 5000, true, 2);
                console.log("Player Wins!");
            }
            //If the player and the dealer have the same amount, they tie, losses goes up so player can only bet lower values
            else if(this.currentDealerValue === this.currentPlayerValue)
            {
                this.twentyOneAnimation("Tie!", true, true, 5000, true, 2);
                console.log("Tie!");
                Blackjack.loses++;
            }
            //If any other case the player wins by default, should never occur
            else
            {
                this.twentyOneAnimation("Player Wins!", true, true, 5000, true, 2);
                console.log("Player Wins By Default!");
            }
        }
        //Applause sound
        Blackjack.music.volume = 0.3;
        var sound = this.add.audio('applause');
        sound.play();
        Blackjack.music.volume = 1;
        //Raise the round
        Blackjack.round++;
    },
    //Called when a player reaches 21, game ends, or to display information
    twentyOneAnimation: function(tex, destroy, final, time, string, scale)
    {
        //If an animation is already playing, end it
        if(this.twentyOne != undefined)
        {
            this.twentyOne.destroy();
        }
        //Create a group to hold all the emitters created
        var emitters = this.add.group();
        //If final round use different chips
        if(final)
        {
            //Create emitters with chips
            var emit1 = this.createEmitter(100, -10, 'blackChip', true, 0.3);
            var emit2 = this.createEmitter(300, -10, 'blueChip', true, 0.3);
            var emit3 = this.createEmitter(450, -10, 'redChip', true, 0.3);
            var emit4 = this.createEmitter(600, -10, 'greenChip', true, 0.3);
            var emit5 = this.createEmitter(900, -10, 'whiteChip', true, 0.3);
            //Add to group
            emitters.add(emit1);
            emitters.add(emit2);
            emitters.add(emit3);
            emitters.add(emit4);
            emitters.add(emit5);
        }
        //Catch case
        else if (final === undefined)
        {
            
        }
        //If non-final chips should be used
        else
        {  
            emit1 = this.createEmitter(100, -10, 'solidBlueChip', true, 0.3);
            emit2 = this.createEmitter(450, -10, 'solidWhiteChip', true, 0.3);
            emit3 = this.createEmitter(900, -10, 'solidGreenChip', true, 0.3);
            
            emitters.add(emit1);
            emitters.add(emit2);
            emitters.add(emit3);
        }
        //Check if a string has been passed as tex, if it has twentyOne is a text rather than a sprite
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
        //Tween for 'pop up'/up scale effect
        var tween = this.add.tween(this.twentyOne.scale).to({x: scale, y: scale}, time, "Linear", true);
        //Bring the animation to the top
        this.world.bringToTop(this.twentyOne);
        //When the animation is done...
        tween.onComplete.add(function()
        {
            //If the text should be destroyed, do so
            if(destroy)
                this.twentyOne.destroy();
            //Remove the emitters
            emitters.removeAll();
            //If final is being used start a new round -> up to 3
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
        //Creates an emitter for the twentyOne animation
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
    //Flips the chip to the dealer when 'bet'
    chipFlip: function(chip)
    {
        //Audio for the chip flip
        Blackjack.music.volume = 0.3;
        var sound = this.add.audio('chip');
        sound.play();
        Blackjack.music.volume = 1;
        //Save original chip coordinates
        var x = chip.x;
        var y = chip.y;
        //Add the chip's value to the total bet
        this.betNum += chip.value;
        //Update the bet text
        this.bet.setText("Current Bet: $"+this.betNum);
        //Bring the chip to the top
        this.world.bringToTop(chip);
        //Scale the chip up as it 'gets closer to the player'    
        var scale1 = this.add.tween(chip.scale).to({x: 1.5, y: 1.5}, 1000, "Linear");
        //Scale back down as it falls to the dealer
        var scale2 = this.add.tween(chip.scale).to({x: 0.5, y: 0.5}, 1000, "Linear");
        //Turn off the chip's visibility
        var reset1 = this.add.tween(chip).to({alpha: 0}, 0, "Linear");
        //Move the chip back
        var reset2 = this.add.tween(chip).to({x: x, y: y}, 0, "Linear");
        //Reset the scale
        var reset3 = this.add.tween(chip.scale).to({x: 1, y: 1}, 0, "Linear");
        //Turn the chip visibility back on
        var reset4 = this.add.tween(chip).to({alpha: 1}, 0, "Linear");
        //Chain the animations
        scale1.chain(scale2);
        scale2.chain(reset1);
        reset1.chain(reset2);
        reset2.chain(reset3);
        reset3.chain(reset4);
        scale1.start();
        //Move the chip as the scaling starts
        var moveTween = this.add.tween(chip).to({x: 50, y: -50}, 2000, "Linear", true);
        moveTween.onComplete.add(function()
        {
            Blackjack.music.volume = 0.3;
            var sound = this.add.audio('chip');
            sound.play();
            Blackjack.music.volume = 1;
        }, this);
    },
    update: function ()
    {
        //If betting has ended, stop the animations and load the chip texture from the spritesheet at index 1
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