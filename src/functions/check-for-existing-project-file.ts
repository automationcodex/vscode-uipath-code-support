import * as vscode from 'vscode';
import fs from 'fs';

export default function checkForExistingCSProjFile(workspaceFolder: vscode.WorkspaceFolder): string | null {
	const files = fs.readdirSync(workspaceFolder.uri.fsPath);
	return files.find(file => file.endsWith('.csproj')) || null;
}