//padronizando a mensagem de erro
class AppError {
  //variáveis globais
  message
  statusCode

  //método construtor
  constructor(message, statusCode = 400){
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError