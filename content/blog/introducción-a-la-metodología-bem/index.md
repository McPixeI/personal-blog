---
title: Introducción a la metodología BEM
date: 2021-03-27T20:56:52.677Z
description: Una breve introducción a la metodología más utilizada en la
  creación de componentes reusables en CSS
tags:
  - css
  - html
---
Uno de los mayores quebraderos de cabeza a la hora de escribir CSS puede ser, sin duda, poner nombre a tus clases. Por trivial que parezca, la nomenclatura es muy importante, sobre todo cuando se trabaja en equipo y en proyectos con una escala considerable. Existen varias metodologías para trabajar con CSS, pero si echamos un vistazo a la (muy recomendada) web de [stateofcss](https://2020.stateofcss.com/en-US/technologies/methodologies/), podemos ver como esta sigue siendo la más extendida.

![BEM graph](bem.jpg "BEM graph")

## Qué es BEM

> ¿Qué nombre le pongo a esto?

La metodología BEM aboga por el uso de una de nomenclatura de clases CSS simple y fácil de leer. Un lenguaje común que funciona (o al menos eso promete) tanto para proyectos pequeños como a gran escala. Si llevas tiempo trabajando con CSS, seguro que como mínimo has oído hablar de esta metodología, y si no es así, te recomiendo que sigas leyendo este artículo, puesto que te servirá como punto de partida.

BEM proviene de las siglas:

* **B**loque
* **E**lemento
* **M**odificador

Y la nomenclatura que utiliza sigue el siguiente patrón:

`.block {}
.block__element {}
.block--modifier {}`

### Bloque

Un **bloque** hace referencia a una entidad o componente independiente que tiene sentido por sí solo, por ejemplo:  

`navbar`, `footer`, `post`, `button`, `alert`...

Los bloques no siempre son fáciles de identificar, por eso es importante tener siempre un mockup de tu aplicación donde se pueda analizar e identificar las piezas que la forman. Una gran ayuda para coger práctica en este proceso de abstracción puede ser el fantástico libro de Brad Frost, ["Atomic Design"](https://atomicdesign.bradfrost.com/), al cual tengo pensado dedicarle otro artículo próximamente.

### Elemento

Los **elementos** son partes de un bloque que no tendrían un significado propio por sí mismas. Estos están ligados semánticamente a su bloque padre y se representan tal y como podemos ver en los siguientes ejemplos:

`navbar__link`, `footer__nav`, `post__title`, `button__icon`...

### Modificador

Los **modificadores** son variantes de componentes o elementos que modifican su aspecto sin llegar a cambiar su significado. Se pueden utilizar, por ejemplo, para cambiar el background de un botón, el estado de un input o el color de una alerta. Algunos ejemplos serían:

`navbar__link--active`, `button--primary`, `alert--sucess`...

\###Para muestra, un botón (nunca mejor dicho)

Vamos a ver uno de los casos más sencillos y fáciles de interpretar... un botón. Vamos con el HTML:

```html
<button class="btn"> /*Bloque*/
  Texto
</button>

<button class="btn btn--success"> /*Bloque con modificador*/
  Texto
</button>

<button class="btn btn--success"> /*Bloque con modificador*/
  <span class="btn__icon">♥</span> /*Elemento*/
  Texto
</button>
```

Vamos a ver cómo podría ser el CSS tipo BEM para este sencillo caso:

```css
.btn { 
    color: #fff;
    background-color: #666;
    padding: 8px 12px;
    display: inline-block;
    text-decoration: none;
    border-radius: 4px;
    font-size: 1rem;
}

.btn--success {
    background-color: green;
}

.btn__icon {
    display: inline-block;
    margin-right: 4px;
}
```

Si trabajamos con SCSS, a priori la jerarquía se hace todavía más notable:

```scss
.btn {
    color: #fff;
    background-color: #666;
    padding: 8px 12px;
    display: inline-block;
    text-decoration: none;
    border-radius: 4px;
    font-size: 1rem;

    //Modificadores
    &--success {
      background-color: green;
    }

    //Elementos
    &__icon{
      display: inline-block;
      margin-right: 4px;
    }
}
```

Como podéis ver, los estilos "base" están definidos en el propio bloque (.btn). Los modificadores solo contienen los estilos que alteran la presentación de dicho bloque, (don't repeat yourself). Es por eso que, si queremos añadir un modificador en nuestro nodo HTML, este siempre debe ir precedido de la clase de su bloque, para que herede también los estilos base:

```html
<!--MAL-->
<div class="btn--success">Botón</div>

<!--BIEN-->
<div class="btn btn--success">Botón</div>
```

En cuanto a los elementos, también pueden tener sus propios modificadores.

### BEM o no BEM

La nomenclatura BEM nos ayuda a definir componentes modulares y reusables en nuestros desarrollos de forma sencilla. De todos modos, antes de utilizar esta nomenclatura hay que tener en cuenta un par de aspectos importantes:

1.  La nomenclatura BEM **no es incompatible con otras metodologías**. Puedes hacer uso de la misma en tus componentes siempre que sea necesario, pero puede que te encuentres casos muy simples en los que no haga falta utilizar dicha nomenclatura. Por ejemplo, en clases de ayuda:

   ```css
   .d-flex{
     display:flex;
   }

   .text-center{
     text-align: center;
   }
   ```
2. **Cuidado con las anidaciones**. Al principio es dificil discernir cuándo tienes que parar de anidar clases, y tu CSS puede acabar siendo un churro incomprensible, sobretodo si estás usando SCSS con sus anidaciones "&". Por eso es importante tener clara la separación entre tus bloques, y como recomendación, nunca haría una anidación con profundidad mayor de 3 para un mismo bloque.

### Para terminar

BEM no deja de ser una herramienta más para facilitarnos la vida. Eres totalmente libre de elegir esta metodología u cualquier otra, siempre que se adapte a tu proyecto y a tu equipo. Además hoy en día, con el auge de librerías JS como React o VUE, acompañadas del css modular o CSS-IN-JS, están ofreciendo otras alternativas (con una filosofía similar) perfectamente viables.