import * as vscode from "vscode";
var findInFiles = require("find-in-files");
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "translation-extractor.extract",
      async () => {
        try {
          const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: "Select",
            canSelectFiles: false,
            canSelectFolders: true,
            defaultUri:
              vscode.workspace.workspaceFolders &&
              vscode.workspace.workspaceFolders[0].uri,
          };

          const fileUri = await vscode.window.showOpenDialog(options);

          if (fileUri && fileUri[0]) {
            const dir = fileUri[0].fsPath;

            const results = {
              // matches with '
              ...(await findInFiles.find(
                `\\bt\\('.*?'`,
                dir,
                ".*\\.(js|jsx|ts|tsx)$"
              )),
              // matches with "
              ...(await findInFiles.find(
                `\\bt\\(".*?"`,
                dir,
                ".*\\.(js|jsx|ts|tsx)$"
              )),
              // matches with `
              ...(await findInFiles.find(
                "\\bt\\(`.*?`",
                dir,
                ".*\\.(js|jsx|ts|tsx)$"
              )),
            };

            const output: any = {};

            for (let result in results) {
              results[result].matches.map((match: string) => {
                const translation = match
                  .replace(`t('`, "")
                  .replace(`'`, "")
                  .replace(`t("`, "")
                  .replace(`"`, "")
                  .replace("t(`", "")
                  .replace("`", "");

                output[translation] = "";
              });
            }

            fs.writeFile(
              `${dir}/translation.json`,
              JSON.stringify(output),
              function (err) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
