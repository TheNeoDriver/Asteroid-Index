class Utilidades {

    static cargar_background() {
        let objetos_background = [];
        let fondo = new Fondo(683, 313);
        let scoreboard = new Scoreboard(1010, 120);
        objetos_background.push(fondo, scoreboard);

        return objetos_background;
    }

    static cargar_escenario() {
        let objetos_escenario = [];
        let cielo = new Cielo(240, 313);
        let estrellas = new Estrellas(240, 313);
        objetos_escenario.push(cielo, estrellas);

        return objetos_escenario;
    }

    static cargar_jugador() {
        let objetos_jugador = [];
        let jugador = new Jugador(240, 500);
        objetos_jugador.push(jugador);

        return objetos_jugador;
    }

    static generar_nueva_bala_jugador(pos_x, pos_y) {
        let nueva_bala = new BalaJugador(pos_x, pos_y);
        return nueva_bala
    }

    static crear_asteroide(rango_inicio_x, rango_final_x, rango_inicio_y, rango_final_y) {
        let random_pos_x = (
            Math.floor(Math.random() * (rango_final_x - rango_inicio_x)) + rango_inicio_x
        );
        let random_pos_y = (
            Math.floor(Math.random() * (rango_final_y - rango_inicio_y)) + rango_inicio_y
        );

        let asteroide = new Asteroide(random_pos_x, random_pos_y);

        return asteroide;
    }

    static crear_nave_enemiga(rango_inicio_x, rango_final_x, rango_inicio_y, rango_final_y) {
        let random_pos_x = (
            Math.floor(Math.random() * (rango_final_x - rango_inicio_x)) + rango_inicio_x
        );
        let random_pos_y = (
            Math.floor(Math.random() * (rango_final_y - rango_inicio_y)) + rango_inicio_y
        );

        let nave_enemiga = new NaveEnemiga(random_pos_x, random_pos_y);
        
        return nave_enemiga;
    }

}