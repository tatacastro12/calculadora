pueden desplegar la calculadora https://tatacastro12.github.io/calculadora2/


// ? se recogen los elementos que funcionan como pantalla
const displayValorAnterior = document.getElementById( "valor-anterior");
const displayValorActual = document.getElementById("valor-actual");

// ? se recogen todos los elementos con la clase key en el DOM
const keys = document.querySelectorAll('.key');

// ? number1 almacena el primer valor insertado por el usuario
let number1;

// ? operator almacena el operador matematico que se quiere ejecutar
let operator;

// ? isThereResult se encarga de verificar si existe un resultado de un calculo anterior
let isThereResult = false

// ? isOperating se encarga de verificar si el usuario activo una operacion matematica
let isOperating = false

/**
 * esta funcion se encarga de devolver a sus valores por defecto a todas las variables 
 * globales y limpia cualquier dato en la pantalla de la app
 */
const clearScreen = ()=> {
    displayValorActual.textContent = ""
    displayValorAnterior.textContent = ""
    number1 = ""
    isOperating = false
    isThereResult = false
}

/**
 * Recive el numero que se va a mostrar en pantalla en la calculadora por defecto el valor de este 
 * parametro es un string vacio "", asi cuando se ejecute sin pasar dicho parametro no rompa la app
 * pese a estar trabajando con numeros el tipo de dato se maneja como string
 * ya que en el dom todo son string 
 * @param {string} number Numero que se pretende mostrar por pantalla en la calculadora
 */
const showNumberInScreen = (number = "")=> {

    if(isOperating) {
        displayValorActual.textContent = ""
        displayValorAnterior.textContent = number1 + operator
        isOperating = false
        return
    }

     if(!isThereResult){
        displayValorActual.textContent += number
     }else {
        displayValorActual.textContent = number
        isThereResult = false
     }
     
    
}

/**
 * Solo toma el valor actual en la pantalla y lo guarda en la variable 
 * global 'number1' para que este disponible para todas las funciones
 */
const saveFirstValue = ()=> {
    number1 = displayValorActual.textContent
  
}

/**
 * Se encarga de realizar las operaciones matematicas segun el operador 
 * que se encuentre en la variable global 'operator', el primer valor para 
 * operar sera number1 y el segundo valor sera el numero que se encuentre en pantalla
 * en el instante que se ejecuta la funcion
 */
const getResult = ()=> {
    let number2 = displayValorActual.textContent
    switch (operator) {
        case "+":
            displayValorActual.textContent = Number(number1) + Number(number2)
            isThereResult = true
            break;
        case "-":
            displayValorActual.textContent = Number(number1) - Number(number2)
            isThereResult = true
            break
        case "×":
            displayValorActual.textContent = Number(number1) * Number(number2)
            isThereResult = true
            break
        case "%":
            displayValorActual.textContent = Number(number1) / Number(number2)
            isThereResult = true
            break
        default:
            break;
    }
}

/**
 * Esta funcion se encarga de verificar que operacion esta siendo solicitada
 * por el usuario, mediante el parametro se recive el valor que fue precionado
 * dicho valor es evaluado y segun la condicion ejecutara una funcion diferente 
 * acorde a lo que quiere el usuario
 * @param {string} key el boton de la calculadora que se presiono
 * @returns void
 */
const makeOperation = (key)=> {
    
    switch (key) {
        case "c":
            clearScreen()
            return
        case ".":
            showNumberInScreen(".")
            return
        case "⇐":
            if(!isThereResult){
                displayValorActual.textContent = displayValorActual.textContent.substring(0,  displayValorActual.textContent.length - 1)
                console.log(displayValorActual.textContent)
                return
            }else{
                displayValorActual.textContent = ""
                return
            }
        default:
            getResult()
            break
    }
    
}

/**
 * Esta funcion se encarga de recivir el boton precionado por el usuario y 
 * evaluarlo en funcion de detectar si se trata de un numero, una operacion matematica u 
 * otra operacion, en cada caso se ejecutara la funcion correspondiente
 * en caso de que el 'key' no exista o sea null la funcion solo hara el return sin devolver ni ejecutar 
 * nada
 * @param {string} key el boton precionado por el usuario
 * @returns void
 */
const getKey = (key)=> {
    
    if(!key) return;

    if (Number(key) || Number(key) === 0) {
        showNumberInScreen(key)
    } else if (key === "+" || key === "-" || key === "×" || key === "%"){
        operator = key
        isOperating = true
        saveFirstValue()
        showNumberInScreen()
    } else {
        makeOperation(key)
    }
}

/**
 * Esta funcion se encarga de establecer los eventos a cada boton
 * cabe destacar que esta no es la mejor manera de hacer esto en aplicaciones 
 * muy grandes, no se recomienda hacer esto por temas de rendimiento y escalavilidad
 * la funcion itera sobre el array 'keys' que contiene a cada elemento con la clase
 * 'key' en el DOM y le asigna el evento 'click a cada uno'
 * 
 * el evento click dispara la funcion 'getKey' cuando uno de estos elementos el clikado
 * y le pasa por parametro el valor contenido en el elemento
 */
function setEventListeners(){
    keys.forEach(key => key.addEventListener('click', () => getKey(key.textContent)))
}

setEventListeners()
