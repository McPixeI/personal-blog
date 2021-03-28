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

Antes de hablar de scope, hagamos un pequeño repaso de las variables.

Declarar una variable en programación, significa hacer uso de un nombre (o identificador) para representar valores. De esta manera, podemos referenciar dichos valores y usarlos cuando nos convenga. Estos valores tienen la particularidad de que pueden variar, de ahí a que se llamen "**variables**" (sí, he llegado yo solo🕵️‍♂️). Por eso, si quieres asignar un valor permanente a un identificador, hablamos de utilizar "**constantes**".

Actualmente existen tres formas de declarar variables en JavaScript: Utilizando las palabras clave **var**, **let** y **const.**

```javascript
/*Forma "antigua" de declarar variables previa a ES2015*/
var name = 'Samu';

/*Declaración de variable*/
let name = 'Samu'

/*Declaración de constante*/
const MY_CONSTANT = 'whatever'
```

PRÓXIMAMENTE...