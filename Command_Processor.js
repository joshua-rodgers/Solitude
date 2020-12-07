function Command_Processor(textbox, msg_box, controller){
    this.init_proc = function(){
        textbox.addEventListener("keypress", function(e){if(e.code == "Enter"){_handle_input(e)}});
    }
    
    
    var _handle_input = function(e){
        var input = textbox.value.toUpperCase();
        textbox.value = "";
        
        var tokens = _tokenize(input);
        
        var command = _parse_input(tokens);
        
        if(command != "INVALID COMMAND"){
            if(command.length > 3){
                if(command[3] == "STOCK"){
                    if(controller.do(command, true)){
                        msg_box.textContent = "&nbsp;";
                    }else{
                        msg_box.textContent = "INVALID COMMAND";
                    }
                }else if(command[2] == "COLUMN" && command[4] == "STOCK"){
                     if(controller.do(command, true)){
                         msg_box.textContent = "&nbsp;";
                     }else{
                         msg_box.textContent = "INVALID COMMAND";
                     }
                }else if(command[2] == "COLUMN"){
                    if(controller.do(command, false)){
                         msg_box.textContent = "&nbsp;";
                     }else{
                         msg_box.textContent = "INVALID COMMAND";
                     }
                }else if(command[3] == "WASTE"){
                    if(controller.do(command, false, true)){
                         msg_box.textContent = "&nbsp;";
                     }else{
                         msg_box.textContent = "INVALID COMMAND";
                     }
                }
            }else if(command.length == 3){
                if(command[2] == "STOCK"){
                    if(controller.do(command, true)){
                        msg_box.textContent = "&nbsp;";
                    }else{
                        msg_box.textContent = "INVALID COMMAND";
                    }
                }else if(command[2] == "WASTE"){
                    if(controller.do(command, false, true)){
                        msg_box.textContent = "&nbsp;";
                    }else{
                        msg_box.textContent = "INVALID COMMAND";
                    }
                }else if(command[0] == "SHIFT"){
                    if(controller.do(command, false)){
                        msg_box.textContent = "&nbsp;";
                    }else{
                        console.log("thats it");
                        msg_box.textContent = "INVALID COMMAND";
                    }
                }else{
                    if(controller.do(command, false)){
                        msg_box.textContent = "&nbsp;";
                    }else{
                        msg_box.textContent = "INVALID COMMAND";
                    }
                }
            }else{
                if(controller.do(command, false)){
                    msg_box.textContent = "&nbsp;";
                }else{
                    msg_box.textContent = "INVALID COMMAND";
                }
            }
            
        }else{
            msg_box.textContent = command;
        }   
    }
    
    var _tokenize = function(input){
        return input.split(" ");
    }
    
    var _parse_input = function(input){
        // i need to keep it together
        // i need to keep track of last command between calls
        // to maintain context awareness
        // which is to say the command processor need to keep 
        // it together too.
        var output = "";
        var context = "";
        var operand1;
        var operand2;
        var column1 = 0;
        var column2 = 0;
        var card;
        var stock_card;
        var waste_card;
        var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        var suits = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
        var column_strings = ["1", "2", "3", "4", "5", "6", "7"];
        //var reds = ["HEARTS", "DIAMONDS"];
        //var blacks = ["CLUBS", "SPADES"];
        //var token_cursor = 0;
        var current_token = input[0];
        var status = "";
        var done = false;
        
        while(!done){
            /*
            NEED SYNTAX FOR MOVING KING INTO EMPTY COLUMN
            AND FOR MOVING ENTIRE COLUMN!!!
            */
            switch(current_token){
                case "TEST":
                    
                    break;
                case "MOVE":
                    if(context == ""){
                        if(input.length == 6){
                            if(input[1] == "COLUMN"){
                                current_token = input[3];
                                context = "COLUMN";
                                break;
                            }
                        }
                        operand1 = new Card_Descriptor(input[1], input[2]);
                        if(values.includes(operand1.value)){
                            if(suits.includes(operand1.suit)){
                                current_token = input[3];
                                context = "MOVE";
                            }else{
                                status = "ERROR";
                            }
                        }else{
                            status = "ERROR";
                        }
                    }else {
                        status = "ERROR";
                    }
                    break;
                case "TO":
                    if(context == "MOVE"){
                        if(input[4] == "COLUMN"){
                            output = ["MOVE", operand1, input[4], parseInt(input[5])];
                            done = true;
                            break;
                        }
                        
                        operand2 = new Card_Descriptor(input[4], input[5]);
                        if(values.includes(operand2.value)){
                            if(suits.includes(operand2.suit)){
                                output = ["MOVE", operand1, operand2];
                                done = true;
                            }else{
                                status = "ERROR";
                            }
                        }else{
                            status = "ERROR";
                        }
                    }else if(context == "COLUMN"){
                        column1 = input[2];
                        column2 = input[5];
                        
                        if(column_strings.includes(column1)){
                            if(column_strings.includes(column2)){
                                output = ["SHIFT", parseInt(column1) - 1, parseInt(column2) - 1]
                                done = true;
                            }else{
                                status = "ERROR";
                            }
                        }else{
                            status = "ERROR";
                        }
                    }
                    break;
                case "BUILD":
                    card = new Card_Descriptor(input[2], input[1]);
                    if(values.includes(card.value)){
                        if(suits.includes(card.suit)){
                            output = ["BUILD", card];
                            done = true;
                        }else{
                            status = "ERROR";
                        }
                    }else{
                        status = "ERROR";
                    }
                    break;
                case "STOCK":
                    if(context == ""){
                        if(input.length == 4){
                            context = "STOCK";
                            break;
                        }else if(input.length == 3){
                            context = "BUILD";
                        }else{
                            output = ["STOCK"];
                            done = true;
                        }
                    }else if(context == "STOCK"){
                        stock_card = controller.get_stock_top();
                        operand1 = new Card_Descriptor(stock_card.value, stock_card.suit);
                        if(input[2] == "COLUMN"){
                            if(values.includes(operand1.value)){
                                if(suits.includes(operand1.suit)){
                                    output = ["MOVE", operand1, input[2], parseInt(input[3]), "STOCK"];
                                    done = true;
                                }else{
                                    status = "ERROR";
                                }
                            }else{
                                status = "ERROR";
                            }
                            break;
                        }
                        operand2 = new Card_Descriptor(input[2], input[3]);
                        if(values.includes(operand2.value)){
                            if(suits.includes(operand2.suit)){
                                output = ["MOVE", operand1, operand2, "STOCK"];
                                done = true;
                            }else{
                                status = "ERROR";
                            }
                        }else{
                            status = "ERROR";
                        }
                    }else if(context == "BUILD"){
                        stock_card = controller.get_stock_top();
                        card = new Card_Descriptor(stock_card.value.toString(), stock_card.suit.toString());
                        if(values.includes(card.value)){
                            if(suits.includes(card.suit)){
                                output = ["BUILD", card, "STOCK"];
                                done = true;
                            }else{
                                status = "ERROR";
                            }
                        }else{
                            status = "ERROR";
                        }
                    }
                    
                    break;
                case "WASTE":
                    if(context == ""){
                        if(input.length == 4){
                            context = "MOVE";
                        }else if(input.length == 3){
                            context = "BUILD";
                        }
                        break;
                    }else if(context == "MOVE"){
                        waste_card = controller.get_waste_top();
                        operand1 = new Card_Descriptor(waste_card.value, waste_card.suit);
                        operand2 = new Card_Descriptor(input[2], input[3]);
                        if(values.includes(operand2.value)){
                            if(suits.includes(operand2.suit)){
                                output = ["MOVE", operand1, operand2, "WASTE"];
                                done = true;
                            }else{
                                status = "ERROR";
                            }
                        }else{
                            status = "ERROR";
                        }
                    }else if(context == "BUILD"){
                        waste_card = controller.get_waste_top();
                        card = new Card_Descriptor(waste_card.value, waste_card.suit);
                        output = ["BUILD", card, "WASTE"];
                        done = true;
                    }
                    break;
                default:
                    console.log("hit default in cp switch");
                    output = "INVALID COMMAND";
                    done = true;
                    break;
            }
            if(status == "ERROR"){
                console.log("status was error");
                output = "INVALID COMMAND";
                done = true;
            }
        }
        return output;
    }
    
    function Card_Descriptor(value, suit){
        var _reds = ["HEARTS", "DIAMONDS"];
        this.suit = suit;
        this.value = value;
        if(_reds.includes(this.suit)){
            this.color = "RED";
        }else{
            this.color = "BLACK";
        }
    }
}