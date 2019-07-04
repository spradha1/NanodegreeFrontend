# Memory Game Project

The Memory Game project was completed with the assistance of the starter project provided with the assignment. Mostly,the javascript file was modified to make the game interactive. The functions and variables added have been mentioned below.

## Installation

Download the project or clone the repository and run

`npm install`

## Functions

**flip**: runs in response to any card being clicked and turns it over, if not matched or turned face up beforehand  
**cardCheck**: compares classList of the two cards to determine if it is a match  
**match**: adds 'match' class to the matching cards, and the cards to storage array 'solvedCards'  
**nomatch**: adds 'nomatch' class to the non-matching cards, and delays before turning them face down to show the animations  
**faceDown**: reassigns the cards with only the 'card' class  
**updateGame**: updates moves counter and star rating  
**refresh**: reloads page in response to the restart button being clicked  
**congratulate**: clears out the page and creates congratulation message and a button to reload the game once the user wins  
**timer**: it runs every second, right after the page is done loading, in order to increment the timer accordingly  

## Variables

**gameEnd**: timer function stops when true  
**shuffledCards, openCards, solvedCards, diffferentCards**: storage arrays for shuffled set of the cards every time the page loads, cards that are to be checked, cards that are matched & pair of open cards that didn't match
