#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = __importDefault(require("commander"));
var newProjectBuild_1 = __importDefault(require("./helpers/newProjectBuild"));
var spinner;
var libPackageJSON = require("../package.json");
commander_1.default
    .version(libPackageJSON.version)
    .name(libPackageJSON.name)
    .description(libPackageJSON.description + "... 🎉");
commander_1.default
    .command("new")
    .arguments("<directory-name>")
    .description("Create a new project... 📦")
    .action(function (folderName) {
    if (!folderName) {
        console.log(chalk_1.default.red("Please specify a folder name...💣"));
        process.exit(1);
    }
    newProjectBuild_1.default(folderName, spinner);
});
commander_1.default.parse(process.argv);
