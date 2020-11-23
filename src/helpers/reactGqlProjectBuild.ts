import chalk from "chalk";
import { exec, ExecException } from "child_process";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

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
  if (folderName !== "." && fs.existsSync(folderName)) {
    spinner?.fail(chalk.red("Folder name already exists 😢"));
    process.exit(1);
  } else {
    if (!useTypeScript) {
      exec(
        `npx create-react-app ${folderName}`,
        (error: ExecException | null, stdout: string, stderr: string) => {
          if (error) {
            spinner?.fail(
              chalk.red("Failed to generate your react-gql app 😢")
            );
            return;
          }
          exec(`rm -rf ${folderName}/src`);
          exec(`rm -rf ${folderName}/public`);
          exec(
            `cd ${folderName} && ${
              packageManager === "npm"
                ? "npm i"
                : packageManager === "yarn"
                ? "yarn add"
                : "npm i"
            } react-router-dom graphql @apollo/client subscriptions-transport-ws`
          );
          const source = path.join(
            __dirname,
            "..",
            "..",
            "examples",
            "react-gql"
          );
          const destination = folderName;
          fs.copy(source, destination, async (err) => {
            if (err) {
              console.log(err);
              spinner?.fail(
                chalk.red("Failed to generate your react-gql app 😢")
              );
              process.exit(1);
            } else {
              try {
                const packageJSON = require(path.join(
                  process.cwd() + "/" + folderName + "/package.json"
                ));
                await fs.writeFile(
                  path.join(process.cwd() + "/" + folderName + "/package.json"),
                  JSON.stringify(
                    { ...packageJSON, name: projectName || packageJSON.name },
                    null,
                    2
                  ),
                  "utf8"
                );
              } catch (err) {}
              spinner?.succeed("All set 👌");
            }
          });
        }
      );
    } else {
      exec(
        `npx create-react-app ${folderName} --template=typescript`,
        (error: ExecException | null, stdout: string, stderr: string) => {
          if (error) {
            spinner?.fail(
              chalk.red("Failed to generate your react-gql app 😢")
            );
            return;
          }
          exec(`rm -rf ${folderName}/src`);
          exec(`rm -rf ${folderName}/public`);
          exec(
            `cd ${folderName} && ${
              packageManager === "npm"
                ? "npm i"
                : packageManager === "yarn"
                ? "yarn add"
                : "npm i"
            } react-router-dom graphql @apollo/client subscriptions-transport-ws @types/react-router-dom @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo`
          );
          const source = path.join(
            __dirname,
            "..",
            "..",
            "examples",
            "react-gql-ts"
          );
          const destination = folderName;
          fs.copy(source, destination, async (err) => {
            if (err) {
              console.log(err);
              spinner?.fail(
                chalk.red("Failed to generate your react-gql app 😢")
              );
              process.exit(1);
            } else {
              try {
                const packageJSON = require(path.join(
                  process.cwd() + "/" + folderName + "/package.json"
                ));
                await fs.writeFile(
                  path.join(process.cwd() + "/" + folderName + "/package.json"),
                  JSON.stringify(
                    {
                      ...packageJSON,
                      name: projectName || packageJSON.name,
                      scripts: {
                        ...packageJSON.scripts,
                        generate: "graphql-codegen --config codegen.yml",
                      },
                    },
                    null,
                    2
                  ),
                  "utf8"
                );
              } catch (err) {}
              spinner?.succeed("All set 👌");
            }
          });
        }
      );
    }
  }
};
