const boton = document.querySelector('button');

boton.onclick = (e) => {
    iniciar()
}

let oportunidades = 5;
let numeroSecreto = 0;

function iniciar() {
    document.querySelector('input').disabled = false;
    document.querySelector('#pizarra').textContent = `Te quedan ${oportunidades} oportunidades`;
    boton.textContent = 'adivinar';
    numeroSecreto = getRandomInt(1, 11);
    boton.onclick = (e) => {
        jugar()
    }
}

function jugar() {
    const batazo = document.querySelector('input').value;
    if (!Math.floor(batazo)) {
        alert('Por favor no escriba letras');
        document.querySelector('input').value = '';
        return false;
    }
    if (batazo > numeroSecreto) {
        oportunidades--;
        document.querySelector('#pizarra').textContent = `El número adivinado es mayor, te quedan ${oportunidades} oportunidades`;
    } else if (batazo < numeroSecreto) {
        oportunidades--;
        document.querySelector('#pizarra').textContent = `El número adivinado es menor, te quedan ${oportunidades} oportunidades`;
    } else {
        document.querySelector('#pizarra').textContent = `Adivinaste el número!!! Felicidades`;
        boton.textContent = 'Volver a empezar';
        boton.onclick = (e) => {
            volverAEmpezar()
        }
    }
    if (oportunidades === 0) {
        document.querySelector('#pizarra').textContent = `perdiste, mejor suerte la próxima`;
        boton.textContent = 'Volver a empezar';
        boton.onclick = (e) => {
            volverAEmpezar()
        }
    }
}

function volverAEmpezar() {
    document.querySelector('#pizarra').textContent = '';
    boton.onclick = (e) => {
        iniciar()
    }
    document.querySelector('input').disabled = true;
    oportunidades = 5;
    boton.textContent = 'Iniciar';
    document.querySelector('input').value = '';
}



//funciones helper
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}