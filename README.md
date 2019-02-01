# typescript-vehicles
A job candidate's Typescript test 

## Installation

[node.js]: https://nodejs.org/en/
[git]: https://git-scm.com/downloads
[repository]: https://github.ibm.com/Andor-Kovacs/typescript-vehicles.git

Make sure you have [Node.js] and [Git] installed on your computer.

Open a directory in your terminal where you wish to clone this [repository] to. Run

```
git clone https://github.ibm.com/Andor-Kovacs/typescript-vehicles.git
```

Install packages

```
npm install
```

## Running

Build

```
npm run build
```

Start

```
npm start
```

## Development

Watch

```
npm run watch
```

## Testing

Test

```
npm run test
```

Test watch

```
npm run test-watch
```

## Task
[TSLint for Visual Studio Code]:https://marketplace.visualstudio.com/items?itemName=eg2.tslint
[documentation]:https://www.typescriptlang.org/docs/
[Visual Studio Code]:https://code.visualstudio.com/

Look at the directory structure below. 

```
.
├─ src
│  ├─ constant
│  │  ├─ CarGear.ts
│  │  ├─ DefaultValue.ts
│  │  ├─ Destination.ts
│  │  ├─ Distance.ts
│  │  └─ VehicleKind.ts
│  └─ index.ts
├─ test
│  ├─ Aeroplane.test.ts
│  └─ Car.test.ts
...
```

*Good news* - You have some test files and even some source files for free.

*Bad news* - You have to figure out the rest.

Your task is to pass as many tests as you can, and do it with your best OOP. But do not think in terms of hundreds of files. I would rather suggest 3-4, that should be enough for this simple game. 

You can either choose to run `npm run test` or `npm run test-watch` to check your progress.

You must also fulfill our strict tslint rules. If you are using [Visual Studio Code], you may wish to use the plugin [TSLint for Visual Studio Code]. It facilitates your work gravely.

If you ever stuck, the Typescript [documentation] is great, but never worry to ask if are lost.

Remember, we hardly ever eat human. 🐺

Do your best and good luck!