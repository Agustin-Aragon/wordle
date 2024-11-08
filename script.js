let palabras = ["caso", "mesa", "silo", "pato", "gato", "capa", "rayo", "celo", "frio", "cola", "nube", "vino", "taza", "jugo", "coma", "boca", "mano", "pies", "rato", "dama", "goma", "lodo", "toma", "bote", "remo", "riel", "roca", "nota", "cima", "loma", "caso", "piel", "tela", "fila", "nuez", "pavo", "fila", "lago", "ropa", "boda", "piso", "miel", "dura", "cero", "hilo", "lima", "tiro", "lino", "cola", "sopa", "muda", "juez", "fuga", "mano", "duro", "nido", "fino", "tero"]
const palabraRandom = palabras[Math.round(Math.random() * palabras.length)]
let intentos = 1;
let posicion = 0
console.log(palabraRandom)
const tecla = document.querySelectorAll('.tecla')
let texto = document.querySelector('#palabra')
let paralabraIngresada;

const palabra = document.querySelector('.palabra')
palabra.textContent = palabraRandom

let win = false;

document.addEventListener('keydown', function(event) {

    if(intentos <= 6) {
        if(texto.value.length < 4) {
            teclasValidas = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
            if(teclasValidas.includes(event.key)) {
                insertarLetra(intentos, event.key)
                texto.value += event.key
            }
        }
    }

    if(event.key.includes('Backspace') && texto.value.length > 0) {
        if(texto.value !== ''){
            texto.value = texto.value.slice(0, texto.value.length - 1)
            borrarLetra(intentos)
        }
    }

    if(event.key.includes('Enter')) {
        if(!win) {
            if(intentos <= 6) {
                if(texto.value.length === 4) {
                    paralabraIngresada = texto.value
                    texto.value = ''
                    intentos += 1
                    posicion = 0
    
                    if(palabraRandom === paralabraIngresada) {
                        validarLetra(intentos)
                        setTimeout(() => {
                            confeti()
                            const ganaste = document.querySelector('.ganaste')
                            ganaste.style.display = 'flex'
                            win = true
                        }, 500);
                    } else {
                        validarLetra(intentos)
                        if(intentos === 7) {
                            setTimeout(() => {
                                const perdiste = document.querySelector('.perdiste')
                                perdiste.style.display = 'flex'
                            }, 500);
                        }
                    }
    
                } else {
                    alert('Palabra demasiado corta')
                }
            }
        } else {
            alert('Juego reiniciado')
            win = false
            console.log(win)
        }

    }
});

function insertarLetra(intentos, teclaID) {

    const celda = Array.from(document.querySelectorAll(`.casilla.i${intentos} .celda`))

    if(posicion < 4) {
        celda[posicion].textContent = teclaID
        posicion += 1
        celda[posicion - 1].classList.add('letra')
    }
}

function borrarLetra(intentos) {
    const celda = Array.from(document.querySelectorAll(`.casilla.i${intentos} .celda`))
    celda[posicion - 1].textContent = ''
    posicion -= 1
    celda[posicion].classList.remove('letra')
}

function validarLetra(intentos) {

    const celdas = Array.from(document.querySelectorAll(`.casilla.i${intentos - 1} .celda`))
    const letras = []

    celdas.forEach(letra => {
        letras.push(letra.textContent)
        letra.classList.remove('letra')
        letra.classList.add('animacion')
    })

    for (let index = 0; index < 4; index++) {
    
        const teclado = document.querySelector(`#${letras[index]}`)
        
        if(palabraRandom.includes(letras[index])) {

            if(palabraRandom[index] === letras[index]) {
                setTimeout(() => {
                    celdas[index].classList.add('correcto')
                    teclado.classList.remove('contiene')
                    teclado.classList.add('correcto')
                }, 200);
            } else {
                setTimeout(() => {
                    celdas[index].classList.add('contiene')
                    if(!teclado.classList.contains('correcto')) {
                        teclado.classList.add('contiene')
                    }
                }, 200);
            }
        } else {
            setTimeout(() => {
                celdas[index].classList.add('no-contiene')
                teclado.classList.add('no-contiene')
            }, 200);
        }
    }

}

tecla.forEach(tecla => {
    tecla.addEventListener('click', Event => {

        let teclaID = Event.currentTarget.id

        if(!teclaID.includes('borrar') && !teclaID.includes('enter')) {
            
            if(intentos <= 6) {
                if(texto.value.length < 4) {
                    insertarLetra(intentos, teclaID)
                    texto.value += teclaID
                }
            }
        }

        if(teclaID.includes('borrar') && texto.value.length > 0) {
            if(texto.value !== ''){
                texto.value = texto.value.slice(0, texto.value.length - 1)
                borrarLetra(intentos)
            }
        }

        if(teclaID.includes('enter')) {

            if(intentos <= 6) {
                if(texto.value.length === 4) {
                    paralabraIngresada = texto.value
                    texto.value = ''
                    intentos += 1
                    posicion = 0
    
                    if(palabraRandom === paralabraIngresada) {
                        validarLetra(intentos)
                        setTimeout(() => {
                            confeti()
                            const ganaste = document.querySelector('.ganaste')
                            ganaste.style.display = 'flex'
                        }, 500);
                    } else {
                        validarLetra(intentos)
                        if(intentos === 7) {
                            setTimeout(() => {
                                const perdiste = document.querySelector('.perdiste')
                                perdiste.style.display = 'flex'
                            }, 500);
                        }
                    }
    
                } else {
                    alert('Palabra demasiado corta')
                }
            }

        }

    })
})

function confeti() {
    const duration = 1.5 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
    }, 250);
}

function formatearJuego() {
    const celdas = Array.from(document.querySelectorAll(`.casilla.i${intentos - 1} .celda`))
}