const express = require('express');
const app = express();

// app.use((req, res) => {
//     console.log("add new request");
//     //res.send("Hello, we got your request!");
//     res.send({ color: 'red' });
// })

app.get('/', (req, res) => {
    res.send("welcome,HOME!!~~~");
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Post ID : ${postId}Browsing the ${subreddit}</h1>`);
})

app.post('/cat', (req, res) => {
    res.send("this is an post on cat!!");
})

app.get('/cat', (req, res) => {
    // console.log("cat request");
    res.send("meow!!");
})

app.get('/dog', (req, res) => {
    res.send("woof!!");
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('nothing found if nothing searched');
    }
    res.send(`<h1>Search result for: ${q}</h1>`);
})



//do not put this chunk of code in the first,it will cover all the content
app.get('*', (req, res) => {
    res.send("i don't know the path");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})