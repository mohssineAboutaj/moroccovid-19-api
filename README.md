# morococovid 19 api

- [morococovid 19 api](#morococovid-19-api)
  - [About](#about)
  - [Requirements](#requirements)
  - [API url](#api-url)
  - [Actions](#actions)
  - [Returns](#returns)
  - [Usage](#usage)
  - [Usage For contributors](#usage-for-contributors)
    - [Install dependencies](#install-dependencies)
    - [Run server/api](#run-serverapi)
    - [Run server/api in developement mode](#run-serverapi-in-developement-mode)
  - [License](#license)

## About

an api for [moroccovid-19 project](https://github.com/moroccanprogrammers/moroccovid-19), it's return the statistics of covid-19 virus cases in morocco

## Requirements

- [Nodejs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

_Note:_ I prefer you to use `Yarn` to run scripts, but you can do any of these commands below with `npm`

## API url

- [moroccovid 19 api](https://moroccovid-19-api.herokuapp.com/)

## Actions

- _GET_: return info as json format

## Returns

An object contains _Country Info_, _Covid Cases_, _Vaccined People_

## Usage

Use your client request to fetch data

## Usage For contributors

### Install dependencies

```sh
yarn install
```

### Run server/api

```sh
yarn start
```

### Run server/api in developement mode

```sh
yarn dev
```

## License

_MIT_
