/*------ constants ------*/
/*------ state variables ------*/
const game = {
  //? game constants
  difficulty: "" /* determine level difficult, grid size and number of mines */,
  grid: [],
  rows: 0,
  columns: 0,
  boxesClicked: 0 /* determine game progress -> climb to grid size */,
  gameOver: false /* determine game start and end status */,
  //? mine constant
  mineLocation: [] /* save randomised mine locations here -> save as 2d array*/,
  mineRemaining: 0 /* determine game progress -> reduce to 0 */,
  //? flag constants
  flagStatus: false /* determine if player is placing flags or opening tiles */,
  flagCounter: 0,
};
/*------ cached UI elements ------*/
const flag = document.getElementById("flag");
const beginner = document.getElementById("beginnerButton");
const intermediate = document.getElementById("intermediateButton");
const expert = document.getElementById("expertButton");
const random = document.getElementById("randomButton");
const grid = document.getElementById("grid");
const flagcounter = document.getElementById("mineCounter");
const selectdifficulty = document.getElementById("selectDifficulty");
/*------ event listeners ------*/
//? Place event listener on flag button
function flagListener() {
  flag.addEventListener("click", clickFlag);
}
//? Place event listeners on each difficulty level button
function beginnerListener() {
  beginner.addEventListener("click", clickBeginner);
}
function intermediateListener() {
  intermediate.addEventListener("click", clickIntermediate);
}
function expertListener() {
  expert.addEventListener("click", clickExpert);
}
function randomListener() {
  random.addEventListener("click", clickRandom);
}
/*------ difficulty button functions ------*/
//? Create reset function to allow resetting of the grid whenever difficulty buttons are clicked
function resetBox() {
  grid.innerHTML = "";
  game.grid = [];
  game.mineLocation = [];
  game.boxesClicked = 0;
}
//? Create the event function which triggers whenever difficulty level buttons are clicked
function clickBeginner() {
  resetBox();
  game.gameOver = false;
  game.rows = 10;
  game.columns = 10;
  game.mineRemaining = 10;
  game.difficulty = "Beginner";
  flagcounter.innerText = game.mineRemaining;
  game.flagCounter = game.mineRemaining;
  grid.style.height = "500px";
  grid.style.width = "500px";
  startGame();
}
function clickIntermediate() {
  resetBox();
  game.gameOver = false;
  game.rows = 15;
  game.columns = 15;
  game.mineRemaining = 40;
  game.difficulty = "Intermediate";
  flagcounter.innerText = game.mineRemaining;
  game.flagCounter = game.mineRemaining;
  grid.style.height = "750px";
  grid.style.width = "750px";
  startGame();
}
function clickExpert() {
  resetBox();
  game.gameOver = false;
  game.rows = 20;
  game.columns = 20;
  game.mineRemaining = 80;
  game.difficulty = "Expert";
  flagcounter.innerText = game.mineRemaining;
  game.flagCounter = game.mineRemaining;
  grid.style.height = "1000px";
  grid.style.width = "1000px";
  startGame();
}
function clickRandom() {
  resetBox();
  game.gameOver = false;
  game.rows = randomRowsAndColumns();
  game.columns = randomRowsAndColumns();
  game.mineRemaining = randomDifficultyLimiter(game.rows, game.columns);
  game.difficulty = "Random";
  flagcounter.innerText = game.mineRemaining;
  game.flagCounter = game.mineRemaining;
  grid.style.height = `${game.rows * 50}px`;
  grid.style.width = `${game.columns * 50}px`;
  startGame();
}
//? Create simpler functions to trigger and calculate random integers for random difficulty level
function randomDifficultyLimiter(x, y) {
  let total = 0;
  let totalMines = 0;
  total = x * y;
  while (totalMines < 2 || totalMines === total) {
    totalMines = Math.floor(Math.random() * total);
  }
  return totalMines;
}
function randomRowsAndColumns() {
  let total = 0;
  while (total < 2) {
    total = Math.floor(Math.random() * 20);
  }
  return total;
}
/*----flag button functions-----*/
//? Places and removes flags when flag button is toggled on
function flagTrueClicks(box) {
  if (box.classList.contains("clicked")) {
    return;
  } //included to prevent number of flags placed to exceed number of mines
  if (game.flagCounter === 0 && box.innerText === "") {
    return;
  }
  if (box.innerText === "") {
    box.innerText = "🚩";
    flagcounter.innerText--;
    game.flagCounter--;
    box.classList.add("flag-clicked");
  } else if (box.innerText === "🚩") {
    box.innerText = "";
    flagcounter.innerText++;
    game.flagCounter++;
    box.classList.remove("flag-clicked");
  }
  return;
}
//? Program flag button to toggle flag status in game constant
function clickFlag() {
  if (game.flagStatus === false) {
    game.flagStatus = true;
    flag.innerText = "Placing Flags";
    flag.style.backgroundColor = "lightgray";
  } else {
    game.flagStatus = false;
    flag.innerText = "Not Placing flags";
    flag.style.backgroundColor = "gray";
  }
}

