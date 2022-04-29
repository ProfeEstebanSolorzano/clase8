let contadorGlobal = 1;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const pokemones = [];
for (let index = 0; index < 4; index++) {
    const numeroAleatorio = getRandomInt(1, 152);
    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
        .then(response => response.json())
        .then(data => pokemones.push(data));
}

//1. Traer un pokemon aleatorio
document.querySelector('#boton').onclick = () => {
    construirPregunta(pokemones);
    contadorGlobal++;
}

document.querySelector('#boton2').onclick = () => {
    // const respuesta = document.querySelector('input[name=pregunta]:checked');
    // const imagen = document.querySelector('img');
    // if (respuesta.value === imagen.attributes.nombre.value) {
    //     alert('La respuesta es correta');
    // }
    const respuestasEscogidas = document.querySelectorAll('input[type=radio]:checked');
    console.log(respuestasEscogidas);
}

/*
<div class="pregunta">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png" class="pokeImagen">
    <p>¿Cómo se llama este pokemon?</p>
    <input type="radio" name="pregunta"  value="nidorina"><label for="">Nidorina</label><br>
    <input type="radio" name="pregunta" value="picachu"><label for="">Picachu</label><br>
    <input type="radio" name="pregunta"  value="fearrow"><label for="">Fearrow</label><br>
    <input type="radio" name="pregunta"  value="squirtle"><label for="">Squirtle</label><br>
 </div>
*/
//2. Crear pregunta, html dinámico
//1. crear elemento, 2. modificar, 3. pegar
const construirPregunta2 = (pokemon) => {
    const pregunta = document.createElement('div');
    pregunta.classList.add('pregunta');

    const imagen = document.createElement('img');
    imagen.src = pokemon.sprites.front_default;
    imagen.classList.add('pokeImagen');

    const enunciado = document.createElement('p');
    enunciado.textContent = '¿Cómo se llama este pokemon?ᴥᴥᴥᴥ';
    //opcion1
    const opcion1 = document.createElement('input');
    opcion1.type = 'radio';
    opcion1.name = 'pregunta';
    opcion1.value = pokemon.name;

    const label1 = document.createElement('label');
    label1.textContent = pokemon.name;

    const separador1 = document.createElement('br');

    //opcion2
    const opcion2 = document.createElement('input');
    opcion2.type = 'radio';
    opcion2.name = 'pregunta';
    opcion2.value = 'Picachu';

    const label2 = document.createElement('label');
    label2.textContent = 'Picachu';

    const separador2 = document.createElement('br');

    //opcion3
    const opcion3 = document.createElement('input');
    opcion3.type = 'radio';
    opcion3.name = 'pregunta';
    opcion3.value = 'Psyduck';

    const label3 = document.createElement('label');
    label3.textContent = 'Psyduck';

    const separador3 = document.createElement('br');

    //opcion4
    const opcion4 = document.createElement('input');
    opcion4.type = 'radio';
    opcion4.name = 'pregunta';
    opcion4.value = 'Squirtle';

    const label4 = document.createElement('label');
    label4.textContent = 'Squirtle';

    const separador4 = document.createElement('br');

    const contendor = document.querySelector('#contendorDePreguntas');

    pregunta.appendChild(imagen);
    pregunta.appendChild(enunciado);
    pregunta.appendChild(opcion1);
    pregunta.appendChild(label1);
    pregunta.appendChild(separador1);
    pregunta.appendChild(opcion2);
    pregunta.appendChild(label2);
    pregunta.appendChild(separador2);
    pregunta.appendChild(opcion3);
    pregunta.appendChild(label3);
    pregunta.appendChild(separador3);
    pregunta.appendChild(opcion4);
    pregunta.appendChild(label4);
    pregunta.appendChild(separador4);

    contendor.appendChild(pregunta);
}

const construirPregunta = (pokemones) => {
    const preguntaEscogida = getRandomInt(0, 4);
    document.querySelector('#contendorDePreguntas').innerHTML += `
    <div class="pregunta">
    <img src="${pokemones[preguntaEscogida].sprites.front_default}" class="pokeImagen" nombre="${pokemones[preguntaEscogida].name}">
    <p>¿Cómo se llama este pokemon?</p>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${pokemones[0].name === pokemones[preguntaEscogida].name ? true : false}"><label for="">${pokemones[0].name}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}" value="${pokemones[1].name === pokemones[preguntaEscogida].name ? true : false}"><label for="">${pokemones[1].name}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${pokemones[2].name === pokemones[preguntaEscogida].name ? true : false}"><label for="">${pokemones[2].name}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${pokemones[3].name === pokemones[preguntaEscogida].name ? true : false}"><label for="">${pokemones[3].name}</label><br>
 </div>`;
}