//Sets up cards
var Blackjack = Blackjack || {};


Blackjack.Card = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Blackjack.Card.prototype.init = function(texture)
     {
         this.texture = texture;
         this.suit = this.suit(texture);
         this.value = this.value(texture, this.suit);
         this.sprite = null;
     };
     Blackjack.Card.prototype.suit = function(textureString)
     {
         if(textureString.search('diamond') != -1)
         {
             return "diamond";
         }
         else if(textureString.search('club') != -1)
         {
             return "club";
         }
         else if(textureString.search('heart') != -1)
         {
             return "heart";
         }
         else if(textureString.search('spade') != -1)
         {
             return "spade";
         }
     };
     Blackjack.Card.prototype.value = function(textureString, suit)
     {
         var num = textureString.replace(suit,'');
         
         if(num.match(/[a-z]/i))
         {
             if(num == "A")
             {
                 return 1;
             }
             else
             {
                 return 10;
             }
         }
         else
        {
            return parseInt(num);
        }
     };
     Blackjack.Card.prototype.addSprite = function(x, y)
     {
         this.sprite = this.state.add.sprite(x, y, this.texture);
     };
};
    
Blackjack.Card.prototype = Object.create(Phaser.Sprite.prototype);
Blackjack.Card.prototype.constructor = Blackjack.Unit;
