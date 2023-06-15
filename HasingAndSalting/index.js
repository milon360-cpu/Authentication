const app = require("./app");
require("dotenv").config();
require("./Config/Config");
const PORT = process.env.PORT;
app.listen(PORT,()=>
{
    console.log("server is running");
})