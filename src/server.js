require("express-async-errors")
require("dotenv/config")
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")//importando AppError 
const uploadConfig = require("./configs/upload")

const cors = require("cors")
const express = require("express") //traz os recursos do express para o projeto
const routes = require("./routes") //traz as rotas q estão no index

migrationsRun() //executa o BD

const app = express() //inicializa o express
app.use(cors())//inicializa o cors para que o back-end atenda as requisições do front-end
app.use(express.json()) //mostra que o formato das requisições será o Json

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))//busca os arquivos na pasta de uploads

app.use(routes) 


//tratamento de exceções de erro gerado pelo cliente
app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error) //mostra o erro no console pra ficar mais fácil de debugar

  //caso não seja erro do cliente retorna esse erro padrão
  return response.status(500).json({
    status: "error",
    message: "Internal Server error"
  })
})

app.get("/", (req, res) => {
  return res.json({"message": "OK"});
})

const PORT = process.env.PORT || 3333 //define a porta que a api vai utilizar
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) //fica aguardando e quando a api iniciar lança a msg



