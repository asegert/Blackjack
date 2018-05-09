/*
//Audio for the deal
            Blackjack.music.volume = 0.3;
            var sound = this.add.audio('card');
            sound.play();
            Blackjack.music.volume = 1;
*/
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
        //Deck of cards
        this.cardArray = [
                            ['diamond2', 'diamond3', 'diamond4', 'diamond5', 'diamond6', 'diamond7', 'diamond8', 'diamond9', 'diamond10', 'diamondJ', 'diamondQ', 'diamondK', 'diamondA'],
                            ['club2', 'club3', 'club4', 'club5', 'club6', 'club7', 'club8', 'club9', 'club10', 'clubJ', 'clubQ', 'clubK', 'clubA'],
                            ['heart2', 'heart3', 'heart4', 'heart5', 'heart6', 'heart7', 'heart8', 'heart9', 'heart10', 'heartJ', 'heartQ', 'heartK', 'heartA'],
                            ['spade2', 'spade3', 'spade4', 'spade5', 'spade6', 'spade7', 'spade8', 'spade9', 'spade10', 'spadeJ', 'spadeQ', 'spadeK', 'spadeA']
                         ];
        //Create the cards using the prefab
        this.cardArray = this.createCards(this.cardArray);
        //Stores the card array for computing
        this.cardsOrig = this.cardArray;
        //Hit me button
        this.hitMe = this.add.button(50, 470, 'hitMe', function()
        {
            //Do not allow input until action is complete
            this.input.enabled = false;
            this.dealerHand.addCard(this.cardArray.pop());
            this.playerHand.addCard(this.cardArray.pop());
        }, this);
        //Button to stand with the cards already on the board
        this.call = this.add.button(50, 535, 'call', function()
        {
            //Do not allow input until action is complete
            this.input.enabled = false;
            this.dealerHand.completeHand([this.cardArray.pop(), this.cardArray.pop(), this.cardArray.pop(), this.cardArray.pop()]);
        }, this);
        //Initialize the game
        this.initGame();
    },
    initGame: function()
    {
        //Variables, initialize cards, set defaults
        this.cardArray = this.preShuffle();
        this.cardArray = this.cardArray[0];
        this.dealerHand = new Blackjack.DHand(this);
        this.dealerHand.init();
        this.playerHand = new Blackjack.PHand(this);
        this.playerHand.init();
        //Turn off input until initial deal is complete
        this.input.enabled = false;
        //Initial deal -> 2 cards to the player, one to the dealer
        this.playerHand.addCard(this.cardArray.pop());
        this.playerHand.addCard(this.cardArray.pop());
        this.dealerHand.addCard(this.cardArray.pop());
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
    //Check for actions needed to be taken based on cards
    checkPlay: function(party, added)
    {
        //If the game is over do nothing
        if(this.gameOver)
        {
            return null;
        }
        //If dealer info is being checked
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
                    console.log('gameOver');
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
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/