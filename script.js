const displayValorAnterior = document.getElementById( "valor-anterior");
const displayValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll (".numero");
const botonesOperadores = document.querySelectorAll (".operador")

const showNumberInScreen = (number) => {
    displayValorAnterior.textContent = displayValorAnterior.textContent + number;


}

const sumNumberInScreen = (value1, value2) => {

    // TODO: devolver resultado
    return result
}

const operations = ()=> {
    botonesOperadores.forEach(button => {
        button.addEventListener('click', (e)=> {
            makeOperation(operation)
        })
    })


}

const numero = ()=> {
    botonesNumeros.forEach(button => {
        button.addEventListener('click', (e)=> {
            showNumberInScreen(Number(button.textContent))
        })
    })
}

numero()

