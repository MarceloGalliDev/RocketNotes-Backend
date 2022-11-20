const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )//rename usamos para mover o arquivo de lugar

        return file;
    }

    async deleteFile(file) {
        const filePa 
    }
}