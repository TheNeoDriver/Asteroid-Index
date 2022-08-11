class Fondo extends GameObject2D {
    
    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }

    _animaciones = {
        "normal": ["Files/Background/Fondo/fondo.png"]
    };

    _anim_actual = "normal";
    _fotograma_actual = 0;

}