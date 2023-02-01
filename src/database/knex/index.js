//importando config e knex
const config = require("../../../knexfile")
const knex = require("knex")

//criando a conexão do knex com o bd
const connection = knex(config.development)

module.exports = connection