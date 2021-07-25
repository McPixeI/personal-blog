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
        ...state, //Recogemos el valor del estado actual
        //A continuación modificaríamos el estado a placer
      };
    case "SECONDARY_ACTION":
      return {
        ...state, //Recogemos el valor del estado actual
        //A continuación modificaríamos el estado a placer
      };
    default:
      return state;
  }
}
```

Vamos a explicar al detalle el ejemplo anterior:
1. La función reductora recibe como parámetros el estado y la acción `myReducer(state, action)`
2. Se establecen condiciones, para que según la acción recibida, se trate al estado de una forma u otra
3. Siempre se devuelve el nuevo estado de nuestro componente

Visto lo anterior, para el caso de nuestro componente, que actualmente tiene dos contadores de likes/dislikes, el código de nuestro reductor quedaría así:

```javascript
function socialReducer(state, action) {
  switch (action.type) {
    case "LIKE": //Si el usuario pulsa like
      return {
        ...state,
        likes: state.likes + 1 //Aumentamos el contador de likes
      };
    case "DISLIKE": //Si el usuario pulsa dislike
      return {
        ...state,
        dislikes: state.dislikes + 1 //Aumentamos el contador de dislikes
      };
    default:
      return state;
  }
}
```

Con esto ya tendríamos nuestra función reductora definida. Ahora bien... ¿Cómo hacemos uso de la misma? Lo explicamos a continuación.

### Definiendo el estado con useReducer

La forma más sencilla para declarar este Hook es la siguiente:

`const [state, dispatch] = useReducer(reducer, initialState);`

Este Hook recibe como parámetro el `reducer`, que es la función que hemos definido anteriormente, y el estado inicial `initialState`, que es el valor del estado inicial de nuestro componente.

Además retorna dos valores:
1. `state`, que es el estado reducido
2. `dispatch`, que es el método "accionador" encargado de enviar la acción al reductor.

El código para nuestro componente sería por lo tanto el siguiente:

```javascript
//Importamos useReducer
import React, { useReducer } from "react"; 

//Definimos un estado inicial
const initialState = { 
  likes: 107,
  dislikes: 24
};

//Definimos la función reductora
function socialReducer(state, action) { 
  ...
}

//Añadimos estado con useReducer
const [state, dispatch] = useReducer(socialReducer, initialState);

...


```


Una vez tenemos definido nuestro estado inicial, nuestra función reductora y hemos definido el Hook `useReducer`, ya podemos hacer uso del mismo. Para ello es donde entran en acción (valga la redundancia) las acciones y el método `dispatch()`.

### Acciones

En primer lugar debes conocer y definir qué acciones puede recibir tu función reductora. En nestro caso, hemos definido las acciones de `"LIKE"` y `"DISLIKE"`.

Ahora, de forma muy similar a como hacíamos con el Hook `useState`, para ejecutar acciones, en lugar de hacerlo así:

```jsx
...
const [likes, setLikes] = useState(0);
...
<button onClick={() => setLikes(likes + 1)}>Like</button>
...

```

Lo que haremos es utilizar el método que nos ofrece el Hook `useReducer`. Se trata de `dispatch()`, y sigue la siguiente nomenclatura:

`dispatch({ type: "ACTION_NAME", payload: actionData })`

Este método recibe como parámetros un objeto que contiene dos claves:
1. `type`: Nombre de la acción
2. `payload`: Datos relacionados con la acción. Este es opcional y se utiliza para pasar información "extra" a la función reductora en caso de ser necesario. De momento no lo utilizaremos.

Por lo tanto, nuestros botones de like/dislike quedarían así:

```jsx
...
<button onClick={() => dispatch({ type: "LIKE" })}>Like</button>
<button onClick={() => dispatch({ type: "DISLIKE" })}>Dislike</button>
...

```

LOREM IPSUM

https://codesandbox.io/s/social-buttons-v4-itlj2?file=/src/components/SocialCount.js?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FSocialCount.js&theme=dark
