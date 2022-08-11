class BalaJugador extends GameObject2D {

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }

    _hitbox_ancho = 4;
    _hitbox_alto = 12;

    _animaciones = {
        "normal": ["Files/Jugador/Bala/bala.png"]
    };

    _anim_actual = "normal";
    _fotograma_actual = 0;

    
    procesar(eventos = {}) {
        this._pos_y -= 8;

        if(eventos["colisiono_con_enemigo"]) {
            this._debe_eliminarse = true;
        }

        else if(this._pos_y <= (0 - this._hitbox_alto * 2)) {
            this._debe_eliminarse = true;
        }

    }

}