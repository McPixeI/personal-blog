---
title: Map, filter y reduce en Javascript
date: 2021-05-02T18:52:29.716Z
description: Introducción a los métodos más utilizados para el tratamiento de
  arrays en Javascript con un enfoque funcional
tags:
  - javascript
---
> "La programación funcional es un paradigma de programación que nos ayuda a escribir un código más legible, mantenible y testeable". 

Una de las características más visibles de la programación funcional es la forma en que se trabaja con listas o arrays. Tener una estructura de datos basada en arrays y operar sobre los mismos en el front-end de tu aplicación es, posiblemente, una de las tareas más comunes que vas a encontrarte en el día a día como desarrollador front-end. 

La idea de este artículo es explorar los tres métodos más utilizados para el tratamiento de arrays y que son uno de los pilares de la programación funcional. Se trata de los métodos `map`, `filter` y `reduce`. Los tres son métodos pertenecientes al Array prototype, es decir, estos se encuentran disponibles de forma nativa en tu navegador.

Vamos a familiarizarnos con estas funciones 👇

### Map

El método `map()` nos permite iterar sobre cada uno de los elemetos de un array, **devolviéndonos un nuevo array** dada una determinada función a ejecutar en cada uno de los elementos del anterior.

La sintaxis que sigue es la siguiente:

```javascript
var new_array = arr.map(function callback(element, index, array) {
    // Return value for new_array
}[, thisArg])
```

En el callback, el `element` es el único parámetro obligatorio.

Vamos a ver un ejemplo práctico. Supongamos que tenemos la siguiente lista con los próximos videojuegos que nos interesa comprar:

```javascript
let gameList = [
    {
        title: 'Returnal',
        platform: 'PS5',
        price: 79
    },
    {
        title: 'Resident Evil Village',
        platform: 'PC',
        price: 59
    },
    {
        title: 'Little Nightmares 2',
        platform: 'PC',
        price: 20
    }
]
```

Supongamos que nos interesa tener una nueva lista que contenga únicamente los nombres de los juegos. ¿Cómo podríamos solventar este problema de la forma "tradicional"?

```javascript
let gameTitles = [];

for (let index = 0; index < gameList.length; index++) {
    gameTitles.push(gameList[index].title);
}

console.log(gameTitles); //["Returnal", "Resident Evil Village", "Little Nightmares 2"]
```

En el ejemplo anterior nos hemos visto obligados a crear un nuevo array vacío (`gameTitles`), al cual le vamos añadiendo mediante el método `push` los nombres de cada juego, iterando sobre la lista `gameList`. Esto se podría haber resuelto también utilizando los métodos `forEach` o `for of`.

Veamos ahora cómo podríamos resolverlo utilizando el método `map`, con una aproximación más funcional:

```javascript
let gameTitles = gameList.map(game => {
    return game.title;
});

console.log(gameTitles); //["Returnal", "Resident Evil Village", "Little Nightmares 2"]

```

Bastante mejor, ¿no?

> OJO: El `return` dentro de la función `map` es muy importante. Es un error común omitirlo y no obtener el resultado deseado. Debes tener claro que por cada iteración en cada uno de los elementos del array se debe devolver el nuevo resultado para que forme parte del nuevo array que genera este método.