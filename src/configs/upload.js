//configurações utilizadas no upload
const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")//arquivo temporário
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")//arquivo de uploads

//configurações do multer onde vai armazenar os uploads
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex")//garante que cada arquivo tenha um nome único sem repetições
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}

