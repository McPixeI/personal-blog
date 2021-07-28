---
title: "React Hooks: Manejando estados complejos mediante useReducer"
date: 2021-07-28T21:21:13.402Z
description: Creamos un componente de React con estado complejo utilizando el
  Hook useReducer
tags:
  - react
  - hooks
  - javascript
---
## Introducción

En el [artículo anterior](https://samutorres.com/blog/react-hooks-de-usestate-a-usereducer) explicamos las bases del Hook `useReducer`. Si todavía no lo has leído, te invito a hacerlo, puesto que las bases de lo que vamos a desarrollar a continuación se encuentran allí.

En este artículo vamos a implementar por fin la funcionalidad del componente de "likes/dislikes" para que reproduzca el comportamiento del que tiene Youtube en sus vídeos.

Para empezar, vamos a refrescar las acciones y comportamiento esperado de nuestro componente. Le he puesto un nombre a cada acción (en negrita), puesto que serán los identificadores de dichas acciones que usaremos en la función reductora:

* El usuario pulsa sobre el botón de like:

  * **[LIKE]** Si no hay nada pulsado todavía: `likes + 1`
  * **[UNLIKE]** El botón de like ya ha sido pulsado: `likes - 1`
  * **[TOGGLE]** El botón dislike ya ha sido pulsado: `likes + 1` y `dislikes - 1`

* El usuario pulsa sobre el botón de dislike:

  * **[DISLIKE]** Si no hay nada pulsado todavía: `dislikes + 1`
  * **[UNDISLIKE]** El botón de dislike ya ha sido pulsado: `dislikes - 1`
  * **[TOGGLE]** El botón like ya ha sido pulsado: `dislikes + 1` y `likes - 1`

Ahora que ya tenemos las acciones de nuestro componente identificadas (un total de 5 diferntes), vamos a definirlas en nuestro código.

## Definiendo las acciones disponibles

Es una buena práctica tener definidas las acciones como claves dentro de un objeto, en este caso `actions`, para facilitar así su mantenimiento y uso.

Dentro de nuestro componente, definimos las acciones de la siguiente forma:

```javascript
const actions = {
  like: "LIKE",
  unlike: "UNLIKE",
  dislike: "DISLIKE",
  undislike: "UNDISLIKE",
  toggle: "TOGGLE"
};
```

## Definiendo el estado inicial del componente

Definimos también el estado inicial del componente. En este caso, necesitamos saber lo siguiente:

* Estado del contador de likes (`likes`)
* Estado del contador de dislikes (`dislikes`)
* ¿Está pulsado el botón de like? (`isLiked`)
* ¿Está pulsado el botón de dislike? (`isDisliked`) 

Necesitamos por lo tanto, 4 entradas en nuestro objeto de estado, el cual definimos de la siguiente forma:

```javascript
const initialState = {
  likes: 107,
  dislikes: 24,
  isLiked: false,
  isDisliked: false
};
```

En una aplicación real, estos estados podríamos recibirlos como resulatdo de, por ejemplo, una llamada AJAX, pero para el propósito de este artículo, hemos omitido esta parte y definido un estado inicial cualquiera.

## Creando la función reductora


