function Solitaire_Data(){
    var _initializer = new Initializer(this);
    this.cards;
    this.tableau;
    this.stock_pile;
    this.stock_pile_avail;
    this.data_f_hearts;
    this.data_f_clubs;
    this.data_f_diamonds;
    this.data_f_spades;
    this.f_was_mod = false;
    
    this.init_game = function(){
        this.cards = _initializer.create_deck();
        //console.log(this.cards);
        this.tableau = _initializer.create_tableau();
        this.stock_pile = _initializer.deal_cards();
        console.log(this.stock_pile);
        this.discard_pile = [];
        this.data_f_hearts = new Array(1);
        this.data_f_clubs = new Array(1);
        this.data_f_diamonds = new Array(1);
        this.data_f_spades = new Array(1);
        
    }
    
    this.move_card = function(card1, card2, is_from_stock, column_num = -1, is_from_waste = false){
        if(column_num >= 0){
            if(is_from_stock){
                if(this.tableau[column_num][0] == null){
                    console.log("inmovecardnullcon");
                    this.tableau[column_num][0] = this.stock_pile.pop();
                    return true;
                }else{
                    return false;
                }
            }
            var cards_found = this.find_cards(card1, null);
            var card1_loc = cards_found[0];
            
            if(card1_loc != null){
                this.tableau[column_num][0] = this.tableau[card1_loc.outer][card1_loc.inner];
                this.tableau[card1_loc.outer][card1_loc.inner] = null;
                if(card1_loc.inner > 0){
                    console.log("last if");
                    this.tableau[card1_loc.outer][card1_loc.inner - 1].is_face_up = true;
                }
                return true;
            }else{
                return false;
            }
        }
           
        if(is_from_stock){
            var cards_found = this.find_cards(card2, null);
            var card2_loc = cards_found[0];
            
            if(this.stock_pile[this.stock_pile.length - 1].is_face_up && card2_loc != null){
                console.log("next to last if");
                this.tableau[card2_loc.outer][card2_loc.inner + 1] = this.stock_pile.pop();
                return true;
            }
            return false;
        }else if(is_from_waste){
            var cards_found = this.find_cards(card2, null);
            var card2_loc = cards_found[0];
            
            if(this.discard_pile[this.discard_pile.length - 1].is_face_up && card2_loc != null){
                console.log("next to last if");
                this.tableau[card2_loc.outer][card2_loc.inner + 1] = this.discard_pile.pop();
                return true;
            }
            return false;
        }else{
            var cards_found = this.find_cards(card1, card2);
            
            var card1_loc = cards_found[0];
            var card2_loc = cards_found[1];

            if(card1_loc != null && card2_loc != null){
                console.log("next to last if");
                this.tableau[card2_loc.outer][card2_loc.inner + 1] = this.tableau[card1_loc.outer][card1_loc.inner];
                this.tableau[card1_loc.outer][card1_loc.inner] = null;
                if(card1_loc.inner > 0){
                    console.log("last if");
                    this.tableau[card1_loc.outer][card1_loc.inner - 1].is_face_up = true;
                }
                return true;
            }
            return false;
        }
    }
    
    this.build_foundation = function(card, is_from_stock, is_from_waste = false){
        var card_suit = card.suit;
        if(is_from_stock){
            switch(card_suit){
                case "HEARTS":
                    if(this.data_f_hearts[0] != null){
                        this.data_f_hearts.push(this.stock_pile.pop());
                    }else{
                        this.data_f_hearts[0] = this.stock_pile.pop();
                    }
                    break;
                case "CLUBS":
                    if(this.data_f_clubs[0] != null){
                        this.data_f_clubs.push(this.stock_pile.pop());
                    }else{
                        this.data_f_clubs[0] = this.stock_pile.pop();
                    }
                    break;
                case "DIAMONDS":
                    if(this.data_f_diamonds[0] != null){
                        this.data_f_diamonds.push(this.stock_pile.pop());
                    }else{
                        this.data_f_diamonds[0] = this.stock_pile.pop();
                    }
                    break;
                case "SPADES":
                    if(this.data_f_spades[0] != null){
                        this.data_f_spades.push(this.stock_pile.pop());
                    }else{
                        this.data_f_spades[0] = this.stock_pile.pop();
                    }
                    break;
                default:
                    return false;
            }
            this.f_was_mod = true;
            return true;
        }
        
        if(is_from_waste){
            switch(card_suit){
                case "HEARTS":
                    if(this.data_f_hearts[0] != null){
                        this.data_f_hearts.push(this.discard_pile.pop());
                    }else{
                        this.data_f_hearts[0] = this.discard_pile.pop();
                    }
                    break;
                case "CLUBS":
                    if(this.data_f_clubs[0] != null){
                        this.data_f_clubs.push(this.discard_pile.pop());
                    }else{
                        this.data_f_clubs[0] = this.discard_pile.pop();
                    }
                    break;
                case "DIAMONDS":
                    if(this.data_f_diamonds[0] != null){
                        this.data_f_diamonds.push(this.discard_pile.pop());
                    }else{
                        this.data_f_diamonds[0] = this.discard_pile.pop();
                    }
                    break;
                case "SPADES":
                    if(this.data_f_spades[0] != null){
                        this.data_f_spades.push(this.discard_pile.pop());
                    }else{
                        this.data_f_spades[0] = this.discard_pile.pop();
                    }
                    break;
                default:
                    return false;
            }
            this.f_was_mod = true;
            return true;
        }
        
        var cards_found = this.find_cards(card, null);
        var card_loc = cards_found[0];
        
        switch(card_suit){
            case "HEARTS":
                if(this.data_f_hearts[0] != null){
                    this.data_f_hearts.push(this.tableau[card_loc.outer][card_loc.inner]);
                }else{
                    this.data_f_hearts[0] = this.tableau[card_loc.outer][card_loc.inner]
                }
                
                console.log(this.data_f_hearts);
                this.tableau[card_loc.outer][card_loc.inner] = null;
                if(card_loc.inner > 0){
                    this.tableau[card_loc.outer][card_loc.inner - 1].is_face_up = true;
                }
                
                console.log("bfh");
                break;
            case "CLUBS":
                if(this.data_f_clubs[0] != null){
                    this.data_f_clubs.push(this.tableau[card_loc.outer][card_loc.inner]);
                }else{
                    this.data_f_clubs[0] = this.tableau[card_loc.outer][card_loc.inner]
                }
                console.log(this.data_f_clubs);
                this.tableau[card_loc.outer][card_loc.inner] = null;
                if(card_loc.inner > 0){
                    this.tableau[card_loc.outer][card_loc.inner - 1].is_face_up = true;
                }
                console.log("bfc");
                break;
            case "DIAMONDS":
                if(this.data_f_diamonds[0] != null){
                    this.data_f_diamonds.push(this.tableau[card_loc.outer][card_loc.inner]);
                }else{
                    this.data_f_diamonds[0] = this.tableau[card_loc.outer][card_loc.inner]
                }
                console.log(this.data_f_diamonds);
                this.tableau[card_loc.outer][card_loc.inner] = null;
                if(card_loc.inner > 0){
                    this.tableau[card_loc.outer][card_loc.inner - 1].is_face_up = true;
                }
                console.log("bfd");
                break;
            case "SPADES":
                if(this.data_f_spades[0] != null){
                    this.data_f_spades.push(this.tableau[card_loc.outer][card_loc.inner]);
                }else{
                    this.data_f_spades[0] = this.tableau[card_loc.outer][card_loc.inner]
                }
                console.log(this.data_f_spades);
                this.tableau[card_loc.outer][card_loc.inner] = null;
                if(card_loc.inner > 0){
                    this.tableau[card_loc.outer][card_loc.inner - 1].is_face_up = true;
                }
                console.log("bfs");
                break;
        }
        this.f_was_mod = true;
        return true;
    }
    
    this.shift_column = function(source_col, dest_col, column1, dest_start){
        var cursor1 = 0;
        var cursor2 = 0;
        var source_loc;
        if(this.tableau[dest_col].indexOf(dest_start) >= 0){
            console.log("found last item");
            var start = this.tableau[dest_col].indexOf(dest_start);
            if(dest_start != null){
                cursor1 = start + 1;
            }
            
            while(cursor2 < column1.length){
                source_loc = this.tableau[source_col].indexOf(column1[cursor2]);
                this.tableau[dest_col][cursor1] = column1[cursor2];
                if(this.tableau[source_col][source_loc - 1] != null){
                    this.tableau[source_col][source_loc - 1].is_face_up = true;
                }
                this.tableau[source_col][source_loc] = null;
                cursor1++;
                cursor2++;
            }
            return true;
        }else{
            console.log("didnt find it");
            return false;
        }

        
        
    }
    
    this.find_cards = function(card1, card2){
        var card1_found = false;
        var card2_found = false;
        if(card2 == null){
            card2_found = true;
        }
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

        return [card1_loc, card2_loc];
    }
    
    function Card_Location(outer, inner){
        this.outer = outer;
        this.inner = inner;
    }
}

