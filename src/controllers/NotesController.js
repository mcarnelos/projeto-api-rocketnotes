//importando o knex
const knex = require("../database/knex")

class NotesController {
  async create(request, response){
    const { title, description, tags, links } = request.body //puxa pelo body da requisição
    const user_id = request.user.id

    //criando o insert
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })
    
    //criando um objeto que retorna note_id e mudando de link para url
    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    //passando os links que serão inseridos
    await knex("links").insert(linksInsert)

    //criando um objeto que retorna note_id, name e user_id
    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

     //passando as tags que serão inseridas
    await knex("tags").insert(tagsInsert)

    return response.json()

  }

  async show(request, response) {
    const { id } = request.params

    const note = await knex("notes").where({ id }).first() //busca a primeira nota
    const tags = await knex("tags").where({ note_id: id }).orderBy("name") //busca a tag pelo id ordenado pelo nome
    const links = await knex("links").where({ note_id: id }).orderBy("created_at") //busca o link pelo id ordenado pela criação


    return response.json({
      ...note, //busca tudo que tem no note
      tags,
      links
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("notes").where({ id }).delete()

    return response.json()
  }

  //método responsável por listar
  async index(request, response) {
    const { title, tags } = request.query

    const user_id = request.user.id//filtra notas por id

    //busca pela tag, caso não encontre faz a pesquisa normal
    let notes

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())//convertendo texto em array usando como delimitador a ','
      
      //buscando utilizando inner join
      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id") //tabela, coluna da tabela, coluna da outra tabela
        .groupBy("notes.id") //não traz notas repetidas
        .orderBy("notes.title")
    } else {

    notes = await knex("notes")
    .where({ user_id })
    .whereLike("title", `%${title}%`) //busca títulos que contenham a palavra digitada
    .orderBy("title")
    }

    //busca as tags onde for igual ao user_id
    const userTags = await knex("tags").where({ user_id})
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id) //filtrando tag com a nota

      return {
        ...note,
        tags: noteTags
      }
    })


    return response.json(notesWithTags)
  }

}

module.exports = NotesController