// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
//importando o path
const path = require("path")

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },

    //para deletar em cascata essa funcionalidade deve estar habilitada
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    //define onde será armazenada a migration
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },

};
