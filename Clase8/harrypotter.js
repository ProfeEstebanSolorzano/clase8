const boton = document.querySelector('#boton');
let personajes = [];
fetch('http://hp-api.herokuapp.com/api/characters')
    .then(respuestaCruda => respuestaCruda.json())
    .then(respuesta => {
        personajes = respuesta.filter(personaje => personaje.actor && personaje.house && personaje.image);
    });


const crearPregunta = (personajesParaPregunta) => {
    const personajeMain = personajesParaPregunta[getRandomInt(0, personajesParaPregunta.length)];
    const nombre = personajeMain.name;
    const divPregunta = document.createElement('div');
    divPregunta.setAttribute('class', 'pregunta');
    //no se me olvide pegarlo al body
    const imagenContainer = document.createElement('div');
    imagenContainer.setAttribute('class', 'imagenContainer');
    const imagen = document.createElement('img');
    imagen.setAttribute('src', personajeMain.image);
    imagenContainer.appendChild(imagen);
    //lo pego un vez listo
    divPregunta.appendChild(imagenContainer);
    const enunciado = document.createElement('h3');
    enunciado.textContent = "Como se llama este personaje";
    divPregunta.appendChild(enunciado);

    for (let index = 0; index < 4; index++) {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'respuestas';
        radio.value = personajesParaPregunta[index].name === nombre;
        divPregunta.appendChild(radio);
        const labelRespuesta = document.createElement('label');
        labelRespuesta.textContent = personajesParaPregunta[index].name;
        divPregunta.appendChild(labelRespuesta);
        const brk = document.createElement('br');
        divPregunta.appendChild(brk);
    }

    document.querySelector('#preguntas').appendChild(divPregunta);
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


boton.onclick = () => {
    const personajesParaPregunta = [];
    while (personajesParaPregunta.length <= 3) {
        const personajeTemporal = personajes[getRandomInt(0, personajes.length)];
        if (!personajesParaPregunta.includes(personajeTemporal)) {
            personajesParaPregunta.push(personajeTemporal);
        }
    }
    crearPregunta(personajesParaPregunta);
}