
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'K', 'Q'];

let puntosJugador = 0, puntosComputadora = 0;

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

const crearDeck = () => {

    for(let i = 2; i <=10; i++ ){
        for (const tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for(let tipo of tipos) {
        for(let especial of especiales) {
            deck.push(especial + tipo)
        }
    }

    deck = _.shuffle( deck );
    return deck;
};
crearDeck();

const pedirCarta = () => {

    if( deck.length === 0) throw 'No hay cartas en el deck';
    const carta = deck.pop()
    return carta
}

pedirCarta();

const valorCarta = ( carta ) =>  {
    let valor = carta.substring( 0, carta.length-1 );
    
    return (
        isNaN( valor ) 
            ? ( valor === 'A' ) ? 11 : 10 
            : valor * 1
    )
}

const turnoComputadora = ( puntosMinimos ) => {
    do {

        const carta =  pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.className = 'carta';
        divCartasComputadora.append(imgCarta);

        if( puntosMinimos > 21 ){
            break;
        }

    } while( puntosComputadora < puntosMinimos  && puntosMinimos <= 21);

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ){
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ){
            alert('Computadora gana');
        } else if( puntosComputadora > 21 ){
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana'); 
        }
    }, 10)
}

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasComputadora = '';
    divCartasJugador = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
})

btnPedir.addEventListener('click', () => {
    const carta =  pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.className = 'carta';
    divCartasJugador.append(imgCarta)
    
    if( puntosJugador > 21 ) {
         console.warn('Lo siento mucho, perdiste');
         btnPedir.disabled = true;
         btnDetener.disabled = true;
         turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21 ) {
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    turnoComputadora( puntosJugador )
})