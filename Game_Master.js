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
        var avail = [];
        for(var i = 0; i < data.tableau.length; i++){
            for(var j = 0; j < data.tableau[i].length; j++){
                if(j == 0){
                    if(data.tableau[i][j] == null){
                        break;
                    }
                }
                if(j == 18 || data.tableau[i][j + 1] == null){
                    avail.push(data.tableau[i][j]);
                    break;
                }
            }
        }
        if(data.stock_pile[data.stock_pile.length - 1].is_face_up){
            avail.push(data.stock_pile[data.stock_pile.length - 1]);
        }
        if(data.discard_pile.length > 0){
            avail.push(data.discard_pile[data.discard_pile.length - 1]);
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
    
    this.do = function(input, is_from_stock){
        if(input[0] == "MOVE"){
            console.log("test");
            var _card1 = input[1];
            var _card2 = input[2];
            if(_validate(_card1, _card2)){
                //nothing
            }else{
                return false;
            }
        }else if(input[0] == "BUILD"){
            console.log("test2");
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
                        if(is_from_stock){
                            if(data.move_card(_card1, _card2, true)){
                                display.refresh();
                                return true;
                            }
                        }else{
                            if(data.move_card(_card1, _card2, false)){
                                display.refresh();
                                return true;
                            }
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
                        if(is_from_stock){
                            if(data.data_f_hearts[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_hearts[data.data_f_hearts.length - 1].value] == 1){
                                console.log("valid");
                                data.build_foundation(card, true);
                                display.refresh();
                                return true;
                            }
                        }else{
                            if(data.data_f_hearts[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_hearts[data.data_f_hearts.length - 1].value] == 1){
                                console.log("valid");
                                data.build_foundation(card, false);
                                display.refresh();
                                return true;
                            }
                        }
                        
                        return false;
                        break;
                    case "CLUBS":
                        if(is_from_stock){
                            if(data.data_f_clubs[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_clubs[data.data_f_clubs.length - 1].value] == 1){
                                data.build_foundation(card, true);
                                display.refresh();
                                return true;
                            }
                        }else{
                            if(data.data_f_clubs[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_clubs[data.data_f_clubs.length - 1].value] == 1){
                                data.build_foundation(card, false);
                                display.refresh();
                                return true;
                            }
                        }
                        
                        return false;
                        break;
                    case "DIAMONDS":
                        if(is_from_stock){
                            if(data.data_f_diamonds[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_diamonds[data.data_f_diamonds.length - 1].value] == 1){
                                data.build_foundation(card, true);
                                display.refresh();
                                return true;
                            }
                        }else{
                            if(data.data_f_diamonds[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_diamonds[data.data_f_diamonds.length - 1].value] == 1){
                                data.build_foundation(card, false);
                                display.refresh();
                                return true;
                            }
                        }
                        
                        return false;
                        break;
                    case "SPADES":
                        if(is_from_stock){
                            if(data.data_f_spades[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_spades[data.data_f_spades.length - 1].value] == 1){
                                data.build_foundation(card, true);
                                display.refresh();
                                return true;
                            }
                        }else{
                            if(data.data_f_spades[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_spades[data.data_f_spades.length - 1].value] == 1){
                                data.build_foundation(card, false);
                                display.refresh();
                                return true;
                            }
                        }
                        
                        return false;
                        break;
                }
                break;
            case "STOCK":
                console.log("in stock");
                if(data.stock_pile[0] != null){
                    if(data.stock_pile[data.stock_pile.length - 1].is_face_up){
                        data.discard_pile.push(data.stock_pile.pop());
                        data.stock_pile[data.stock_pile.length - 1].is_face_up = true;
                        display.refresh();
                        return true;
                    }else{
                        console.log("in stock con");
                        data.stock_pile[data.stock_pile.length - 1].is_face_up = true;
                        display.refresh();
                        return true;
                    }
                    
                }else{
                    return false;
                }
        }
    }
    
    this.get_stock_top = function(){
        return data.stock_pile[data.stock_pile.length - 1];
    }
}