const { hash } = require("bcryptjs")
//importando AppError
const AppError = require("../utils/AppError")

class UserCreateService {
    constructor(userRepository) {
      this.userRepository = userRepository
    }

  async execute({ name, email, password }) {
    
    const checkUserExists = await this.userRepository.findByEmail(email) //verifica se o email já existe

    //caso ja exista o email
    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso.")      
    }

    //criptografa a senha 
    const hashedPassword = await hash(password, 8)

    //cria o usuário no bd
    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })

    return userCreated
  }
}

module.exports = UserCreateService