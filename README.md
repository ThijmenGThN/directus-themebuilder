
# next-leaflet

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.

<b>Looking for the [(directus)](https://github.com/ThijmenGThN/next-directus) branch?</b>

![preview](https://i.imgur.com/uNKXhM7.png)

<b>For now; next-leaflet is deemed to be stable, but usage in a production environment is not suggested.</b>

<b>Use at your own discretion!</b>

# Features

- User authorization [(nextauth)](https://next-auth.js.org/)
    - Credentials
    - OAuth2 [(providers)](https://next-auth.js.org/providers/)
- Form validation [(zod)](https://zod.dev)
- Emails [(react email)](https://react.email)
- Server Actions

# Build with

- NextJS [(site)](https://nextjs.org)
- NextAuth [(site)](https://next-auth.js.org/)
- Prisma [(site)](https://www.prisma.io)
- TailwindCSS [(site)](https://tailwindcss.com)

# Getting started

## Dependencies

- NodeJS [(site)](https://nodejs.org) ` >16.8 `
- Docker [(site)](https://docker.com/get-started/) ` >24 `
- Docker Compose [(site)](https://docs.docker.com/compose/install) ` >1.28 `

## Setup

1. Clone the repository to your system. 
```sh
git clone https://github.com/ThijmenGThN/next-leaflet
```
```sh
cd next-leaflet
```

2. Preparing the environment, it is recommend to use the sample file.
```sh
cp sample.env .env
```
```sh
nano .env
```

3. Install the required dependencies, by default we do this with yarn.
```
yarn install
```
> <b>Don't have yarn installed? </b><br/>
> You can install it via npm.
> ```sh
> npm i -g yarn
> ```

## Development

1. Running Next.js in devmode.
```sh
yarn dev
```

2. Starting the database.
```sh
docker-compose up -d
```
> <b>A fresh installation needs an additional step.</b><br/>
> Apply prisma's schema to the database.
> ```sh
> npx prisma db push
> ```

## Deployment

To deploy next-leaflet we use docker by default, if you'd like to do it without docker, follow the <b>Development</b> procedure whilst changing step 1 to ` yarn deploy `.

> <b>Set the right variables.</b><br />
> Ensure that ` COMPOSE_PROFILES ` has been set to ` prod ` in the environment file so docker knows to also deploy the ` app ` service alongside the ` database `.
>
> Also make sure that the ` PRISMA_CONNECTOR ` has been set right, the default "<b>localhost</b>" won't work in deployment, instead replace it with "<b>database</b>".

0. Pull down any existing services that might run in the background.
```sh
docker-compose down
```

1. Start next-leaflet in deployment-mode.
```sh
docker-compose up -d
```

> <b>next-leaflet should (after a while) go up on port ` 3000 `.</b><br />
> Display the console logs if the service is not going online. Do take note that the port might differ if adjusted in the environment file.
> ```sh
> docker-compose logs
> ```

### GitHub Actions

Setting up CI/CD with next-leaflet is not only a breeze to setup but also very useful to eliminate deployment steps.

<b>This setup will guide you to deploy your next-leaflet app on an ssh-accessible host.</b>

#### Configure environment variables

0. Requirements
 - Ensure that you have access to an active GitHub Actions (runner).
 - Install docker(-compose) on the server you'd like to deploy next-leaflet on.
    - Docker [(site)](https://docker.com/get-started/) ` >24 `
    - Docker Compose [(site)](https://docs.docker.com/compose/install) ` >1.28 `

1. Within GitHub navigate to ` Settings > Secrets and variables > Actions `.

2. Create the following repository secrets:

Name|Expects|Description
-|-|-
SSH_KEY|Private Key|Generate a new ssh key without a password.
SSH_HOST|IP Address|The address of your server with an Actions (runner) active.
SSH_USER|Username|Host system user where next-leaflet should be deploy on.
SSH_PORT|Port Number|This usually refers to the default ssh port 22.
APP_ENV|Environment|A copy of .env.sample with adjusted values for deployment.

3. Designate a trigger branch within the ` .github/deploy.yml ` file.

> Any change pushed to the targeted branch should now trigger a request to deploy next-leaflet via docker-compose.
