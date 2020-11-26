import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { execShellCommand, writeToPackageJSON } from "../utils/index";

export default async function ({
  folderName,
  projectName,
  useTypeScript,
  packageManager,
  spinner,
}: {
  folderName: string;
  projectName: string;
  useTypeScript: boolean;
  packageManager: string;
  spinner: ora.Ora | null;
}) {
  spinner = ora({
    color: "green",
    text: "Generating your node rest api boilerplate setup ...",
  }).start();
  const destination = folderName;
  const packageManagerShellCmd =
    packageManager === "npm"
      ? "npm i"
      : packageManager === "yarn"
      ? "yarn add"
      : "npm i";
  const asDev =
    packageManager === "npm"
      ? "--save-dev"
      : packageManager === "yarn"
      ? "-D"
      : "--save-dev";
  if (folderName !== "." && fs.existsSync(folderName)) {
    spinner?.fail(
      chalk.red("Can't create a new project as the folder already exists 😢")
    );
    process.exit(1);
  }
  try {
    if (!useTypeScript) {
      await generateNodeRestBoilerplate({
        asDev,
        folderName,
        packageManagerShellCmd,
        packageManager,
        destination,
        projectName,
        spinner,
      });
    } else {
      await generateNodeRestTsBoilerplate({
        asDev,
        packageManager,
        folderName,
        packageManagerShellCmd,
        destination,
        projectName,
        spinner,
      });
    }
  } catch (err) {
    console.error(err);
    spinner?.fail(chalk.red("Failed to generate your node app 😢"));
    process.exit(1);
  }
}

async function generateNodeRestBoilerplate({
  asDev,
  folderName,
  packageManagerShellCmd,
  packageManager,
  destination,
  projectName,
  spinner,
}: {
  asDev: string;
  folderName: string;
  packageManagerShellCmd: string;
  packageManager: string;
  destination: string;
  projectName: string;
  spinner: ora.Ora;
}) {
  const source = path.join(__dirname, "..", "..", "examples", "node-api");
  await fs.copy(source, destination);
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} cors dotenv esm express helmet morgan`
  );
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise nodemon ${asDev}`
  );
  await execShellCommand(`cd ${folderName} && ${packageManager} install`);
  await writeToPackageJSON({ folderName, projectName });
  spinner?.succeed("All set 👌");
}

async function generateNodeRestTsBoilerplate({
  folderName,
  packageManagerShellCmd,
  destination,
  projectName,
  spinner,
  asDev,
  packageManager,
}: {
  asDev: string;
  folderName: string;
  packageManagerShellCmd: string;
  destination: string;
  projectName: string;
  spinner: ora.Ora;
  packageManager: string;
}) {
  const source = path.join(__dirname, "..", "..", "examples", "node-api-ts");
  await fs.copy(source, destination);
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} cors dotenv express helmet morgan`
  );
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} ${asDev} @types/cors @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise nodemon ts-node @types/morgan typescript`
  );
  await execShellCommand(`cd ${folderName} && ${packageManager} install`);
  await writeToPackageJSON({ folderName, projectName });
  spinner?.succeed("All set 👌");
}
