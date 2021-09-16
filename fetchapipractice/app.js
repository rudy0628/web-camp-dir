// fetch('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log("RESPONSE, WAITING TO PARSE", res);
//         return res.json()
//     })
//     .then(data => {
//         console.log("DATA PARSED...", data);
//         console.log(data.ticker.price);
//     })
//     .catch(e => {
//         console.log("OH NO!! ERROR!", e);
//     })

// const fetchBitcoinPrice = async () => {
//     try {
//         const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
//         const data = await res.json();
//         console.log(data.ticker.price);
//     }
//     catch (e) {
//         console.log("ERROR", e);
//     }
// }

// axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log(res.data.ticker.price);
//     })
//     .catch(err => {
//         console.log(err);
//     })

// const fetchBitcoinPrice = async () => {
//     try {
//         const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
//         console.log(res.data.ticker.price);
//     } catch {
//         console.log("ERROR", e);
//     }
// }


//fetch random DadJoke from DadJoke API practice
const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');

const addNewJoke = async () => {
    //wait the jokeText to get the joke (promise is resolved)
    const jokeText = await getDadJoke();
    const newLi = document.createElement('li');
    newLi.append(jokeText);
    jokes.append(newLi);
}
const getDadJoke = async () => {
    try {
        //config is parse the content to json data
        const config = { headers: { Accept: 'application/json' } };
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch (e) {
        return "No jokes available! Sorry!";
    }
}

button.addEventListener('click', () => {
    addNewJoke();
})