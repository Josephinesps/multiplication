/* Function to run whichever loop we picked */
var questions = parseInt(localStorage.getItem("questions"));
var max = parseInt(localStorage.getItem("max"));
var min = parseInt(localStorage.getItem("min"));
var errors = [];
var questionNum = 1;
var x = 0;
var y = 0;
var product = 0;

function startLoop(){
    var interface = document.getElementById("interface");
    var oldButton = document.getElementById("beginQuiz");
    oldButton.remove();

    // Question Box aka "Question 1 of 2"
    const questionBox = document.createElement("div");
    questionBox.setAttribute('id','questionBox');
    interface.appendChild(questionBox);

    // Displaying the question
    const questDisplay = document.createElement("div");
    questDisplay.setAttribute('id','display');
    interface.appendChild(questDisplay);

    // Answer Box
    const answerBox = document.createElement("input");
    answerBox.setAttribute('id','answer');
    interface.appendChild(answerBox); 

    // Displaying the button
    let submitButton = document.createElement("button");
    submitButton.setAttribute('id','submit');
    submitButton.setAttribute('onClick','checkAnswer()');
    submitButton.innerText = "Submit Answer";
    interface.appendChild(submitButton);
    askQuestion();

    //Response div
    let responseBox = document.createElement("div");
    responseBox.setAttribute('id','responseBox');
    interface.appendChild(responseBox);
}//Closes uiLoop();

function askQuestion(){ //asking the question, aka 3x6;
    let questionBox = document.getElementById("questionBox"); 
    let questDisplay = document.getElementById("display");
    questionBox.innerText = "Question "+questionNum+" of "+questions;
    x = Math.floor(Math.random() * (max - min + 1)) + min;
    y = Math.floor(Math.random() * (max - min + 1)) + min;
    let questionText = x + " X " + y +" = ?";
    questDisplay.innerHTML= questionText;
}//closes askQuestion();

function checkAnswer(){ //This function checks the answer and evaluates the value of the input of answerBox, here for the submitButton execution;
    //alert("Working");
    let userAnswer = document.getElementById("answer");
    let answer = parseInt(userAnswer.value);
    let questionBox = document.getElementById("questionBox");
    let correct = null;
    let wrong = null;
    let responseBox = document.getElementById("responseBox");
    let response = "";
    let error = null;
    product = (x * y);
    if(answer == product){
        questionNum++;
        correct = "Correct, "+x+" X "+y+" equals "+product;
        response = correct;
        responseBox.innerHTML = response;
    }
    else{
        error = [x,y];
        error.splice(0,1);
        errors.push(error);
        alert(errors);
        questionNum++;
        wrong = "Incorrect!, "+x+" X "+y+" equals "+product;
        response = wrong;
        responseBox.innerHTML = response;
        }

    if (questionNum <= questions){
        askQuestion();
    }
    else{
        interface.setAttribute("class",null);
        interface.innerHTML = " ";
        localStorage.setItem('errors',errors);
        stats();
    }
}//Closes checkAnswer();


function stats() {
    let highFactor = [0, 0];
    // sample errors array data
    let errorDist = []
    // fill errorDist with zeros
    for (let i = 0; i <= max; i++) {
        errorDist[i] = 0;
    }
    // add error factors to dist
    for (i = 0; i < errors.length; i++) {
        errorDist[errors[i][0]]++;
        errorDist[errors[i][1]]++;
    }
    // find greatest number
    for (let i = max; i > 0; i--) {
        if (errorDist[i] > highFactor[1]) {
            highFactor = [i, errorDist[i]];
        }
    }
  //The string that displays the string of the tables (7*[1...max] = product);
    let errorString = ""; //Errors String to display the times table
    for (let i = 0; i < errors.length; i++) {
        errorString += errors[i][0] + " * " + errors[i][1] + " = " + (errors[i][0] * errors[i][1]) + " (" + errors[i][2] + ")\n";
    }

    //The wrong question string
    let wrongQuestion = document.createElement("p");
    wrongQuestion.innerText = "You got "+errors.length+" of "+questions+" wrong.";
    document.body.appendChild(wrongQuestion);
    if (highFactor[0] > 0) {
        localStorage.setItem("problemFactor", highFactor[0]);
    //The biggest problem string
        let biggestIssue = document.createElement("p");
        biggestIssue.setAttribute("margin-top", "25px");
        biggestIssue.innerText = "Your biggest problem factor was " + highFactor[0] + ".";
        interface.appendChild(biggestIssue);
    } 
    else{
      localStorage.setItem("problemFactor", null);
    } 

  //The retry button asking the user to retry the quiz.
    let retry = document.createElement("button");
    retry.innerText = "Try again";
    retry.id = "tryAgain";
    retry.setAttribute("onclick", "retry()");
    interface.appendChild(retry);

  //The tables button directing the player to go to the times tables
    let tables = document.createElement("button");
    tables.setAttribute("id","tablesButton");
    tables.innerText = "View multiplication tables";
    tables.setAttribute("onclick", "toTables()");
    interface.appendChild(tables);
}
  //Going to Tables.HTML

function toTables() {
    document.location = "tables.html";
}

function retry(){
    document.location = 'setup.html';
}