let input = prompt("what would you like to do?");
const todos = ["Collect chicken eggs", "Clean Litter Box"];
while (input !== 'quit' && input !== 'q') {
    if (input === 'list') {
        console.log('**********');
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
        console.log('**********');
    } else if (input === 'new') {
        const newTodo = prompt("Ok ,what is new todo?");
        todos.push(newTodo);
        console.log(`${newTodo} add to the list`);
    } else if (input === 'delete') {
        const index = parseInt(prompt("Ok ,enter an index to delete!"));
        if (!Number.isNaN(index)) {
            const deleted = todos.splice(index, 1);
            console.log(`Ok ,${deleted[0]} is deleted`);
        } else {
            console.log("Not a index");
        }
    }
    input = prompt("what would you like to do?");
}

console.log("Ok ! YOU quit the app !!");