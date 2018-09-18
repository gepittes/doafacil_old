# notification-api

Módulo responsável por fornecer a API da aplicação.

### 1. JSON Web Tokens(JWT)

Os JSON Web Tokens são um método RFC 7519 padrão da indústria aberto para representar declarações com segurança entre duas partes

Neste projeto para auxiliar no fornecimento do JWT foi utilizada a biblioteca `firebase/php-jwt`. 
A dependência mencionada está localizada no arquivo `composer.json`.

A implementação dela é feita principalmente na classe `\App\Http\Controllers\AutenticacaoController`.

### 2. Autentica&ccedil;&atilde;o 

#### 2.1. JWT

Para que seja possível autenticar na API é necess&aacute;rio enviar uma requisição do tipo **POST** para o endere&ccedil;o abaixo:
`http://localhost/v1/autenticacao/login`

Caso a autenticação seja realizada com sucesso será obtido como resultado uma Token, conforme imagem abaixo:

![Autenticacao + JWT](public/JWT_Autenticacao_Post.png?raw=true "Autenticacao + JWT")
 
Caso a token não seja informada:

![Autenticacao + JWT](public/JWT_GET_nao_recebida.png?raw=true "Autenticacao + JWT")

Obtenção de dados informando token:

![Autenticacao + JWT](public/JWT_GET.png?raw=true "Autenticacao + JWT")


#### 2.2. Middleware

Middleware é um recurso que permite filtrar requisições e respostas HTTP da aplicação.

Para mapear as requisições de entrada para rotas específicas, foi criado o Middleware `\App\Http\Middleware\JWTMiddleware.php`.
A classe tem como responsabilidade validar os itens abaixo :
 - Token existente;
 - Token válida;
 - Tempo de expiração da Token;

A definição do Middleware para authenticação foi definido no arquivo `bootstrap/app.php` na seguinte linha:

```php
$app->routeMiddleware([
    'jwt.auth' => \App\Http\Middleware\JWTMiddleware::class
]);
```

#### 2.3. JSON Style Guide

Foi padronizado como formato de estilo padrão do retorno da api o [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml
).

Para que o padrão pudesse sem implementado, foi criado um Middleware `App\Http\Middleware\JsonResponseStyle` que tem 
como responsabilidade interceptar as respostas dos controladores e agrupar suas respotas em padrões definidos pelo Style 
Guide.

Para tratar comportamentos inesperados e para que não seja retornado pela api foi criada a Exception 
`App\Exceptions\JsonResponseExceptionHandler` que tem como responsebilidade receber os erros enviados do Controlador 
para o Middleware `App\Http\Middleware\JsonResponseStyle`.

### 3. Comandos

```shell
$ docker exec -it notification-api php artisan migrate
$ docker exec -it notification-api php artisan db:seed
```

### 4. Helpers
```shell
$ docker exec -it notification-api php artisan wn:controller AuthController --api
```

### 5. @todos - Recentes
- [x] Adicionar Middleware para JWT
- [ ] Criar, vincular e registrar, Migration, Seeds e Factory para:
    - [x] Usuario
        - [x] Migration
        - [x] Factory
        - [x] UsuarioTableSeed
        - [x] DatabaseSeeder
    - [ ] Plataforma
        - [ ] Migration
        - [ ] Factory
        - [ ] UsuarioTableSeed
        - [ ] DatabaseSeeder
    - [ ] Sistema
        - [ ] Migration
        - [ ] Factory
        - [ ] UsuarioTableSeed
        - [ ] DatabaseSeeder
    - [ ] Tipo de Notificacao
        - [ ] Migration
        - [ ] Factory
        - [ ] UsuarioTableSeed
        - [ ] DatabaseSeeder
    - [ ] Tipo de Notificacao x Plataforma
        - [ ] Migration
        - [ ] Factory
        - [ ] UsuarioTableSeed
        - [ ] DatabaseSeeder
    - [ ] Notificacao x Plataforma
        - [ ] Migration
        - [ ] Factory
        - [ ] UsuarioTableSeed
        - [ ] DatabaseSeeder
- [ ] Migrar todas as definições de classe, chamadas e vínculos de `TipoPlataforma` para `Mensagem`
- [ ] Adicionar testes
    - [ ] ...
    
**OBS - Migrations : As migrations são executadas em ordem de timestamps do nome dos arquivos do diretório `database/migrations/*.php` .**
