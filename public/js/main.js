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
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(responceFromSeek.msg));
        outputList.appendChild(li);
    }
    else {
        responceFromSeek.msg.forEach(todo => {
            var li = document.createElement("li");
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
    nameDelete.value = ""
    const outputList = document.getElementById("todosList")
    while (outputList.hasChildNodes()) { // List cleaning
        outputList.removeChild(outputList.firstChild);
    }
    const textParagraph = document.getElementById("responce")
    textParagraph.innerText = responceFromDeleted.msg
})

