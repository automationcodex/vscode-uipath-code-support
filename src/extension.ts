import * as vscode from 'vscode';
import * as path from 'path';
import getUiPathInstallPath from './functions/get-uipath-install-path';
import getAvailableAssemblies from './functions/get-available-assemblies';
import readUiPathProjectFile from './functions/read-uipath-project-file';
import getFirstWorkspaceFolder from './functions/get-first-wrokspace-folder';
import getProjectDependencies from './functions/get-project-dependencies';
import config from './const/config';
import { ensureCSharpExtensionIsInstalled } from './functions/ensure-charp-extension-is-installed';
import { createProjectBuildFolder } from './functions/create-project-build-folder';
import getPackagePath from './functions/get-package-path';
import createProjectFile from './functions/create-project-file';
import checkForExistingCSProjFile from './functions/check-for-existing-project-file';
import buildCsProject from './functions/build-cs-project';
import fs from 'fs';
import os from 'os';
import checkForExistingBuildPropsFile from './functions/check-for-existing-build-props-file';
import createBuildPropsFile from './functions/create-build-props-file';
import getSettings from './functions/get-settings';


// Activates the extension with the logic encapsulated in distinct functions.
export function activate(context: vscode.ExtensionContext) {
	console.log('Your extension "uipath-code-support" is now active!');

	const initCommand = vscode.commands.registerCommand('uipath-code-support.init', init);
	const updateCommand = vscode.commands.registerCommand('uipath-code-support.update', update);
	const removeCommand = vscode.commands.registerCommand('uipath-code-support.remove', remove);

	context.subscriptions.push(initCommand);
	context.subscriptions.push(updateCommand);
	context.subscriptions.push(removeCommand);
}

// Deactivates the extension.
export function deactivate() { }


async function init() {
	const workspaceFolder = getFirstWorkspaceFolder();
	if (!workspaceFolder) {
		vscode.window.showErrorMessage('No workspace folder found');
		return;
	}

	if (checkForExistingCSProjFile(workspaceFolder) !== null || checkForExistingBuildPropsFile(workspaceFolder) !== null) {
		const overwrite = await vscode.window.showWarningMessage(
			'A .csproj file or a Directory.Build.props file already exists. Do you still want to initialize?',
			'Yes', 'No'
		);
		if (overwrite !== 'Yes') {
			return;
		}
	}
	

	await generateProjectFiles(workspaceFolder);

	vscode.window.showInformationMessage('Project file generated successfully');
}

async function update() {

	const workspaceFolder = getFirstWorkspaceFolder();
	if (!workspaceFolder) {
		vscode.window.showErrorMessage('No workspace folder found');
		return;
	}

	if (checkForExistingCSProjFile(workspaceFolder) !== config.projectFileName || checkForExistingBuildPropsFile(workspaceFolder) === null) {
		const overwrite = await vscode.window.showWarningMessage(
			"A .csproj file or a Directory.Build.props file doesn't exist. Do you want to initialize instead?",
			'Yes', 'No'
		);
		if (overwrite !== 'Yes') {
			return;
		}
	}

	await generateProjectFiles(workspaceFolder);

	vscode.window.showInformationMessage('Project file updated successfully');
}


// Generates .csproj file in the first workspace folder.
async function generateProjectFiles(workspaceFolder: vscode.WorkspaceFolder) {

	const installPath = await getUiPathInstallPath();

	ensureCSharpExtensionIsInstalled();

	const packagePath = getPackagePath();

	const assemblies = getAvailableAssemblies(installPath);

	const projectFileData =  readUiPathProjectFile(workspaceFolder);

	const dependencies = getProjectDependencies(projectFileData);

	const buildFolder = createProjectBuildFolder(projectFileData.projectId, config.appDataFolderName);

	createProjectFile(
		getSettings().get(config.settingsNames.targetFramework, config.targetFrameworkDefaultValue),
		packagePath,
		dependencies,
		assemblies,
		buildFolder,
		path.join(workspaceFolder.uri.fsPath, config.projectFileName)
	);

	createBuildPropsFile(buildFolder, workspaceFolder);

	await buildCsProject(workspaceFolder, config.projectFileName);
}

async function remove() {
	const workspaceFolder = getFirstWorkspaceFolder();
	if (!workspaceFolder) {
		vscode.window.showErrorMessage('No workspace folder found');
		return;
	}
	
	const projectFileData = readUiPathProjectFile(workspaceFolder);
	const buildFolder = path.join(os.homedir(), 'AppData', 'Local', config.appDataFolderName, projectFileData.projectId);
	const projectFilePath = path.join(workspaceFolder.uri.fsPath, config.projectFileName);
	const buildPropsFilePath = path.join(workspaceFolder.uri.fsPath, 'Directory.Build.props');

	try {
		// fs.unlinkSync(buildFolder); does not seem to work
		fs.unlinkSync(projectFilePath);
		fs.unlinkSync(buildPropsFilePath);
	} catch (error) {
		vscode.window.showErrorMessage(`Error removing files: ${error}`);
	}
}








