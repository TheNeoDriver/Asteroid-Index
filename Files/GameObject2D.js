class GameObject2D {
    
    constructor(pos_x, pos_y) {
        // La posición del objeto.
        this._pos_x = pos_x;
        this._pos_y = pos_y;
    }

    get_pos_x() {
        return this._pos_x;
    }

    get_pos_y() {
        return this._pos_y;
    }

    // La extensión de la caja de collisiones
    // se extiende la cantidad "hitbox_ancho" tanto
    // hacia izquierda como derecha.
    // De manera similar con "hitbox_alto", que se
    // extiende dicha distancia tanto como abajo
    // como arriba.
    _hitbox_ancho = 0;
    _hitbox_alto = 0;

    get_hitbox_ancho() {
        return this._hitbox_ancho;
    }
    
    get_hitbox_alto() {
        return this._hitbox_alto;
    }

    // Diccionario que contendra como llave el nombre
    // de la animación, y como valor llevara un array
    // de direcciones donde encontrar dichas imagenes
    // para formar la animación.
    _animaciones = {"": [""]};

    // Nombre de animación actual, número
    // de fotograma actual y la velocidad
    // de la animación.
    _anim_actual = "";
    _fotograma_actual = 0;
    _velocidad_anim = 1;
    _contador_velocidad_anim = 0;
    
    // Indica si debe eliminarse el objeto.
    _debe_eliminarse = false;

    get_debe_eliminarse() {
        return this._debe_eliminarse;
    }
    

    // procesar: Void -> Void:
    // ejecuta una serie de acciones
    // que constituiran la manera en la
    // que el objeto se desenvuelve en el
    // espacio.
    procesar(eventos = {}) {}

    // dibujar: CanvasContext2D -> Void
    // Dibuja las animaciones en pantalla
    // según la posición del objeto
    // en el canvas.
    dibujar(ctx) {
        let image = new Image();
        image.src = this._obtener_fotograma(this._anim_actual, this._fotograma_actual);
        this._siguiente_fotograma();

        let image_pos_x = this._pos_x - Math.floor(image.width / 2);
        let image_pos_y = this._pos_y - Math.floor(image.height / 2);

        ctx.drawImage(image, image_pos_x, image_pos_y);
    }

    _siguiente_fotograma() {
        this._contador_velocidad_anim += this._velocidad_anim

        this._fotograma_actual = Math.floor(this._contador_velocidad_anim);
        if(this._fotograma_actual >= this._animaciones[this._anim_actual].length) {
            this._contador_velocidad_anim = 0
            this._fotograma_actual = 0
        }
    }

    // _obtener_fotograma: String Number -> String
    // Obtiene la dirección del fotograma
    // especificado de la animación dada.
    _obtener_fotograma(nombre_anim, fotograma) {
        let anim_keys = Object.keys(this._animaciones);

        for(let i = 0; i < anim_keys.length; i++) {
            if(nombre_anim == anim_keys[i]) {
                return this._animaciones[nombre_anim][fotograma];
            }
        }

        return "";
    }
    
    // objeto_colisiono_con_otro: GameObject2D GameObject2D -> Boolean
    // Verifica si un objeto GameObject2D chocó con otro.
    static objeto_colisiono_con_otro(objeto_a, objeto_b) {
        if((objeto_b.get_hitbox_ancho() == 0) || (objeto_b.get_hitbox_alto() == 0)) {
            return false;
        }
    
        let objeto_a_lado_izq = objeto_a.get_pos_x() - objeto_a.get_hitbox_ancho();
        let objeto_a_lado_der = objeto_a.get_pos_x() + objeto_a.get_hitbox_ancho();

        let objeto_b_lado_izq = objeto_b.get_pos_x() - objeto_b.get_hitbox_ancho();
        let objeto_b_lado_der = objeto_b.get_pos_x() + objeto_b.get_hitbox_ancho();

        let objeto_a_lado_abajo = objeto_a.get_pos_y() + objeto_a.get_hitbox_alto();
        let objeto_a_lado_arriba = objeto_a.get_pos_y() - objeto_a.get_hitbox_alto();

        let objeto_b_lado_abajo = objeto_b.get_pos_y() + objeto_b.get_hitbox_alto();
        let objeto_b_lado_arriba = objeto_b.get_pos_y() - objeto_b.get_hitbox_alto();

        let colisiono = (
            (((objeto_a_lado_izq <= objeto_b_lado_der) &&
            (objeto_a_lado_der >= objeto_b_lado_izq)))
            &&
            (((objeto_a_lado_abajo >= objeto_b_lado_arriba) &&
            (objeto_a_lado_arriba <= objeto_b_lado_abajo)))
        );

        if(colisiono) {
            return true;
        } else {
            return false;
        }
    }

}

