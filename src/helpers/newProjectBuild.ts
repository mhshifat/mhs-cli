import inquirer from "inquirer";
import ora from "ora";
import nodeGQLProjectBuild from "./nodeGQLProjectBuild";
import nodeMongodbGqlProjectBuild from "./nodeMongodbGqlProjectBuild";
import nodeMongodbRestProjectBuild from "./nodeMongodbRestProjectBuild";
import nodeRestProjectBuild from "./nodeRestProjectBuild";
import reactGqlProjectBuild from "./reactGqlProjectBuild";
import reactProjectBuild from "./reactProjectBuild";
import reactReduxProjectBuild from "./reactReduxProjectBuild";

export default async (
  folderName: string,
  spinner: ora.Ora | null
): Promise<void> => {
  const answerers = await inquirer.prompt([
    {
      type: "text",
      name: "projectName",
      message: "What is the name of the project?",
      default: folderName.length > 1 ? folderName : "example",
    },
    {
      type: "list",
      name: "projectType",
      message: "What type of project do you need?",
      choices: ["ui", "api"],
    },
    {
      type: "list",
      name: "uiAppType",
      message: "What type of app do you need?",
      choices: ["react", "react-gql", "react-redux"],
      when: (allAnswerers) => {
        return allAnswerers.projectType === "ui";
      },
    },
    {
      type: "list",
      name: "apiAppType",
      message: "What type of server do you need?",
      choices: ["node-gql", "node-rest"],
      when: (allAnswerers) => {
        return allAnswerers.projectType === "api";
      },
    },
    {
      type: "confirm",
      name: "includeDb",
      message: "Do you want to include db setup in your project?",
      default: false,
      when: (allAnswerers) => {
        return allAnswerers.projectType === "api"
      },
    },
    {
      type: "list",
      name: "apiAppDBType",
      message: "What type of database do you need?",
      choices: ["mongodb"],
      when: (allAnswerers) => {
        return allAnswerers.includeDb;
      },
    },
    {
      type: "confirm",
      name: "isTypeScriptProject",
      message: "Do you want to use TypeScript in your project?",
      default: false,
    },
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager do you use?",
      choices: ["npm", "yarn"],
    },
  ]);

  switch (answerers.uiAppType) {
    case "react":
      await reactProjectBuild({
        folderName,
        projectName: answerers.projectName,
        useTypeScript: answerers.isTypeScriptProject,
        packageManager: answerers.packageManager,
        spinner,
      });
      break;
    case "react-gql":
      await reactGqlProjectBuild({
        folderName,
        projectName: answerers.projectName,
        useTypeScript: answerers.isTypeScriptProject,
        packageManager: answerers.packageManager,
        spinner,
      });
      break;
    case "react-redux":
      await reactReduxProjectBuild({
        folderName,
        projectName: answerers.projectName,
        useTypeScript: answerers.isTypeScriptProject,
        packageManager: answerers.packageManager,
        spinner,
      });
      break;
    default:
      break;
  }

  if (answerers.apiAppType === "node-rest" && !answerers.includeDb) {
    await nodeRestProjectBuild({
      folderName,
      projectName: answerers.projectName,
      useTypeScript: answerers.isTypeScriptProject,
      packageManager: answerers.packageManager,
      spinner,
    });
  }

  if (
    answerers.apiAppType === "node-rest" &&
    answerers.includeDb &&
    answerers.apiAppDBType === "mongodb"
  ) {
    await nodeMongodbRestProjectBuild({
      folderName,
      projectName: answerers.projectName,
      useTypeScript: answerers.isTypeScriptProject,
      packageManager: answerers.packageManager,
      spinner,
    });
  }

  if (answerers.apiAppType === "node-gql" && !answerers.includeDb) {
    await nodeGQLProjectBuild({
      folderName,
      projectName: answerers.projectName,
      useTypeScript: answerers.isTypeScriptProject,
      packageManager: answerers.packageManager,
      spinner,
    });
  }

  if (
    answerers.apiAppType === "node-gql" &&
    answerers.includeDb &&
    answerers.apiAppDBType === "mongodb"
  ) {
    await nodeMongodbGqlProjectBuild({
      folderName,
      projectName: answerers.projectName,
      useTypeScript: answerers.isTypeScriptProject,
      packageManager: answerers.packageManager,
      spinner,
    });
  }
};
