function updateView(){
    let numbersHtml = '';
    for(let i = 0; i < numbers.length; i++){
        let number = numbers[i];
        numbersHtml += `
            <button 
                class="${selectedIndex==i?'selected':''}" 
                onclick="selectNumber(${i})"
            >
                Velg ${number}
            </button>
        `;
    }
    document.getElementById('app').innerHTML = `
        <h2>Fibonacci-app</h2>
        <button onclick="addNextNumber()">Neste tall</button>
        Du har valgt: ${selectedIndex == null ? '<i>ingenting</i>' : numbers[selectedIndex]}
        <ul>
        ${numbersHtml}
        </ul>
    
    `;
}