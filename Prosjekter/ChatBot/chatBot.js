// chatBot.js

/* 1

    Adding an event listener to the document for the condition of 
    DOMContentLoaded means your JS won't run until the HTML has loaded.
    This is almost always good practice. 
    Then the EventListener for keypress enter button. 
    Notice we must also select the #input for the form submission, 
    or else our event listener would respond every time we pressed the enter key!
*/

// 2 This will make the Enter button usable

/*
  3  There are some interesting and deprecated (express disapproval of.) alternatives here. 
    .keycode, .which, and keypress are all deprecated. 
    These are all just ways of telling the event listener that we only care about the enter key 
    - that's what makes the nice, dynamic effect of instant rendering 
    when we type a message and press enter! 
    No more tedious clicking of a 'submit' button while messaging our bot friend. 
    See more on the KeyboardEvent object, 
    but basically it seems like the most up-to-date, accessible, 
    and universal method for this event listener, if your browser supports it. 
    But you might still see something with a code of 13 to represent the enter key.
*/

    document.addEventListener("DOMContentLoaded", (e) => {
        console.log(e);
        if (e.code === "Enter") {
            let input = document.getElementById("input").value;
            document.getElementById("user").innerHTML = input;
            output(input);
            inputField.value = "";
            output(input);
            

        }
    });
//  console.log(`I typed '${input}'`)

/* 4 Notice we select .value and set it to a variable for input. 
    This is whatever we type into the form. 
    We can verify this with another console log!
*/

// Functions

function output(input) {
    let product;
    // Remove all characters except word characters, space, and digits
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text

    // 'tell me a story' -> 'tell me story'
    // 'i feel happy' -> 'happy'
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")            
        .replace(/please /g, "")
        .replace(/ please/g, "");

function compare(triggerArray, replyArray, text) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
     for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == text) {
       items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
                }
              }
            }
            return item;
          }
/* 5 these methods make everything in the input lowercase, 
    remove any rogue characters that would make matches difficult, 
    and replace certain things like whats up to what is up. 
    If the user says what is going on, whats going on, or what's going on, 
    they will all lead to the same valid bot response, 
    instead of having to account for these differences separately somehow.
*/

// *9* compare arrays
// then search keyword
//then random alternative

    if (compare(trigger, reply, text)) {
        product = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    //update DOM
    addchat(input, product);
}
/* 6 Some simple arrays of arrays that include possible triggers 
    (user text) and responses (bot text). 
    To start I'll keep them short, and defined in global variables:
*/
    const trigger = [
        //0
        ["hi", "hey", "hello"],
        //1
        ["how are you", "how are things"],
        //2
        ["what is going on", "what is up"],
        //3
        ["happy", "good", "well", "fantastic", "cool"],
        //4
        ["bad", "bored", "tired", "sad"],
        //5
        ["tell me a story", "tell me joke"],
        //6
        ["thanks", "thank you"],
        //7
        ["bye", "good bye", "goodbye"]
        ];

    const reply = [
        //0
        ["Hello!", "Hi", "Hey!", "Hi there!"],
        //1
        [
        "Fine... how are you?",
        "Pretty well. how are you?",
        "Fantastic, how are you?"
        ],
        //2
        [
        "Nothing much",
        "Exciting things!"
        ],
        //3
        ["Glad to hear it"],
        //4
        ["Why?", "Cheer up friend"],
        //5
        ["What about?", "Once upon a time..."]
        //6
        ["You're welcome", "No problem"],
        //7
        ["Goodbye", "See you later"],
        ];

    const alternative = [
        "Same",
        "Go on...",
        "Try again",
        "I'm listening...",
        "Bruh..."
        ];

/* 7 Notice the comments for index at each of the arrays, and how they line up. 
    If we get user input that matches an option at trigger[0], 
    such as 'hi', the bot will respond with an option from its reply[0], 
    such as 'Hello!' and so on.
*/