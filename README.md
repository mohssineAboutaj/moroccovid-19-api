# morococovid 19 api

- [morococovid 19 api](#morococovid-19-api)
  - [About](#about)
  - [Requirements](#requirements)
  - [API url](#api-url)
  - [Allowrd HTTP Methods](#allowrd-http-methods)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Contribute](#contribute)
  - [License](#license)

## About

An api for [moroccovid-19 project](https://github.com/moroccanprogrammers/moroccovid-19) & any project thats need covid data statistitcs, it's return the statistics of covid-19 virus cases in morocco

## Requirements

- [Nodejs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

_Note:_ I prefer you to use `Yarn` to run scripts, but you can do any of these commands below with `npm`

## API url

- [moroccovid 19 api](https://moroccovid-19-api.herokuapp.com/)

## Allowrd HTTP Methods

- _GET_: return info as json format

## Usage

Use your client request to fetch data

## Endpoints

| Route    | Description                       | Response |
| -------- | --------------------------------- | -------- |
| /        | All The Data                      | Object   |
| /covid   | Covid19 Statistics                | Object   |
| /vaccine | Vaccinated People                 | Object   |
| /advice  | Some Advices To Prevent The Covid | Object   |
| /country | Country Info (Morocco)            | Object   |
| /reports | Get Gov Official Reports          | Array    |

## Contribute

- Clone

```sh
git clone https://github.com/mohssineAboutaj/moroccovid-19-api
```

- Move to the project folter

```sh
cd moroccovid-19-api
```

- Install dependencies

```sh
yarn install
```

- Run server/api

```sh
yarn start
```

- Run server/api in developement mode

```sh
yarn dev
```

## License

_MIT_
