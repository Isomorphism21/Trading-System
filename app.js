document.addEventListener("DOMContentLoaded", getApi)

const criptoMonedas = document.querySelector(`#criptoMoneda`)
const vercartera = document.querySelector(`#ver-cartera`)
const criptoNacional = document.querySelector(`#monedaNacional`)
const boton = document.querySelector(`#btn-ejecutar`)
const inputNumber = document.querySelector(`#numerico`)
const inputVender = document.querySelector(`#criptoMoneda2`)


let division
let resultadoVenta

const parametros = {
    cripto : "",
    fisica : "",
    number : 0,
    venta : ""
    
}

const wallet = {
    BTC : 0,
    ETH : 0,
    IPX : 0,
    USDT : 0,
    BNB : 0,
    XRP : 0,
    USDC : 0,
    ADA : 0,
    ARB : 0,
    SOL : 0
}

inputVender.addEventListener(`change`, venderTodo)
function venderTodo(e){
    limpiar(`containerVentas`)
    const button = document.createElement(`div`)
    button.classList.add(`btn-vender`)
    button.innerHTML = `
    <button onclick="venderCriptos(wallet, parametros)">Vender</button>`
    document.querySelector(`.containerVentas`).appendChild(button)
    parametros.venta = e.target.value
    
}

function venderCriptos(wallet, parametros){
    const {venta} = parametros
    if (venta == "BTC"){
        wallet.BTC = 0
        alert(`vendiste tus BTC`)
    }
    else if(venta == "ETH"){
        wallet.ETH = 0
        alert(`vendiste tus ETH`)
    }
    else if(venta == "IPX"){
        wallet.IPX = 0
        alert(`vendiste tus IPX`)
    }
    else if(venta == "USDT"){
        wallet.USDT = 0
        alert(`vendiste tus USDT`)
    }
    else if(venta == "BNB"){
        wallet.BNB = 0
        alert(`vendiste tus BNB`)
    }
    else if(venta == "XRP"){
        wallet.XRP = 0
        alert(`vendiste tus XRP`)
    }
    else if(venta == "USDC"){
        wallet.USDC = 0
        alert(`vendiste tus USDC`)
    }
    else if(venta == "ADA"){
        wallet.ADA = 0
        alert(`vendiste tus ADA`)
    }
    else if(venta == "ARB"){
        wallet.ARB = 0
        alert(`vendiste tus ARB`)
    }
    else if(venta == "SOL"){
        wallet.SOL = 0
        alert(`vendiste tus SOL`)
    }
    
}

inputNumber.addEventListener(`keyup`, obtenerInput)
function obtenerInput(e){
    parametros.number = e.target.value
}
criptoMonedas.addEventListener(`change`, obtenerCripto)
function obtenerCripto(e){
    parametros.cripto = e.target.value
}
criptoNacional.addEventListener(`change`, obtenerFisica)
function obtenerFisica(e){
    parametros.fisica = e.target.value
}
boton.addEventListener(`click`, prueba)
function prueba(){
    getPrecios(parametros)
}

async function getPrecios(parametros){
    const {cripto, fisica} = parametros 
    const url2 = `https://min-api.cryptocompare.com/data/price?fsym=${cripto}&tsyms=${fisica}`
    try {
        const result = await fetch(url2)
        const datos = await result.json()
        getDivision(datos)
        console.log(datos);
        
    } catch (error) {
        console.log(error);
    }
} 

function getDivision(datos){
    const {fisica, number, cripto} = parametros
    division = (number / datos[fisica]).toFixed(5)
    document.querySelector(`#info`).innerHTML = `esta es la cantidad de ${cripto} que puedes comprar ${division}
    <button onclick="cartera('${cripto}')">Comprar</button>
    <button onclick="VerCartera(wallet)" id="btn-venta" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver Cartera</button>`
}

function cartera(cripto){
    if (cripto == "BTC" || cripto == "ETH" || cripto == "IPX" || cripto == "USDT" || cripto == "BNB" || cripto == "XRP" || cripto == "USDC" || cripto == "ADA" || cripto == "ARB" || cripto == "SOL"){
        wallet[cripto] = division
    }
    alert("Compra Exitosa")
}


async function getApi(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    try {
        const result = await fetch(url)
        const datos = await result.json()
        extractData(datos.Data)
        console.log(datos.Data);
    } catch (error) {
        console.log(error);
    }
}

function extractData(result){
    result.forEach(element => {
        const {CoinInfo} = element
        const option = document.createElement(`option`)
        option.value = `${CoinInfo.Name}`
        option.textContent = `${CoinInfo.Name}`
        document.querySelector(`#criptoMoneda`).appendChild(option)
    });
    result.forEach(element => {
        const {CoinInfo} = element
        const option2 = document.createElement(`option`)
        option2.value = `${CoinInfo.Name}`
        option2.textContent = `${CoinInfo.Name}`
        document.querySelector(`#criptoMoneda2`).appendChild(option2)
    });
}

function VerCartera(wallet){
    limpiar(`modalBody`)
    const {BTC, ETH, IPX, USDT, BNB, XRP, USDC, ADA, ARB, SOL } = wallet
    const criptos  = document.createElement(`p`)
    criptos.innerHTML = `
    <p>BTC: ${BTC}</p>
    <p>ETH: ${ETH}</p>
    <p>IPX: ${IPX}</p>
    <p>USDT: ${USDT}</p>
    <p>BNB: ${BNB}</p>
    <p>XRP: ${XRP}</p>
    <p>USDC: ${USDC}</p>
    <p>ADA: ${ADA}</p>
    <p>ARB: ${ARB}</p>
    <p>SOL: ${SOL}</p>
    `
    document.querySelector(`.modalBody`).appendChild(criptos)
}

function limpiar(a){
    const m = document.querySelector(`.${a}`)
    m.innerHTML = ``
}

