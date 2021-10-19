##NLW Heat

. Iniciar projeto com Yarn
    yarn init -y

- Instalar o Express para gerenciamento de requisições
    yarn add express

- Instalar como dependencia de desenvolvimento
    **@types/express**  - Tipagens do Express, para que o Typescript entenda
    **ts-node-dev**     - realiza um auto-reload da aplicação (Gulp Watch) e compila para um formato que o node interprete os arquivos
    yarn add -D @types/express typescript ts-node-dev 

- Cria o arquivo de configuração padrão do Typescript
    yarn tsc --init

- Instalar o Prisma.io como dependencia de desenvolvimento - Como se fosse um ORM para DB
    https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres
    yarn add -D prisma

- Gerar arquivo de configuração Prisma: .env e DIR prisma com as configurações de conexões e tabelas do db
    yarn prisma init

- Criar credenciais Github OAuth
    https://github.com/settings/developers


- Instalar a dependencia para uso do **process.env** (Variáveis de ambiente)
    yarn add dotenv

- Instalar dependencia jsonwebtoken para criação de tokens
    yarn add jsonwebtoken
    yarn add -D @types/jsonwebtoken




**Prisma**
    - Executa a criação das migrations do Prisma
        yarn prisma migrate dev

    - Exibe interface de dados do Prisma (Como se fosse um básico de PHPMyadmin, DBeaver)
        yarn prisma studio

**SocketIO**
    - Instalação
        yarn add socket.io

    - Tipagem
        yarn add -D @types/socket.io

**Cors**
    Responsável por filtrar as requisições da aplicação, permitindo ou bloqueando o acesso

    - Instalação
        yarn add cors

    - Tipagem
        yarn add -D @types/cors
