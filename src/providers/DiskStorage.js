const fs = require("fs")//cuida da manipulação de arquivos
const path = require("path")//cuida dos diretórios
const uploadConfig = require("../configs/upload")

//classe que define o armazenamento, salvar e deletar arquivos
class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(//o arquivo primeiro fica salvo no tmp e depois é salvo no uploads, o rename é usado para renomear ou mover o arquivo
      path.resolve(uploadConfig.TMP_FOLDER, file),//onde o arquivo está
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)//onde eu quero salvar o arquivo
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)//stat retorna o status do arquivo
    }catch {
      return
    }

    await fs.promises.unlink(filePath)//unlink remove o arquivo
  }
}

module.exports = DiskStorage