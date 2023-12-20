import * as vscode from 'vscode';

export default async function reloadWindow() {
	await vscode.commands.executeCommand('workbench.action.reloadWindow');
}
