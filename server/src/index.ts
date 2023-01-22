import express from "express"

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send("Welcome To e-shop-by-khaled")
})

app.listen(port, () => {
    console.log("Currently listening on port " + port)
})