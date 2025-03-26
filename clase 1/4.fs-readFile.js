const fs = require("node:fs");

console.log("Leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8", (err, txt) => {
  if (err) {
    console.error("ERROR", err);
    return;
  }

  console.log(txt);
});

console.log("Haciendo cosas mientras lee el archivo...");

console.log("Leyendo el segundo archivo...");
fs.readFile("./archivo2.txt", "utf-8", (err, txt) => {
  if (err) {
    console.error("ERROR", err);
    return;
  }

  console.log(txt);
});
