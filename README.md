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

Declaring the state variables

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
