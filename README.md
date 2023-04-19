
<div align="center">
    <h1>Next - Leaflet</h1>
    <img 
        src="source/tests/cypress/screenshots/Preview.png"
        height="256"
        width="auto"
    />
</div>

### An optimized tech stack for efficiency.

> This project was initially built to serve as an easy to deploy template, it has grown beyond that. 
>
> Here's a quick rundown of what's inside.
>
> **NextJS** offers a fast and seamless user experience, while **Directus** provides an easy-to-use admin dashboard for efficient database management. 
>
> By integrating **Tailwind CSS** into **NextJS**, we eliminate the need for constant file switching and ensure streamlined styling. 
>
> Test driven development is a must these days, so for that reason we've implemented **Cypress** natively within the tech stack.
>
> Many Quality-of-Life features have been implemented as well, this includes **Module path aliases** and the ability to use your own themes with **Tailwind**.
> 
> This results in a more efficient and beginner-friendly development environment.

### What's inside?
- [NextJS](https://nextjs.org)
    - [React Icons](https://react-icons.github.io)
    - [Tailwind](https://tailwindcss.com)
- [Directus](https://directus.io)
    - [Postgis](https://postgis.net)

## Getting Started

0. System requirements <br />
    - [Node.js](https://nodejs.org) ` LTS `
    - [Docker](https://docker.com)
    - [Docker Compose](https://docs.docker.com/compose/install) ` 1.28.0 ` or ` newer `

1. Clone our repository to your device <br /> 
```
git clone https://github.com/ThijmenGThN/next-leaflet
```

2. Navigate to the freshly cloned directory <br /> 
```
cd next-leaflet
```

3. Create your own dotenv file, it is recommended to use ` sample.env ` as a template <br /> 
```
cp sample.env .env
```

4. Open the .env file with your desired editor and adjust the variables to your needs <br /> 
    - *Promptly note that by default the project will run in development mode, which means that it will only host the backend **Directus** and the corresponding database.*

5. ` Needs step 4 ` Deploying next-leaflet with **Docker** <br /> 
```
docker-compose up
```

6. ` For development only ` installing dependencies for the front-end <br />
```
yarn install
```

7. ` For development only ` running next.js to view the front-end <br />
```
yarn dev
```

## App Testing with Cypress

> Running and testing your application is a breeze with **Cypress**, you can get this to run with the single command shown below. Do note that a bit of knowledge is required to write your tests.

```
yarn test
```
