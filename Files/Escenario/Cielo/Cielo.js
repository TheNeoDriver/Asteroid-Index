class Cielo extends GameObject2D {

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }

    _animaciones = {
        "static": ["Files/Escenario/Cielo/cielo.png"]
    };

    _anim_actual = "static";
    _fotograma_actual = 0;
    
}