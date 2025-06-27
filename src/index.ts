import { Request, Response, Router } from "express"
import fs from "fs"

const router: Router = Router()

type TUser = {
    name: string;
    todos: string[];
};

let TUser: TUser[] = []


router.get('/todos/:id', function (req, res) {
    let id=req.url.slice(7)
    console.log("Search of: "+id)
    let i=0
    for (; i<TUser.length; i++){
        if (TUser[i].name==id){
            console.log(id+" is found")
            break
        }
    }
    if (i==TUser.length){
        res.send({ msg: "User not found" });
    }
    else{ 
        res.send({ msg: TUser[i].todos });
    }
});

router.post('/add/', function (req, res) {
    let name = req.body.name.toString();
    console.log("Submited "+ req.body)
    // Is user new or already exist?
    let i=0
    for (; i<TUser.length; i++){
        if (TUser[i].name==name){
            console.log("Already exist in list")
            break
        }
        else 
        console.log("New")
    }
    console.log("Found in position - "+i+"/"+TUser.length)

    // adding new user
    if (i==TUser.length){
        TUser.push(req.body)
    }
    else{ // adding new action
        TUser[i].todos.push(req.body.todos.toString())
    }

    res.send({ msg: `Todo added successfully for user ${name}.` });
    FileWriting()
})

router.delete("/delete/:id", function (req, res) {
    //console.log(typeof(req.body.name))
    let name = req.body.name
    console.log("To be delete: "+ name)
    let i=0
    for (; i<TUser.length; i++){
        if (TUser[i].name==name){
            TUser.splice(i,1);
            console.log("Found in list in position " +i)
            break
        }
    }
    console.log("After deleting "+JSON.stringify(TUser))
    FileWriting()
    res.send({ msg: "User deleted successfully." });
})

function FileWriting() {
    fs.writeFile("data.json", JSON.stringify(TUser), (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

function Intro() {
    if (fs.existsSync("data.json")) {
        fs.readFile("data.json", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
            if (err) {
                console.error(err)
                return
            }
            try {
                TUser = JSON.parse(data)
                console.log("Reading from list: " + JSON.stringify(TUser));
            } catch (error: any) {
                console.error(`Error parsing JSON: ${error}`)
            }
        })
    }
    else{
        FileWriting()
    }
}

Intro()

export default router