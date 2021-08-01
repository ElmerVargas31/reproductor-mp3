//Declaración variables - arreglos
let albumes = ["img/song1.png", "img/song2.png", "img/song3.png", "img/song4.png", "img/song5.png"];
let canciones = ["media/song1.mp3", "media/song2.mp3", "media/song3.mp3", "media/song4.mp3", "media/song5.mp3"];
let nombres = ["Roses (Imanbek Remix)", "In My Mind", "The Business", "Rasputin", "Waiting For Love"];
let artistas = ["SAINt JHN", "Dynoro & Gigi D'Agostino", "Tiësto", "Majestic x Boney M.", "Avicii"];

let cont = 0;
let reproducir = false;

let audio = document.querySelector("#audio");

//Cuando el documento este cargado, funciona JQuery
$(document).ready(function () {

    //Llamado de la función, para recargar información de la canción #1
    recorrerArreglo();

    //Recorrer elementos del arreglo al recargar cada canción
    function recorrerArreglo(){
        //La información de las canciones y la imagen del álbum se oculta
        $("#album").hide();
        $("#img_alb").hide();
        $("#nombre").hide();
        $("#artista").hide();

        //Cuando recarga la página, mostrar información de la canción #1
        $("#album").fadeIn(400);
        $("#img_alb").attr("src", albumes[cont]).fadeIn(400);
        $("#nombre").text(nombres[cont]).fadeIn(400);
        $("#artista").text(artistas[cont]).fadeIn(400);

        //Llamar a la ruta del archivo de audio musical
        audio.setAttribute("src", canciones[cont]);
    }

    //Ocultar recuadro de mensaje con el nivel de volúmen del audio
    $("#mensaje").hide();

    //Estética del botón Play cuando las canciones se reproducen (mostrar ícono para luego pausar)
    function enReproducción(){
        $("#play").html("<i class='fas fa-pause fa-3x' style='margin-right: 5px'></i>");
    }

    //Estética del botón Play cuando las canciones se pausan (mostrar ícono para luego reproducir)
    function enPausa(){
        $("#play").html("<i class='fas fa-play fa-3x'></i>");
    }

    //Reproducir - Pausar Canción
    $("#play").click( () => { 
        if(reproducir == false){
            Reproducir();
            enReproducción();
            reproducir = true;
        }else{
            Pausar();
            enPausa();
            reproducir = false;
        }
    })

    //Botón de Siguiente
    $("#next").click( () => {
        if(cont <= 4){
            //Recorrido del reproductor por las piezas 0 a 4 (1 a 5)
            cont++;
            recorrerArreglo();
            Reproducir();
            enReproducción();

            //Cuando se llega a la última pieza, retornar a la primera
            if(cont>4){
                cont=0;
                recorrerArreglo();
                Reproducir();
                enReproducción();
            }
        }
    })

    //Botón de Anterior
    $("#prev").click( () => {
        if(cont >= 0){
            //Recorrido del reproductor por las piezas 4 a 0 (5 a 1)
            cont--;
            recorrerArreglo();
            Reproducir();
            enReproducción();

            //Cuando se llega a la primer pieza, retornar a la última
            if(cont<0){
                cont=4;
                recorrerArreglo();
                Reproducir();
                enReproducción();
            }
        }
    })

    //Reducir volúmen de la música
    $("#low").click( ()=> { 
        audio.volume -= 0.1;

        //Mostrar un mensaje con el nivel de volumen al 0%
        if(audio.volume == 1.3877787807814457e-16){
            $("#mensaje").text("Volúmen: 0%");
            $("#mensaje").fadeIn(1500);
            $("#mensaje").fadeOut(1000);
        }
    }); 

    //Aumentar volúmen de la música
    $("#high").click( ()=> { 
        audio.volume += 0.1;

        //Mostrar un mensaje con el nivel de volumen al 0%
        if(audio.volume == 1){
            $("#mensaje").text("Volúmen: 100%");
            $("#mensaje").fadeIn(1500);
            $("#mensaje").fadeOut(1000);
        }
    }); 
         
})//Fin Document Ready

function Reproducir() {
    audio.play();
}

function Pausar() {
    audio.pause();
}