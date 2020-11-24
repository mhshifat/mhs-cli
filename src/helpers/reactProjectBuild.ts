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
    text: "Generating your react app ...",
  }).start();
  const destination = folderName;
  const packageManagerShellCmd =
    packageManager === "npm"
      ? "npm i"
      : packageManager === "yarn"
      ? "yarn add"
      : "npm i";
  if (folderName !== "." && fs.existsSync(folderName)) {
    spinner?.fail(
      chalk.red("Can't create a new project as the folder already exists 😢")
    );
    process.exit(1);
  }
  try {
    if (!useTypeScript) {
      await generateReactBoilerplate({
        folderName,
        packageManagerShellCmd,
        destination,
        projectName,
        spinner,
      });
    } else {
      await generateReactTSBoilerplate({
        folderName,
        packageManagerShellCmd,
        destination,
        projectName,
        spinner,
      });
    }
  } catch (err) {
    console.error(err);
    spinner?.fail(chalk.red("Failed to generate your react app 😢"));
    process.exit(1);
  }
}

async function generateReactBoilerplate({
  folderName,
  packageManagerShellCmd,
  destination,
  projectName,
  spinner,
}: {
  folderName: string;
  packageManagerShellCmd: string;
  destination: string;
  projectName: string;
  spinner: ora.Ora;
}) {
  const source = path.join(__dirname, "..", "..", "examples", "react");
  await execShellCommand(`npx create-react-app ${folderName}`);
  await execShellCommand(`rm -rf ${folderName}/src`);
  await execShellCommand(`rm -rf ${folderName}/public`);
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} react-router-dom`
  );
  await fs.copy(source, destination);
  await writeToPackageJSON({ folderName, projectName });
  spinner?.succeed("All set 👌");
}

async function generateReactTSBoilerplate({
  folderName,
  packageManagerShellCmd,
  destination,
  projectName,
  spinner,
}: {
  folderName: string;
  packageManagerShellCmd: string;
  destination: string;
  projectName: string;
  spinner: ora.Ora;
}) {
  const source = path.join(__dirname, "..", "..", "examples", "react-ts");
  await execShellCommand(
    `npx create-react-app ${folderName} --template=typescript`
  );
  await execShellCommand(`rm -rf ${folderName}/src`);
  await execShellCommand(`rm -rf ${folderName}/public`);
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} react-router-dom @types/react-router-dom`
  );
  await fs.copy(source, destination);
  await writeToPackageJSON({ folderName, projectName });
  spinner?.succeed("All set 👌");
}
