//POST route "/add"
const submitButton = document.getElementById("submit-data")
submitButton.addEventListener("click", async () => {

    const name = document.getElementById("userInput");
    const todos = document.getElementById("todoInput");
    const person = {
        "name": name.value,
        "todos": [todos.value]
    };

    const userAdded = await fetch("http://localhost:3000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(person)
    })
    const responceFromAdd = await userAdded.json()
    const textParagraph = document.getElementById("responce")
    textParagraph.innerText = responceFromAdd.msg
})


//GET route to "/todos/:id"
const searchButton = document.getElementById("search")
const deleteUserButton = document.getElementById('deleteUser')
searchButton.addEventListener("click", async () => {

    const searchName = document.getElementById("searchInput");
    //console.log(typeof(searchName))
    const url = "http://localhost:3000/todos/"+searchName.value;

    const userSeeked = await fetch(url)
    const responceFromSeek = await userSeeked.json()
    console.log(responceFromSeek.msg)
    const outputList = document.getElementById("todosList")
    while (outputList.hasChildNodes()) { // List cleaning
        outputList.removeChild(outputList.firstChild);
    }

    if (responceFromSeek.msg == "User not found") {
        const textParagraph = document.getElementById("responce")
        textParagraph.innerText = responceFromSeek.msg
        // var li = document.createElement("li");
        // li.appendChild(document.createTextNode(responceFromSeek.msg));
        // outputList.appendChild(li);
    }
    else {
        responceFromSeek.msg.forEach(todo => {
            //var a = document.createElement("a");
            var li = document.createElement("li");
            // a.appendChild(document.createTextNode(JSON.stringify(todo)));
            // li.appendChild(a);
            li.appendChild(document.createTextNode(JSON.stringify(todo)));
            outputList.appendChild(li);
        }); 
        deleteUserButton.style.visibility = 'visible';
    }
})


//Delete user
deleteUserButton.addEventListener("click", async () => {

    const nameDelete = document.getElementById("searchInput");
    const person = {
        "name": nameDelete.value,
    };

    const userDeleted = await fetch("http://localhost:3000/delete/"+ nameDelete.value, {
        method: "delete",
        headers: {
            "Content-type": "application/json"
        },
        body:  JSON.stringify(person)
    })
    const responceFromDeleted = await userDeleted.json()
    
    console.log(responceFromDeleted)
    nameDelete.value = "";
    const outputList = document.getElementById("todosList")
    while (outputList.hasChildNodes()) { // List cleaning
        outputList.removeChild(outputList.firstChild);
    }
    const textParagraph = document.getElementById("responce")
    textParagraph.innerText = responceFromDeleted.msg
})


// Delete ToDo
const todosList = document.getElementById("todosList")
todosList.addEventListener("click", async function (e) {
    const nameDelete = document.getElementById("searchInput");
    if (e.target.tagName == 'LI') {
        const todo=e.target.innerText.slice(1,-1)
        console.log(todo + " " + nameDelete.value);  // Check if the element is a LI

        const todoDeleted = await fetch("http://localhost:3000/update", {
            method: "put",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "name": nameDelete.value,
                "todo": todo
            })
        })
        const responceFromDeleted = await todoDeleted.json()
        const textParagraph = document.getElementById("responce")
        textParagraph.innerText = responceFromDeleted.msg
    }
})
