#!/usr/bin/env node
import chalk from "chalk";
import { readFile } from "fs/promises";

const json = JSON.parse(
  await readFile(new URL("./data/data.json", import.meta.url))
);

const randomNum = () => {
  return Math.floor(Math.random() * json.length);
};

const getRandomQuote = () => {
  let randNum = randomNum();
  return json[randNum];
};

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

(async () => {
  const frase = getRandomQuote();
  console.log(chalk.green.bold(`"${frase.quote}"`));
  console.log("\nSabe quem disse isso? press any key para descobrir");
  await keypress();
  console.log(chalk.yellow.bold(`\n${frase.author} em -> ${frase.movie} \n`));
})().then(process.exit);
