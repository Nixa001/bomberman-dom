<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.50a.fr/img/upload/Framework.png" alt="Project logo"></a>
</p>
<h3 align="center">Project Title</h3>

<div align="center">

[![subject](https://img.shields.io/badge/Subject-name-orange.svg)](https://learn.zone01dakar.sn/git/igueye/mini-framework/src/branch/master/docs/subjects.md)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://learn.zone01dakar.sn/git/igueye/mini-framework)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://learn.zone01dakar.sn/git/igueye/mini-framework/pulls?type=all&sort=&state=open&labels=&milestone=0&assignee=2506)

</div>

---

<p align="center"> This project consists of creating a mini-framework in javascript.
    <br> 
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Structure](#idea)
- [Setting up a local environment](#getting_started)
- [Usage](#usage)
- [Authors](#authors)

## 🧐 Problem Statement <a name = "problem_statement"></a>

- IDEAL: 
  The mini-framework is a framework made in JavaScript which allows the creation of DOM using predefined functions
  should illustrate what the expected environment would look like once the solution is implemented.
- REALITY: 
 The mini-framework offers a set of tools to facilitate the creation, manipulation and integration of DOM elements in a web application. It provides functions for creating elements from JSON structures or simple parameters, for handling event listeners, and for adding or replacing elements in the DOM. The MyFrame object serves as a centralized access point to these features, making the code more readable and easier to maintain.


## 💡 Structure  <a name = "idea"></a>

The main structure of the project is as follows:

 The framework folder contains the various functions necessary to implement the logic of the framework.
 - framework
    - miniframe.js
    - route.js
    - store.js
    - web.component.js


## 🎈 Usage <a name="usage"></a>


 * The function `createDomElementFromJSON` creates DOM elements based on a JSON structure and appends them
 * to a specified parent element.
 * @param jsonStructure - The `jsonStructure` parameter is an object that represents the structure of
 * an HTML element. It has the following properties:
 * @param [parent] - The `parent` parameter in the `createDomElementFromJSON` function is the parent
 * element to which the created DOM element will be appended. If no parent is specified, the default
 * parent element is `document.body`, which means the created element will be appended to the body of
 * the HTML document. You can
 * @returns The `domElement` that was created and appended to the `parent` element is being returned by
 * the `createDomElementFromJSON` function.

 * The `createDomElement` function in JavaScript dynamically creates HTML elements with specified
 * attributes and children, including support for event listeners.
 * @param tagName - The `tagName` parameter in the `createDomElement` function represents the type of HTML
 * element you want to create. For example, if you want to create a `<div>` element, you would pass
 * `'div'` as the `tagName` parameter when calling the `createDomElement` function.
 * @param [attrs] - The `attrs` parameter in the `createDomElement` function is an object that contains
 * attributes to be set on the created element. These attributes can include standard HTML attributes
 * like `id`, `class`, `style`, etc., as well as event listeners prefixed with 'on' (e.g., `onClick
 * @param children - The `children` parameter in the `createDomElement` function represents the elements
 * or text nodes that will be appended as children to the created element. These can be passed as
 * individual arguments after the `attrs` object when calling the function. The `createDomElement`
 * function handles different types of children:
 * @returns The `createDomElement` function returns a newly created HTML element with the specified tag
 * name, attributes, and children nodes.
 

 * The function "on" attaches an event listener to a specified element in JavaScript.
 * @param element - The `element` parameter is the DOM element to which you want to attach the event
 * listener.
 * @param eventType - The `eventType` parameter specifies the type of event for which the event
 * listener is being added. Examples of event types include "click", "mouseover", "keydown", etc.
 * @param handler - The `handler` parameter in the `on` function is a function that will be called when
 * the specified `eventType` occurs on the `element`. This function is responsible for defining the
 * behavior or action that should be taken in response to the event.
 * @param [options=false] - The `options` parameter in the `addEventListener` method is an optional
 * parameter that specifies various characteristics of the event listener. It can be an object that
 * specifies whether the event listener should be passive, capture, or once.


 * The render function appends a component to a specified mount node in JavaScript.
 * @param component - The `component` parameter is typically a DOM element or a virtual DOM element
 * that you want to render on the web page. It could be a div, a button, a paragraph, or any other HTML
 * element.
 * @param mountNode - The `mountNode` parameter is typically a reference to the HTML element where you
 * want to render the component. It is the DOM element to which you want to append the component.
 

 * The function `updateElement` replaces an old child element with a new child element within a
 * specified parent element.
 * @param parent - The `parent` parameter in the `updateElement` function refers to the element that
 * contains both the `newChild` and `oldChild` elements. It is the element to which the `newChild` will
 * be added and the `oldChild` will be replaced within the DOM.
 * @param newChild - The `newChild` parameter is the element that you want to replace the `oldChild`
 * with in the `parent` element.
 * @param oldChild - The `oldChild` parameter in the `updateElement` function represents the existing
 * child element that you want to replace within the `parent` element.
 
The `const MyFrame` object is being created and initialized with properties that are references to
the functions defined in the JavaScript code snippet. These functions include `createDomElement`,
`createDomElementFromJSON`, `on`, `render`, and `updateElement`. By assigning these functions as
properties of the `MyFrame` object, they can be easily accessed and used collectively as part of a
mini framework or library for creating and manipulating DOM elements in a web application. This
organization helps in modularizing the code and providing a convenient way to interact with these
functions as a cohesive unit.
##
The `Router` class is a simple example of a router for a web application. A router is a component that manages navigation between different parts (or "routes") of a web application. It allows loading and displaying different components based on the current URL in the browser. Here is a detailed explanation of each part of the class:

1. **Constructor (`constructor`)**:
   - The constructor initializes an empty object `this.routes` which will be used to store the associations between the paths and the corresponding components.
   - It also defines an event handler for the `popstate` event of the `window` object. This event is triggered when the user navigates through the browser history (for example, using the Back and Forward buttons). The event handler is linked to the `resolveCurrentRoute` method of the `Router` class instance, which means that whenever the `popstate` event occurs, the `resolveCurrentRoute` method will be called to update updates the display based on the current URL.

2. **`addRoute` method**:
   - This method takes two arguments: `path` and `component`. `path` is a string representing the URL path for which the component should be displayed. `component` is the component itself that will be rendered when the user navigates to this path.
   - The method adds a new entry to the `this.routes` object, using `path` as key and `component` as value. This lets the router know which component to display based on the current URL.

3. **`navigate` method**:
   - The `navigate` method takes a `path` argument, which is the path the user wants to navigate to.
   - It uses `history.pushState` to add a new entry to the browser history without reloading the page. This allows you to change the URL in the address bar without causing a full page reload.
   - After changing the URL, it calls `this.resolveCurrentRoute` to update the display based on the new path.

4. **`resolveCurrentRoute` method**:
   - This method is responsible for determining which component should be displayed based on the current URL.
   - It retrieves the current URL path using `window.location.pathname`.
   - It then searches in the `this.routes` object for the component associated with this path. If such a component exists, it renders it and adds it to the DOM.
   - To do this, it first selects the element with the ID "app" (which is usually the main container of the application).
   - It then dumps the content of this element by setting `app.innerHTML = ""`.
   - Finally, it calls the `render` method of the found component and adds the result to the "app" element. This displays the component corresponding to the current URL.
##

The `Store` class is a simple example of a state management model in a JavaScript application. It is often used in web applications to manage the overall state of the application centrally. Here is a detailed explanation of each part of the class:

1. **Constructor (`constructor`)**:
   - The constructor initializes the initial state of the store (`this.state`) with the value passed as an argument (`initialState`).
   - It also initializes an empty array `this.listeners` to store callbacks that will be called when the state changes.

2. **`getState` method**:
   - This method returns the current state of the store. It is used to access the current state without modifying it.

3. **`setState` method**:
   - The `setState` method takes a new state (`newState`) as an argument and updates the internal state of the store (`this.state`) with this new value.
   - After updating the state, it goes through the `this.listeners` array and calls each callback function (listener) with the new state as an argument. This helps notify all parts of the application that are interested in state changes.

4. **`subscribe` method**:
   - The `subscribe` method allows you to add a new callback function (listener) to the `this.listeners` array. This function will be called every time the state changes.
   - It returns an unsubscribe function which, when called, removes the callback function from the `this.listeners` array. This helps clean up listeners that are no longer needed, preventing memory leaks and unexpected behavior.

##
The subscribe method adds a new callback function (listener) to the this.listeners array. This function will be called every time the state changes.
The `BaseElement` class is an example of creating a custom element using the Web Components of the Web platform. Web Components allow you to create reusable HTML elements with their own logic, structure and style. Here is a detailed explanation of each part of the class:

1. **Constructor (`constructor`)**:
   - The constructor is called when the element is created or updated. It starts by calling `super()`, which is necessary to call the constructor of the parent class (`HTMLElement`).
   - Then it calls `this.attachShadow({ mode: "open" })`. This creates a Shadow DOM for the element, which is a mechanism for encapsulating the style and structure of the element from the rest of the DOM. "Open" mode means that the Shadow DOM is accessible from outside the element.

   2. **`connectedCallback` method**:
   - This method is called every time the element is inserted into the DOM. It is used to initialize the element or perform actions that require the element to already be in the DOM.
   - In this method, a `MutationObserver` is created to observe the attribute changes of the element. The `MutationObserver` is configured to observe attribute mutations and to record the old value of the attribute.
   - When an attribute mutation is detected, the `attributeChanged` method is called with the name of the modified attribute, the old value and the new value.

3. **`disconnectedCallback` method**:
   - This method is called every time the element is removed from the DOM. It is used to clean up resources or perform cleanup actions when the item is no longer in use.
   - In this method, if a `MutationObserver` has been created, it is disconnected by calling `this.observer.disconnect()`. This stops observing mutations and frees up the resources associated with observing it.

4. **`attributeChanged` method**:
   - This method is called automatically by the browser whenever an observed attribute of the element changes. It receives the name of the modified attribute, the old value and the new value.
   - In this example, the method simply displays a message in the console indicating that the attribute has changed.

5. **`render` method**:
   - This method is used to set the HTML content of the Shadow DOM of the element. It takes a string `html` as an argument and assigns this string to `this.shadowRoot.innerHTML`. This defines the content of the Shadow DOM, which is encapsulated and isolated from the rest of the DOM.

## 🏁 Getting Started <a name = "getting_started"></a>

In this part you have an example of using mini-frawork to set up todoList.
The todoList implements almost all the different parts and functions of mini-framework.

The todoExample folder contains the different files necessary to implement the framework.

* app.js

In this file we have the creation of the `TodoList` interface through the functions from the framework
here is an example of creating a container and its description

```function ToggleAllComponent() {
  const toggleAllCheckbox = MyFrame.createDomElement("input", {
    class: "toggle-all",
    type: "checkbox",
    "data-testid": "toggle-all",
    id: "toggle-all",
  });

  const toggleAllLabel = MyFrame.createDomElement(
    "label",
    {
      class: "toggle-all-label",
      for: "toggle-all",
    },
    “Toggle All Input”
  );

  const toggleAllContainer = MyFrame.createDomElement(
    "div",
    {
      class: "toggle-all-container",
    },
    toggleAllCheckbox,
    toggleAllLabel
  );

  return toggleAllContainer;
}
```

 * The ToggleAllComponent function creates a container with a checkbox and a label for
 * toggle all inputs.
 * @returns The `ToggleAllComponent` function returns a container element (`div`) which contains a
 * checkbox input element with class "toggle-all", type "checkbox", data-testid
 * "toggle-all" and id "toggle-all". , as well as a label element for the checkbox with the class
 * "toggle-all-label" and the "for" attribute set to "toggle-all". The label text is set
 * on "Toggle all entries


* index.html

In the `index.js` we have a main structure `(parent body)` in which the `DOM` created in the `app.js` file will be `append`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>TodoMVC with Mini Framework</title>
    <link rel="stylesheet" href="style.css" />
    <!-- Add your CSS here -->
  </head>

  <body>
    <script src="app.js" type="module"></script>
  </body>
</html>

```
### Prerequisites

To properly use this framework you will need minimum knowledge of:

- `javascript`
- `the virtual DOM`
- `Data binding`
- `Models`

## ⛏️ Built With <a name = "tech_stack"></a>

- [Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript) - Langage
- [virtual DOM](https://bitsofco.de/understanding-the-virtual-dom/) - Structure
- [Data binding](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/?view=netdesktop-7.0&redirectedfrom=MSDN) - Interact with data
- [Models](https://medium.com/@BuildMySite1/javascript-templating-what-is-templating-7ff49d97db6b)  

## ✍️ Authors <a name = "authors"></a>

- * @ymadike
- * @nifaye
- * @mamdrame
- * @igueye
