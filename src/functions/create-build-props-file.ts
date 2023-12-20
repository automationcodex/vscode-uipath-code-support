import { XMLBuilder } from "fast-xml-parser";
import path from "path";
import fs from "fs";
import * as vscode from 'vscode';

export default function createBuildPropsFile(
    buildFolderPath: string,
    destinationFolder: vscode.WorkspaceFolder,
) {
    const fileContent = {
        Project: {
            PropertyGroup: {
                BaseIntermediateOutputPath: `${path.join(buildFolderPath, "obj")}`,
                RestoreOutputPath: `$(BaseIntermediateOutputPath)`,
                MSBuildProjectExtensionsPath: `$(BaseIntermediateOutputPath)`,
            },
        },
    };

    const builder = new XMLBuilder({ ignoreAttributes: false, indentBy: '  ', format: true });
    const xmlCode = builder.build(fileContent);

    const buildPropsFilePath = path.join(destinationFolder.uri.fsPath, 'Directory.Build.props');

    fs.writeFileSync(buildPropsFilePath, xmlCode);
} 