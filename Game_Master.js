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
        if(data.stock_pile[data.stock_pile.length - 1] != null && data.stock_pile[data.stock_pile.length - 1].is_face_up){
            avail.push(data.stock_pile[data.stock_pile.length - 1]);
        }
        if(data.discard_pile.length > 0){
            avail.push(data.discard_pile[data.discard_pile.length - 1]);
        }
        
        return avail;
    }
    
    var _get_available_columns = function(){
        var avail_columns = new Array(7);
        var counter = 0;
        for(var i = 0; i < 7; i++){
            avail_columns[i] = [];
        }
        
        for(var i = 0; i < data.tableau.length; i++){
            for(var j = 0; j < data.tableau[i].length; j++){
                if(data.tableau[i][j] != null){
                    if(data.tableau[i][j].is_face_up){
                        avail_columns[i].push(data.tableau[i][j]);
                        counter++;
                    }
                }else{
                    break;
                }
                
            }
            if(counter > 1){
                counter = 0;
            }else{
                counter = 0;
                avail_columns[i] = [];
            }
        }
        return avail_columns;
    }
    
    var _validate = function(_card1, _card2){
        // NEED TO HANDLE EMPTY COLUMN!!!
        var card1_found= false;
        var card2_found = false;
        
        var available = _get_available();
        
        for(var i = 0; i < available.length; i++){
            
            if(_card2 != null){
                
                if(_card2.suit == available[i].suit){
                    if(_card2.value == available[i].value){
                        
                        card2_found = true;
                    }
                }
            }else{
                card2_found = true;
            }
            
            if(_card1.suit == available[i].suit){
                
                if(_card1.value == available[i].value){
                    
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
    
    var _validate_column = function(column1, column2 = -1){
        var columns = _get_available_columns();
        var is_valid1 = false;
        var is_valid2 = false;
        
        if(column2 == -1){
           is_valid2 = true;
        }
        
        if(column1 > -1 && column1 < 7){
            if(columns[column1].length > 1){
                is_valid1 = true;
            }
        }
        if(column2 > -1 && column2 < 7){
            if(columns[column2].length > 1){
                is_valid2 = true;
            }
        }
        if(is_valid1 && is_valid2){
            return true;
        }else{
            return false;
        }
    }
    
    this.do = function(input, is_from_stock, is_from_waste = false){
        if(input[0] == "MOVE"){
            var _card1 = input[1];
            var column_num = -1;
            if(input[2] == "COLUMN"){
                if(_validate(_card1, null)){
                    //nothing
                }else{
                    return false;
                }
                column_num += input[3];
            }else{
                
                var _card2 = input[2];
                if(_validate(_card1, _card2)){
                    //nothing
                }else{
                    return false;
                }
            }
            
        }else if(input[0] == "BUILD"){
            
            var card = input[1];
            if(_validate(card, null)){
                //nothing
            }else{
                return false;
            }
         }else if(input[0] == "SHIFT"){
             var column_num1 = input[1];
             var column_num2 = input[2];
             if(_validate_column(column_num1)){
                 
                 var available_columns = _get_available_columns();
             }else{
                 
                 return false;
             }
         }
        
        
        
        switch(input[0]){
            case "MOVE":
                if(column_num >= 0){
                    if(data.tableau[column_num][0] == null){
                        if(_card1.value == "K"){
                            if(is_from_stock){
                                if(data.move_card(_card1, null, true, column_num)){
                                    display.refresh();
                                    return true;
                                }
                            }else{
                                if(data.move_card(_card1, null, false, column_num)){
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
                }
                if(_card1.color != _card2.color){
                    
                    if(_rank[_card2.value] - _rank[_card1.value] == 1){
                        
                        if(is_from_stock){
                            if(data.move_card(_card1, _card2, true)){
                                display.refresh();
                                return true;
                            }
                        }else if(is_from_waste){
                            if(data.move_card(_card1, _card2, false, -1, true)){
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
                                
                                data.build_foundation(card, true);
                                display.refresh();
                                return true;
                            }
                        }else if(is_from_waste){
                            if(data.data_f_hearts[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_hearts[data.data_f_hearts.length - 1].value] == 1){
                                
                                data.build_foundation(card, false, true);
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
                        }else if(is_from_waste){
                            if(data.data_f_clubs[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_clubs[data.data_f_clubs.length - 1].value] == 1){
                                data.build_foundation(card, false, true);
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
                        }else if(is_from_waste){
                            if(data.data_f_diamonds[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_diamonds[data.data_f_diamonds.length - 1].value] == 1){
                                data.build_foundation(card, false, true);
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
                        }else if(is_from_waste){
                            if(data.data_f_spades[0] == null){
                                if(card.value == "A"){
                                    data.build_foundation(card, false, true);
                                    display.refresh();
                                    return true;
                                }
                            }
                            if(_rank[card.value] - _rank[data.data_f_spades[data.data_f_spades.length - 1].value] == 1){
                                data.build_foundation(card, false, true);
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
                
                if(data.stock_pile[0] != null){
                    if(data.stock_pile[data.stock_pile.length - 1].is_face_up){
                        data.discard_pile.push(data.stock_pile.pop());
                        if(data.stock_pile.length > 0){
                            data.stock_pile[data.stock_pile.length - 1].is_face_up = true;
                        }else{
                            if(data.discard_pile.length != 0){
                                
                                for(var i = 0; i < data.discard_pile.length; i++){
                                    data.discard_pile[i].is_face_up = false;
                                }
                                data.stock_pile = data.discard_pile;
                                data.discard_pile = [];
                            }
                        }
                        display.refresh();
                        return true;
                    }else{
                        
                        data.stock_pile[data.stock_pile.length - 1].is_face_up = true;
                        display.refresh();
                        return true;
                    }
                    
                }else{
                    return false;
                }
            case "SHIFT":
                var source_item = available_columns[column_num1][0];
                
                var dest_item = data.tableau[column_num2][_get_source(column_num2)];
                
                
                
                var column1 = available_columns[column_num1];
                var column2 = data.tableau[column_num2];
                
                // empty destination column
                if(dest_item == null){
                    if(source_item.value == "K"){
                        data.shift_column(column_num1, column_num2, column1, dest_item);
                        display.refresh();
                        return true;
                    }else{
                        return false;
                    }
                }
                
                if(source_item.suit_color != dest_item.suit_color){
                   if(_rank[dest_item.value] - _rank[source_item.value] == 1){
                       data.shift_column(column_num1, column_num2, column1, dest_item);
                       display.refresh();
                       return true;
                   }else{
                       
                       return false;
                   }
                }else{
                    
                    return false;
                }
        }
    }
    
    var _get_source = function(column_num){
        for(var i = 0; i < data.tableau[column_num].length; i++){
            if(data.tableau[column_num][i + 1] == null){
                
                return i;
            }
        }
    }
    
    this.get_stock_top = function(){
        return data.stock_pile[data.stock_pile.length - 1];
    }
    this.get_waste_top = function(){
        return data.discard_pile[data.discard_pile.length - 1];
    }
}