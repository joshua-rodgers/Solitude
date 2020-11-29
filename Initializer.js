function Initializer(_Game){
    function Card(suit, value, suit_color){
        this.suit = suit;
        this.value = value;
        this.is_face_up = false;
        this.suit_color = suit_color;
    }
    
    this.deal_cards = function() {
        var column = 0;
        var card_cursor = 51;
        var local_i = 0;
        var pile = new Array(24);

        for(; column < 7; column++){
            local_i = 0
            while(local_i <= column){
                _Game.tableau[column][local_i] = _Game.cards[card_cursor];
                _Game.cards[card_cursor] = null;
                if(local_i == column){
                    _Game.tableau[column][local_i].is_face_up = true;
                }
                card_cursor--;
                local_i++;
            }
        }

        for(; card_cursor >= 0; card_cursor-- ){
            pile[card_cursor] = _Game.cards[card_cursor];
        }

        _Game.cards = [];
        return pile;
    }
        
    this.create_deck = function(){
        var deck = new Array(52)
        var deck_cursor = 0;
        var suit_count = 1;
        var value = "";
        // ♣︎♥︎♦︎♠︎♤♧♡♢
        for(; suit_count <= 4; suit_count++){
            switch(suit_count) {
                case 1:
                    // hearts
                    generate_suit("♥︎", "red");
                    break;
                case 2: 
                    // diamonds
                    generate_suit("♦︎", "red");
                    break;
                case 3: 
                    // clubs
                    generate_suit("♣︎", "black");
                    break;
                case 4:
                    // spades
                    generate_suit("♠︎", "black");
                    break;
            }
        }

        return this.shuffle_deck(deck);

        //------------INNER FUNCTION OF CREATE_DECK----------------------
        function generate_suit(suit, color){
            var face_counter = 14;
            for(;face_counter >= 2; face_counter--){
                switch(face_counter) {
                    case 14:
                        // ace
                        value = "A";
                        deck[deck_cursor] = new Card(suit, value, color);
                        deck_cursor++;
                        break;
                    case 13:
                        // king
                        value = "K";
                        deck[deck_cursor] = new Card(suit, value, color);
                        deck_cursor++;
                        break;
                    case 12:
                        // queen
                        value = "Q";
                        deck[deck_cursor] = new Card(suit, value, color);
                        deck_cursor++;
                        break;
                    case 11:
                        // jack
                        value = "J";
                        deck[deck_cursor] = new Card(suit, value, color);
                        deck_cursor++;
                        break;
                    default:
                        for(; face_counter >=2; face_counter--){
                            deck[deck_cursor] = new Card(suit, face_counter, color);
                            deck_cursor++;
                        }     
                }
            }

        } //--------------END GENERATE_SUIT----------------
    }
    this.shuffle_deck = function(deck){
        // refactor to keep track of open indices
        // using only open spaces.
        var temp_arr = new Array(52);
        var slot = 0;
        // test var counter = 0;

        for(var i = 0; i < 52; i++){
            slot = generate_random();
            temp_arr[check_slot()] = deck[i];
        }

        // test console.log(temp_arr);
        // test console.log(counter);
        return temp_arr;

        function generate_random(){
            return Math.floor(Math.random() * 52);
        }

        function check_slot(){
            var control = true;
            var round_trip = false;
            var origin = slot;

            if(temp_arr[slot] == null){
                return slot;
            }else{
                while(control){
                    if(slot < 51 && !round_trip){
                        slot++;
                        if(temp_arr[slot] == null){
                            control = false;
                        }
                    }else{
                        if(!round_trip){
                            slot = origin;
                            round_trip = true;
                        }

                        slot--;
                        if(temp_arr[slot] == null){
                            control = false;
                        }
                        // test counter++;
                    }
                }
                return slot;
            }
        }
    }
    this.create_tableau = function(){
        var table = new Array(7);
        for(var i = 0; i < table.length; i++){
            table[i] = new Array(19);
        }
        return table;
    }
}
