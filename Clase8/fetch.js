const boton = document.querySelector('#boton');

//Version1 se trae solo 1 pokemon y crea solo 1 class pregunta
// boton.onclick = () => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(1,152)}`)
//         .then(respuestaCruda => {
//             return respuestaCruda.json();
//         })
//         .then(pokemon => {
//             document.querySelector('img').src = pokemon.sprites.front_default;
//             document.querySelector('h3').textContent = pokemon.name;
//             const items = document.querySelectorAll('li');
//             items[0].textContent = `Peso: ${pokemon.weight}`;
//             items[1].textContent = `Altura: ${pokemon.height}`
//             items[2].textContent = `Número: ${pokemon.id}`
//         })
//     if(!document.querySelector('.pregunta')){
//         crearPregunta();
//     }
// }

//Version2 se trae solo 1 pokemon y crea nuevos class pregunta
// boton.onclick = () => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(1,152)}`)
//         .then(respuestaCruda => {
//             return respuestaCruda.json();
//         })
//         .then(pokemon => {
//             crearPregunta(pokemon);
//         });
// }

//Version3 se X pokemones y crea nuevos class pregunta
boton.onclick = () => {
    const listaPokemon = [];
    for (let index = 0; index < 10; index++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(1,152)}`)
            .then(respuestaCruda => {
                return respuestaCruda.json();
            })
            .then(pokemon => {
                listaPokemon.push(pokemon);
            });
    }
    console.log(listaPokemon);
}


/*
 <div class="pregunta">
            <div class="imagenContainer">
                <img src="">
            </div>
            <h3>Nombre</h3>
            <ul>
                <li>Peso: </li>
                <li>Altura: </li>
                <li>Número:</li>
            </ul>
        </div>
*/

const crearPregunta = (pokemon) => {
    const divPregunta = document.createElement('div');
    divPregunta.setAttribute('class', 'pregunta');
    //no se me olvide pegarlo al body
    const imagenContainer = document.createElement('div');
    imagenContainer.setAttribute('class', 'imagenContainer');
    const imagen = document.createElement('img');
    imagen.setAttribute('src', pokemon.sprites.front_default);
    imagenContainer.appendChild(imagen);
    //lo pego un vez listo
    divPregunta.appendChild(imagenContainer);
    const nombre = document.createElement('h3');
    nombre.textContent = pokemon.name;
    divPregunta.appendChild(nombre);
    const lista = document.createElement('ul');
    const itemA = document.createElement('li');
    itemA.textContent = `Peso: ${pokemon.weight}`;
    lista.appendChild(itemA);
    const itemB = document.createElement('li');
    itemB.textContent = `Altura: ${pokemon.height}`;
    lista.appendChild(itemB);
    const itemC = document.createElement('li');
    itemC.textContent = `Número: ${pokemon.id}`;
    lista.appendChild(itemC);
    divPregunta.appendChild(lista);
    document.querySelector('#preguntas').appendChild(divPregunta);
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}