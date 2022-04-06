// Stats Function: Counts the errors and says "You got [errors] out of 10 wrong."
function stats() {
    let highFactor = [min,0];
    // sample errors array data
    let errors = []
    // fill errorDist with zeros
    for (let i = 0; i <= max; i++){
        errorDist[i]=0;
    }
    // add error factors to dist
    for (i = 0; i < errors.length; i++){
        errorDist[errors[i][0]]++;
        errorDist[errors[i][1]]++;
    }
    // find greatest number
    for (let i = max; i > 0; i--){
        if (errorDist[i] > highFactor[1]) {
            highFactor = [i,errorDist[i]];
        }
    }
    alert("You got "+ errors.length + " out of " + questions + " questions wrong.");
    alert("Your biggest problem factor was "+ highFactor[0]);
    tables(highFactor[0]);
}