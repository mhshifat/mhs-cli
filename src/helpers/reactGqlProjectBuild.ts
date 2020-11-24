import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { execShellCommand, writeToPackageJSON } from "../utils/index";

export default async ({
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
}) => {
  spinner = ora({
    color: "green",
    text: "Generating your react-gql app ...",
  }).start();
  const destination = folderName;
  const packageManagerShellCmd =
    packageManager === "npm"
      ? "npm i"
      : packageManager === "yarn"
      ? "yarn add"
      : "npm i";
  if (folderName !== "." && fs.existsSync(folderName)) {
    spinner?.fail(chalk.red("Folder name already exists 😢"));
    process.exit(1);
  }
  try {
    if (!useTypeScript) {
      await generateReactGqlBoilerplate({
        destination,
        folderName,
        packageManagerShellCmd,
        projectName,
        spinner,
      });
    } else {
      await generateReactGqlTSBoilerplate({
        destination,
        folderName,
        packageManagerShellCmd,
        projectName,
        spinner,
      });
    }
  } catch (err) {
    console.error(err);
    spinner?.fail(chalk.red("Failed to generate your react-gql app 😢"));
    process.exit(1);
  }
};

async function generateReactGqlBoilerplate({
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
  const source = path.join(__dirname, "..", "..", "examples", "react-gql");
  await execShellCommand(`npx create-react-app ${folderName}`);
  await execShellCommand(`rm -rf ${folderName}/src`);
  await execShellCommand(`rm -rf ${folderName}/public`);
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} react-router-dom graphql @apollo/client subscriptions-transport-ws`
  );
  await fs.copy(source, destination);
  await writeToPackageJSON({ folderName, projectName });
  spinner?.succeed("All set 👌");
}

async function generateReactGqlTSBoilerplate({
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
  const source = path.join(__dirname, "..", "..", "examples", "react-gql-ts");
  await execShellCommand(
    `npx create-react-app ${folderName} --template=typescript`
  );
  await execShellCommand(`rm -rf ${folderName}/src`);
  await execShellCommand(`rm -rf ${folderName}/public`);
  await execShellCommand(
    `cd ${folderName} && ${packageManagerShellCmd} react-router-dom graphql @apollo/client subscriptions-transport-ws @types/react-router-dom @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo`
  );
  await fs.copy(source, destination);
  await writeToPackageJSON({ folderName, projectName });
  spinner?.succeed("All set 👌");
}
