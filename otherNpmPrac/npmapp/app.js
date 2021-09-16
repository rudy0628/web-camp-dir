const _ = require('lodash');

const numbers = [33, 42, 654, 48, 4543, 435];

_.each(numbers, (number, i) => {
    console.log(number);
});