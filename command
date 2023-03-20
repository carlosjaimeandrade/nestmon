https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm
npx @nestjs/cli new nest-shopping-list
nest g controller  

--helper  (veja os comandos que você pode usar)
--dry-run (verifica como ficaria a estrutura)
--no-spec (ele não cria o arquivo de test)


app.useGlobalPipes(new ValidationPipe()) e adicionado no main do projeto, serve para validar os dados que estamos recebendo nas requisição
npm i class-validator class-transformer
npm i typeorm @nestjs/typeorm pg

build
npm run build


migration
Sempre bom rodar um Build antes
npx typeorm migration:create  ./src/migrations/CourseRefatoring // na nova versão deve ser passado o caminho completo
npx typeorm migration:revert
npx typeorm migration:run -d <caminho do data sorce dis/database.providers.js>


testes
npm test -- courses.service.spec  
npm run test:e2e

Execute
nest start --watch