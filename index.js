const express = require("express")
const app = express()

app.use(express.static(__dirname + "/public"))

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})


app.get("/code", (req, res) => {
  res.sendFile(__dirname + "/public/script.js");
})

app.get("/404", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
})

app.listen(3000, () => {
  console.log(`Holiday Server is Running!`)
});



// //CHAT GPT CODE FOR SNOW EFFECT

// function createSnow(amount = 30) {
//   for (let i = 0; i < amount; i++) {
//     const snowflake = document.createElement("div");
//     snowflake.className = "snowflake";
//     snowflake.textContent = "❄";

//     snowflake.style.left = Math.random() * 100 + "vw";
//     snowflake.style.animationDuration = (Math.random() * 3 + 2) + "s";
//     snowflake.style.fontSize = (Math.random() * 10 + 10) + "px";

//     document.body.appendChild(snowflake);

//     setTimeout(() => {
//       snowflake.remove();
//     }, 5000);
//   }
// }
// createSnow()