/*------ constants ------*/

/*------ state variables ------*/
const game = {
  //? game constants
  difficulty: 0 /* determine level difficult, grid size and number of mines */,
  grid: [],
  rows: 5,
  columns: 5,
  boxesClicked: 0 /* determine game progress -> climb to grid size */,
  gameOver: false /* determine game start and end status */,
  //? mine constant
  mineLocation: [] /* save randomised mine locations here -> save as 2d array*/,
  mineRemaining: 0 /* determine game progress -> reduce to 0 */,
  //? flag constants
  flagStatus: false /* determine if player is placing flags or opening tiles */,
};

/*------ cached UI elements ------*/
const flag = document.getElementById("flag");

/*------ event listeners ------*/

/*------ game logic functions ------*/

function randomMines() {
  game.mineLocation.push("1.1");
  game.mineLocation.push("1.5");
  game.mineLocation.push("3.5");
  game.mineLocation.push("5.1");
}

/*------ render functions ------*/

//? Create boxes in grid
function createBoxes() {
  for (let y = 1; y < game.rows + 1; y++) {
    let rows = [];
    for (let x = 1; x < game.columns + 1; x++) {
      let box = document.createElement("div");
      box.id = y.toString() + "." + x.toString();
      //Render boxes on UI
      document.getElementById("grid").append(box);
      //Include event listener to each box created
      box.addEventListener("click", clickBox);
      rows.push(box);
    }
    //Saves box ID's in game constant
    game.grid.push(rows);
  }
}
/*--------click functions--------*/
function clickBox(event) {
  // to identify specific box being clicked
  let box = event.target;
  let boxPosition = box.id.split("."); //received as string, must convert to integers for manipulation later
  let boxArrY = parseInt(boxPosition[0]);
  let boxArrX = parseInt(boxPosition[1]);
  if (game.flagStatus === true) {
    // removed if statements for flag Status true into seperate function for clarity
    flagTrueClicks(box);
  } else {
    if (game.flagStatus === false) {
      if (flagFalseClicksMines(box)) {
        //acquire position of box's Y and X values in array index form for checking purposes later
        flagFalseClicksNonMines(boxArrY, boxArrX);
      }
    }
  }
}

//? function checks 8 boxes surrounding clicked box
function flagFalseClicksNonMines(boxArrY, boxArrX) {
  //include if limitation to stop function when box out of grid to reduce strain
  if (
    boxArrY < 1 ||
    boxArrX < 1 ||
    boxArrY > game.rows ||
    boxArrX > game.columns
  ) {
    return;
  }
  //include clicked class to reduce strain
  if (game.grid[boxArrY - 1][boxArrX - 1].classList.contains("clicked")) {
    return;
  } else {
    game.grid[boxArrY - 1][boxArrX - 1].classList.add("clicked"); //prevent maximum call stack size by using "clicked" class
    let totalMinesFound = 0;
    //------//
    totalMinesFound += checkBox(boxArrY - 1, boxArrX - 1); //Check top left box
    totalMinesFound += checkBox(boxArrY - 1, boxArrX); //Check top middle box
    totalMinesFound += checkBox(boxArrY - 1, boxArrX + 1); //Check top right box
    //------//
    totalMinesFound += checkBox(boxArrY, boxArrX - 1); //Check left box
    totalMinesFound += checkBox(boxArrY, boxArrX + 1); //Check right box
    //------//
    totalMinesFound += checkBox(boxArrY + 1, boxArrX - 1); //Check bottom left box
    totalMinesFound += checkBox(boxArrY + 1, boxArrX); //Check bottom middle box
    totalMinesFound += checkBox(boxArrY + 1, boxArrX + 1); //Check bottom right box
    //------//
    if (totalMinesFound > 0) {
      game.grid[boxArrY - 1][boxArrX - 1].innerText = totalMinesFound; //show number of surrounding mines
      game.grid[boxArrY - 1][boxArrX - 1].classList.add(
        `num${totalMinesFound}`
      ); //add class for CSS styling purposes
    } else {
      console.log("it's flooding time", boxArrY, boxArrX);

      //? when flooding, if tile is 0, assumes player clicks surrounding squares as well
      flagFalseClicksNonMines(boxArrY - 1, boxArrX - 1); //"click" top left box
      flagFalseClicksNonMines(boxArrY - 1, boxArrX); //"click" top box
      flagFalseClicksNonMines(boxArrY - 1, boxArrX + 1); //"click" top right box

      flagFalseClicksNonMines(boxArrY, boxArrX - 1); //"click" left box
      flagFalseClicksNonMines(boxArrY, boxArrX + 1); //"click" right right box

      flagFalseClicksNonMines(boxArrY + 1, boxArrX - 1); //"click" bottom left box
      flagFalseClicksNonMines(boxArrY + 1, boxArrX); //"click" bottom box
      flagFalseClicksNonMines(boxArrY + 1, boxArrX + 1); //"click" bottom right box
      console.log("fully flooded", boxArrY, boxArrX);
    }
  }
}

//? pass box coordinates to this function to be checked
function checkBox(y, x) {
  if (y < 1 || x < 1 || y > game.rows || x > game.columns) {
    return 0;
  }
  // if (game.grid[y - 1][x - 1].classList.contains("clicked")) {
  //  return 0;
  //} else {
  if (game.mineLocation.includes(y.toString() + "." + x.toString())) {
    return 1;
  }
  return 0;
}
//}

//? function checks for mines on the clicked box and initiates gameover status
function flagFalseClicksMines(box) {
  if (game.mineLocation.includes(box.id)) {
    alert("GAME OVER");
    game.gameOver = true;
    showMines();
    return false;
  }
  return true;
}
//? Function to reveal mines when game ends
function showMines() {
  for (let y = 1; y < game.rows + 1; y++) {
    for (let x = 1; x < game.columns + 1; x++) {
      //search through grid[] with all existing saved mine locations and reveal them
      let mineFound = game.grid[y - 1][x - 1];
      if (game.mineLocation.includes(mineFound.id)) {
        mineFound.innerText = "💣";
        mineFound.style.backgroundColor = "red";
      }
    }
  }
}
//? Places and removes flags when flag button is toggled on
function flagTrueClicks(box) {
  if (box.innerText === "") {
    box.innerText = "🚩";
  } else if (box.innerText === "🚩") {
    box.innerText = "";
  }
  return;
}

/*----flag button functions-----*/
//? Place event listener on flag button
function flagListener() {
  flag.addEventListener("click", clickFlag);
}
//? Program flag button to toggle flag status in game constant
function clickFlag() {
  if (game.flagStatus === false) {
    game.flagStatus = true;
    flag.style.backgroundColor = "gray";
  } else {
    game.flagStatus = false;
    flag.style.backgroundColor = "lightgray";
  }
}
function activateButtonListeners() {
  flagListener();
}

/*------ main function ------*/
function main() {
  createBoxes();
  activateButtonListeners();
  randomMines();
}

/*------ execute main function ------*/
main();
