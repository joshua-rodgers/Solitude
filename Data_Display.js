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
    var f1 = document.getElementById("foundation-1");
    var f2 = document.getElementById("foundation-2");
    var f3 = document.getElementById("foundation-3");
    var f4 = document.getElementById("foundation-4");

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

                }

                // test console.log(data_card.value);
                j++;
            }
            j = 0;
            i++;
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