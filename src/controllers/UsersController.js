//importando hash que faz a criptografia
const { hash, compare } = require("bcryptjs")
//importando AppError
const AppError = require("../utils/AppError")

const UserRepository = require("../repositories/UserRepository")
//importando sqlite
const sqliteConnection = require("../database/sqlite")
const UserCreateService = require("../services/UserCreateService")

//criando os métodos 
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body //pega nome, email e senha

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password })

    //caso não exista retorna 201 e um json vazio
    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])//busca o usuário pelo id

    //se não existir
    if(!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)", [email]//busca o usuário pelo email
    )

    //verifica se está tentando atualizar para um email que ja existe
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.")
    }

    //se passar pelos ifs ele atualiza os dados
    user.name = name ?? user.name //caso exista conteúdo em name ele pega senão pega o conteúdo de user.name
    user.email = email ?? user.email //caso exista conteúdo em email ele pega senão pega o conteúdo de user.email

    //verifica se foram digitados a senha e a nova senha
    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
    }

    //caso as duas senhas tenham sido informados, vai fazer a verificação se a senha antiga 
    //é a mesma que ja estava cadastrada
    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      //se for falso
      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      //executando a atualização
      user.password = await hash(password, 8)
    }

    //rodando o update
    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
      )

      return response.json()

  }
}
module.exports = UsersController