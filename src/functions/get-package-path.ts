import os from 'os';
import path from 'path';

export default function getPackagePath(): string {
    return path.join(os.homedir(), '.nuget', 'packages');
}