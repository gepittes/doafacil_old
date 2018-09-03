# notification-service


### To-Do
- Frontend
    - [ ] notification-service
        - [ ] painel administrativo
            - [ ] notificacoes
                - [ ] enviar
                - [ ] listar
                - [ ] consultar
            - [ ] tipo_notificao
                - [ ] consultar
                - [ ] listar
                - [ ] cadastrar
                - [ ] remover
            * plataforma
            * sistema
            * usuario
        - [ ] autenticacao
            - [ ] login (senha mestra temporariamente)
            * consultando tabela de usuários
    - [ ] salic-minc
        - [ ] Componente Sininho
            - [ ] observar WebSocket
            - [ ] exibir notificações
            - [ ] bloco de notificações não lidas
            - [ ] marcar notificação como lidas
            * visualização de todas as notificações (link)
- Backend
    - notification-service
        - [x] infra
            - [x] nginx
            - [x] php-fpm
            - [x] postgres
            - [x] websocket
        - [ ] api
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
            - [ ] tipo_notificacao_has_plataforma
                - [ ] consultar ( getOne && getAll )
                - [ ] cadastrar
                - [ ] alterar
                - [ ] remover
            - [ ] notificacoes
                - [ ] consultar ( getOne && getAll )
                - [ ] cadastrar
                - [ ] alterar
                - [ ] remover
            * Authenticação
            * JWT
            * ACL
    - salic-minc
        - [ ] notificação
            - [ ] enviar
- Database
    - [x] modelagem
    - [x] criação
    - [x] entry-point
    - [ ] script com dados iniciais
    

**OBS: Itens com `*` são sugestões para implementações futuras**    

**API**
```sh
php -S localhost:8080 -t public
```

**WebSocket**
```sh
php api/app/Websocket/bin/socket.php
```

**Web**
```sh
cd web
npm run serve
```

**Docker**
```sh
docker-compose up --build --force-recreate
```