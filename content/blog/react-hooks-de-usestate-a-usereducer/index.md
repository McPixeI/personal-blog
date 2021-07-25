---
title: "React Hooks: De useState a useReducer"
date: 2021-07-25T21:46:13.025Z
description: Modificamos un componente de React realizado con el Hook useState,
  para que funcione con useReducer
tags:
  - javascript
  - react
  - hooks
---
![placeholder img](photo-1533073526757-2c8ca1df9f1c.jpg "placeholder img")

*Foto por [Javier Allegue](https://unsplash.com/@soymeraki) en Unsplash*

## Introducción

En el [artículo anterior](https://samutorres.com/blog/react-hooks-usestate) comenzamos a trabajar en un pequeño componente de React que nos sirvió para explicar el Hook `useState`.

El objetivo de nuestro componente es reproducir el comportamiento de un componente de "likes/dislikes" como el que utiliza Youtube. 

Vamos a utilizar como punto de partida el que habíamos creado utilizando `useState` y que puedes ver a continuación:

https://codesandbox.io/s/social-buttons-v3-c4cbn?view=split&autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FSocialCount.js&theme=dark

## Cuándo y por qué usar useReducer

Vamos a analizar el comportamiento final que queremos conseguir en nuestro componente. A groso modo se puede resumir en la siguientes acciones:

* El usuario pulsa sobre el botón de like:

  1. Si no hay nada pulsado todavía: `likes + 1`
  2. El botón de like ya estaba pulsado por el usuario: `likes - 1`
  3. El botón dislike ya estaba pulsado por el usuario: `likes + 1` y `dislikes - 1`
* El usuario pulsa sobre el botón de dislike:

  1. Si no hay nada pulsado todavía: `dislikes + 1`
  2. El botón de dislike ya estaba pulsado por el usuario: `dislikes - 1`
  3. El botón like ya estaba pulsado por el usuario: `dislikes + 1` y `likes - 1`

Llegados a este punto, detectamos que la lógica de nuestro componente será algo compleja, ya que **involucra múltiples valores y la actualización del estado de los mismos tienen dependencia entre sí**. Para estos casos es conveniente hacer uso de `useReducer`. 

De momento, para no extender demasiado este artículo, vamos a obviar la funcionalidad final deseada y nos vamos a centrar en transformar nuestro componente para que replique el mismo funcionamiento que teníamos con `useState` pero utilizando `useReducer`.

## useReducer

El Hook `useReducer` es una alternativa a `useState` para estados complejos. Está basado en la conocida librería "[Redux](https://redux.js.org/)", que a su vez está basada en la arquitectura [Flux](https://facebook.github.io/flux/docs/in-depth-overview/). El enlace a la web oficial de Flux es muy instructivo para comprender cómo funciona esta arquitectura.

![arquitectura-flux](flux-simple-f8-diagram-explained-1300w.png "arquitectura-flux")

Este Hook te **permite añadir estado a tus componentes funcionales mediante una función reductora.**  

### Creando la función reductora

La función reductora recibe los siguientes parámetros:

* El estado a "reducir" (`state`)
* El tipo de acción que se está ejecutando (`action`)

Dependiendo de la acción recibida, se encargará de realizar unas operaciones definidas u otras y devolver el nuevo estado. La estructura vendría a ser la siguiente:

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

1. La función reductora recibe como parámetros el estado y la acción `myReducer(state, action)`.
2. Se establecen condiciones para que, según la acción recibida, se realicen unas operaciones u otras en dicho estado. Es decir, se debe declarar una instancia `case` por cada acción posible dentro de la declaración `switch`.
3. Siempre se devuelve el nuevo estado de nuestro componente.

Para el caso de nuestro componente, que actualmente tiene dos un contador de likes y otro de dislikes, el código de nuestro reductor quedaría así:

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

Qué hace el código anterior:

* Establecemos una condición por cada acción definida. En nuestro caso tenemos un caso para `"LIKE"` y otro para `"DISLIKE"`.
* Si la acción es de tipo `"LIKE"`, se aumenta el valor de `state.likes` y se retorna el estado con dicha modificación.
* Si la acción es de tipo `"DISLIKE"`, se aumenta el valor de `state.dislikes` y se retorna el estado con dicha modificación.

Del mismo modo que con `useState` haríamos directamente algo como `setLikes(likes + 1)`, en el caso de `useReducer` esta lógica sucede dentro de la función reductora. 

Una vez tenemos definida nuestra función reductora, vamos a ver cómo podemos comenzar a utilizarla.

### Definiendo el estado con useReducer

La forma más sencilla para declarar este Hook es la siguiente:

`const [state, dispatch] = useReducer(reducer, initialState);`

Este Hook recibe como parámetros el `reducer` (que es la función que hemos definido anteriormente) y el estado inicial `initialState`, que es el valor del estado inicial de nuestro componente.

Además retorna dos valores:

1. `state`, que es el estado reducido.
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

Entendiendo el código anterior:

* Se ha definido el estado inicial del componente: `initialState`. En este caso es un objeto que contiene las claves `likes` y `dislikes`, las cuales verán modificado su valor mediante la función reductora.
* Se ha definido la función reductora `socialReducer`, la cual se encargará de devolver el nuevo estado con las modificaciones realizadas en función de la acción recibida.
* Se declara el Hook `useReducer`, el cual recibe como parámetro la función reductora `socialReducer` y el estado inicial `initialState`.

En este punto, ya tenemos un estado para nuestro componente y la opción de ejecutar accciones. Para ello, entra en juego el método `dispatch()`.

### Acciones y dispatch

En primer lugar debes conocer y definir qué acciones puede recibir tu función reductora. En nuestro caso, de momento, hemos definido las acciones de `"LIKE"` y `"DISLIKE"`.

Para ejecutar las acciones, el Hook `useReducer` nos proporciona el método `dispatch()` que sigue la siguiente nomenclatura:

`dispatch({ type: "ACTION_NAME", payload: actionData })`

Este método recibe como parámetro un objeto que contiene dos claves:

1. `type`: Nombre de la acción.
2. `payload`: Datos relacionados con la acción. Este es opcional y se utiliza para pasar información "extra" a la función reductora en caso de ser necesario.

Por lo tanto, lo que queremos ahora es que en función de si se pulsa el botón de "like" o el de "dislike", se haga un "dispatch" de la acción `"LIKE"` o `"DISLIKE"` respectivamente:

```jsx
... 
<button onClick={() => dispatch({ type: "LIKE" })}>Like</button>
<button onClick={() => dispatch({ type: "DISLIKE" })}>Dislike</button>
...
```

Con esto ya tendríamos una versión con la misma funcionalidad que la que teníamos en [el artículo anterior](https://samutorres.com/blog/react-hooks-usestate), pero utilizando `useReducer` en lugar de `useState`. 

A continuación puedes ver el resultado y el código completo:

https://codesandbox.io/s/social-buttons-v4-itlj2?file=/src/components/SocialCount.js?view=split&autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FSocialCount.js&theme=dark

En el siguiente artículo modificaremos nuestro componente para que replique la funcionalidad deseada y profundizaremos más en el Hook `useReducer` para controlar un estado algo más complejo. Y...sí, puede que por fin añadamos algo de estilos 😅