class Jugador extends GameObject2D {
    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }
    
    _hitbox_ancho = 20;
    _hitbox_alto = 10;

    _animaciones = {
        "normal": [
            "Files/Jugador/Nave/nave0.png",
            "Files/Jugador/Nave/nave1.png",
            "Files/Jugador/Nave/nave2.png",
            "Files/Jugador/Nave/nave3.png"
        ]
    };

    _anim_actual = "normal";
    _fotograma_actual = 0;
    _velocidad_anim = 0.3;

    _velocidad_movimiento = 4;

    
    procesar(eventos = {}) {
        if(eventos["colisiono_con_enemigo"]) {
            this._debe_eliminarse = true;
        }

        let _movimiento_x = 0;
        let _movimiento_y = 0;

        if((eventos["izquierda"]) && ((this._pos_x - this._hitbox_ancho) > 0)) {
            _movimiento_x = -0.8;
        }

        if((eventos["derecha"]) && ((this._pos_x + this._hitbox_ancho) < 480)) {
            _movimiento_x = 0.8;
        }

        if((eventos["abajo"]) && ((this._pos_y + this._hitbox_alto) < 625)) {
            _movimiento_y = 0.7;
        }

        if((eventos["arriba"]) && ((this._pos_y - this._hitbox_alto) > 0)) {
            _movimiento_y = -1;
        }

        this._pos_x += this._velocidad_movimiento * _movimiento_x;
        this._pos_y += this._velocidad_movimiento * _movimiento_y;
    }

}