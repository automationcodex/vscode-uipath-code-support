import DependencyInfo from "../types/dependency-info";
import UiPathProjectFile from "../types/uipath-project-file";

export default function getProjectDependencies(uiPathProjectFile : UiPathProjectFile) : DependencyInfo[] {
    return Object.entries(uiPathProjectFile.dependencies).map(([name, version]) => {
        return {
            name,
            // version format [1.0.0] => 1.0.0
            version: version.substring(1, version.length - 1),
        };
    });
}