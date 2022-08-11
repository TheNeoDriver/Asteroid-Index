document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const background_canvas = document.getElementById('BackgroundCanvas');
const background_ctx = background_canvas.getContext('2d');
background_canvas.width  = window.innerWidth;
background_canvas.height = window.innerHeight;

const game_canvas = document.getElementById('GameCanvas');
const game_ctx = game_canvas.getContext('2d');

const delta_time = 1000/60;

var izquierda_presionado = false;
var derecha_presionado = false;
var abajo_presionado = false;
var arriba_presionado = false;
var boton_accion_presionado = false;

var objetos_background = [];
var objetos_escenario = [];
var objetos_jugador = [];
var objetos_enemigos = [];

var timer = 0;

var puede_lanzar = false;
var puede_lanzar_cont = 0;


function keyDownHandler(evento) {
    if(evento.keyCode == 32) {
        boton_accion_presionado = true;
    }

    if(evento.keyCode == 37) {
        izquierda_presionado = true;
    }

    else if(evento.keyCode == 39) {
        derecha_presionado = true;
    }
    
    if(evento.keyCode == 40) {
        abajo_presionado = true;
    }

    else if(evento.keyCode == 38) {
        arriba_presionado = true;
    }
}


function keyUpHandler(evento) {
    if(evento.keyCode == 32) {
        boton_accion_presionado = false;
    }

    if(evento.keyCode == 37) {
        izquierda_presionado = false;
    }

    else if(evento.keyCode == 39) {
        derecha_presionado = false;
    }

    if(evento.keyCode == 40) {
        abajo_presionado = false;
    }

    else if(evento.keyCode == 38) {
        arriba_presionado = false;
    }
}


function cargar() {
    objetos_background = Utilidades.cargar_background();
    objetos_escenario = Utilidades.cargar_escenario();
    objetos_jugador = Utilidades.cargar_jugador();
}


function main() {
    actualizar_timer();
    actualizar_score();

    eliminar_objetos();
    procesar_informacion_de_todos();

    dibujar_background();
    dibujar_todos_los_objetos_del_juego();

    setTimeout(main, delta_time);
}


function actualizar_timer() {
    timer += Math.floor((delta_time * 60)/1000);
    puede_lanzar_cont -= Math.floor((delta_time * 60)/1000)
}


function actualizar_score() {
    if((((Math.floor(timer) % 70) == 0)) && (objetos_jugador.length > 0)) {
        añadir_score(10);
    }
}


function eliminar_objetos() {

    for(let i = 0; i < objetos_escenario.length; i++) {
        if(objetos_escenario[i].get_debe_eliminarse()) {
            objetos_escenario.splice(i, 1);
        }
    }

    for(let i = 0; i < objetos_jugador.length; i++) {
        if(objetos_jugador[i].get_debe_eliminarse()) {
            objetos_jugador.splice(i, 1);
        }
    }

    for(let i = 0; i < objetos_enemigos.length; i++) {
        if(objetos_enemigos[i].get_debe_eliminarse()) {
            objetos_enemigos.splice(i, 1);
        }
    }

}


function procesar_informacion_de_todos() {
    procesar_info_de_objetos_background();
    procesar_info_de_objetos_escenario();
    procesar_info_de_objetos_jugador();
    procesar_info_de_objetos_enemigos();
}


function procesar_info_de_objetos_background() {
    for (let i = 0; i < objetos_background.length; i++) {
        objetos_background[i].procesar();
    }
}


function procesar_info_de_objetos_escenario() {
    for (let i = 0; i < objetos_escenario.length; i++) {
        objetos_escenario[i].procesar();
    }
}


function procesar_info_de_objetos_jugador() {
    if(puede_lanzar_cont <= 0) {
        puede_lanzar = true;
    }

    if((boton_accion_presionado) && (objetos_jugador.length > 0) && puede_lanzar) {
        puede_lanzar_cont = 30;
        puede_lanzar = false;

        let jugador = objetos_jugador[0];
        let pos_x = jugador.get_pos_x();
        let pos_y = jugador.get_pos_y() - jugador.get_hitbox_alto() - 20;

        objetos_jugador.push(Utilidades.generar_nueva_bala_jugador(pos_x, pos_y));
    }

    for (let i = 0; i < objetos_jugador.length; i++) {

        let eventos = {
            "izquierda": izquierda_presionado,
            "derecha": derecha_presionado,
            "abajo": abajo_presionado,
            "arriba": arriba_presionado,
            
            "colisiono_con_entorno": false,
            "colisiono_con_enemigo": false
        }

        for(let j = 0; j < objetos_enemigos.length; j++) {
            if(GameObject2D.objeto_colisiono_con_otro(objetos_jugador[i], objetos_enemigos[j])) {
                eventos["colisiono_con_enemigo"] = true;
            }
        }

        objetos_jugador[i].procesar(eventos);
    }       
}


function procesar_info_de_objetos_enemigos() {
    if((Math.floor(timer) % 50) == 0) {
        objetos_enemigos.push(Utilidades.crear_asteroide(0, 480, -100, -100));
    }

    if((Math.floor(timer) % 100) == 0) {
        objetos_enemigos.push(Utilidades.crear_nave_enemiga(80, 420, -100, -100));
    }

    for (let i = 0; i < objetos_enemigos.length; i++) {

        let eventos = {"colisiono": false}

        for(let j = 0; j < objetos_jugador.length; j++) {
            if(GameObject2D.objeto_colisiono_con_otro(objetos_enemigos[i], objetos_jugador[j])) {
                eventos["colisiono"] = true;
                if(objetos_enemigos[i].hasOwnProperty("_add_score")) {
                    añadir_score(objetos_enemigos[i].get_add_score());
                }
            }
        }

        objetos_enemigos[i].procesar(eventos);
    }
}


function añadir_score(numero) {
    objetos_background[1].add_score(numero);
}


function dibujar_background() {
    background_ctx.save();

    background_ctx.clearRect(0, 0, background_canvas.width, background_canvas.height);

    for (let i = 0; i < objetos_background.length; i++) {
        objetos_background[i].dibujar(background_ctx);
    }

    background_ctx.restore();
}


function dibujar_todos_los_objetos_del_juego() {
    game_ctx.save();

    game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);

    let todos_los_objetos = [];
    todos_los_objetos = todos_los_objetos.concat(
        objetos_escenario,
        objetos_jugador,
        objetos_enemigos,
    );

    for (let i = 0; i < todos_los_objetos.length; i++) {
        todos_los_objetos[i].dibujar(game_ctx);
    }

    game_ctx.restore();
}


cargar();
main();