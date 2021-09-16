//fakeRequest with promise function
// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         const rand = Math.random();
//         setTimeout(() => {
//             if (rand < 0.7) {
//                 resolve('YOUR FAKE DATA HERE');
//             }
//             reject("Request ERROR");
//         }, 1000);
//     })
// }

// call fakeRequest
// fakeRequest('/dog/1')
//     .then((data) => {
//         console.log("DONE WITH REQUEST!");
//         console.log('data is:', data);
//     })
//     .catch((err) => {
//         console.log("ON NO!", err);
//     })

//color change with promise function
const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

//call colorChange function
// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('purple', 1000))

//call colorChange function with async and await
async function rainbow() {
    await delayedColorChange('red', 1000);
    await delayedColorChange('orange', 1000);
    await delayedColorChange('green', 1000);
    await delayedColorChange('yellow', 1000);
    await delayedColorChange('blue', 1000);
    await delayedColorChange('purple', 1000);
    await delayedColorChange('pink', 1000);
    return "ALL DONE!!";
}

rainbow().then(() => console.log("END!!"));

//some async function
// const sing = async () => {
//     throw "OH NO, PROBLEM!";
//     return "LA LA LA";
// }

// sing()
//     .then((data) => {
//         console.log("PROMISE RESOLVED WITH:", data);
//     })
//     .catch(err => {
//         console.log("OH NO, PROMISE REJECTED!", err);
//     })


//login function use promise vs async
// const login = (username, password) => {
//     return new Promise((resolve, rejected) => {
//         if (!username || !password) throw "OH NO!!";
//         if (password === 'corgifeetarecute') return "Welcome";
//         throw 'Invalid password!!';
//     })
// }

// const login = async(username, password) => {
//     if (!username || !password) throw "OH NO!!";
//     if (password === 'corgifeetarecute') return "Welcome";
//     throw 'Invalid password!!';
// }


// login('sfasfdsg')
//     .then(msg => {
//         console.log("LGOGOGOG");
//         console.log(msg);
//     })
//     .catch(err => {
//         console.log("ERROR", err);
//     })


//async function with fakeRequest
// const fakeRequest = async (url) => {
//     const delay = Math.floor(Math.random() * (4500)) + 500;
//     setTimeout(() => {
//         if (delay > 4000) {
//             throw "Connection Timeout :(";
//         } else {
//             return `Here is your fake data: ${url}`;
//         }
//     }, delay)
// }