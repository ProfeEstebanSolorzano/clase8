document.querySelector('#boton').onclick = () => {

    for (let index = 0; index < 10; index++) {
        const numeroAleatorio = getRandomInt(1, 152);
        fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
            .then(response => response.json())
            .then(data => contruirPokemon(data));
    }

    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('contenedorPokemon');
    document.querySelector('body').appendChild(pokemonContainer);
}

const contruirPokemon = (pokemon) => {
    const nombre = document.createElement('h2');
    nombre.id = 'nombre';
    nombre.textContent = pokemon.name;
    const foto = document.createElement('img');
    foto.classList.add('foto');
    foto.src = pokemon.sprites.front_default;
    const lista = document.createElement('ul');
    lista.classList.add('lista');
    const peso = document.createElement('li');
    peso.textContent = `Peso: ${pokemon.weight}`;

    const numero = document.createElement('li');
    numero.textContent = `numero: ${pokemon.id}`;

    const altura = document.createElement('li');
    altura.textContent = `altura: ${pokemon.height}`;

    lista.appendChild(peso);
    lista.appendChild(altura);
    lista.appendChild(numero);

    const contenedor = document.querySelector('.contenedorPokemon');
    contenedor.appendChild(nombre);
    contenedor.appendChild(foto);
    contenedor.appendChild(lista);
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}