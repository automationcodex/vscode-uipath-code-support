import { XMLBuilder } from "fast-xml-parser";
import path from "path";
import DependencyInfo from "../types/dependency-info";
import AssemblyInfo from "../types/assembly-info";
import fs from "fs";

export default function createProjectFile(
    targetFramework: string,
    packagePath: string,
    dependencies: DependencyInfo[],
    assemblies: AssemblyInfo[],
    buildFolderPath: string,
    projectFilePath: string
) {
    const fileContent = {
        Project: {
            '@_Sdk': 'Microsoft.NET.Sdk',
            PropertyGroup: {
                OutputType: 'Library',
                TargetFramework: targetFramework,
                RestoreSources: `$(RestoreSources);${packagePath}`,
                OutputPath: `${path.join(buildFolderPath, "bin")}`,
            },
            ItemGroup: {
                Compile: [
                    {
                        '@_Include': ".local/**/*.cs",
                    },
                    {
                        '@_Include': ".codedworkflows/**/*.cs",
                    },
                ],
                Reference: assemblies.map(assembly => ({
                    '@_Include': path.basename(assembly.name, '.dll'),
                    HintPath: assembly.path,
                })),
                PackageReference: dependencies.map((dependency) => ({
                    '@_Include': dependency.name,
                    '@_Version': dependency.version,
                }))
            }
        }
    };

    const builder = new XMLBuilder({ ignoreAttributes: false, indentBy: '  ', format: true });
    const xmlCode = builder.build(fileContent);

    fs.writeFileSync(projectFilePath, xmlCode);
}