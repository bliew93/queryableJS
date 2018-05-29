# QueryableJS
## A lightweight JavaScript library to manage core HTML DOM manipulation, event handling, and AJAX requests

### Background
Using QueryableJS, users can:
* Select single or multiple DOM elements
* Traverse and manipulate DOM elements
* Build DOM elements
* Create `DOMNodeCollection` objects from `HTMLElement`s
* Perform AJAX requests


### Installation
To get started with QueryableJS, download this library into your project and include the webpack output `queryable.js` in your source code.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="/lib/queryable.js"></script>
  ...
</head>
```

### API

`$l`

The global function `$l` is used as a DOM node wrappper that returns a `DOMNodeCollection` in which you can use to perform the QueryableJS methods defined in the library. The function takes 1 argument which accepts 3 types: a string, HTMLElement, or function.

If passed a string, `$l` will return a `DOMNodeCollection` object containing the matched HTML nodes in the `HTMLElements` property. If passed `HTMLElement`s, `$l` will return a `DOMNodeCollection` object containing the `HTMLElement`s. If passed a function(s), `$l` will store it in an array and call the function(s) passed once the DOM has been loaded.

`html(string)`
* Takes a `string` as an optional argument.
* If no arguments are given, returns the `innerHTML` of the first element in the DOMNodeCollection object.
* If passed a string, changes each element's `innerHTML` in the object to the string.

`empty`
* Empties the `innerHTML` of each element in the DOMNodeCollection.

`append(input)`
* Takes a single `HTMLElement`, `string`, or `DOMNodeCollection` as an argument.
* Appends the given argument to each element in the DOMNodeCollection.

`attr(attributeName, input)`
* Takes 2 arguments: a required argument `attributeName` and an optional argument, type string, `input`
* If no input is given, returns the first `HTMLElement` that matches the given attributeName. If no matches are found, nothing is returned.
* If an input is given, set each element in the DOMNodeCollection with the attributeName given and the input given.

`addClass(className)`
* Adds the given class name to the elements in the DOMNodeCollection

`removeClass(className)`
* Removes the given class name to the elements in the DOMNodeCollection

`children`
* Returns the collection of all children of each element in the DOMNodeCollection

`parent`
* Returns the collection of all parents of each element in the DOMNodeCollection

`find(selector)`
* Takes 1 required string argument: `selector`
* Returns a DOMNodeCollection of all the elements matching the selector given

`remove`
* Removes the content of all elements in the DOMNodeCollection

`on(type, selector, cb)`
* Takes 2 required arguments: `type` (string) and `cb` (function), and 1 optional argument: selector (string)
* If no selector given, adds an event listener to each element in the DOMNodeCollection with the type given and the function to be called when the event occurs.
* If a selector is given, adds an event listener the <b>children</b> of each element in the DOMNodeCollection with the type given and the function to be called when the event occurs.

`off(type)`
* Takes 1 required argument: `type` (string)
* Removes the event listener with the given type for each element in the DOMNodeCollection

`toggleClass(className)`
* Takes 1 required argument: `className` (string)
* For each element in the DOMNodeCollection, if the given class exists, remove it. Else, add the class to the element.

`text(content)`
* Takes 1 optional argument: `content` (string)
* If no content given, sets each element's innerHTML in the DOMNodeCollection to an empty string.
* If content given, sets each element's innerHTML in the DOMNodeCollection to the given content.

`index(input)`
* Takes 1 optional argument: `input` (DOMNodeCollection || string)
* If no input given, returns the index of the DOMNodeCollection relative to it's siblings
* If input is a DOMNodeCollection, return the index of the input in the DOMNodeCollection
* If input is a string, return the index of the HTMLElement in the DOMNodeCollection

### AJAX
Sends HTTP Request and returns a Promise object. Accepts a Hash object as an argument with any of the following attributes:

* method (default: "GET"): HTTP Request method or type
* url (default: window.location.href): URL for HTTP Request
* success: success callback
* error: error callback
* contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of * HTTP Request

````js
return new Promise( (resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(defaults.method, defaults.url);

    request.onload = function () {
      if (request.status === 200) {
        defaults.success(JSON.parse(request.response));
        resolve(JSON.parse(request.response));
      }
      else {
        defaults.error(JSON.parse(request.response));
        reject(JSON.parse(request.response));
      }
    };

    request.send(JSON.stringify(defaults.data));
  });
};
````
