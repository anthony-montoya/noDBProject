const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(bodyParser.json());
app.use(cors());

const players = [
    {
        userName: "MySQL.Code"
    },
    {
        userName: "Java.Code"
    },
    {
        userName: "Ruby.Code",
        kills: 2000
    }
];

app.post("/userNameLookup", (request, response) => {
    const {displayName}  = request.body;
    console.log(displayName);
    const player = players.filter((element, index, arr)=> {
        return arr[index].userName === displayName;
    })
     response.status(200).send(player);
})


app.listen(3002, () => {
    console.log("Im listening on port 3002")
});