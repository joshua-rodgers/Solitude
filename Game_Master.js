function Game_Master(data, display){
    var _rank = {"A": 0,
                 "2": 1,
                 "3": 2,
                 "4": 3,
                 "5": 4,
                 "6": 5,
                 "7": 6,
                 "8": 7,
                 "9": 8,
                 "10": 9,
                 "J": 10,
                 "Q": 11,
                 "K": 12
                }
    
    var _get_available = function(){
        console.log("in avail");
        var avail = new Array(7);
        for(var i = 0; i < data.tableau.length; i++){
            for(var j = 0; j < data.tableau[i].length; j++){
                if(j == 18 || data.tableau[i][j + 1] == null){
                    avail[i] = data.tableau[i][j];
                    break;
                }
            }
        }
        console.log(avail);
        return avail;
    }
    
    var _validate = function(_card1, _card2){
        // NEED TO HANDLE EMPTY COLUMN!!!
        var card1_found= false;
        var card2_found = false;
        
        var available = _get_available();
        
        for(var i = 0; i < available.length; i++){
            console.log("loop");
            if(_card2 != null){
                console.log("c2");
                if(_card2.suit == available[i].suit){
                    if(_card2.value == available[i].value){
                        console.log("found 2");
                        card2_found = true;
                    }
                }
            }else{
                card2_found = true;
            }
            
            if(_card1.suit == available[i].suit){
                console.log("con 1");
                if(_card1.value == available[i].value){
                    console.log("con 2");
                    card1_found = true;
                    //break;
                }
            }
        }
        
        if(card1_found && card2_found){
            return true;
        }else{
            return false;
        }
    }
    
    this.do = function(input){
        if(input[0] == "MOVE"){
            var _card1 = input[1];
            var _card2 = input[2];
            if(_validate(_card1, _card2)){
                //nothing
            }else{
                return false;
            }
        }else if(input[0] = "BUILD"){
            var card = input[1];
            if(_validate(card, null)){
                //nothing
            }else{
                return false;
            }
         }
        
        
        
        switch(input[0]){
            case "MOVE":
                if(_card1.color != _card2.color){
                    console.log("early progress...");
                    if(_rank[_card2.value] - _rank[_card1.value] == 1){
                        console.log("progress...");
                        if(data.move_card(_card1, _card2)){
                            display.refresh();
                            return true;
                        } 
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
                break;
            case "BUILD":
                var card_suit = card.suit;
                switch(card_suit){
                    case "HEARTS":
                        if(data.data_f_hearts[0] == null){
                            if(card.value == "A"){
                                data.build_foundation(card);
                                display.refresh();
                                return true;
                            }
                        }
                        if(_rank[card.value] - _rank[data.data_f_hearts[data.data_f_hearts.length - 1].value] == 1){
                            console.log("valid");
                            data.build_foundation(card);
                            display.refresh();
                            return true;
                        }
                        return false;
                        break;
                    case "CLUBS":
                        if(data.data_f_clubs[0] == null){
                            if(card.value == "A"){
                                data.build_foundation(card);
                                display.refresh();
                                return true;
                            }
                        }
                        if(_rank[card.value] - _rank[data.data_f_clubs[data.data_f_clubs.length - 1].value] == 1){
                            data.build_foundation(card);
                            display.refresh();
                            return true;
                        }
                        return false;
                        break;
                    case "DIAMONDS":
                        if(data.data_f_diamonds[0] == null){
                            if(card.value == "A"){
                                data.build_foundation(card);
                                display.refresh();
                                return true;
                            }
                        }
                        if(_rank[card.value] - _rank[data.data_f_diamonds[data.data_f_diamonds.length - 1].value] == 1){
                            data.build_foundation(card);
                            display.refresh();
                            return true;
                        }
                        return false;
                        break;
                    case "SPADES":
                        if(data.data_f_spades[0] == null){
                            if(card.value == "A"){
                                data.build_foundation(card);
                                display.refresh();
                                return true;
                            }
                        }
                        if(_rank[card.value] - _rank[data.data_f_spades[data.data_f_spades.length - 1].value] == 1){
                            data.build_foundation(card);
                            display.refresh();
                            return true;
                        }
                        return false;
                        break;
                }
                break;
        }
    }
}