import DOMNodeCollection from './dom_node_collection.js';
import { merge } from 'lodash';

const $l = (input) => {
  if(typeof input === 'string') {
    if(input.match(/<(\w+)\s*(class=)?(\W\w+\W)?.*>(.*)?<\/\w+>/)) {
      const inputMatches = input.match(/<(\w+)\s*(class=)?(\W\w+\W)?.*>(.*)?<\/\w+>/);
      const newElement = document.createElement(inputMatches[1]);

      if(inputMatches[4] !== undefined) {
        const newContent = document.createTextNode(inputMatches[4]);
        newElement.appendChild(newContent);
      }
      if (inputMatches[3] !== undefined) {
        newElement.className = inputMatches[3];
      }
      
      return newElement;
    }
    else {
      const selectedList = document.querySelectorAll(input);
      return new DOMNodeCollection(Array.from(selectedList));
    }
  }
  else if (input instanceof HTMLElement) {
    const elementArray = [input];
    return new DOMNodeCollection(elementArray);
  }
  else if (typeof input === 'function') {
    let callbacks = [];
    callbacks = callbacks.concat(input);

    document.addEventListener("DOMContentLoaded", function() {
      callbacks.forEach( (cb) => { cb(); });
    });
  }
};


$l.extend = (...obj) => {
  return merge(...obj);
};

$l.ajax = (options) => {
  const defaults = {
    method: 'get',
    url: window.location.href,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: () => {},
    error: () => {}
  };

  merge(defaults, options);

  return new Promise( (resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(defaults.method, defaults.url);

    request.onload = function () {
      if (request.status === 200) {
        defaults.success(JSON.parse(request.response));
        resolve(JSON.parse(request.response)); // parse JSON string into js obj
      }
      else {
        defaults.error(JSON.parse(request.response));
        reject(JSON.parse(request.response));
      }
    };

    request.send(JSON.stringify(defaults.data)); //send data obj as a JSON string
  });
};

window.$l = $l;
