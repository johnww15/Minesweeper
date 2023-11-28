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
  game.mineLocation.push("2.2");
  game.mineLocation.push("2.3");
  game.mineLocation.push("2.4");
  game.mineLocation.push("3.2");
  game.mineLocation.push("3.4");
  game.mineLocation.push("4.2");
  game.mineLocation.push("4.3");
  game.mineLocation.push("4.4");
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
  if (game.flagStatus === true) {
    // removed if statements for flag Status true into seperate function for clarity
    flagTrueClicks(box);
  } else {
    if (game.flagStatus === false) {
      flagFalseClicksMines(box);
      flagFalseClicksNonMines(box);
    }
  }
}

function flagFalseClicksNonMines(box) {
  //acquire position of box's Y and X values in array index form for checking purposes later
  let boxPosition = box.id.split("."); //received as string, must convert to integers for manipulation later
  let boxArrY = parseInt(boxPosition[0]);
  let boxArrX = parseInt(boxPosition[1]);
  let totalMinesFound = 0;
  console.log(totalMinesFound, boxPosition, boxArrY, boxArrX);

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

  box.innerText = totalMinesFound.toString();
} //include check boxes function

//pass box coordinates to this function to be checked
function checkBox(y, x) {
  if (y < 1 || x < 1 || y > game.rows || x > game.columns) {
    console.log("checked 0");
    return 0;
  } else {
    if (game.mineLocation.includes(y.toString() + "." + x.toString())) {
      console.log("checked 1");
      return 1;
    }
  }
  return 0;
}

function flagFalseClicksMines(box) {
  if (game.mineLocation.includes(box.id)) {
    box.innerText = "💣";
    alert("GAME OVER");
    game.gameOver = true;
    showMines(box);
  }
  return;
}
//? Function to reveal mines when game ends
function showMines(box) {
  for (let y = 1; y < game.rows + 1; y++) {
    for (let x = 1; x < game.columns + 1; x++) {
      //search through grid[] with all existing saved mine locations and reveal them
      let mineFound = game.grid[y - 1][x - 1];
      if (game.mineLocation.includes(box.id)) {
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
