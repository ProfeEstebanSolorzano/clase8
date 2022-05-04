let contadorGlobal = 1;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const construirPregunta = (pokemones) => {
    const preguntaEscogida = getRandomInt(0, 4);
    document.querySelector('#contendorDePreguntas').innerHTML += `
    <div class="pregunta">
    <img src="${"aqui va algo"}" class="pokeImagen" nombre="${"aqui va algo"}">
    <p>¿Cómo se llama este pokemon?</p>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${"aqui va algo"}"><label for="">${"aqui va algo"}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}" value="${"aqui va algo"}"><label for="">${"aqui va algo"}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${"aqui va algo"}"><label for="">${"aqui va algo"}</label><br>
    <input type="radio" name="pregunta${contadorGlobal}"  value="${"aqui va algo"}"><label for="">${"aqui va algo"}</label><br>
 </div>`;
}