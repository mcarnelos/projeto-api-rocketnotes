//classe que configura as manipulações do bd
//importando sqlite
const sqliteConnection = require("../database/sqlite")

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection() //faz a conexão com o BD
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //verifica se o email já existe

      return user
  }

  //criando usuário
  async create({ name, email, password }) {
    const database = await sqliteConnection() //faz a conexão com o BD
    //executa o insert
    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    )
      return { id: userId }
  }
}

module.exports = UserRepository