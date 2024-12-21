import * as vscode from 'vscode';
import config from '../const/config';

export default function getSettings() {
    const settings = vscode.workspace.getConfiguration(config.extensionId);
    return settings;
}