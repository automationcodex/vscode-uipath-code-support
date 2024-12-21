import Registry  from 'winreg';
import getSettings from './get-settings';
import fs from 'fs';
import config from '../const/config';

async function getUiPathInstallPathFromRegistry(): Promise<string | undefined> {
    const uiPathRegKey = new Registry({
        hive: Registry.HKLM,
        key: '\\SOFTWARE\\UiPath\\UiPath Studio'
    });

    return new Promise<string | undefined>((resolve, reject) => {
        uiPathRegKey.values((err, items) => {
            if (err) {
                reject(err);
            }

            const installPath = items.find(item => item.name === 'InstallDir');

            if (!installPath) {
                resolve(undefined);
                return;
            }

            resolve(installPath.value);
        });
    });
}

function getUiPathInstallPathFromSettings(): string {
    const folder = getSettings().get(config.settingsNames.uipathInstallationFolder, '');
    return folder;
}

export default async function getUiPathInstallPath(): Promise<string> {
    let installPath: string | undefined;
    if (getSettings().get(config.settingsNames.useCustomUipathInstallationFolder, false)) {
        installPath = getUiPathInstallPathFromSettings();
        if (!installPath) {
            throw new Error('Custom UiPath installation folder not set');
        }
        if (!fs.existsSync(installPath)) {
            throw new Error(`The custom UiPath installation folder "${installPath}" does not exist`);
        }
    } else {
        try {
            installPath = await getUiPathInstallPathFromRegistry();
        } catch (error) {}
        if (!installPath) {
            throw new Error(`Could not retrieve the UiPath installation folder from the registry, try setting it manually using the "${config.settingsNames.useCustomUipathInstallationFolder}" & "${config.settingsNames.uipathInstallationFolder}" settings`);
        }
        if (!fs.existsSync(installPath)) {
            throw new Error(`The UiPath installation folder "${installPath}" found in the registry does not exist, try setting it manually using the "${config.settingsNames.useCustomUipathInstallationFolder}" & "${config.settingsNames.uipathInstallationFolder}" settings`);
        }
    }
    return installPath;
}