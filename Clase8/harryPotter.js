const boton = document.querySelector('#boton');

boton.onclick = (e) => {
    crearPreguntas();
}

let infoCompleta;

function traerInformacion() {
    fetch('http://hp-api.herokuapp.com/api/characters')
        .then(respuesta => respuesta.json())
        .then(info => {
            infoCompleta = info.filter(elemento => elemento.name && elemento.image);
            console.log('Información lista');
        })
}

traerInformacion();

/* <div class="contenedorPregunta">
            <hr>*
            <div class="imagenContainer">
                <img src="http://hp-api.herokuapp.com/images/hermione.jpeg" alt="">
            </div>*
            <p class="textoPregunta">Como se llama este personaje?</p>
            <div class="opcionesContainer">
                <input type="radio" name="pregunta1" id="">
                <label for="">Harry Potter</label><br>
                <input type="radio" name="pregunta1" id="">
                <label for="">Hermione Granger</label><br>
                <input type="radio" name="pregunta1" id="">
                <label for="">Ron Wesley</label><br>
                <input type="radio" name="pregunta1" id="">
                <label for="">Albus Dumbledore</label>
            </div>
            <hr>
        </div> */

const tipoPregunta = ['actor', 'name', 'house'];
const textoPregunta = ['Como se llama el actor?', 'Como se llama el personaje', 'A que casa pertenece?'];

const contadorDePreguntas = 1;

function crearPreguntas() {
    const respuestaCorrecta = getRandomInt(0, 4); // respuesta correcta
    const personaje = infoCompleta[getRandomInt(0, infoCompleta.length)];
    //3 pasos para crear elementos
    //1 createElement. 2 meter informacion o modificar. 3 appenChild

    //crear div contenedor principal
    const divPrincipal = document.createElement('div');
    divPrincipal.classList.add('contenedorPregunta'); //no olvidar hacer append

    const divisor1 = document.createElement('hr')
    divPrincipal.appendChild(divisor1);


    const imagenContainer = document.createElement('div');
    imagenContainer.classList.add('imagenContainer');

    const imagen = document.createElement('img');
    imagen.src = personaje.image;
    imagenContainer.appendChild(imagen);

    divPrincipal.appendChild(imagenContainer);

    const texto = document.createElement('p');
    texto.classList.add('textoPregunta');
    texto.textContent = 'Como se llama el/la actor/actriz?';

    divPrincipal.appendChild(texto);

    const opcionesContainer = document.createElement('div');
    opcionesContainer.classList.add('opcionesContainer'); //no olvidar hacer append

    for (let i = 0; i < 4; i++) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `pregunta${contadorDePreguntas}`;

        const label = document.createElement('label');

        if (i === respuestaCorrecta) {
            input.value = true;
            label.textContent = personaje.actor;
        } else {
            input.value = false;
            label.textContent = infoCompleta[getRandomInt(0, infoCompleta.length)].actor;
        }

        opcionesContainer.appendChild(input);
        opcionesContainer.appendChild(label);

        const espacio = document.createElement('br')
        opcionesContainer.appendChild(espacio)
    }

    divPrincipal.appendChild(opcionesContainer);

    const divisor2 = document.createElement('hr')
    divPrincipal.appendChild(divisor2);

    document.querySelector('#preguntas').appendChild(divPrincipal);

}




//helper
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}