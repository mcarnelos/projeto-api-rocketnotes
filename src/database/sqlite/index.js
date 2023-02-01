//importando os bancos de dados
const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path") //o path resolve os endereços de acordo com o ambiente

//criando função assíncrona, se o arquivo do bd existir ele vai se conectar, caso o arquivo do bd 
//não exista ele é criado automaticamente
async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"), //(puxa o local que está no projeto, volta uma pasta, cria o arquivo novo)
    driver: sqlite3.Database //conexão com o database
  })

  return database
}

module.exports = sqliteConnection