#! /usr/bin/env node
import chalk from "chalk";
import commander from "commander";
import ora from "ora";
import newProjectBuild from "./helpers/newProjectBuild";

let spinner: ora.Ora | null;
const libPackageJSON = require("../package.json");

commander
  .version(libPackageJSON.version)
  .name(libPackageJSON.name)
  .description(libPackageJSON.description + "... 🎉");

commander
  .command("new")
  .arguments("<directory-name>")
  .description("Create a new project... 📦")
  .action((folderName) => {
    if (!folderName) {
      console.log(chalk.red("Please specify a folder name...💣"));
      process.exit(1);
    }
    newProjectBuild(folderName, spinner);
  });

commander.parse(process.argv);
