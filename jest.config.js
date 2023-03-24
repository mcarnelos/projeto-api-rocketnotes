module.exports = {
  bail: true, //se um teste falhar ele para a execução
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js" //padrão de arquivos de teste da aplicação, vai buscar por arquivos de teste dentro da pasta src
  ],
}
