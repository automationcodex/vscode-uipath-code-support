import Registry  from 'winreg';


export default async function getUiPathInstallPath(): Promise<string | undefined> {
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