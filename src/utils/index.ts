import { ExecException } from "child_process";
import fs from "fs-extra";
import path from "path";

export const execShellCommand = async (cmd: string): Promise<boolean> => {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error: ExecException, stdout: string, stderr: string) => {
      if (error) {
        console.warn(error);
        reject(error);
      }
      resolve(true);
    });
  });
};

export const writeToPackageJSON = async ({
  folderName,
  projectName,
}: {
  folderName: string;
  projectName: string;
}): Promise<void> => {
  const packageJSON = require(path.join(
    process.cwd() + "/" + folderName + "/package.json"
  ));
  return fs.writeFile(
    path.join(process.cwd() + "/" + folderName + "/package.json"),
    JSON.stringify(
      {
        ...packageJSON,
        name: projectName || packageJSON.name,
        eslintConfig: { ignorePatterns: "public" },
      },
      null,
      2
    ),
    "utf8"
  );
};
