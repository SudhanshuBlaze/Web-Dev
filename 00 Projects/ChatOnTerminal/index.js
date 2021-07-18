const PORT= process.env.PORT || 3000;
const chalk = require('chalk');

const socket = require("socket.io-client");//("http://localhost:3000");
const http = require('http').createServer();
const io = require('socket.io')(http);


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var id = "";
var buffer = "";


function chat(){
	rl.question(chalk.magenta("» "), (answer) => {
		buffer = `${chalk.cyan(id)} : ${chalk.bgCyan(answer)}`;
		socket.emit("message", buffer);
		chat();
	});
}

socket.on('connect', () => {

	rl.question(`What's your name? `, (answer) => {
			socket.emit("message", `👤  : ${chalk.green(answer)} has joined the chat`);
			id = answer;
			chat();

	});

	socket.on('msg', function(data){
		if(buffer!=data){
			console.log("\n" + data);
			chat();
		}
	});
	
})


io.on('connection', function (socket) {
	socket.on('message', function(data) {
		io.emit("msg", data);
	});
});


http.listen(port, function() {
  console.log(`listening on ${PORT}`);
});