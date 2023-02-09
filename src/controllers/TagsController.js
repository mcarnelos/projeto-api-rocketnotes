const knex = require("../database/knex")

class TagsController {
  async index(request, response) {
    const user_id = request.user.id //busca o id

    //fazendo busca na tabela tags onde seja igual ao user_id
    const tags = await knex("tags")
    .where({ user_id })
    .groupBy("name") //agrupa pelo nome e evita que apareçam nomes repetidos

    return response.json(tags)
  }
}

module.exports = TagsController