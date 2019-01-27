# typescript-playground

A repository for learning purposes.

## Installation

[node.js]: https://nodejs.org/en/
[git]: https://git-scm.com/downloads
[repository]: https://github.com/kovacsandor/typescript-playground

Make sure you have [Node.js] and [Git] installed on your computer.

Open a directory in your terminal where you wish to clone this [repository] to. Run

```
git clone https://github.com/kovacsandor/typescript-playground
```

Install packages

```
npm install
```

## Development

Build

```
npm run build
```

Start

```
npm start
```

Develop

```
npm run watch
```

### Debug

Press F5

## Steps of reproducing the content of this repository

Create a default package.json file.

```
npm init --yes
```

###

Add a tsconfig.json file with the following content.

```json
{
  "compilerOptions": {
    "outDir": "dist"
  },
  "exclude": ["node_modules"]
}
```

Add libraries to the project.

```
npm install --save-dev concurrently nodemon typescript
```

Add the following scripts to the package.json file.

```json
{
  "build": "tsc",
  "debug": "tsc --sourceMap",
  "start": "node ./dist",
  "watch": "concurrently --kill-others \"npm:watch-*\"",
  "watch-node": "nodemon ./dist",
  "watch-ts": "tsc --watch"
}
```
