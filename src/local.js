const server = require("./app");
const PORT = process.PORT || 3000;

server.listen(PORT, () => {
    console.log("server listen on port " + PORT);
});
