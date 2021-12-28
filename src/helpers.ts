import * as vscode from "vscode";

export async function chooseFunctionName() {
  const result =
    (await vscode.window.showInputBox({
      prompt: 'Enter Function Name: (default is "t")',
    })) || "t";

  return result;
}
