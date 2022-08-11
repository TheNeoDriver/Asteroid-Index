class Estrellas extends GameObject2D {

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
    }

    _animaciones = {
        "normal": [
            "Files/Escenario/Estrellas/estrellas0.png",
            "Files/Escenario/Estrellas/estrellas1.png",
            "Files/Escenario/Estrellas/estrellas2.png",
            "Files/Escenario/Estrellas/estrellas3.png",
            "Files/Escenario/Estrellas/estrellas4.png",
            "Files/Escenario/Estrellas/estrellas5.png",
            "Files/Escenario/Estrellas/estrellas6.png",
            "Files/Escenario/Estrellas/estrellas7.png",
            "Files/Escenario/Estrellas/estrellas8.png",
            "Files/Escenario/Estrellas/estrellas9.png",
            "Files/Escenario/Estrellas/estrellas10.png",
            "Files/Escenario/Estrellas/estrellas11.png"
        ]
    };

    _anim_actual = "normal";
    _fotograma_actual = 0;

    _velocidad_anim = 0.2;

}