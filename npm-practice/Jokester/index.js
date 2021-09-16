const jokes = require('give-me-a-joke');
const colors = require('colors');
// const cowSay = require('cowsay');

jokes.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
});