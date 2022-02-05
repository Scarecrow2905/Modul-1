function initModel() {
    numbers = [];
    updateView();
}

function addNextNumber() {
    if (!numbers) {
        numbers = [1];
        return;
    }
    if (numbers.length < 2) {
        numbers.push(1);
        return;
    }
    const lastIndex = numbers.length - 1;
    const secondLastIndex = lastIndex - 1;
    const lastNumber = numbers[lastIndex];
    const secondLastNumber = numbers[secondLastIndex];
    const nextNumber = lastNumber + secondLastNumber;
    numbers.push(nextNumber);
    updateView();
}

function selectNumber(index){
    selectedIndex = selectedIndex == index ? null : index;
    updateView();
}