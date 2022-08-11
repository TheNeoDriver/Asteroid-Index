class Scoreboard extends GameObject2D {

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }

    _score = 0;
    _score_limit = 999999999999;

    add_score(numero) {
        if(this._score < this._score_limit) {
            this._score += numero;
        } else {
            this._score = this._score_limit;
        }
        
    }

    _font = "bold 20px verdana";


    dibujar(ctx) {
        let texto = "SCORE: " + this._score;
        ctx.font = this._font;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(texto, this._pos_x, this._pos_y);
    }

}