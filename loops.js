/* Function to run whichever loop we picked */
var questions = parseInt(localStorage.getItem("questions"));
var max = parseInt(localStorage.getItem("max"));
var min = parseInt(localStorage.getItem("min"));
var errors = [];
var questionNum = 1;
var x = Math.floor(Math.random() * (max - min + 1)) + min;
var y = Math.floor(Math.random() * (max - min + 1)) + min;


function startLoop(){
    // alert(questions+"-"+max+"-"+min);
    // forLoop();
    uiLoop();
}

function uiLoop(){
    let question = 1;
    //find our div  
    let interface = document.getElementById("interface");
    // remove button 
    var oldButton = document.getElementById("beginQuiz");
    oldButton.remove();
    // create questionbox
    const questionBox = document.createElement("div");
    questionBox.innerText = "Question "+question+" of "+questions;
    interface.appendChild(questionBox);
    // Ask the question 
    const equation = document.createElement("div");
    equation.innerText = y+ " x " +x+ "?";
    interface.appendChild(equation);
    // answer box
    const userAnswer = document.createElement("input");
    userAnswer.innerText = "Submit Answer";
    interface.appendChild(userAnswer);
    // display the button 
     const inputBox = document.createElement("div");
     inputBox.setAttribute('id','buttonBox');
     let button2 = document.createElement("button");
     button2.innerText = "submit answer"; 
     button2.setAttribute("onclick","getAnswer()");
     inputBox.appendChild(button2);   
     interface.appendChild(inputBox);

}

function getAnswer() {
    if (interface.value != x * y) {
        alert("Incorrect, " +x+ " x " +y+ " = "+(x * y));
        errors.push((x,y));
    }
    questionNum++;
    if (questionNum <= questions) alert(uiLoops());
    else interface.innerHTML = "";
}

function forLoop(){
    for (let question = 1; question <= questions; question++) {
        let error = askQuestion();
        if (error[0] > 0) {
            error.splice(0,1);
            errors.push(error);
            alert(errors.join("\n"));
        }
    }
}

function askQuestion(){
    let error = [0,0,0];
    let product = x * y;
    let answer = prompt(x + " X " + y +" = ?");
    if (answer == product) alert("Correct!");
    else {
        alert("Incorrect! " + x + " X " + y + " = " + product);
        error = [1, x, y];
    }
    return error;
}
