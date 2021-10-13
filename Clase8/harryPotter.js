const boton = document.querySelector('#boton');

boton.onclick = (e) => {
    crearPregunta();
}

let infoCompleta;

function iniciar() {
    fetch('http://hp-api.herokuapp.com/api/characters')
        .then(respuesta => respuesta.json())
        .then(info => {
            infoCompleta = info;
            infoCompleta = infoCompleta.filter(personaje => {
                return personaje.image && personaje.actor
            })
            console.log('Info cargada:', infoCompleta.length)
        });
}

/* <div class="pregunta">
<p>--------------------------------------------------</p>
<div class="imagenContainer">
    <img src="" alt="">
</div>
<div class="preguntaItems">
    <p>¿Cuál es este actor/actriz?</p>
    <input type="radio" id="pregunta1A" name="pregunta1" value="">
    <label for="pregunta1A"></label><br>
    <input type="radio" id="pregunta1B" name="pregunta1" value="">
    <label for="pregunta1B"></label><br>
    <input type="radio" id="pregunta1C" name="pregunta1" value="">
    <label for="pregunta1C"></label><br>
    <input type="radio" id="pregunta1D" name="pregunta1" value="">
    <label for="pregunta1D"></label>
    <p>--------------------------------------------------</p>
</div>
</div> */
const letras = ['A', 'B', 'C', 'D'];
let contadorGlobalDePreguntas = 1;

function crearPregunta() {
    const personaje = infoCompleta[getRandomInt(0, infoCompleta.length - 1)];

    console.log(personaje);
    //creacion de div contenedor principal
    //no hago append sino hasta el final
    const divPregunta = document.createElement('div');
    divPregunta.classList.add('pregunta');

    //crear p
    const divisor = document.createElement('p');
    divisor.textContent = '--------------------------------------------------';
    divPregunta.appendChild(divisor);

    //div image container
    const divImg = document.createElement('div');
    divImg.classList.add('imagenContainer');
    //como lleva una img por dentro no la voy a hacer append hasta que tenga la img

    //creo img
    const imagen = document.createElement('img');
    imagen.src = personaje.image;
    divImg.appendChild(imagen);

    divPregunta.appendChild(divImg);

    const divItems = document.createElement('div');
    divItems.classList.add('preguntaItems');

    //crear p
    const p = document.createElement('p');
    p.textContent = '¿Cuál es este actor/actriz?';
    divItems.appendChild(p);

    //crear los 4 input y label
    for (let i = 0; i < 4; i++) {
        //creo input
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `pregunta${contadorGlobalDePreguntas}`;
        input.id = `pregunta${contadorGlobalDePreguntas}${letras[i]}`;
        //creo label
        const label = document.createElement('label');
        label.setAttribute('for', `pregunta${contadorGlobalDePreguntas}${letras[i]}`);
        //les pongo values iguales al lable y al input
        if (i === 0) {
            input.value = personaje.actor;
            label.textContent = personaje.actor
        } else {
            input.value = infoCompleta[getRandomInt(0, infoCompleta.length - 1)].actor;
            label.textContent = input.value;
        }
        divItems.appendChild(input);
        divItems.appendChild(label);

        const br = document.createElement('br');
        divItems.appendChild(br);
    }
    divPregunta.appendChild(divItems);
    //crear segundo divisor
    const divisor2 = document.createElement('p');
    divisor2.textContent = '--------------------------------------------------';
    divPregunta.appendChild(divisor2);
    document.querySelector('#preguntas').appendChild(divPregunta);
    contadorGlobalDePreguntas++;
}


function probarQueFunciona() {
    document.querySelector('img').src = infoCompleta[0].image;
    document.querySelectorAll('input[type=radio]').forEach((elemento, i) => {
        elemento.value = infoCompleta[i].actor;
        document.querySelector(`label[for=${elemento.id}]`).textContent = infoCompleta[i].actor;
    })
}

iniciar();


//helper
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}