const { verify } = require("jsonwebtoken")//importa o verify q é uma função do jwt
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

//função que verifica o token
function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization

  //verifica se o token não existe
  if(!authHeader){
    throw new AppError("JWT Token não informado", 401) 
  }

  //caso exista, usa o split para quebrar a String e pegar o token
  const [, token] = authHeader.split(" ")

  //verifica se o token é válido
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)
    
    //transforma o token em numero
    request.user = {
      id: Number(user_id),
    }

    //chama a próxima função
    return next()
  }catch {
    throw new AppError("JWT Token inválido", 401) 
  }
}

module.exports = ensureAuthenticated