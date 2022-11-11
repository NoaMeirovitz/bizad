//Turn on the server
const app = require("./http-server");

//server port
const PORT = 3001;
//when we connect to server we get console the message listening to port 3000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