/*------ game logic (grid) functions ------*/
//? Create a randomiser to randomise the location of mines whenever game starts
function randomMines() {
  for (let i = 0; i < game.mineRemaining; i++) {
    let randomYInt = Math.floor(Math.random() * game.rows) + 1;
    let randomXInt = Math.floor(Math.random() * game.columns) + 1;
    let randomYX = randomYInt.toString() + "." + randomXInt.toString();
    if (game.mineLocation.includes(randomYX)) {
      i--;
    } else {
      game.mineLocation.push(randomYX);
    }
  }
}
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
/*--------game logic (click) functions--------*/
//? Main event function whenever boxes are clicked in the game
function clickBox(event) {
  // to identify specific box being clicked
  let box = event.target;
  let boxPosition = box.id.split("."); //received as string, must convert to integers for manipulation later
  let boxArrY = parseInt(boxPosition[0]);
  let boxArrX = parseInt(boxPosition[1]);
  //introduce if statement to prevent function from operating if box is clicked/game is over
  if (box.classList.contains("clicked")) {
    return;
  } else {
    if (game.gameOver === true) {
      return;
    }
  }
  if (game.flagStatus === true) {
    // removed if statements for flag Status true into seperate function for clarity
    flagTrueClicks(box);
  } else {
    if (game.flagStatus === false) {
      //prevent clicking on a pre-existing flag on the screen
      if (box.classList.contains("flag-clicked")) {
        return;
      }
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
  } else {
    //include clicked class to reduce strain
    if (game.grid[boxArrY - 1][boxArrX - 1].classList.contains("clicked")) {
      return;
    } else {
      //prevent overlapping of flags with flooding feature
      if (
        game.grid[boxArrY - 1][boxArrX - 1].classList.contains("flag-clicked")
      ) {
        return;
      } else {
        game.grid[boxArrY - 1][boxArrX - 1].classList.add("clicked"); //prevent maximum call stack size by using "clicked" class
        game.boxesClicked++;
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
          //? when flooding, if tile is 0, assumes player clicks surrounding squares as well
          flagFalseClicksNonMines(boxArrY - 1, boxArrX - 1); //"click" top left box
          flagFalseClicksNonMines(boxArrY - 1, boxArrX); //"click" top box
          flagFalseClicksNonMines(boxArrY - 1, boxArrX + 1); //"click" top right box

          flagFalseClicksNonMines(boxArrY, boxArrX - 1); //"click" left box
          flagFalseClicksNonMines(boxArrY, boxArrX + 1); //"click" right right box

          flagFalseClicksNonMines(boxArrY + 1, boxArrX - 1); //"click" bottom left box
          flagFalseClicksNonMines(boxArrY + 1, boxArrX); //"click" bottom box
          flagFalseClicksNonMines(boxArrY + 1, boxArrX + 1); //"click" bottom right box
        }
      }
      if (game.boxesClicked === game.rows * game.columns - game.mineRemaining) {
        game.gameOver = true;
        flagcounter.innerText = "You won! 🤗";
      }
    }
  }
}
//? pass box coordinates to this function to be checked
function checkBox(y, x) {
  if (y < 1 || x < 1 || y > game.rows || x > game.columns) {
    return 0;
  }
  if (game.mineLocation.includes(y.toString() + "." + x.toString())) {
    return 1;
  }
  return 0;
}
//? function checks for mines on the clicked box and initiates gameover status
function flagFalseClicksMines(box) {
  if (game.mineLocation.includes(box.id)) {
    game.gameOver = true;
    flagcounter.innerText = "You lost 🥺";
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
/*------ main function ------*/
//? Main function to consolidate all event listeners
function activateButtonListeners() {
  flagListener();
  beginnerListener();
  intermediateListener();
  expertListener();
  randomListener();
}
//? Function to trigger when browser is refreshed
function main() {
  activateButtonListeners();
}
//? Function to trigger game start
function startGame() {
  createBoxes();
  randomMines();
}
/*------ execute main function ------*/
main();
