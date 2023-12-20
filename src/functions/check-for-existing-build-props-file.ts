import * as vscode from 'vscode';
import fs from 'fs';

export default function checkForExistingBuildPropsFile(workspaceFolder: vscode.WorkspaceFolder): string | null {
	const files = fs.readdirSync(workspaceFolder.uri.fsPath);
	return files.find(file => file === 'Directory.Build.props') || null;
}