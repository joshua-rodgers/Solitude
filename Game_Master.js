function Game_Master(data, display){
    
    this.do = function(input){
        switch(input[0]){
            case "MOVE":
                // 0:INS, 1:CARD1.VALUE, 2:CARD1.SUIT, 3:CARD2.VALUE, 4:CARD2.SUIT
                //console.log(input[1]);
                return true;
                break;
            case "BUILD":
                break;
        }
    }
}