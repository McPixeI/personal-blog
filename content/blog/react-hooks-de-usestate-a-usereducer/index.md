---
title: "React Hooks: De useState a useReducer"
date: 2021-07-24T15:58:26.886Z
description: En este artículo modificamos un componente de React realizado con
  el Hook useState, para que funcione con useReducer
tags:
  - javascript
  - react
  - hooks
---
## Introducción

En el [artículo anterior](https://samutorres.com/blog/react-hooks-usestate) comenzamos a trabajar en un pequeño componente de React que nos sirvió para endender el Hook `useState`.

El objetivo de nuestro componente es reproducir el comportamiento de un componente de "likes/dislikes" como el que utiliza Youtube. Vamos a utilizar como punto de partida el componente que habíamos creado utilizando `useState` y que podéis ver a continuación:

https://codesandbox.io/s/social-buttons-v3-c4cbn?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FSocialCount.js&theme=dark

## Cuándo y por qué usar useReducer

Vamos a analizar el comportamiento final que queremos conseguir en nuestro componente. A groso modo se puede resumir en la siguiente funcionalidad:

* El usuario pulsa sobre el botón de like:

  1. Si no hay nada pulsado todavía: `likes + 1`
  2. El botón de like ya estaba pulsado por el usuario: `likes - 1`
  3. El botón dislike ya estaba pulsado por el usuario: `likes + 1` y `dislikes - 1`
* El usuario pulsa sobre el botón de dislike:

  1. Si no hay nada pulsado todavía: `dislikes + 1`
  2. El botón de dislike ya estaba pulsado por el usuario: `dislikes - 1`
  3. El botón like ya estaba pulsado por el usuario: `dislikes + 1` y `likes - 1`

Llegados a este punto, detectamos que la lógica de nuestro componente será algo compleja, ya que **involucra múltiples valores y la actualización del estado de los mismos tienen dependencia entre si**. Para estos casos es conveniente hacer uso de `useReducer`. 

De momento, para no extender demasiado este artículo, vamos a obviar la funcionalidad final deseada y nos vamos a centrar en transformar nuestro componente para que replique el mismo funcionamiento que teníamos con `useState`, pero utilizando `useReducer`.

## useReducer

El Hook `useReducer` es una alternativa a `useState` para estados complejos. Está basado en la conocida librería "[Redux](https://redux.js.org/)", que a su vez está basada en la arquitectura [Flux](https://facebook.github.io/flux/docs/in-depth-overview/). El enlace a la web oficial de Flux es muy instructivo para comprender como funciona esta arquitectura.

![arquitectura-flux](flux-simple-f8-diagram-explained-1300w.png "arquitectura-flux")

Este Hook te **permite añadir estado a tus componentes funcionales mediante una función reductora.**  

### Creando la función reductora

La función reductora recibirá como parámetros lo siguiente:

* El estado a "reducir" 
* El tipo de acción que se está ejecutando

Dependiendo de la acción recibida, se encargará de realizar unas operaciones definidas u otras, y devolver el nuevo estado de nuestro componente. La estructura vendría a ser la siguiente:

```javascript
function myReducer(state, action) {
  switch (action.type) {
    case "PRIMARY_ACTION":
      return {
        ...state, //Usamos spread operator para recoger el valor del estado
        //A continuación modificaríamos el estado a placer
      };
    case "SECONDARY_ACTION":
      return {
        ...state,
        //A continuación modificaríamos el estado a placer
      };
    default:
      return state;
  }
}
```

Vamos a explicar paso por paso la estructura y la funcionalidad de `useReducer`, para posteriormente poder replicar el comportamiento de nuestro componente con dicho Hook.

### Acciones

### Reducer

### Dispatch

## Pasando de useState a useReducer