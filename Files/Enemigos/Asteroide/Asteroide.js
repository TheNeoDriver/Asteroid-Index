class Asteroide extends GameObject2D {

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }

    _hitbox_ancho = 20;
    _hitbox_alto = 20;

    _animaciones = {
        "normal": [
            "Files/Enemigos/Asteroide/asteroide0.png",
            "Files/Enemigos/Asteroide/asteroide1.png",
            "Files/Enemigos/Asteroide/asteroide2.png",
            "Files/Enemigos/Asteroide/asteroide3.png",
            "Files/Enemigos/Asteroide/asteroide4.png",
            "Files/Enemigos/Asteroide/asteroide5.png",
            "Files/Enemigos/Asteroide/asteroide6.png",
            "Files/Enemigos/Asteroide/asteroide7.png",
            "Files/Enemigos/Asteroide/asteroide8.png",
            "Files/Enemigos/Asteroide/asteroide9.png",
            "Files/Enemigos/Asteroide/asteroide10.png",
            "Files/Enemigos/Asteroide/asteroide11.png",
            "Files/Enemigos/Asteroide/asteroide12.png",
            "Files/Enemigos/Asteroide/asteroide13.png",
            "Files/Enemigos/Asteroide/asteroide14.png",
            "Files/Enemigos/Asteroide/asteroide15.png"
        ]
    };

    _anim_actual = "normal";
    _fotograma_actual = 0;
    _velocidad_anim = 0.5;

    procesar(eventos = {}) {
        this._pos_y += 2;

        if(this._pos_y >= (625 + this._hitbox_alto * 2)) {
            this._debe_eliminarse = true;
        }
    }

}