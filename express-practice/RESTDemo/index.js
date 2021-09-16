const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

//to show POST body content
app.use(express.urlencoded({ extended: true }));
//allow json format
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
	{
		id: uuid(),
		username: "Tode",
		comment: "lol that is so funny",
	},
	{
		id: uuid(),
		username: "skyler",
		comment: "lol that is so funny2",
	},
	{
		id: uuid(),
		username: "sky8erBoi",
		comment: "lol that is so funny3",
	},
	{
		id: uuid(),
		username: "onlysaywoof",
		comment: "lol that is so funny4",
	},
];

//all comments page
app.get("/comments", (req, res) => {
	//render to a html page
	res.render("comments/index", { comments });
});

//add new comments interface
app.get("/comments/new", (req, res) => {
	res.render("comments/new");
});

//show the comment details
app.get("/comments/:id", (req, res) => {
	const { id } = req.params;
	//js find method return the first where the c.id is.
	const comment = comments.find((c) => c.id === id);
	res.render("comments/show", { comment });
});

//comments edit page
app.get("/comments/:id/edit", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render("comments/edit", { comment });
});

//add new comment action
app.post("/comments", (req, res) => {
	const { username, comment } = req.body;
	comments.push({ username, comment, id: uuid() });
	res.redirect("/comments");
});

//update comment action
app.patch("/comments/:id", (req, res) => {
	const { id } = req.params;
	const newCommentText = req.body.comment;
	const foundComment = comments.find((c) => c.id === id);
	foundComment.comment = newCommentText;
	res.redirect("/comments");
});

//delete comment action
app.delete("/comments/:id/", (req, res) => {
	const { id } = req.params;
	comments = comments.filter((c) => c.id !== id);
	res.redirect("/comments");
});

// another sample
app.get("/tacos", (req, res) => {
	res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
	const { meat, qty } = req.body;
	res.send(`OK ,This is your ${qty} ${meat}`);
});

app.listen(3000, () => {
	console.log("on PORT 3000");
});

/*step1 require express and execute express
step2 if execute express name call app,we can use app.get,post,delete...
step3   app.get("/tacos", (req, res) => {
	        res.send("GET /tacos response");
        });
        this function has two params, first is URL /example,and two is (req, res),req is what url request,e.g. if URL has like /tacos/:meat ,the meat is req.params and we can destructor req.params to get meat. res can have many method like send,render,redirect,anywere, the send is to send something params or string to the URL and show something,the render is to render an ejs page in the URL,the render can have two params ,first is the render ejs file directory ,second is we can send some data to ejs file page,and use them.*/

/*
    Name        Path                verb        purpose
    Index       /comments           GET         Display all the comments
    New         /comments/new       GET         Form(ejs page) to create new comment
    Create      /comments           POST        create new comment on server
    Show        /comments/:id       GET         Details from specific comment
    Edit        /comments/:id/edit  GET         Form(ejs page) to edit specific comment
    update      /comments/:id       PATCH       update specific comment from server
    Destroy     /comments/:id       DELETE      delete specific comment from server
*/
