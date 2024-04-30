/**
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
 */
function createDomElementFromJsonStructure(jsonStructure, parent = document.body) {
  const { tag, attrs = {}, children = [] } = jsonStructure;
  const domElement = document.createElement(tag);
 
  // Ajout des attributs à l'élément
  for (const attr in attrs) {
     domElement.setAttribute(attr, attrs[attr]);
  }
 
  // Ajout des enfants à l'élément
  children.forEach(child => {
     if (typeof child === "object") {
       domElement.appendChild(createDomElementFromJsonStructure(child));
     } else {
       domElement.appendChild(document.createTextNode(child));
     }
  });
 
  // Ajout de l'élément au parent
  parent.appendChild(domElement);
 
  return domElement;
 }

/**
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
 */
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * La fonction `createDomElement` crée un nouvel élément HTML avec des attributs et des enfants spécifiés,
 * gérant les écouteurs d'événements et les nœuds de texte.
 * @param tagName - Le paramètre `tagName` dans la fonction `createDomElement` représente le type
 * d&#39;élément HTML que vous souhaitez créer. Par exemple, si vous transmettez &quot;div&quot; comme
 * `tagName`, la fonction créera un `<div> `élément.
 * @param [attrs] - Le paramètre `attrs` dans la fonction `createDomElement` est un objet qui contient des
 * attributs et leurs valeurs correspondantes pour l'élément HTML créé. Ces attributs peuvent inclure
 * des éléments comme « id », « class », « style », etc. La fonction parcourt cet objet et définit ces
 * attributs sur l'élément créé. En plus
 * @param children - Le paramètre « children » dans la fonction « createDomElement » représente les
 * éléments enfants ou les nœuds de texte qui seront ajoutés à l'élément créé. Ces enfants peuvent être
 * soit des chaînes (pour les nœuds de texte), des nœuds DOM ou d'autres éléments créés à l'aide de la
 * fonction `createDomElement`. La fonction parcourt tous les enfants fournis
 * @returns La fonction `createDomElement` renvoie un élément HTML nouvellement créé avec le nom de
 * balise, les attributs et lexport { MyFrame };
es nœuds enfants spécifiés.
 */
function createDomElement(tagName, attrs = {}, ...children) {
  const element = document.createElement(tagName);

  for (const [attr, value] of Object.entries(attrs)) {
    if (attr.startsWith("on") && typeof value === "function") {
      const eventName = attr.substring(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(attr, value);
    }
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (Array.isArray(child)) {
      child.forEach((nestedChild) => element.appendChild(nestedChild));
    } else if (child instanceof Node) {
      element.appendChild(child);
    } else {
      console.error("Invalid child type", child);
    }
  });

  return element;
}


/**
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
 */
/**
 * La fonction `on` est une fonction JavaScript qui ajoute un écouteur d'événement à un élément
 * spécifié.
 * @param element - Le paramètre `element` représente l'élément HTML auquel l'écouteur d'événement sera
 * attaché.
 * @param eventType - Le paramètre `eventType` dans la fonction `on` représente le type d'événement que
 * l'écouteur d'événement écoutera. Des exemples de types d'événements incluent "click", "mouseover",
 * "keydown", "submit", etc. Lorsqu'un événement du type spécifié se produit sur l'élément, le «
 * gestionnaire » fourni
 * @param handler - Le paramètre `handler` dans la fonction `on` est une fonction de rappel qui sera
 * exécutée lorsque le `eventType` spécifié se produit sur `element`.
 * @param [options=false] - Le paramètre `options` dans la méthode `addEventListener` est un paramètre
 * facultatif qui spécifie un objet qui spécifie les caractéristiques de l'écouteur d'événement.
 * Certaines options courantes incluent :
 */
function attachEventHandler(element, eventType, handler, options = false) {
  element.addEventListener(eventType, handler, options);
}

/**
 * The render function appends a component to a specified mount node in JavaScript.
 * @param component - The `component` parameter is typically a DOM element or a virtual DOM element
 * that you want to render on the web page. It could be a div, a button, a paragraph, or any other HTML
 * element.
 * @param mountNode - The `mountNode` parameter is typically a reference to the HTML element where you
 * want to render the component. It is the DOM element to which you want to append the component.
 */
function appendComponentToNode(component, mountNode) {
  mountNode.appendChild(component);
}

/**
 * The function `updateElement` replaces an old child element with a new child element within a
 * specified parent element.
 * @param parent - The `parent` parameter in the `updateElement` function refers to the element that
 * contains both the `newChild` and `oldChild` elements. It is the element to which the `newChild` will
 * be added and the `oldChild` will be replaced within the DOM.
 * @param newChild - The `newChild` parameter is the element that you want to replace the `oldChild`
 * with in the `parent` element.
 * @param oldChild - The `oldChild` parameter in the `updateElement` function represents the existing
 * child element that you want to replace within the `parent` element.
 */
function replaceChildElement(parent, newChild, oldChild) {
  parent.replaceChild(newChild, oldChild);
}

/* The `const MyFrame` object is being created and initialized with properties that are references to
the functions defined in the JavaScript code snippet. These functions include `createDomElement`,
`createDomElementFromJSON`, `on`, `render`, and `updateElement`. By assigning these functions as
properties of the `MyFrame` object, they can be easily accessed and used collectively as part of a
mini framework or library for creating and manipulating DOM elements in a web application. This
organization helps in modularizing the code and providing a convenient way to interact with these
functions as a cohesive unit. */
const MyFrame = {
  createDomElement,
  createDomElementFromJsonStructure,
  attachEventHandler,
  appendComponentToNode,
  replaceChildElement,
};

export { MyFrame };
