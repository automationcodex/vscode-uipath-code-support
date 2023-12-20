import defaultUipathNamespaces from "../const/default-uipath-namespaces";
import fs from 'fs';
import path from 'path';
import AssemblyInfo from "../types/assembly-info";

export default function getAvailableAssemblies(installPath: string) : AssemblyInfo[] {
    const foundAssemblies: AssemblyInfo[] = [];
    const namespaces = defaultUipathNamespaces;

    for (const namespace of namespaces) {
        const assemblyFileName = `${namespace}.dll`;
        const lookupPaths = [
            path.join(installPath, assemblyFileName),
            path.join(installPath, 'refs', assemblyFileName),
        ];

        for (const lookupPath of lookupPaths) {
            if (fs.existsSync(lookupPath)) {
                foundAssemblies.push({
                    name: namespace,
                    path: lookupPath,
                });
                break;
            }
        }
    }

    return foundAssemblies;
}
    

