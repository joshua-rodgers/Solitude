function Command_Processor(textbox, msg_box, controller){
    this.init_proc = function(){
        textbox.addEventListener("keypress", function(e){if(e.code == "Enter"){_handle_input(e)}});
    }
    
    
    var _handle_input = function(e){
        var input = textbox.value;
        textbox.value = "";
        
        var tokens = _tokenize(input);
        
        var command = _parse_input(tokens);
        
        if(command != "INVALID COMMAND"){
            if(controller.do(command)){
                msg_box.textContent = "&nbsp;";
            }else{
                console.log("dummy");
                msg_box.textContent = "INVALID COMMAND";
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
        var operand1 = new Card_Descriptor("", "");
        var operand2 = new Card_Descriptor("", "");
        var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        var suits = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
        //var token_cursor = 0;
        var current_token = input[0];
        var status = "";
        var done = false;
        
        while(!done){
            switch(current_token){
                case "TEST":
                    
                    break;
                case "MOVE":
                    if(context == ""){
                        operand1.value = input[1];
                        operand1.suit = input[2];
                        //console.log(operand1);
                        if(values.includes(operand1.value)){
                            //console.log("in condition");
                            if(suits.includes(operand1.suit)){
                                //console.log("in condition");
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
                    //console.log(context);
                    if(context == "MOVE"){
                        operand2.value = input[4];
                        operand2.suit = input[5];
                        //console.log(operand2);
                        if(values.includes(operand2.value)){
                            //console.log("in condition2");
                            if(suits.includes(operand2.suit)){
                                //console.log("in condition2");
                                output = ["MOVE", operand1.value, operand1.suit, operand2.value, operand2.suit];
                                done = true;
                                //console.log(status);
                            }else{
                                status = "ERROR";
                            }
                        }else{
                            status = "ERROR";
                        }
                    }  
                    break;
                default:
                    //console.log("in default");
                    output = "INVALID COMMAND";
                    done = true;
                    break;
            }
            if(status == "ERROR"){
                //console.log("in status");
                output = "INVALID COMMAND";
                done = true;
            }
        }
        return output;
    }
    
    function Card_Descriptor(suit, value){
        this.suit = suit;
        this.value = value;
    }
}