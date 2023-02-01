const knex = require("../database/knex")//importa o knex que faz a conexão com o bd
const AppError = require("../utils/AppError")//importa o AppError
const { compare } = require("bcryptjs")//importa o compare para autenticar a senha
const authConfig = require("../configs/auth")//importa o config do jwt
const { sign } = require("jsonwebtoken")//importa o sign do jwt

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    //filtra o usuário pelo email
    const user = await knex("users").where({ email }).first()//tras o primeiro

    //verifica se o usuário existe
    if(!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    //compara a criptografia de senha para ver se a senha está correta
    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    const { secret, expiresIn } = authConfig.jwt//importa os dados do authConfig
    const token = sign({}, secret, {
      subject: String(user.id), //convertendo para texto o id
      expiresIn
    })
    
    return response.json({ user, token })
  }
}

module.exports = SessionsController