function Solitaire_Data(){
    var _initializer = new Initializer(this);
    this.cards;
    this.tableau;
    this.stock_pile;
    this.stock_pile_avail;
    this.data_f1;
    this.data_f2;
    this.data_f3;
    this.data_f4;
    
    this.init_game = function(){
        this.cards = _initializer.create_deck();
        console.log(this.cards);
        this.tableau = _initializer.create_tableau();
        this.stock_pile = _initializer.deal_cards();
        this.stock_pile_avail;
        this.data_f1 = new Array(13);
        this.data_f2 = new Array(13);
        this.data_f3 = new Array(13);
        this.data_f4 = new Array(13);
        
    }
    
    this.move_card = function(card1, card2){
        var card1_found = false;
        var card2_found = false;
        var card1_loc;
        var card2_loc;
        for(var i = 0; i < this.tableau.length; i++){
            for(var j = 0; j < this.tableau[i].length; j++){
                if((!card1_found) && (this.tableau[i][j] != null)){
                    console.log("search1");
                    console.log(this.tableau[i][j].value + " " + this.tableau[i][j].suit);
                    console.log(card1.value + " " + card1.suit);
                    if(this.tableau[i][j].value == card1.value && this.tableau[i][j].suit == card1.suit){
                        console.log("nin check1");
                        card1_loc = new Card_Location(i, j);
                        card1_found = true;
                    }
                }
                if((!card2_found) && (this.tableau[i][j] != null)){
                    console.log("search2");
                    if(this.tableau[i][j].value == card2.value && this.tableau[i][j].suit == card2.suit){
                        console.log("nin check2");
                        card2_loc = new Card_Location(i, j);
                        card2_found = true;
                    }
                }
                
                if(card1_found && card2_found){
                    console.log("inner break");
                    break;
                }
            }
            if(card1_found && card2_found){
                console.log("outer break");
                break;
            }
        }
        
        if(card1_found && card2_found){
            console.log("next to last if");
            this.tableau[card2_loc.outer][card2_loc.inner + 1] = this.tableau[card1_loc.outer][card1_loc.inner]
            this.tableau[card1_loc.outer][card1_loc.inner] = null;
            if(card1_loc.inner > 0){
                console.log("last if");
                this.tableau[card1_loc.outer][card1_loc.inner - 1].is_face_up = true;
            }
            return true;
        }
        return false;
    }
    
    function Card_Location(outer, inner){
        this.outer = outer;
        this.inner = inner;
    }
}

