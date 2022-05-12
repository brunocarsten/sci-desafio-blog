# Laravel 8 + Vue + Vuex

## Setup

### Dependências (php ^7.4)

-   gerar arquivo .env ( cp .env.example .env)
-   composer update
-   php artisan key:generate
-   php artisan jwt:secret

#

### Banco de Dados

-   Antes de executar o comando migrate, certificar que a base de dados foi criada em seu servidor.

-   As configuração do banco de dados são feitas no arquivo ".env" (Já deixei pre configurado para uma base local)

-   Execute "php artisan migrate" (Este comando cria as tabelas no banco)

-   Após criar as tabelas é necessário popular a base com o user padrão

-   execute "php artisan db:seed --class=UserSeeder"

#

### Webpack

-   yarn ou npm install (para instalar as dependências node)

### build

## IMPORTANTE

-   configure corretamente no arquivo .env a variável de ambiente "APP_URL="
-   Ex : se estiver rodando localmente, ela deve ficar assim "APP_URL=http://localhost:8000"
-   yarn dev ou npm run dev (compila arquivos js e css)
-   yarn production ou npm run production ( minifica os arquivos js e scss para produção )

#

### Servidor

-   Após finalizar todas as configurações acima, executar o comando "php artisan serve"
