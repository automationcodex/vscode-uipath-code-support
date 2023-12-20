import fs from 'fs';
import UiPathProjectFile from '../types/uipath-project-file';
import * as vscode from 'vscode';
import path from 'path';

export default function readUiPathProjectFile(workspaceFolder: vscode.WorkspaceFolder) : UiPathProjectFile {
	const projectFilePath = path.join(workspaceFolder.uri.fsPath, 'project.json');
	if (!fs.existsSync(projectFilePath)) {
		throw new Error('project.json file not found');
	}

	const content = fs.readFileSync(projectFilePath, 'utf-8');
	return JSON.parse(content);
}