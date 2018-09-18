# notification-api

```shell
$ docker exec -it notification-api php artisan migrate
$ docker exec -it notification-api php artisan db:seed
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
