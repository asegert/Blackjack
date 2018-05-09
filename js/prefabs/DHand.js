//Sets up DHands
var Blackjack = Blackjack || {};


Blackjack.DHand = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Blackjack.DHand.prototype.init = function()
     {
         //All DHands have 
         this.hand = new Array();
         this.handValue = 0;
         this.ace = false;
         this.isBusted = false;
         
         this.c1 = this.atate.add.sprite(300, 200, 'cardBack');
         this.c1.anchor.setTo(0.5, 0.5);
         this.c2 = this.atate.add.sprite(300, 200, 'cardBack');
         this.c2.anchor.setTo(0.5, 0.5);
         this.c3 = this.atate.add.sprite(300, 200, 'cardBack');
         this.c3.anchor.setTo(0.5, 0.5);
         this.sprites = [this.c1, this.c2, this.c3];
     };
     Blackjack.DHand.prototype.addCard = function(card)
     {
         if((this.hand.length<5 && this.addBonus())||(this.hand.length<4 && !this.addBonus()))
         {
             this.hand[this.hand.length] = card;
             this.recalculateValue(card);
         }
     };
    Blackjack.DHand.prototype.completeHand = function(card)
     {
         for(var i = this.hand.length-1, len = this.hand.length; i<len; i++)
         {
             this.hand[i] = card[i];
             this.recalculateValue(card[i]);
         }
        
        if(this.addBonus())
        {
            this.hand[3] = card[3];
            this.recalculateValue();
        }
     };
     Blackjack.DHand.prototype.recalculateValue = function(card)
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
     Blackjack.DHand.prototype.addBonus = function()
     {
         if(this.hand.length === 3 && this.handValue < 17)
         {
             return true;
         }
         return false;
     };
     Blackjack.DHand.prototype.flip = function(index)
     {
         var temp = this.sprites[index];
         this.sprites[index].addSprite(temp.x, temp.y);
         this.sprites[index].sprite.scale.setTo(0, 1);
         this.sprites[index].sprite.anchor.setTo(0.5, 0.5);
         
         
         //Bring the dealer hand up to the top so it is not under the new card
         this.state.world.bringToTop(this.state.dealer);
         //Tween to move the hand to the card
         var handTween = this.state.add.tween(this.state.dealer).to({x: 200}, 400, "Linear");
         //Flips the temporary card back over so it is unseen
         var backFlip = this.state.add.tween(temp.scale).to({x: 0}, 150, "Linear");
         //Flips the new card face so it is visible
         var frontFlip = this.state.add.tween(this.state.dealerHand[0].sprite.scale).to({x: 1}, 150, "Linear");
         //Return the dealer hand to the deck
         var retHand = this.state.add.tween(this.state.dealer).to({x: 50}, 400, "Linear");
         //Once the hand has returned...
         retHand.onComplete.add(function()
         {
             //Turn input back on
             this.state.input.enabled = true;
         }, this);
         //Chain the tweens
         handTween.chain(backFlip);
         backFlip.chain(frontFlip);
         frontFlip.chain(retHand);
         //Start the animations
         handTween.start();
     };
};
    
Blackjack.DHand.prototype = Object.create(Phaser.Sprite.prototype);
Blackjack.DHand.prototype.constructor = Blackjack.Unit;
