let palabras = ["casa", "mesa", "silo", "pato", "gato", "cama", "rayo", "celo", "frio", "cola", "nube", "vino", "taza", "jugo", "codo", "ojos", "boca", "mano", "pies", "rato", "dama", "goma", "lodo", "toma", "bote", "dedo", "riel", "roca", "nota", "cima", "loma", "caza", "piel", "tela", "fila", "nuez", "pavo", "fama", "lago", "ropa", "mapa", "boda", "piso", "miel", "dura", "cero", "hilo", "lima", "tiro", "lino", "area", "dado", "bici", "cola", "sopa", "muda", "juez", "fuga", "mono", "duro", "nido", "fino", "foto", "loro"]
const palabraRandom = palabras[Math.round(Math.random() * palabras.length)]
let intentos = 1;
let posicion = 0
console.log(palabraRandom)
const tecla = document.querySelectorAll('.tecla')
let texto = document.querySelector('#palabra')
let paralabraIngresada;

// const celda = document.querySelectorAll('.casilla.i1 .celda')
// celda.forEach((celda, index) => {
//     celda.textContent = `${index + 1}`
// })
// function validarPalabra (palabra, intento ) {

// }
/*

function validarPalabra(palabra) {

    Array.from(i1.children).forEach((child , index)=> {

        if(child.textContent.includes('a')) {
            console.log('Tiene')
        }
        console.log(index)
    
        if(child.textContent.includes('a') && index === 0) {
            console.log('Index 0 tiene A')
        }
    })
}
*/


function insertarLetra(intentos, teclaID) {

    const celda = Array.from(document.querySelectorAll(`.casilla.i${intentos} .celda`))

    if(posicion < 4) {
        celda[posicion].textContent = teclaID
        posicion += 1
        // console.log(`posicion ${posicion}`)
        // console.log(`intentos ${intentos}`)
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
            //console.log(palabraRandom.indexOf(letras[index]))

            if(palabraRandom.indexOf(letras[index]) === index) {
                setTimeout(() => {
                    celdas[palabraRandom.indexOf(letras[index])].classList.add('correcto')
                    console.log(letras[index])
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

        // const celda = Array.from(document.querySelectorAll('.casilla.i1 .celda'))
        // celda[1].forEach((celda, index) => {
        //     celda.textContent = `${index + 10}`
        // })

        if(!teclaID.includes('borrar') && !teclaID.includes('enter')) {
            
            if(intentos <= 6) {
                if(texto.value.length < 4) {
                    insertarLetra(intentos, teclaID)
                    texto.value += teclaID
                }
            }
        }

        if(teclaID.includes('borrar') && texto.value.length > 0) {
            //console.log(texto.value.length)
            //console.log(texto.value.slice(0, texto.value.length - 1))
            if(texto.value !== ''){
                texto.value = texto.value.slice(0, texto.value.length - 1)
                borrarLetra(intentos)
            }
        }

        if(teclaID.includes('enter')) {

            if(intentos <= 6) {
                if(texto.value.length === 4) {
                    paralabraIngresada = texto.value
                    //console.log(paralabraIngresada)
                    texto.value = ''
                    intentos += 1
                    posicion = 0
    
                    if(palabraRandom === paralabraIngresada) {
                        // const celdas = Array.from(document.querySelectorAll(`.casilla.i${intentos - 1} .celda`))
                        // celdas.forEach(letra => {
                        //     letra.classList.add('contiene')
                        // })
                        //alert('exito')
                        validarLetra(intentos)
                    } else {
                        validarLetra(intentos)
                    }
    
                } else {
                    alert('Palabra demasiado corta')
                }
            }

        }

    })
})