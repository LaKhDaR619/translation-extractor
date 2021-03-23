import * as vscode from "vscode";
var findInFiles = require("find-in-files");
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "translation-extractor.search",
      async () => {
        try {
          const dir = "/Users/mac/Desktop/cleverzone/docta-dash-frontend/src";
          const results = await findInFiles.find(`\\bt\\('.*?'`, dir);
          console.log("done");

          const output: any = {};

          for (let result in results) {
            results[result].matches.map((match: string) => {
              const translation = match.replace(`t('`, "").replace(`'`, "");
              output[translation] = "";
            });
          }

          fs.writeFile(
            "/Users/mac/Desktop/test.txt",
            JSON.stringify(output),
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
