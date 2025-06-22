const submitButton = document.getElementById("submit-data")
submitButton.addEventListener("click", async () => {

    const name = document.getElementById("userInput");
    const todos = document.getElementById("todoInput");
    const person = {
        "name": name.value,
        "todos": [todos.value]
    };

    const userAdded = await fetch("http://localhost:8000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(person)
    })
    const responceFromAdd = await userAdded.json()
    console.log(responceFromAdd)
    name.value = ""
    todos.value = ""
    const textParagraph=document.getElementById("responce")
    textParagraph.innerText=responceFromAdd.msg
})