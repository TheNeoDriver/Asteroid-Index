class NaveEnemiga extends GameObject2D {

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }

    _hitbox_ancho = 20;
    _hitbox_alto = 10;

    _animaciones = {
        "normal": [
            "Files/Enemigos/NaveEnemiga/nave_enemiga0.png",
            "Files/Enemigos/NaveEnemiga/nave_enemiga1.png",
            "Files/Enemigos/NaveEnemiga/nave_enemiga2.png",
            "Files/Enemigos/NaveEnemiga/nave_enemiga3.png",
        ]
    };

    _anim_actual = "normal";
    _fotograma_actual = 0;
    _velocidad_anim = 0.3;

    _add_score = 300;
    
    get_add_score() {
        return this._add_score;
    }

    procesar(eventos = {}) {
        this._pos_y += 4

        if(eventos["colisiono"]) {
            this._debe_eliminarse = true;
        }

        else if(this._pos_y >= (625 + this._hitbox_alto * 2)) {
            this._debe_eliminarse = true;
        }

    }

}