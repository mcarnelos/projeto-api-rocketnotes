//importando sqliteConnection
const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

//função para rodar o migrations
async function migrationsRun(){
  const schemas = [ //os schemas vão armazenar as tabelas e o join com '' diz que não terá nada separando cada tabela
    createUsers
  ].join('')

  sqliteConnection()
    .then(db => db.exec(schemas)) //executa os schemas
    .catch(error => console.error(error)) //trata o erro
}

module.exports = migrationsRun