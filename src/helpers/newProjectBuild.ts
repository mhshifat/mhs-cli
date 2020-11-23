import inquirer from "inquirer";
import ora from "ora";
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
      choices: ["UI", "API"],
    },
    {
      type: "list",
      name: "uiAppType",
      message: "What type of app do you need?",
      choices: ["react", "react-gql", "react-redux"],
      when: (allAnswerers) => {
        return allAnswerers.projectType === "UI";
      },
    },
    {
      type: "list",
      name: "apiAppType",
      message: "What type of server do you need?",
      choices: ["node", "node-graphql"],
      when: (allAnswerers) => {
        return allAnswerers.projectType === "API";
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
};
