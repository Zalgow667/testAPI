const express = require("express")
const port = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", require("./routes/test.routes"))

app.listen(port, () => console.log("Test sur le port : " + port))

