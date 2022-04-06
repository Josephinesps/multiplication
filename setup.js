// Setup is where we change the values of globals
function getStats(){
    let questions = parseInt(document.getElementById("questions").value);
    let min = parseInt(document.getElementById("min").value);
    let max = parseInt(document.getElementById("max").value);
    localStorage.setItem("questions", questions);
    localStorage.setItem("max", max);
    localStorage.setItem("min", min);
    document.location='loops.html';
}