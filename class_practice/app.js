//Using the class to create an constructor function
// class Color {
//     constructor(r, g, b, name) {
//         this.r = r;
//         this.g = g;
//         this.b = b;
//         this.name = name;
//     }
//     innerRGB() {
//         const { r, g, b, name } = this;
//         return `${r}, ${g}, ${b}`
//     }
//     greet() {
//         const { r, g, b, name } = this;
//         return `(${this.innerRGB()}) is ${name}`;
//     }
// }

// const c1 = new Color(255, 67, 89, 'tomato');

//using origin way to create constructor function

// function Color(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }

// //this function don't use arrow function
// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r},${g},${b})`;
// }

// Color.prototype.rgba = function (a = 1) {
//     const { r, g, b } = this;
//     return `rgb(${r},${g},${b},${a})`;
// }

// const c1 = new Color(255, 67, 89);
// const c2 = new Color(200, 67, 66);

class Pet {
    constructor(name, age) {
        console.log("IN PET CONSTRUCTOR");
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating!`;
    }
}

class Cat extends Pet {
    constructor(name, age, livesLeft = 9) {
        //the super() is to call the Pet constructor name and age
        console.log("IN CAT CONSTRUCTOR");
        super(name, age);
        this.livesLeft = livesLeft;
    }
    meow() {
        return "meow";
    }
}

class Dog extends Pet {
    bark() {
        return "WOOOF!!";
    }
    eat() {
        return `${this.name} scrafs his food!`;
    }
}

