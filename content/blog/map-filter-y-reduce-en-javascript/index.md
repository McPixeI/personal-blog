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

La idea de este artículo es explorar los tres métodos más utilizados para el tratamiento de arrays y que, además, son uno de los **pilares de la programación funcional**. Se trata de los métodos `map`, `filter` y `reduce`. Los tres son métodos pertenecientes al Array prototype, es decir, éstos se encuentran disponibles de forma nativa en tu navegador.

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

El ejemplo anterior hace lo siguiente:

1. Definimos un nuevo array vacío que contendrá, en el futuro, los nombres de los juegos.
2. Utilizando el bucle `for`, iteramos para cada posición de `gameList.`
3. Por cada iteración, añadimos el título del juego al array que habíamos definido previamente vacío, haciendo uso del método `push.`

Esto se podría haber resuelto también utilizando los métodos `forEach` o `for of`.

Veamos ahora cómo podríamos resolverlo utilizando el método `map` con una aproximación más funcional:

```javascript
let gameTitles = gameList.map(game => {
    return game.title;
});

console.log(gameTitles); //["Returnal", "Resident Evil Village", "Little Nightmares 2"]
```

¡Bastante mejor! Ahora, directamente, definimos el nuevo array que necesitamos asignándole como valor el resultado de 'mapear' el anterior. 

Lo que hace el código anterior es lo siguiente:

1. Por cada entrada del listado `gameList`, se retorna el valor de su título `game.title`
2. Cada uno de los valores retornados pasará a formar parte del nuevo array definido `gameTitles`

> OJO: El `return` dentro de la función `map` es muy importante. Es un error común omitirlo y no obtener el resultado deseado (en este caso devolvería `[undefined, undefined, undefined]`). Debes tener claro que por cada iteración en cada uno de los elementos del array se debe devolver el nuevo resultado para que forme parte del nuevo array que genera este método.

### Filter

El método `filter`, del mismo modo que `map`, devuelve un nuevo array. En este caso, el nuevo array contiene todos los elementos que cumplan los requerimientos definidos en el callback de la función.

La sintaxis que sigue es la siguiente:

```javascript
var newArray = arr.filter(callback(currentValue[, index[, array]])[, thisArg])
```

Dentro del callback, el único parámetro obligatorio es el `currentValue`, al cual se le someterá a la condición de filtro.

Vamos con otro ejemplo. Supongamos ahora que nuestro presupuesto es de 60 euros, así que necesitamos ver qué juegos son los que podemos permitirnos. El método `filter` nos viene de perlas para este caso:

```javascript
let affordables = gameList.filter(game => {
  return game.price <= 60;
})
console.log(affordables); //[{ title: 'Resident Evil Village', platform: 'PC', price: 59 },{ title: 'Little Nightmares 2', platform: 'PC', price: 20 }]
```

El ejemplo anterior hace lo siguiente:

1. Se define una nueva variable (`affordables`) que contendrá el resultado de filtrar el listado de juegos completo. 
2. Dentro del método `filter` tenemos un callback al cual le pasamos el parámetro `game`, el equivalente al `currentValue` (podrías ponerle el nombre que te dé la gana). 
3. En el cuerpo del callback establecemos la condición de filtro, donde sólo los elementos que cumplan dicha condición (precio inferior o igual a 60 euros) formarán parte del nuevo array.

> Cuidado con el `return` aquí también 😉

Como vemos en el `console.log`, el nuevo array sólo contiene las entradas de los juegos 'Resident Evil' y 'Little Nightmares', puesto que 'Returnal' tenía un precio superior a 60 euros.

### Combinando Map y Filter

En el último ejemplo hemos conseguido un array con los juegos que nos podemos permitir pero ¿y si sólo queremos la lista con los nombres de dichos juegos y no el restro de entradas? 

Vamos a ver un ejemplo combinado entre `map` y `filter`:

```javascript
let affordables = gameList.filter(game => {
    return game.price <= 60;
  }).map(game => {
    return game.title;
  });

console.log(affordables); // [ 'Resident Evil Village', 'Little Nightmares 2' ]
```

En este último ejemplo hemos hecho lo siguiente:

1. Filtramos las entradas de todos los juegos por la condición de precio inferior a 60.
2. Del resultado anterior, obtenemos un array que contenga únicamente los nombres de dichos juegos.

¡Y listo!

### Reduce

El método `reduce` es posiblemente el más complicado de comprender de los tres y, seguramente, el que menos utilizarás habitualmente. Este método se encarga de ejecutar una función 'reductora' sobre cada elemento de un array y, a diferencia de los dos anteriores, **devolviendo como resultado un único valor**.

La sintaxis que sigue es la siguiente:

```javascript
arr.reduce(callback(acumulador, valorActual[, índice[, array]])[, valorInicial])
```

Vamos con otro ejemplo doble. Éste nos servirá para ver cómo podemos utilizar juntos los métodos `map` y `reduce` a la vez que aprendemos este último.

Imagina ahora que nos interesa saber a cuánto asciende la suma de los precios de todos los juegos de nuestra lista. 

En primer lugar necesitamos un array que contenga los precios de todos los juegos de la lista:

```javascript
let pricesList = gameList.map(game => {
        return game.price;
    });

console.log(pricesList); //[ 79, 59, 20 ];
```

A continuación, podemos aplicar el método `reduce` para obtener, en este caso, la suma de todos los elementos del array `pricesList`:

```javascript
//Función reductora
const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
}

//Definición de amount utilizando reduce
let amount = pricesList.reduce(reducer);

console.log(amount); //158
```

En el ejemplo anterior hemos hecho lo siguiente:

1. Definimos nuestra función reductora (`reducer`) la cual, en este caso, sumará el valor de la entrada actual con el acumulado.
2. A continuación aplicamos el método `reduce` a nuestra lista de precios `priceList` pasándole como parámetro nuestra función reductora.

Ahora ya sabemos que la suma del precio de los juegos de la lista ascendería a 158 euros (toca ahorrar 😅).

Los dos ejemplos anteriores también se podrían unificar concatenando el uso de `map` y `reduce`, tal y como hemos hecho anteriormente con `filter`:

```javascript
//Función reductora
const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
}

//Definición de amount utilizando map y reduce juntos
let amount = gameList.map(game => {
        return game.price;
    }).reduce(reducer);

console.log(amount); //158
```

### Para terminar

Espero que los ejemplos anteriores te hayan sido de utilidad para comprender estos métodos. Sin duda encontrarás infinidad de oportunidades en tu día a día como desarrollador front-end para hacer uso de ellos. Recuerda que esto es sólo una pincelada de lo que puedes llegar a hacer con estos métodos, así que si quieres empezar a profundizar un poco más, te dejo por aquí sus respectivos enlaces a la MDN:

* [Array map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Map)
* [Array filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Filter)
* [Array reduce()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)