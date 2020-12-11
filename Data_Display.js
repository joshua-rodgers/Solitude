/*----------------------------------------------
************************************************
************************************************
    DISPLAY CLASS - handle display concerns here
************************************************
************************************************
*/
function Data_Display(_Game) {
    var model_col = document.createElement("div");
    model_col.className = "tableau-col container";

    var table_box = document.getElementById("table-box");
    var pile = document.getElementById("pile");
    var discard_pile = document.getElementById("discard");
    var f_hearts = document.getElementById("foundation-1");
    var f_clubs = document.getElementById("foundation-2");
    var f_diamonds = document.getElementById("foundation-3");
    var f_spades = document.getElementById("foundation-4");
    var foundations = [f_hearts, f_clubs, f_diamonds, f_spades];

    var tableau_display = Array(7);

    for(var col of tableau_display.keys()){
        tableau_display[col] = model_col.cloneNode();
    }

    var new_space = document.createElement("p");
    new_space.className = "space";

    for(var col of tableau_display){
        for(var j = 0; j < 19; j++){
            col.appendChild(new_space.cloneNode());
        }
        table_box.appendChild(col)
    }
    
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 13; j++){
            foundations[i].appendChild(new_space.cloneNode());
        }
    }
    
    
    for(var j = 0; j < 24; j++){
        discard_pile.appendChild(new_space.cloneNode());
    }
    

    this.refresh = function(){
        var i = 0;
        var j = 0;
        var display_col;
        // refreshes tableau
        for(var data_col of _Game.tableau){
            display_col = tableau_display[i];

            for(var data_card of data_col){
                if(data_card != undefined){
                    if(data_card.is_face_up){
                        display_col.childNodes[j].innerText = data_card.symbol + " " + data_card.value;
                        display_col.childNodes[j].style.color = data_card.suit_color;
                    }else {
                        display_col.childNodes[j].innerText = "*";
                    }
                }else{
                    display_col.childNodes[j].innerText = "";
                }

                // test 
                j++;
            }
            j = 0;
            i++;
        }
        // refreshes foundations
        if(_Game.f_was_mod){
            for(var i = 0; i < 4; i++){
                switch(i){
                    case 0:
                        for(var j = 0; j < _Game.data_f_hearts.length; j++){
                            if(_Game.data_f_hearts[j] != null){
                                foundations[i].childNodes[j].innerText = _Game.data_f_hearts[j].symbol + " " + _Game.data_f_hearts[j].value;
                                
                            } 
                        }
                        break;
                    case 1:
                        for(var j = 0; j < _Game.data_f_clubs.length; j++){
                            if(_Game.data_f_clubs[j] != null){
                                foundations[i].childNodes[j].innerText = _Game.data_f_clubs[j].symbol + " " + _Game.data_f_clubs[j].value;
                                
                            }
                        }
                        break;
                    case 2:
                       for(var j = 0; j < _Game.data_f_diamonds.length; j++){
                           if(_Game.data_f_diamonds[j] != null){
                               foundations[i].childNodes[j].innerText = _Game.data_f_diamonds[j].symbol + " " + _Game.data_f_diamonds[j].value;
                            
                           }

                        }
                        break;
                    case 3:
                       for(var j = 0; j < _Game.data_f_spades.length; j++){
                           if(_Game.data_f_spades[j] != null){
                               foundations[i].childNodes[j].innerText = _Game.data_f_spades[j].symbol + " " + _Game.data_f_spades[j].value;
                                
                           }

                        }
                        break;
                }
            }
        }
        // refreshes stockpile
        
        if(_Game.stock_pile[_Game.stock_pile.length - 1] != null && _Game.stock_pile[_Game.stock_pile.length - 1].is_face_up){
            pile.innerText = _Game.stock_pile[_Game.stock_pile.length - 1].symbol + " " + _Game.stock_pile[_Game.stock_pile.length - 1].value;
        }else{
            if(_Game.stock_pile[_Game.stock_pile.length - 1] == null){
                pile.innerText = "X";
            }else{
                pile.innerText = "*";
            }
            
        }
        if(_Game.discard_pile[_Game.discard_pile.length - 1] != null){
            discard_pile.innerText = _Game.discard_pile[_Game.discard_pile.length - 1].symbol + " " + _Game.discard_pile[_Game.discard_pile.length - 1].value;
        }else{
            discard_pile.innerText = "";
            discard_pile.innerHTML = "&nbsp;";
        }
    }
}
/*----------------------------------------------
************************************************
************************************************
END DISPLAY CLASS
************************************************
************************************************
*/
//==================================================================