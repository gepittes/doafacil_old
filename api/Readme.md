# notification-api

Módulo responsável por fornecer a API da aplicação.

### JSON Web Tokens(JWT)

Os JSON Web Tokens são um método RFC 7519 padrão da indústria aberto para representar declarações com segurança entre duas partes

Neste projeto para auxiliar no fornecimento do JWT foi utilizada a biblioteca `firebase/php-jwt`. 
A dependência mencionada está localizada no arquivo `composer.json`.

A implementação dela é feita principalmente na classe `\App\Http\Controllers\AutenticacaoController`.

### Autentica&ccedil;&atilde;o + JWT

Para que seja possível autenticar na API é necess&aacute;rio enviar uma requisição do tipo **POST** para o endere&ccedil;o abaixo:
`http://localhost/v1/autenticacao/login`

Caso a autenticação seja realizada com sucesso será obtido como resultado uma Token, conforme imagem abaixo:

 ![Alt text](public/JWT_Post.png?raw=true "Autenticacao + JWT")

### Comandos

```shell
$ docker exec -it notification-api php artisan migrate
$ docker exec -it notification-api php artisan db:seed
```

### Helpers
```shell
$ docker exec -it notification-api php artisan wn:controller AuthController --api
```

### @todo
- [ ] Migrar todas as definições de classe, chamadas e vínculos de `TipoPlataforma` para `Mensagem`
- [ ] Criar, vincular e registrar, Migration, Seeds e Factory para:
    - [x] Usuario
        - [x] Migration
        - [x] Factory
        - [x] UsuarioTableSeed
        - [x] DatabaseSeeder
    - [ ] Plataforma
        - [] Migration
        - [] Factory
        - [] UsuarioTableSeed
        - [] DatabaseSeeder
    - [ ] Sistema
        - [] Migration
        - [] Factory
        - [] UsuarioTableSeed
        - [] DatabaseSeeder
    - [ ] Tipo de Notificacao
        - [] Migration
        - [] Factory
        - [] UsuarioTableSeed
        - [] DatabaseSeeder
    - [ ] Tipo de Notificacao x Plataforma
        - [] Migration
        - [] Factory
        - [] UsuarioTableSeed
        - [] DatabaseSeeder
    - [ ] Notificacao x Plataforma
        - [] Migration
        - [] Factory
        - [] UsuarioTableSeed
        - [] DatabaseSeeder
- [ ] Adicionar Middleware para JWT
- [ ] Adicionar testes
    - [ ] ...
**OBS - Migrations : As migrations são executadas em ordem de timestamps do nome dos arquivos do diretório `database/migrations/*.php` .**
