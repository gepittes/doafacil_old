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
            * visualização de notas as notificações (link)
- Backend
    - notification-service
        - [ ] infra (containers nginx + php-fpm)
        - [ ] api
            - [ ] notificacoes
                - [ ] consultar ( getOne && getAll )
                - [ ] cadastrar
                - [ ] alterar
                - [ ] remover
            - [ ] tipo_notificao
                - [ ] consultar ( getOne && getAll )
                - [ ] cadastrar
                - [ ] alterar
                - [ ] remover
    - salic-minc
        - [ ] notificação
            - [ ] enviar
- Database
    - [ ] modelagem
    - [ ] criação
    * entry-point

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