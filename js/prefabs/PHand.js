//Sets up PHands
var Blackjack = Blackjack || {};


Blackjack.PHand = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Blackjack.PHand.prototype.init = function()
     {
         //All PHands have 
         this.hand = new Array();
         this.handValue = 0;
         this.ace = false;
         this.isBusted = false;
     };
     Blackjack.PHand.prototype.addCard = function(card)
     {
         this.hand[this.hand.length] = card;
         this.deal(this.hand.length-1);
         return this.recalculateValue(card);
     };
     Blackjack.PHand.prototype.recalculateValue = function(card)
     {
         if(card.value === 1)
         {
             this.ace=true;
         }
         this.handValue += card.value;
         
         if(this.handValue>21)
         {
             this.isBusted = true;
             return true;
         }
         else if(this.ace && (this.handValue+10)>21)
         {
             this.ace = false;
         }
         return false;
     };
    Blackjack.PHand.prototype.deal = function(index)
    {
         //Create a temporary back for flipping
         var temp = this.state.add.sprite(120, 295, 'cardBack');
         temp.anchor.setTo(0.5, 0.5);
                
         //Add the face
         this.hand[index].addSprite(120, 295);
         this.hand[index].sprite.scale.setTo(0, 1);
         this.hand[index].sprite.anchor.setTo(0.5, 0.5);
                        
         this.state.world.bringToTop(this.state.dealer);
         //Move the card from the deck
         var travel = this.state.add.tween(this.hand[index].sprite).to({x: 200 + (50*index),  y: 400}, 1000, "Linear");
         travel.onComplete.add(function()
         {
             this.state.input.enabled = true;
         }, this);
         //Change the anchor of the card so it sits right once moved
         var reAnchor = this.state.add.tween(this.hand[index].sprite.anchor).to({x: 0, y: 0}, 0, "Linear");
         //Flip the card
         var backFlip = this.state.add.tween(temp.scale).to({x: 0}, 300, "Linear");
         var frontFlip = this.state.add.tween(this.hand[index].sprite.scale).to({x: 1}, 300, "Linear");
         frontFlip.onComplete.add(function()
         {
             //Once the card is flipped move it
             reAnchor.start();
             travel.start();
                            
         }, this);
                
         backFlip.chain(frontFlip);
                
         backFlip.start();
    };
};
    
Blackjack.PHand.prototype = Object.create(Phaser.Sprite.prototype);
Blackjack.PHand.prototype.constructor = Blackjack.Unit;