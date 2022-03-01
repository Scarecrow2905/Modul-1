document.addEventListener('DOMContentLoaded', () => { // All kode vil bli kjørt mellom disse parantesene, sånn at HTML blir kjørt FØR Scripten. 
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let flags = 0
    let squares = []
    let isGameOver = false

    // Create Board
    function createBoard() {
        // Shuffle't spill array med random bomber
        const bombsArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray) // Her blir de to array'ene samkjørt. Empty og med Bombs
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5) //(Sort() Sorterer et Array) Dette setter bomber randomly
        //console.log(shuffledArray)

        for(let i =0; i < width*width; i++) {
            const square = document.createElement('div')  // Lager Div'er
            square.setAttribute('id', i)  // I = 0 - 99  // Hver gang en div blir laget så gir dette dem en unik ID
            square.classList.add(shuffledArray[i])      // I bunn og grunn til nå så blir "bomb" og "valid" randomisert og gitt klasser med sine respective navn
            grid.appendChild(square)                   // Append et item til en list. Passer sqaure gjennom som en parameter  
            squares.push(square)
            
            // Normal klikk
            square.addEventListener('click', function(e) {
                click(square)
            })

            // CTRL og HØYRE KLIKK
            square.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(square)
            }
        }
        // *** NUMMER ***
        //Legg til nummer
        for(let i = 0; i < squares.length; i++) {
            const isLeftEdge = (i % width === 0) // Dette skal hindre it at den sier ifra om at det er en bombe på andre siden
            const isRightEdge = (i % width === width -1) // % = Modulus(Remainder)

            if (squares[i].classList.contains('valid')) {
                let total = 0
                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++ // Left of square
                if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++ // Top right of square
                if (i > 10 && squares[i - width].classList.contains('bomb')) total ++ // Above square
                if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++ // Top left of square
                if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++ // Right of square
                if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++ // Down-left of square
                if (i < 88 && !isRightEdge && squares[i + 1 +width].classList.contains('bomb')) total ++ // Down-right of square
                if (i < 89 && squares[i +width].classList.contains('bomb')) total ++ // Below square
                squares[i].setAttribute('data', total) // Gir div class="valid" en Data attribute som er lik antall bomber som er rundt
                console.log(squares[i])
            }
        }
    }
    createBoard()
    // *** FLAGG ***
    // Legg til Flagg med høyre-klikk
    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = '🚩'
                flags ++
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flags --
            }
        }
    }

    // *** KLIKK ***
    // Klikk på firkant
    function click(square) {
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            gameOver(square)
       } else {
           let total = square.getAttribute('data')
           if (total !=0) {
               square.classList.add('checked')
               square.innerHTML = total // Viser fram på square som er klikket mengden data="" altså antall bomber rundt
               return
           }
           checkSquare(square, currentId)
        }
        square.classList.add('checked') // Dette ordner at man kan klikke på squares som ikke har en bombe rundt seg
    }

    // *** SJEKK FIRKANT ***
    // Her kommer Recursion inn i bildet
    // Sjekk nabo squares når square er clicked. Her kommer Recursion inn i bildet. En funksjon som kjører om igjen til syklusen er gjort
    // Dette funker litt på samme måte som Clicken bare at det gjør seg selv så lenge det er åpne plasser uten bomber
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width -1)

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1].id // ParseInt blir brukt her for å passe på at det er et Number og ikke en String
                const newSquare = document.getElementById(newId) // Her hentes Id'en til square som er vedsiden til Venstre
                click(newSquare) // Her blir disse nye Id'ene sent tilbake til click funksjonen
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId- width)].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id 
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

        }, 10) // 10 milsekunder er veldig viktig da det setter en liten "Cooldown" i koden
    }

    // Game Over *****HER******

    function gameOver(square) {
        console.log('Bang! Game Over!')
        isGameOver = true

        // Vis ALLE bombene
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣'
            }
        })
    }



})


// En liten illustrasjon på hvordan funksjonene jobber:

/* click()                       <----           checkSquare()
   is Game over? Return
   is checked? Return
   has flag? return
   is over 0? 'add number' return
   anything else 'checked' --------------------------^^^^^^
*/