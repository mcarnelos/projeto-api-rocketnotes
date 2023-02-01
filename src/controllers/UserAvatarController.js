//classe para atualizar o avatar do usuário
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
  async update(request, response){
    const user_id = request.user.id//pega o usuário
    const avatarFilename = request.file.filename//pega o nome do arquivo que foi upado

    const diskStorage = new DiskStorage()

    //buscando o usuário no bd
    const user = await knex("users")
      .where({ id: user_id }).first()

      //verifica se o usuário existe
      if(!user) {
        throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
      }

      //verifica se já existe uma foto de avatar, caso exista deleta a antiga
      if(user.avatar) {
        await diskStorage.deleteFile(user.avatar)
      }

      //caso não exista
      const filename = await diskStorage.saveFile(avatarFilename)
      user.avatar = filename

    //salvando o avatar atualizado
    await knex("users").update(user).where({ id: user_id })

    return response.json(user)

  }
}

module.exports = UserAvatarController