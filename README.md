# DOAFACIL

#### Como Instalar

1. Copiar e colar `docker-compose.exemplo` para `docker-compose.yml`

2. Descomente as seguintes linhas:

   ```
   sh -c 'npm i && npm run serve'
   - UPDATE_COMPOSER_DEPENDENCIES=true
   ```

3. Comente a linha

   ```
   sh -c 'npm run serve'
   ```

4.  Execute o comando `docker-compose up`

5. Aguarde ate terminar de criar os container e configura-los **(Isso levara muito tempo)*

6. Logo apos de finalizar iremos derrubar os container com `Ctrl+c`

7. Comente as linhas:

   ```
   sh -c 'npm i && npm run serve'
   - UPDATE_COMPOSER_DEPENDENCIES=true
   ```

8. Descomente a linha

   ```
   sh -c 'npm run serve'
   ```

9. Pronto, basta executar o comando `docker-compose up` para subir todos os containers

10. Agora temos que terminar algumas configuracoes do JWT e da APP_KEY da API

11. Na pasta **webapp** iremos copiar o arquivo `.example_env` para `.env`

12. Na pasta **api** o arquivo `.env` esta com o campo `APP_KEY= ` vazio. Iremos entrar dentro do container para gerar uma chave para o projeto.

13. Execute os seguintes comandos

    ```
    docker exec -it app-api /bin/bash
    php artisan key:generate
    ```

14. Logo apos de finalizar iremos derrubar os container com `Ctrl+c` e subi-los novamente

15. `docker-compose up`

16. Pronto agora o projeto ja esta configurado e pronto para ser desenvolvido novas funcionalidades

