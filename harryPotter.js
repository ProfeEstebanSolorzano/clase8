let contadorGlobal = 1;
const listaDeJugadores = {};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let filtrados = [];
fetch('http://hp-api.herokuapp.com/api/characters')
    .then(response => response.json())
    .then(data => filtrados = data.filter(elemento => elemento.image && elemento.house));

// const filtrar = (personajes) => {
//     const personajesFiltrados = [];
//     personajes.forEach(elemento => {
//         if (elemento.image) {
//             personajesFiltrados.push(elemento);
//         }
//     });
//     console.log(personajesFiltrados); 
//     return personajesFiltrados;
// }

//Nombre del actor, nombre del personaje y casa a la que pertenece
const tipoDePregunta = [
    '¿Cómo se llama el actor que interpreta este personaje?',
    '¿A qué casa pertenece el personaje?',
    '¿Cómo se llama este personaje?'
]

const atributoDePregunta = [
    'actor',
    'house',
    'name'
]

const construirPregunta = (personajesParaPregunta) => {
    const preguntaEscogida = getRandomInt(0, 4);
    const tipoDePreguntaEscogido = getRandomInt(0, 3);
    document.querySelector('#contendorDePreguntas').innerHTML += `
    <div class="pregunta">
    <img src="${personajesParaPregunta[preguntaEscogida].image}" class="harryImagen" nombre="${"aqui va algo"}">
    <p>${tipoDePregunta[tipoDePreguntaEscogido]}</p>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${personajesParaPregunta[preguntaEscogida].name === personajesParaPregunta[0].name ? true : false}"><label for="">${personajesParaPregunta[0][atributoDePregunta[tipoDePreguntaEscogido]]}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}" value="${personajesParaPregunta[preguntaEscogida].name === personajesParaPregunta[1].name ? true : false}"><label for="">${personajesParaPregunta[1][atributoDePregunta[tipoDePreguntaEscogido]]}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${personajesParaPregunta[preguntaEscogida].name === personajesParaPregunta[2].name ? true : false}"><label for="">${personajesParaPregunta[2][atributoDePregunta[tipoDePreguntaEscogido]]}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${personajesParaPregunta[preguntaEscogida].name === personajesParaPregunta[3].name ? true : false}"><label for="">${personajesParaPregunta[3][atributoDePregunta[tipoDePreguntaEscogido]]}</label><br>
 </div>`;
}

document.querySelector('#boton').onclick = () => {

    const personajesParaPregunta = [];
    filtrados[getRandomInt(0, filtrados.length)]; // asi saco 1
    while (personajesParaPregunta.length !== 4) {
        const personajeAleatorio = filtrados[getRandomInt(0, filtrados.length)];
        if (!personajesParaPregunta.includes(personajeAleatorio)) {
            personajesParaPregunta.push(personajeAleatorio);
        }
    }

    construirPregunta(personajesParaPregunta); //un arreglo con solo 4 yyy puedo asegurarme que NO sean repetidos
    contadorGlobal++;
}


document.querySelector('#boton2').onclick = () => {
    const cantidadDePreguntas = document.querySelector('#contendorDePreguntas').children;
    const preguntasSeleccionadas = document.querySelectorAll('input[type=radio]:checked');
    if (cantidadDePreguntas.length === preguntasSeleccionadas.length) {
        const nombre = prompt('Escriba su nombre');
        const verdaderas = Array.from(preguntasSeleccionadas).filter(elemento => elemento.attributes.value.value === 'true');
        const nota = (verdaderas.length / preguntasSeleccionadas.length) * 100;
        listaDeJugadores[nombre] = nota;
        console.log(listaDeJugadores);
    } else {
        alert('Por favor responda todas las preguntas.');
    }
}