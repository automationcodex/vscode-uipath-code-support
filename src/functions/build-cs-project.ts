import * as vscode from 'vscode';

export default async function buildCsProject(workspaceFolder: vscode.WorkspaceFolder, projectFileName: string, exitTerminalAfterBuild: boolean = false) {
	const terminal = vscode.window.createTerminal({ cwd: workspaceFolder.uri.fsPath });
	terminal.show();
	terminal.sendText(`dotnet build ${projectFileName} /clp:ErrorsOnly`);
	if (exitTerminalAfterBuild) {
        terminal.sendText(`exit`, true);
    }
}
