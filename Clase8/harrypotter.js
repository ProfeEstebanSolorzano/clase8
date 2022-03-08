const boton = document.querySelector('#boton');
const botonDos = document.querySelector('#responder');
let personajes = [];
fetch('http://hp-api.herokuapp.com/api/characters')
    .then(respuestaCruda => respuestaCruda.json())
    .then(respuesta => {
        personajes = respuesta.filter(personaje => personaje.actor && personaje.house && personaje.image);
    });


const enunciados = ['¿Cómo se llama este personaje?', '¿Cómo se llama el actor?', '¿A qué casa pertence este personaje?'];

let numeroDePregunta = 1;

const atributosDePreguntas = ['name', 'actor', 'house']

const crearPregunta = (personajesParaPregunta) => {
    const personajeMain = personajesParaPregunta[getRandomInt(0, personajesParaPregunta.length)];

    const numeroAleatorioParaPregunta = getRandomInt(0, enunciados.length);
    const atributo = atributosDePreguntas[numeroAleatorioParaPregunta];
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
    enunciado.textContent = enunciados[numeroAleatorioParaPregunta];
    divPregunta.appendChild(enunciado);

    for (let index = 0; index < 4; index++) {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `pregunta${numeroDePregunta}`;
        radio.value = personajesParaPregunta[index][atributo] === personajeMain[atributo];
        divPregunta.appendChild(radio);
        const labelRespuesta = document.createElement('label');
        labelRespuesta.textContent = personajesParaPregunta[index][atributo];
        divPregunta.appendChild(labelRespuesta);
        const brk = document.createElement('br');
        divPregunta.appendChild(brk);
    }

    document.querySelector('#preguntas').appendChild(divPregunta);
    numeroDePregunta++;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}



boton.onclick = () => {
    document.querySelector('#nota').setAttribute('class', 'invisible');
    const personajesParaPregunta = [];
    const nombres = [];
    while (personajesParaPregunta.length <= 3) {
        const personajeTemporal = personajes[getRandomInt(0, personajes.length)];
        if (!personajesParaPregunta.includes(personajeTemporal)) {
            personajesParaPregunta.push(personajeTemporal);
            nombres.push(personajeTemporal.name);
        }
    }
    crearPregunta(personajesParaPregunta);
    console.log(nombres);
}

botonDos.onclick = () => {
    evaluar();
}

const evaluar = () => {
    let radios = document.querySelectorAll('input:checked');
    if (radios.length === 0) {
        alert('Conteste antes de evaluar');
    } else {
        const verdaderos = [];
        for (let index = 0; index < radios.length; index++) {
            console.log(radios[index]);
            if (radios[index].value === 'true') {
                verdaderos.push(radios[index]);
            }
        }
        const nota = verdaderos.length * 10;
        const divNota = document.querySelector('#nota');
        let color;
        if (nota >= 70) {
            color = 'verde'
        } else {
            color = 'rojo'
        }
        divNota.setAttribute('class', `visible ${color}`);
        divNota.textContent = `Usted se sacó un ${nota}`;
        document.querySelectorAll('.pregunta').forEach(pregunta => {
            pregunta.remove();
        });
    }


}