---
title: El uso de 'this' en JavaScript
date: 2021-04-08T20:25:47.975Z
description: Analizamos una de las características más confusas del lenguaje
  JavaScript, con sus bondades y sus carencias
tags:
  - javascript
---
![this heading img](https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80 "this heading img")

*Foto por [Sydney Rae](https://unsplash.com/@srz) en Unsplash*

Hace unos días escribí un artículo sobre [el scope en JavaScript](https://samutorres.com/blog/el-scope-en-javascript). Si bien dicho artículo puede servir como base para comprender los distintos tipos de scope, hay otro concepto importante en JavaScript, sobre todo para la programación orientada a objetos, que suele causar confusión al principio y tiene parentesco con el scope: la keyword `this`. 

He pensado dedicarle un artículo completo a esta palabra clave, puesto que creo que tiene la suficiente complejidad como para tratarla aparte. Así también evitamos que los artículos que publique terminen siendo peligrosamente largos y aburridos 👀.

## Qué es la palabra clave *this*

En la mayoría de lenguajes de programación que hacen uso de la keyword `this`, ésta se suele utilizar como una referencia a un objeto instanciado por una clase. En JavaScript esto no es así.

Por norma general, en JavaScript la keyword **`this` hace referencia al objeto al que pertenece, obteniendo su valor en el momento en el que una función es invocada**. Esto implica dos conceptos clave:

* La keyword `this` **hace referencia a su "propietario"**.
* Su valor **dependerá del lugar desde la cual sea invocada**.

A continuación, vamos a detallar los casos comunes en los que se suele utilizar `this` y los valores o "propietarios" que adquiere en cada uno.

## Los distintos valores de this en función de dónde se usa

### En el contexto global

Cuando hacemos uso de `this` en el ámbito global, es decir fuera de cualquier función, siempre hará referencia al objeto global. En el caso del navegador, hablamos del objeto `window`.

```javascript
/*Estamos en el scope global*/
console.log(this === window) // true
```

### En un método

Dentro de un método perteneciente a un objeto, `this` hace referencia al "propietario" de dicho método.

```javascript
let dog = { // Objeto "propietario"
    name: 'Pepa',
    sayHello: function () { // Método perteneciente a objeto "dog"
        return `Hola, soy ${this.name}` //this, hace referencia a "dog"
    }
}

dog.sayHello(); // Hola, soy Pepa
```

### En una función

Dentro de una función, `this` hace uso del binding predefinido o, en otras palabras, hace referencia al objeto global.

```javascript
function foo() {
    return this;
}

foo(); // [object Window]
```

### En una función con *strict mode*

Las funciones que hacen uso del modo "strict" no permiten hacer uso del binding predefinido, es por eso que en este caso la keyword `this` devolverá el valor `undefined`.

```javascript
"use strict";
function foo() {
    return this;
}

foo(); // undefined
```

### *this* en funciones de flecha

Las funciones de flecha **no "bindean" su propio `this`**. Lo que hacen es heredarlo del scope del padre. Veamos unos cuantos ejemplos para tener una idea más clara, puesto que las funciones de flecha funcionan un poco diferente a las funciones clásicas.

En este primer ejemplo, tenemos una función de flecha que devuelve el valor de `this`.  Como puedes ver, del mismo modo que con las funciones "normales", ésta devuelve el objeto global (Window) pero **por motivos distintos**. En este caso, la función está buscando el valor de this en su "padre" que, en este caso, sería el objeto global:

```javascript
const foo = () => {
    return this;
}

foo(); // [object Window]
```

Veamos ahora qué pasa si utilizamos `this` dentro de un método definido como una función de flecha. Para facilitarlo, voy a usar el mismo ejemplo que hemos usado para las funciones normales pero adaptado:

```javascript
let dog = { 
    name: 'Pepa',
    sayHello: () => { 
        return `Hola, soy ${this.name}`;
    }
}

dog.sayHello(); // Hola, soy
```

¡OJO! Ahora `dog.sayHello()` está devolviendo simplemente: `'Hola, soy'`. 

¿Por qué pasa esto? Vamos a cambiar el método para ver qué devuelve `this`:

```javascript
let dog = { 
    name: 'Pepa',
    sayHello: () => { 
        return this;
    }
}

dog.sayHello(); // [object Window]
```

Exacto, `this` sigue haciendo referencia al objeto global, por eso no es capaz de devolver el nombre de 'Pepa', porque está buscando `window.name` en lugar de `dog.name`.


Básicamente, las funciones flecha no hacen uso de `this`, así que obligatoriamente tienen que heredarlo del "exterior". Estas funciones son más adecuadas para [programación funcional](https://opensource.com/article/17/6/functional-javascript#:~:text=JavaScript%20is%20a%20multi%2Dparadigm,%2C%20procedural%2C%20and%20functional%20paradigms.&text=Immutability%20is%20a%20core%20tenet,about%20and%20debug%20your%20programs.) o, simplemente, para iterar con objetos o usar callbacks.

Tengo pensado dedicarle un artículo completo a las funciones de flecha (se me acumula la faena) pero mientras tanto, si quieres saber algo más acerca de ellas, el siguiente [artículo](https://javascript.info/arrow-functions) es corto y conciso. 

## Cómo realizar un bindeo explícito

Lo que hemos visto hasta ahora se conoce como asignación o bindeo implícito. Por suerte, JavaScript nos permite asignar explícitamente una referencia a `this` ayudándonos así a resolver muchos de los problemas comunes que provoca el uso de esta keyword. Esto es gracias a los métodos `bind()`, `call()` y `apply()`.

### bind

El método `bind()` crea una nueva función que, al ser invocada, asigna a `this` el valor que se le pasa por parámetro.

`fun.bind(thisArg[, arg1[, arg2[, ...]]])`

Veamos una variante del ejemplo anterior, para seguir con la misma tónica. Pongamos que tenemos el siguiente código:

```javascript
let dog = { 
    name: 'Pepa'
}

const sayHello = function() {
    console.log(`Hola, soy ${this.name}`);
}

sayHello(); // Hola, soy
```

En el código anterior, vemos que ahora tenemos un método `sayHello()` que hace uso de `this` pero está fuera del objeto 'dog', por lo tanto, puedes vaticinar que no encuentra el nombre cuando se ejecuta la función.

Vamos a ver cómo podríamos arreglarlo usando el método `bind()`:

```javascript
let dog = { 
    name: 'Pepa'
}

const sayHello = function() {
    console.log(`Hola, soy ${this.name}`);
}

const bindedSayHello = sayHello.bind(dog); //Definimos una nueva función bindeando el objeto al método sayHello

bindedSayHello(); // Hola, soy Pepa
```

Ahora sí. Hemos creado una nueva función (`bindedSayHello`), a partir de la anterior, haciendo uso del método `bind()`, pasándole como parámetro el objeto que queríamos bindear.

### call

El método `call()`, a diferencia de `bind()`, ejecutará la función directamente sin necesidad de tener que crear una nueva. Por lo demás, la sintaxis es prácticamente la misma:

`function.call(thisArg[, arg1[, arg2[, ...]]])`

Ejemplo:

```javascript
let dog = { 
    name: 'Pepa'
}

const sayHello = function() {
    console.log(`Hola, soy ${this.name}`);
}

sayHello.call(dog); // Hola, soy Pepa
```

### apply

El método `apply()` únicamente se diferencia del método `call()` en la forma en la que se le pasan los argumentos, puesto que éste los acepta en forma de array:

`fun.apply(thisArg[, argsArray])`

Para conseguir el mismo resultado que en el caso anterior, el código sería el siguiente:

```javascript
let dog = { 
    name: 'Pepa'
}

const sayHello = function() {
    console.log(`Hola, soy ${this.name}`);
}

sayHello.apply(dog); // Hola, soy Pepa
```

Estos tres métodos ofrecen muchas más posibilidades que para lo que hemos visto en los ejemplos de este artículo (ni siquiera estamos pasándoles más argumentos aparte del bindeo). De todos modos, ya te puede servir para hacerte una idea de cuándo utilizarlos y cuál elegir en función de tus necesidades.

Si quieres profundizar más en estos métodos de bindeo explícito, te dejo sus respectivos enlaces a la MDN:

* [Documentación de bind](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [Documentación de call]( https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
* [Documentación de apply](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)