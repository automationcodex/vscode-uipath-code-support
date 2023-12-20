

export default interface UiPathProjectFile {
  name: string;
  projectId: string;
  description: string;
  main: string;
  dependencies: { [key: string]: string };
  webServices: any[];
  entitiesStores: any[];
  schemaVersion: string;
  studioVersion: string;
  projectVersion: string;
  runtimeOptions: RuntimeOptions;
  designOptions: DesignOptions;
  expressionLanguage: string;
  entryPoints: EntryPoint[];
  isTemplate: boolean;
  templateProjectData: any;
  publishData: any;
  targetFramework: string;
}

interface RuntimeOptions {
  autoDispose: boolean;
  netFrameworkLazyLoading: boolean;
  isPausable: boolean;
  isAttended: boolean;
  requiresUserInteraction: boolean;
  supportsPersistence: boolean;
  workflowSerialization: string;
  excludedLoggedData: string[];
  executionType: string;
  readyForPiP: boolean;
  startsInPiP: boolean;
  mustRestoreAllDependencies: boolean;
  pipType: string;
}

interface DesignOptions {
  projectProfile: string;
  outputType: string;
  libraryOptions: LibraryOptions;
  processOptions: ProcessOptions;
  fileInfoCollection: any[];
  modernBehavior: boolean;
  saveToCloud: boolean;
}

interface LibraryOptions {
  includeOriginalXaml: boolean;
  privateWorkflows: any[];
}

interface ProcessOptions {
  ignoredFiles: any[];
}

interface EntryPoint {
  filePath: string;
  uniqueId: string;
  input: any[];
  output: any[];
}

