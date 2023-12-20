import * as vscode from 'vscode';

export async function ensureCSharpExtensionIsInstalled() {
	const csharpExtensionId = 'ms-dotnettools.csharp';
	const csharpExtension = vscode.extensions.getExtension(csharpExtensionId);

	if (!csharpExtension) {
		const action = await vscode.window.showInformationMessage(
			'The C# extension is required. Would you like to install it now?',
			'Install', 'Cancel'
		);

		if (action === 'Install') {
			await vscode.commands.executeCommand('workbench.extensions.installExtension', csharpExtensionId);
			vscode.window.showInformationMessage('C# extension has been installed.');
		} else {
			throw new Error('C# extension installation was cancelled.');
		}
	} else if (!csharpExtension.isActive) {
		await csharpExtension.activate();
	}
}