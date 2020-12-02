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
    var pile_top = document.getElementById("pile-top");
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

    this.refresh = function(){
        var i = 0;
        var j = 0;
        var display_col;

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

                // test console.log(data_card.value);
                j++;
            }
            j = 0;
            i++;
        }
        if(_Game.f_was_mod){
            for(var i = 0; i < 4; i++){
                switch(i){
                    case 0:
                        for(var j = 0; j < _Game.data_f_hearts.length; j++){
                            if(_Game.data_f_hearts[j] != null){
                                foundations[i].childNodes[j].innerText = _Game.data_f_hearts[j].symbol + " " + _Game.data_f_hearts[j].value;
                                console.log(foundations[i].childNodes[j]);
                            } 
                        }
                        break;
                    case 1:
                        for(var j = 0; j < _Game.data_f_clubs.length; j++){
                            if(_Game.data_f_clubs[j] != null){
                                foundations[i].childNodes[j].innerText = _Game.data_f_clubs[j].symbol + " " + _Game.data_f_clubs[j].value;
                                console.log("cloop");
                            }
                        }
                        break;
                    case 2:
                       for(var j = 0; j < _Game.data_f_diamonds.length; j++){
                           if(_Game.data_f_diamonds[j] != null){
                               foundations[i].childNodes[j].innerText = _Game.data_f_diamonds[j].symbol + " " + _Game.data_f_diamonds[j].value;
                            console.log("dloop");
                           }

                        }
                        break;
                    case 3:
                       for(var j = 0; j < _Game.data_f_spades.length; j++){
                           if(_Game.data_f_spades[j] != null){
                               foundations[i].childNodes[j].innerText = _Game.data_f_spades[j].symbol + " " + _Game.data_f_spades[j].value;
                                console.log("sloop");
                           }

                        }
                        break;
                }
            }
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