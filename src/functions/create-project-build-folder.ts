import path from "path";
import os from "os";
import fs from "fs";

export function createProjectBuildFolder(projectId: string, appDataFolderName: string): string {
	const buildFolderPath = path.join(os.homedir(), 'AppData', 'Local', appDataFolderName, projectId);
	try {
		fs.mkdirSync(buildFolderPath, { recursive: true });
		return buildFolderPath;
	} catch (error) {
		throw new Error(`Error creating build folder: ${error}`);
	}
}