# Developing a Minesweeper Game

## Project Brief

**MVP**

- Built with HTML, CSS and Javascript (Using Vite Project)
- Deployed with Vercel
- Commits to Github daily
- A README.md file with explanations of the technologies used, approach taken, a link to live site, installation
- Game deployed using Vercel (https://minesweeper-topaz-mu.vercel.app/)

**Stretch Goals**

- Randomised game difficulty level
- Custom input level feature for playrers to input their own level of difficulty
- Styling to make the game more aesthetic
- Right click flag placing function

## Timeframe

- 1 Week

## Technologies & Tools used

- HTML
- CSS
- Javascript
- Git & Github
- Vercel

<br>

## Description

This emulates a classic Minesweeper game (https://minesweeperonline.com/) where the goal of the game is to look for all the safe squares which do not have a mine in them. I chose to recreate this game as I felt it was a good test of my understanding of Javascript fundamentals such as iterating over arrays, callback functions and more.

A little historic knowledge about Minesweeper: it is debated whether the 1990's version of Microsoft Minesweeper by Curt Johnson or the 1983 version of Mined-Out by Ian Andrew was the first version of the game.

<br>

## Game Concept

Interaction with the game is done with the left mouse click button.

There are 2 main interactions for the player to perform:

- A player can either place a flag to mark the square as a mine to prevent future interactions with it as well as a reminder to themselves that a mine exists in it.
- A player can left click a square which they deem as a "safe" square to unveil either a number or an empty square which will results in other safe squares adjacent to it.

The win condition:

- The player wins when he/she left clicks all safe squares within the game.

The lose condition:

- The player loses when he/she incorrectly clicks a mine which immediately ends the game.

<br>

## How to play

As the player goes about the game and clicks on squares they think are "safe", numbers will appear on the squares.

These numbers reveal the number of mines which are in the 8 adjacent squares. Players may use these numbers to figure out which squares are safe to click on and which contain mines.

<br>

## Game Architecture

In order to create the final product, the game had to be broken down into multiple components to be developed:

- [x] **Step 1** Create HTML template and base CSS styling
- [x] **Step 2** Generate Minesweeper grid using JS
- [x] **Step 3** Include event listeners to all interactable elements (buttons, grid etc.)
- [x] **Step 4** Allow flags to be placed without activating mines on "dangerous" squares
- [x] **Step 5** Create game logic of clicking on squares to reveal a number on adjacent squares
- [x] **Step 6** Create flooding feature when clicked square reveals no adjacent mines
- [x] **Step 7** Create randomiser for mines at the start of every game
- [x] **Step 8** Create pre-set level difficulties
- [x] **Step 9** Enable reset functionalities without refreshing browser page
- [x] **Step 10** (Stretch Goal) Create a randomised level

<br>

## Key Learnings

- Planning the development process of different JS functions were important to prevent backtracking in order to allow the next function to operate smoothly
- Using a function to call itself resulted in multiple "Call stack size exceeded" errors without careful initial planning
- Utilising CSS classes to restrict JS function triggers instead of simply using CSS for styling purposes
- Constantly testing the output product to fix bugs before development continues

<br>

## Breakdown & Analysis of Code

**Declaring the state variables**

![State-Variable.js file](https://github.com/johnww15/Minesweeper/blob/main/Resources/gameobject.png?raw=true)

- Certain variables were planned at the beginning to be used later on as development stages progressed.
- The location of mines as well as the creation of the grid were saved as arrays throughout the game

**Creating the grid**

![Grid-creation.js file](https://github.com/johnww15/Minesweeper/blob/main/Resources/createbox.png?raw=true)

- The first loop was to create the y variables (the number of squares starting from the top) in ascending order and saved into an array
- The second loop was to create the x variable (the number of squares starting from the left) in ascending order, creating a string output with y, appending it into the HMTL and adding an eventlistener to each created square

**Main clicking function**

![Main-clicking-function.js file](https://github.com/johnww15/Minesweeper/blob/main/Resources/mainclick.png?raw=true)

- Majority of the game's complexity is within this function
- This function is triggered whenever a player clicks on a square which is not a mine. The 2 possibilities of the square having adjacent squares with mines or a square with no adjacent square with mines may occur.
- This main function calls on a 2nd function (shown below) to check on all 8 adjacent squares to count if a mine exists to be returned
- Additionally, this main function calls on itself for it's adjacvent square if the initial square returns 0
- In having a callback on itself, many conditionals needed to be placed at the beginning of the function to prevent an infinite loop as well as to reduce the load on the game without compromising on its functionality
- Lastly, the function makes a quick check if the click triggers the end of the game for the player

**Checking square function**

![Checking-square-function.js file](https://github.com/johnww15/Minesweeper/blob/main/Resources/checkbox.png?raw=true)

- This function is called by the main click function (shown above)
- In doing so, this function checks on it's given square according to arguments provided and returns a value of 1 if true

**(Stretch Goal) Randomised levels**

![Random-game-1.js file](https://github.com/johnww15/Minesweeper/blob/main/Resources/possiblerandom1.png?raw=true)
![Random-game-2.js file](https://github.com/johnww15/Minesweeper/blob/main/Resources/possiblerandom2.png?raw=true)

- A random level feature was included which will randomise the height, width and number of mines at the beginning of the round
- This allows for the possibility of an extremely easy game or a "close to impossible" game to be rendered

<br>

## Summary

As this was my first time creating a project in such a tight timeframe, time management as well as spontaneous problem solving were key components to creating the finalised product.

Along the way, there was times when the vision had to change slightly to meet production deadlines I set for myself. These components can then be noted for future troubleshooting and improvements. However, at least a final product was created first.

Through this project, it helped me realise having a perfectionist mindset during the development process can be detrimental to the overall project. By getting smaller functions to work and getting an overall cohesive product allowed me to return and finetune different areas better than sitting down and trying to solve a problem during the development itself.

<br>

## References

- [MineSweeper Info] (https://www.minesweeper.info/)
- [JS documentations] (https://developer.mozilla.org/en-US/)
- [JS tutorial] (https://www.w3schools.com/)
- [Minesweeper using Javascript] (https://iq.opengenus.org/minesweeper-game-using-js/)
- [Building Minesweeper with Javscript, HTML CSS] (https://www.youtube.com/watch?v=AfhfAxKFP-s)
- [Minesweeper in Javacsript] (https://www.101computing.net/minesweeper-in-javascript/)
- ChatGPT
- Stackoverflow
