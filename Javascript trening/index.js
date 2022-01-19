// index.js //

//FUNCTION

/*
function sayHello(myName, age){
    console.log("Hello",myName);
    console.log("You are",age,"years old");
    return
}

var myName ="Tommy";

sayHello("Tommy",28)
*/

function toCelsius(f){
    return (f-32) * (5/9);
};

function toFarenheit(c){
    return (c * 9/5) + 32;
}

var myTemp = toFarenheit(90);

console.log("My temp in C is",myTemp,"degrees")