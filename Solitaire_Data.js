function Solitaire_Data(){
    var _initializer = new Initializer(this);
    this.cards;
    this.tableau;
    this.stock_pile;
    this.stock_pile_avail;
    this.data_f1;
    this.data_f2;
    this.data_f3;
    this.data_f4;
    
    this.init_game = function(){
        this.cards = _initializer.create_deck();
        this.tableau = _initializer.create_tableau();
        this.stock_pile = _initializer.deal_cards();
        this.stock_pile_avail;
        this.data_f1 = new Array(13);
        this.data_f2 = new Array(13);
        this.data_f3 = new Array(13);
        this.data_f4 = new Array(13);
        
    }
}

