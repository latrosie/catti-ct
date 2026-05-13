// yes this is vibecoded :(

const URL = Java.type("java.net.URL");
const ZipInputStream = Java.type("java.util.zip.ZipInputStream");
const File = Java.type("java.io.File");
const FileOutputStream = Java.type("java.io.FileOutputStream");
const Byte = Java.type("java.lang.Byte");
const JavaArray = Java.type("java.lang.reflect.Array");

function check_to_update() {
  new Thread(() => {
    try {
      const remoteMetaRaw = FileLib.getUrlContent("https://raw.githubusercontent.com/latrosie/catti-ct/main/metadata.json");
      const remoteVersion = JSON.parse(remoteMetaRaw).version;

      const localVersion = JSON.parse(FileLib.read('Catti', "metadata.json")).version;
      if (remoteVersion !== localVersion) {
        ChatLib.chat(`&6[Updater] &aNew version found: &v${remoteVersion} &7(Current: ${localVersion})`);
        update_module();
      } else {
        ChatLib.chat("&6[Updater] &7You are already on the latest version.");
      }
    } catch (e) {
      ChatLib.chat("&6[Updater] &cFailed to check for updates: " + e);
    }
  }).start();
}

function update_module() {
  try {
    const url = new URL("https://github.com/latrosie/catti-ct/archive/refs/heads/main.zip");
    const zipStream = new ZipInputStream(url.openStream());
    let entry;

    const moduleDir = new File('config/ChatTriggers/modules/Catti');
    const tempDir = new File('config/ChatTriggers/modules/Catti_temp');

    if (tempDir.exists()) FileLib.deleteDirectory(tempDir);
    tempDir.mkdirs();

    while ((entry = zipStream.getNextEntry()) !== null) {
      let entryName = entry.getName();
      let parts = entryName.split("/");
      parts.shift();
      let internalPath = parts.join("/");

      if (internalPath === "") continue;

      let targetFile = new File(tempDir, internalPath);

      if (entry.isDirectory()) {
        targetFile.mkdirs();
      } else {
        targetFile.getParentFile().mkdirs();

        let outStream = new FileOutputStream(targetFile);
        let buffer = Array.newInstance(Byte.TYPE, 4096);
        let len;
        while ((len = zipStream.read(buffer)) > 0) {
          outStream.write(buffer, 0, len);
        }
        outStream.close();
      }
      zipStream.closeEntry();
    }
    zipStream.close();

    FileLib.deleteDirectory(moduleDir);
    const success = tempDir.renameTo(moduleDir);

    if (success) {
      ChatLib.chat("[Catti] Successfully updated! Reloading...");
      Thread.sleep(500);
      ChatLib.command("ct reload", true);
    } else {
      ChatLib.chat("[Catti] Update failed. Manual fix may be required...");
    }
  } catch (e) {
    ChatLib.chat("[CATTI] an error occured while updating. check ur console");
    console.log("UPDATING ERROR\n" + e);
  }
}

ChatLib.chat('me loaded');

register('command', () => {
  check_to_update();
}).setName('updatecatti');
