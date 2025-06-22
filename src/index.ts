import { Request, Response, Router } from "express"
import fs from "fs"

const router: Router = Router()

type TUsers = {
    name: string;
    todos: string[];
};

let users: TUsers[] = []
/* let test1: TUsers[] = [{ name: "testing",
    todos: ["Eat", "Sleap", "Repeat"]}] */

/* router.get('/hello', function (req, res) {
    res.send({ msg: "Hello world!" });
}); */

router.post('/add/', function (req, res) {
    let name = req.body.name.toString();
    console.log("Submited "+ req.body)
    // Is user new or already exist?
    let i=0
    for (; i<users.length; i++){
        if (users[i].name==name){
            console.log("Already exist in list")
            break
        }
        else 
        console.log("New")
    }
    console.log("Found in position - "+i+"/"+users.length)

    // adding new user
    if (i==users.length){
        users.push(req.body)
    }
    else{ // adding new action
        users[i].todos.push(req.body.todos.toString())
    }

    res.send({ msg: `Todo added successfully for user ${name}.` });
    fs.writeFile("data.json", JSON.stringify(users), (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error(err)
            return
        }
    })
})

if (fs.existsSync("data.json")) {
    fs.readFile("data.json", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error(err)
            return
        }
        try {
            users = JSON.parse(data)
            console.log("Reading from list: " + JSON.stringify(users));
        } catch (error: any) {
            console.error(`Error parsing JSON: ${error}`)
        }
    })
}


export default router