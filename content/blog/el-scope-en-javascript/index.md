---
title: El scope en JavaScript
date: 2021-03-28T18:25:03.036Z
description: Aprende las distintas formas de declarar variables en JavaScript y
  los diferentes tipos de scope.
tags:
  - javascript
---
![heading code picture](https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80 "heading code picture")
*Foto por [Markus Spiske](https://unsplash.com/@markusspiske) en Unsplash*

## Declaración de variables

Antes de hablar de scope, es importante hacer un pequeño repaso a la declaración de variables y sus implicaciones.

Declarar una variable en programación, significa hacer uso de un nombre o identificador para representar valores. De esta manera, podemos referenciar dichos valores y usarlos cuando nos convenga. Estos valores tienen la particularidad de que pueden variar, de ahí a que se llamen "**variables**" (sorprendente, lo sé🕵️‍♂️). Por el mismo motivo, si quieres asignar un valor permanente a un identificador, hablamos de utilizar "**constantes**". Como dato, las constantes no existían en JS hasta la llegada del estándar [ES2015](https://262.ecma-international.org/6.0/).

Actualmente existen tres formas de declarar variables en JavaScript: Utilizando las palabras clave `var`, `let`y `const`.

```javascript
/*Forma "antigua" de declarar variables previa a ES2015*/
var name = 'Pepa';

/*Declaración de variable*/
let name = 'Pepa';

/*Declaración de constante*/
const MY_CONSTANT = 'whatever';
```

A simple vista, entre la declaración de variables mediante las keyword **var** o **let** no parece tener gran diferencia, pero tiene sus implicaciones. Esto lo veremos en los siguientes apartados en los que explicaremos los tipos de scope en JavaScript.

Sobre las constantes, puedes notar que el nombre de ejemplo que he utilizado `MY_CONSTANT` tiene una nomenclatura muy específica. Esto no es casual. Por convención, las constantes en JavaScript se suelen definir utilizando dicha nomenclatura, aunque por supuesto, no estás obligado a seguirla.

## El scope global

Una variable **tiene scope global cuando está declarada fuera del cuerpo de una función**, y por lo tanto puede ser accesible desde cualquier parte de nuestro código. 

```javascript
//Scope Global
const name = 'Pepa';

function sayHello() {
  console.log(`Hola ${name}`);
}

sayHello(); //Hola Pepa
```

Cuando se habla del scope global en la parte cliente (navegador) en JavaScript, se hace referencia al documento HTML donde se ha definido. El uso del scope global **implica que esta variable podría ser sobreescrita desde cualquier parte de nuestra aplicación**, incluso por algún script de terceros que tengamos intregrado en la misma (os soprendería la cantidad de scripts de terceros que puede llegar a tener una web productiva).  

Actualmente, se desaconseja el uso de variables globales en JavaScript, salvo casos específicos.

## El scope local

En contraposcición a las variables globales, las locales son **variables visibles solo dentro de la función desde la cual se han definido**. Toda función creada en JavaScript genera su propio scope local, y cualquier intento de acceder a variables locales desde fuera de dicho scope te devolverá el valor "undefined".

```javascript
//Scope global

function printName() {
  let name='Pepa';
  console.log(name);
}
printName(); //Pepa
console.log(name); //undefined
```

## El scope de bloque

El estándar [ES2015](https://262.ecma-international.org/6.0/) trajo consigo las palabras clave **let** y **const**, las cuales hacen uso del scope de bloque. Este tipo de scope significa que las variables y constantes solo están definidas dentro del bloque de código al que pertenecen.

Un bloque en JavaScript es una agrupación de declaraciones entre llaves (`{}`):

```javascript
{
  ListaDeDeclaraciones
}
```

La principal diferencia entre el scope local y el de bloque, es que los bloques no generan un nuevo scope. 

Algunos ejemplos generales de bloques pueden ser condiciones, bucles... :

* `if/else`
* `for`
* `for/if`
* ...

```javascript
//El bloque 'if' no define un nuevo scope
if (true) {
    var name = 'Pepa' // Se mantiene en el scope global
    let superPower = 'sleep' //No sera accesible fuera del bloque 'if'
}
console.log(name) // Pepa
console.log(superPower) //Uncaught ReferenceError: superPower is not defined
```

## Por qué utilizar *let* en lugar de *var*

* A diferencia de las variables declaradas con **let**, con **var** puedes definir la misma variable múltiples veces, lo cual puede provocar inconsistencias o dificultades para depurar.
* Las variables declaradas con **var** no tienen scope de bloque, sino que pertenecen al cuerpo de la función que las contiene, independientemente de la profundidad en la que se haya definido dicha variable dentro de la función.
* Las declaraciones con var hacen uso de **[hoisting](https://developer.mozilla.org/es/docs/Glossary/Hoisting)**. Este término indica que cuando una variable se declara mediante **var**, dicha declaración automáticamente se coloca en la parte superior de la función a la que pertenece (en memoria, antes de ejecutar dicha función), evitando así errores a la hora de utilizar una variable todavía no definida. Esto a simple vista parece una ventaja, pero era causante de muchos bugs, en algunos casos difíciles de identificar, cuando todavía no existía la keyword **let**.