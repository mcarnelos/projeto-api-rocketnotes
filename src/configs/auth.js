//configurando o token
module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    expiresIn: "1d" //expira em 1 dia
  }
}