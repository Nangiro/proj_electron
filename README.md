# Projeto Electron.js com Docker Compose

Este é um projeto que combina a tecnologia Electron.js para a parte do cliente (frontend) e Docker Compose para a parte do servidor (backend). Ele permite que você desenvolva e execute facilmente uma aplicação desktop usando Electron.js, enquanto utiliza Docker Compose para gerenciar os serviços do backend.

## Pré-requisitos

- Docker
- Node.js (para construir o aplicativo Electron)

## Configuração

1. Clone este repositório para o seu ambiente de desenvolvimento:

    ```bash
    git clone https://github.com/Nangiro/proj_electron.git
    ```

## Como usar

### Executar o servidor (backend) com Docker Compose

Certifique-se de que o Docker esteja em execução e, em seguida, execute o seguinte comando para iniciar o servidor com Docker Compose:
```bash
cd backend
docker compose up -d
```

Isso iniciará os serviços definidos no arquivo `docker-compose.yml`, como banco de dados, servidor API, etc.

### Construir e executar o aplicativo Electron (frontend)

Após iniciar o servidor com Docker Compose, abra um novo terminal e navegue até o diretório do projeto. Em seguida, execute o seguinte comando para construir e executar o aplicativo Electron:

```bash
cd ..
cd front
npm install
npm run build
cd release/0.0.0/
```

Isso irá compilar o aplicativo Electron e iniciar a aplicação desktop. Ele se conectará aos serviços fornecidos pelo servidor em execução com Docker Compose.

## Testes
Vá para a raiz do projeto e execute os comandos a seguir
```bash
cd backend
npm run test
```

Serão realizados os seguintes testes:
- Rota de login com usuário válido.
- Rota de login com usuario invalido.
- Rota de usuario sem token.
- Rota de usuario com token válido.
- Rota de usuário com token invalido.
