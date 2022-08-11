const state = {
    gameElement: document.querySelector('.game'),
    cells: Array(9).fill(null),

    symbol: ['o' , 'x'],

    winningCombination:[
        [0, 1, 2],
        [3 ,4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    gameFinished: false
}




function drawBoard() {   

    state.gameElement.innerHTML = ''

    for(let i = 0; i < 9; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell')


        if(state.cells[i] ){

            const cellSymbol = document.createElement('p')
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add('symbol')
            cell.append(cellSymbol)
            
        } else {

            cell.addEventListener('click', function () {

                if(state.gameFinished){
                    return
                }

                state.symbol.reverse()
                state.cells[i] = state.symbol[0]
    
                drawBoard()

                if(checkForWinner()){

                    state.gameFinished = true
                    drawMessage(`Congrats ${state.symbol[0]} You Won!!`)

                }

                if(checkForDraw()){
                    state.gameFinished = true
                    drawMessage('It is a TIE!!')
                }
    
            })
            

        }
        state.gameElement.append(cell)
        
    }

}

function drawMessage(message) {
    const banner = document.createElement('div')
    banner.classList.add('banner')

    const h1 = document.createElement('h1')
    h1.innerText = message
    h1.classList.add('h1')

    banner.append(h1)

    state.gameElement.append(banner)
}


function checkForDraw(){
    return state.cells.every(cell => cell !== null)
}

function checkForWinner(){
    return state.winningCombination.some(function (combo){
        const cells = combo.map(function(index) {
            return state.cells[index]
        })

        return !(cells.includes(null)) && new Set(cells).size === 1
    })
}


drawBoard()



