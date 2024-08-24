const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const secretkey = "secretkey"



app.post("/login", (req, res) => {
    const user = {

        id: 1,
        name: "moeed",
        email: "moeed@gmai.com"
    }


    jwt.sign({ user }, secretkey, { expiresIn: '3000s' }, (err, token) => {
        res.json({ token })
    })

})



app.post("/profile", verifytoken, (req, res) => {

    jwt.verify(req.token, secretkey, (error, authdata) => {

        if (error) {
            res.send({
                result:"invalid"
            })

        }

        else {
            res.send({
                massege: "profile accesed",
                authdata
            })
        }

    })

})

function verifytoken(req, res, next) {

    const bearerheader = req.headers['authorization']

    if (typeof bearerheader !== 'undifiend') {

        const bear = bearerheader.split(" ")

        const token = bear[1]

        req.token = token

        next()
    }

    else {
        res.json({
            result: "token is unvalid",
        })
    }
}









app.listen(8000, () => {
    console.log("port 8000 is liten")
})