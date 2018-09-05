# NotificationService (notification-service)

### Sobre

Serviço com responsabilidade de centralizar e disparar notificações de diversos tipos para sistemas e plataformas que utilizam.

##### Tecnologias utilizadas

- Docker
- PHP 7 (php-fpm)
    - Lumen Framework
    - Eloquent ORM
    - PSR4, PSR7, ...
- Nginx
- Javascript
    - Node
    - VueJS + VueX + Vuetify
- Postgres

### Como inicializar a Stack?

**API + WebSocket + WebServer + WebAPP**
```sh
docker-compose up --build --force-recreate
```

### To-Do
- Frontend
    - [ ] notification-service
        - [ ] painel administrativo
            - [ ] notificacoes
                - [ ] enviar
                - [ ] listar
                - [ ] consultar
            - [ ] tipo_notificacao
                - [ ] consultar
                - [ ] listar
                - [ ] cadastrar
                - [ ] remover
            - [ ] plataforma
                - [ ] consultar
                - [ ] listar
                - [ ] cadastrar
                - [ ] remover
            - [ ] sistema
                - [ ] consultar
                - [ ] listar
                - [ ] cadastrar
                - [ ] remover
            - [ ] usuario
                - [ ] consultar
                - [ ] listar
                - [ ] cadastrar
                - [ ] remover
        - [ ] autenticacao
            - [ ] login (senha mestra temporariamente)
            * **consultando tabela de usuários**
    - [ ] salic-minc
        - [ ] Componente Sininho
            - [ ] observar WebSocket
            - [ ] exibir notificações
            - [ ] bloco de notificações não lidas
            - [ ] marcar notificação como lidas
            * **visualização de todas as notificações (link)**
- Backend
    - notification-service
        - [x] infra
            - [x] nginx
            - [x] php-fpm
            - [x] postgres
            - [x] websocket
        - [x] api
            - [x] usuario
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] plataforma
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] sistema
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] tipo_notificao
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] tipo_notificacao_has_plataforma
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] notificacoes
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            * **Authenticação**
            * **JWT**
            * **ACL**
    - salic-minc
        - [ ] notificação
            - [ ] enviar
- Database
    - [x] modelagem
    - [x] criação
    - [x] entry-point
    - [x] script com dados iniciais 

**OBS**: Itens com em **negrito** são sugestões para implementações futuras. 
