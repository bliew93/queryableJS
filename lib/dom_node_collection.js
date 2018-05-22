const _forEach = Symbol('forEach');

class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  // public
  html(string) {
    if(string) {
      this[_forEach]( (element) => {
        element.innerHTML = string;
      });
    }
    else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  empty() {
    this[_forEach]( (element) => {
      element.innerHTML = '';
    });
  }

  append(input) {
    if(input instanceof DOMNodeCollection) {
      input.HTMLElements.forEach((inputElement) => {
        this[_forEach]( (element) => {
          element.innerHTML += element.outerHTML;
        });
      });
    }
    else {
      this[_forEach]( (element) => {
        element.innerHTML += input;
      });
    }
  }

  attr(attributeName, input) {
    if(input && typeof input === 'string') {
      this[_forEach](element => element.setAttribute(attributeName, input));
    }
    else {
      const foundAttr = this.HTMLElements.find( (element) => {
        return element.getAttribute(attributeName);
      });

      if (foundAttr) { return foundAttr.getAttribute(attributeName); }
    }
  }

  addClass(className) {
    const classNames = className.split(' ');

    for (var i = 0; i < classNames.length; i++) {
      this[_forEach]( (element) => { // jshint ignore:line
        element.classList.add(classNames[i]);
      });
    }

    return this;
  }

  removeClass(className) {
    const classNames = className.split(' ');

    for (var i = 0; i < classNames.length; i++) {
      this[_forEach]( (element) => { // jshint ignore:line
        element.classList.remove(classNames[i]);
      });
    }

    return this;
  }

  children() {
    let children = [];
    this[_forEach]( (element) => {
      children = children.concat(Array.from(element.children));
    });

    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this[_forEach]( (element) => {
      if(!parents.includes(element.parentElement)) {
        parents = parents.concat(element.parentElement);
      }
    });

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let result = [];
    this[_forEach] ( (element) => {
      const selectedFromEl = element.querySelectorAll(selector);
      result = result.concat(Array.from(selectedFromEl));
    });

    return new DOMNodeCollection(result);
  }

  remove() {
    this[_forEach]( (element) => {
      element.remove();
    });

    this.HTMLElements =[];
    return this;
  }

  on(type, cb) {
    this[_forEach] ( (element) => {
      element.addEventListener(type, cb);
      element.callback = cb;
    });
  }

  off(type) {
    this[_forEach] ( (element) => {
      element.removeEventListener(type, element.callback);
    });
  }

  

  // private
  [_forEach](cb) {
    this.HTMLElements.forEach(cb);
  }

}

export default DOMNodeCollection;
