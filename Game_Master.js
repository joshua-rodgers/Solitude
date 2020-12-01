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
    
    this.arr = ["this", "is", "test"];
    
    this.do = function(input){
        var _card1 = input[1];
        var _card2 = input[2];
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
                break;
        }
    }
}