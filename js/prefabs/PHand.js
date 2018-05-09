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
         this.recalculateValue(card);
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
         }
         else if(this.ace && (this.handValue+10)>21)
         {
             this.ace = false;
         }
     };
};
    
Blackjack.PHand.prototype = Object.create(Phaser.Sprite.prototype);
Blackjack.PHand.prototype.constructor = Blackjack.Unit;
