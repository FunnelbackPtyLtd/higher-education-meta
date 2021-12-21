/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 57399:
/***/ (function() {


// Polyfill requestAnimationFrame for oldIE
// adapted from https://gist.github.com/paulirish/1579671
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// original source was published under the MIT license
// https://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

typeof window !== 'undefined' && (function() {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  let requestAnimationFrameName = '';
  let cancelAnimationFrameName = '';

  for (let x = 0, length = vendors.length; x < length; ++x) {
    requestAnimationFrameName = window[vendors[x] + 'RequestAnimationFrame'];
    cancelAnimationFrameName = window[vendors[x] + 'CancelAnimationFrame']
      || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (typeof window.requestAnimationFrame !== 'function') {
    window.requestAnimationFrame = window[requestAnimationFrameName] || function(callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);

      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (typeof window.cancelAnimationFrame !== 'function') {
    window.cancelAnimationFrame = window[cancelAnimationFrameName] || function(id) {
      clearTimeout(id);
    };
  }
})();


/***/ }),

/***/ 48093:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": function() { return /* binding */ getParentComparator; }
/* harmony export */ });

// Node.compareDocumentPosition is available since IE9
// see https://developer.mozilla.org/en-US/docs/Web/API/Node.compareDocumentPosition

// callback returns true when element is contained by parent or is the parent suited for use with Array.some()
/*
  USAGE:
    var isChildOf = getParentComparator({parent: someNode});
    listOfElements.some(isChildOf)
*/

function getParentComparator({parent, element, includeSelf} = {}) {
  if (parent) {
    return function isChildOf(node) {
      return Boolean(
        includeSelf && node === parent
        || parent.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY
      );
    };
  } else if (element) {
    return function isParentOf(node) {
      return Boolean(
        includeSelf && element === node
        || node.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_CONTAINED_BY
      );
    };
  }

  throw new TypeError('util/compare-position#getParentComparator required either options.parent or options.element');
}


/***/ }),

/***/ 93033:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });

// input may be undefined, selector-tring, Node, NodeList, HTMLCollection, array of Nodes
// yes, to some extent this is a bad replica of jQuery's constructor function
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(input) {
  if (!input) {
    return [];
  }

  if (Array.isArray(input)) {
    return input;
  }

  // instanceof Node - does not work with iframes
  if (input.nodeType !== undefined) {
    return [input];
  }

  if (typeof input === 'string') {
    input = document.querySelectorAll(input);
  }

  if (input.length !== undefined) {
    return [].slice.call(input, 0);
  }

  throw new TypeError('unexpected input ' + String(input));
}


/***/ }),

/***/ 87308:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ key; }
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/map/keycode.js

// codes mostly cloned from https://github.com/keithamus/jwerty/blob/master/jwerty.js
// deliberately not exposing characters like <,.-#* because they vary *wildly*
// across keyboard layouts and may cause various problems
// (e.g. "*" is "Shift +" on a German Mac keyboard)
// (e.g. "@" is "Alt L" on a German Mac keyboard)

const keycode = {
  // Element Focus
  tab: 9,

  // Navigation
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  pageUp: 33,
  'page-up': 33,
  pageDown: 34,
  'page-down': 34,
  end: 35,
  home: 36,

  // Action
  enter: 13,
  escape: 27,
  space: 32,

  // Modifier
  shift: 16,
  capsLock: 20,
  'caps-lock': 20,
  ctrl: 17,
  alt: 18,
  meta: 91,
  // in firefox: 224
  // on mac (chrome): meta-left=91, meta-right=93
  // on win (IE11): meta-left=91, meta-right=92
  pause: 19,

  // Content Manipulation
  insert: 45,
  'delete': 46,
  backspace: 8,

  // the same logical key may be identified through different keyCodes
  _alias: {
    91: [92, 93, 224],
  },
};

// Function keys (112 - 137)
// NOTE: not every keyboard knows F13+
for (let n = 1; n < 26; n++) {
  keycode['f' + n] = n + 111;
}

// Number keys (48-57, numpad 96-105)
// NOTE: not every keyboard knows num-0+
for (let n = 0; n < 10; n++) {
  const code = n + 48;
  const numCode = n + 96;
  keycode[n] = code;
  keycode['num-' + n] = numCode;
  keycode._alias[code] = [numCode];
}

// Latin characters (65 - 90)
for (let n = 0; n < 26; n++) {
  const code = n + 65;
  const name = String.fromCharCode(code).toLowerCase();
  keycode[name] = code;
}

/* harmony default export */ var map_keycode = (keycode);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/when/key.binding.js

/*
  decodes a key binding token to a JavaScript structure

  returns an array of objects:
    {
      // key name translated to keyCode (possibly more than one)
      keyCodes: [<number>],
      // translated modifiers
      modifiers: {
        altKey: null,   // ignore
        ctrKey: false,  // expect not pressed
        metaKey: true,  // expect pressed
        shiftKey: true, // expect pressed
      },
      // callback that returns true if event's
      // modifier keys match the expected state
      matchModifiers: function(event){},
    }
*/



const modifier = {
  alt: 'altKey',
  ctrl: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey',
};

const modifierSequence = Object.keys(modifier).map(name => modifier[name]);

function createExpectedModifiers(ignoreModifiers) {
  const value = ignoreModifiers ? null : false;
  return {
    altKey: value,
    ctrlKey: value,
    metaKey: value,
    shiftKey: value,
  };
}

function resolveModifiers(modifiers) {
  const ignoreModifiers = modifiers.indexOf('*') !== -1;
  const expected = createExpectedModifiers(ignoreModifiers);

  modifiers.forEach(function(token) {
    if (token === '*') {
      // we've already covered the all-in operator
      return;
    }

    // we want the modifier pressed
    let value = true;
    const operator = token.slice(0, 1);
    if (operator === '?') {
      // we don't care if the modifier is pressed
      value = null;
    } else if (operator === '!') {
      // we do not want the modifier pressed
      value = false;
    }

    if (value !== true) {
      // compensate for the modifier's operator
      token = token.slice(1);
    }

    const propertyName = modifier[token];
    if (!propertyName) {
      throw new TypeError('Unknown modifier "' + token + '"');
    }

    expected[propertyName] = value;
  });

  return expected;
}

function resolveKey(key) {
  const code = map_keycode[key] || parseInt(key, 10);
  if (!code || typeof code !== 'number' || isNaN(code)) {
    throw new TypeError('Unknown key "' + key + '"');
  }

  return [code].concat(map_keycode._alias[code] || []);
}

function matchModifiers(expected, event) {
  // returns true on match
  return !modifierSequence.some(function(prop) {
    // returns true on mismatch
    return typeof expected[prop] === 'boolean' && Boolean(event[prop]) !== expected[prop];
  });
}

/* harmony default export */ function key_binding(text) {
  return text.split(/\s+/).map(function(_text) {
    const tokens = _text.split('+');
    const _modifiers = resolveModifiers(tokens.slice(0, -1));
    const _keyCodes = resolveKey(tokens.slice(-1));
    return {
      keyCodes: _keyCodes,
      modifiers: _modifiers,
      matchModifiers: matchModifiers.bind(null, _modifiers),
    };
  });
}

// EXTERNAL MODULE: ./node_modules/ally.js/src/util/node-array.js
var node_array = __webpack_require__(93033);
// EXTERNAL MODULE: ./node_modules/ally.js/src/util/compare-position.js
var compare_position = __webpack_require__(48093);
;// CONCATENATED MODULE: ./node_modules/ally.js/src/when/key.js





// Bug 286933 - Key events in the autocomplete popup should be hidden from page scripts
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=286933

/* harmony default export */ function key(map = {}) {
  const bindings = {};

  const context = (0,node_array/* default */.Z)(map.context)[0] || document.documentElement;
  delete map.context;
  const filter = (0,node_array/* default */.Z)(map.filter);
  delete map.filter;

  const mapKeys = Object.keys(map);
  if (!mapKeys.length) {
    throw new TypeError('when/key requires at least one option key');
  }

  const registerBinding = function(event) {
    event.keyCodes.forEach(function(code) {
      if (!bindings[code]) {
        bindings[code] = [];
      }

      bindings[code].push(event);
    });
  };

  mapKeys.forEach(function(text) {
    if (typeof map[text] !== 'function') {
      throw new TypeError('when/key requires option["' + text + '"] to be a function');
    }

    const addCallback = function(event) {
      event.callback = map[text];
      return event;
    };

    key_binding(text)
      .map(addCallback)
      .forEach(registerBinding);
  });

  const handleKeyDown = function(event) {
    if (event.defaultPrevented) {
      return;
    }

    if (filter.length) {
      // ignore elements within the exempted sub-trees
      const isParentOfElement = (0,compare_position/* getParentComparator */.f)({element: event.target, includeSelf: true});
      if (filter.some(isParentOfElement)) {
        return;
      }
    }

    const key = event.keyCode || event.which;
    if (!bindings[key]) {
      return;
    }

    bindings[key].forEach(function(_event) {
      if (!_event.matchModifiers(event)) {
        return;
      }

      _event.callback.call(context, event, disengage);
    });
  };

  context.addEventListener('keydown', handleKeyDown, false);

  const disengage = function() {
    context.removeEventListener('keydown', handleKeyDown, false);
  };

  return { disengage };
}


/***/ }),

/***/ 9669:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(51609);

/***/ }),

/***/ 55448:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);
var settle = __webpack_require__(36026);
var cookies = __webpack_require__(4372);
var buildURL = __webpack_require__(15327);
var buildFullPath = __webpack_require__(94097);
var parseHeaders = __webpack_require__(84109);
var isURLSameOrigin = __webpack_require__(67985);
var createError = __webpack_require__(85061);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ 51609:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);
var bind = __webpack_require__(91849);
var Axios = __webpack_require__(30321);
var mergeConfig = __webpack_require__(47185);
var defaults = __webpack_require__(45655);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(65263);
axios.CancelToken = __webpack_require__(14972);
axios.isCancel = __webpack_require__(26502);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(8713);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(16268);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ 65263:
/***/ (function(module) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 14972:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(65263);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 26502:
/***/ (function(module) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 30321:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);
var buildURL = __webpack_require__(15327);
var InterceptorManager = __webpack_require__(80782);
var dispatchRequest = __webpack_require__(13572);
var mergeConfig = __webpack_require__(47185);
var validator = __webpack_require__(54875);

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 80782:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 94097:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(91793);
var combineURLs = __webpack_require__(7303);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ 85061:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(80481);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 13572:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);
var transformData = __webpack_require__(18527);
var isCancel = __webpack_require__(26502);
var defaults = __webpack_require__(45655);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 80481:
/***/ (function(module) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ 47185:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ 36026:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(85061);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 18527:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);
var defaults = __webpack_require__(45655);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ 45655:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);
var normalizeHeaderName = __webpack_require__(16016);
var enhanceError = __webpack_require__(80481);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(55448);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(55448);
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ 91849:
/***/ (function(module) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 15327:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 7303:
/***/ (function(module) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 4372:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ 91793:
/***/ (function(module) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 16268:
/***/ (function(module) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ 67985:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ 16016:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 84109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(64867);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 8713:
/***/ (function(module) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 54875:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var pkg = __webpack_require__(88593);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ 64867:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(91849);

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ 27695:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(33948);
;// CONCATENATED MODULE: ./src/styles/icons.js


// Import all icon SVGs into the build
function requireAll(r) {
  r.keys().forEach(r);
}

const requireIcons = requireAll(__webpack_require__(9034));
/* harmony default export */ var icons = ((/* unused pure expression or super */ null && (requireIcons)));
// EXTERNAL MODULE: ./node_modules/core-js/stable/index.js
var stable = __webpack_require__(28594);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(35666);
;// CONCATENATED MODULE: ./src/index.js
// CSS
 // Imported for loading in the icons
// eslint-disable-next-line no-unused-vars

 // For pollyfills




/***/ }),

/***/ 25857:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OG": function() { return /* binding */ screenSizeMD; },
/* harmony export */   "q5": function() { return /* binding */ minMediaQueryMD; },
/* harmony export */   "QO": function() { return /* binding */ minMediaQueryXL; },
/* harmony export */   "Yk": function() { return /* binding */ getCurrentScreenSizeInt; }
/* harmony export */ });
/* unused harmony exports default, screenSizeXS, minMediaQueryXS, screenSizeSM, minMediaQuerySM, screenSizeLG, minMediaQueryLG, screenSizeXL, screenSizeXXL, minMediaQueryXXL */
/**
 * A function that gets the current screens breakpoint size as a string
 * @module getCurrentScreenSize
 * @returns {string} - Returns a string of the current breakpoint size
 */
function getCurrentScreenSize() {
  return window.getComputedStyle(document.documentElement).getPropertyValue('--screen-size');
}
const screenSizeXS = 1;
const minMediaQueryXS = 'min-width: 0px';
const screenSizeSM = 2;
const minMediaQuerySM = 'min-width: 576px';
const screenSizeMD = 3;
const minMediaQueryMD = 'min-width: 768px';
const screenSizeLG = 4;
const minMediaQueryLG = 'min-width: 992px';
const screenSizeXL = 5;
const minMediaQueryXL = 'min-width: 1200px';
const screenSizeXXL = 6;
const minMediaQueryXXL = 'min-width: 1400px';
/**
 * A function that gets the current screens breakpoint size as a integer
 * @module getCurrentScreenSizeInt
 * @returns {int} - Returns a int of the current breakpoint size
 */

function getCurrentScreenSizeInt() {
  return parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--screen-size-int'), 10);
}

/***/ }),

/***/ 98051:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ stringToBool; }
/* harmony export */ });
/**
 * Takes a string and converts it to boolean, with a default option if the string isn't true/false or undefined
 * @module stringToBool
 * @param {string} string - The string to be converted to boolean
 * @param {boolean} defaultOption - The default to be returned if the string isn't correct
 * @returns {boolean}
 */
function stringToBool(string, defaultOption) {
  // Check that the string is defined
  if (string) {
    // Check that we are getting back a valid boolean
    if (string.toLowerCase() === 'true' || string.toLowerCase() === 'false') {
      return JSON.parse(string.toLowerCase());
    }
  }

  return defaultOption;
}

/***/ }),

/***/ 29289:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/modules/_integrations/git-switcher/js/FeatureBranchSwitcher.js
const FEATURE_BRANCH_MANAGER_COOKIE_NAME = 'branch';
const FEATURE_BRANCH_MANAGER_EXPIRY_TIME = 60000 * 60; // 1 Hour

const FEATURE_BRANCH_RESET_SELECTOR = '[data-click="featureBranchReset"]';
const FEATURE_BRANCH_SET_SELECTOR = '[data-click="featureBranchSet"]';
class FeatureBranchSwitcher {
  constructor(control) {
    this.component = control;
    const reset = control.querySelector(FEATURE_BRANCH_RESET_SELECTOR);

    if (reset) {
      reset.addEventListener('click', () => {
        this.resetToDefaultBranch();
      });
    }

    const set = control.querySelectorAll(FEATURE_BRANCH_SET_SELECTOR);
    set.forEach(setControl => {
      setControl.addEventListener('click', event => {
        this.setFeatureBranch(event.target.dataset.branch);
      });
    });
  }

  setFeatureBranch(value) {
    const expiry = new Date(new Date().getTime() + FEATURE_BRANCH_MANAGER_EXPIRY_TIME);
    document.cookie = "".concat(FEATURE_BRANCH_MANAGER_COOKIE_NAME, "=").concat(value, "; expires=").concat(expiry.toUTCString(), "; path=/;");
    window.location.reload();
  }

  resetToDefaultBranch() {
    const expiry = new Date();
    document.cookie = "".concat(FEATURE_BRANCH_MANAGER_COOKIE_NAME, "=; expires=").concat(expiry.toUTCString(), "; path=/;");
    window.location.reload();
  }

}
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(33948);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.js
var web_url_search_params = __webpack_require__(41637);
;// CONCATENATED MODULE: ./src/modules/_integrations/git-switcher/js/FeatureBranchManager.js



const FEATURE_BRANCH_CREATE_LINK_SELECTOR = '[data-submit="featureBranchCreateLink"]';
const FEATURE_BRANCH_COPY_LINK_SELECTOR = '[data-click="featureBranchLinkCopy"]';
class FeatureBranchManager extends FeatureBranchSwitcher {
  constructor(control) {
    super(control);
    control.querySelector(FEATURE_BRANCH_CREATE_LINK_SELECTOR).addEventListener('submit', event => {
      this.createAutoRedirectString(event);
    });
    control.querySelector(FEATURE_BRANCH_COPY_LINK_SELECTOR).addEventListener('click', event => {
      this.copyRedirectString(event);
    });
    this.checkAndActiveRedirect();
  }

  checkAndActiveRedirect() {
    /*
        Check if an auto redirect string has been provided
    */
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPage = urlParams.get('redirectPage');
    const branch = urlParams.get('branch');

    if (redirectPage && branch) {
      this.setFeatureBranch(branch);
      window.location = redirectPage;
    }
  }

  createAutoRedirectString(event) {
    /* 
        Create a URL with query params which will be picked up by the checkAndActiveRedirect() 
        function when shared with a customer to redirect them to the correct page and bridge
        */
    const {
      target
    } = event;
    event.preventDefault();
    const url = target.querySelector('.feature-branch-manager-link-creator__url').value;
    const branch = target.querySelector('.feature-branch-manager-link-creator__branch');
    const selectedBranch = branch.options[branch.selectedIndex].value;
    const seperator = window.location.toString().indexOf('?') !== -1 ? '&' : '?';
    this.component.querySelector('.feature-branch-manager-output__link').value = "".concat(window.location).concat(seperator, "redirectPage=").concat(url, "&branch=").concat(selectedBranch);
  }

  copyRedirectString() {
    // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    const copyText = this.component.querySelector('.feature-branch-manager-output__link');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

}
;// CONCATENATED MODULE: ./src/modules/_integrations/git-switcher/js/FeatureBranchPopOut.js

const FEATURE_BRANCH_POP_OUT_EXPAND_SELECTOR = '[data-click="featureBranchPopOut"]';
const FEATURE_BRANCH_POPOUT_ACTIVE = 'feature-branch-pop-out--active';
class FeatureBranchPopOut extends FeatureBranchSwitcher {
  constructor(control) {
    super(control);
    const expand = control.querySelector(FEATURE_BRANCH_POP_OUT_EXPAND_SELECTOR);

    if (expand) {
      expand.addEventListener('click', () => {
        this.expandPanel(expand);
      });
    }
  }

  expandPanel(button) {
    if (button.getAttribute('aria-expanded') === 'true') {
      this.component.classList.remove(FEATURE_BRANCH_POPOUT_ACTIVE);
      button.setAttribute('aria-expanded', false);
    } else {
      this.component.classList.add(FEATURE_BRANCH_POPOUT_ACTIVE);
      button.setAttribute('aria-expanded', true);
    }
  }

}
;// CONCATENATED MODULE: ./src/modules/_integrations/git-switcher/js/global.js


 // eslint-disable-next-line no-underscore-dangle

function _featureBranchManager() {
  const FEATURE_BRANCH_ALERT_SELECTOR = '[data-component="featureBranchAlert"]';
  const FEATURE_BRANCH_MANAGER_SELECTOR = '[data-component="featureBranchManager"]';
  const FEATURE_BRANCH_POP_OUT_SELECTOR = '[data-component="featureBranchPopOut"]';
  const featureBranchAlert = document.querySelectorAll(FEATURE_BRANCH_ALERT_SELECTOR);
  featureBranchAlert.forEach(alert => {
    const DOMItem = alert;
    DOMItem.alert = new FeatureBranchSwitcher(alert);
  });
  const featureBranchManager = document.querySelectorAll(FEATURE_BRANCH_MANAGER_SELECTOR);
  featureBranchManager.forEach(manager => {
    const DOMItem = manager;
    DOMItem.manager = new FeatureBranchManager(manager);
  });
  const featureBranchPopOut = document.querySelectorAll(FEATURE_BRANCH_POP_OUT_SELECTOR);
  featureBranchPopOut.forEach(popOut => {
    const DOMItem = popOut;
    DOMItem.popOut = new FeatureBranchPopOut(popOut);
  });
}

_featureBranchManager();

/***/ }),

/***/ 25508:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _collapsible_js_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58433);

function _accordion() {
  /**
   * Accordion wrapper selector
   * @const {string}
   */
  const ACCORDION_SELECTOR = '[data-component="accordion"]';
  /**
   * Accordion toggle all control
   * @const {string}
   */

  const ACCORDION_TOGGLE_ALL_EVENT = '[data-click="accordionToggleAll"]';
  /**
   * Accordion item selector
   * @const {string}
   */

  const ACCORDION_ITEM_SELECTOR = '.accordion-item';
  /**
   * Accordion item control selector
   * @const {string}
   */

  const ACCORDION_ITEM_CONTROL_SELECTOR = '.accordion-item__control';
  /**
   * Accordion item content selector
   * @const {string}
   */

  const ACCORDION_ITEM_CONTENT_SELECTOR = '.accordion-item__content';
  /**
   * Accordion item control selector event
   * @const {string}
   */

  const ACCORDION_ITEM_CONTROL_EVENT = '[data-click="accordionItemControl"]';
  /**
   * Accordion active/open class
   * @const {string}
   */

  const ACCORDION_ITEM_ACTIVE = 'accordion-item--active';
  /**
   * Accordion transition class when in collapsing state
   * @const {string}
   */

  const ACCORDION_ITEM_COLLAPSING = 'accordion-item__content--collapsing';
  /**
   * Accordion transition class when in expanding state
   * @const {string}
   */

  const ACCORDION_ITEM_EXPANDING = 'accordion-item__content--expanding';
  /**
   * Accordion item content open class
   * @const {string}
   */

  const ACCORDION_ITEM_OPEN = 'accordion-item__content--open';
  /**
   * Accordion item button open class
   * @const {string}
   */

  const ACCORDION_BUTTON_OPEN = 'accordion-item__control--open';
  /**
   * Create a new Accordion
   * @param {HTMLElement} accordion - The wrapping HTML element of the accordion
   * @class
   */

  class Accordion {
    constructor(accordion) {
      // Find the accordion up the DOM tree
      this.accordion = accordion;
      this.options = this.accordion.dataset;
      this.accordionItems = accordion.querySelectorAll(ACCORDION_ITEM_SELECTOR) || [];
      this.accordionItems.forEach(accordionItem => {
        const control = accordionItem.querySelector(ACCORDION_ITEM_CONTROL_EVENT);

        if (control) {
          // Set the item as a collapse
          // eslint-disable-next-line no-param-reassign
          accordionItem.collapse = new _collapsible_js_global__WEBPACK_IMPORTED_MODULE_0__/* .Collapse */ .U(); // Set a colapse variable to make the rest of the setup a little tidier

          const {
            collapse
          } = accordionItem; // Define the collapse wrapper

          collapse.collapseWrapper = accordionItem; // Sets that this item should animate

          collapse.shouldAnimate = true; // Set the elements of the collapse

          collapse.collapseButton = accordionItem.querySelector(ACCORDION_ITEM_CONTROL_SELECTOR); // Set the collapse content

          collapse.collapseContent = accordionItem.querySelector(ACCORDION_ITEM_CONTENT_SELECTOR); // Set our collapse classes

          collapse.buttonActiveClass = ACCORDION_BUTTON_OPEN;
          collapse.contentOpenClass = ACCORDION_ITEM_OPEN;
          collapse.contentExpandingClass = ACCORDION_ITEM_EXPANDING;
          collapse.contentCollapsingClass = ACCORDION_ITEM_COLLAPSING; // Add the event listener to the collapse

          collapse.collapseButton.addEventListener('click', () => {
            this.handleItemClick(collapse);
          });
        }
      }); // Open any items with the active class on them

      this.openActiveItems(); // Attach toggle all click handler

      const accordionToggleAll = accordion.querySelector(ACCORDION_TOGGLE_ALL_EVENT);

      if (accordionToggleAll) {
        accordionToggleAll.addEventListener('click', () => {
          this.handleToggleAllClick();
        });
        this.toggleAll = this.accordion.querySelector('.accordion__toggle-all');
      }
    }
    /**
     * Event handler for accordion item click
     * @param {HTMLElement} item - The accordion item DOM Element\
     */


    handleItemClick(item) {
      // Dont run if an transition is current occuring on that item as it will cause an conflict in transitions
      if (item.isTransitionRunning) {
        return;
      } // Get the current item state so we dont toggle it open again if the user is trying to close it


      const currentItemState = item.collapseIsOpen;

      if (this.options.autoclose === 'true') {
        // Close everything except this element, so we dont multiple transitions at once
        this.closeAllItems(item.collapseWrapper);
      } // If the item is closed we can open it after closing all other items


      if (!currentItemState) {
        // Toggle the accordion open
        item.transitionItemOpen();
      } else {
        // Close the accordion
        item.transitionItemClosed();
      } // Toggle the active state on the wrapper


      if (item.collapseIsOpen) {
        item.collapseWrapper.classList.add(ACCORDION_ITEM_ACTIVE);
      } else {
        item.collapseWrapper.classList.remove(ACCORDION_ITEM_ACTIVE);
      } // If a toggle all button is enabled for this Accordion set its new state


      this.setToggleAllStatus(this.calculateNextToggleState());
    }
    /**
     * Handler for the opening and closing of all accordion items
     */


    handleToggleAllClick() {
      const toggleState = this.toggleAll.getAttribute('aria-checked'); // Dont run if any transition is current occuring as it will cause an conflict in transitions

      if (Array.from(this.accordionItems).find(item => item.collapse.isTransitionRunning)) {
        return;
      } // If everything is closed, trigger an open


      if (toggleState === 'false') {
        this.openAllItems();
      } else {
        // Mixed or true state will both cause a full collapse
        this.closeAllItems();
      }
    }
    /**
     * Helper funtion to determine if the accordion state is all open, all closed or mixed
     */


    calculateNextToggleState() {
      // Get all controls in the accordion
      const accordionItems = Array.from(this.accordionItems).map(item => item.collapse); // Check if all the accordions are open

      const allOpen = accordionItems.every(item => item.isOpen === true); // Check if all the accordions are closed

      const allClosed = accordionItems.every(item => item.isOpen === false); // If all the accordions are open return allOpen

      if (allOpen) {
        return 'allOpen';
      } // If all the accordions are closed return allClosed


      if (allClosed) {
        return 'allClosed';
      } // The default return if neither of the above conditions are matched the accordions must be in a mixed state


      return 'mixed';
    }
    /**
     * Helper method to open all accordion item in the accordion
     */


    openAllItems() {
      this.accordionItems.forEach(item => {
        item.collapse.transitionItemOpen();
        item.collapse.collapseWrapper.classList.add(ACCORDION_ITEM_ACTIVE);
      });
      this.setToggleAllStatus('allOpen'); // Set toggle all to 'Collapse all'
    }
    /**
     * Helper method to open all accordion item in the accordion except the (optionally) provided item
     * @param {HTMLElement} exception - the element to be excluded from closing
     */


    closeAllItems(exception) {
      this.accordionItems.forEach(item => {
        if (item.collapse.collapseWrapper !== exception) {
          item.collapse.transitionItemClosed();
          item.collapse.collapseWrapper.classList.remove(ACCORDION_ITEM_ACTIVE);
        }
      });

      if (!exception) {
        this.setToggleAllStatus('allClosed'); // Set toggle all to 'Expand all'
      } else {
        this.setToggleAllStatus('mixed'); // Set toggle all to 'mixed' if we have excluded an item from closing
      }
    }
    /**
     * Helper method to change the toggle all state: three states 'true', 'false' and 'mixed'
     * @param {string} state - The new state
     */


    setToggleAllStatus(toggleState) {
      // Check that the accordion has been setup with a toggle all button
      if (this.toggleAll) {
        // If the toggle state is all open
        if (toggleState === 'allOpen') {
          // Set the toggle all button as aria checked value as true
          this.toggleAll.setAttribute('aria-checked', true); // Set the button text

          this.toggleAll.textContent = this.toggleAll.dataset.collapsetext;
        } else if (toggleState === 'mixed') {
          // Mixed state will default to a collapse as the next action
          this.toggleAll.setAttribute('aria-checked', 'mixed');
          this.toggleAll.textContent = this.toggleAll.dataset.collapsetext;
        } else {
          // True state will both cause a full collapse
          this.toggleAll.setAttribute('aria-checked', false);
          this.toggleAll.textContent = this.toggleAll.dataset.expandtext;
        }
      }
    }
    /**
     * Open the active elements
     * @method
     */


    openActiveItems() {
      this.accordionItems.forEach(item => {
        // If the collapse has the active class the collapse should be open
        if (item.classList.contains(ACCORDION_ITEM_ACTIVE)) {
          item.collapse.openElement();
        }
      });
    }

  } // Find all accordions and created handler objects


  const accordions = document.querySelectorAll(ACCORDION_SELECTOR);
  accordions.forEach(accordion => {
    // Create a new item to modify
    const DOMItem = accordion; // Attach the accordion instance to our DOM Item

    if (!DOMItem.accordion) {
      DOMItem.accordion = new Accordion(accordion);
    } else {
      DOMItem.accordion.openActiveItems();
    }
  });
}

_accordion();

/***/ }),

/***/ 67317:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _collapsible_js_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58433);
/* eslint-disable no-unused-expressions */

/* eslint-disable no-param-reassign */

function _aside() {
  /**
   * Main wrapper selector.
   * @type {string}
   */
  const ASIDE_SELECTOR = '[data-component="aside-nav"]';
  /**
   * Elements we will be hiding or showing.
   * @type {string}
   */

  const ASIDE_GROUP_SECTION = '[data-component="aside-section"]';
  /**
   * Button firing actions to hide/show elements.
   * @type {string}
   */

  const ASIDE_TOGGLE_BUTTON = '[data-component="aside-toggle"]';
  /**
   * Class name indicating element is expanded.
   * @type {string}
   */

  const OPEN_CLASS = 'is-expanded';
  /**
   * Create a new Aside navigation functionality.
   * @param {HTMLElement} asideNavigation - The wrapping HTML element of the aside navigation.
   * @class
   */

  class Aside {
    constructor(asideNavigation) {
      // Outer wrapper for aside menu.
      this.asideSelection = asideNavigation; // Gets all menu sections.

      this.asideSections = this.asideSelection.querySelectorAll(ASIDE_GROUP_SECTION); // Setup collapse to all sections.

      this.setupCollapse(this.asideSections);
    }
    /**
     * Attach instance of Collapse class to each of aside menu section.
     *
     * @param {object} asideSections List of DOM nodes matching menu sections.
     *
     * @returns void
     */


    setupCollapse(asideSections) {
      asideSections.forEach(asideGroup => {
        // Get toggle button.
        const button = asideGroup.querySelector(ASIDE_TOGGLE_BUTTON); // Quit if collapse already attached or we are missing toggle  button.

        if (asideGroup.collapse || !button) {
          return;
        } // Attach instance of Collapse to menu section.


        asideGroup.collapse = new _collapsible_js_global__WEBPACK_IMPORTED_MODULE_0__/* .Collapse */ .U();
        const {
          collapse
        } = asideGroup; // Let the collapse whats the name of expanding class.

        collapse.contentOpenClass = OPEN_CLASS;
        collapse.buttonActiveClassString = OPEN_CLASS; // Let the collapse know what are the toggle button and content.

        collapse.collapseButton = button;
        collapse.collapseContent = button;
        collapse.collapseWrapper = asideGroup; // Attach click listener and callback to toggle button.

        collapse.collapseButton.addEventListener('click', collapse.toggleOpenState);
        const isOpen = collapse.collapseButton.classList.contains(OPEN_CLASS);
        isOpen && collapse.openElement();
      });
    }

  }

  const aside = document.querySelector(ASIDE_SELECTOR);

  if (!aside || aside.asideSelection) {
    return;
  }

  aside.asideSelection = new Aside(aside);
}

_aside();

/***/ }),

/***/ 40297:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__(17727);
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(9669);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);
;// CONCATENATED MODULE: ./src/modules/_global/js/ajaxCache.js

/**
 * Class to provide session storage caching for requests from sources which
 * send no-cache no-store headers back but you want to cache it anyway.
 */

class AjaxCache {
  /**
   * @param {String} cacheName - Name of the cache, used as key of session storage
   */
  constructor(cacheName) {
    this.cacheName = cacheName;
    window.sessionStorage.setItem(cacheName, JSON.stringify({}));
  }
  /**
   * Primary function used to send an AJAX request that should be cached for possible later
   * re-request without the need for a remote request.
   *
   * @param {String} url -  URL of the resource to load and store the response in cache.
   * @param {Function} transform -  Transform function to manipulate the response before being stored in cache and returned. Accepts a single 'response' input and should output desired cached output.
   * @returns {Promise}
   */


  sendRequest({
    url,
    transform
  }) {
    return new Promise((resolve, reject) => {
      const cacheData = this._getFromCache(url);

      if (cacheData) {
        resolve(cacheData);
      } else {
        this._makeRequest(url, transform, resolve, reject);
      }
    });
  }
  /**
   * Makes actualy http request using Axios.
   */


  _makeRequest(url, transform, resolve, reject) {
    axios_default().get(url).then(response => {
      const data = transform ? transform(response) : response;

      this._addToCache(url, data);

      resolve(data);
    }).catch(error => {
      reject(error);
    });
  }
  /**
   * Helper to get a cached entry
   */


  _getFromCache(key) {
    const cache = JSON.parse(window.sessionStorage.getItem(this.cacheName));
    return cache[key];
  }
  /**
   * Helper to store a cached entry
   */


  _addToCache(key, value) {
    const cache = JSON.parse(window.sessionStorage.getItem(this.cacheName));
    cache[key] = value;
    window.sessionStorage.setItem(this.cacheName, JSON.stringify(cache));
  }

}
// EXTERNAL MODULE: ./src/modules/combobox/js/global.js
var global = __webpack_require__(57286);
;// CONCATENATED MODULE: ./src/modules/autocomplete-search/js/global.js



function _autocompleteSearch() {
  /**
   * Autocomplete wrapper selector
   * @const {string}
   */
  const AUTOCOMPLETE_SELECTOR = '[data-component="autocomplete"]';
  /**
   * Selector for autocomplete listbox status area
   * const {string}
   */

  const AUTOCOMPLETE_RESULT_STATS_SELECTOR = '[data-component="autocomplete-result-status"]';
  /**
   * Selector for autocomplete listbox status area count
   * @const {string}
   */

  const AUTOCOMPLETE_RESULT_COUNT_SELECTOR = '[data-component="autocomplete-result-count"]';
  const AUTOCOMPLETE_RESULT_TEMPLATE = 'template[data-template-id="autocomplete-result"]';
  const AUTOCOMPLETE_RESULT_QUERY_TEMPLATE = 'template[data-template-id="autocomplete-result-query"]';
  /**
   * Create a new Autocomplete.
   *
   * @param {HTMLElement} autocomplete - The wrapping HTML element of the autocomplete
   * @class
   */

  class Autocomplete extends global/* default */.Z {
    constructor(autocomplete) {
      super(autocomplete);
      this.autocomplete = autocomplete;
      this.resultStatus = autocomplete.querySelector(AUTOCOMPLETE_RESULT_STATS_SELECTOR);
      this.resultStatusCount = autocomplete.querySelector(AUTOCOMPLETE_RESULT_COUNT_SELECTOR);
      this.emphasis = autocomplete.dataset.emphasis; // Get the templates for the results list from the DOM

      this.resultItemTemplate = autocomplete.querySelector(AUTOCOMPLETE_RESULT_TEMPLATE).content.firstElementChild;
      this.resultItemQueryTemplate = autocomplete.querySelector(AUTOCOMPLETE_RESULT_QUERY_TEMPLATE).content.firstElementChild; // Build the remote address URL string

      this.remoteAddress = "".concat(this.autocomplete.dataset.suggestSource, "?collection=").concat(this.autocomplete.dataset.suggestCollection, "&").concat(this.autocomplete.dataset.suggestAdditionalParams, "&fmt=json++"); // Create an ajax request cache

      this.ajaxCache = new AjaxCache('autocomplete');
    }
    /**
     * Query funnelback suggest.json endpoint and render results to the listbox
     */


    updateResults() {
      const query = this.input.value;
      this.ajaxCache.sendRequest({
        url: "".concat(this.remoteAddress, "&partial_query=").concat(query),
        transform: response => {
          return response.data;
        }
      }).then(response => {
        // Remove all child nodes
        this.clearResults(); // Create new child nodes

        response.forEach((result, index) => {
          this.listbox.appendChild(this.createResultItemFromTemplate(result, index, query));
        });
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        // Post update call the super to re-setup the listbox
        super.updateResults();
      });
    }
    /**
     * Creates a new results item from the template loaded onto the page.
     *
     * @param {Object} result - response from Funnelback request
     * @param {int} index - index of result
     * @returns {Element} - new <li> element for listbox
     */


    createResultItemFromTemplate(result, index, query) {
      const resultItem = this.resultItemTemplate.cloneNode(true); // Append the index to the id

      resultItem.setAttribute('id', "".concat(resultItem.getAttribute('id')).concat(index)); // Add the result text

      if (this.emphasis && this.emphasis !== 'none') {
        const queryItem = this.resultItemQueryTemplate.cloneNode(true);
        queryItem.textContent = query; // Split the result display based on the query

        const querySplit = result.disp.split(query);
        querySplit.forEach((partWord, partIndex) => {
          // If the part word isnt blank, print it
          if (partWord) {
            resultItem.appendChild(document.createTextNode(partWord));
          }
          /*
              If the partWord isnt the last item, print the 'query' span. A word like 'dedicated' will when split on 'd'
              break into ["", "e", "icate", ""], the last partWord it doesnt need to be printed for both the end results.
          */


          if (partIndex !== querySplit.length - 1) {
            resultItem.appendChild(queryItem.cloneNode(true));
          }
        });
      } else {
        resultItem.textContent = result.disp;
      }

      return resultItem;
    }
    /**
     * Example of how to do on a system which does not support html templates
     *
     * @param {Object} result - response from Funnelback request
     * @param {int} index - index of result
     * @returns {Element} - new <li> element for listbox
     */


    createResultItem(result, index) {
      const resultItem = document.createElement('li');
      resultItem.textContent = result.disp;
      resultItem.setAttribute('id', "result-item-".concat(index));
      resultItem.setAttribute('role', 'option');
      resultItem.setAttribute('aria-selected', 'false');
      resultItem.classList.add('autocomplete-search-listbox__item');
      return resultItem;
    }

  } // Finall all autocomplete and created handler objects


  const autocompletes = document.querySelectorAll(AUTOCOMPLETE_SELECTOR);
  autocompletes.forEach(autocomplete => {
    // Create a new item to modify
    const DOMItem = autocomplete; // Attach the carousel instance to our DOM Item

    if (!DOMItem.autocomplete) {
      DOMItem.autocomplete = new Autocomplete(autocomplete);
    }
  });
}

_autocompleteSearch();

/***/ }),

/***/ 90357:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./src/modules/_global/js/stringToBool.js
var stringToBool = __webpack_require__(98051);
;// CONCATENATED MODULE: ./src/modules/_global/js/Timer.js
/**
 * Creates a new timer
 * @module Timer
 * @class
 * @param {function} fn - The function to be implemented every x seconds
 * @param {number} interval - The interval in ms that the function should be run
 * @property {Function} stop {@link module:Timer#stop}
 * @property {Function} start {@link module:Timer#start}
 * @property {Function} reset {@link module:Timer#reset}
 */
class Timer {
  constructor(fn, interval) {
    // Set our variables to be used in the class
    this.interval = interval;
    this.isRunning = false;
    this.fn = fn; // Create our timer object

    this.timerObject = setInterval(fn, interval);
  }
  /**
   * @method module:Timer#stop
   * @description Stops the timer from running
   * @returns {Timer}
   */


  stop() {
    if (this.timerObject) {
      this.isRunning = false;
      clearInterval(this.timerObject);
      this.timerObject = null;
    }

    return this;
  }
  /**
   * @method module:Timer#start
   * @description start timer using current settings (if it's not already running)
   * @returns {Timer}
   */


  start() {
    if (!this.timerObject) {
      this.isRunning = true;
      this.stop();
      this.timerObject = setInterval(this.fn, this.interval);
    }

    return this;
  }
  /**
   * @method module:Timer#reset
   * @description start with new or original interval, stop current interval
   * @returns {Timer}
   */


  reset(newT = this.interval) {
    this.interval = newT;
    return this.stop().start();
  }

}
// EXTERNAL MODULE: ./src/modules/slider/js/global.js
var global = __webpack_require__(93541);
;// CONCATENATED MODULE: ./src/modules/carousel/js/global.js



function _carousel() {
  /**
   * Carousel wrapper selector
   * @const {string}
   */
  const CAROUSEL_SELECTOR = '[data-component="carousel"]';
  /**
   * Carousel slide selector
   * @const {string}
   */

  const CAROUSEL_ITEM_SELECTOR = '[data-component="carousel-item"]';
  /**
   * Carousel inner selector
   * @const {string}
   */

  const CAROUSEL_INNER_SELECTOR = '[data-component="carousel-inner"]';
  /**
   * Carousel previous button
   * @const {string}
   */

  const CAROUSEL_BUTTON_PREVIOUS_SELECTOR = '[data-component="carousel-button--previous"]';
  /**
   * Carousel previous button
   * @const {string}
   */

  const CAROUSEL_BUTTON_NEXT_SELECTOR = '[data-component="carousel-button--next"]';
  /**
   * Carousel previous button
   * @const {string}
   */

  const CAROUSEL_BUTTON_AUTOPLAY_STATE = '[data-component="carousel-button__autoplay-state"]';
  /**
   * Carousel navigation items selector
   * @const {string}
   */

  const CAROUSEL_NAVIGATION_ITEM_SELECTOR = '[data-component="carousel-navigation__item"]';
  /**
   * Styling class for the paused playing state
   * @const {string}
   */

  const CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_PAUSED = 'carousel-button__autoplay-state--paused';
  /**
   * Styling class for the playing state
   * @const {string}
   */

  const CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_RUNNING = 'carousel-button__autoplay-state--playing';
  /**
   * Class for SLIDE_ACTIVE
   * @const {string}
   */

  const SLIDE_ACTIVE = 'carousel-item--active';
  /**
   * Class for NAVIGATION_CLASSNAME_ACTIVE
   * @const {string}
   */

  const NAVIGATION_CLASSNAME_ACTIVE = 'carousel-navigation__item--active';
  /**
   * Class for SLIDER_TRANSITIONING
   * @const {string}
   */

  const SLIDER_TRANSITIONING = 'carousel__inner--transitioning';
  /**
   * Class for SLIDER_TRANSITIONING_ANY
   * @const {string}
   */

  const SLIDER_TRANSITIONING_ANY = 'carousel__inner--transitioning-any';
  /**
   * Class for SLIDER_TRANSITIONING_RIGHT
   * @const {string}
   */

  const SLIDER_TRANSITIONING_RIGHT = 'carousel__inner--transition-right';
  /**
   * Class for SLIDER_TRANSITIONING_LEFT
   * @const {string}
   */

  const SLIDER_TRANSITIONING_LEFT = 'carousel__inner--transition-left';
  /**
   * CSS Var for SLIDER_CSS_ANIMATION_DURATION
   * @const {string}
   */

  const SLIDER_CSS_ANIMATION_DURATION_VAR = '--slider-animation-duration';
  /**
   * CSS Var for SLIDER_CSS_SLIDE_DURATION
   * @const {string}
   */

  const SLIDER_CSS_SLIDE_DURATION_VAR = '--slider-slide-duration';
  /**
   * Create a new Carousel
   * @param {HTMLElement} carousel - The wrapping HTML element of the carousel
   * @class
   */

  class Carousel extends global/* Slider */.i {
    constructor(carousel) {
      super(carousel); // Define the carousel HTML element for use throughout the class

      this.carousel = carousel; // Define the carousel classes for the slider

      this.SLIDE_ACTIVE = SLIDE_ACTIVE;
      this.NAVIGATION_CLASSNAME_ACTIVE = NAVIGATION_CLASSNAME_ACTIVE;
      this.SLIDER_TRANSITIONING = SLIDER_TRANSITIONING;
      this.SLIDER_TRANSITIONING_ANY = SLIDER_TRANSITIONING_ANY;
      this.SLIDER_TRANSITIONING_RIGHT = SLIDER_TRANSITIONING_RIGHT;
      this.SLIDER_TRANSITIONING_LEFT = SLIDER_TRANSITIONING_LEFT;
      this.SLIDER_CSS_ANIMATION_DURATION_VAR = SLIDER_CSS_ANIMATION_DURATION_VAR;
      this.SLIDER_CSS_SLIDE_DURATION_VAR = SLIDER_CSS_SLIDE_DURATION_VAR; // Bind the function to this

      this.moveCarouselForwards = this.moveCarouselForwards.bind(this);
      this.moveCarouselBackwards = this.moveCarouselBackwards.bind(this);
      this.moveCarouselToSlide = this.moveCarouselToSlide.bind(this);
      this.moveSlideWithKeys = this.moveSlideWithKeys.bind(this);
      this.toggleAutoPlayState = this.toggleAutoPlayState.bind(this);
      this.pauseCarouselAutoplayOnHover = this.pauseCarouselAutoplayOnHover.bind(this);
      this.resumeCarouselAutoplayOnHover = this.resumeCarouselAutoplayOnHover.bind(this); // Initialize the carousel

      this.initializeCarousel(carousel);
    }
    /**
     * Initializes the carousel
     * @param {HTMLElement} carousel - The carousel HTML Item
     */


    initializeCarousel(carousel) {
      // Get the items within the carousel
      this.items = carousel.querySelectorAll(CAROUSEL_ITEM_SELECTOR); // Get the carousel navigation items

      this.navigationItems = carousel.querySelectorAll(CAROUSEL_NAVIGATION_ITEM_SELECTOR); // Get the inner element

      this.inner = carousel.querySelector(CAROUSEL_INNER_SELECTOR); // Get the previous and next buttons

      this.previousButton = carousel.querySelector(CAROUSEL_BUTTON_PREVIOUS_SELECTOR);
      this.nextButton = carousel.querySelector(CAROUSEL_BUTTON_NEXT_SELECTOR); // Get the defined animation duration (Default to 0.5s if unset)

      this.animationDuration = parseInt(carousel.dataset.carouselAnimationDuration, 10) || 500; // Get if the carousel should loop

      this.shouldLoop = (0,stringToBool/* default */.Z)(carousel.dataset.carouselShouldLoop, true); // get the auto play state button

      this.autoplayStateButtons = carousel.querySelectorAll(CAROUSEL_BUTTON_AUTOPLAY_STATE); // Get if the carousel should enable auto play

      this.shouldAutoplay = (0,stringToBool/* default */.Z)(carousel.dataset.carouselShouldAutoplay, true);

      if (this.shouldAutoplay) {
        this.initialAutoplayState = (0,stringToBool/* default */.Z)(carousel.dataset.carouselAutoplayInitial, true);
      } // Get the slide interval


      this.sliderAnimationDuration = parseInt(carousel.dataset.carouselSlideInterval, 10) || 3000;
      const interval = this.sliderAnimationDuration + this.animationDuration; // Check if the timer has already been created

      if (this.autoplayTimer instanceof Timer) {
        // If the timer is already created, reset the interval to the newly calculated one & stop the timer
        this.autoplayTimer.reset(interval).stop();
      } else {
        // Create the autoplay timer (in the stopped state)
        this.autoplayTimer = new Timer(() => this.moveSlide(), interval).stop();
      } // Check that we have at least 2 slides and that we haven't already done this


      if (this.items.length >= 2 && !(carousel.carousel instanceof Carousel)) {
        this.autoplayStateButtons.forEach(button => {
          button.classList.remove(CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_PAUSED, CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_RUNNING);
          button.classList.add(CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_RUNNING);
        });
      } // Check that we have a previous or next button


      if (this.previousButton || this.nextButton || this.navigationItems) {
        // Add the event listeners
        this.setEventListeners();
      } // Set the animation duration for the CSS


      this.setCSSAnimationDuration(carousel); // Set the animation duration for the CSS

      this.setCSSSlideDuration(carousel); // Start autoplay

      if (this.shouldAutoplay && this.initialAutoplayState) {
        this.startAutoplay();
      } else {
        // Set the button state to paused if we aren't auto playing when we initially load
        this.autoplayStateButtons.forEach(button => {
          button.classList.remove(CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_PAUSED, CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_RUNNING);
          button.classList.add(CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_PAUSED);
        });
      } // Set a variable for capturing the autoplay state on hover


      this.autoplayPreviousState = null; // Set the current hovered state

      this.carouselIsHovered = false;
    }
    /**
     * Re-Initialize the carousel by removing all event listeners, resetting settings based on html attributes then adding the event listeners again
     */


    reinitializeCarousel() {
      this.removeEventListeners();
      this.initializeCarousel(this.carousel);
    }
    /**
     * Moves carousel item backwards.
     */


    moveCarouselBackwards() {
      // Move the slide
      this.moveSlide('backwards'); // Reset the timer if the user has moved the slide and autoplay is enabled

      if (this.shouldAutoplay && this.autoplayTimer.isRunning) {
        this.autoplayTimer.reset();
      }
    }
    /**
     * Moves carousel item backwards.
     */


    moveCarouselForwards() {
      // Move the slide
      this.moveSlide('forwards'); // Reset the timer if the user has moved the slide and autoplay is enabled

      if (this.shouldAutoplay && this.autoplayTimer.isRunning) {
        this.autoplayTimer.reset();
      }
    }
    /**
     * Moves carousel item to given index.
     *
     * @param {Event} event - The click event
     */


    moveCarouselToSlide(event) {
      // Get the defined index of the slide to move to
      const slideToIndex = parseInt(event.target.dataset.slideTo, 10); // Check that the slide is within the bounds

      if (slideToIndex >= 0 && slideToIndex <= this.numOfItems) {
        // Move the carousel to the specified slide
        this.moveToSlide(slideToIndex);
      }
    }
    /**
     * Function that sets the event listeners on the carousel controls
     * @param {HTMLElement} nextButton - The Next Button DOM Element
     * @param {HTMLElement} previousButton - The Previous Button DOM Element
     * @param {HTMLElement} navigationItems - The navigation items DOM elements
     */


    setEventListeners(nextButton = this.nextButton, previousButton = this.previousButton, navigationItems = this.navigationItems) {
      // Add the listener for the next button
      if (nextButton) {
        nextButton.addEventListener('click', this.moveCarouselForwards);
      } // Add the listener for the previous button


      if (previousButton) {
        previousButton.addEventListener('click', this.moveCarouselBackwards);
      } // Add the event listener for the nav items


      if (navigationItems) {
        navigationItems.forEach(navItem => {
          navItem.addEventListener('click', this.moveCarouselToSlide);
        });
      } // Add event listener for keypress


      if (this.carousel) {
        this.carousel.addEventListener('keyup', this.moveSlideWithKeys);
      }

      if (this.shouldAutoplay) {
        // Add event listeners for the autoplay button
        if (this.autoplayStateButtons) {
          this.autoplayStateButtons.forEach(button => {
            button.addEventListener('click', this.toggleAutoPlayState);
          });
        } // Pause the carousel when a user hovers over it


        if (this.carousel) {
          this.carousel.addEventListener('mouseenter', this.pauseCarouselAutoplayOnHover);
        } // restart the carousel when a user hovers leave it


        if (this.carousel) {
          this.carousel.addEventListener('mouseout', this.resumeCarouselAutoplayOnHover);
        }
      }
    }
    /**
     * Toggles the state of the auto play (play / pause)
     */


    toggleAutoPlayState() {
      // Check that the timer is defined
      if (this.autoplayTimer) {
        // Initially remove the state classes from all buttons
        this.autoplayStateButtons.forEach(button => {
          button.classList.remove(CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_PAUSED, CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_RUNNING);
        });

        if (this.autoplayPreviousState === 'running') {
          // If the slider is running, add the paused class to all buttons
          this.autoplayStateButtons.forEach(button => {
            button.classList.add(CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_PAUSED);
          }); // Stop the carousel auto play

          this.autoplayTimer.stop(); // Change the previous state to paused

          this.autoplayPreviousState = 'paused';
        } else {
          // If the carousel is stopped add the playing class to the buttons
          this.autoplayStateButtons.forEach(button => {
            button.classList.add(CAROUSEL_BUTTON_AUTOPLAY_STATE_CLASS_RUNNING);
          }); // Start the carousel if not hovered

          if (!this.carouselIsHovered) {
            this.autoplayTimer.start();
          } // Change the previous state to paused


          this.autoplayPreviousState = 'running';
        }
      }
    }
    /**
     * Pauses the carousel
     */


    pauseCarouselAutoplayOnHover() {
      // Set that the carousel is currently hovered
      this.carouselIsHovered = true; // Check that the timer is defined

      if (this.autoplayTimer) {
        // Set the previous state so that we can revert back to it after hover exit
        this.autoplayPreviousState = this.autoplayTimer.isRunning ? 'running' : 'paused'; // Stop the carousel auto play

        this.autoplayTimer.stop();
      }
    }
    /**
     * Starts the carousel autoplay
     */


    resumeCarouselAutoplayOnHover() {
      // Set the carousel hovered state to false
      this.carouselIsHovered = false; // Check that the timer is defined

      if (this.autoplayTimer && this.autoplayPreviousState === 'running') {
        // Start the carousel
        this.autoplayTimer.start();
      }
    }
    /**
     * When a key is pressed in the slide move the slide to the left or right
     * @param {Event} event - The Keyup event
     */


    moveSlideWithKeys(event) {
      const currentFocusedElement = document.activeElement;
      const currentActiveSlide = this.items[this.getIndexOfCurrentSlide()];

      if (event.keyCode === 37) {
        this.moveCarouselBackwards();

        if (currentActiveSlide.contains(currentFocusedElement)) {
          this.moveFocusToCurrentSlide();
        }
      }

      if (event.keyCode === 39) {
        this.moveCarouselForwards();

        if (currentActiveSlide.contains(currentFocusedElement)) {
          this.moveFocusToCurrentSlide();
        }
      }
    }
    /**
     * Moves the focus for the carousel to the current slide article container
     */


    moveFocusToCurrentSlide() {
      const currentSlide = this.getIndexOfCurrentSlide(this.items);
      setTimeout(() => {
        this.items[currentSlide].focus();
      }, this.animationDuration);
    }
    /**
     * Removes the event listeners from the carousel
     * @param {HTMLElement} nextButton - The next button for the carousel
     * @param {HTMLElement} previousButton - The previous button for the carousel
     * @param {HTMLElement} navigationItems - The navigation items for the carousel
     */


    removeEventListeners(nextButton = this.nextButton, previousButton = this.previousButton, navigationItems = this.navigationItems) {
      // Add the listener for the next button
      if (nextButton) {
        nextButton.removeEventListener('click', this.moveCarouselForwards);
      } // Add the listener for the previous button


      if (previousButton) {
        previousButton.addEventListener('click', this.moveCarouselBackwards);
      } // Add the event listener for the nav items


      if (navigationItems) {
        navigationItems.forEach(navItem => {
          navItem.removeEventListener('click', this.moveCarouselToSlide);
        });
      } // Remove the keypress listener


      if (this.carousel) {
        this.carousel.removeEventListener('keyup', this.moveSlideWithKeys);
      } // Remove event listeners for the autoplay button


      if (this.autoplayStateButtons) {
        this.autoplayStateButtons.forEach(button => {
          button.removeEventListener('click', this.toggleAutoPlayState);
        });
      } // Remove the hover over event listener


      if (this.carousel) {
        this.carousel.removeEventListener('mouseenter', this.pauseCarouselAutoplayOnHover);
      } // Remove the mouse out event listener


      if (this.carousel) {
        this.carousel.removeEventListener('mouseout', this.resumeCarouselAutoplayOnHover);
      }
    }
    /**
     * Starts the carousel auto play
     */


    startAutoplay() {
      this.autoplayTimer.start();
    }

  }
  /**
   * Function that initializes the carousels on the page
   */


  function initializeCarousels() {
    const carouselInstances = document.querySelectorAll(CAROUSEL_SELECTOR); // Go through each carousel instance and create a new class from that carousel

    carouselInstances.forEach(carousel => {
      // Create a new item to modify
      const DOMItem = carousel; // Check that this carousel hasn't already be initialised

      if (!DOMItem.carousel) {
        // Attach the carousel instance to our DOM Item
        DOMItem.carousel = new Carousel(carousel);
      } else {
        // The carousel exists, but we need to update the settings based on the new data from storybook
        // Re-Initialize the carousel
        DOMItem.carousel.reinitializeCarousel();
      }
    });
  }
  /**
   * @const {boolean}
   */


  const carouselExists = !!document.querySelector(CAROUSEL_SELECTOR); // If the module exists, do whatever we need to

  if (carouselExists) {
    initializeCarousels();
  }
} // Call our contained carousel function

_carousel();

/***/ }),

/***/ 58433:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": function() { return /* binding */ Collapse; }
/* harmony export */ });
/* unused harmony export default */
/**
 * The default module class for all the things that need to collapse / open
 * @class
 */
class Collapse {
  constructor() {
    // Bind the methods called by event listeners
    this.toggleOpenState = this.toggleOpenState.bind(this);
    this.openElement = this.openElement.bind(this);
    this.closeElement = this.closeElement.bind(this); // Set the collapse to expect to be closed when initilized

    this.collapseIsOpen = false; // Set a default for the expected transition length

    this.expectedTransitionLengthInt = 450;
  }
  /**
   * Sets the wrapping element (if required)
   * @param {HTMLElement} collapseWrapperElement - The wrapper element for the collapse
   */


  set collapseWrapper(collapseWrapperElement) {
    this.collapseWrapperElement = collapseWrapperElement;
  }
  /**
   * Gets the wrapping element
   * @returns {HTMLElement}
   */


  get collapseWrapper() {
    return this.collapseWrapperElement;
  }
  /**
   * Sets the collapse button element
   * @param {HTMLElement} collapseButtonElement - The element for the collapse button
   */


  set collapseButton(collapseButtonElement) {
    this.collapseButtonElement = collapseButtonElement;
  }
  /**
   * Gets the collapse button element
   * @returns {HTMLElement}
   */


  get collapseButton() {
    return this.collapseButtonElement;
  }
  /**
   * Sets the collapse content element
   * @param {HTMLElement} collapseContentElement - The element for the collapse content
   */


  set collapseContent(collapseContentElement) {
    this.collapseContentElement = collapseContentElement;
  }
  /**
   * Gets the collapse content element
   * @returns {HTMLElement}
   */


  get collapseContent() {
    return this.collapseContentElement;
  }
  /**
   * Sets the class string to be added to the title when the collapse is open
   * @param {string} buttonActiveClassString - The string to be added to the title
   */


  set buttonActiveClass(buttonActiveClassString) {
    this.buttonActiveClassString = buttonActiveClassString;
  }
  /**
   * Sets the class string to be added to the content when open
   * @param {string} contentOpenClassString - The string to be added to the content when open
   */


  set contentOpenClass(contentOpenClassString) {
    this.contentOpenClassString = contentOpenClassString;
  }
  /**
   * Sets the class string for the accordion expanding class
   * @param {string} contentExpandingClassString - The string for the content expanding class
   */


  set contentExpandingClass(contentExpandingClassString) {
    this.contentExpandingClassString = contentExpandingClassString;
  }
  /**
   * Sets the class string for the accordion collapsing class
   * @param {string} contentCollapsingClassString - The string for the content collapsing class
   */


  set contentCollapsingClass(contentCollapsingClassString) {
    this.contentCollapsingClassString = contentCollapsingClassString;
  }
  /**
   * Sets if this collapse component should animate the open / close states
   * @param {bool} collapseShouldAnimate - If this collapse item should animate
   */


  set shouldAnimate(collapseShouldAnimate) {
    this.collapseShouldAnimate = collapseShouldAnimate;
  }
  /**
   * Sets the current state of the collapse (Open or closed)
   * @param {bool} isOpen - If the collapse is currently open
   */


  set collapseIsOpen(isOpen) {
    this.isOpen = isOpen;
  }
  /**
   * Gets the current state of the collapse (Open or Closed)
   */


  get collapseIsOpen() {
    return this.isOpen;
  }
  /**
   * Gets the current transition state
   * @return {bool}
   */


  get isTransitionRunning() {
    return this.transitionRunning;
  }
  /**
   * Sets the expected transition length in ms
   * @param {number} expectedTransitionLengthInt - The expected transition length in ms
   */


  set expectedTransitionLength(expectedTransitionLengthInt) {
    this.expectedTransitionLengthInt = expectedTransitionLengthInt;
  }
  /**
   * Toggle the open state of the collapse
   * @method
   */


  toggleOpenState() {
    // Check if the modal is closed
    if (!this.isOpen) {
      // If the collapse should not animate between states
      if (!this.collapseShouldAnimate) {
        // If it is currently closed open it
        this.openElement();
      } // If the collapse should animate between states


      if (this.collapseShouldAnimate) {
        this.transitionItemOpen();
      }
    } else {
      // If the collapse should not animate between states
      if (!this.collapseShouldAnimate) {
        // If it is currently open, close it
        this.closeElement();
      } // If the collapse should animate between states


      if (this.collapseShouldAnimate) {
        this.transitionItemClosed();
      }
    }
  }
  /**
   * Helper method to transition an accordion item open
   * @method
   */


  transitionItemOpen() {
    const content = this.collapseContentElement;
    let called = false;
    this.transitionRunning = true;
    this.isOpen = true; // Set the classes on the element as open

    this.openElement(); // Add class to set the base height to start from (0px)

    content.classList.add(this.contentExpandingClassString); // Set the height to the max of the element (but with a fixed px size) so we have a point to transition to

    content.style.height = "".concat(content.scrollHeight, "px"); // Attach a once off listener to remove the expanding classes leaving it open without height modification

    content.addEventListener('transitionend', () => {
      called = true; // Reset the element to a collapsed state

      content.classList.remove(this.contentExpandingClassString); // fixed height is no longer needed

      content.style.height = '';
      this.transitionRunning = false;
    }, {
      once: true
    }); // If the transition has failed for any reason force it to end

    setTimeout(() => {
      if (!called) {
        content.dispatchEvent(new window.Event('transitionend'));
      }
    }, this.expectedTransitionLengthInt);
  }
  /**
   * Helper method to transition an accordion item closed/collapsed
   * @method
   */


  transitionItemClosed() {
    const content = this.collapseContentElement;
    let called = false;
    this.transitionRunning = true;
    this.isOpen = false; // Start transition by giving it a fixed height

    content.style.height = "".concat(content.scrollHeight, "px"); // After a minor delay add a class to set the height to 0 to trigger the transition

    setTimeout(() => {
      content.classList.add(this.contentCollapsingClassString);
    }, 50); // Attach a once off listener to remove the collapse and hide the content

    content.addEventListener('transitionend', () => {
      called = true; // Reset the element to a collapsed state

      content.classList.remove(this.contentCollapsingClassString);
      this.closeElement();
      content.style.height = '';
      this.transitionRunning = false;
    }, {
      once: true
    }); // If the transition has failed for any reason force it to end

    setTimeout(() => {
      if (!called) {
        content.dispatchEvent(new window.Event('transitionend'));
      }
    }, this.expectedTransitionLengthInt);
  }
  /**
   * Adds the classes to the open elements
   * @method
   */


  openElement() {
    // Set the aria tag for the control
    this.collapseButtonElement.setAttribute('aria-expanded', true); // Add the open class to the button

    this.collapseButtonElement.classList.add(this.buttonActiveClassString); // Add the open class to the content

    this.collapseContentElement.classList.add(this.contentOpenClassString); // Set our open state

    this.isOpen = true;
    this.collapseWrapperElement.classList.add(this.contentOpenClassString);
  }
  /**
   * Removes the classes from the open elements
   * @method
   */


  closeElement() {
    // Set the aria tag for the control
    this.collapseButtonElement.setAttribute('aria-expanded', false); // Add the open class to the button

    this.collapseButtonElement.classList.remove(this.buttonActiveClassString); // Add the open class to the content

    this.collapseContentElement.classList.remove(this.contentOpenClassString); // Sets our open state

    this.isOpen = false;
    this.collapseWrapperElement.classList.remove(this.contentOpenClassString);
  }

}
/**
 * The default collapse function to be initialised in storybook or webpack
 */

function _collapse(shouldAnimate) {
  function initializeCollapse() {
    // Check that the collapse exists
    const collapseExists = !!document.querySelector('.collapse__button');

    if (collapseExists) {
      // Get the button
      const collapseButton = document.querySelector('.collapse__button'); // Get the content

      const collapseContent = document.querySelector('.collapse__content');

      if (!collapseButton.collapse) {
        // Setup our new collapse
        collapseButton.collapse = new Collapse(); // Add the event listener to the button

        collapseButton.addEventListener('click', collapseButton.collapse.toggleOpenState);
      }

      const {
        collapse
      } = collapseButton; // Set the collapse button

      collapse.collapseButton = collapseButton; // Set the collapse content

      collapse.collapseContent = collapseContent; // Set the collapse button open class

      collapse.buttonActiveClass = 'collapse__button--open'; // Set the collapse content open class

      collapse.contentOpenClass = 'collapse__content--open'; // Set the collapse expanding class string

      collapse.contentExpandingClass = 'collapse__content--expanding'; // Set the collapse collapsing class string

      collapse.contentCollapsingClass = 'collapse__content--collapsing'; // Set if the item should transition or just toggle state

      collapse.shouldAnimate = shouldAnimate;
    }
  }

  initializeCollapse();
}

_collapse();

/***/ }),

/***/ 57286:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Combobox; }
/* harmony export */ });
const KEYCODES = {
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  SPACE: 32,
  UP: 38,
  DOWN: 40
};
/**
 * Selector for combobox listbox status area
 * @const {string}
 */

const COMBOBOX_RESULT_STATS_SELECTOR = '[data-component="combobox-result-status"]';
/**
 * Selector for combobox listbox status area count
 * @const {string}
 */

const COMBOBOX_RESULT_COUNT_SELECTOR = '[data-component="combobox-result-count"]';
/**
 * Create a new Combobox.
 * Methodology is based on https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html and https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22.html
 *
 * @param {HTMLElement} combobox - The wrapping HTML element of the combobox
 * @class
 */

class Combobox {
  constructor(combobox) {
    // Find the combobox up the DOM tree
    this.component = combobox;
    this.input = combobox.querySelector('input');
    this.combobox = combobox.querySelector('[role="combobox"');
    this.listbox = combobox.querySelector('[role="listbox"');
    this.resultStatus = combobox.querySelector(COMBOBOX_RESULT_STATS_SELECTOR);
    this.resultStatusCount = combobox.querySelector(COMBOBOX_RESULT_COUNT_SELECTOR);
    this.shown = false;
    this.activeIndex = -1; // Save this function bind so it can be added and removed as the combobox is shown and hidden

    this.checkShouldHideAutocomplete = this.handleCheckShouldHideAutocomplete.bind(this); // Listen for text changes on the input

    this.input.addEventListener('keyup', this.handleTextKeyInput.bind(this)); // Listen for aria/wcag pattern keypresses to interact with the listbox

    this.input.addEventListener('keydown', this.handleListBoxInteractionKeyInput.bind(this));
    this.input.addEventListener('change', this.handleInputCheckForExternalChange.bind(this));
    this.input.addEventListener('focus', this.showAutocompleteList.bind(this));
    this.input.addEventListener('blur', this.selectActiveIndexItem.bind(this));
    this.listbox.addEventListener('click', this.handleAutoCompleteItemClick.bind(this));
  }
  /**
   * Update the DOM to show the autocomplete listbox
   */


  showAutocompleteList() {
    if (this.listbox.childElementCount > 0) {
      this.shown = true; // Start listener for closing the listbox

      document.addEventListener('click', this.checkShouldHideAutocomplete); // Show the autocomplete list

      this.listbox.dataset.active = true; // Flag the combobox as expanded

      this.combobox.setAttribute('aria-expanded', 'true');
    }
  }
  /**
   * Handle the (mouse / tap) click of an item in the listbox
   * @param {Event} event
   */


  handleAutoCompleteItemClick(event) {
    if (event.target) {
      // Find the closest li and pass that to the selectItem function (common between keyboard and house)
      this.selectItem(event.target.closest('li'));
    }
  }
  /**
   * Common funtion between keyboard and mouse operations, handles the selection of the item from the listbox
   * @param {Element} item - List item to be selected
   */


  selectItem(item) {
    if (item) {
      this.input.value = item.innerText;
      this.input.dispatchEvent(new window.Event('change'));
      this.hideAutocompleteList();
    }
  }
  /**
   * Selects the auto complete item at the currently active index
   */


  selectActiveIndexItem() {
    if (this.activeIndex < 0) {
      return;
    }

    this.selectItem(this.getItem(this.activeIndex));
  }
  /**
   * Handler for clicking on the body while the listbox is active, determine if the listbox should be hidden
   * @param {Event} event
   */


  handleCheckShouldHideAutocomplete(event) {
    if (event.target !== this.input && !this.combobox.contains(event.target)) {
      this.hideAutocompleteList();
    }
  }
  /**
   * Update the DOM to hide the listbox
   */


  hideAutocompleteList() {
    // Remove click to close watcher
    document.removeEventListener('click', this.checkShouldHideAutocomplete);
    this.shown = false;
    this.activeIndex = -1; // this.listbox.innerHTML = '';

    this.listbox.dataset.active = false;
    this.combobox.setAttribute('aria-expanded', 'false'); // this.resultsCount = 0;

    this.input.setAttribute('aria-activedescendant', '');
  }
  /**
   * One of two key event handlers for the input box. This handles the general text being typed
   * into the input box and non-aria pattern based key input.
   * @param {Event} event
   */


  handleTextKeyInput(event) {
    const key = event.which || event.keyCode;

    switch (key) {
      case KEYCODES.UP:
      case KEYCODES.DOWN:
      case KEYCODES.ESC:
      case KEYCODES.RETURN:
        event.preventDefault();
        return;

      default:
        this.updateResults(false);
    }
  }
  /**
   * Extending classes should override to populate the listbox data. MUST be called at the end
   * of listbox data population to do finialisation tasks.
   */


  updateResults() {
    this.activeIndex = -1;
    this.input.setAttribute('aria-activedescendant', '');

    if (this.listbox.childElementCount > 0) {
      this.showAutocompleteList(); // Update the area live region result count area

      if (this.resultStatus && this.resultStatusCount) {
        this.resultStatusCount.textContent = this.listbox.childElementCount;

        if (this.resultStatus.dataset.active === 'false') {
          this.resultStatus.dataset.active = true;
        }
      }
    } else {
      this.hideAutocompleteList();
    }
  }
  /**
   * Clear the listbox of all entries so it can be rebuilt
   */


  clearResults() {
    while (this.listbox.lastElementChild) {
      this.listbox.removeChild(this.listbox.lastElementChild);
    }
  }
  /**
   * One of two key event handlers for the input box. This handles keypresses intended
   * to interact with the listbox based on the aria/wcag pattern.
   * @param {Event} event
   */


  handleListBoxInteractionKeyInput(event) {
    const key = event.which || event.keyCode;
    let {
      activeIndex
    } = this;
    const resultsCount = this.listbox.children.length; // ESC key is used in aria / wcag patterns to close modals and other interactive overlays

    if (this.shown && key === KEYCODES.ESC) {
      this.hideAutocompleteList();
      /* setTimeout(() => {
          // On Firefox, input does not get cleared here unless wrapped in a setTimeout
          this.input.value = '';
          this.input.dispatchEvent(new window.Event('change'));
      }, 1); */
    } // No results in the list, so exit out now


    if (resultsCount < 1) {
      return;
    }

    switch (key) {
      case KEYCODES.UP:
        if (activeIndex <= 0) {
          activeIndex = resultsCount - 1;
        } else {
          activeIndex -= 1;
        }

        break;

      case KEYCODES.DOWN:
        if (activeIndex === -1 || activeIndex >= resultsCount - 1) {
          activeIndex = 0;
        } else {
          activeIndex += 1;
        }

        break;

      case KEYCODES.RETURN:
        // Dont submit the form if the listbox is open
        if (activeIndex !== -1 && this.shown) {
          event.preventDefault();
        }

        this.selectItem(this.getItem(activeIndex));
        return;

      case KEYCODES.TAB:
        this.selectActiveIndexItem();
        this.hideAutocompleteList();
        return;

      default:
        return;
    }

    if (!this.shown) {
      this.showAutocompleteList();
    } // If we are still processing a UP or DOWN press, prevent any other processing


    event.preventDefault();
    const activeItem = this.getItem(activeIndex); // const prevActive = this.getItem(previousIndex);

    this.activeIndex = activeIndex; // Update current index tracking
    // Remove selection from previous item row

    this.listbox.querySelectorAll("[aria-selected='true']").forEach(listItem => {
      const item = listItem;
      item.setAttribute('aria-selected', 'false');
    }); // Select current row

    if (activeItem) {
      // Activate link between input and current listbox active
      this.input.setAttribute('aria-activedescendant', "result-item-".concat(activeIndex)); // Set active class and select attribute

      activeItem.setAttribute('aria-selected', 'true');
    } else {
      // If something has gone wrong unassociate the input from the current item
      this.input.setAttribute('aria-activedescendant', '');
    }
  }
  /**
   * Handler to check if an external interaction has changed the input value and update
   * as nessasary for that.
   * @param {Event} event
   */


  handleInputCheckForExternalChange(event) {
    const input = event.target; // Input has been cleared, hide listbox and remove entries

    if (input.value === '') {
      this.clearResults();
      this.hideAutocompleteList();
    }
  }

  getItem(index) {
    return this.listbox.children[index];
  }

}

/***/ }),

/***/ 75174:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ initFormSubmissionHandler; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15306);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82472);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_array_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_typed_array_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33824);
/* harmony import */ var core_js_modules_es_typed_array_sort_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_sort_js__WEBPACK_IMPORTED_MODULE_2__);




/* eslint-disable */
// This file is imported from Marketplace and to make easier to maintain will use its existing style and formatting

/**
 * Hijack the form submission action so that we can perform additional validation, use AJAX to submit the form and display the response
 *
 * @param {Object} handlerOptions
 * {HTML Element} formElement The form to attach the submission handlers to. Required.
 * {String} loadingMessageMarkup Markup to insert into the loading indicator. Optional.
 * {Boolean} onLoadCallback This will be called upon completion of the request (success or fail). It will receive the request XHR event and the form's handler options. Optional.
 * {Boolean} scrollOnLoad Whether or not to scroll to the top of the page after the form submission (this is useful for long forms). Default = true. Optional.
 * {Function} validationFunction This will be called before the form is submitted. It will receive the form element and should return a Boolean. Optional.
 *
 * @returns void
 */
function initFormSubmissionHandler(handlerOptions) {
  'use strict';

  const formOptions = {
    "formElement": null,
    "loadingMessageMarkup": '<p class="loading-message"><em>Loading form...</em></p>',
    "onLoadCallback": {},
    "scrollOnLoad": false,
    "validationFunction": function () {
      return true;
    }
  };
  let queryString = [];
  let parameterId = '';
  let submitButtons = {}; // Update the default form options

  for (let prop in handlerOptions) {
    formOptions[prop] = handlerOptions[prop];
  } // Check that at least a form has been provided


  if (formOptions.formElement === null || formOptions.formElement === undefined) {
    console.log('Error: Unable to initialise initFormSubmissionHandler(). No form provided.', formOptions);
    return;
  } // Insert the loading animation/message into the page


  formOptions.formElement.insertAdjacentHTML('beforeend', creatingLoadingMarkup(formOptions.loadingMessageMarkup)); // Add a listener to each of the form's submit buttons so that we can track which button is submitting the form

  submitButtons = formOptions.formElement.querySelectorAll('[type=submit]');

  for (var i = 0, j = submitButtons.length; i < j; ++i) {
    submitButtons[i].addEventListener('click', function (evt) {
      hijackFormSubmission(evt, formOptions);
    });
  } // Check if the user is continuing a saved submission


  queryString = window.location.href.split('?');
  parameterId = ''; // Check if: there are query parameters

  if (queryString[1]) {
    // Extract the FORM ID from the query string
    parameterId = queryString[1].match(/SQ_FORM_(.*?)(?=_SUBMISSION)/); // Check if: The parameters are for continuing a submission. The ID in the parameters matches the current form

    if (queryString[1].indexOf('_SUBMISSION') !== -1 && formOptions.formElement.getAttribute("id").indexOf(parameterId[1]) !== -1) {
      // The user is continuing a form submission
      // Remove the query from the URL to prevent an infinite loop once we load the saved form progress
      window.history.replaceState({}, document.title, location.protocol + "//" + location.host + location.pathname); // Make a GET request to retrieve the form submission

      continueFormSubmission(formOptions, queryString[1] + '&SQ_ASSET_CONTENTS_RAW');
    }
  }
  /**
   * Respond to attempts to submit the form
   *
   * @param {MouseEvent} evt The event that triggered the submission
   * @param {Object} handlerOptions The handler options for the form (as set in initFormSubmissionHandler())
   *
   * @returns void
   */


  function hijackFormSubmission(evt, handlerOptions) {
    const XHR = new XMLHttpRequest();
    let form = handlerOptions.formElement; // Capture all the form data

    let formData = new FormData(form); // Convert the form fields into FormData

    let formField = {};
    let submitBtn = {};
    let formSubmitter = evt.currentTarget;
    evt.preventDefault(); // Show the loading message

    form.getElementsByClassName('js-loading-message')[0].classList.add('is-active'); // Check if the form passes validation (and/or other pre-submit actions)

    if (isFunction(handlerOptions.validationFunction && !handlerOptions.validationFunction(form))) {
      // Hide the loading message
      form.getElementsByClassName('js-loading-message')[0].classList.remove('is-active');
      return;
    } // Perform some additional operations on the form data


    for (let i = 0, j = form.elements.length; i < j; ++i) {
      formField = form.elements[i];

      if (formField.name === '' || formField.disabled) {
        // Skip the undefined and disabled elements
        continue;
      } // Matrix requires the submit button to be part of the submission data
      // Find the submit button in the form inputs
      // Match the submit buttons found in the form to the button that initiated the form submission


      if (formField.type === 'submit') {
        // Check if the user is submitting the form or saving form
        if (formSubmitter.getAttribute("name").indexOf('_save') !== -1 && formField.getAttribute("name").indexOf('_save') !== -1) {
          // Capture the save button element
          submitBtn = formField;
          break;
        }

        if (formSubmitter.getAttribute("name").indexOf('_previous_page') !== -1 && formField.getAttribute("name").indexOf('_previous_page') !== -1) {
          // Capture the previous button element
          submitBtn = formField;
          break;
        }

        if (formSubmitter.getAttribute("name").indexOf('_submit') !== -1 && formField.getAttribute("name").indexOf('_submit') !== -1) {
          // Capture the submit button element (standard form submit)
          submitBtn = formField;
          break;
        }

        if (formSubmitter.getAttribute("name").indexOf('_public_auth') !== -1 && formField.getAttribute("name").indexOf('_public_auth') !== -1) {
          // Capture the submit button element (for the continue submission password form)
          submitBtn = formField;
          break;
        }
      }
    } // Disable the submit button


    submitBtn.setAttribute("disabled", ""); // Append the submit button to the form data

    formData.append(submitBtn.name, submitBtn.value); // Respond to requests to POST the form

    XHR.addEventListener('load', function (evt) {
      onFormRequestSuccess(evt, handlerOptions);
    }); // Respond to request errors

    XHR.addEventListener('error', function (evt) {
      onFormRequestError(evt, handlerOptions, submitBtn);
    }); // Callback function

    if (isFunction(handlerOptions.onLoadCallback)) {
      XHR.addEventListener('loadend', function (evt) {
        handlerOptions.onLoadCallback(evt, handlerOptions);
      });
    } // Set up our request


    XHR.open("POST", generatePostURL(form.getAttribute('action'))); // Make the request

    XHR.send(formData);
  }
  /**
   * Respond to the form submission LOAD event
   *
   * @param {ProgressEvent} evt The event as part of the XHR request
   * @param {Object} handlerOptions The handler options for the form (as set in initFormSubmissionHandler())
   *
   * @returns void
   */


  function onFormRequestSuccess(evt, handlerOptions) {
    const responseElementId = uuidv4();
    const replacePreviousResponse = handlerOptions.formElement.parentNode.classList.contains('js-ajax-form-response-wrapper');
    let responseElement = document.createElement('div');
    let responseElementWrapper = document.createElement('div');
    let responseElementScripts = null; // Set the ID on our wrapper so we can target it later (there may be multiple AJAX forms on one page)

    responseElementWrapper.setAttribute('id', responseElementId); // Set a hook Class on our wrapper so we can identify it later

    responseElementWrapper.setAttribute('class', 'js-ajax-form-response-wrapper'); // Set the response in our new <div>

    responseElementWrapper.innerHTML = evt.currentTarget.response; // Check if there are any scripts that will need to be executed

    responseElementScripts = responseElementWrapper.getElementsByTagName('script'); // Set our new <div> in the container so that we can keep our wrapper markup when inserting it into the DOM

    responseElement.appendChild(responseElementWrapper); // Insert the wrapper and response into the page

    if (replacePreviousResponse) {
      // There has already been a response, so insert the new response before that wrapper
      handlerOptions.formElement.parentNode.insertAdjacentHTML('beforebegin', responseElement.innerHTML);
    } else {
      // Insert the response before the original form
      handlerOptions.formElement.insertAdjacentHTML('beforebegin', responseElement.innerHTML);
    } // Check if the response contains another form (as a direct child)
    // E.g. for multi-page forms or when server-side validation has failed


    for (var i = 0, j = responseElementWrapper.childNodes.length; i < j; ++i) {
      if (responseElementWrapper.childNodes[i].nodeName.toLowerCase() === 'form') {
        // Intialise the new form using the previous configuration options
        const formOptions = {}; // Copy the previous form handler options

        for (let prop in handlerOptions) {
          formOptions[prop] = handlerOptions[prop];
        } // Set the new form as the target form


        formOptions.formElement = document.getElementById(responseElementId).childNodes[i];
        initFormSubmissionHandler(formOptions);
        break;
      }
    } // Remove the current form


    if (replacePreviousResponse) {
      // There has already been a response, so remove that wrapper
      handlerOptions.formElement.parentNode.parentNode.removeChild(handlerOptions.formElement.parentNode);
    } else {
      // Delete the original form (which won't have our wrapper)
      handlerOptions.formElement.parentNode.removeChild(handlerOptions.formElement);
    } // Run any scripts that are included with the response


    if (responseElementScripts.length > 0) {
      for (var n = 0, b = responseElementScripts.length; n < b; ++n) {
        if (responseElementScripts[n].getAttribute('src') !== null) {
          // The JavaScript is loaded into the page from another source
          // Create a new <script> node
          let newScript = document.createElement('script'); // Set the script source to match the original

          newScript.setAttribute('src', responseElementScripts[n].getAttribute('src')); // Traverse the DOM to get the original script node

          let originalScript = document.getElementById(responseElementId).getElementsByTagName('script')[n]; // Insert our new script directly before the original

          originalScript.parentNode.insertBefore(newScript, originalScript);
        } else {
          // The JavaScript is inline, so try to run it directly
          try {
            eval(responseElementScripts[n].innerHTML);
          } catch (error) {
            console.error('Error parsing form inline JavaScript. Error: ', error);
          }
        }
      }
    } // Scroll to the top of the page (if enabled)
    // This works well in Firefox and Chrome.
    // For Safari, Edge and IE11, it just snaps to the top of the page.


    if (handlerOptions.scrollOnLoad) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  /**
   * Respond to the form submission ERROR event
   *
   * @param {ProgressEvent} evt The event as part of the XHR request
   * @param {Object} handlerOptions The handler options for the form (as set in initFormSubmissionHandler())
   * @param {HTMLElement} submitButton The button that initiated the form submission. Optional.
   *
   * @returns void
   */


  function onFormRequestError(evt, handlerOptions, submitButton) {
    console.log('Oops! Something went wrong.', evt); // Re-enable the submit button

    if (submitButton) {
      submitButton.removeAttribute("disabled");
    } // Hide the loading message


    handlerOptions.formElement.getElementsByClassName('js-loading-message')[0].classList.remove('is-active');
  }
  /**
   * Continue a previously saved form submission
   * Retrieve the resume form contents from Matrix
   *
   * @param {Object} handlerOptions The handler options for the form (as set in initFormSubmissionHandler())
   * @param {String} queryString The query string to use to continue the form submission. e.g. SQ_FORM_12345_SUBMISSION=123&SQ_FORM_12345_PAGE=1&SQ_FORM_12345_ACCESSID=123cd321cd347
   *
   * @returns void
   */


  function continueFormSubmission(handlerOptions, queryString) {
    const XHR = new XMLHttpRequest(); // Show the loading message

    handlerOptions.formElement.getElementsByClassName('js-loading-message')[0].classList.add('is-active'); // Respond to requests to GET the form

    XHR.addEventListener('load', function (evt) {
      onFormRequestSuccess(evt, handlerOptions);
    }); // Respond to request errors

    XHR.addEventListener('error', function (evt) {
      onFormRequestError(evt, handlerOptions);
    }); // Callback function

    if (Object.keys(handlerOptions.onLoadCallback).length !== 0 && isFunction(handlerOptions.onLoadCallback)) {
      XHR.addEventListener('loadend', function (evt) {
        handlerOptions.onLoadCallback(evt, handlerOptions);
      });
    } // Set up our request


    XHR.open("GET", handlerOptions.formElement.getAttribute('action') + '?' + queryString); // Make the request

    XHR.send();
  }
  /**
   * Add the Matrix URL suffix to the URL that will remove all Designs and Paint Layouts
   *
   * @param {String} formAction The form request action (action attribute)
   *
   * @returns Form URL as a String
   */


  function generatePostURL(formAction) {
    const urlSuffix = 'SQ_ASSET_CONTENTS_RAW'; // Check if there are already query parameters

    if (formAction.indexOf('?') !== -1) {
      return formAction + '&' + urlSuffix;
    } else {
      return formAction + '?' + urlSuffix;
    }
  }
  /**
   * Create a new loading message
   *
   * @returns HTML as a String
   */


  function creatingLoadingMarkup(loadingMessage) {
    return '<div class="js-loading-message loading-container"><div class="sk-chase"><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div></div>' + loadingMessage + '</div>';
  }
  /**
   * Check if an Object is a function
   *
   * @param {Object} functionToCheck The Object to check
   *
   * @returns Boolean
   */


  function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }
  /**
   * Generate a (mostly) unique ID in an RFC4122 version 4 compliant format
   *
   * @returns String
   *
   * @source https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
   */


  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
  }
}

/***/ }),

/***/ 17680:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _modal_js_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46347);
/* harmony import */ var _form_submission_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75174);


function _contentModal() {
  /**
   * Content modal wrapper selector
   * @const {string}
   */
  const CONTENT_MODAL_WRAPPER_SELECTOR = '[data-component="content-modal"]';
  /**
   * Content modal header selector
   * @const {string}
   */

  const CONTENT_MODAL_HEADER_SELECTOR = '[data-component="content-modal-header"]';
  /**
   * Content modal footer selector
   * @const {string}
   */

  const CONTENT_MODAL_FOOTER_SELECTOR = '[data-component="content-modal-footer"]';
  /**
   * Create a new Content Modal
   * @param {HTMLElement} modalWrapper - The wrapping HTML element of the Content Modal
   * @class
   */

  class ContentModal extends _modal_js_global__WEBPACK_IMPORTED_MODULE_0__/* .Modal */ .u {
    constructor(modalWrapper) {
      super(modalWrapper);
      this.triggers = document.querySelectorAll("a[href=\"#".concat(modalWrapper.id, "\"]"));
      this.triggers.forEach(trigger => {
        trigger.addEventListener('click', e => {
          this.handleTriggerClick(e);
        });
      });
      /*
          The modal body has a scroll on it, but not the header so
          calculate the offset for the body height so it scrolls properly
      */

      const modalHeader = modalWrapper.querySelector(CONTENT_MODAL_HEADER_SELECTOR);

      if (modalHeader) {
        modalWrapper.style.setProperty('--content-modal-header-height', "".concat(modalHeader.scrollHeight, "px"));
      }

      const modalFooter = modalWrapper.querySelector(CONTENT_MODAL_FOOTER_SELECTOR);

      if (modalFooter) {
        modalWrapper.style.setProperty('--content-modal-footer-height', "".concat(modalFooter.scrollHeight, "px"));
      }

      this.initFormHandler();
    }
    /**
     * Initialises the AJAX form handler needed so a page reload is
     * not needed when a user submit the form within the modal.
     */


    initFormHandler() {
      const form = this.modalWrapper.querySelector('form');

      if (form) {
        // This uses a Marketplace Matrix Form Ajax handler to deal with submitting the form
        // https://app.marketplace.squiz.net/internal/matrix-ajax-forms
        (0,_form_submission_handler__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
          formElement: form,
          loadingMessageMarkup: ''
        });
      }
    }
    /**
     * Handle the press on the trigger button, this will be set to an anchor
     * value so we need to prevent the default processing on it as its unwanted.
     * @param {Event} e click event
     */


    handleTriggerClick(e) {
      e.preventDefault();
      this.openModal();
    }
    /**
     * Watch the height of the modal and records it to a CSS variable that can
     * be used to adjust the max height of the modal container. Needed due to mobile devices
     * not accounting for address bars, 'notches' and other elements in 100vh.
     */


    openModal() {
      super.openModal();

      if (this.modal) {
        this.modalWrapper.style.setProperty('--content-modal-content-height', "".concat(this.modal.clientHeight, "px"));
      } // create an Observer instance


      const contentModal = this;
      this.resizeObserver = new window.ResizeObserver(() => {
        contentModal.modalWrapper.style.setProperty('--content-modal-content-height', "".concat(contentModal.modal.clientHeight, "px"));
      }); // start observing a DOM node

      this.resizeObserver.observe(this.modal);
    }
    /**
     * Remove watcher on modal close
     */


    closeModal() {
      super.closeModal();
      this.resizeObserver.unobserve(this.modal);
    }

  } // Find all content-modals and created handler objects


  const modals = document.querySelectorAll(CONTENT_MODAL_WRAPPER_SELECTOR);
  modals.forEach(modal => {
    // Create a new item to modify
    const DOMItem = modal; // Attach the modal instance to our DOM Item

    if (!DOMItem.modal) {
      DOMItem.modal = new ContentModal(modal);
    }
  });
}

_contentModal();

/***/ }),

/***/ 80377:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(33948);
;// CONCATENATED MODULE: ./src/modules/_global/js/cookieHelper.js


const _win = typeof window === 'undefined' ? {} : window;
/**
 * Helper to check if document is available.
 *
 * @param {object} win Mock Window object.
 */


function hasDocument(win = _win) {
  return win.document !== undefined;
}
/**
 * Gets value of cookie.
 *
 * @param {string} key Cookie key we are trying to get.
 * @param {object} win Mock Window object.
 *
 * @returns {null|string}
 */


function getCookie(key, win = _win) {
  if (!hasDocument(win)) {
    return null;
  }

  const {
    document
  } = win;
  const {
    cookie
  } = document;

  if (typeof cookie !== 'string') {
    return null;
  }

  const cookies = cookie.split('; ');
  let cookieValue = null;
  cookies.find(element => {
    const [_key, _value] = element.split('=');

    if (_key === key && _value !== '') {
      cookieValue = _value;
    }

    return null;
  });
  return cookieValue;
}
/**
 * Sets cookie with given name, value, expiry date and location.
 *
 * @param {string} name Cookie name.
 * @param {string} value Cookie value.
 * @param {string} daysToExpire Until when cookie will exist.
 * @param {string} path Location path.
 * @param {object} win Mock Window object.
 * @param {object} dateMock Mock date object.
 *
 * @returns {void}
 */

const setCookie = (name, value = '', daysToExpire = '', path = '/', win = _win, dateMock) => {
  if (!hasDocument(win)) {
    return;
  }

  const {
    document
  } = win;
  const {
    location: {
      hostname
    }
  } = document;
  let expires = '';

  if (daysToExpire) {
    const date = dateMock || new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    expires = "; expires=".concat(date.toUTCString());
  }

  document.cookie = "".concat(name, "=").concat(value).concat(expires, "; path=").concat(path, "; domain=").concat(hostname, ";");
};
/**
 * Removes cookie with specific name.
 *
 * @param {string} name Cookie name.
 * @param {string} path Location path.
 * @param {object} win Mock Window object.
 *
 * @returns {void}
 */

function clearCookie(name, path = '/', win = _win) {
  if (!hasDocument(win)) {
    return;
  }

  const {
    document
  } = win;
  const {
    location: {
      hostname
    }
  } = document;
  document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=").concat(path, "; domain=").concat(hostname, ";");
}
;// CONCATENATED MODULE: ./src/modules/cookie-banner/js/global.js

function _cookieBanner() {
  /**
   * Banner wrapper selector.
   * @const {string}
   */
  const BANNER_SELECTOR = '[data-component="cookie-banner"]';
  /**
   * Banner close button.
   * @const {string}
   */

  const CLOSE_BTN = '[data-pnp-element="close-btn"]';
  /**
   * How many days dismissal will be stored in cookie.
   * @const {number}
   */

  const DAYS_TO_EXPIRY = 7;
  const closeBtn = document.querySelector(CLOSE_BTN);
  const banner = document.querySelector(BANNER_SELECTOR);
  const bannerDismissed = getCookie('cookie_banner_dismissed');

  if (!closeBtn || !banner) {
    return;
  }

  if (bannerDismissed === null) {
    banner.hidden = false;
  }
  /* Hide banner and sets cookie when user clicks on close button */


  closeBtn.addEventListener('click', () => {
    banner.hidden = true;
    setCookie('cookie_banner_dismissed', 'true', DAYS_TO_EXPIRY);
  });
}

_cookieBanner();

/***/ }),

/***/ 73821:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _collapsible_js_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58433);

const FACET_COMPONENT_SELECTOR = '[data-component="facet"]';
const FACET_GROUP_SELECTOR = '[data-component="facet-group"]';
const FACET_GROUP_CONTROL_SELECTOR = '[data-component="facet-group-control"]';
const FACET_GROUP_CONTENT_SELECTOR = '[data-component="facet-group-content"]';
const FACET_GROUP_CONTROL_OPEN_CLASS = 'facet-group__title--open';
const FACET_GROUP_CONTENT_OPEN_CLASS = 'facet-group__list--open';
const FACET_GROUP_CONTENT_EXPANDING_CLASS = 'facet-group__list--expanding';
const FACET_GROUP_CONTENT_COLLAPSING_CLASS = 'facet-group__list--collapsing';
const FACET_GROUP_SHOW_MORE_BUTTON_SELECTOR = '[data-component="facet-group-show-more-button"]';
const FACET_GROUP_HIDDEN_ITEM_CLASS = 'facet-group__list-item--hidden';
const FACET_GROUP_ITEM_SELECTOR = '[data-component="facet-group__list-item"]';
const COLLAPSE_ALL_FACETS = '[data-component="collapse-all"]';
const ALL_FACETS_SECTION = 'facet-groups';

class FacetSection {
  constructor(facetSection) {
    this.facetSection = facetSection;
    this.facetGroups = this.facetSection.querySelectorAll(FACET_GROUP_SELECTOR);
    this.showMoreItems = this.showMoreItems.bind(this);
    this.setupFacetSectionCollapse();
    this.setupFacetGroupCollapse();
    this.initialiseShowMoreButtons();
  }

  setupFacetSectionCollapse() {
    if (!this.facetSection) {
      return;
    }

    this.facetSection.collapse = new _collapsible_js_global__WEBPACK_IMPORTED_MODULE_0__/* .Collapse */ .U();
    const {
      collapse
    } = this.facetSection;
    collapse.collapseWrapper = this.facetSection.querySelector(".".concat(ALL_FACETS_SECTION));
    collapse.collapseButton = this.facetSection.querySelector(COLLAPSE_ALL_FACETS);
    collapse.collapseContent = this.facetSection.querySelector(".".concat(ALL_FACETS_SECTION));
    collapse.buttonActiveClass = FACET_GROUP_CONTROL_OPEN_CLASS;
    collapse.contentOpenClass = "".concat(ALL_FACETS_SECTION, "--open");
    collapse.collapseButton.addEventListener('click', collapse.toggleOpenState);
  } // Setup each facet group as a collapsible item


  setupFacetGroupCollapse() {
    this.facetGroups.forEach(facetGroup => {
      // Check that we havent initilised these before
      if (!facetGroup.collapse) {
        // eslint-disable-next-line no-param-reassign
        facetGroup.collapse = new _collapsible_js_global__WEBPACK_IMPORTED_MODULE_0__/* .Collapse */ .U(); // setup a collapse variable to make setting properties a little more redable

        const {
          collapse
        } = facetGroup; // Define the collapse wrapper

        collapse.collapseWrapper = facetGroup; // Sets that this item should animate

        collapse.shouldAnimate = true; // Set the elements of the collapse

        collapse.collapseButton = facetGroup.querySelector(FACET_GROUP_CONTROL_SELECTOR); // Set the collapse content

        collapse.collapseContent = facetGroup.querySelector(FACET_GROUP_CONTENT_SELECTOR); // Set our collapse classes

        collapse.buttonActiveClass = FACET_GROUP_CONTROL_OPEN_CLASS;
        collapse.contentOpenClass = FACET_GROUP_CONTENT_OPEN_CLASS;
        collapse.contentExpandingClass = FACET_GROUP_CONTENT_EXPANDING_CLASS;
        collapse.contentCollapsingClass = FACET_GROUP_CONTENT_COLLAPSING_CLASS; // Add an event listener to toggle the facet group

        collapse.collapseButton.addEventListener('click', collapse.toggleOpenState); // If the collapse button has the open class, make sure it is open

        if (collapse.collapseButton.classList.contains(FACET_GROUP_CONTROL_OPEN_CLASS)) {
          collapse.openElement();
        }
      }
    });
  }

  initialiseShowMoreButtons() {
    this.facetGroups.forEach(facetGroup => {
      // check for a show more button
      const showMoreButtonExists = !!facetGroup.querySelector(FACET_GROUP_SHOW_MORE_BUTTON_SELECTOR); // If there is a show more button

      if (showMoreButtonExists) {
        // Get the show more button
        const showMoreButton = facetGroup.querySelector(FACET_GROUP_SHOW_MORE_BUTTON_SELECTOR); // Add an on click event listener to the show more button

        showMoreButton.addEventListener('click', this.showMoreItems);
      }
    });
  }

  showMoreItems(event) {
    // Get the facet group by finding the facet group in the triggering events path
    const facetGroup = event.path.find(element => element.collapse); // Get all the list items for the facet group

    const listItems = facetGroup.querySelectorAll(FACET_GROUP_ITEM_SELECTOR); // For each item remove the hidden class

    listItems.forEach(listItem => {
      listItem.classList.remove(FACET_GROUP_HIDDEN_ITEM_CLASS);
    }); // Remove the show more button from the facet group

    facetGroup.querySelector(FACET_GROUP_SHOW_MORE_BUTTON_SELECTOR).remove();
  }

}

function _facets() {
  // Check if the facets exist on the page
  const facetsExist = !!document.querySelector(FACET_COMPONENT_SELECTOR);

  function initialiseFacets() {
    // Check if the facets exist
    if (facetsExist) {
      // Get each of the facets from the page
      const facets = document.querySelectorAll(FACET_COMPONENT_SELECTOR); // For each facet on the page initialize the facet group

      facets.forEach(facet => {
        // If the facet group hasn't be initialised before initialize it
        if (!facet.facetSection) {
          // eslint-disable-next-line no-param-reassign
          facet.facetSection = new FacetSection(facet);
        }
      });
    }
  }

  initialiseFacets();
}

_facets();

/***/ }),

/***/ 88689:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var PlugAndPlay_global_js_screenSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25857);
/* harmony import */ var _header_search_js_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86379);
/* harmony import */ var _modal_js_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46347);
/* harmony import */ var _primary_nav_js_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28591);
/* eslint-disable max-classes-per-file */




/**
 * Hamburger selector
 * @const {string}
 */

const HAMBURGER_MENU_SELECTOR = '[data-component="hamburger-menu"]';
/**
 * Hamburger active/open class
 * @const {string}
 */

const HAMBURGER_MENU_ACTIVE = 'hamburger-menu-wrapper--active';
/**
 * Hamburger submenu toggle control
 * @const {string}
 */

const HAMBURGER_SUB_MENU_TOGGLE = '[data-click="hamburger-menu-toggle-submenu"]';
/**
 * Hamburger submenu active/open class
 * @const {string}
 */

const HAMBURGER_SUB_MENU_ACTIVE = 'hamburger-menu-item__list--active';
/**
 * Hamburger open control
 * @const {string}
 */

const HAMBURGER_MENU_OPEN = '[data-click="hamburger-menu-open"]';
/**
 * Hamburger close control
 * @const {string}
 */

const HAMBURGER_MENU_CLOSE = '[data-click="hamburger-menu-close"]';
/**
 * Hamburger search control
 * @const {string}
 */

const HAMBURGER_MENU_SEARCH = '[data-click="hamburger-menu-search"]';
/**
 * Create a new Hamburger Menu
 * @param {HTMLElement} Hamburger - The HTML element of the hamburger
 * @class
 */

class HamburgerMenuImpl extends _modal_js_global__WEBPACK_IMPORTED_MODULE_1__/* .Modal */ .u {
  constructor(hamburgerMenu) {
    super(hamburgerMenu);
    this.hamburgerMenu = hamburgerMenu;
    this.hamburgerDialog = this.hamburgerMenu.querySelector('[role="dialog"]');
    const primaryNavInstance = _primary_nav_js_global__WEBPACK_IMPORTED_MODULE_2__/* ["default"].getInstance */ .ZP.getInstance();

    if (primaryNavInstance) {
      this.isDesktopHamburger = primaryNavInstance.isDesktopHamburger();
    }

    this.hamburgerOpen = hamburgerMenu.querySelector(HAMBURGER_MENU_OPEN);

    if (this.hamburgerOpen) {
      this.hamburgerOpen.addEventListener('click', () => {
        this.openMenu();
      });
    } // Attach on item click handler


    const subMenuToggles = hamburgerMenu.querySelectorAll(HAMBURGER_SUB_MENU_TOGGLE);
    subMenuToggles.forEach(subMenuToggle => {
      subMenuToggle.addEventListener('click', () => {
        this._handleToggleSubMenu(subMenuToggle);
      });
    }); // Hamburgers menus own close button

    const hamburgerClose = hamburgerMenu.querySelector(HAMBURGER_MENU_CLOSE);

    if (hamburgerClose) {
      hamburgerClose.addEventListener('click', () => {
        this.closeMenu();
      });
    } // Hamburger menus own search button


    const searchButton = hamburgerMenu.querySelector(HAMBURGER_MENU_SEARCH);

    if (searchButton) {
      searchButton.addEventListener('click', () => {
        this._handleShowSearch();
      });
    }
  }
  /**
   * Public function to open the hamburger menu
   */


  openMenu() {
    // If header search exists and is open, close it.
    document.querySelectorAll(_header_search_js_global__WEBPACK_IMPORTED_MODULE_0__/* .HEADER_SEARCH_SELECTOR */ .U).forEach(element => {
      if (element.headerSearch.isOpen()) {
        element.headerSearch.closeSearch();
      }
    }); // Open first so internal elements can be focused

    this._transitionMenuOpen(); // Focus trap the user to the dialog


    super.openModal();

    this._listenForMediaQueryChange();
  }
  /**
   * Public function to close the hamburger menu
   */


  closeMenu() {
    this._stopListeningFoMediaQueryChange(); // Then run menu close (otherwise focus cant return to the hamburger button)


    this._transitionMenuClosed(); // Release user from focus trap


    super.closeModal();
  }

  closeModal() {
    this.closeMenu();
  }
  /**
   * Event handler for sub menu item click
   * @param {HTMLElement} subMenu - The sub menu item DOM Element
   */


  _handleToggleSubMenu(subMenuToggle) {
    const subMenu = document.getElementById(subMenuToggle.getAttribute('aria-controls'));

    if (subMenuToggle.getAttribute('aria-expanded') === 'false') {
      subMenuToggle.setAttribute('aria-expanded', true);

      this._transitionItemMenuOpen(subMenu);
    } else {
      subMenuToggle.setAttribute('aria-expanded', false);

      this._transitionItemMenuClosed(subMenu);
    }
  }
  /**
   * Event handler for search button click
   */


  _handleShowSearch() {} // Transition handlers


  _transitionMenuOpen() {
    this.hamburgerOpen.setAttribute('aria-expanded', true);
    this.hamburgerDialog.classList.add(HAMBURGER_MENU_ACTIVE);
  }

  _transitionMenuClosed() {
    this.hamburgerOpen.setAttribute('aria-expanded', false);
    this.hamburgerDialog.classList.remove(HAMBURGER_MENU_ACTIVE);
  }

  _transitionItemMenuOpen(subMenu) {
    subMenu.classList.add(HAMBURGER_SUB_MENU_ACTIVE);
    subMenu.parentNode.classList.add(HAMBURGER_SUB_MENU_ACTIVE);
  }

  _transitionItemMenuClosed(subMenu) {
    subMenu.classList.remove(HAMBURGER_SUB_MENU_ACTIVE);
    subMenu.parentNode.classList.remove(HAMBURGER_SUB_MENU_ACTIVE);
  }
  /**
   * Function to listen to changes to the media query and deactivate the modal ally code
   * when it changes from mobile to tablet/desktop. Does not run if desktop hamburger is enabled.
   */


  _listenForMediaQueryChange() {
    if (!this.isDesktopHamburger) {
      this.watchForMediaQueryChange(PlugAndPlay_global_js_screenSize__WEBPACK_IMPORTED_MODULE_3__/* .minMediaQueryXL */ .QO, () => {
        console.log('change to desktop, undo ally');
        this.deactivateAccessability();
      }, () => {
        console.log('change to desktop, redo ally');
        this.activateAccessability();
      });
    }
  }
  /**
   * Function to stop listening to the media query when the menu is closed.
   */


  _stopListeningFoMediaQueryChange() {
    this.removeMediaQueryWatch();
  }

}
/**
 * Singelton wrapper for hamburger menu to give other areas of the template
 * access to the menu without having to pull it from the DOM directly.
 */


class HamburgerMenu {
  /**
   * Access method to get a hold of the template hamburger menu
   * @returns {HamburgerMenuImpl} - Hamburger menu object
   */
  static getInstance() {
    const hamburgerMenu = document.querySelector(HAMBURGER_MENU_SELECTOR); // Hamburger doesnt exist, return null

    if (!hamburgerMenu) {
      return null;
    } // Doesnt exist yet, create new menu object


    if (!hamburgerMenu._hamburgerMenu) {
      // Store the actual class against the DOM, as if this is destroyed for any reason it will need to be re-instantiated
      hamburgerMenu._hamburgerMenu = new HamburgerMenuImpl(hamburgerMenu);
    } // Return existing menu object


    return hamburgerMenu._hamburgerMenu;
  }

} // Bootstrap the hamburger menu

HamburgerMenu.getInstance();

/***/ }),

/***/ 86379:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": function() { return /* binding */ HEADER_SEARCH_SELECTOR; }
/* harmony export */ });
/* unused harmony export default */
/* harmony import */ var PlugAndPlay_global_js_screenSize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25857);
/* harmony import */ var _modal_js_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46347);


/**
 * Header search component selector
 * @const {string}
 */

const HEADER_SEARCH_SELECTOR = '[data-component="header-search"]';
function _headerSearch() {
  /**
   * Main search body selector
   * @const {string}
   */
  const HEADER_SEARCH_BODY_SELECTOR = '.header-search';
  /**
   * Open action selector
   * @const {string}
   */

  const HEADER_SEARCH_INPUT_SELECTOR = '.header-search__input';
  /**
   * Open action selector
   * @const {string}
   */

  const HEADER_SEARCH_OPEN_ACTION_SELECTOR = '[data-click="header-search-open"]';
  /**
   * Open action selector
   * @const {string}
   */

  const HEADER_SEARCH_TOGGLE_ACTION_SELECTOR = '[data-click="header-search-toggle"]';
  /**
   * Close action selector
   * @const {string}
   */

  const HEADER_SEARCH_CLOSE_ACTION_SELECTOR = '[data-click="header-search-close"]';
  /**
   * Clear action selector
   * @const {string}
   */

  const HEADER_SEARCH_CLEAR_ACTION_SELECTOR = '[data-click="header-search-clear"]';
  /**
   * Header search form submit button selector
   */

  const HEADER_SEARCH_SUBMIT_SELECTOR = '[type="submit"]';
  /**
   * Auto focus option indicator
   * @const {string}
   */

  const HEADER_SEARCH_AUTO_FOCUS = '[data-autofocus="true"]';
  /**
   * Header search open/active class
   * @const {string}
   */

  const HEADER_SEARCH_ACTIVE_CLASS = 'header-search-wrapper--active';
  /**
   * Header search has input class
   * @const {string}
   */

  const HEADER_SEARCH_HAS_INPUT_CLASS = 'header-search-wrapper--has-input';
  /**
   * Header search modal mode selector
   * @const {string}
   */

  const HEADER_SEARCH_MODE_MODAL_SELECTOR = '.header-search-wrapper--modal';
  /**
   * Header search fadein mode selector
   * @const {string}
   */

  const HEADER_SEARCH_MODE_FADEIN_SELECTOR = '.header-search-wrapper--fadein';
  /**
   * Create a new HeaderSearch
   * @param {HTMLElement} headerSearch - The wrapping HTML element of the headerSearch
   * @class
   */

  class HeaderSearch {
    constructor(headerSearchWrapper) {
      this.headerSearchWrapper = headerSearchWrapper;
      this.headerSearch = headerSearchWrapper.querySelector(HEADER_SEARCH_BODY_SELECTOR); // HeaderSearch isnt always a Modal so use it as a composite rather than as a parent

      this.modalHandler = new _modal_js_global__WEBPACK_IMPORTED_MODULE_0__/* .Modal */ .u(headerSearchWrapper); // Attach event handlers to open

      headerSearchWrapper.querySelectorAll(HEADER_SEARCH_OPEN_ACTION_SELECTOR).forEach(element => {
        element.addEventListener('click', () => {
          this.openSearch();
        });
      }); // Attach event handlers to open

      headerSearchWrapper.querySelectorAll(HEADER_SEARCH_TOGGLE_ACTION_SELECTOR).forEach(element => {
        element.addEventListener('click', () => {
          this.toggleSearch();
        });
      }); // Attach event handlers to close

      headerSearchWrapper.querySelectorAll(HEADER_SEARCH_CLOSE_ACTION_SELECTOR).forEach(element => {
        element.addEventListener('click', () => {
          this.closeSearch();
        });
      }); // Attach event handlers to clear

      headerSearchWrapper.querySelectorAll(HEADER_SEARCH_CLEAR_ACTION_SELECTOR).forEach(element => {
        element.addEventListener('click', () => {
          this.clearSearch();
        });

        if (this._isFadeIn()) {
          element.addEventListener('blur', e => {
            this._handleFadeInBlur(e);
          });
        }
      });
      const primaryInput = headerSearchWrapper.querySelector(HEADER_SEARCH_INPUT_SELECTOR);

      if (primaryInput) {
        primaryInput.addEventListener('input', e => {
          this._handleInputChange(e);
        });
        primaryInput.addEventListener('change', e => {
          this._handleInputChange(e);
        });

        if (this._isFadeIn()) {
          primaryInput.addEventListener('blur', e => {
            this._handleFadeInBlur(e);
          });
        }
      }

      const submitButton = headerSearchWrapper.querySelector(HEADER_SEARCH_SUBMIT_SELECTOR);

      if (submitButton) {
        if (this._isFadeIn()) {
          submitButton.addEventListener('blur', e => {
            this._handleFadeInBlur(e);
          });
        }
      }
    }
    /**
     * Open the search and handles extras like setting up modal ally and focus.
     */


    openSearch() {
      if (!this.isOpen()) {
        // Add CSS class to activate styling
        this.headerSearchWrapper.classList.add(HEADER_SEARCH_ACTIVE_CLASS); // If the search content should render as a modal, activate the accessability features

        if (this._isModal()) {
          this._activateModal();
        } else if (this._isFadeIn()) {
          this._activateFadeIn();
        } // Listen for media query changes while open in case it switches to mobile (modal) which has extra processing (see above)


        this._listenForMediaQueryChange(); // If the search is configured to auto focus do it - must be after the ally setup otherwise focus restore wont functon correctly


        if (this.headerSearchWrapper.matches(HEADER_SEARCH_AUTO_FOCUS)) {
          this.headerSearchWrapper.querySelector(HEADER_SEARCH_INPUT_SELECTOR).focus();
        }
      }
    }
    /**
     * Helper function to activate the ally modal features + markup
     */


    _activateModal() {
      this.headerSearch.setAttribute('role', 'dialog');
      this.headerSearch.setAttribute('aria-label', this.headerSearch.dataset.modalLabel);
      this.modalHandler.activateAccessability(this.headerSearch, () => {
        this.closeSearch();
      });
    }

    _activateFadeIn() {
      // Tag the toggle button as expanded
      this.headerSearchWrapper.querySelectorAll(HEADER_SEARCH_TOGGLE_ACTION_SELECTOR).forEach(element => {
        element.setAttribute('aria-expanded', true);
      });

      function listener(event) {
        if (!this.headerSearchWrapper.contains(event.target)) {
          this.closeSearch();
        }
      }

      this.fadeInDocListener = listener.bind(this);
      document.addEventListener('click', this.fadeInDocListener);
    }
    /**
     * Function to open or close the search depending on if open or not already
     */


    toggleSearch() {
      if (this.isOpen()) {
        this.closeSearch();
      } else {
        this.openSearch();
      }
    }
    /**
     * Closes the modal and deactivates any modal ally and media watch
     */


    closeSearch() {
      if (this.isOpen()) {
        // Remove CSS class to deactivate styling
        this.headerSearchWrapper.classList.remove(HEADER_SEARCH_ACTIVE_CLASS); // Stop listening to media when closed to not waste resources

        this._stopListeningFoMediaQueryChange(); // If the search content was modal based disable the accessability features


        if (this._isModal()) {
          this._deactivateModal();
        } else if (this._isFadeIn()) {
          this._deactivateFadeIn();
        }
      }
    }
    /**
     * Helper function to deactivate the modal ally + markup.
     */


    _deactivateModal() {
      this.headerSearch.setAttribute('role', '');
      this.headerSearch.setAttribute('aria-label', '');
      this.modalHandler.deactivateAccessability();
    }

    _deactivateFadeIn() {
      // Tag the toggle button as not expanded
      this.headerSearchWrapper.querySelectorAll(HEADER_SEARCH_TOGGLE_ACTION_SELECTOR).forEach(element => {
        element.setAttribute('aria-expanded', false);
      });
      document.removeEventListener('click', this.fadeInDocListener);
      this.fadeInDocListener = undefined;
    }

    clearSearch() {
      // Clear the input field
      const input = this.headerSearchWrapper.querySelector(HEADER_SEARCH_INPUT_SELECTOR);
      input.value = '';
      input.dispatchEvent(new window.Event('change')); // Remove the 'has input' class which makes the X show

      this.headerSearchWrapper.classList.remove(HEADER_SEARCH_HAS_INPUT_CLASS); // Reset focus to the input as the X will now hide

      this.headerSearchWrapper.querySelector(HEADER_SEARCH_INPUT_SELECTOR).focus();
    }

    _handleFadeInBlur() {
      if (!this.headerSearchWrapper.matches(':focus-within')) {
        this.closeSearch();
      }
    }
    /**
     * Function to check if the search is currently open
     */


    isOpen() {
      return this.headerSearchWrapper.matches(".".concat(HEADER_SEARCH_ACTIVE_CLASS));
    }
    /**
     * Function to determine if the search content is going to render as a modal,
     * this can be caused by the 'mode' of the search being set to 'modal' or by
     * the screen size being under a set dimension.
     *
     * @returns {bool} - is the search content rendering as a modal
     */


    _isModal() {
      return this.headerSearchWrapper.matches(HEADER_SEARCH_MODE_MODAL_SELECTOR) || (0,PlugAndPlay_global_js_screenSize__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentScreenSizeInt */ .Yk)() < PlugAndPlay_global_js_screenSize__WEBPACK_IMPORTED_MODULE_1__/* .screenSizeMD */ .OG;
    }
    /**
     * Function to check if search mode is fadein
     * @returns {bool} - is the search mode fadein
     */


    _isFadeIn() {
      return this.headerSearchWrapper.matches(HEADER_SEARCH_MODE_FADEIN_SELECTOR);
    }
    /**
     * Function to listen to changes to the media query and deactivate the modal ally code
     * when it changes from mobile to tablet/desktop. Does not run if search is always a modal.
     */


    _listenForMediaQueryChange() {
      // If the mode is always modal we dont need to watch for changes
      if (!this.headerSearchWrapper.matches(HEADER_SEARCH_MODE_MODAL_SELECTOR)) {
        this.modalHandler.watchForMediaQueryChange(PlugAndPlay_global_js_screenSize__WEBPACK_IMPORTED_MODULE_1__/* .minMediaQueryMD */ .q5, () => {
          this._deactivateModal();
        }, () => {
          this._activateModal();
        });
      }
    }
    /**
     * Function to stop listening to the media query when the search or modal is closed.
     */


    _stopListeningFoMediaQueryChange() {
      this.modalHandler.removeMediaQueryWatch();
    }
    /**
     * Function to handle the input change, adds a class to root to identify if text content exists or not
     */


    _handleInputChange(e) {
      const {
        target
      } = e;

      if (target.value !== '') {
        this.headerSearchWrapper.classList.add(HEADER_SEARCH_HAS_INPUT_CLASS);
      } else {
        this.headerSearchWrapper.classList.remove(HEADER_SEARCH_HAS_INPUT_CLASS);
      }
    }

  } // Find all components (should only be one) and created handler objects


  const headerSearch = document.querySelectorAll(HEADER_SEARCH_SELECTOR);
  headerSearch.forEach(item => {
    // Create a new item to modify
    const DOMItem = item; // Attach the class instance to our DOMItem

    if (!DOMItem.headerSearch) {
      DOMItem.headerSearch = new HeaderSearch(item);
    }
  });
}

_headerSearch();

/***/ }),

/***/ 23878:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function _scrollbutton() {
  /**
   * Scroll button selector
   * @const {string}
   */
  const SCROLL_BTN_SELECTOR = '.hero-banner__js-scroll-btn'; // Add event listener to the scroll button

  function smpScrollTopBtn(selector) {
    // On click of the scroll button, scroll banner out of the way to expose main content
    selector.addEventListener('click', () => {
      selector.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
  /**
   * @const {boolean}
   */


  const scrollBtnExists = !!document.querySelector(SCROLL_BTN_SELECTOR); // If the scollBtn Exists

  if (scrollBtnExists) {
    smpScrollTopBtn(document.querySelector(SCROLL_BTN_SELECTOR));
  }
}

_scrollbutton();

/***/ }),

/***/ 95003:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* eslint-disable max-classes-per-file */
function _iconViewer() {
  /**
   * Icon Viewer wrapper selector
   * @const {string}
   */
  const ICON_VIEWER_SELECTOR = '[data-component="icon-viewer"]';
  /**
   * Icon List selector
   * @const {string}
   */

  const ICON_VIEWER_LIST_SELECTOR = '[data-component="icon-viewer-list"]';
  /**
   * Custom Icon List selector
   * @const {string}
   */

  const ICON_VIEWER_CUSTOM_LIST_SELECTOR = '[data-component="icon-viewer-custom-list"]';
  /**
   * Selector for icon html template
   * @const {string}
   */

  const ICON_VIEWER_ICON_TEMPLATE = 'template[id="icon-viewer-icon"]';
  /**
   * Icon Name selector
   * @const {string}
   */

  const ICON_VIEWER_ICON_NAME_SELECTOR = '[data-component="icon-viewer-icon-name"]';
  /**
   * Icon copy button selector
   * @const {string}
   */

  const ICON_VIEWER_ICON_COPY_SELECTOR = '[data-component="icon-viewer-copy"]';
  /**
   * Icon copy button selector
   * @const {string}
   */

  const ICON_VIEWER_ICON_COPYED_MESSAGE_SELECTOR = '[data-component="icon-viewer-copied-message"]';
  /**
   * Create a new IconViewer
   * @param {HTMLElement} iconViewer - The wrapping HTML element of the IconViewer
   * @class
   */

  class IconViewer {
    constructor(iconViewer) {
      this.iconViewer = iconViewer;
      this.iconTemplate = iconViewer.querySelector(ICON_VIEWER_ICON_TEMPLATE).content.firstElementChild;
      this.init();
    }
    /**
     * Initialises the icon list by fetching all loaded SVGs available to
     * be <use>'d in the page body and lists them to the user.
     */


    init() {
      const icons = this.getStandardIcons();
      const list = this.iconViewer.querySelector(ICON_VIEWER_LIST_SELECTOR);
      icons.forEach(icon => {
        const id = icon.getAttribute('id');
        const iconDom = this.createIcon(id, id);
        list.appendChild(iconDom);
      });
      const custom = this.getCustomIcons();
      const customList = this.iconViewer.querySelector(ICON_VIEWER_CUSTOM_LIST_SELECTOR);
      custom.forEach(icon => {
        const id = icon.getAttribute('id');
        const iconDom = this.createIcon(id, id);
        customList.appendChild(iconDom);
      });
    }
    /**
     * Get all icons that have been loaded into the page body for re-use using the
     * SVG <use> tag. In dev these are loaded via webpack into the body, im prod / Matrix
     * these are loaded from a sprite map generated by the build process and may have additional
     * customer added entries.
     */


    getStandardIcons() {
      // Manual upload method
      const iconMap = document.querySelectorAll('div[data-component="icon-map"] symbol[id]');

      if (iconMap.length > 0) {
        return iconMap;
      } // Webpack bundled upload method


      const iconSprites = document.querySelectorAll('#__SVG_SPRITE_NODE__ symbol[id]');
      return iconSprites;
    }
    /**
     * Gets any custom icons added by a client to the icon map
     *
     * @returns Array of custom icon nodes
     */


    getCustomIcons() {
      return document.querySelectorAll('div[data-component="custom-icons"] svg[id]');
    }
    /**
     * Create a new DOM element based on the supplied HTML template to create
     * each icon in the icon list.
     *
     * @param {String} name - name of the icon for <use>
     * @param {String} title  - title of the icon for <title>
     * @returns DOMElement
     */


    createIcon(name, title) {
      const icon = this.iconTemplate.cloneNode(true);
      icon.querySelector('use').setAttribute('href', "#".concat(name));
      icon.querySelector('title').appendChild(document.createTextNode(title));
      icon.querySelector(ICON_VIEWER_ICON_NAME_SELECTOR).appendChild(document.createTextNode(title));
      icon.querySelector(ICON_VIEWER_ICON_COPY_SELECTOR).addEventListener('click', e => this.copyIconId(e));
      return icon;
    }
    /**
     * Click handler for clicking on an icon, copies the value from the icons
     * <use> tag into the clipboard.
     *
     * @param {Event} e - event object
     */


    copyIconId(e) {
      // To copy to clipboard you have to select then execute a copy command
      const {
        target
      } = e;
      const el = document.createElement('textarea');
      el.value = target.querySelector('use').getAttribute('href').substring(1);
      target.appendChild(el);
      el.select();
      document.execCommand('copy');
      target.removeChild(el); // Add class to copied message to show it

      this.iconViewer.querySelector(ICON_VIEWER_ICON_COPYED_MESSAGE_SELECTOR).classList.add('icon-viewer__copied-message--active'); // If any existing timeout is happening, kill it and reset the message to base state

      if (this.timeout) {
        this.iconViewer.querySelector(ICON_VIEWER_ICON_COPYED_MESSAGE_SELECTOR).classList.remove('icon-viewer__copied-message--hiding');
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        // After 2 seconds start fading the message out
        this.iconViewer.querySelector(ICON_VIEWER_ICON_COPYED_MESSAGE_SELECTOR).classList.add('icon-viewer__copied-message--hiding');
        this.timeout = setTimeout(() => {
          // After one second hide the message from screen and screen readers
          this.iconViewer.querySelector(ICON_VIEWER_ICON_COPYED_MESSAGE_SELECTOR).classList.remove('icon-viewer__copied-message--active');
          this.iconViewer.querySelector(ICON_VIEWER_ICON_COPYED_MESSAGE_SELECTOR).classList.remove('icon-viewer__copied-message--hiding');
          this.timeout = undefined;
        }, 1000);
      }, 2000);
    }

  } // Find all IconViewer and created handler objects


  const iconViewers = document.querySelectorAll(ICON_VIEWER_SELECTOR);
  iconViewers.forEach(iconViewer => {
    // Create a new item to modify
    const DOMItem = iconViewer;

    if (!DOMItem.iconViewer) {
      DOMItem.iconViewer = new IconViewer(iconViewer);
    }
  });
}

_iconViewer();

/***/ }),

/***/ 64878:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var ally_js_src_when_key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87308);
/* harmony import */ var _primary_nav_js_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28591);


function _megaMenu() {
  /**
   * Mega menu selector
   * @const {string}
   */
  const MEGA_MENU_SELECTOR = '[data-component="mega-menu"]';
  /**
   * Mega menu list selector
   * @const {string}
   */

  const MEGA_MENU_LIST_SELECTOR = '.mega-menu__nav-list';
  /**
   * Mega menu item selector
   * @const {string}
   */

  const MEGA_MENU_ITEM_SELECTOR = '.mega-menu__nav-item';
  /**
   * Mega menu item has child class
   * @const {string}
   */

  const MEGA_MENU_ITEM_HAS_CHILD = 'mega-menu__nav-item--has-children';
  /**
   * Mega menu double teir element selector
   * @const {string}
   */

  const MEGA_MENU_DOUBLE_TEIR_SELECTOR = '.mega-menu-wrapper--double-teir';
  /**
   * Mega menu double teir element active class
   * @const {string}
   */

  const MEGA_MENU_DOUBLE_TEIR_ACTIVE = 'mega-menu-wrapper--double-active';
  /**
   * Mega menu double teir element selector
   * @const {string}
   */

  const MEGA_MENU_TEIR_1_LEVEL_SELECTOR = '.mega-menu__nav-list--level-1';
  /**
   * Mega menu double teir expantion selector
   * @const {string}
   */

  const MEGA_MENU_DOUBLE_TEIR_EXPAND_SELECTOR = '.mega-menu__nav-expand';
  /**
   * Mega menu double teir item active
   * @const {string}
   */

  const MEGA_MENU_DOUBLE_TEIR_ITEM_ACTIVE = 'mega-menu__nav-item--active';
  /**
   * Create a new Mega Menu
   * @param {HTMLElement} MegaMenu - The HTML element of the mega menu
   * @class
   */

  class MegaMenu {
    constructor(megaMenu) {
      this.megaMenu = megaMenu;
      this.allyHandles = {
        keyHandle: undefined
      };
      this.allyHandles.keyHandle = (0,ally_js_src_when_key__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)({
        escape: () => {
          setTimeout(this.closeMenu());
        }
      }); // If the menu is double teir, attach expantion handlers

      const doubleTeir = megaMenu.matches(MEGA_MENU_DOUBLE_TEIR_SELECTOR);

      if (doubleTeir) {
        const menuExpanders = megaMenu.querySelectorAll(MEGA_MENU_DOUBLE_TEIR_EXPAND_SELECTOR);
        menuExpanders.forEach(expander => {
          const navItem = expander.closest(MEGA_MENU_ITEM_SELECTOR);
          expander.addEventListener('click', () => {
            this._doubleTeirExpandMenu(navItem, true);
          });
          navItem.addEventListener('mouseover', () => {
            this._doubleTeirExpandMenu(navItem);
          });
          navItem.addEventListener('mouseleave', () => {
            this._doubleTeirRemoveHoverActive(navItem);
          });
        });
      }
    }

    closeMenu() {
      // Is the current mega menu open
      const openMegaMenu = this.megaMenu.closest(".".concat(_primary_nav_js_global__WEBPACK_IMPORTED_MODULE_1__/* .NAV_ITEM_ACTIVE */ .HP));

      if (openMegaMenu) {
        // Does the currently open mega menu have focus within
        const currentFocus = document.activeElement;
        const isMenuInFocus = this.megaMenu.contains(currentFocus); // Close the menu

        openMegaMenu.classList.remove(_primary_nav_js_global__WEBPACK_IMPORTED_MODULE_1__/* .NAV_ITEM_ACTIVE */ .HP);

        if (isMenuInFocus) {
          // Reset the focus to the menu expander button
          openMegaMenu.querySelector(_primary_nav_js_global__WEBPACK_IMPORTED_MODULE_1__/* .MENU_EXPANDER_SELECTOR */ .$D).focus();
        }
      }
    }
    /**
     * Function to open the third navigation their when a second teir item is hovered or actioned. Dynamically adjusts the height of the
     * parent double teir container to fit the full body of the third menu tier if it is larger than the default
     *
     * @param {Element} navigationItem - Navigation item that was hovered or the closed nav item to the button that was clicked
     * @param {boolean} clickedOpen - If this function is being called from a button slick to open (true) or a hover (false)
     */


    _doubleTeirExpandMenu(navigationItem, clickedOpen) {
      const navItem = navigationItem; // Remove active from any siblings

      const allItems = navigationItem.closest(MEGA_MENU_TEIR_1_LEVEL_SELECTOR).querySelectorAll(MEGA_MENU_ITEM_SELECTOR);
      allItems.forEach(item => {
        item.classList.remove(MEGA_MENU_DOUBLE_TEIR_ITEM_ACTIVE);
      });
      const subNavHeight = navItem.querySelector(MEGA_MENU_LIST_SELECTOR).clientHeight;
      const doubleTeir = navItem.closest(MEGA_MENU_DOUBLE_TEIR_SELECTOR);
      doubleTeir.style.setProperty('--subNavHeightNeeded', "".concat(subNavHeight, "px"));

      if (navItem.classList.contains(MEGA_MENU_ITEM_HAS_CHILD)) {
        doubleTeir.classList.add(MEGA_MENU_DOUBLE_TEIR_ACTIVE);
      }

      if (clickedOpen) {
        // Add active class
        navItem.classList.add(MEGA_MENU_DOUBLE_TEIR_ITEM_ACTIVE);
      }
    }
    /**
     * Function handles removing active class added on hover when hover is lost
     *
     * @param {Element} navItem - Navigation item that has lost hover
     */


    _doubleTeirRemoveHoverActive(navItem) {
      const doubleTeir = navItem.closest(MEGA_MENU_DOUBLE_TEIR_SELECTOR);
      doubleTeir.classList.remove(MEGA_MENU_DOUBLE_TEIR_ACTIVE);
    }

  } // Finall all mega menus and created handler objects


  const megaMenus = document.querySelectorAll(MEGA_MENU_SELECTOR);
  megaMenus.forEach(megaMenu => {
    // Create a new item to modify
    const DOMItem = megaMenu; // Attach the megamenu instance to our DOM Item

    if (!DOMItem.megaMenu) {
      DOMItem.megaMenu = new MegaMenu(megaMenu);
    }
  });
}

_megaMenu();

/***/ }),

/***/ 46347:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "u": function() { return /* binding */ Modal; }
});

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/ally.js/src/util/node-array.js
var node_array = __webpack_require__(93033);
;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/context-to-element.js



/* harmony default export */ function context_to_element({
  context,
  label = 'context-to-element',
  resolveDocument,
  defaultToDocument,
}) {
  let element = (0,node_array/* default */.Z)(context)[0];

  if (resolveDocument && element && element.nodeType === Node.DOCUMENT_NODE) {
    element = element.documentElement;
  }

  if (!element && defaultToDocument) {
    return document.documentElement;
  }

  if (!element) {
    throw new TypeError(label + ' requires valid options.context');
  }

  if (element.nodeType !== Node.ELEMENT_NODE && element.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
    throw new TypeError(label + ' requires options.context to be an Element');
  }

  return element;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/get/parents.js



// [elem, elem.parent, elem.parent.parent, …, html]
// will not contain the shadowRoot (DOCUMENT_FRAGMENT_NODE) and shadowHost
/* harmony default export */ function get_parents({context} = {}) {
  const list = [];
  let element = context_to_element({
    label: 'get/parents',
    context,
  });

  while (element) {
    list.push(element);
    // IE does know support parentElement on SVGElement
    element = element.parentNode;
    if (element && element.nodeType !== Node.ELEMENT_NODE) {
      element = null;
    }
  }

  return list;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/element-matches.js

// Element.prototype.matches may be available at a different name
// https://developer.mozilla.org/en/docs/Web/API/Element/matches

const names = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'];
let element_matches_name = null;

function findMethodName(element) {
  names.some(function(_name) {
    if (!element[_name]) {
      return false;
    }

    element_matches_name = _name;
    return true;
  });
}

function elementMatches(element, selector) {
  if (!element_matches_name) {
    findMethodName(element);
  }

  return element[element_matches_name](selector);
}

// EXTERNAL MODULE: ./node_modules/platform/platform.js
var platform = __webpack_require__(31795);
var platform_default = /*#__PURE__*/__webpack_require__.n(platform);
;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/platform.js

// sugar for https://github.com/bestiejs/platform.js
// make sure to ALWAYS reference the layout engine,
// even if it is not necessary for the condition,
// as this makes grepping for this stuff simpler



// deep clone of original platform
const platform_platform = JSON.parse(JSON.stringify((platform_default())));

// operating system
const os = platform_platform.os.family || '';
const ANDROID = os === 'Android';
const WINDOWS = os.slice(0, 7) === 'Windows';
const OSX = os === 'OS X';
const IOS = os === 'iOS';

// layout
const BLINK = platform_platform.layout === 'Blink';
const GECKO = platform_platform.layout === 'Gecko';
const TRIDENT = platform_platform.layout === 'Trident';
const EDGE = platform_platform.layout === 'EdgeHTML';
const WEBKIT = platform_platform.layout === 'WebKit';

// browser version (not layout engine version!)
const version = parseFloat(platform_platform.version);
const majorVersion = Math.floor(version);
platform_platform.majorVersion = majorVersion;

platform_platform.is = {
  // operating system
  ANDROID,
  WINDOWS,
  OSX,
  IOS,
  // layout
  BLINK, // "Chrome", "Chrome Mobile", "Opera"
  GECKO, // "Firefox"
  TRIDENT, // "Internet Explorer"
  EDGE, // "Microsoft Edge"
  WEBKIT, // "Safari"
  // INTERNET EXPLORERS
  IE9: TRIDENT && majorVersion === 9,
  IE10: TRIDENT && majorVersion === 10,
  IE11: TRIDENT && majorVersion === 11,
};

/* harmony default export */ var util_platform = (platform_platform);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/detect-focus.js



function before() {
  const data = {
    // remember what had focus to restore after test
    activeElement: document.activeElement,
    // remember scroll positions to restore after test
    windowScrollTop: window.scrollTop,
    windowScrollLeft: window.scrollLeft,
    bodyScrollTop: document.body.scrollTop,
    bodyScrollLeft: document.body.scrollLeft,
  };

  // wrap tests in an element hidden from screen readers to prevent them
  // from announcing focus, which can be quite irritating to the user
  const iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute; position:fixed; top:0; left:-2px; width:1px; height:1px; overflow:hidden;');
  iframe.setAttribute('aria-live', 'off');
  iframe.setAttribute('aria-busy', 'true');
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const _window = iframe.contentWindow;
  const _document = _window.document;

  _document.open();
  _document.close();
  const wrapper = _document.createElement('div');
  _document.body.appendChild(wrapper);

  data.iframe = iframe;
  data.wrapper = wrapper;
  data.window = _window;
  data.document = _document;

  return data;
}

// options.element:
//  {string} element name
//  {function} callback(wrapper, document) to generate an element
// options.mutate: (optional)
//  {function} callback(element, wrapper, document) to manipulate element prior to focus-test.
//             Can return DOMElement to define focus target (default: element)
// options.validate: (optional)
//  {function} callback(element, focusTarget, document) to manipulate test-result
function test(data, options) {
  // make sure we operate on a clean slate
  data.wrapper.innerHTML = '';
  // create dummy element to test focusability of
  const element = typeof options.element === 'string'
    ? data.document.createElement(options.element)
    : options.element(data.wrapper, data.document);
  // allow callback to further specify dummy element
  // and optionally define element to focus
  let focus = options.mutate && options.mutate(element, data.wrapper, data.document);
  if (!focus && focus !== false) {
    focus = element;
  }
  // element needs to be part of the DOM to be focusable
  !element.parentNode && data.wrapper.appendChild(element);
  // test if the element with invalid tabindex can be focused
  focus && focus.focus && focus.focus();
  // validate test's result
  return options.validate
    ? options.validate(element, focus, data.document)
    : data.document.activeElement === focus;
}

function after(data) {
  // restore focus to what it was before test and cleanup
  if (data.activeElement === document.body) {
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
    if (util_platform.is.IE10) {
      // IE10 does not redirect focus to <body> when the activeElement is removed
      document.body.focus();
    }
  } else {
    data.activeElement && data.activeElement.focus && data.activeElement.focus();
  }

  document.body.removeChild(data.iframe);

  // restore scroll position
  window.scrollTop = data.windowScrollTop;
  window.scrollLeft = data.windowScrollLeft;
  document.body.scrollTop = data.bodyScrollTop;
  document.body.scrollLeft = data.bodyScrollLeft;
}

/* harmony default export */ function detect_focus(tests) {
  const data = before();

  const results = {};
  Object.keys(tests).map(function(key) {
    results[key] = test(data, tests[key]);
  });

  after(data);
  return results;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/version.js

// this file is overwritten by `npm run build:pre`
const version_version = '1.4.1';
/* harmony default export */ var src_version = (version_version);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/supports-cache.js
/*
    Facility to cache test results in localStorage.

    USAGE:
      cache.get('key');
      cache.set('key', 'value');
 */



function readLocalStorage(key) {
  // allow reading from storage to retrieve previous support results
  // even while the document does not have focus
  let data;

  try {
    data = window.localStorage && window.localStorage.getItem(key);
    data = data ? JSON.parse(data) : {};
  } catch (e) {
    data = {};
  }

  return data;
}

function writeLocalStorage(key, value) {
  if (!document.hasFocus()) {
    // if the document does not have focus when tests are executed, focus() may
    // not be handled properly and events may not be dispatched immediately.
    // This can happen when a document is reloaded while Developer Tools have focus.
    try {
      window.localStorage && window.localStorage.removeItem(key);
    } catch (e) {
      // ignore
    }

    return;
  }

  try {
    window.localStorage && window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

const userAgent = typeof window !== 'undefined' && window.navigator.userAgent || '';
const cacheKey = 'ally-supports-cache';
let cache = readLocalStorage(cacheKey);

// update the cache if ally or the user agent changed (newer version, etc)
if (cache.userAgent !== userAgent || cache.version !== src_version) {
  cache = {};
}

cache.userAgent = userAgent;
cache.version = src_version;

/* harmony default export */ var supports_cache = ({
  get: function() {
    return cache;
  },
  set: function(values) {
    Object.keys(values).forEach(function(key) {
      cache[key] = values[key];
    });

    cache.time = new Date().toISOString();
    writeLocalStorage(cacheKey, cache);
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/css-shadow-piercing-deep-combinator.js

/* harmony default export */ function css_shadow_piercing_deep_combinator() {
  let combinator;

  // see https://dev.w3.org/csswg/css-scoping-1/#deep-combinator
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1117572
  // https://code.google.com/p/chromium/issues/detail?id=446051
  try {
    document.querySelector('html >>> :first-child');
    combinator = '>>>';
  } catch (noArrowArrowArrow) {
    try {
      // old syntax supported at least up to Chrome 41
      // https://code.google.com/p/chromium/issues/detail?id=446051
      document.querySelector('html /deep/ :first-child');
      combinator = '/deep/';
    } catch (noDeep) {
      combinator = '';
    }
  }

  return combinator;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/media/gif.js

/* harmony default export */ var gif = ('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-area-img-tabindex.js



// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
/* harmony default export */ var focus_area_img_tabindex = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="image-map-tabindex-test">'
      + '<area shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#image-map-tabindex-test" tabindex="-1" alt="" src="' + gif + '">';

    return element.querySelector('area');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-area-tabindex.js




// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
/* harmony default export */ var focus_area_tabindex = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="image-map-tabindex-test">'
      + '<area href="#void" tabindex="-1" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#image-map-tabindex-test" alt="" src="' + gif + '">';

    return false;
  },
  validate: function(element, focusTarget, _document) {
    if (util_platform.is.GECKO) {
      // fixes https://github.com/medialize/ally.js/issues/35
      // Firefox loads the DataURI asynchronously, causing a false-negative
      return true;
    }

    const focus = element.querySelector('area');
    focus.focus();
    return _document.activeElement === focus;
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-area-without-href.js




// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
/* harmony default export */ var focus_area_without_href = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="image-map-area-href-test">'
      + '<area shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#image-map-area-href-test" alt="" src="' + gif + '">';

    return element.querySelector('area');
  },
  validate: function(element, focusTarget, _document) {
    if (util_platform.is.GECKO) {
      // fixes https://github.com/medialize/ally.js/issues/35
      // Firefox loads the DataURI asynchronously, causing a false-negative
      return true;
    }

    return _document.activeElement === focusTarget;
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/media/mp3.js

// export default 'data:audio/mp3;base64,audio-focus-test';

/* harmony default export */ var mp3 = (gif);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-audio-without-controls.js



/* harmony default export */ var focus_audio_without_controls = ({
  name: 'can-focus-audio-without-controls',
  element: 'audio',
  mutate: function(element) {
    try {
      // invalid media file can trigger warning in console, data-uri to prevent HTTP request
      element.setAttribute('src', mp3);
    } catch (e) {
      // IE9 may throw "Error: Not implemented"
    }
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/media/gif.invalid.js

/* harmony default export */ var gif_invalid = ('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-broken-image-map.js



// NOTE: https://github.com/medialize/ally.js/issues/35
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
/* harmony default export */ var focus_broken_image_map = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="broken-image-map-test"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#broken-image-map-test" alt="" src="' + gif_invalid + '">';

    return element.querySelector('area');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-children-of-focusable-flexbox.js

// Children of focusable elements with display:flex are focusable in IE10-11
/* harmony default export */ var focus_children_of_focusable_flexbox = ({
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', '-1');
    element.setAttribute('style', 'display: -webkit-flex; display: -ms-flexbox; display: flex;');
    element.innerHTML = '<span style="display: block;">hello</span>';
    return element.querySelector('span');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-fieldset-disabled.js

// fieldset[tabindex=0][disabled] should not be focusable, but Blink and WebKit disagree
// @specification https://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
// @browser-issue Chromium https://crbug.com/453847
// @browser-issue WebKit https://bugs.webkit.org/show_bug.cgi?id=141086
/* harmony default export */ var focus_fieldset_disabled = ({
  element: 'fieldset',
  mutate: function(element) {
    element.setAttribute('tabindex', 0);
    element.setAttribute('disabled', 'disabled');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-fieldset.js

/* harmony default export */ var focus_fieldset = ({
  element: 'fieldset',
  mutate: function(element) {
    element.innerHTML = '<legend>legend</legend><p>content</p>';
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-flexbox-container.js

// elements with display:flex are focusable in IE10-11
/* harmony default export */ var focus_flexbox_container = ({
  element: 'span',
  mutate: function(element) {
    element.setAttribute('style', 'display: -webkit-flex; display: -ms-flexbox; display: flex;');
    element.innerHTML = '<span style="display: block;">hello</span>';
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-form-disabled.js

// form[tabindex=0][disabled] should be focusable as the
// specification doesn't know the disabled attribute on the form element
// @specification https://www.w3.org/TR/html5/forms.html#the-form-element
/* harmony default export */ var focus_form_disabled = ({
  element: 'form',
  mutate: function(element) {
    element.setAttribute('tabindex', 0);
    element.setAttribute('disabled', 'disabled');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-img-ismap.js



// NOTE: https://github.com/medialize/ally.js/issues/35
// fixes https://github.com/medialize/ally.js/issues/20
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-ismap
/* harmony default export */ var focus_img_ismap = ({
  element: 'a',
  mutate: function(element) {
    element.href = '#void';
    element.innerHTML = '<img ismap src="' + gif + '" alt="">';
    return element.querySelector('img');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-img-usemap-tabindex.js



// NOTE: https://github.com/medialize/ally.js/issues/35
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
/* harmony default export */ var focus_img_usemap_tabindex = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="image-map-tabindex-test"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#image-map-tabindex-test" tabindex="-1" alt="" '
      + 'src="' + gif + '">';

    return element.querySelector('img');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-in-hidden-iframe.js

/* harmony default export */ var focus_in_hidden_iframe = ({
  element: function(wrapper, _document) {
    const iframe = _document.createElement('iframe');

    // iframe must be part of the DOM before accessing the contentWindow is possible
    wrapper.appendChild(iframe);

    // create the iframe's default document (<html><head></head><body></body></html>)
    const iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.close();
    return iframe;
  },
  mutate: function(iframe) {
    iframe.style.visibility = 'hidden';

    const iframeDocument = iframe.contentWindow.document;
    const input = iframeDocument.createElement('input');
    iframeDocument.body.appendChild(input);
    return input;
  },
  validate: function(iframe) {
    const iframeDocument = iframe.contentWindow.document;
    const focus = iframeDocument.querySelector('input');
    return iframeDocument.activeElement === focus;
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-in-zero-dimension-object.js



const result = !util_platform.is.WEBKIT;

/* harmony default export */ function focus_in_zero_dimension_object() {
  return result;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-invalid-tabindex.js

// Firefox allows *any* value and treats invalid values like tabindex="-1"
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
/* harmony default export */ var focus_invalid_tabindex = ({
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', 'invalid-value');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-label-tabindex.js

/* harmony default export */ var focus_label_tabindex = ({
  element: 'label',
  mutate: function(element) {
    element.setAttribute('tabindex', '-1');
  },
  validate: function(element, focusTarget, _document) {
    // force layout in Chrome 49, otherwise the element won't be focusable
    /* eslint-disable no-unused-vars */
    const variableToPreventDeadCodeElimination = element.offsetHeight;
    /* eslint-enable no-unused-vars */
    element.focus();
    return _document.activeElement === element;
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/media/svg.js

/* harmony default export */ var svg = ('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtb'
  + 'G5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0ic3ZnIj48dGV4dCB4PSIxMCIgeT0iMjAiIGlkPSJ'
  + 'zdmctbGluay10ZXh0Ij50ZXh0PC90ZXh0Pjwvc3ZnPg==');

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-object-svg-hidden.js



// Note: IE10 on BrowserStack does not like this test

/* harmony default export */ var focus_object_svg_hidden = ({
  element: 'object',
  mutate: function(element) {
    element.setAttribute('type', 'image/svg+xml');
    element.setAttribute('data', svg);
    element.setAttribute('width', '200');
    element.setAttribute('height', '50');
    element.style.visibility = 'hidden';
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-object-svg.js




// Note: IE10 on BrowserStack does not like this test

/* harmony default export */ var focus_object_svg = ({
  name: 'can-focus-object-svg',
  element: 'object',
  mutate: function(element) {
    element.setAttribute('type', 'image/svg+xml');
    element.setAttribute('data', svg);
    element.setAttribute('width', '200');
    element.setAttribute('height', '50');
  },
  validate: function(element, focusTarget, _document) {
    if (util_platform.is.GECKO) {
      // Firefox seems to be handling the object creation asynchronously and thereby produces a false negative test result.
      // Because we know Firefox is able to focus object elements referencing SVGs, we simply cheat by sniffing the user agent string
      return true;
    }

    return _document.activeElement === element;
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-object-swf.js



// Every Environment except IE9 considers SWF objects focusable
const focus_object_swf_result = !util_platform.is.IE9;

/* harmony default export */ function focus_object_swf() {
  return focus_object_swf_result;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-redirect-img-usemap.js



/* harmony default export */ var focus_redirect_img_usemap = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="focus-redirect-img-usemap"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#focus-redirect-img-usemap" alt="" '
      + 'src="' + gif + '">';

    // focus the <img>, not the <div>
    return element.querySelector('img');
  },
  validate: function(element, focusTarget, _document) {
    const target = element.querySelector('area');
    return _document.activeElement === target;
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-redirect-legend.js

// see https://jsbin.com/nenirisage/edit?html,js,console,output

/* harmony default export */ var focus_redirect_legend = ({
  element: 'fieldset',
  mutate: function(element) {
    element.innerHTML = '<legend>legend</legend><input tabindex="-1"><input tabindex="0">';
    // take care of focus in validate();
    return false;
  },
  validate: function(element, focusTarget, _document) {
    const focusable = element.querySelector('input[tabindex="-1"]');
    const tabbable = element.querySelector('input[tabindex="0"]');

    // Firefox requires this test to focus the <fieldset> first, while this is not necessary in
    // https://jsbin.com/nenirisage/edit?html,js,console,output
    element.focus();

    element.querySelector('legend').focus();
    return _document.activeElement === focusable && 'focusable'
      || _document.activeElement === tabbable && 'tabbable'
      || '';
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-scroll-body.js

// https://github.com/medialize/ally.js/issues/21
/* harmony default export */ var focus_scroll_body = ({
  element: 'div',
  mutate: function(element) {
    element.setAttribute('style', 'width: 100px; height: 50px; overflow: auto;');
    element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
    return element.querySelector('div');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-scroll-container-without-overflow.js

// https://github.com/medialize/ally.js/issues/21
/* harmony default export */ var focus_scroll_container_without_overflow = ({
  element: 'div',
  mutate: function(element) {
    element.setAttribute('style', 'width: 100px; height: 50px;');
    element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-scroll-container.js

// https://github.com/medialize/ally.js/issues/21
/* harmony default export */ var focus_scroll_container = ({
  element: 'div',
  mutate: function(element) {
    element.setAttribute('style', 'width: 100px; height: 50px; overflow: auto;');
    element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-summary.js

/* harmony default export */ var focus_summary = ({
  element: 'details',
  mutate: function(element) {
    element.innerHTML = '<summary>foo</summary><p>content</p>';
    return element.firstElementChild;
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/element/focus.svg-foreign-object-hack.js

function makeFocusableForeignObject() {
  const fragment = document.createElement('div');
  fragment.innerHTML = `<svg><foreignObject width="30" height="30">
      <input type="text"/>
  </foreignObject></svg>`;

  return fragment.firstChild.firstChild;
}

/* harmony default export */ function focus_svg_foreign_object_hack(element) {
  // Edge13, Edge14: foreignObject focus hack
  // https://jsbin.com/kunehinugi/edit?html,js,output
  // https://jsbin.com/fajagi/3/edit?html,js,output
  const isSvgElement = element.ownerSVGElement || element.nodeName.toLowerCase() === 'svg';
  if (!isSvgElement) {
    return false;
  }

  // inject and focus an <input> element into the SVG element to receive focus
  const foreignObject = makeFocusableForeignObject();
  element.appendChild(foreignObject);
  const input = foreignObject.querySelector('input');
  input.focus();

  // upon disabling the activeElement, IE and Edge
  // will not shift focus to <body> like all the other
  // browsers, but instead find the first focusable
  // ancestor and shift focus to that
  input.disabled = true;

  // clean up
  element.removeChild(foreignObject);
  return true;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/helper/svg.js



function generate(element) {
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
    + element + '</svg>';
}

function svg_focus(element) {
  if (element.focus) {
    return;
  }

  try {
    HTMLElement.prototype.focus.call(element);
  } catch (e) {
    focus_svg_foreign_object_hack(element);
  }
}

function validate(element, focusTarget, _document) {
  svg_focus(focusTarget);
  return _document.activeElement === focusTarget;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-svg-focusable-attribute.js



/* harmony default export */ var focus_svg_focusable_attribute = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('<text focusable="true">a</text>');
    return element.querySelector('text');
  },
  validate: validate,
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-svg-tabindex-attribute.js



/* harmony default export */ var focus_svg_tabindex_attribute = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('<text tabindex="0">a</text>');
    return element.querySelector('text');
  },
  validate: validate,
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-svg-negative-tabindex-attribute.js



/* harmony default export */ var focus_svg_negative_tabindex_attribute = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('<text tabindex="-1">a</text>');
    return element.querySelector('text');
  },
  validate: validate,
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-svg-use-tabindex.js



/* harmony default export */ var focus_svg_use_tabindex = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate([
      '<g id="ally-test-target"><a xlink:href="#void"><text>link</text></a></g>',
      '<use xlink:href="#ally-test-target" x="0" y="0" tabindex="-1" />',
    ].join(''));

    return element.querySelector('use');
  },
  validate: validate,
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-svg-foreignobject-tabindex.js



/* harmony default export */ var focus_svg_foreignobject_tabindex = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('<foreignObject tabindex="-1"><input type="text" /></foreignObject>');
    // Safari 8's quersSelector() can't identify foreignObject, but getElementyByTagName() can
    return element.querySelector('foreignObject') || element.getElementsByTagName('foreignObject')[0];
  },
  validate: validate,

});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-svg-in-iframe.js



// Firefox seems to be handling the SVG-document-in-iframe creation asynchronously
// and thereby produces a false negative test result. Thus the test is pointless
// and we resort to UA sniffing once again.
// see http://jsbin.com/vunadohoko/1/edit?js,console,output

const focus_svg_in_iframe_result = Boolean(util_platform.is.GECKO && typeof SVGElement !== 'undefined' && SVGElement.prototype.focus);

/* harmony default export */ function focus_svg_in_iframe() {
  return focus_svg_in_iframe_result;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-svg.js



/* harmony default export */ var focus_svg = ({
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('');
    return element.firstChild;
  },
  validate: validate,
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-tabindex-trailing-characters.js

// Firefox allows *any* value and treats invalid values like tabindex="-1"
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
/* harmony default export */ var focus_tabindex_trailing_characters = ({
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', '3x');
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-table.js

/* harmony default export */ var focus_table = ({
  element: 'table',
  mutate: function(element, wrapper, _document) {
    // IE9 has a problem replacing TBODY contents with innerHTML.
    // https://stackoverflow.com/a/8097055/515124
    // element.innerHTML = '<tr><td>cell</td></tr>';
    const fragment = _document.createDocumentFragment();
    fragment.innerHTML = '<tr><td>cell</td></tr>';
    element.appendChild(fragment);
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/media/mp4.js

// export default 'data:video/mp4;base64,video-focus-test';

/* harmony default export */ var mp4 = (gif);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/focus-video-without-controls.js



/* harmony default export */ var focus_video_without_controls = ({
  element: 'video',
  mutate: function(element) {
    try {
      // invalid media file can trigger warning in console, data-uri to prevent HTTP request
      element.setAttribute('src', mp4);
    } catch (e) {
      // IE9 may throw "Error: Not implemented"
    }
  },
});

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/tabsequence-area-at-img-position.js



// https://jsbin.com/vafaba/3/edit?html,js,console,output
const tabsequence_area_at_img_position_result = util_platform.is.GECKO || util_platform.is.TRIDENT || util_platform.is.EDGE;

/* harmony default export */ function tabsequence_area_at_img_position() {
  return tabsequence_area_at_img_position_result;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/supports/supports.js










































const testCallbacks = {
  cssShadowPiercingDeepCombinator: css_shadow_piercing_deep_combinator,
  focusInZeroDimensionObject: focus_in_zero_dimension_object,
  focusObjectSwf: focus_object_swf,
  focusSvgInIframe: focus_svg_in_iframe,
  tabsequenceAreaAtImgPosition: tabsequence_area_at_img_position,
};

const testDescriptions = {
  focusAreaImgTabindex: focus_area_img_tabindex,
  focusAreaTabindex: focus_area_tabindex,
  focusAreaWithoutHref: focus_area_without_href,
  focusAudioWithoutControls: focus_audio_without_controls,
  focusBrokenImageMap: focus_broken_image_map,
  focusChildrenOfFocusableFlexbox: focus_children_of_focusable_flexbox,
  focusFieldsetDisabled: focus_fieldset_disabled,
  focusFieldset: focus_fieldset,
  focusFlexboxContainer: focus_flexbox_container,
  focusFormDisabled: focus_form_disabled,
  focusImgIsmap: focus_img_ismap,
  focusImgUsemapTabindex: focus_img_usemap_tabindex,
  focusInHiddenIframe: focus_in_hidden_iframe,
  focusInvalidTabindex: focus_invalid_tabindex,
  focusLabelTabindex: focus_label_tabindex,
  focusObjectSvg: focus_object_svg,
  focusObjectSvgHidden: focus_object_svg_hidden,
  focusRedirectImgUsemap: focus_redirect_img_usemap,
  focusRedirectLegend: focus_redirect_legend,
  focusScrollBody: focus_scroll_body,
  focusScrollContainerWithoutOverflow: focus_scroll_container_without_overflow,
  focusScrollContainer: focus_scroll_container,
  focusSummary: focus_summary,
  focusSvgFocusableAttribute: focus_svg_focusable_attribute,
  focusSvgTabindexAttribute: focus_svg_tabindex_attribute,
  focusSvgNegativeTabindexAttribute: focus_svg_negative_tabindex_attribute,
  focusSvgUseTabindex: focus_svg_use_tabindex,
  focusSvgForeignobjectTabindex: focus_svg_foreignobject_tabindex,
  focusSvg: focus_svg,
  focusTabindexTrailingCharacters: focus_tabindex_trailing_characters,
  focusTable: focus_table,
  focusVideoWithoutControls: focus_video_without_controls,
};

function executeTests() {
  const results = detect_focus(testDescriptions);
  Object.keys(testCallbacks).forEach(function(key) {
    results[key] = testCallbacks[key]();
  });

  return results;
}

let supportsCache = null;

/* harmony default export */ function supports() {
  if (supportsCache) {
    return supportsCache;
  }

  supportsCache = supports_cache.get();
  if (!supportsCache.time) {
    supports_cache.set(executeTests());
    supportsCache = supports_cache.get();
  }

  return supportsCache;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/valid-tabindex.js

// determine if an element's tabindex attribute has a valid value



let valid_tabindex_supports;

// https://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers
// NOTE: all browsers agree to allow trailing spaces as well
const validIntegerPatternNoTrailing = /^\s*(-|\+)?[0-9]+\s*$/;
const validIntegerPatternWithTrailing = /^\s*(-|\+)?[0-9]+.*$/;

/* harmony default export */ function valid_tabindex(context) {
  if (!valid_tabindex_supports) {
    valid_tabindex_supports = supports();
  }

  const validIntegerPattern = valid_tabindex_supports.focusTabindexTrailingCharacters
    ? validIntegerPatternWithTrailing
    : validIntegerPatternNoTrailing;

  const element = context_to_element({
    label: 'is/valid-tabindex',
    resolveDocument: true,
    context,
  });

  // Edge 14 has a capitalization problem on SVG elements,
  // see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9282058/
  const hasTabindex = element.hasAttribute('tabindex');
  const hasTabIndex = element.hasAttribute('tabIndex');

  if (!hasTabindex && !hasTabIndex) {
    return false;
  }

  // older Firefox and Internet Explorer don't support tabindex on SVG elements
  const isSvgElement = element.ownerSVGElement || element.nodeName.toLowerCase() === 'svg';
  if (isSvgElement && !valid_tabindex_supports.focusSvgTabindexAttribute) {
    return false;
  }

  // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
  if (valid_tabindex_supports.focusInvalidTabindex) {
    return true;
  }

  // an element matches the tabindex selector even if its value is invalid
  const tabindex = element.getAttribute(hasTabindex ? 'tabindex' : 'tabIndex');
  // IE11 parses tabindex="" as the value "-32768"
  // @browser-issue Trident https://connect.microsoft.com/IE/feedback/details/1072965
  if (tabindex === '-32768') {
    return false;
  }

  return Boolean(tabindex && validIntegerPattern.test(tabindex));
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/tabindex-value.js



/* harmony default export */ function tabindex_value(element) {
  if (!valid_tabindex(element)) {
    return null;
  }

  // Edge 14 has a capitalization problem on SVG elements,
  // see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9282058/
  const hasTabindex = element.hasAttribute('tabindex');
  const attributeName = hasTabindex ? 'tabindex' : 'tabIndex';

  // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
  const tabindex = parseInt(element.getAttribute(attributeName), 10);
  return isNaN(tabindex) ? -1 : tabindex;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/is.util.js

// this is a shared utility file for focus-relevant.js and tabbable.js
// separate testing of this file's functions is not necessary,
// as they're implicitly tested by way of the consumers

function isUserModifyWritable(style) {
  // https://www.w3.org/TR/1999/WD-css3-userint-19990916#user-modify
  // https://github.com/medialize/ally.js/issues/17
  const userModify = style.webkitUserModify || '';
  return Boolean(userModify && userModify.indexOf('write') !== -1);
}

function hasCssOverflowScroll(style) {
  return [
    style.getPropertyValue('overflow'),
    style.getPropertyValue('overflow-x'),
    style.getPropertyValue('overflow-y'),
  ].some(overflow => overflow === 'auto' || overflow === 'scroll');
}

function hasCssDisplayFlex(style) {
  return style.display.indexOf('flex') > -1;
}

function isScrollableContainer(element, nodeName, parentNodeName, parentStyle) {
  if (nodeName !== 'div' && nodeName !== 'span') {
    // Internet Explorer advances scrollable containers and bodies to focusable
    // only if the scrollable container is <div> or <span> - this does *not*
    // happen for <section>, <article>, …
    return false;
  }

  if (parentNodeName && parentNodeName !== 'div' && parentNodeName !== 'span' && !hasCssOverflowScroll(parentStyle)) {
    return false;
  }

  return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/focus-relevant.js

// determine if an element supports.can be focused by script regardless
// of the element actually being focusable at the time of execution
// i.e. <input disabled> is conisdered focus-relevant, but not focusable









let focus_relevant_supports;

function isFocusRelevantRules({
  context,
  except = {
    flexbox: false,
    scrollable: false,
    shadow: false,
  },
} = {}) {
  if (!focus_relevant_supports) {
    focus_relevant_supports = supports();
  }

  const element = context_to_element({
    label: 'is/focus-relevant',
    resolveDocument: true,
    context,
  });

  if (!except.shadow && element.shadowRoot) {
    // a ShadowDOM host receives focus when the focus moves to its content
    return true;
  }

  const nodeName = element.nodeName.toLowerCase();

  if (nodeName === 'input' && element.type === 'hidden') {
    // input[type="hidden"] supports.cannot be focused
    return false;
  }

  if (nodeName === 'input' || nodeName === 'select' || nodeName === 'button' || nodeName === 'textarea') {
    return true;
  }

  if (nodeName === 'legend' && focus_relevant_supports.focusRedirectLegend) {
    // specifics filtered in is/focusable
    return true;
  }

  if (nodeName === 'label') {
    // specifics filtered in is/focusable
    return true;
  }

  if (nodeName === 'area') {
    // specifics filtered in is/focusable
    return true;
  }

  if (nodeName === 'a' && element.hasAttribute('href')) {
    return true;
  }

  if (nodeName === 'object' && element.hasAttribute('usemap')) {
    // object[usemap] is not focusable in any browser
    return false;
  }

  if (nodeName === 'object') {
    const svgType = element.getAttribute('type');
    if (!focus_relevant_supports.focusObjectSvg && svgType === 'image/svg+xml') {
      // object[type="image/svg+xml"] is not focusable in Internet Explorer
      return false;
    } else if (!focus_relevant_supports.focusObjectSwf && svgType === 'application/x-shockwave-flash') {
      // object[type="application/x-shockwave-flash"] is not focusable in Internet Explorer 9
      return false;
    }
  }

  if (nodeName === 'iframe' || nodeName === 'object') {
    // browsing context containers
    return true;
  }

  if (nodeName === 'embed' || nodeName === 'keygen') {
    // embed is considered focus-relevant but not focusable
    // see https://github.com/medialize/ally.js/issues/82
    return true;
  }

  if (element.hasAttribute('contenteditable')) {
    // also see CSS property user-modify below
    return true;
  }

  if (nodeName === 'audio' && (focus_relevant_supports.focusAudioWithoutControls || element.hasAttribute('controls'))) {
    return true;
  }

  if (nodeName === 'video' && (focus_relevant_supports.focusVideoWithoutControls || element.hasAttribute('controls'))) {
    return true;
  }

  if (focus_relevant_supports.focusSummary && nodeName === 'summary') {
    return true;
  }

  const validTabindex = valid_tabindex(element);

  if (nodeName === 'img' && element.hasAttribute('usemap')) {
    // Gecko, Trident and Edge do not allow an image with an image map and tabindex to be focused,
    // it appears the tabindex is overruled so focus is still forwarded to the <map>
    return validTabindex && focus_relevant_supports.focusImgUsemapTabindex || focus_relevant_supports.focusRedirectImgUsemap;
  }

  if (focus_relevant_supports.focusTable && (nodeName === 'table' || nodeName === 'td')) {
    // IE10-11 supports.can focus <table> and <td>
    return true;
  }

  if (focus_relevant_supports.focusFieldset && nodeName === 'fieldset') {
    // IE10-11 supports.can focus <fieldset>
    return true;
  }

  const isSvgElement = nodeName === 'svg';
  const isSvgContent = element.ownerSVGElement;
  const focusableAttribute = element.getAttribute('focusable');
  const tabindex = tabindex_value(element);

  if (nodeName === 'use' && tabindex !== null && !focus_relevant_supports.focusSvgUseTabindex) {
    // <use> cannot be made focusable by adding a tabindex attribute anywhere but Blink and WebKit
    return false;
  }

  if (nodeName === 'foreignobject') {
    // <use> can only be made focusable in Blink and WebKit
    return tabindex !== null && focus_relevant_supports.focusSvgForeignobjectTabindex;
  }

  if (elementMatches(element, 'svg a') && element.hasAttribute('xlink:href')) {
    return true;
  }

  if ((isSvgElement || isSvgContent) && element.focus && !focus_relevant_supports.focusSvgNegativeTabindexAttribute && tabindex < 0) {
    // Firefox 51 and 52 treat any natively tabbable SVG element with
    // tabindex="-1" as tabbable and everything else as inert
    // see https://bugzilla.mozilla.org/show_bug.cgi?id=1302340
    return false;
  }

  if (isSvgElement) {
    return validTabindex || focus_relevant_supports.focusSvg || focus_relevant_supports.focusSvgInIframe
      // Internet Explorer understands the focusable attribute introduced in SVG Tiny 1.2
      || Boolean(focus_relevant_supports.focusSvgFocusableAttribute && focusableAttribute && focusableAttribute === 'true');
  }

  if (isSvgContent) {
    if (focus_relevant_supports.focusSvgTabindexAttribute && validTabindex) {
      return true;
    }

    if (focus_relevant_supports.focusSvgFocusableAttribute) {
      // Internet Explorer understands the focusable attribute introduced in SVG Tiny 1.2
      return focusableAttribute === 'true';
    }
  }

  // https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  if (validTabindex) {
    return true;
  }

  const style = window.getComputedStyle(element, null);
  if (isUserModifyWritable(style)) {
    return true;
  }

  if (focus_relevant_supports.focusImgIsmap && nodeName === 'img' && element.hasAttribute('ismap')) {
    // IE10-11 considers the <img> in <a href><img ismap> focusable
    // https://github.com/medialize/ally.js/issues/20
    const hasLinkParent = get_parents({context: element}).some(
      parent => parent.nodeName.toLowerCase() === 'a' && parent.hasAttribute('href')
    );

    if (hasLinkParent) {
      return true;
    }
  }

  // https://github.com/medialize/ally.js/issues/21
  if (!except.scrollable && focus_relevant_supports.focusScrollContainer) {
    if (focus_relevant_supports.focusScrollContainerWithoutOverflow) {
      // Internet Explorer does will consider the scrollable area focusable
      // if the element is a <div> or a <span> and it is in fact scrollable,
      // regardless of the CSS overflow property
      if (isScrollableContainer(element, nodeName)) {
        return true;
      }
    } else if (hasCssOverflowScroll(style)) {
      // Firefox requires proper overflow setting, IE does not necessarily
      // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
      return true;
    }
  }

  if (!except.flexbox && focus_relevant_supports.focusFlexboxContainer && hasCssDisplayFlex(style)) {
    // elements with display:flex are focusable in IE10-11
    return true;
  }

  const parent = element.parentElement;
  if (!except.scrollable && parent) {
    const parentNodeName = parent.nodeName.toLowerCase();
    const parentStyle = window.getComputedStyle(parent, null);
    if (focus_relevant_supports.focusScrollBody && isScrollableContainer(parent, nodeName, parentNodeName, parentStyle)) {
      // scrollable bodies are focusable Internet Explorer
      // https://github.com/medialize/ally.js/issues/21
      return true;
    }

    // Children of focusable elements with display:flex are focusable in IE10-11
    if (focus_relevant_supports.focusChildrenOfFocusableFlexbox) {
      if (hasCssDisplayFlex(parentStyle)) {
        return true;
      }
    }
  }

  // NOTE: elements marked as inert are not focusable,
  // but that property is not exposed to the DOM
  // https://www.w3.org/TR/html5/editing.html#inert

  return false;
}

// bind exceptions to an iterator callback
isFocusRelevantRules.except = function(except = {}) {
  const isFocusRelevant = function(context) {
    return isFocusRelevantRules({
      context,
      except,
    });
  };

  isFocusRelevant.rules = isFocusRelevantRules;
  return isFocusRelevant;
};

// provide isFocusRelevant(context) as default iterator callback
const isFocusRelevant = isFocusRelevantRules.except({});
/* harmony default export */ var focus_relevant = (isFocusRelevant);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/array-find-index.js
function findIndex(array, callback) {
  // attempt to use native or polyfilled Array#findIndex first
  if (array.findIndex) {
    return array.findIndex(callback);
  }

  const length = array.length;

  // shortcut if the array is empty
  if (length === 0) {
    return -1;
  }

  // otherwise loop over array
  for (let i = 0; i < length; i++) {
    if (callback(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/get-content-document.js

/* harmony default export */ function get_content_document(node) {
  try {
    // works on <object> and <iframe>
    return node.contentDocument
      // works on <object> and <iframe>
      || node.contentWindow && node.contentWindow.document
      // works on <object> and <iframe> that contain SVG
      || node.getSVGDocument && node.getSVGDocument()
      || null;
  } catch (e) {
    // SecurityError: Failed to read the 'contentDocument' property from 'HTMLObjectElement'
    // also IE may throw member not found exception e.g. on <object type="image/png">
    return null;
  }
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/get-document.js

/* harmony default export */ function get_document(node) {
  if (!node) {
    return document;
  }

  if (node.nodeType === Node.DOCUMENT_NODE) {
    return node;
  }

  return node.ownerDocument || document;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/get-window.js



/* harmony default export */ function get_window(node) {
  const _document = get_document(node);
  return _document.defaultView || window;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/select-in-shadows.js

// convert a CSS selector so that it also pierces ShadowDOM
// takes ".a, #b" and turns it into ".a, #b, html >>> .a, html >>> #b"



let shadowPrefix;

/* harmony default export */ function select_in_shadows(selector) {
  if (typeof shadowPrefix !== 'string') {
    const operator = css_shadow_piercing_deep_combinator();
    if (operator) {
      shadowPrefix = ', html ' + operator + ' ';
    }
  }

  if (!shadowPrefix) {
    return selector;
  }

  return selector + shadowPrefix + selector.replace(/\s*,\s*/g, ',').split(',').join(shadowPrefix);
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/get-frame-element.js





let selector;

function findDocumentHostElement(_window) {
  if (!selector) {
    selector = select_in_shadows('object, iframe');
  }

  if (_window._frameElement !== undefined) {
    return _window._frameElement;
  }

  _window._frameElement = null;

  const potentialHosts = _window.parent.document.querySelectorAll(selector);
  [].some.call(potentialHosts, function(element) {
    const _document = get_content_document(element);
    if (_document !== _window.document) {
      return false;
    }

    _window._frameElement = element;
    return true;
  });

  return _window._frameElement;
}

function getFrameElement(element) {
  const _window = get_window(element);
  if (!_window.parent || _window.parent === _window) {
    // if there is no parent browsing context,
    // we're not going to get a frameElement either way
    return null;
  }

  try {
    // see https://developer.mozilla.org/en-US/docs/Web/API/Window/frameElement
    // does not work within <embed> anywhere, and not within in <object> in IE
    return _window.frameElement || findDocumentHostElement(_window);
  } catch (e) {
    return null;
  }
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/visible.js

// determine if an element is rendered
// NOTE: that does not mean an element is visible in the viewport, see util/visible-area






// https://www.w3.org/TR/html5/rendering.html#being-rendered
// <area> is not rendered, but we *consider* it visible to simplfiy this function's usage
const notRenderedElementsPattern = /^(area)$/;

function computedStyle(element, property) {
  return window.getComputedStyle(element, null)
    .getPropertyValue(property);
}

function notDisplayed(_path) {
  return _path.some(function(element) {
    // display:none is not visible (optimized away at layout)
    return computedStyle(element, 'display') === 'none';
  });
}

function notVisible(_path) {
  // https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L109-L114
  // NOTE: a nested element can reverse visibility:hidden|collapse by explicitly setting visibility:visible
  // NOTE: visibility can be ["", "visible", "hidden", "collapse"]
  const hidden = findIndex(_path, function(element) {
    const visibility = computedStyle(element, 'visibility');
    return visibility === 'hidden' || visibility === 'collapse';
  });

  if (hidden === -1) {
    // there is no hidden element
    return false;
  }

  const visible = findIndex(_path, function(element) {
    return computedStyle(element, 'visibility') === 'visible';
  });

  if (visible === -1) {
    // there is no visible element (but a hidden element)
    return true;
  }

  if (hidden < visible) {
    // there is a hidden element and it's closer than the first visible element
    return true;
  }

  // there may be a hidden element, but the closest element is visible
  return false;
}

function collapsedParent(_path) {
  let offset = 1;
  if (_path[0].nodeName.toLowerCase() === 'summary') {
    offset = 2;
  }

  return _path.slice(offset).some(function(element) {
    // "content children" of a closed details element are not visible
    return element.nodeName.toLowerCase() === 'details' && element.open === false;
  });
}

function isVisibleRules({
  context,
  except = {
    notRendered: false,
    cssDisplay: false,
    cssVisibility: false,
    detailsElement: false,
    browsingContext: false,
  },
} = {}) {
  const element = context_to_element({
    label: 'is/visible',
    resolveDocument: true,
    context,
  });

  const nodeName = element.nodeName.toLowerCase();
  if (!except.notRendered && notRenderedElementsPattern.test(nodeName)) {
    return true;
  }

  const _path = get_parents({context: element});

  // in Internet Explorer <audio> has a default display: none, where others have display: inline
  // but IE allows focusing <audio style="display:none">, but not <div display:none><audio>
  // this is irrelevant to other browsers, as the controls attribute is required to make <audio> focusable
  const isAudioWithoutControls = nodeName === 'audio' && !element.hasAttribute('controls');
  if (!except.cssDisplay && notDisplayed(isAudioWithoutControls ? _path.slice(1) : _path)) {
    return false;
  }

  if (!except.cssVisibility && notVisible(_path)) {
    return false;
  }

  if (!except.detailsElement && collapsedParent(_path)) {
    return false;
  }

  if (!except.browsingContext) {
    // elements within a browsing context are affected by the
    // browsing context host element's visibility and tabindex
    const frameElement = getFrameElement(element);
    const _isVisible = isVisibleRules.except(except);
    if (frameElement && !_isVisible(frameElement)) {
      return false;
    }
  }

  return true;
}

// bind exceptions to an iterator callback
isVisibleRules.except = function(except = {}) {
  const isVisible = function(context) {
    return isVisibleRules({
      context,
      except,
    });
  };

  isVisible.rules = isVisibleRules;
  return isVisible;
};

// provide isVisible(context) as default iterator callback
const isVisible = isVisibleRules.except({});
/* harmony default export */ var visible = (isVisible);

// EXTERNAL MODULE: ./node_modules/css.escape/css.escape.js
var css_escape = __webpack_require__(8269);
var css_escape_default = /*#__PURE__*/__webpack_require__.n(css_escape);
;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/image-map.js




function getMapByName(name, _document) {
  // apparently getElementsByName() also considers id attribute in IE & opera
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName
  const map = _document.querySelector('map[name="' + cssEscape(name) + '"]');
  return map || null;
}

function getMapOfImage(element) {
  const usemap = element.getAttribute('usemap');
  if (!usemap) {
    return null;
  }

  const _document = getDocument(element);
  return getMapByName(usemap.slice(1), _document);
}

function getImageOfArea(element) {
  const map = element.parentElement;

  if (!map.name || map.nodeName.toLowerCase() !== 'map') {
    return null;
  }

  // NOTE: image maps can also be applied to <object> with image content,
  // but no browser supports this at the moment

  // HTML5 specifies HTMLMapElement.images to be an HTMLCollection of all
  // <img> and <object> referencing the <map> element, but no browser implements this
  //   https://www.w3.org/TR/html5/embedded-content-0.html#the-map-element
  //   https://developer.mozilla.org/en-US/docs/Web/API/HTMLMapElement
  // the image must be valid and loaded for the map to take effect
  const _document = get_document(element);
  return _document.querySelector('img[usemap="#' + css_escape_default()(map.name) + '"]') || null;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/valid-area.js

// determine if an <area> element is being properly used by and <img> via a <map>







let valid_area_supports;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
// https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L88-L107
/* harmony default export */ function valid_area(context) {
  if (!valid_area_supports) {
    valid_area_supports = supports();
  }

  const element = context_to_element({
    label: 'is/valid-area',
    context,
  });

  const nodeName = element.nodeName.toLowerCase();
  if (nodeName !== 'area') {
    return false;
  }

  const hasTabindex = element.hasAttribute('tabindex');
  if (!valid_area_supports.focusAreaTabindex && hasTabindex) {
    // Blink and WebKit do not consider <area tabindex="-1" href="#void"> focusable
    return false;
  }

  const img = getImageOfArea(element);
  if (!img || !visible(img)) {
    return false;
  }

  // Firefox only allows fully loaded images to reference image maps
  // https://stereochro.me/ideas/detecting-broken-images-js
  if (!valid_area_supports.focusBrokenImageMap && (!img.complete || !img.naturalHeight || img.offsetWidth <= 0 || img.offsetHeight <= 0)) {
    return false;
  }

  // Firefox supports.can focus area elements even if they don't have an href attribute
  if (!valid_area_supports.focusAreaWithoutHref && !element.href) {
    // Internet explorer supports.can focus area elements without href if either
    // the area element or the image element has a tabindex attribute
    return valid_area_supports.focusAreaTabindex && hasTabindex || valid_area_supports.focusAreaImgTabindex && img.hasAttribute('tabindex');
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
  const childOfInteractive = get_parents({context: img}).slice(1).some(function(_element) {
    const name = _element.nodeName.toLowerCase();
    return name === 'button' || name === 'a';
  });

  if (childOfInteractive) {
    return false;
  }

  return true;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/native-disabled-supported.js

// Determine if an element supports the disabled attribute



let native_disabled_supported_supports;

// https://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
let disabledElementsPattern;
const disabledElements = {
  input: true,
  select: true,
  textarea: true,
  button: true,
  fieldset: true,
  form: true,
};

/* harmony default export */ function native_disabled_supported(context) {
  if (!native_disabled_supported_supports) {
    native_disabled_supported_supports = supports();

    if (native_disabled_supported_supports.focusFieldsetDisabled) {
      delete disabledElements.fieldset;
    }

    if (native_disabled_supported_supports.focusFormDisabled) {
      delete disabledElements.form;
    }

    disabledElementsPattern = new RegExp('^(' + Object.keys(disabledElements).join('|') + ')$');
  }

  const element = context_to_element({
    label: 'is/native-disabled-supported',
    context,
  });

  const nodeName = element.nodeName.toLowerCase();
  return Boolean(disabledElementsPattern.test(nodeName));
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/disabled.js

// Determine if an element is disabled (i.e. not editable)






let disabled_supports;

function isDisabledFieldset(element) {
  const nodeName = element.nodeName.toLowerCase();
  return nodeName === 'fieldset' && element.disabled;
}

function isDisabledForm(element) {
  const nodeName = element.nodeName.toLowerCase();
  return nodeName === 'form' && element.disabled;
}

/* harmony default export */ function disabled(context) {
  if (!disabled_supports) {
    disabled_supports = supports();
  }

  const element = context_to_element({
    label: 'is/disabled',
    context,
  });

  if (element.hasAttribute('data-ally-disabled')) {
    // treat ally's element/disabled like the DOM native element.disabled
    return true;
  }

  if (!native_disabled_supported(element)) {
    // non-form elements do not support the disabled attribute
    return false;
  }

  if (element.disabled) {
    // the element itself is disabled
    return true;
  }

  const parents = get_parents({context: element});
  if (parents.some(isDisabledFieldset)) {
    // a parental <fieldset> is disabld and inherits the state onto this element
    return true;
  }

  if (!disabled_supports.focusFormDisabled && parents.some(isDisabledForm)) {
    // a parental <form> is disabld and inherits the state onto this element
    return true;
  }

  return false;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/only-tabbable.js







function isOnlyTabbableRules({
  context,
  except = {
    onlyFocusableBrowsingContext: false,
    visible: false,
  },
} = {}) {
  const element = context_to_element({
    label: 'is/only-tabbable',
    resolveDocument: true,
    context,
  });

  if (!except.visible && !visible(element)) {
    return false;
  }

  if (!except.onlyFocusableBrowsingContext && (util_platform.is.GECKO || util_platform.is.TRIDENT || util_platform.is.EDGE)) {
    const frameElement = getFrameElement(element);
    if (frameElement) {
      if (tabindex_value(frameElement) < 0) {
        // iframe[tabindex="-1"] and object[tabindex="-1"] inherit the
        // tabbable demotion onto elements of their browsing contexts
        return false;
      }
    }
  }

  const nodeName = element.nodeName.toLowerCase();
  const tabindex = tabindex_value(element);

  if (nodeName === 'label' && util_platform.is.GECKO) {
    // Firefox cannot focus, but tab to: label[tabindex=0]
    return tabindex !== null && tabindex >= 0;
  }

  // SVG Elements were keyboard focusable but not script focusable before Firefox 51.
  // Firefox 51 added the focus management DOM API (.focus and .blur) to SVGElement,
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=778654
  if (util_platform.is.GECKO && element.ownerSVGElement && !element.focus) {
    if (nodeName === 'a' && element.hasAttribute('xlink:href')) {
      // any focusable child of <svg> cannot be focused, but tabbed to
      if (util_platform.is.GECKO) {
        return true;
      }
    }
  }

  return false;
}

// bind exceptions to an iterator callback
isOnlyTabbableRules.except = function(except = {}) {
  const isOnlyTabbable = function(context) {
    return isOnlyTabbableRules({
      context,
      except,
    });
  };

  isOnlyTabbable.rules = isOnlyTabbableRules;
  return isOnlyTabbable;
};

// provide isOnlyTabbable(context) as default iterator callback
const isOnlyTabbable = isOnlyTabbableRules.except({});
/* harmony default export */ var only_tabbable = (isOnlyTabbable);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/focusable.js

// determine if an element can be focused

// https://www.w3.org/TR/html5/editing.html#focus-management

// NOTE: The following known issues exist:
//   Gecko: `svg a[xlink|href]` is not identified as focusable (because SVGElement.prototype.focus is missing)
//   Blink, WebKit: SVGElements that have been made focusable by adding a focus event listener are not identified as focusable











let focusable_supports;

function isOnlyFocusRelevant(element) {
  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'embed' || nodeName === 'keygen') {
    // embed is considered focus-relevant but not focusable
    // see https://github.com/medialize/ally.js/issues/82
    return true;
  }

  const _tabindex = tabindex_value(element);
  if (element.shadowRoot && _tabindex === null) {
    // ShadowDOM host elements *may* receive focus
    // even though they are not considered focuable
    return true;
  }

  if (nodeName === 'label') {
    // <label tabindex="0"> is only tabbable in Firefox, not script-focusable
    // there's no way to make an element focusable other than by adding a tabindex,
    // and focus behavior of the label element seems hard-wired to ignore tabindex
    // in some browsers (like Gecko, Blink and WebKit)
    return !focusable_supports.focusLabelTabindex || _tabindex === null;
  }

  if (nodeName === 'legend') {
    return _tabindex === null;
  }

  if (focusable_supports.focusSvgFocusableAttribute && (element.ownerSVGElement || nodeName === 'svg')) {
    // Internet Explorer understands the focusable attribute introduced in SVG Tiny 1.2
    const focusableAttribute = element.getAttribute('focusable');
    return focusableAttribute && focusableAttribute === 'false';
  }

  if (nodeName === 'img' && element.hasAttribute('usemap')) {
    // Gecko, Trident and Edge do not allow an image with an image map and tabindex to be focused,
    // it appears the tabindex is overruled so focus is still forwarded to the <map>
    return _tabindex === null || !focusable_supports.focusImgUsemapTabindex;
  }

  if (nodeName === 'area') {
    // all <area>s are considered relevant,
    // but only the valid <area>s are focusable
    return !valid_area(element);
  }

  return false;
}

function isFocusableRules({
  context,
  except = {
    disabled: false,
    visible: false,
    onlyTabbable: false,
  },
} = {}) {
  if (!focusable_supports) {
    focusable_supports = supports();
  }

  const _isOnlyTabbable = only_tabbable.rules.except({
    onlyFocusableBrowsingContext: true,
    visible: except.visible,
  });

  const element = context_to_element({
    label: 'is/focusable',
    resolveDocument: true,
    context,
  });

  const focusRelevant = focus_relevant.rules({
    context: element,
    except,
  });

  if (!focusRelevant || isOnlyFocusRelevant(element)) {
    return false;
  }

  if (!except.disabled && disabled(element)) {
    return false;
  }

  if (!except.onlyTabbable && _isOnlyTabbable(element)) {
    // some elements may be keyboard focusable, but not script focusable
    return false;
  }

  // elements that are not rendered, cannot be focused
  if (!except.visible) {
    const visibilityOptions = {
      context: element,
      except: {},
    };

    if (focusable_supports.focusInHiddenIframe) {
      // WebKit and Blink can focus content in hidden <iframe> and <object>
      visibilityOptions.except.browsingContext = true;
    }

    if (focusable_supports.focusObjectSvgHidden) {
      // Blink allows focusing the object element, even if it has visibility: hidden;
      // @browser-issue Blink https://code.google.com/p/chromium/issues/detail?id=586191
      const nodeName = element.nodeName.toLowerCase();
      if (nodeName === 'object') {
        visibilityOptions.except.cssVisibility = true;
      }
    }

    if (!visible.rules(visibilityOptions)) {
      return false;
    }
  }

  const frameElement = getFrameElement(element);
  if (frameElement) {
    const _nodeName = frameElement.nodeName.toLowerCase();
    if (_nodeName === 'object' && !focusable_supports.focusInZeroDimensionObject) {
      if (!frameElement.offsetWidth || !frameElement.offsetHeight) {
        // WebKit can not focus content in <object> if it doesn't have dimensions
        return false;
      }
    }
  }

  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'svg' && focusable_supports.focusSvgInIframe && !frameElement && element.getAttribute('tabindex') === null) {
    return false;
  }

  return true;
}

// bind exceptions to an iterator callback
isFocusableRules.except = function(except = {}) {
  const isFocusable = function(context) {
    return isFocusableRules({
      context,
      except,
    });
  };

  isFocusable.rules = isFocusableRules;
  return isFocusable;
};

// provide isFocusRelevant(context) as default iterator callback
const isFocusable = isFocusableRules.except({});
/* harmony default export */ var focusable = (isFocusable);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/query/focusable.strict.js

// https://www.w3.org/TR/html5/editing.html#focusable
// https://www.w3.org/WAI/PF/aria-practices/#keyboard





function createFilter(condition) {
  // see https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  const filter = function(node) {
    if (node.shadowRoot) {
      // return ShadowRoot elements regardless of them being focusable,
      // so they can be walked recursively later
      return NodeFilter.FILTER_ACCEPT;
    }

    if (condition(node)) {
      // finds elements that could have been found by document.querySelectorAll()
      return NodeFilter.FILTER_ACCEPT;
    }

    return NodeFilter.FILTER_SKIP;
  };
  // IE requires a function, Browsers require {acceptNode: function}
  // see http://www.bennadel.com/blog/2607-finding-html-comment-nodes-in-the-dom-using-treewalker.htm
  filter.acceptNode = filter;
  return filter;
}

const PossiblyFocusableFilter = createFilter(focus_relevant);

function queryFocusableStrict({
  context,
  includeContext,
  includeOnlyTabbable,
  strategy,
} = {}) {
  if (!context) {
    context = document.documentElement;
  }

  const _isFocusable = focusable.rules.except({
    onlyTabbable: includeOnlyTabbable,
  });

  const _document = get_document(context);
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const walker = _document.createTreeWalker(
    // root element to start search in
    context,
    // element type filter
    NodeFilter.SHOW_ELEMENT,
    // custom NodeFilter filter
    strategy === 'all' ? PossiblyFocusableFilter : createFilter(_isFocusable),
    // deprecated, but IE requires it
    false
  );

  let list = [];

  while (walker.nextNode()) {
    if (walker.currentNode.shadowRoot) {
      if (_isFocusable(walker.currentNode)) {
        list.push(walker.currentNode);
      }

      list = list.concat(queryFocusableStrict({
        context: walker.currentNode.shadowRoot,
        includeOnlyTabbable,
        strategy,
      }));
    } else {
      list.push(walker.currentNode);
    }
  }

  // add context if requested and focusable
  if (includeContext) {
    if (strategy === 'all') {
      if (focus_relevant(context)) {
        list.unshift(context);
      }
    } else if (_isFocusable(context)) {
      list.unshift(context);
    }
  }

  return list;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/selector/focusable.js
// NOTE: this selector MUST *never* be used directly,
// always go through query/focusable or is/focusable.js
// there are too many edge cases that they could be covered in
// a simple CSS selector…




let selector_focusable_supports;

let focusable_selector;

/* harmony default export */ function selector_focusable() {
  if (!selector_focusable_supports) {
    selector_focusable_supports = supports();
  }

  if (typeof focusable_selector === 'string') {
    return focusable_selector;
  }

  // https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  focusable_selector = ''
    // IE11 supports.can focus <table> and <td>
    + (selector_focusable_supports.focusTable ? 'table, td,' : '')
    // IE11 supports.can focus <fieldset>
    + (selector_focusable_supports.focusFieldset ? 'fieldset,' : '')
    // Namespace problems of [xlink:href] explained in https://stackoverflow.com/a/23047888/515124
    // svg a[*|href] does not match in IE9, but since we're filtering
    // through is/focusable we can include all <a> from SVG
    + 'svg a,'
    // may behave as 'svg, svg *,' in chrome as *every* svg element with a focus event listener is focusable
    // navigational elements
    + 'a[href],'
    // validity determined by is/valid-area.js
    + 'area[href],'
    // validity determined by is/disabled.js
    + 'input, select, textarea, button,'
    // browsing context containers
    + 'iframe, object, embed,'
    // interactive content
    + 'keygen,'
    + (selector_focusable_supports.focusAudioWithoutControls ? 'audio,' : 'audio[controls],')
    + (selector_focusable_supports.focusVideoWithoutControls ? 'video,' : 'video[controls],')
    + (selector_focusable_supports.focusSummary ? 'summary,' : '')
    // validity determined by is/valid-tabindex.js
    + '[tabindex],'
    // editing hosts
    + '[contenteditable]';

  // where ShadowDOM is supported, we also want the shadowed focusable elements (via ">>>" or "/deep/")
  focusable_selector = select_in_shadows(focusable_selector);

  return focusable_selector;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/query/focusable.quick.js

// https://www.w3.org/TR/html5/editing.html#focusable
// https://www.w3.org/WAI/PF/aria-practices/#keyboard




function queryFocusableQuick({
  context,
  includeContext,
  includeOnlyTabbable,
} = {}) {
  const _selector = selector_focusable();
  const elements = context.querySelectorAll(_selector);
  // the selector potentially matches more than really is focusable

  const _isFocusable = focusable.rules.except({
    onlyTabbable: includeOnlyTabbable,
  });

  const result = [].filter.call(elements, _isFocusable);

  // add context if requested and focusable
  if (includeContext && _isFocusable(context)) {
    result.unshift(context);
  }

  return result;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/query/focusable.js

// https://www.w3.org/TR/html5/editing.html#focusable
// https://www.w3.org/WAI/PF/aria-practices/#keyboard





/* harmony default export */ function query_focusable({
  context,
  includeContext,
  includeOnlyTabbable,
  strategy = 'quick',
} = {}) {
  const element = context_to_element({
    label: 'query/focusable',
    resolveDocument: true,
    defaultToDocument: true,
    context,
  });

  const options = {
    context: element,
    includeContext,
    includeOnlyTabbable,
    strategy,
  };

  if (strategy === 'quick') {
    return queryFocusableQuick(options);
  } else if (strategy === 'strict' || strategy === 'all') {
    return queryFocusableStrict(options);
  }

  throw new TypeError('query/focusable requires option.strategy to be one of ["quick", "strict", "all"]');
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/toggle-attribute.js

// helper to turn
//  <div some-attribute="original">
// into
//  <div data-cached-some-attribute="original">
// and back

/* harmony default export */ function toggle_attribute({element, attribute}) {
  const temporaryAttribute = 'data-cached-' + attribute;
  const temporaryAttributeValue = element.getAttribute(temporaryAttribute);

  if (temporaryAttributeValue === null) {
    const _value = element.getAttribute(attribute);
    if (_value === null) {
      // can't remove what's not there
      return;
    }

    element.setAttribute(temporaryAttribute, _value || '');
    element.removeAttribute(attribute);
  } else {
    const _value = element.getAttribute(temporaryAttribute);
    element.removeAttribute(temporaryAttribute);
    element.setAttribute(attribute, _value);
  }
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/toggle-attribute-value.js

// helper to turn
//  <div some-attribute="original">
// into
//  <div some-attribute="new" data-cached-some-attribute="original">
// and back

/* harmony default export */ function toggle_attribute_value({element, attribute, temporaryValue, saveValue}) {
  const temporaryAttribute = 'data-cached-' + attribute;

  if (temporaryValue !== undefined) {
    const _value = saveValue || element.getAttribute(attribute);
    element.setAttribute(temporaryAttribute, _value || '');
    element.setAttribute(attribute, temporaryValue);
  } else {
    const _value = element.getAttribute(temporaryAttribute);
    element.removeAttribute(temporaryAttribute);
    if (_value === '') {
      element.removeAttribute(attribute);
    } else {
      element.setAttribute(attribute, _value);
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/logger.js

const noop = function() {};
const _console = {
  log: noop,
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
};

/* harmony default export */ var logger = (typeof console !== 'undefined' ? console : _console);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/element/disabled.js

/*
  Utility to make any element inert (disabled). Inert means the elements cannot be interacted
  with and they cannot be focused via script, pointer or keyboard - and thus not receive focus.

  Elements made inert (disabled) by this utility are given the attribute [data-ally-disabled="true"].

  ---------------

  inert attribute was [removed](https://html5.org/r/8536) [tweet by steve](https://twitter.com/stevefaulkner/status/443075900201259008)
  but definition of [inert subtrees](https://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) remains.

  [implementation idea by Vasilis](https://codepen.io/vasilisvg/pen/scowI)
  [inert attribute polyfill by GoogleChrome](https://github.com/GoogleChrome/inert-polyfill)

  [Gecko Bug: Inert Attribute](https://bugzilla.mozilla.org/show_bug.cgi?id=921504)
  [Chromium Bug: Inert Attribute](https://code.google.com/p/chromium/issues/detail?id=269846)
  [Chromium Bug: Inert Subtree](https://code.google.com/p/chromium/issues/detail?id=241699)
  [WebKit Bug: Inert Subtree](https://bugs.webkit.org/show_bug.cgi?id=110952)
*/









let element_disabled_supports;

function disabledFocus() {
  logger.warn('trying to focus inert element', this);
}

function disableTabindex(element, disabledState) {
  if (disabledState) {
    const tabIndex = tabindex_value(element);
    toggle_attribute_value({
      element,
      attribute: 'tabindex',
      temporaryValue: '-1',
      saveValue: tabIndex !== null ? tabIndex : '',
    });
  } else {
    toggle_attribute_value({
      element,
      attribute: 'tabindex',
    });
  }
}

function disableVideoControls(element, disabledState) {
  toggle_attribute({
    element,
    attribute: 'controls',
    remove: disabledState,
  });
}

function disableSvgFocusable(element, disabledState) {
  toggle_attribute_value({
    element,
    attribute: 'focusable',
    temporaryValue: disabledState ? 'false' : undefined,
  });
}

function disableSvgLink(element, disabledState) {
  toggle_attribute({
    element,
    attribute: 'xlink:href',
    remove: disabledState,
  });
}

function setAriaDisabled(element, disabledState) {
  toggle_attribute_value({
    element,
    attribute: 'aria-disabled',
    temporaryValue: disabledState ? 'true' : undefined,
  });
}

function disableScriptFocus(element, disabledState) {
  if (disabledState) {
    // make sure no script can focus the element
    element.focus = disabledFocus;
  } else {
    // restore original focus function from prototype
    delete element.focus;
  }
}

function disablePointerEvents(element, disabledState) {
  if (disabledState) {
    // remember previous pointer events status so we can restore it
    const pointerEvents = element.style.pointerEvents || '';
    element.setAttribute('data-inert-pointer-events', pointerEvents);
    // make sure no pointer interaction can access the element
    element.style.pointerEvents = 'none';
  } else {
    // restore to previous pointer interaction status
    const pointerEvents = element.getAttribute('data-inert-pointer-events');
    element.removeAttribute('data-inert-pointer-events');
    element.style.pointerEvents = pointerEvents;
  }
}

function setElementDisabled(element, disabledState) {
  setAriaDisabled(element, disabledState);
  disableTabindex(element, disabledState);
  disableScriptFocus(element, disabledState);
  disablePointerEvents(element, disabledState);

  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'video' || nodeName === 'audio') {
    // Blink and Gecko leave <video controls tabindex="-1"> in document focus navigation sequence
    // Blink leaves <audio controls tabindex="-1"> in document focus navigation sequence
    disableVideoControls(element, disabledState);
  }

  if (nodeName === 'svg' || element.ownerSVGElement) {
    if (element_disabled_supports.focusSvgFocusableAttribute) {
      // Internet Explorer knows focusable="false" instead of tabindex="-1"
      disableSvgFocusable(element, disabledState);
    } else if (!element_disabled_supports.focusSvgTabindexAttribute && nodeName === 'a') {
      // Firefox neither knows focusable="false" nor tabindex="-1"
      disableSvgLink(element, disabledState);
    }
  }

  if (disabledState) {
    element.setAttribute('data-ally-disabled', 'true');
  } else {
    element.removeAttribute('data-ally-disabled');
  }
}

/* harmony default export */ function element_disabled(context, disabledState) {
  if (!element_disabled_supports) {
    element_disabled_supports = supports();
  }

  const element = context_to_element({
    label: 'element/disabled',
    context,
  });

  // accept truthy/falsy values
  disabledState = Boolean(disabledState);
  const currentState = element.hasAttribute('data-ally-disabled');
  // if there's no value to set, we're running as a getter
  const runningAsGetter = arguments.length === 1;

  if (native_disabled_supported(element)) {
    if (runningAsGetter) {
      return element.disabled;
    }

    // form elements know the disabled attribute, which we shall use instead of our poor man's copy of it
    element.disabled = disabledState;
    return element;
  }

  if (runningAsGetter) {
    return currentState;
  }

  if (currentState === disabledState) {
    // no update necessary
    return element;
  }

  setElementDisabled(element, disabledState);
  return element;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/query/shadow-hosts.js




// see https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
const filter = function(node) {
  if (node.shadowRoot) {
    return NodeFilter.FILTER_ACCEPT;
  }

  return NodeFilter.FILTER_SKIP;
};
// IE requires a function, Browsers require {acceptNode: function}
// see http://www.bennadel.com/blog/2607-finding-html-comment-nodes-in-the-dom-using-treewalker.htm
filter.acceptNode = filter;

function queryShadowHosts({ context } = {}) {
  const element = context_to_element({
    label: 'query/shadow-hosts',
    resolveDocument: true,
    defaultToDocument: true,
    context,
  });

  const _document = get_document(context);
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const walker = _document.createTreeWalker(
    // root element to start search in
    element,
    // element type filter
    NodeFilter.SHOW_ELEMENT,
    // custom NodeFilter filter
    filter,
    // deprecated, but IE requires it
    false
  );

  let list = [];

  if (element.shadowRoot) {
    // TreeWalker does not run the filter on the context element
    list.push(element);
    list = list.concat(queryShadowHosts({
      context: element.shadowRoot,
    }));
  }

  while (walker.nextNode()) {
    list.push(walker.currentNode);
    list = list.concat(queryShadowHosts({
      context: walker.currentNode.shadowRoot,
    }));
  }

  return list;
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/observe/shadow-mutations.js





const shadowObserverConfig = {
  childList: true,
  subtree: true,
};

class ShadowMutationObserver {
  constructor({context, callback, config} = {}) {
    this.config = config;

    this.disengage = this.disengage.bind(this);

    this.clientObserver = new MutationObserver(callback);
    this.hostObserver = new MutationObserver(mutations => mutations.forEach(this.handleHostMutation, this));

    this.observeContext(context);
    this.observeShadowHosts(context);
  }

  disengage() {
    this.clientObserver && this.clientObserver.disconnect();
    this.clientObserver = null;
    this.hostObserver && this.hostObserver.disconnect();
    this.hostObserver = null;
  }

  observeShadowHosts(context) {
    const hosts = queryShadowHosts({
      context,
    });

    hosts.forEach(element => this.observeContext(element.shadowRoot));
  }

  observeContext(context) {
    this.clientObserver.observe(context, this.config);
    this.hostObserver.observe(context, shadowObserverConfig);
  }

  handleHostMutation(mutation) {
    if (mutation.type !== 'childList') {
      return;
    }

    const addedElements = (0,node_array/* default */.Z)(mutation.addedNodes).filter(element => element.nodeType === Node.ELEMENT_NODE);
    addedElements.forEach(this.observeShadowHosts, this);
  }
}

/* harmony default export */ function shadow_mutations({
  context,
  callback,
  config,
} = {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('observe/shadow-mutations requires options.callback to be a function');
  }

  if (typeof config !== 'object') {
    throw new TypeError('observe/shadow-mutations requires options.config to be an object');
  }

  if (!window.MutationObserver) {
    // not supporting IE10 via Mutation Events, because they're too expensive
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
    return {
      disengage: function() {},
    };
  }

  const element = context_to_element({
    label: 'observe/shadow-mutations',
    resolveDocument: true,
    defaultToDocument: true,
    context,
  });

  const service = new ShadowMutationObserver({
    context: element,
    callback,
    config,
  });

  return {
    disengage: service.disengage,
  };
}

// EXTERNAL MODULE: ./node_modules/ally.js/src/util/compare-position.js
var compare_position = __webpack_require__(48093);
;// CONCATENATED MODULE: ./node_modules/ally.js/src/maintain/disabled.js

/*
  Utility to make a sub-tree of the DOM inert. Inert means the elements cannot be interacted
  with and they cannot be focused via script, pointer or keyboard.

  inert attribute was [removed](https://html5.org/r/8536) [tweet by steve](https://twitter.com/stevefaulkner/status/443075900201259008)
  but definition of [inert subtrees](https://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) remains.

  [implementation idea by Vasilis](https://codepen.io/vasilisvg/pen/scowI)
  [inert attribute polyfill by GoogleChrome](https://github.com/GoogleChrome/inert-polyfill)

  [Gecko Bug: Inert Attribute](https://bugzilla.mozilla.org/show_bug.cgi?id=921504)
  [Chromium Bug: Inert Attribute](https://code.google.com/p/chromium/issues/detail?id=269846)
  [Chromium Bug: Inert Subtree](https://code.google.com/p/chromium/issues/detail?id=241699)
  [WebKit Bug: Inert Subtree](https://bugs.webkit.org/show_bug.cgi?id=110952)
*/







function makeElementInert(element) {
  return element_disabled(element, true);
}

function undoElementInert(element) {
  return element_disabled(element, false);
}

const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['tabindex', 'disabled', 'data-ally-disabled'],
};

class InertSubtree {
  constructor({context, filter} = {}) {
    this._context = (0,node_array/* default */.Z)(context || document.documentElement)[0];
    this._filter = (0,node_array/* default */.Z)(filter);
    this._inertElementCache = [];

    this.disengage = this.disengage.bind(this);
    this.handleMutation = this.handleMutation.bind(this);
    this.renderInert = this.renderInert.bind(this);
    this.filterElements = this.filterElements.bind(this);
    this.filterParentElements = this.filterParentElements.bind(this);

    const focusable = query_focusable({
      context: this._context,
      includeContext: true,
      strategy: 'all',
    });

    this.renderInert(focusable);

    this.shadowObserver = shadow_mutations({
      context: this._context,
      config: observerConfig,
      callback: mutations => mutations.forEach(this.handleMutation),
    });
  }

  disengage() {
    if (!this._context) {
      return;
    }

    undoElementInert(this._context);
    this._inertElementCache.forEach((element) => undoElementInert(element));

    this._inertElementCache = null;
    this._filter = null;
    this._context = null;
    this.shadowObserver && this.shadowObserver.disengage();
    this.shadowObserver = null;
  }

  listQueryFocusable(list) {
    return list
      // find all focusable elements within the given contexts
      .map(element => query_focusable({context: element, includeContext: true, strategy: 'all'}))
      // flatten nested arrays
      .reduce((previous, current) => previous.concat(current), []);
  }

  renderInert(elements) {
    const makeInert = (element) => {
      this._inertElementCache.push(element);
      makeElementInert(element);
    };

    elements
      .filter(this.filterElements)
      .filter(this.filterParentElements)
      // ignore elements that already are disabled
      // so we don't enable them on disengage()
      .filter(element => !element_disabled(element))
      .forEach(makeInert);
  }

  filterElements(element) {
    // ignore elements within the exempted sub-trees
    const isParentOfElement = (0,compare_position/* getParentComparator */.f)({element, includeSelf: true});
    return !this._filter.some(isParentOfElement);
  }

  filterParentElements(element) {
    // ignore ancestors of the exempted sub-trees
    const isParentOfElement = (0,compare_position/* getParentComparator */.f)({parent: element});
    return !this._filter.some(isParentOfElement);
  }

  handleMutation(mutation) {
    if (mutation.type === 'childList') {
      const addedElements = (0,node_array/* default */.Z)(mutation.addedNodes).filter(element => element.nodeType === Node.ELEMENT_NODE);
      if (!addedElements.length) {
        return;
      }

      const addedFocusableElements = this.listQueryFocusable(addedElements);
      this.renderInert(addedFocusableElements);
    } else if (mutation.type === 'attributes') {
      this.renderInert([mutation.target]);
    }
  }
}

/* harmony default export */ function maintain_disabled({context, filter} = {}) {
  const service = new InertSubtree({context, filter});
  return { disengage: service.disengage };
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/get/insignificant-branches.js

// find all highest elements within context that do not contain any of the filter elements.
// (basically the tree minus the parent paths of each filtered element reduced to the top most nodes)
// originally inspired by Marcy Sutton's Material Dialog Component:
// https://github.com/angular/material/blob/v0.11.1/src/components/dialog/dialog.js#L748-L783
// to avoid this behavior: https://marcysutton.com/slides/mobile-a11y-seattlejs/#/36






function queryInsignificantBranches({context, filter}) {
  const containsFilteredElement = function(node) {
    const containsNode = (0,compare_position/* getParentComparator */.f)({parent: node});
    return filter.some(containsNode);
  };

  // We'd use a Set() for this, if we could
  const insiginificantBranches = [];

  // see https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  const CollectInsignificantBranchesFilter = function(node) {
    if (filter.some(element => node === element)) {
      // we've hit a filtered element and can ignore its children
      return NodeFilter.FILTER_REJECT;
    }

    if (containsFilteredElement(node)) {
      // we've hit a significant tree, so we'll have to keep investigating
      return NodeFilter.FILTER_ACCEPT;
    }

    // we've found an insignificant tree
    insiginificantBranches.push(node);
    return NodeFilter.FILTER_REJECT;
  };
  // IE requires a function, Browsers require {acceptNode: function}
  // see https://www.bennadel.com/blog/2607-finding-html-comment-nodes-in-the-dom-using-treewalker.htm
  CollectInsignificantBranchesFilter.acceptNode = CollectInsignificantBranchesFilter;

  const _document = get_document(context);
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const walker = _document.createTreeWalker(
    // root element to start search in
    context,
    // element type filter
    NodeFilter.SHOW_ELEMENT,
    // custom NodeFilter filter
    CollectInsignificantBranchesFilter,
    // deprecated, but IE requires it
    false
  );

  while (walker.nextNode()) {
    // collection things is happening through the filter method
  }

  return insiginificantBranches;
}

/* harmony default export */ function insignificant_branches({context, filter} = {}) {
  context = context_to_element({
    label: 'get/insignificant-branches',
    defaultToDocument: true,
    context,
  });

  filter = (0,node_array/* default */.Z)(filter);
  if (!filter.length) {
    throw new TypeError('get/insignificant-branches requires valid options.filter');
  }

  return queryInsignificantBranches({
    context,
    filter,
  });
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/maintain/hidden.js

// Utility to make the entire DOM aria-hidden="true" except for a given set of elements







function makeElementHidden(element) {
  toggle_attribute_value({
    element,
    attribute: 'aria-hidden',
    temporaryValue: 'true',
  });
}

function undoElementHidden(element) {
  toggle_attribute_value({
    element,
    attribute: 'aria-hidden',
  });
}

const hidden_observerConfig = {
  attributes: false,
  childList: true,
  subtree: true,
};

class HiddenSubtree {
  constructor({context, filter} = {}) {
    this._context = (0,node_array/* default */.Z)(context || document.documentElement)[0];
    this._filter = (0,node_array/* default */.Z)(filter);

    this.disengage = this.disengage.bind(this);
    this.handleMutation = this.handleMutation.bind(this);
    this.isInsignificantBranch = this.isInsignificantBranch.bind(this);

    const insignificantBranches = insignificant_branches({context: this._context, filter: this._filter});
    insignificantBranches.forEach(makeElementHidden);
    this.startObserver();
  }

  disengage() {
    if (!this._context) {
      return;
    }

    [].forEach.call(this._context.querySelectorAll('[data-cached-aria-hidden]'), undoElementHidden);

    this._context = null;
    this._filter = null;
    this._observer && this._observer.disconnect();
    this._observer = null;
  }

  startObserver() {
    if (!window.MutationObserver) {
      // not supporting IE10 via Mutation Events, because they're too expensive
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
      return;
    }
    // http://caniuse.com/#search=mutation
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    this._observer = new MutationObserver(mutations => mutations.forEach(this.handleMutation));
    this._observer.observe(this._context, hidden_observerConfig);
  }

  handleMutation(mutation) {
    if (mutation.type === 'childList') {
      // a new branch cannot contain a filtered element
      // (unless it is moved there, which is an edge-case we'll ignore for now),
      // so anything that is within context,
      // and not within a previously known insignificant branch and not within a filtered element,
      // must be an insignificant branch as well
      (0,node_array/* default */.Z)(mutation.addedNodes)
        .filter(element => element.nodeType === Node.ELEMENT_NODE)
        .filter(this.isInsignificantBranch)
        .forEach(makeElementHidden);
    }
  }

  isInsignificantBranch(element) {
    const parents = get_parents({context: element});
    if (parents.some(_element => _element.getAttribute('aria-hidden') === 'true')) {
      // element is child of a hidden element
      return false;
    }

    const isParentOfElement = (0,compare_position/* getParentComparator */.f)({element});
    if (this._filter.some(isParentOfElement)) {
      // element is a descendant of a filtered element
      return false;
    }

    return true;
  }
}

/* harmony default export */ function maintain_hidden({context, filter} = {}) {
  const service = new HiddenSubtree({context, filter});
  return { disengage: service.disengage };
}

// EXTERNAL MODULE: ./node_modules/ally.js/src/when/key.js + 2 modules
var key = __webpack_require__(87308);
// EXTERNAL MODULE: ./node_modules/ally.js/src/prototype/window.requestanimationframe.js
var window_requestanimationframe = __webpack_require__(57399);
;// CONCATENATED MODULE: ./node_modules/ally.js/src/util/visible-area.js



function getIntersectingRect(one, two) {
  // identify the rectangle that _element and _container overlap in
  const top = Math.max(one.top, two.top);
  const left = Math.max(one.left, two.left);
  // make sure bottom can't be above top, right can't be before left
  const right = Math.max(Math.min(one.right, two.right), left);
  const bottom = Math.max(Math.min(one.bottom, two.bottom), top);
  // return something resembling ClientRect
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: right - left,
    height: bottom - top,
  };
}

function getViewportRect() {
  const width = window.innerWidth || document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
  // return something resembling ClientRect
  return {
    top: 0,
    right: width,
    bottom: height,
    left: 0,
    width: width,
    height: height,
  };
}

function getInnerBoundingClientRect(element) {
  // convenience for the .reduce() in getScrollableParentRect()
  const rect = element.getBoundingClientRect();

  // remove the width of the scrollbar because that
  // area is not really considered visible
  // NOTE: assuming scrollbar is always to the right and bottom
  const scrollbarWidth = element.offsetWidth - element.clientWidth;
  const scrollbarHeight = element.offsetHeight - element.clientHeight;
  // cannot mutate rect because it has readonly properties
  const _rect = {
    top: rect.top,
    left: rect.left,
    right: rect.right - scrollbarWidth,
    bottom: rect.bottom - scrollbarHeight,
    width: rect.width - scrollbarWidth,
    height: rect.height - scrollbarHeight,
    area: 0,
  };

  _rect.area = _rect.width * _rect.height;
  return _rect;
}

function isOverflowingElement(element) {
  const style = window.getComputedStyle(element, null);
  const value = 'visible';
  return style.getPropertyValue('overflow-x') !== value
    && style.getPropertyValue('overflow-y') !== value;
}

function isScrollableElement(element) {
  // an element not scrollable if it doesn't crop its content
  if (!isOverflowingElement(element)) {
    return false;
  }

  // an element is scrollable when it is smaller than its content
  return element.offsetHeight < element.scrollHeight
    || element.offsetWidth < element.scrollWidth;
}

function getScrollableParentRect(element) {
  // get largest possible space constrained by scrolling containers

  // find scrollable parents
  const scrollingContainers = get_parents({context: element}).slice(1).filter(isScrollableElement);

  if (!scrollingContainers.length) {
    // no containers, no joy
    return null;
  }

  // identify the currently visible intersection of all scrolling container parents
  return scrollingContainers.reduce(function(previous, current) {
    const rect = getInnerBoundingClientRect(current);
    const intersection = getIntersectingRect(rect, previous);
    // identify the smallest scrolling container so we know how much space
    // our element can fill at the most - note that this is NOT the area
    // of the intersection, intersection is just abused as a vehicle
    intersection.area = Math.min(rect.area, previous.area);
    return intersection;
  }, getInnerBoundingClientRect(scrollingContainers[0]));
}

/* harmony default export */ function visible_area(element) {
  // dimensions of the element itself
  const _element = element.getBoundingClientRect();
  // dimensions of the viewport
  const _viewport = getViewportRect();
  // we need the area to know how much of the element can be displayed at the most
  _viewport.area = _viewport.width * _viewport.height;

  let _area = _viewport;
  // dimensions of the intersection of all scrollable parents
  const _container = getScrollableParentRect(element);
  if (_container) {
    if (!_container.width || !_container.height) {
      // scrollable containers without dimensions are invisible,
      // meaning that the element is not visible at all
      return 0;
    }

    // dimension the element can currently be rendered in
    _area = getIntersectingRect(_container, _viewport);
    _area.area = _container.area;
  }

  // dimension of the element currently rendered in identified space
  const _visible = getIntersectingRect(_element, _area);
  if (!_visible.width || !_visible.height) {
    // element is not shown within the identified area
    return 0;
  }

  // compare the element's currently visible size to the size it
  // could take up at the most, being either the element's actual
  // size, or the space theroetically made available if all
  // scrollable parents are aligned properly
  const area = _element.width * _element.height;
  const maxArea = Math.min(area, _area.area);
  // Firefox may return sub-pixel bounding client rect
  const visibleArea = Math.round(_visible.width) * Math.round(_visible.height) / maxArea;
  // Edge might not reach 0.5 exactly
  const factor = 10000;
  const roundedVisibleArea = Math.round(visibleArea * factor) / factor;
  // clamp the value at 1
  return Math.min(roundedVisibleArea, 1);
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/when/visible-area.js

/*
  execute a callback once an element became fully visible in the viewport
*/






/* harmony default export */ function when_visible_area({context, callback, area} = {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('when/visible-area requires options.callback to be a function');
  }

  if (typeof area !== 'number') {
    area = 1;
  }

  const element = context_to_element({
    label: 'when/visible-area',
    context,
  });

  let raf;
  let evaluate = null;
  const disengage = function() {
    raf && cancelAnimationFrame(raf);
  };

  const predicate = function() {
    return !visible(element) || visible_area(element) < area || callback(element) === false;
  };

  const checkPredicate = function() {
    if (predicate()) {
      evaluate();
      return;
    }

    disengage();
  };

  evaluate = function() {
    raf = requestAnimationFrame(checkPredicate);
  };

  evaluate();
  return { disengage };
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/is/tabbable.js

// determine if an element can be focused by keyboard (i.e. is part of the document's sequential focus navigation order)












let tabbable_supports;

// Internet Explorer 11 considers fieldset, table, td focusable, but not tabbable
// Internet Explorer 11 considers body to have [tabindex=0], but does not allow tabbing to it
const focusableElementsPattern = /^(fieldset|table|td|body)$/;

function isTabbableRules({
  context,
  except = {
    flexbox: false,
    scrollable: false,
    shadow: false,
    visible: false,
    onlyTabbable: false,
  },
} = {}) {
  if (!tabbable_supports) {
    tabbable_supports = supports();
  }

  const element = context_to_element({
    label: 'is/tabbable',
    resolveDocument: true,
    context,
  });

  if (util_platform.is.BLINK && util_platform.is.ANDROID && util_platform.majorVersion > 42) {
    // External keyboard support worked fine in CHrome 42, but stopped working in Chrome 45.
    // The on-screen keyboard does not provide a way to focus the next input element (like iOS does).
    // That leaves us with no option to advance focus by keyboard, ergo nothing is tabbable (keyboard focusable).
    return false;
  }

  const frameElement = getFrameElement(element);
  if (frameElement) {
    if (util_platform.is.WEBKIT && util_platform.is.IOS) {
      // iOS only does not consider anything from another browsing context keyboard focusable
      return false;
    }

    // iframe[tabindex="-1"] and object[tabindex="-1"] inherit the
    // tabbable demotion onto elements of their browsing contexts
    if (tabindex_value(frameElement) < 0) {
      return false;
    }

    if (!except.visible && (util_platform.is.BLINK || util_platform.is.WEBKIT) && !visible(frameElement)) {
      // Blink and WebKit consider elements in hidden browsing contexts focusable, but not tabbable
      return false;
    }

    // Webkit and Blink don't consider anything in <object> tabbable
    // Blink fixed that fixed in Chrome 54, Opera 41
    const frameNodeName = frameElement.nodeName.toLowerCase();
    if (frameNodeName === 'object') {
      const isFixedBlink = (util_platform.name === 'Chrome' && util_platform.majorVersion >= 54)
        || (util_platform.name === 'Opera' && util_platform.majorVersion >= 41);

      if (util_platform.is.WEBKIT || (util_platform.is.BLINK && !isFixedBlink)) {
        return false;
      }
    }
  }

  const nodeName = element.nodeName.toLowerCase();
  const _tabindex = tabindex_value(element);
  const tabindex = _tabindex === null ? null : _tabindex >= 0;

  if (util_platform.is.EDGE && util_platform.majorVersion >= 14 && frameElement && element.ownerSVGElement && _tabindex < 0) {
    // Edge 14+ considers <a xlink:href="…" tabindex="-1"> keyboard focusable
    // if the element is in a nested browsing context
    return true;
  }

  const hasTabbableTabindexOrNone = tabindex !== false;
  const hasTabbableTabindex = _tabindex !== null && _tabindex >= 0;

  // NOTE: Firefox 31 considers [contenteditable] to have [tabindex=-1], but allows tabbing to it
  // fixed in Firefox 40 the latest - https://bugzilla.mozilla.org/show_bug.cgi?id=1185657
  if (element.hasAttribute('contenteditable')) {
    // tabbing can still be disabled by explicitly providing [tabindex="-1"]
    return hasTabbableTabindexOrNone;
  }

  if (focusableElementsPattern.test(nodeName) && tabindex !== true) {
    return false;
  }

  if (util_platform.is.WEBKIT && util_platform.is.IOS) {
    // iOS only considers a hand full of elements tabbable (keyboard focusable)
    // this holds true even with external keyboards
    let potentiallyTabbable = (nodeName === 'input' && element.type === 'text' || element.type === 'password')
      || nodeName === 'select'
      || nodeName === 'textarea'
      || element.hasAttribute('contenteditable');

    if (!potentiallyTabbable) {
      const style = window.getComputedStyle(element, null);
      potentiallyTabbable = isUserModifyWritable(style);
    }

    if (!potentiallyTabbable) {
      return false;
    }
  }

  if (nodeName === 'use' && _tabindex !== null) {
    if (util_platform.is.BLINK || util_platform.is.WEBKIT && util_platform.majorVersion === 9) {
      // In Chrome and Safari 9 the <use> element is keyboard focusable even for tabindex="-1"
      return true;
    }
  }

  if (elementMatches(element, 'svg a') && element.hasAttribute('xlink:href')) {
    if (hasTabbableTabindexOrNone) {
      // in Trident and Gecko SVGElement does not handle the tabIndex property properly
      return true;
    }

    if (element.focus && !tabbable_supports.focusSvgNegativeTabindexAttribute) {
      // Firefox 51 and 52 treat any natively tabbable SVG element with
      // tabindex="-1" as tabbable and everything else as inert
      // see https://bugzilla.mozilla.org/show_bug.cgi?id=1302340
      return true;
    }
  }

  if (nodeName === 'svg' && tabbable_supports.focusSvgInIframe && hasTabbableTabindexOrNone) {
    return true;
  }

  if (util_platform.is.TRIDENT || util_platform.is.EDGE) {
    if (nodeName === 'svg') {
      if (tabbable_supports.focusSvg) {
        // older Internet Explorers consider <svg> keyboard focusable
        // unless they have focsable="false", but then they wouldn't
        // be focusable and thus not even reach this filter
        return true;
      }

      // elements that have [focusable] are automatically keyboard focusable regardless of the attribute's value
      return element.hasAttribute('focusable') || hasTabbableTabindex;
    }

    if (element.ownerSVGElement) {
      if (tabbable_supports.focusSvgTabindexAttribute && hasTabbableTabindex) {
        return true;
      }

      // elements that have [focusable] are automatically keyboard focusable regardless of the attribute's value
      return element.hasAttribute('focusable');
    }
  }
  if (element.tabIndex === undefined) {
    return Boolean(except.onlyTabbable);
  }

  if (nodeName === 'audio') {
    if (!element.hasAttribute('controls')) {
      // In Internet Explorer the <audio> element is focusable, but not tabbable, and tabIndex property is wrong
      return false;
    } else if (util_platform.is.BLINK) {
      // In Chrome <audio controls tabindex="-1"> remains keyboard focusable
      return true;
    }
  }

  if (nodeName === 'video') {
    if (!element.hasAttribute('controls')) {
      if (util_platform.is.TRIDENT || util_platform.is.EDGE) {
        // In Internet Explorer and Edge the <video> element is focusable, but not tabbable, and tabIndex property is wrong
        return false;
      }
    } else if (util_platform.is.BLINK || util_platform.is.GECKO) {
      // In Chrome and Firefox <video controls tabindex="-1"> remains keyboard focusable
      return true;
    }
  }

  if (nodeName === 'object') {
    if (util_platform.is.BLINK || util_platform.is.WEBKIT) {
      // In all Blink and WebKit based browsers <embed> and <object> are never keyboard focusable, even with tabindex="0" set
      return false;
    }
  }

  if (nodeName === 'iframe') {
    // In Internet Explorer all iframes are only focusable
    // In WebKit, Blink and Gecko iframes may be tabbable depending on content.
    // Since we can't reliably investigate iframe documents because of the
    // SameOriginPolicy, we're declaring everything only focusable.
    return false;
  }

  if (!except.scrollable && util_platform.is.GECKO) {
    // Firefox considers scrollable containers keyboard focusable,
    // even though their tabIndex property is -1
    const style = window.getComputedStyle(element, null);
    if (hasCssOverflowScroll(style)) {
      return hasTabbableTabindexOrNone;
    }
  }

  if (util_platform.is.TRIDENT || util_platform.is.EDGE) {
    // IE and Edge degrade <area> to script focusable, if the image
    // using the <map> has been given tabindex="-1"
    if (nodeName === 'area') {
      const img = getImageOfArea(element);
      if (img && tabindex_value(img) < 0) {
        return false;
      }
    }

    const style = window.getComputedStyle(element, null);
    if (isUserModifyWritable(style)) {
      // prevent being swallowed by the overzealous isScrollableContainer() below
      return element.tabIndex >= 0;
    }

    if (!except.flexbox && hasCssDisplayFlex(style)) {
      if (_tabindex !== null) {
        return hasTabbableTabindex;
      }

      return isFocusRelevantWithoutFlexbox(element) && isTabbableWithoutFlexbox(element);
    }

    // IE considers scrollable containers script focusable only,
    // even though their tabIndex property is 0
    if (isScrollableContainer(element, nodeName)) {
      return false;
    }

    const parent = element.parentElement;
    if (parent) {
      const parentNodeName = parent.nodeName.toLowerCase();
      const parentStyle = window.getComputedStyle(parent, null);
      // IE considers scrollable bodies script focusable only,
      if (isScrollableContainer(parent, nodeName, parentNodeName, parentStyle)) {
        return false;
      }

      // Children of focusable elements with display:flex are focusable in IE10-11,
      // even though their tabIndex property suggests otherwise
      if (hasCssDisplayFlex(parentStyle)) {
        // value of tabindex takes precedence
        return hasTabbableTabindex;
      }
    }
  }

  // https://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
  return element.tabIndex >= 0;
}

// bind exceptions to an iterator callback
isTabbableRules.except = function(except = {}) {
  const isTabbable = function(context) {
    return isTabbableRules({
      context,
      except,
    });
  };

  isTabbable.rules = isTabbableRules;
  return isTabbable;
};

const isFocusRelevantWithoutFlexbox = focus_relevant.rules.except({flexbox: true});
const isTabbableWithoutFlexbox = isTabbableRules.except({flexbox: true});

// provide isTabbable(context) as default iterator callback
const isTabbable = isTabbableRules.except({});
/* harmony default export */ var tabbable = (isTabbable);

;// CONCATENATED MODULE: ./node_modules/ally.js/src/query/tabbable.js

// https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// https://www.w3.org/WAI/PF/aria-practices/#keyboard




/* harmony default export */ function query_tabbable({
  context,
  includeContext,
  includeOnlyTabbable,
  strategy,
} = {}) {
  const _isTabbable = tabbable.rules.except({
    onlyTabbable: includeOnlyTabbable,
  });

  return query_focusable({
    context,
    includeContext,
    includeOnlyTabbable,
    strategy,
  }).filter(_isTabbable);
}

;// CONCATENATED MODULE: ./node_modules/ally.js/src/query/first-tabbable.js

/*
    query/firstTabbable() finds the first suitable element to receive focus in the given context.
    If an element has [autofocus] return that element, otherwise return the first element
    in document order that does *not* have a positive tabIndex (e.g. as [tabindex="1"]),
    otherwise return the context itself, if it is focusable.

    Note: Chrome's <dialog> will focus the first tabbable element, even if it has
    [tabindex="1"]. Since [tabindex="1"] is considered
    bad practice we'll ignore it until someone complains.
 */






function hasAutofocus(element) {
  // [autofocus] actually only works on form element, but who cares?
  return element.hasAttribute('autofocus');
}

function hasNoPositiveTabindex(element) {
  return element.tabIndex <= 0;
}

/* harmony default export */ function first_tabbable({
  context,
  sequence,
  strategy,
  ignoreAutofocus,
  defaultToContext,
  includeOnlyTabbable,
} = {}) {
  let index = -1;

  if (!sequence) {
    context = (0,node_array/* default */.Z)(context || document.body)[0];
    sequence = query_tabbable({
      context,
      includeOnlyTabbable,
      strategy,
    });
  }

  if (sequence.length && !ignoreAutofocus) {
    // prefer [autofocus]
    index = findIndex(sequence, hasAutofocus);
  }

  if (sequence.length && index === -1) {
    // ignore positive [tabindex]
    index = findIndex(sequence, hasNoPositiveTabindex);
  }

  const _isFocusable = focusable.rules.except({
    onlyTabbable: includeOnlyTabbable,
  });

  if (index === -1 && defaultToContext && context && _isFocusable(context)) {
    return context;
  }

  return sequence[index] || null;
}

;// CONCATENATED MODULE: ./node_modules/tabbable/dist/index.esm.js
/*!
* tabbable 5.2.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }

  candidates = candidates.filter(filter);
  return candidates;
};

var isContentEditable = function isContentEditable(node) {
  return node.contentEditable === 'true';
};

var getTabindex = function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!isNaN(tabindexAttr)) {
    return tabindexAttr;
  } // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.


  if (isContentEditable(node)) {
    return 0;
  } // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.


  if ((node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }

  return node.tabIndex;
};

var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};

var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};

var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};

var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};

var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  var radioScope = node.form || node.ownerDocument;

  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  var radioSet;

  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }

  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};

var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};

var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

var isHidden = function isHidden(node, displayCheck) {
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }

  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }

  if (!displayCheck || displayCheck === 'full') {
    while (node) {
      if (getComputedStyle(node).display === 'none') {
        return true;
      }

      node = node.parentElement;
    }
  } else if (displayCheck === 'non-zero-area') {
    var _node$getBoundingClie = node.getBoundingClientRect(),
        width = _node$getBoundingClie.width,
        height = _node$getBoundingClie.height;

    return width === 0 && height === 0;
  }

  return false;
}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset


var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (isInput(node) || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA' || node.tagName === 'BUTTON') {
    var parentNode = node.parentElement;

    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> as an immediate child of the disabled
        //  <fieldset>: if the node is in that legend, it'll be enabled even
        //  though the fieldset is disabled; otherwise, the node is in a
        //  secondary/subsequent legend, or somewhere else within the fieldset
        //  (however deep nested) and it'll be disabled
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);

          if (child.tagName === 'LEGEND') {
            if (child.contains(node)) {
              return false;
            } // the node isn't in the first legend (in doc order), so no matter
            //  where it is now, it'll be disabled


            return true;
          }
        } // the node isn't in a legend, so no matter where it is now, it'll be disabled


        return true;
      }

      parentNode = parentNode.parentElement;
    }
  } // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state


  return false;
};

var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }

  return true;
};

var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (!isNodeMatchingSelectorFocusable(options, node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
};

var index_esm_tabbable = function tabbable(el, options) {
  options = options || {};
  var regularTabbables = [];
  var orderedTabbables = [];
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  candidates.forEach(function (candidate, i) {
    var candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  });
  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
};

var index_esm_focusable = function focusable(el, options) {
  options = options || {};
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  return candidates;
};

var index_esm_isTabbable = function isTabbable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, candidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorTabbable(options, node);
};

var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

var index_esm_isFocusable = function isFocusable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(options, node);
};


//# sourceMappingURL=index.esm.js.map

;// CONCATENATED MODULE: ./node_modules/focus-trap/dist/focus-trap.esm.js
/*!
* focus-trap 6.7.1
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var focus_trap_esm_findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying the first and last tabbable nodes in all containers/groups in
    //  the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{ container: HTMLElement, firstTabbableNode: HTMLElement|null, lastTabbableNode: HTMLElement|null }>}
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };

  var containersContain = function containersContain(element) {
    return !!(element && state.containers.some(function (container) {
      return container.contains(element);
    }));
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (containersContain(doc.activeElement)) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.tabbableGroups = state.containers.map(function (container) {
      var tabbableNodes = index_esm_tabbable(container);

      if (tabbableNodes.length > 0) {
        return {
          container: container,
          firstTabbableNode: tabbableNodes[0],
          lastTabbableNode: tabbableNodes[tabbableNodes.length - 1]
        };
      }

      return undefined;
    }).filter(function (group) {
      return !!group;
    }); // remove groups with no tabbable nodes
    // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (containersContain(target)) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !index_esm_isFocusable(target)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = containersContain(target); // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's tabbable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = focus_trap_esm_findIndex(state.tabbableGroups, function (_ref) {
        var container = _ref.container;
        return container.contains(target);
      });

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = focus_trap_esm_findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === target) {
          // an exception case where the target is the container itself, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = focus_trap_esm_findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === target) {
          // an exception case where the target is the container itself, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    var target = getActualTarget(e);

    if (containersContain(target)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(deactivateOptions, 'onDeactivate');
      var onPostDeactivate = getOption(deactivateOptions, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(deactivateOptions, 'checkCanReturnFocus');

      if (onDeactivate) {
        onDeactivate();
      }

      var returnFocus = getOption(deactivateOptions, 'returnFocus', 'returnFocusOnDeactivate');

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};


//# sourceMappingURL=focus-trap.esm.js.map

;// CONCATENATED MODULE: ./src/modules/modal/js/global.js






const MODAL_WRAPPER_SELECTOR = '[data-component="modal"]:not([data-extended="true"])';
const MODAL_SELECTOR = '[role="dialog"]';
const MODAL_TRIGGER_SELECTOR = '[data-click="modalOpen"]';
const MODAL_CLOSE_SELECTOR = '[data-click="modalClose"]';
const MODAL_PREVENT_CLOSE = '[data-click="modalPreventClose"]';
/**
 * Class to freeze the main page content when the modal is active
 * @const {string}
 */

const MODAL_FREEZE_BACKGROUND = 'modal-active';
/**
 * This class contains the logic for working with a Modal like interface; primarily the accessability
 * concerns like focus trapping, escape keys, focus restore ect.
 *
 * It can be extended and used as a parent for tightly coupled components which are ALWAYS modal based
 * or used as a composite component for components which have optional modal features.
 */

class Modal {
  constructor(modalWrapper) {
    this.modalWrapper = modalWrapper; // Media watch utility

    this.mediaWatch = undefined;
    this.mediaWatchChangeHandler = undefined; // Find the actual modal

    this.modal = this.modalWrapper.querySelector(MODAL_SELECTOR); // Find the modal trigger action

    this.modalTriggers = this.modalWrapper.querySelectorAll(MODAL_TRIGGER_SELECTOR); // Areas on click that should close

    const modalCloses = this.modalWrapper.querySelectorAll(MODAL_CLOSE_SELECTOR); // Areas on click that should prevent click propagation to close

    const modalPreventCloses = this.modalWrapper.querySelectorAll(MODAL_PREVENT_CLOSE); // Ally.js accessability handles - See https://allyjs.io/tutorials/accessible-dialog.html

    this.allyHandles = {
      originalFocus: undefined,
      disabled: undefined,
      tabFocus: undefined,
      hidden: undefined,
      keyHandle: undefined
    }; // Set a default closer handler than can be changed on modal open

    this.closeHandler = this.closeModal;
    this.modalTriggers.forEach(modalTrigger => {
      modalTrigger.addEventListener('click', () => {
        this.openModal();
      });
    });
    modalCloses.forEach(modalClose => {
      modalClose.addEventListener('click', () => {
        this.closeHandler();
      });
    });
    modalPreventCloses.forEach(preventClose => {
      preventClose.addEventListener('click', e => {
        this.preventClose(e);
      });
    });
  }
  /**
   * Opens the modal and configures the page appropriatly for WCAG standards.
   */


  openModal() {
    this.modal.hidden = false;
    this.activateAccessability();
  }
  /**
   * Configures the element appropriatly for WCAG standards.
   *
   * Focus is trapped to the modal window. Other elements on the page are disabled and hidden from accessability tools.
   * Escape keys are setup and focus is set to the first valid item.
   *
   * @param {Element} targetElement - (optional) target element to use instead of the modal wrapper
   * @param {Function} closeCallback - (optional) callback for closing the modal
   */


  activateAccessability(targetElement, closeCallback) {
    this.allyHandles.originalFocus = document.activeElement; // Disable interaction outside of modal

    this.allyHandles.disabled = maintain_disabled({
      filter: targetElement || this.modal
    }); // Focus trap the user to the modal

    this.allyHandles.tabFocus = createFocusTrap(targetElement || this.modal, {
      escapeDeactivates: false // Already handled below

    });
    this.allyHandles.tabFocus.activate(); // Hide other content from screen reader (like a css overlay but for screen readers)

    this.allyHandles.hidden = maintain_hidden({
      filter: targetElement || this.modal
    }); // Handle escape key to close modal

    if (closeCallback) {
      this.closeHandler = closeCallback;
    }

    this.allyHandles.keyHandle = (0,key/* default */.Z)({
      escape: () => {
        setTimeout(this.closeHandler());
      }
    }); // Wait until the dialog becomes visible and focus the first tabbable control

    when_visible_area({
      context: targetElement || this.modal,
      callback: () => {
        const element = first_tabbable({
          context: targetElement || this.modal,
          defaultToContext: true
        });
        element.focus();
      }
    });
    document.querySelector('body').classList.add(MODAL_FREEZE_BACKGROUND);
  }
  /**
   * This function closes the modal and reverses the WCAG functions setup oin the open.
   */


  closeModal() {
    this.modal.hidden = true;
    this.deactivateAccessability();
  }
  /**
   * Reverses the WCAG functions setup oin the open.
   */


  deactivateAccessability() {
    this.allyHandles.disabled.disengage();
    this.allyHandles.tabFocus.deactivate();
    this.allyHandles.hidden.disengage();
    this.allyHandles.keyHandle.disengage();
    this.allyHandles.originalFocus.focus();
    document.querySelector('body').classList.remove(MODAL_FREEZE_BACKGROUND); // Restore default close handler

    this.closeHandler = this.closeModal;
  }
  /**
   * This function is an event handler to prevent the modal being closes when an item 'internal' to it is pressed.
   * @param {Event} e - event object
   */


  preventClose(e) {
    e.stopPropagation();
  }
  /**
   * Function to assist in controlling components when showing as a modal depends on the current
   * media query match e.g. modal on mobile but not on tablet and desktop.
   *
   * @param {String} mediaQuery - media query string. See src/modules/_global/js/screenSize.js
   * @param {Function} matchCallback - Callback when media change occurs and matches the query string
   * @param {Function} nomatchCallback - Callback when media change occurs and does not matche the query string
   */


  watchForMediaQueryChange(mediaQuery, matchCallback, nomatchCallback) {
    this.mediaWatch = window.matchMedia("(".concat(mediaQuery, ")")); // Have to save the handler function so it can be removed later

    this.mediaWatchChangeHandler = e => {
      if (e.matches) {
        matchCallback();
      } else {
        nomatchCallback();
      }
    }; // Watch for a change and let change handler callback handle it


    this.mediaWatch.addEventListener('change', this.mediaWatchChangeHandler);
  }
  /**
   * Function to detatch the media query watch
   */


  removeMediaQueryWatch() {
    if (this.mediaWatch) {
      this.mediaWatch.removeEventListener('change', this.mediaWatchChangeHandler);
    }
  }

}
function _modal() {
  // Find all modals and created handler objects
  const modals = document.querySelectorAll(MODAL_WRAPPER_SELECTOR);
  modals.forEach(modal => {
    // Create a new item to modify
    const DOMItem = modal; // Attach the modal instance to our DOM Item

    if (!DOMItem.modal) {
      DOMItem.modal = new Modal(modal);
    }
  });
}

_modal();

/***/ }),

/***/ 28591:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HP": function() { return /* binding */ NAV_ITEM_ACTIVE; },
/* harmony export */   "$D": function() { return /* binding */ MENU_EXPANDER_SELECTOR; },
/* harmony export */   "ZP": function() { return /* binding */ PrimaryNav; }
/* harmony export */ });
/* eslint-disable max-classes-per-file */

/**
 * Primary nav selector
 * @const {string}
 */
const PRIMARY_NAV_SELECTOR = '[data-component="primary-nav"]';
/**
 * Primary nav item selector
 * @const {string}
 */

const NAV_ITEM_SELECTOR = '.primary-nav-item';
/**
 * Primary nav item active
 * @const {string}
 */

const NAV_ITEM_ACTIVE = 'primary-nav-item--active';
/**
 * Menu expander button control
 * @const {string}
 */

const MENU_EXPANDER_SELECTOR = '.primary-nav-item__expander';
/**
 * Desktop hamburger selector
 */

const PRIMARY_NAV_DESKTOP_HAMBURGER = '.primary-nav--desktop-burger';
/**
 * Create a new PrimaryNav
 * @param {HTMLElement} PrimaryNav - The HTML element of the primary nav
 * @class
 */

class PrimaryNavImpl {
  constructor(primaryNav) {
    this.primaryNav = primaryNav;
    const menuExpanders = primaryNav.querySelectorAll(MENU_EXPANDER_SELECTOR);
    menuExpanders.forEach(expander => {
      const navItem = expander.closest(NAV_ITEM_SELECTOR);
      expander.addEventListener('click', () => {
        this._expandMenu(navItem);
      });
      navItem.addEventListener('mouseover', () => {
        this._setMenuOffset(navItem);
      });
    });
  }

  isDesktopHamburger() {
    return this.primaryNav.matches(PRIMARY_NAV_DESKTOP_HAMBURGER);
  }

  _expandMenu(primaryNavItem) {
    const navItem = primaryNavItem; // Remove active from any siblings

    const allItems = document.querySelectorAll("".concat(PRIMARY_NAV_SELECTOR, " ").concat(NAV_ITEM_SELECTOR));
    allItems.forEach(item => {
      item.classList.remove(NAV_ITEM_ACTIVE);
    }); // Add active class

    navItem.classList.add(NAV_ITEM_ACTIVE);

    this._setMenuOffset(navItem);
  }

  _setMenuOffset(primaryNavItem) {
    const navItem = primaryNavItem; // Measure if the menu is going to be off screen

    const navBarWidth = navItem.offsetParent.offsetWidth; // Width of the navbar element

    const navItemOffset = navItem.offsetLeft; // How far along the navbar the item selected is

    const menuWidth = navItem.querySelector('.mega-menu-wrapper').offsetWidth; // THe width of the mega menu once shown

    const widthDiff = navBarWidth - (navItemOffset + menuWidth);

    if (widthDiff < 0) {
      navItem.dataset.menuOffsetNeeded = 'true';
      navItem.style.setProperty('--menuOffsetNeeded', "".concat(widthDiff, "px"));
    }
  }

}
/**
 * Singleton wrapper for Primary Nav to allow control from other areas of the template.
 * @class
 */


class PrimaryNav {
  static getInstance() {
    const primaryNav = document.querySelector(PRIMARY_NAV_SELECTOR); // primaryNav doesnt exist, return null

    if (!primaryNav) {
      return null;
    } // Doesnt exist yet, create new menu object


    if (!primaryNav._primaryNav) {
      // Store the actual class against the DOM, as if this is destroyed for any reason it will need to be re-instantiated
      primaryNav._primaryNav = new PrimaryNavImpl(primaryNav);
    } // Return existing primaryNav object


    return primaryNav._primaryNav;
  }

} // Export for external access and run intial pass

PrimaryNav.getInstance();

/***/ }),

/***/ 25476:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _global_js_stringToBool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98051);

/**
 * This class fix Matrix form imperfections.
 * Add missing attributes to input fields (autocomplete and placeholder)
 * Handles inline input clear button.
 *
 * @private
 */

function _searchForm() {
  /**
   * Main component selector.
   * @const {string}
   */
  const SEARCH_FORM_COMPONENT = '[data-pnp-component="search-form"]';
  /**
   * Search input field selector.
   * @const {string}
   */

  const SEARCH_INPUT_SELECTOR = '.sq-form-field:first-child';
  /**
   * Clear action button selector.
   * @const {string}
   */

  const SEARCH_CLEAR_ACTION_SELECTOR = '[data-click="clear-search"]';
  /**
   * Class flag indicating if input has value.
   * @const {string}
   */

  const SEARCH_HAS_INPUT_CLASS = 'search-form--has-input';
  /**
   * Search placeholder text.
   * @const {string}
   */

  const PLACEHOLDER_TEXT = 'Search this website';
  /**
   * Since the form is not wrapped inside our component, we use submit button to trigger click.
   * @type {string}
   */

  const SUBMIT_BUTTON = '[type="submit"]';
  /**
   * Sort dropdown selector, we add listener, to listen on changes and trigger submit on change.
   * @type {string}
   */

  const SORT_DROPDOWN = '.sq-form-field:nth-child(2)';

  class SearchForm {
    constructor(searchFormWrapper) {
      this.searchFormWrapper = searchFormWrapper;
      const input = searchFormWrapper.querySelector(SEARCH_INPUT_SELECTOR);
      const submitButton = searchFormWrapper.querySelector(SUBMIT_BUTTON);
      const sortDropdown = searchFormWrapper.querySelector(SORT_DROPDOWN);
      const isEmptySearchOn = (0,_global_js_stringToBool__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(searchFormWrapper.dataset.pnpEmptySearchEnabled); // Attach event handlers to clear

      searchFormWrapper.querySelectorAll(SEARCH_CLEAR_ACTION_SELECTOR).forEach(element => {
        element.addEventListener('click', () => {
          this.clearSearch(input, this.searchFormWrapper, SEARCH_HAS_INPUT_CLASS);
        });
      });

      if (input) {
        input.addEventListener('input', e => {
          this.handleInputChange(e, this.searchFormWrapper, SEARCH_HAS_INPUT_CLASS);
        });
        input.addEventListener('change', e => {
          this.handleInputChange(e, this.searchFormWrapper, SEARCH_HAS_INPUT_CLASS);
        }); // Add attributes not available in matrix

        input.setAttribute('autocomplete', 'off');
        input.setAttribute('placeholder', PLACEHOLDER_TEXT);
      }

      if (sortDropdown && input) {
        sortDropdown.addEventListener('change', () => {
          if (input.value !== '' || isEmptySearchOn) {
            submitButton.click();
          }
        });
      }
    }
    /**
     * Clears value and toggle class on supplied DOM element.
     *
     * @param {object} inputField DOM Input field we will clear value.
     * @param {object} element    DOM Element where we toggling flag.
     * @param {string} className  Class name being used as flag indicator.
     */


    clearSearch(inputField, element, className) {
      // eslint-disable-next-line no-param-reassign
      inputField.value = '';
      inputField.dispatchEvent(new window.Event('change')); // Remove the 'has input' class which makes the X show

      element.classList.remove(className); // Reset focus to the input as the X will now hide

      inputField.focus();
    }
    /**
     * Toggle class on supplied DOM element.
     *
     * @param {object} e         Element firing event.
     * @param {object} element   DOM Element where we toggling flag.
     * @param {string} className Class name being used as flag indicator.
     */


    handleInputChange(e, element, className) {
      if (!element) {
        return;
      }

      const {
        target: {
          value
        }
      } = e; // eslint-disable-next-line no-unused-expressions

      value !== '' ? element.classList.add(className) : element.classList.remove(className);
    }

  }

  const SearchComponents = document.querySelectorAll(SEARCH_FORM_COMPONENT);
  SearchComponents.forEach(item => {
    // Create a new item to modify
    const DOMItem = item; // Attach the class instance to our DOMItem

    if (!DOMItem.searchForm) {
      DOMItem.searchForm = new SearchForm(item);
    }
  });
}

_searchForm();

/***/ }),

/***/ 93541:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": function() { return /* binding */ Slider; }
/* harmony export */ });
/* unused harmony export default */
/* harmony import */ var PlugAndPlay_global_js_stringToBool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98051);
/* eslint-disable no-unused-expressions */

/**
 * This class handle sliding elements.
 *
 * @class
 */

class Slider {
  constructor(wrapper) {
    this.SLIDE_ACTIVE = 'slider-item--active';
    this.NAVIGATION_CLASSNAME_ACTIVE = 'carousel-navigation__item--active';
    this.SLIDER_TRANSITIONING = 'slider__inner--transitioning';
    this.SLIDER_TRANSITIONING_ANY = 'slider__inner--transitioning-any';
    this.SLIDER_TRANSITIONING_RIGHT = 'slider__inner--transition-right';
    this.SLIDER_TRANSITIONING_LEFT = 'slider__inner--transition-left';
    this.SLIDER_CSS_ANIMATION_DURATION_VAR = '--slider-animation-duration';
    this.SLIDER_CSS_SLIDE_DURATION_VAR = '--slider-slide-duration';
    this.moveSlideForwards = this.moveSlideForwards.bind(this);
    this.moveSlideBackwards = this.moveSlideBackwards.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.isMoving = false;
    this.eventsRelay = wrapper;
    this.xMove = null;

    if (wrapper) {
      this.setCSSAnimationDuration(wrapper);
      this.setCSSSlideDuration(wrapper);
      this.setTriggerPercent(wrapper);
      wrapper.addEventListener('touchstart', this.handleTouchStart, false);
      wrapper.addEventListener('touchend', this.handleTouchEnd, false);
    }
  }

  set items(slides) {
    this.slides = slides;
    this.orderedSlides = Array.from(slides); // Change the last slide to be the first in the array to deal with setting the orders nicely

    this.orderedSlides.unshift(this.orderedSlides.at(-1));
    this.orderedSlides.pop();
    this.numOfSlides = slides.length - 1; // Set initial classes only once when slides are created.

    this.setInitialClasses();
  }

  get items() {
    return this.slides;
  }

  get numOfItems() {
    return this.numOfSlides;
  }

  set innerElement(inner) {
    this.inner = inner;
  }

  set navigationItems(controllers) {
    this.navigationControls = controllers;
  }

  get navigationItems() {
    return this.navigationControls;
  }

  set previousButton(previous) {
    this.previous = previous;
  }

  get previousButton() {
    return this.previous;
  }

  set nextButton(next) {
    this.next = next;
  }

  get nextButton() {
    return this.next;
  }

  set shouldLoop(shouldSliderLoop) {
    this.shouldSliderLoop = shouldSliderLoop;
  }

  get shouldLoop() {
    return this.shouldSliderLoop;
  }

  set animationDuration(sliderAnimationDuration) {
    this.sliderAnimationDuration = sliderAnimationDuration;
  }

  get animationDuration() {
    return this.sliderAnimationDuration;
  }

  set slideDuration(sliderAnimationDuration) {
    this.sliderAnimationDuration = sliderAnimationDuration;
  }

  get slideDuration() {
    return this.sliderAnimationDuration;
  }
  /**
   * Sets the initial classes for the slider items.
   *
   * @returns {void}
   */


  setInitialClasses() {
    const items = this.orderedSlides;

    if (items === undefined) {
      return;
    } // Set the class on the current item


    items[1].classList.add(this.SLIDE_ACTIVE); // Set the order on each of the slides

    items.forEach((item, key) => {
      // eslint-disable-next-line no-param-reassign
      item.dataset.slideOrder = key;
    });
  }
  /**
   * Wrapper moves slides forwards.
   *
   * @returns {void}
   */


  moveSlideForwards() {
    this.moveSlide('forwards');
  }
  /**
   * Wrapper moves slides backwards.
   *
   * @returns {void}
   */


  moveSlideBackwards() {
    this.moveSlide('backwards');
  }
  /**
   * Disables interactions with the slider.
   *
   * @returns {void}
   */


  disableInteractions() {
    this.isMoving = true; // Set the moving status to be changed to false when the animation duration has stopped

    setTimeout(() => {
      this.isMoving = false;
    }, this.sliderAnimationDuration);
  }
  /**
   * Function that moves the slide.
   *
   * @param {string} direction - Defines slider directions.
   * @returns {void}
   */


  moveSlide(direction = 'forwards') {
    // Check if the slider would be looping backwards
    const wouldLoopBackwards = this.orderedSlides.find(slide => parseInt(slide.dataset.slideOrder, 10) === 1) === Array.from(this.slides).at(0) && direction === 'backwards'; // Check if the slider would be looping forwards

    const wouldLoopForwards = this.orderedSlides.find(slide => parseInt(slide.dataset.slideOrder, 10) === 1) === Array.from(this.slides).at(-1) && direction === 'forwards'; // If we are in the process of animating or this move would loop the slider

    if (this.isMoving || (wouldLoopBackwards || wouldLoopForwards) && !this.shouldLoop) {
      return;
    } // Disable interactions while it is moving


    this.disableInteractions();
    this.resetClasses();
    let slideIndex = 1;

    if (this.inner) {
      this.inner.classList.add(this.SLIDER_TRANSITIONING);

      if (direction === 'forwards') {
        this.inner.classList.add(this.SLIDER_TRANSITIONING_LEFT);
        slideIndex += 1;
      }

      if (direction === 'backwards') {
        this.inner.classList.add(this.SLIDER_TRANSITIONING_RIGHT);
        slideIndex -= 1;
      }
    } // Set the current active slide


    this.orderedSlides[slideIndex].classList.add(this.SLIDE_ACTIVE);

    if (this.navigationControls) {
      // Set the active class on the navigation item
      this.navigationControls[Array.from(this.slides).findIndex(slide => slide === this.orderedSlides[slideIndex])].classList.add(this.NAVIGATION_CLASSNAME_ACTIVE);
    } // Wait until the transition has stopped then change the slide


    setTimeout(() => {
      if (this.inner) {
        this.inner.classList.remove(this.SLIDER_TRANSITIONING);
        this.inner.classList.remove(this.SLIDER_TRANSITIONING_LEFT);
        this.inner.classList.remove(this.SLIDER_TRANSITIONING_RIGHT);
      }

      if (direction === 'forwards') {
        // Move the slides order by one to the right
        this.orderedSlides.push(this.orderedSlides.at(0));
        this.orderedSlides.shift();
        this.orderedSlides.forEach((slide, key) => {
          // eslint-disable-next-line no-param-reassign
          slide.dataset.slideOrder = key;
        });
      }

      if (direction === 'backwards') {
        this.orderedSlides.unshift(this.orderedSlides.at(-1));
        this.orderedSlides.pop();
        this.orderedSlides.forEach((slide, key) => {
          // eslint-disable-next-line no-param-reassign
          slide.dataset.slideOrder = key;
        });
      } // Create and dispatch event to relay.


      const event = new CustomEvent('pnp-slide-event', {
        detail: {
          slideIndex
        }
      });
      this.eventsRelay.dispatchEvent(event);
    }, this.sliderAnimationDuration);
  }
  /**
   * Register touch events.
   *
   * @param {object} event Touch event.
   *
   * @returns {void}
   */


  handleTouchStart(event) {
    const firstTouch = event.touches[0];
    this.xMove = firstTouch.clientX;
  }
  /**
   * Handle slide left or right based on touch event offsets.
   *
   * @param {object} event Touch event.
   *
   * @returns {void}
   */


  handleTouchEnd(event) {
    if (!this.xMove) {
      return;
    } // Difference between last horizontal coordinate and initial touch point.
    // Negative for left and positive for right direction.


    const deltaX = event.changedTouches[0].clientX - this.xMove; // Absolute value, we dont want negative numbers here, only absolute length of swipe.

    const distTraveled = Math.abs(deltaX); // Ratio of length of the swipe to width of our wrapper.

    const moveThreshold = distTraveled / this.inner.offsetWidth;

    if (moveThreshold > this.triggerPercent) {
      deltaX < 0 ? this.moveSlideForwards() : this.moveSlideBackwards();
    }
  }
  /**
   * Resets the classes on the previous and next slides
   *
   * @returns {void}
   */


  resetClasses() {
    // Reset the slide classes
    this.orderedSlides.forEach(item => {
      item.classList.remove(this.SLIDE_ACTIVE);
    });

    if (this.navigationControls) {
      this.navigationControls.forEach(item => {
        item.classList.remove(this.NAVIGATION_CLASSNAME_ACTIVE);
      });
    }
  }
  /**
   * Moves the slide to the specified item.
   *
   * @param {number} slideIndex - The index for the slide to move to.
   *
   * @returns {void}
   */


  moveToSlide(slideIndex) {
    if (this.numOfSlides <= 0) {
      return;
    }

    this.inner.classList.add(this.SLIDER_TRANSITIONING_ANY); // get the slide that we are moving to

    const slideToMoveTo = Array.from(this.slides).at(slideIndex);
    this.resetClasses();
    setTimeout(() => {
      // Set the active navigation items
      if (this.navigationControls) {
        this.navigationControls.forEach(item => {
          if (parseInt(item.dataset.slideTo, 10) === slideIndex) {
            item.classList.add(this.NAVIGATION_CLASSNAME_ACTIVE);
          }
        });
      } // Cycle through the ordered slides until the one we want to move to is in the 1 index, then update the order on all slides


      while (this.orderedSlides.at(1) !== slideToMoveTo) {
        // Move the slides order by one to the right
        this.orderedSlides.push(this.orderedSlides.at(0));
        this.orderedSlides.shift();
      } // Set the order attribute once the slides are in the right order


      this.orderedSlides.forEach((slide, key) => {
        // eslint-disable-next-line no-param-reassign
        slide.dataset.slideOrder = key;
      }); // Create and dispatch event to relay.

      const event = new CustomEvent('pnp-slide-event', {
        detail: {
          slideIndex
        }
      });
      this.eventsRelay.dispatchEvent(event); // Add new classes

      this.slides[slideIndex].classList.add(this.SLIDE_ACTIVE);
      this.inner.classList.remove(this.SLIDER_TRANSITIONING_ANY);
    }, this.sliderAnimationDuration);
  }
  /**
   * Sets the CSS animation duration to match that set in the data properties.
   *
   * @param {HTMLElement} wrapper - The DOM object for the slider.
   *
   * @returns {void}
   */


  setCSSAnimationDuration(wrapper) {
    this.sliderAnimationDuration = parseInt(wrapper.dataset.sliderAnimationDuration, 10) || 500;
    wrapper.style.setProperty(this.SLIDER_CSS_ANIMATION_DURATION, "".concat(this.sliderAnimationDuration, "ms"));
  }
  /**
   * Sets the CSS side duration to match that set in the data properties.
   *
   * @param {HTMLElement} wrapper - The DOM object for the slider.
   *
   * @returns {void}
   */


  setCSSSlideDuration(wrapper) {
    this.sliderSlideDuration = parseInt(wrapper.dataset.carouselSlideInterval, 10) || 3000;
    wrapper.style.setProperty(this.SLIDER_CSS_SLIDE_DURATION, "".concat(this.sliderSlideDuration, "ms"));
  }
  /**
   * Sets sensitivity for touch distance before slide action is fired.
   * Values must be expressed in decimals, defaults to 0.2.
   *
   * @param {HTMLElement} wrapper - The DOM object for the slider.
   *
   * @returns {void}
   */


  setTriggerPercent(wrapper) {
    this.triggerPercent = parseFloat(wrapper.dataset.triggerPercent) || 0.2;
  }

}
/**
 * Slider wrapper selector.
 * @type {string}
 */

const SLIDER_WRAPPER = '[data-component="slider"]';
/**
 * Slider next button selector.
 * @type {string}
 */

const BUTTON_NEXT = '[data-component="slider-button--next"]';
/**
 * Slider previous button selector.
 * @type {string}
 */

const BUTTON_PREVIOUS = '[data-component="slider-button--previous"]';
/**
 * Slider inner selector.
 * @type {string}
 */

const SLIDER_INNER = '[data-component="slider-inner"]';
/**
 * Slider items selector.
 * @type {string}
 */

const ITEMS = '[data-component="slider-item"]';
function _slider() {
  const slider = document.querySelector(SLIDER_WRAPPER);
  const previousButton = document.querySelector(BUTTON_PREVIOUS);
  const nextButton = document.querySelector(BUTTON_NEXT); // If data attribute doesnt exist do nothing.

  if (!slider) {
    console.warn('Missing wrapper data-component="slider"');
    return;
  } // If slider already created we will remove button listeners.


  if (slider.instance) {
    console.warn('Instance of slider already exists in DOM, removing event listeners before reinitialising slider.'); // Removing buttons event listeners.

    if (nextButton) {
      nextButton.removeEventListener('click', slider.instance.moveSlideForwards);
    }

    if (previousButton) {
      previousButton.removeEventListener('click', slider.instance.moveSlideBackwards);
    } // Removing slider instance.


    slider.instance = null;
    delete slider.instance;
  }

  slider.instance = new Slider(slider);
  const {
    instance
  } = slider; // Should we enable slider looping depends on data attribute passed in markup.

  instance.shouldLoop = (0,PlugAndPlay_global_js_stringToBool__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(slider.dataset.sliderShouldLoop, false); // Sets the slides.

  instance.items = slider.querySelectorAll(ITEMS); // Sets the inner element

  instance.innerElement = slider.querySelector(SLIDER_INNER); // Define how to handle next and previous click events.

  if (nextButton) {
    nextButton.addEventListener('click', instance.moveSlideForwards);
  }

  if (previousButton) {
    previousButton.addEventListener('click', instance.moveSlideBackwards);
  } // Only example listener, for someone wishing to run custom code when event is fired.


  instance.eventsRelay.addEventListener('pnp-slide-event', e => e);
}

_slider();

/***/ }),

/***/ 66985:
/***/ (function() {



/***/ }),

/***/ 44383:
/***/ (function() {



/***/ }),

/***/ 41809:
/***/ (function() {



/***/ }),

/***/ 79709:
/***/ (function() {



/***/ }),

/***/ 98061:
/***/ (function() {



/***/ }),

/***/ 98314:
/***/ (function() {



/***/ }),

/***/ 2701:
/***/ (function() {



/***/ }),

/***/ 68973:
/***/ (function() {



/***/ }),

/***/ 11652:
/***/ (function() {



/***/ }),

/***/ 11685:
/***/ (function() {



/***/ }),

/***/ 40640:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/**
 * This class fix Matrix form imperfections.
 * Add missing attributes to input fields (autocomplete and placeholder)
 * Handles inline input clear button.
 *
 * @private
 */
function _searchTools() {
  /**
   * Main component selector.
   * @const {string}
   */
  const SEARCH_TOOLS_COMPONENT = '[data-pnp-component="stencils-search-tools"]';
  /**
   * Find the submit button to trigger click event when the dropdown is changed.
   * @type {string}
   */

  const SUBMIT_BUTTON = '[type="submit"]';
  /**
   * Specifies the selector for the dropdowns which we want to trigger the click
   * event whent he value is changed.
   * @type {string}
   */

  const DROPDOWN = '.search-tools__dropdown select';

  class SearchTools {
    constructor(searchToolsFormWrapper) {
      this.searchToolsFormWrapper = searchToolsFormWrapper;
      const submitButton = searchToolsFormWrapper.querySelector(SUBMIT_BUTTON); // When the user selects a new value on any of the drop downs,
      // fire the form so that the new value is reflected in the search.

      const dropdowns = searchToolsFormWrapper.querySelectorAll(DROPDOWN);
      dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
          submitButton.click();
        });
      });
    }

  }

  const SearchComponents = document.querySelectorAll(SEARCH_TOOLS_COMPONENT);
  SearchComponents.forEach(item => {
    // Create a new item to modify
    const DOMItem = item; // Attach the class instance to our DOMItem

    if (!DOMItem.searchTools) {
      DOMItem.searchTools = new SearchTools(item);
    }
  });
}

_searchTools();

/***/ }),

/***/ 27272:
/***/ (function() {



/***/ }),

/***/ 43884:
/***/ (function() {



/***/ }),

/***/ 73747:
/***/ (function() {



/***/ }),

/***/ 1930:
/***/ (function() {



/***/ }),

/***/ 77099:
/***/ (function() {



/***/ }),

/***/ 67233:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(15306);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(33948);
;// CONCATENATED MODULE: ./src/modules/_global/js/debounce.js


/**
 * Debounce functions for better performance
 * @module debounce
 * @param  {Function} fn The function to debounce
 * @example <caption>Example of how to use the debounce function</caption>
 * window.addEventListener('resize', debounce(functionToDebounce));
 */
function debounce(fn) {
  // Define a variable to store an animation frame
  let requestAnimationFrame; // Return a function

  return (...args) => {
    // If the animation frame is defined dont do anything (the window hasn't finished animating yet)
    if (requestAnimationFrame) {
      return;
    } // If the animation frame isn't defined define it


    requestAnimationFrame = window.requestAnimationFrame(() => {
      // Run our debounced function
      fn(...args); // Set the animation frame as undefined

      requestAnimationFrame = undefined;
    });
  };
}
;// CONCATENATED MODULE: ./src/modules/_global/js/clickOutside.js
/**
 * This module handles clicks outside elements and adds / removes classes
 * @module clickOutside
 * @param {HTMLElement} element - The element we want to hide if the click is outside it
 * @param {function} functionToCall - The function that should be called if a click is outside of the defined element
 */
function hideOnClickOutside(element, functionToCall) {
  // Define out event listener to remove
  function removeClickListener() {
    /* eslint-disable no-use-before-define */
    document.removeEventListener('click', outsideClickListener);
  } // Define out click listener


  function outsideClickListener(event) {
    // If the click wasn't inside our element and our element is visible
    if (!element.contains(event.target) && isVisible(element)) {
      functionToCall(); // Tidy up and remove the event listener

      removeClickListener();
    }
  } // Add an event listener to the document for this item


  document.addEventListener('click', outsideClickListener);
} // Check if the element is visible

const isVisible = element => !!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
;// CONCATENATED MODULE: ./src/modules/tabs/js/global.js


 // eslint-disable-next-line no-underscore-dangle

function _tabGroup() {
  /**
   * @const {string} - The selector used to find the tab group container
   */
  const TAB_GROUP_SELECTOR = '.tabs';
  /**
   * @const {string} - The selector to find the tab navigation items
   */

  const TAB_NAVIGATION_SELECTOR_BUTTON = '[data-tab-group-control]';
  /**
   * @const {string} - The selector to find content of the tab group
   */

  const TAB_CONTENT_SELECTOR = '[data-tab-group-controlled-by]';
  /**
   * @const {string} - The active class for the content container
   */

  const TAB_CONTENT_ACTIVE_CLASS = 'tab__content--active';
  /**
   * @const {string} - The active class for the tab button
   */

  const TAB_BUTTON_ACTIVE_CLASS = 'tab__button--active';
  /**
   * @const {string} - The selector for the tab group navigation container
   */

  const TAB_NAVIGATION_SELECTOR = '[data-tab-group-element="tab-list-nav"]';
  /**
   * @const {string} - The selector for the overflow menu button
   */

  const TAB_NAVIGATION_OVERFLOW_MENU_BUTTON_SELECTOR = '[data-tab-group-element="overflow-menu-button"]';
  /**
   * @const {string} - The overflow menu container selector
   */

  const TAB_NAVIGATION_OVERFLOW_MENU_CONTAINER_SELECTOR = '[data-tab-group-element="overflow-menu-container"]';
  /**
   * @const {string} - The selector for the overflow menu wrapper
   */

  const TAB_NAVIGATION_OVERFLOW_MENU_WRAPPER_SELECTOR = '[data-tab-group-element="overflow-menu-wrapper"]';
  /**
   * @const {string} - The overflow menu active class
   */

  const TAB_NAVIGATION_OVERFLOW_MENU_ACTIVE_CLASS = 'tab-list-nav-overflow-menu__wrapper--visible';
  /**
   * @const {string} - Overflow menu open class
   */

  const TAB_NAVIGATION_OVERFLOW_MENU_OPEN_CLASS = 'tab-list-nav__overflow-menu--open';
  /**
   * @const {string} - Overflow menu button open class
   */

  const TAB_NAVIGATION_OVERFLOW_MENU_BUTTON_OPEN_CLASS = 'tab-list-nav-overflow-menu__button--open';
  /**
   * The Tab group class
   * @param {HTMLElement} - Passed the html element for a tab group
   * @class
   */

  class TabGroup {
    constructor(tabGroup) {
      // The tab group HTML element
      this.tabGroup = tabGroup; // Bind the required functions to the tabGroup class

      this.showContent = this.showContent.bind(this);
      this.recalculateMenuOnResize = this.recalculateMenuOnResize.bind(this);
      this.toggleOverflowMenuState = this.toggleOverflowMenuState.bind(this); // Get the tab group navigation buttons

      this.navigationButtons = this.tabGroup.querySelectorAll(TAB_NAVIGATION_SELECTOR_BUTTON); // Get the content areas for the tabs

      this.contentContainers = this.tabGroup.querySelectorAll(TAB_CONTENT_SELECTOR); // Get the tab navigation container

      this.navigationContainer = this.tabGroup.querySelector(TAB_NAVIGATION_SELECTOR); // Get the tab nav overflow button

      this.navigationOverflowMenuButton = this.tabGroup.querySelector(TAB_NAVIGATION_OVERFLOW_MENU_BUTTON_SELECTOR); // Get the container for the overflow menu

      this.navigationOverflowMenuContainer = this.tabGroup.querySelector(TAB_NAVIGATION_OVERFLOW_MENU_CONTAINER_SELECTOR); // Get the overflow menu wrapper

      this.navigationOverflowMenuWrapper = this.tabGroup.querySelector(TAB_NAVIGATION_OVERFLOW_MENU_WRAPPER_SELECTOR); // Define a variable if the overflow menu is active

      this.overflowMenuActive = false; // Destroy any previously set event listeners before initializing new ones

      this.removeEventListeners(); // Add the event listeners

      this.addEventListeners(); // Calculate the items that should be in the overflow menu

      this.addElementsToOverflowMenu(); // Get the location hash

      const locationHash = window.location.hash.replace('#', ''); // Check that we got something back from the url

      if (locationHash) {
        // Open the content
        this.openTab(locationHash);
      }
    }
    /**
     * Function that adds the event listeners when the tab group is initialized
     * @method
     */


    addEventListeners() {
      // Add the event listener to change the content when a button is clicked
      this.navigationButtons.forEach(navigationButton => {
        navigationButton.addEventListener('click', this.showContent);
      }); // Add an event listener that re-works the menu when the window is resized

      window.addEventListener('resize', debounce(this.recalculateMenuOnResize)); // Add event listener to open and close the overflow menu

      this.navigationOverflowMenuButton.addEventListener('click', this.toggleOverflowMenuState);
    }
    /**
     * Function that removes the event listeners that are setup in the add event listeners function
     * @method
     */


    removeEventListeners() {
      // Remove the event listener that shows content when a button is clicked
      this.navigationButtons.forEach(navigationButton => {
        navigationButton.removeEventListener('click', this.showContent);
      }); // remove the event listener that re-works the menu when the window is resized

      window.removeEventListener('resize', debounce(this.recalculateMenuOnResize)); // Remove the event listener for the overflow menu

      this.navigationOverflowMenuButton.removeEventListener('click', this.toggleOverflowMenuState);
    }
    /**
     * Removes the active class from all the content containers
     * @method
     */


    removeActiveClassFromContent() {
      this.contentContainers.forEach(contentContainer => {
        contentContainer.classList.remove(TAB_CONTENT_ACTIVE_CLASS);
      });
    }
    /**
     * Removes the active class from all the navigation buttons
     * @method
     */


    removeActiveClassFromButtons() {
      this.navigationButtons.forEach(button => {
        button.classList.remove(TAB_BUTTON_ACTIVE_CLASS);
      });
    }
    /**
     * Open a specific tab (Based on data controlled by attribute)
     * @method
     * @param {string} tabToOpen - The string to define the tab to open
     */


    openTab(tabToOpen) {
      // get the content to display based on the passed variable (note that the array from is needed as find is not a method on node lists)
      const contentToDisplay = Array.from(this.contentContainers).find(contentContainer => contentContainer.dataset.tabGroupControlledBy === tabToOpen); // Get the tab for the current active content

      const activeTab = Array.from(this.navigationButtons).find(button => button.dataset.tabGroupControl === tabToOpen); // If we found the content to display

      if (contentToDisplay && activeTab) {
        // Remove the active class from all content
        this.removeActiveClassFromContent(); // Remove the active class from all buttons

        this.removeActiveClassFromButtons(); // Add the active class to the content object

        contentToDisplay.classList.add(TAB_CONTENT_ACTIVE_CLASS); // Add the active class to the tab

        activeTab.classList.add(TAB_BUTTON_ACTIVE_CLASS);
      }
    }
    /**
     * Toggle the visibility state of the overflow menu
     * @method
     */


    toggleOverflowMenuState(event) {
      // Stop the propagation of the event so that we can attach the click outside event handler without it being called immediately
      event.stopPropagation();

      if (this.overflowMenuActive) {
        this.setTabIndexes(this.overflowMenuActive);
        this.navigationOverflowMenuContainer.classList.toggle(TAB_NAVIGATION_OVERFLOW_MENU_OPEN_CLASS);
        this.navigationOverflowMenuButton.classList.toggle(TAB_NAVIGATION_OVERFLOW_MENU_BUTTON_OPEN_CLASS); // Check if we have just opened the menu and if so add an event listener to close it if the user clicks outside it

        if (this.navigationOverflowMenuContainer.classList.contains(TAB_NAVIGATION_OVERFLOW_MENU_OPEN_CLASS)) {
          hideOnClickOutside(this.navigationOverflowMenuContainer, () => this.closeOverflowMenu());
        }
      }
    }
    /**
     * Reworks tab index based on button visibility.
     *
     * @param {boolean} shouldBeTabbable Determines if the items are visible or hidden.
     */


    setTabIndexes(shouldBeTabbable) {
      this.navigationButtons.forEach(button => {
        const shouldBeVisible = button.dataset.hidden === 'true' && shouldBeTabbable;
        const shouldBeHidden = button.dataset.hidden === 'true' && !shouldBeTabbable;

        if (shouldBeVisible) {
          button.setAttribute('tabindex', '0');
        }

        if (shouldBeHidden) {
          button.setAttribute('tabindex', '-1');
        }
      });
    }
    /**
     * Closes the overflow menu
     * @method
     */


    closeOverflowMenu() {
      if (this.overflowMenuActive) {
        this.setTabIndexes(!this.overflowMenuActive);
        this.navigationOverflowMenuContainer.classList.remove(TAB_NAVIGATION_OVERFLOW_MENU_OPEN_CLASS); // Remove the open class from the navigation button

        this.navigationOverflowMenuButton.classList.remove(TAB_NAVIGATION_OVERFLOW_MENU_BUTTON_OPEN_CLASS);
      }
    }
    /**
     * Opens the overflow menu
     * @method
     */


    openOverflowMenu() {
      if (this.overflowMenuActive) {
        this.navigationOverflowMenuContainer.classList.add(TAB_NAVIGATION_OVERFLOW_MENU_OPEN_CLASS);
      }
    }
    /**
     * Resize Event listener to call the recalculation when the window width has changed
     */


    recalculateMenuOnResize() {
      // Call the add elements to overflow menu which will rework the menu
      this.addElementsToOverflowMenu();
    }
    /**
     *
     * @param {*} event
     */


    addElementsToOverflowMenu() {
      // get the width of the containing div
      const containerWidth = this.tabGroup.offsetWidth; // Move all the buttons to the navigation container (not the dropdown) so we can caculate the widths correctly

      this.navigationButtons.forEach(button => {
        this.navigationContainer.append(button);
      }); // Move the dropdown container to be the last item after appending the buttons

      this.navigationContainer.append(this.navigationOverflowMenuWrapper); // Get the width of each element

      const navigationButtonWidths = Array.from(this.navigationButtons).map(button => {
        // Return the button width including the margin left and right
        return button.offsetWidth + parseInt(window.getComputedStyle(button).marginLeft, 10) + parseInt(window.getComputedStyle(button).marginRight, 10);
      }); // get the navigation buttons total widths

      const navigationButtonsTotalWidths = navigationButtonWidths.reduce((currentButtonWidthAccumulator, currentButtonWidth) => currentButtonWidthAccumulator + currentButtonWidth); // Get the width of the overflow menu button if the sum of the other buttons widths is greater than the container width

      if (navigationButtonsTotalWidths > containerWidth) {
        // Get the overflow menu button width including the margins
        const overflowMenuButtonWidth = this.navigationOverflowMenuButton.offsetWidth + parseInt(window.getComputedStyle(this.navigationOverflowMenuButton).marginLeft, 10) + parseInt(window.getComputedStyle(this.navigationOverflowMenuButton).marginRight, 10); // Get an array of the buttons that should be shown

        const buttonsToShow = []; // Get an array of the buttons that should be moved to the dropdown

        const buttonsToMoveToDropdown = []; // Variable to define if we can add more buttons

        let canAddMoreButtons = true; // Define the starting width of the sum of the buttons as 0

        let currentButtonsToShowWidth = 0; // Loop through the buttons

        this.navigationButtons.forEach(button => {
          // Check if the button being added would push the other buttons over the width
          if (currentButtonsToShowWidth + button.offsetWidth + parseInt(window.getComputedStyle(button).marginLeft, 10) + parseInt(window.getComputedStyle(button).marginRight, 10) + overflowMenuButtonWidth < containerWidth && canAddMoreButtons) {
            // If the width isn't going to push over the button over the width, add the button to the buttons to show list
            buttonsToShow.push(button); // add the button width to the current buttons to show width

            currentButtonsToShowWidth = currentButtonsToShowWidth + button.offsetWidth + parseInt(window.getComputedStyle(button).marginLeft, 10) + parseInt(window.getComputedStyle(button).marginRight, 10);
          } else {
            // If the button shouldn't be shown add it to the array that should be moved to the dropdown
            buttonsToMoveToDropdown.push(button); // Set the can add more buttons to false (preventing any more buttons being added)

            canAddMoreButtons = false;
          }
        }); // Move the buttons to the dropdown

        buttonsToMoveToDropdown.forEach(button => {
          button.setAttribute('tabindex', '-1'); // eslint-disable-next-line no-param-reassign

          button.dataset.hidden = 'true';
          this.navigationOverflowMenuContainer.append(button);
        });
        buttonsToShow.forEach(button => {
          button.setAttribute('tabindex', '0'); // eslint-disable-next-line no-param-reassign

          button.dataset.hidden = 'false';
        }); // Display the overflow menu

        this.showOverflowMenu(true); // Set that the overflow menu is active

        this.overflowMenuActive = true;
      } else {
        // Don't display the overflow menu
        this.showOverflowMenu(false); // Set that the overflow menu is inactive

        this.overflowMenuActive = false;
      }
    }
    /**
     * Function that shows or hides the overflow menu
     * @param {bool} shouldShowOverflowMenu
     */


    showOverflowMenu(shouldShowOverflowMenu) {
      if (shouldShowOverflowMenu) {
        this.navigationOverflowMenuWrapper.classList.add(TAB_NAVIGATION_OVERFLOW_MENU_ACTIVE_CLASS);
      } else {
        this.navigationOverflowMenuWrapper.classList.remove(TAB_NAVIGATION_OVERFLOW_MENU_ACTIVE_CLASS);
      }
    }
    /**
     * Adds the active class to the content area
     * @param {event} event - The firing event (This should be fired by a element with the data attribute data-tab-group-control that controls )
     * @method
     */


    showContent(event) {
      this.navigationButtons.forEach(buttons => {
        buttons.setAttribute('aria-selected', 'false');
      });
      event.srcElement.setAttribute('aria-selected', 'true'); // Open the specific tab

      this.openTab(event.target.dataset.tabGroupControl);
      this.closeOverflowMenu();
    }

  }
  /**
   * Function that initializes the tab groups on the page
   */


  function initializeTabGroups() {
    const tabGroupInstances = document.querySelectorAll(TAB_GROUP_SELECTOR); // Go through each tab group instance and create a new class from that tabGroup

    tabGroupInstances.forEach(tabGroup => {
      // Create a new item to modify
      const DOMItem = tabGroup;
      DOMItem.tabGroup = new TabGroup(tabGroup);
    });
  }
  /**
   * @const {boolean}
   */


  const tabGroupExists = !!document.querySelector(TAB_GROUP_SELECTOR); // If the module exists, do whatever we need to

  if (tabGroupExists) {
    initializeTabGroups();
  }
}

_tabGroup();

/***/ }),

/***/ 68199:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _modal_js_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46347);

const VIDEO_MODAL_WRAPPER_SELECTOR = '[data-component="video-modal"]';
function _videoModal() {
  class VideoModal extends _modal_js_global__WEBPACK_IMPORTED_MODULE_0__/* .Modal */ .u {
    constructor(modalWrapper) {
      super(modalWrapper);
      this.videoIFrame = this.modal.querySelector('iframe');
    }
    /**
     * This function opens the modal for the video. It sets the src only on load so if
     * autoplay parameters are passed in the video does not start appearing before its shown.
     */


    openModal() {
      this.videoIFrame.setAttribute('src', this.modalWrapper.dataset.src);
      super.openModal();
    }
    /**
     * This function closes the modal and removes the source from the iFrame to stop the video
     * from playing in the background if it has been started.
     */


    closeModal() {
      this.videoIFrame.setAttribute('src', '');
      super.closeModal();
    }

  } // Find all video-modals and created handler objects


  const modals = document.querySelectorAll(VIDEO_MODAL_WRAPPER_SELECTOR);
  modals.forEach(modal => {
    // Create a new item to modify
    const DOMItem = modal; // Attach the modal instance to our DOM Item

    if (!DOMItem.modal) {
      DOMItem.modal = new VideoModal(modal);
    }
  });
}

_videoModal();

/***/ }),

/***/ 19662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isCallable = __webpack_require__(60614);
var tryToString = __webpack_require__(66330);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 39483:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isConstructor = __webpack_require__(4411);
var tryToString = __webpack_require__(66330);

var TypeError = global.TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ 96077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isCallable = __webpack_require__(60614);

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 51223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(70030);
var definePropertyModule = __webpack_require__(3070);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 31530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(28710).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 25787:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isPrototypeOf = __webpack_require__(47976);

var TypeError = global.TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};


/***/ }),

/***/ 19670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isObject = __webpack_require__(70111);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 24019:
/***/ (function(module) {

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ 7556:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = __webpack_require__(47293);

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});


/***/ }),

/***/ 90260:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(24019);
var DESCRIPTORS = __webpack_require__(19781);
var global = __webpack_require__(17854);
var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);
var hasOwn = __webpack_require__(92597);
var classof = __webpack_require__(70648);
var tryToString = __webpack_require__(66330);
var createNonEnumerableProperty = __webpack_require__(68880);
var redefine = __webpack_require__(31320);
var defineProperty = __webpack_require__(3070).f;
var isPrototypeOf = __webpack_require__(47976);
var getPrototypeOf = __webpack_require__(79518);
var setPrototypeOf = __webpack_require__(27674);
var wellKnownSymbol = __webpack_require__(5112);
var uid = __webpack_require__(69711);

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = uid('TYPED_ARRAY_CONSTRUCTOR');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) { /* empty */ }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ 13331:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var DESCRIPTORS = __webpack_require__(19781);
var NATIVE_ARRAY_BUFFER = __webpack_require__(24019);
var FunctionName = __webpack_require__(76530);
var createNonEnumerableProperty = __webpack_require__(68880);
var redefineAll = __webpack_require__(12248);
var fails = __webpack_require__(47293);
var anInstance = __webpack_require__(25787);
var toIntegerOrInfinity = __webpack_require__(19303);
var toLength = __webpack_require__(17466);
var toIndex = __webpack_require__(57067);
var IEEE754 = __webpack_require__(11179);
var getPrototypeOf = __webpack_require__(79518);
var setPrototypeOf = __webpack_require__(27674);
var getOwnPropertyNames = __webpack_require__(8006).f;
var defineProperty = __webpack_require__(3070).f;
var arrayFill = __webpack_require__(21285);
var arraySlice = __webpack_require__(50206);
var setToStringTag = __webpack_require__(58003);
var InternalStateModule = __webpack_require__(29909);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var Array = global.Array;
var RangeError = global.RangeError;
var fill = uncurryThis(arrayFill);
var reverse = uncurryThis([].reverse);

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, ArrayBufferPrototype);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: fill(Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, DataViewPrototype);
    anInstance(buffer, ArrayBufferPrototype);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      return new NativeArrayBuffer(toIndex(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf(DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = uncurryThis(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ 1048:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(47908);
var toAbsoluteIndex = __webpack_require__(51400);
var lengthOfArrayLike = __webpack_require__(26244);

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = lengthOfArrayLike(O);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ 21285:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(47908);
var toAbsoluteIndex = __webpack_require__(51400);
var lengthOfArrayLike = __webpack_require__(26244);

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 18533:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(42092).forEach;
var arrayMethodIsStrict = __webpack_require__(9341);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ 97745:
/***/ (function(module) {

module.exports = function (Constructor, list) {
  var index = 0;
  var length = list.length;
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),

/***/ 48457:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var bind = __webpack_require__(49974);
var call = __webpack_require__(46916);
var toObject = __webpack_require__(47908);
var callWithSafeIterationClosing = __webpack_require__(53411);
var isArrayIteratorMethod = __webpack_require__(97659);
var isConstructor = __webpack_require__(4411);
var lengthOfArrayLike = __webpack_require__(26244);
var createProperty = __webpack_require__(86135);
var getIterator = __webpack_require__(18554);
var getIteratorMethod = __webpack_require__(71246);

var Array = global.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 41318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(45656);
var toAbsoluteIndex = __webpack_require__(51400);
var lengthOfArrayLike = __webpack_require__(26244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 42092:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(49974);
var uncurryThis = __webpack_require__(1702);
var IndexedObject = __webpack_require__(68361);
var toObject = __webpack_require__(47908);
var lengthOfArrayLike = __webpack_require__(26244);
var arraySpeciesCreate = __webpack_require__(65417);

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 86583:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-array-prototype-lastindexof -- safe */
var apply = __webpack_require__(22104);
var toIndexedObject = __webpack_require__(45656);
var toIntegerOrInfinity = __webpack_require__(19303);
var lengthOfArrayLike = __webpack_require__(26244);
var arrayMethodIsStrict = __webpack_require__(9341);

var min = Math.min;
var $lastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = lengthOfArrayLike(O);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf;


/***/ }),

/***/ 81194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 9341:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(47293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 53671:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var aCallable = __webpack_require__(19662);
var toObject = __webpack_require__(47908);
var IndexedObject = __webpack_require__(68361);
var lengthOfArrayLike = __webpack_require__(26244);

var TypeError = global.TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ 50206:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 94362:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySlice = __webpack_require__(50206);

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ 77475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isArray = __webpack_require__(43157);
var isConstructor = __webpack_require__(4411);
var isObject = __webpack_require__(70111);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 65417:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__(77475);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 53411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(19670);
var iteratorClose = __webpack_require__(99212);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 17072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 84326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 70648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var TO_STRING_TAG_SUPPORT = __webpack_require__(51694);
var isCallable = __webpack_require__(60614);
var classofRaw = __webpack_require__(84326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 77741:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var arraySlice = __webpack_require__(50206);

var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var join = uncurryThis([].join);

var TEST = (function (arg) { return String(Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);
var IS_FIREFOX_OR_SAFARI_STACK = /@[^\n]*\n/.test(TEST) && !/zxcasd/.test(TEST);

module.exports = function (stack, dropEntries) {
  if (typeof stack != 'string') return stack;
  if (IS_V8_OR_CHAKRA_STACK) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } else if (IS_FIREFOX_OR_SAFARI_STACK) {
    return join(arraySlice(split(stack, '\n'), dropEntries), '\n');
  } return stack;
};


/***/ }),

/***/ 95631:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(3070).f;
var create = __webpack_require__(70030);
var redefineAll = __webpack_require__(12248);
var bind = __webpack_require__(49974);
var anInstance = __webpack_require__(25787);
var iterate = __webpack_require__(20408);
var defineIterator = __webpack_require__(70654);
var setSpecies = __webpack_require__(96340);
var DESCRIPTORS = __webpack_require__(19781);
var fastKey = __webpack_require__(62423).fastKey;
var InternalStateModule = __webpack_require__(29909);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(Prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ 29320:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(1702);
var redefineAll = __webpack_require__(12248);
var getWeakData = __webpack_require__(62423).getWeakData;
var anObject = __webpack_require__(19670);
var isObject = __webpack_require__(70111);
var anInstance = __webpack_require__(25787);
var iterate = __webpack_require__(20408);
var ArrayIterationModule = __webpack_require__(42092);
var hasOwn = __webpack_require__(92597);
var InternalStateModule = __webpack_require__(29909);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var splice = uncurryThis([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice(this.entries, index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwn(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn(data, state.id);
      }
    });

    redefineAll(Prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return Constructor;
  }
};


/***/ }),

/***/ 77710:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var isForced = __webpack_require__(54705);
var redefine = __webpack_require__(31320);
var InternalMetadataModule = __webpack_require__(62423);
var iterate = __webpack_require__(20408);
var anInstance = __webpack_require__(25787);
var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);
var fails = __webpack_require__(47293);
var checkCorrectnessOfIteration = __webpack_require__(17072);
var setToStringTag = __webpack_require__(58003);
var inheritIfRequired = __webpack_require__(79587);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ 99920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(92597);
var ownKeys = __webpack_require__(53887);
var getOwnPropertyDescriptorModule = __webpack_require__(31236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 84964:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 49920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 14230:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(84488);
var toString = __webpack_require__(41340);

var quot = /"/g;
var replace = uncurryThis(''.replace);

// `CreateHTML` abstract operation
// https://tc39.es/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = toString(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + replace(toString(value), quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};


/***/ }),

/***/ 24994:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(13383).IteratorPrototype;
var create = __webpack_require__(70030);
var createPropertyDescriptor = __webpack_require__(79114);
var setToStringTag = __webpack_require__(58003);
var Iterators = __webpack_require__(97497);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 68880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(79114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 79114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 86135:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__(34948);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(79114);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 85573:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);
var padStart = __webpack_require__(76650).start;

var RangeError = global.RangeError;
var abs = Math.abs;
var DatePrototype = Date.prototype;
var n$DateToISOString = DatePrototype.toISOString;
var getTime = uncurryThis(DatePrototype.getTime);
var getUTCDate = uncurryThis(DatePrototype.getUTCDate);
var getUTCFullYear = uncurryThis(DatePrototype.getUTCFullYear);
var getUTCHours = uncurryThis(DatePrototype.getUTCHours);
var getUTCMilliseconds = uncurryThis(DatePrototype.getUTCMilliseconds);
var getUTCMinutes = uncurryThis(DatePrototype.getUTCMinutes);
var getUTCMonth = uncurryThis(DatePrototype.getUTCMonth);
var getUTCSeconds = uncurryThis(DatePrototype.getUTCSeconds);

// `Date.prototype.toISOString` method implementation
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:
module.exports = (fails(function () {
  return n$DateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  n$DateToISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime(this))) throw RangeError('Invalid time value');
  var date = this;
  var year = getUTCFullYear(date);
  var milliseconds = getUTCMilliseconds(date);
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + padStart(abs(year), sign ? 6 : 4, 0) +
    '-' + padStart(getUTCMonth(date) + 1, 2, 0) +
    '-' + padStart(getUTCDate(date), 2, 0) +
    'T' + padStart(getUTCHours(date), 2, 0) +
    ':' + padStart(getUTCMinutes(date), 2, 0) +
    ':' + padStart(getUTCSeconds(date), 2, 0) +
    '.' + padStart(milliseconds, 3, 0) +
    'Z';
} : n$DateToISOString;


/***/ }),

/***/ 38709:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var anObject = __webpack_require__(19670);
var ordinaryToPrimitive = __webpack_require__(92140);

var TypeError = global.TypeError;

// `Date.prototype[@@toPrimitive](hint)` method implementation
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
module.exports = function (hint) {
  anObject(this);
  if (hint === 'string' || hint === 'default') hint = 'string';
  else if (hint !== 'number') throw TypeError('Incorrect hint');
  return ordinaryToPrimitive(this, hint);
};


/***/ }),

/***/ 70654:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var call = __webpack_require__(46916);
var IS_PURE = __webpack_require__(31913);
var FunctionName = __webpack_require__(76530);
var isCallable = __webpack_require__(60614);
var createIteratorConstructor = __webpack_require__(24994);
var getPrototypeOf = __webpack_require__(79518);
var setPrototypeOf = __webpack_require__(27674);
var setToStringTag = __webpack_require__(58003);
var createNonEnumerableProperty = __webpack_require__(68880);
var redefine = __webpack_require__(31320);
var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(97497);
var IteratorsCore = __webpack_require__(13383);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 97235:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(40857);
var hasOwn = __webpack_require__(92597);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineProperty = __webpack_require__(3070).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 19781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 80317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isObject = __webpack_require__(70111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 48324:
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 98509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(80317);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 68886:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(88113);

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ 7871:
/***/ (function(module) {

module.exports = typeof window == 'object';


/***/ }),

/***/ 30256:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var UA = __webpack_require__(88113);

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ 71528:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(88113);
var global = __webpack_require__(17854);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ 6833:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(88113);

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 35268:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(84326);
var global = __webpack_require__(17854);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 71036:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(88113);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ 88113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(35005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var userAgent = __webpack_require__(88113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 98008:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(88113);

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ 80748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 22914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var createPropertyDescriptor = __webpack_require__(79114);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 82109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var getOwnPropertyDescriptor = __webpack_require__(31236).f;
var createNonEnumerableProperty = __webpack_require__(68880);
var redefine = __webpack_require__(31320);
var setGlobal = __webpack_require__(83505);
var copyConstructorProperties = __webpack_require__(99920);
var isForced = __webpack_require__(54705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 47293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 27007:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(74916);
var uncurryThis = __webpack_require__(1702);
var redefine = __webpack_require__(31320);
var regexpExec = __webpack_require__(22261);
var fails = __webpack_require__(47293);
var wellKnownSymbol = __webpack_require__(5112);
var createNonEnumerableProperty = __webpack_require__(68880);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 6790:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var isArray = __webpack_require__(43157);
var lengthOfArrayLike = __webpack_require__(26244);
var bind = __webpack_require__(49974);

var TypeError = global.TypeError;

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;


/***/ }),

/***/ 76677:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ 22104:
/***/ (function(module) {

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (bind ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 49974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(19662);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : bind ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 27065:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(19662);
var isObject = __webpack_require__(70111);
var hasOwn = __webpack_require__(92597);
var arraySlice = __webpack_require__(50206);

var Function = global.Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};


/***/ }),

/***/ 46916:
/***/ (function(module) {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 76530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var hasOwn = __webpack_require__(92597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module) {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 35005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isCallable = __webpack_require__(60614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 71246:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(70648);
var getMethod = __webpack_require__(58173);
var Iterators = __webpack_require__(97497);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 18554:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var aCallable = __webpack_require__(19662);
var anObject = __webpack_require__(19670);
var tryToString = __webpack_require__(66330);
var getIteratorMethod = __webpack_require__(71246);

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 58173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(19662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 10647:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(47908);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 17854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 92597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(47908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 842:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ 60490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(35005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 64664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var fails = __webpack_require__(47293);
var createElement = __webpack_require__(80317);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 11179:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// IEEE754 conversions based on https://github.com/feross/ieee754
var global = __webpack_require__(17854);

var Array = global.Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ 68361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);
var classof = __webpack_require__(84326);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 79587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);
var setPrototypeOf = __webpack_require__(27674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 42788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(60614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 58340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(70111);
var createNonEnumerableProperty = __webpack_require__(68880);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 62423:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var hiddenKeys = __webpack_require__(3501);
var isObject = __webpack_require__(70111);
var hasOwn = __webpack_require__(92597);
var defineProperty = __webpack_require__(3070).f;
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternalModule = __webpack_require__(1156);
var isExtensible = __webpack_require__(52050);
var uid = __webpack_require__(69711);
var FREEZING = __webpack_require__(76677);

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ 29909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(68536);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(70111);
var createNonEnumerableProperty = __webpack_require__(68880);
var hasOwn = __webpack_require__(92597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 97659:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(97497);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 43157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(84326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 60614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);
var isCallable = __webpack_require__(60614);
var classof = __webpack_require__(70648);
var getBuiltIn = __webpack_require__(35005);
var inspectSource = __webpack_require__(42788);

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 45032:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(92597);

module.exports = function (descriptor) {
  return descriptor !== undefined && (hasOwn(descriptor, 'value') || hasOwn(descriptor, 'writable'));
};


/***/ }),

/***/ 54705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var isCallable = __webpack_require__(60614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 55988:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(70111);

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 70111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(60614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 31913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 47850:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(70111);
var classof = __webpack_require__(84326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 52190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var getBuiltIn = __webpack_require__(35005);
var isCallable = __webpack_require__(60614);
var isPrototypeOf = __webpack_require__(47976);
var USE_SYMBOL_AS_UID = __webpack_require__(43307);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 20408:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var bind = __webpack_require__(49974);
var call = __webpack_require__(46916);
var anObject = __webpack_require__(19670);
var tryToString = __webpack_require__(66330);
var isArrayIteratorMethod = __webpack_require__(97659);
var lengthOfArrayLike = __webpack_require__(26244);
var isPrototypeOf = __webpack_require__(47976);
var getIterator = __webpack_require__(18554);
var getIteratorMethod = __webpack_require__(71246);
var iteratorClose = __webpack_require__(99212);

var TypeError = global.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 99212:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(46916);
var anObject = __webpack_require__(19670);
var getMethod = __webpack_require__(58173);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 13383:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(47293);
var isCallable = __webpack_require__(60614);
var create = __webpack_require__(70030);
var getPrototypeOf = __webpack_require__(79518);
var redefine = __webpack_require__(31320);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(31913);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 97497:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 26244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(17466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 66736:
/***/ (function(module) {

// eslint-disable-next-line es/no-math-expm1 -- safe
var $expm1 = Math.expm1;
var exp = Math.exp;

// `Math.expm1` method implementation
// https://tc39.es/ecma262/#sec-math.expm1
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
} : $expm1;


/***/ }),

/***/ 26130:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var sign = __webpack_require__(64310);

var abs = Math.abs;
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

// `Math.fround` method implementation
// https://tc39.es/ecma262/#sec-math.fround
// eslint-disable-next-line es/no-math-fround -- safe
module.exports = Math.fround || function fround(x) {
  var $abs = abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ 26513:
/***/ (function(module) {

var log = Math.log;

// `Math.log1p` method implementation
// https://tc39.es/ecma262/#sec-math.log1p
// eslint-disable-next-line es/no-math-log1p -- safe
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
};


/***/ }),

/***/ 64310:
/***/ (function(module) {

// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ 95948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var bind = __webpack_require__(49974);
var getOwnPropertyDescriptor = __webpack_require__(31236).f;
var macrotask = __webpack_require__(20261).set;
var IS_IOS = __webpack_require__(6833);
var IS_IOS_PEBBLE = __webpack_require__(71528);
var IS_WEBOS_WEBKIT = __webpack_require__(71036);
var IS_NODE = __webpack_require__(35268);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 13366:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);

module.exports = global.Promise;


/***/ }),

/***/ 30133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(47293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 590:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(31913);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ 68536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isCallable = __webpack_require__(60614);
var inspectSource = __webpack_require__(42788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 78523:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(19662);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 56277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(41340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 3929:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isRegExp = __webpack_require__(47850);

var TypeError = global.TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 77023:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);

var globalIsFinite = global.isFinite;

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
// eslint-disable-next-line es/no-number-isfinite -- safe
module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};


/***/ }),

/***/ 2814:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var fails = __webpack_require__(47293);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(41340);
var trim = __webpack_require__(53111).trim;
var whitespaces = __webpack_require__(81361);

var charAt = uncurryThis(''.charAt);
var n$ParseFloat = global.parseFloat;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var FORCED = 1 / n$ParseFloat(whitespaces + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { n$ParseFloat(Object(ITERATOR)); }));

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(toString(string));
  var result = n$ParseFloat(trimmedString);
  return result === 0 && charAt(trimmedString, 0) == '-' ? -0 : result;
} : n$ParseFloat;


/***/ }),

/***/ 83009:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var fails = __webpack_require__(47293);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(41340);
var trim = __webpack_require__(53111).trim;
var whitespaces = __webpack_require__(81361);

var $parseInt = global.parseInt;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var hex = /^[+-]?0x/i;
var exec = uncurryThis(hex.exec);
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(toString(string));
  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ 21574:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(19781);
var uncurryThis = __webpack_require__(1702);
var call = __webpack_require__(46916);
var fails = __webpack_require__(47293);
var objectKeys = __webpack_require__(81956);
var getOwnPropertySymbolsModule = __webpack_require__(25181);
var propertyIsEnumerableModule = __webpack_require__(55296);
var toObject = __webpack_require__(47908);
var IndexedObject = __webpack_require__(68361);

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 70030:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(19670);
var defineProperties = __webpack_require__(36048);
var enumBugKeys = __webpack_require__(80748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(60490);
var documentCreateElement = __webpack_require__(80317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 36048:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(19670);
var toIndexedObject = __webpack_require__(45656);
var objectKeys = __webpack_require__(81956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(17854);
var DESCRIPTORS = __webpack_require__(19781);
var IE8_DOM_DEFINE = __webpack_require__(64664);
var anObject = __webpack_require__(19670);
var toPropertyKey = __webpack_require__(34948);

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 31236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var call = __webpack_require__(46916);
var propertyIsEnumerableModule = __webpack_require__(55296);
var createPropertyDescriptor = __webpack_require__(79114);
var toIndexedObject = __webpack_require__(45656);
var toPropertyKey = __webpack_require__(34948);
var hasOwn = __webpack_require__(92597);
var IE8_DOM_DEFINE = __webpack_require__(64664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 1156:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(84326);
var toIndexedObject = __webpack_require__(45656);
var $getOwnPropertyNames = __webpack_require__(8006).f;
var arraySlice = __webpack_require__(50206);

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(16324);
var enumBugKeys = __webpack_require__(80748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 25181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 79518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var hasOwn = __webpack_require__(92597);
var isCallable = __webpack_require__(60614);
var toObject = __webpack_require__(47908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(49920);

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 52050:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var isObject = __webpack_require__(70111);
var classof = __webpack_require__(84326);
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(7556);

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;


/***/ }),

/***/ 47976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 16324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(92597);
var toIndexedObject = __webpack_require__(45656);
var indexOf = __webpack_require__(41318).indexOf;
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 81956:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(16324);
var enumBugKeys = __webpack_require__(80748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 55296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 69026:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IS_PURE = __webpack_require__(31913);
var global = __webpack_require__(17854);
var fails = __webpack_require__(47293);
var WEBKIT = __webpack_require__(98008);

// Forced replacement object prototype accessors methods
module.exports = IS_PURE || !fails(function () {
  // This feature detection crashes old WebKit
  // https://github.com/zloirock/core-js/issues/232
  if (WEBKIT && WEBKIT < 535) return;
  var key = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call -- required for testing
  __defineSetter__.call(null, key, function () { /* empty */ });
  delete global[key];
});


/***/ }),

/***/ 27674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(19670);
var aPossiblePrototype = __webpack_require__(96077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 44699:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var uncurryThis = __webpack_require__(1702);
var objectKeys = __webpack_require__(81956);
var toIndexedObject = __webpack_require__(45656);
var $propertyIsEnumerable = __webpack_require__(55296).f;

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),

/***/ 90288:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(51694);
var classof = __webpack_require__(70648);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ 92140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 53887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(35005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(25181);
var anObject = __webpack_require__(19670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 40857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);

module.exports = global;


/***/ }),

/***/ 12534:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 69478:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(19670);
var isObject = __webpack_require__(70111);
var newPromiseCapability = __webpack_require__(78523);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 12248:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var redefine = __webpack_require__(31320);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 31320:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var isCallable = __webpack_require__(60614);
var hasOwn = __webpack_require__(92597);
var createNonEnumerableProperty = __webpack_require__(68880);
var setGlobal = __webpack_require__(83505);
var inspectSource = __webpack_require__(42788);
var InternalStateModule = __webpack_require__(29909);
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__(76530).CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 97651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var anObject = __webpack_require__(19670);
var isCallable = __webpack_require__(60614);
var classof = __webpack_require__(84326);
var regexpExec = __webpack_require__(22261);

var TypeError = global.TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ 22261:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(41340);
var regexpFlags = __webpack_require__(67066);
var stickyHelpers = __webpack_require__(52999);
var shared = __webpack_require__(72309);
var create = __webpack_require__(70030);
var getInternalState = __webpack_require__(29909).get;
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(38173);

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 67066:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(19670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 52999:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var global = __webpack_require__(17854);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

exports.UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 9441:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var global = __webpack_require__(17854);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 38173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);
var global = __webpack_require__(17854);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 84488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 81150:
/***/ (function(module) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ 83505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 96340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(35005);
var definePropertyModule = __webpack_require__(3070);
var wellKnownSymbol = __webpack_require__(5112);
var DESCRIPTORS = __webpack_require__(19781);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 58003:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(3070).f;
var hasOwn = __webpack_require__(92597);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(72309);
var uid = __webpack_require__(69711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var setGlobal = __webpack_require__(83505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 72309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(31913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 36707:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(19670);
var aConstructor = __webpack_require__(39483);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ 43429:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(47293);

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};


/***/ }),

/***/ 28710:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toIntegerOrInfinity = __webpack_require__(19303);
var toString = __webpack_require__(41340);
var requireObjectCoercible = __webpack_require__(84488);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 54986:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// https://github.com/zloirock/core-js/issues/280
var userAgent = __webpack_require__(88113);

module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);


/***/ }),

/***/ 76650:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var uncurryThis = __webpack_require__(1702);
var toLength = __webpack_require__(17466);
var toString = __webpack_require__(41340);
var $repeat = __webpack_require__(38415);
var requireObjectCoercible = __webpack_require__(84488);

var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var intMaxLength = toLength(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};


/***/ }),

/***/ 33197:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var RangeError = global.RangeError;
var exec = uncurryThis(regexSeparators.exec);
var floor = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var toLowerCase = uncurryThis(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push(output, value);
        counter--;
      }
    } else {
      push(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line max-statements -- TODO
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        push(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return join(output, '');
};

module.exports = function (input) {
  var encoded = [];
  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join(encoded, '.');
};


/***/ }),

/***/ 38415:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var toIntegerOrInfinity = __webpack_require__(19303);
var toString = __webpack_require__(41340);
var requireObjectCoercible = __webpack_require__(84488);

var RangeError = global.RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ 76091:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var PROPER_FUNCTION_NAME = __webpack_require__(76530).PROPER;
var fails = __webpack_require__(47293);
var whitespaces = __webpack_require__(81361);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};


/***/ }),

/***/ 53111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(84488);
var toString = __webpack_require__(41340);
var whitespaces = __webpack_require__(81361);

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 20261:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var apply = __webpack_require__(22104);
var bind = __webpack_require__(49974);
var isCallable = __webpack_require__(60614);
var hasOwn = __webpack_require__(92597);
var fails = __webpack_require__(47293);
var html = __webpack_require__(60490);
var arraySlice = __webpack_require__(50206);
var createElement = __webpack_require__(80317);
var IS_IOS = __webpack_require__(6833);
var IS_NODE = __webpack_require__(35268);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(isCallable(fn) ? fn : Function(fn), undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 50863:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ 51400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(19303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 57067:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var toIntegerOrInfinity = __webpack_require__(19303);
var toLength = __webpack_require__(17466);

var RangeError = global.RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ 45656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(68361);
var requireObjectCoercible = __webpack_require__(84488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 19303:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 17466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(19303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 47908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var requireObjectCoercible = __webpack_require__(84488);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 84590:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var toPositiveInteger = __webpack_require__(73002);

var RangeError = global.RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ 73002:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var toIntegerOrInfinity = __webpack_require__(19303);

var RangeError = global.RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ 57593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var isObject = __webpack_require__(70111);
var isSymbol = __webpack_require__(52190);
var getMethod = __webpack_require__(58173);
var ordinaryToPrimitive = __webpack_require__(92140);
var wellKnownSymbol = __webpack_require__(5112);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 34948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(57593);
var isSymbol = __webpack_require__(52190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 51694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 41340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var classof = __webpack_require__(70648);

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 66330:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 19843:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var DESCRIPTORS = __webpack_require__(19781);
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(63832);
var ArrayBufferViewCore = __webpack_require__(90260);
var ArrayBufferModule = __webpack_require__(13331);
var anInstance = __webpack_require__(25787);
var createPropertyDescriptor = __webpack_require__(79114);
var createNonEnumerableProperty = __webpack_require__(68880);
var isIntegralNumber = __webpack_require__(55988);
var toLength = __webpack_require__(17466);
var toIndex = __webpack_require__(57067);
var toOffset = __webpack_require__(84590);
var toPropertyKey = __webpack_require__(34948);
var hasOwn = __webpack_require__(92597);
var classof = __webpack_require__(70648);
var isObject = __webpack_require__(70111);
var isSymbol = __webpack_require__(52190);
var create = __webpack_require__(70030);
var isPrototypeOf = __webpack_require__(47976);
var setPrototypeOf = __webpack_require__(27674);
var getOwnPropertyNames = __webpack_require__(8006).f;
var typedArrayFrom = __webpack_require__(97321);
var forEach = __webpack_require__(42092).forEach;
var setSpecies = __webpack_require__(96340);
var definePropertyModule = __webpack_require__(3070);
var getOwnPropertyDescriptorModule = __webpack_require__(31236);
var InternalStateModule = __webpack_require__(29909);
var inheritIfRequired = __webpack_require__(79587);

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  aTypedArrayConstructor(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol(key)
    && key in target
    && isIntegralNumber(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key)
    && isObject(descriptor)
    && hasOwn(descriptor, 'value')
    && !hasOwn(descriptor, 'get')
    && !hasOwn(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!hasOwn(descriptor, 'writable') || descriptor.writable)
    && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ 63832:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-new -- required for testing */
var global = __webpack_require__(17854);
var fails = __webpack_require__(47293);
var checkCorrectnessOfIteration = __webpack_require__(17072);
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__(90260).NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ 43074:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayFromConstructorAndList = __webpack_require__(97745);
var typedArraySpeciesConstructor = __webpack_require__(66304);

module.exports = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};


/***/ }),

/***/ 97321:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(49974);
var call = __webpack_require__(46916);
var aConstructor = __webpack_require__(39483);
var toObject = __webpack_require__(47908);
var lengthOfArrayLike = __webpack_require__(26244);
var getIterator = __webpack_require__(18554);
var getIteratorMethod = __webpack_require__(71246);
var isArrayIteratorMethod = __webpack_require__(97659);
var aTypedArrayConstructor = __webpack_require__(90260).aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = call(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike(O);
  result = new (aTypedArrayConstructor(C))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ 66304:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ArrayBufferViewCore = __webpack_require__(90260);
var speciesConstructor = __webpack_require__(36707);

var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
module.exports = function (originalArray) {
  return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
};


/***/ }),

/***/ 69711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 43307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(30133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 6061:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

exports.f = wellKnownSymbol;


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var shared = __webpack_require__(72309);
var hasOwn = __webpack_require__(92597);
var uid = __webpack_require__(69711);
var NATIVE_SYMBOL = __webpack_require__(30133);
var USE_SYMBOL_AS_UID = __webpack_require__(43307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 81361:
/***/ (function(module) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 9170:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var isPrototypeOf = __webpack_require__(47976);
var getPrototypeOf = __webpack_require__(79518);
var setPrototypeOf = __webpack_require__(27674);
var copyConstructorProperties = __webpack_require__(99920);
var create = __webpack_require__(70030);
var createNonEnumerableProperty = __webpack_require__(68880);
var createPropertyDescriptor = __webpack_require__(79114);
var clearErrorStack = __webpack_require__(77741);
var installErrorCause = __webpack_require__(58340);
var iterate = __webpack_require__(20408);
var normalizeStringArgument = __webpack_require__(56277);
var wellKnownSymbol = __webpack_require__(5112);
var ERROR_STACK_INSTALLABLE = __webpack_require__(22914);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Error = global.Error;
var push = [].push;

var $AggregateError = function AggregateError(errors, message /* , options */) {
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
  var that;
  if (setPrototypeOf) {
    that = setPrototypeOf(new Error(undefined), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
  } else {
    that = isInstance ? this : create(AggregateErrorPrototype);
    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
  }
  createNonEnumerableProperty(that, 'message', normalizeStringArgument(message, ''));
  if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(that, 'stack', clearErrorStack(that.stack, 1));
  installErrorCause(that, options);
  var errorsArray = [];
  iterate(errors, push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

if (setPrototypeOf) setPrototypeOf($AggregateError, Error);
else copyConstructorProperties($AggregateError, Error);

var AggregateErrorPrototype = $AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(1, $AggregateError),
  message: createPropertyDescriptor(1, ''),
  name: createPropertyDescriptor(1, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({ global: true }, {
  AggregateError: $AggregateError
});


/***/ }),

/***/ 18264:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var arrayBufferModule = __webpack_require__(13331);
var setSpecies = __webpack_require__(96340);

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.es/ecma262/#sec-arraybuffer-constructor
$({ global: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
  ArrayBuffer: ArrayBuffer
});

setSpecies(ARRAY_BUFFER);


/***/ }),

/***/ 76938:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var ArrayBufferViewCore = __webpack_require__(90260);

var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

// `ArrayBuffer.isView` method
// https://tc39.es/ecma262/#sec-arraybuffer.isview
$({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
  isView: ArrayBufferViewCore.isView
});


/***/ }),

/***/ 39575:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);
var ArrayBufferModule = __webpack_require__(13331);
var anObject = __webpack_require__(19670);
var toAbsoluteIndex = __webpack_require__(51400);
var toLength = __webpack_require__(17466);
var speciesConstructor = __webpack_require__(36707);

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var DataViewPrototype = DataView.prototype;
var un$ArrayBufferSlice = uncurryThis(ArrayBuffer.prototype.slice);
var getUint8 = uncurryThis(DataViewPrototype.getUint8);
var setUint8 = uncurryThis(DataViewPrototype.setUint8);

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (un$ArrayBufferSlice && end === undefined) {
      return un$ArrayBufferSlice(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    } return result;
  }
});


/***/ }),

/***/ 52262:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var toObject = __webpack_require__(47908);
var lengthOfArrayLike = __webpack_require__(26244);
var toIntegerOrInfinity = __webpack_require__(19303);
var addToUnscopables = __webpack_require__(51223);

// `Array.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables('at');


/***/ }),

/***/ 92222:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var fails = __webpack_require__(47293);
var isArray = __webpack_require__(43157);
var isObject = __webpack_require__(70111);
var toObject = __webpack_require__(47908);
var lengthOfArrayLike = __webpack_require__(26244);
var createProperty = __webpack_require__(86135);
var arraySpeciesCreate = __webpack_require__(65417);
var arrayMethodHasSpeciesSupport = __webpack_require__(81194);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 50545:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var copyWithin = __webpack_require__(1048);
var addToUnscopables = __webpack_require__(51223);

// `Array.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
$({ target: 'Array', proto: true }, {
  copyWithin: copyWithin
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('copyWithin');


/***/ }),

/***/ 26541:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $every = __webpack_require__(42092).every;
var arrayMethodIsStrict = __webpack_require__(9341);

var STRICT_METHOD = arrayMethodIsStrict('every');

// `Array.prototype.every` method
// https://tc39.es/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 43290:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fill = __webpack_require__(21285);
var addToUnscopables = __webpack_require__(51223);

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ 57327:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $filter = __webpack_require__(42092).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(81194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 34553:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $findIndex = __webpack_require__(42092).findIndex;
var addToUnscopables = __webpack_require__(51223);

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ }),

/***/ 69826:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $find = __webpack_require__(42092).find;
var addToUnscopables = __webpack_require__(51223);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ 86535:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var flattenIntoArray = __webpack_require__(6790);
var aCallable = __webpack_require__(19662);
var toObject = __webpack_require__(47908);
var lengthOfArrayLike = __webpack_require__(26244);
var arraySpeciesCreate = __webpack_require__(65417);

// `Array.prototype.flatMap` method
// https://tc39.es/ecma262/#sec-array.prototype.flatmap
$({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A;
    aCallable(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});


/***/ }),

/***/ 84944:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var flattenIntoArray = __webpack_require__(6790);
var toObject = __webpack_require__(47908);
var lengthOfArrayLike = __webpack_require__(26244);
var toIntegerOrInfinity = __webpack_require__(19303);
var arraySpeciesCreate = __webpack_require__(65417);

// `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});


/***/ }),

/***/ 89554:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var forEach = __webpack_require__(18533);

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ 91038:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var from = __webpack_require__(48457);
var checkCorrectnessOfIteration = __webpack_require__(17072);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ 26699:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $includes = __webpack_require__(41318).includes;
var addToUnscopables = __webpack_require__(51223);

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 82772:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var $IndexOf = __webpack_require__(41318).indexOf;
var arrayMethodIsStrict = __webpack_require__(9341);

var un$IndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0
      : $IndexOf(this, searchElement, fromIndex);
  }
});


/***/ }),

/***/ 79753:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var isArray = __webpack_require__(43157);

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});


/***/ }),

/***/ 66992:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(45656);
var addToUnscopables = __webpack_require__(51223);
var Iterators = __webpack_require__(97497);
var InternalStateModule = __webpack_require__(29909);
var defineIterator = __webpack_require__(70654);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 69600:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var IndexedObject = __webpack_require__(68361);
var toIndexedObject = __webpack_require__(45656);
var arrayMethodIsStrict = __webpack_require__(9341);

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 94986:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var lastIndexOf = __webpack_require__(86583);

// `Array.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
// eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});


/***/ }),

/***/ 21249:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $map = __webpack_require__(42092).map;
var arrayMethodHasSpeciesSupport = __webpack_require__(81194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 26572:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var fails = __webpack_require__(47293);
var isConstructor = __webpack_require__(4411);
var createProperty = __webpack_require__(86135);

var Array = global.Array;

var ISNT_GENERIC = fails(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
});

// `Array.of` method
// https://tc39.es/ecma262/#sec-array.of
// WebKit Array.of isn't generic
$({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
  of: function of(/* ...args */) {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (isConstructor(this) ? this : Array)(argumentsLength);
    while (argumentsLength > index) createProperty(result, index, arguments[index++]);
    result.length = argumentsLength;
    return result;
  }
});


/***/ }),

/***/ 96644:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $reduceRight = __webpack_require__(53671).right;
var arrayMethodIsStrict = __webpack_require__(9341);
var CHROME_VERSION = __webpack_require__(7392);
var IS_NODE = __webpack_require__(35268);

var STRICT_METHOD = arrayMethodIsStrict('reduceRight');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 85827:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $reduce = __webpack_require__(53671).left;
var arrayMethodIsStrict = __webpack_require__(9341);
var CHROME_VERSION = __webpack_require__(7392);
var IS_NODE = __webpack_require__(35268);

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 65069:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var isArray = __webpack_require__(43157);

var un$Reverse = uncurryThis([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return un$Reverse(this);
  }
});


/***/ }),

/***/ 47042:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var isArray = __webpack_require__(43157);
var isConstructor = __webpack_require__(4411);
var isObject = __webpack_require__(70111);
var toAbsoluteIndex = __webpack_require__(51400);
var lengthOfArrayLike = __webpack_require__(26244);
var toIndexedObject = __webpack_require__(45656);
var createProperty = __webpack_require__(86135);
var wellKnownSymbol = __webpack_require__(5112);
var arrayMethodHasSpeciesSupport = __webpack_require__(81194);
var un$Slice = __webpack_require__(50206);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ 5212:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $some = __webpack_require__(42092).some;
var arrayMethodIsStrict = __webpack_require__(9341);

var STRICT_METHOD = arrayMethodIsStrict('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 2707:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(19662);
var toObject = __webpack_require__(47908);
var lengthOfArrayLike = __webpack_require__(26244);
var toString = __webpack_require__(41340);
var fails = __webpack_require__(47293);
var internalSort = __webpack_require__(94362);
var arrayMethodIsStrict = __webpack_require__(9341);
var FF = __webpack_require__(68886);
var IE_OR_EDGE = __webpack_require__(30256);
var V8 = __webpack_require__(7392);
var WEBKIT = __webpack_require__(98008);

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});


/***/ }),

/***/ 38706:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var setSpecies = __webpack_require__(96340);

// `Array[@@species]` getter
// https://tc39.es/ecma262/#sec-get-array-@@species
setSpecies('Array');


/***/ }),

/***/ 40561:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var toAbsoluteIndex = __webpack_require__(51400);
var toIntegerOrInfinity = __webpack_require__(19303);
var lengthOfArrayLike = __webpack_require__(26244);
var toObject = __webpack_require__(47908);
var arraySpeciesCreate = __webpack_require__(65417);
var createProperty = __webpack_require__(86135);
var arrayMethodHasSpeciesSupport = __webpack_require__(81194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var TypeError = global.TypeError;
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ 99244:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(51223);

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flatMap');


/***/ }),

/***/ 33792:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(51223);

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flat');


/***/ }),

/***/ 16716:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var ArrayBufferModule = __webpack_require__(13331);
var NATIVE_ARRAY_BUFFER = __webpack_require__(24019);

// `DataView` constructor
// https://tc39.es/ecma262/#sec-dataview-constructor
$({ global: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: ArrayBufferModule.DataView
});


/***/ }),

/***/ 43016:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);

var FORCED = fails(function () {
  return new Date(16e11).getYear() !== 120;
});

var getFullYear = uncurryThis(Date.prototype.getFullYear);

// `Date.prototype.getYear` method
// https://tc39.es/ecma262/#sec-date.prototype.getyear
$({ target: 'Date', proto: true, forced: FORCED }, {
  getYear: function getYear() {
    return getFullYear(this) - 1900;
  }
});


/***/ }),

/***/ 3843:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);

var Date = global.Date;
var getTime = uncurryThis(Date.prototype.getTime);

// `Date.now` method
// https://tc39.es/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return getTime(new Date());
  }
});


/***/ }),

/***/ 81801:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var toIntegerOrInfinity = __webpack_require__(19303);

var DatePrototype = Date.prototype;
var getTime = uncurryThis(DatePrototype.getTime);
var setFullYear = uncurryThis(DatePrototype.setFullYear);

// `Date.prototype.setYear` method
// https://tc39.es/ecma262/#sec-date.prototype.setyear
$({ target: 'Date', proto: true }, {
  setYear: function setYear(year) {
    // validate
    getTime(this);
    var yi = toIntegerOrInfinity(year);
    var yyyy = 0 <= yi && yi <= 99 ? yi + 1900 : yi;
    return setFullYear(this, yyyy);
  }
});


/***/ }),

/***/ 9550:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// `Date.prototype.toGMTString` method
// https://tc39.es/ecma262/#sec-date.prototype.togmtstring
$({ target: 'Date', proto: true }, {
  toGMTString: Date.prototype.toUTCString
});


/***/ }),

/***/ 28733:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var toISOString = __webpack_require__(85573);

// `Date.prototype.toISOString` method
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
$({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});


/***/ }),

/***/ 5735:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);
var toObject = __webpack_require__(47908);
var toPrimitive = __webpack_require__(57593);

var FORCED = fails(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.es/ecma262/#sec-date.prototype.tojson
$({ target: 'Date', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O, 'number');
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),

/***/ 96078:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(92597);
var redefine = __webpack_require__(31320);
var dateToPrimitive = __webpack_require__(38709);
var wellKnownSymbol = __webpack_require__(5112);

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var DatePrototype = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
if (!hasOwn(DatePrototype, TO_PRIMITIVE)) {
  redefine(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
}


/***/ }),

/***/ 83710:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var redefine = __webpack_require__(31320);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var un$DateToString = uncurryThis(DatePrototype[TO_STRING]);
var getTime = uncurryThis(DatePrototype.getTime);

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? un$DateToString(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ 62130:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(41340);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var exec = uncurryThis(/./.exec);
var numberToString = uncurryThis(1.0.toString);
var toUpperCase = uncurryThis(''.toUpperCase);

var raw = /[\w*+\-./@]/;

var hex = function (code, length) {
  var result = numberToString(code, 16);
  while (result.length < length) result = '0' + result;
  return result;
};

// `escape` method
// https://tc39.es/ecma262/#sec-escape-string
$({ global: true }, {
  escape: function escape(string) {
    var str = toString(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, code;
    while (index < length) {
      chr = charAt(str, index++);
      if (exec(raw, chr)) {
        result += chr;
      } else {
        code = charCodeAt(chr, 0);
        if (code < 256) {
          result += '%' + hex(code, 2);
        } else {
          result += '%u' + toUpperCase(hex(code, 4));
        }
      }
    } return result;
  }
});


/***/ }),

/***/ 24812:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var bind = __webpack_require__(27065);

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});


/***/ }),

/***/ 4855:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);
var definePropertyModule = __webpack_require__(3070);
var getPrototypeOf = __webpack_require__(79518);
var wellKnownSymbol = __webpack_require__(5112);

var HAS_INSTANCE = wellKnownSymbol('hasInstance');
var FunctionPrototype = Function.prototype;

// `Function.prototype[@@hasInstance]` method
// https://tc39.es/ecma262/#sec-function.prototype-@@hasinstance
if (!(HAS_INSTANCE in FunctionPrototype)) {
  definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, { value: function (O) {
    if (!isCallable(this) || !isObject(O)) return false;
    var P = this.prototype;
    if (!isObject(P)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) if (P === O) return true;
    return false;
  } });
}


/***/ }),

/***/ 68309:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var FUNCTION_NAME_EXISTS = __webpack_require__(76530).EXISTS;
var uncurryThis = __webpack_require__(1702);
var defineProperty = __webpack_require__(3070).f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /^\s*function ([^ (]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 35837:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$({ global: true }, {
  globalThis: global
});


/***/ }),

/***/ 38862:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var getBuiltIn = __webpack_require__(35005);
var apply = __webpack_require__(22104);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);

var Array = global.Array;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      for (var i = 0, l = arguments.length, args = Array(l); i < l; i++) args[i] = arguments[i];
      var result = apply($stringify, null, args);
      return typeof result == 'string' ? replace(result, tester, fix) : result;
    }
  });
}


/***/ }),

/***/ 73706:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var setToStringTag = __webpack_require__(58003);

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ 51532:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(77710);
var collectionStrong = __webpack_require__(95631);

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 99752:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var log1p = __webpack_require__(26513);

// eslint-disable-next-line es/no-math-acosh -- required for testing
var $acosh = Math.acosh;
var log = Math.log;
var sqrt = Math.sqrt;
var LN2 = Math.LN2;

var FORCED = !$acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  || Math.floor($acosh(Number.MAX_VALUE)) != 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  || $acosh(Infinity) != Infinity;

// `Math.acosh` method
// https://tc39.es/ecma262/#sec-math.acosh
$({ target: 'Math', stat: true, forced: FORCED }, {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? log(x) + LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ 82376:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// eslint-disable-next-line es/no-math-asinh -- required for testing
var $asinh = Math.asinh;
var log = Math.log;
var sqrt = Math.sqrt;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}

// `Math.asinh` method
// https://tc39.es/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0
$({ target: 'Math', stat: true, forced: !($asinh && 1 / $asinh(0) > 0) }, {
  asinh: asinh
});


/***/ }),

/***/ 73181:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// eslint-disable-next-line es/no-math-atanh -- required for testing
var $atanh = Math.atanh;
var log = Math.log;

// `Math.atanh` method
// https://tc39.es/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0
$({ target: 'Math', stat: true, forced: !($atanh && 1 / $atanh(-0) < 0) }, {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ 23484:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var sign = __webpack_require__(64310);

var abs = Math.abs;
var pow = Math.pow;

// `Math.cbrt` method
// https://tc39.es/ecma262/#sec-math.cbrt
$({ target: 'Math', stat: true }, {
  cbrt: function cbrt(x) {
    return sign(x = +x) * pow(abs(x), 1 / 3);
  }
});


/***/ }),

/***/ 2388:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

var floor = Math.floor;
var log = Math.log;
var LOG2E = Math.LOG2E;

// `Math.clz32` method
// https://tc39.es/ecma262/#sec-math.clz32
$({ target: 'Math', stat: true }, {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * LOG2E) : 32;
  }
});


/***/ }),

/***/ 88621:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var expm1 = __webpack_require__(66736);

// eslint-disable-next-line es/no-math-cosh -- required for testing
var $cosh = Math.cosh;
var abs = Math.abs;
var E = Math.E;

// `Math.cosh` method
// https://tc39.es/ecma262/#sec-math.cosh
$({ target: 'Math', stat: true, forced: !$cosh || $cosh(710) === Infinity }, {
  cosh: function cosh(x) {
    var t = expm1(abs(x) - 1) + 1;
    return (t + 1 / (t * E * E)) * (E / 2);
  }
});


/***/ }),

/***/ 60403:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var expm1 = __webpack_require__(66736);

// `Math.expm1` method
// https://tc39.es/ecma262/#sec-math.expm1
// eslint-disable-next-line es/no-math-expm1 -- required for testing
$({ target: 'Math', stat: true, forced: expm1 != Math.expm1 }, { expm1: expm1 });


/***/ }),

/***/ 84755:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fround = __webpack_require__(26130);

// `Math.fround` method
// https://tc39.es/ecma262/#sec-math.fround
$({ target: 'Math', stat: true }, { fround: fround });


/***/ }),

/***/ 25438:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// eslint-disable-next-line es/no-math-hypot -- required for testing
var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt;

// Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546
var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity;

// `Math.hypot` method
// https://tc39.es/ecma262/#sec-math.hypot
$({ target: 'Math', stat: true, forced: BUGGY }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function hypot(value1, value2) {
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});


/***/ }),

/***/ 90332:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);

// eslint-disable-next-line es/no-math-imul -- required for testing
var $imul = Math.imul;

var FORCED = fails(function () {
  return $imul(0xFFFFFFFF, 5) != -5 || $imul.length != 2;
});

// `Math.imul` method
// https://tc39.es/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity
$({ target: 'Math', stat: true, forced: FORCED }, {
  imul: function imul(x, y) {
    var UINT16 = 0xFFFF;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ 40658:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

var log = Math.log;
var LOG10E = Math.LOG10E;

// `Math.log10` method
// https://tc39.es/ecma262/#sec-math.log10
$({ target: 'Math', stat: true }, {
  log10: function log10(x) {
    return log(x) * LOG10E;
  }
});


/***/ }),

/***/ 40197:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var log1p = __webpack_require__(26513);

// `Math.log1p` method
// https://tc39.es/ecma262/#sec-math.log1p
$({ target: 'Math', stat: true }, { log1p: log1p });


/***/ }),

/***/ 44914:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

var log = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.es/ecma262/#sec-math.log2
$({ target: 'Math', stat: true }, {
  log2: function log2(x) {
    return log(x) / LN2;
  }
});


/***/ }),

/***/ 52420:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var sign = __webpack_require__(64310);

// `Math.sign` method
// https://tc39.es/ecma262/#sec-math.sign
$({ target: 'Math', stat: true }, {
  sign: sign
});


/***/ }),

/***/ 60160:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);
var expm1 = __webpack_require__(66736);

var abs = Math.abs;
var exp = Math.exp;
var E = Math.E;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-math-sinh -- required for testing
  return Math.sinh(-2e-17) != -2e-17;
});

// `Math.sinh` method
// https://tc39.es/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers
$({ target: 'Math', stat: true, forced: FORCED }, {
  sinh: function sinh(x) {
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  }
});


/***/ }),

/***/ 60970:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var expm1 = __webpack_require__(66736);

var exp = Math.exp;

// `Math.tanh` method
// https://tc39.es/ecma262/#sec-math.tanh
$({ target: 'Math', stat: true }, {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ 10408:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var setToStringTag = __webpack_require__(58003);

// Math[@@toStringTag] property
// https://tc39.es/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);


/***/ }),

/***/ 73689:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
$({ target: 'Math', stat: true }, {
  trunc: function trunc(it) {
    return (it > 0 ? floor : ceil)(it);
  }
});


/***/ }),

/***/ 9653:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(19781);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var isForced = __webpack_require__(54705);
var redefine = __webpack_require__(31320);
var hasOwn = __webpack_require__(92597);
var inheritIfRequired = __webpack_require__(79587);
var isPrototypeOf = __webpack_require__(47976);
var isSymbol = __webpack_require__(52190);
var toPrimitive = __webpack_require__(57593);
var fails = __webpack_require__(47293);
var getOwnPropertyNames = __webpack_require__(8006).f;
var getOwnPropertyDescriptor = __webpack_require__(31236).f;
var defineProperty = __webpack_require__(3070).f;
var thisNumberValue = __webpack_require__(50863);
var trim = __webpack_require__(53111).trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ 93299:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// `Number.EPSILON` constant
// https://tc39.es/ecma262/#sec-number.epsilon
$({ target: 'Number', stat: true }, {
  EPSILON: Math.pow(2, -52)
});


/***/ }),

/***/ 35192:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var numberIsFinite = __webpack_require__(77023);

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
$({ target: 'Number', stat: true }, { isFinite: numberIsFinite });


/***/ }),

/***/ 33161:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var isIntegralNumber = __webpack_require__(55988);

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isIntegralNumber
});


/***/ }),

/***/ 44048:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// `Number.isNaN` method
// https://tc39.es/ecma262/#sec-number.isnan
$({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number != number;
  }
});


/***/ }),

/***/ 78285:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var isIntegralNumber = __webpack_require__(55988);

var abs = Math.abs;

// `Number.isSafeInteger` method
// https://tc39.es/ecma262/#sec-number.issafeinteger
$({ target: 'Number', stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isIntegralNumber(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
  }
});


/***/ }),

/***/ 44363:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.max_safe_integer
$({ target: 'Number', stat: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});


/***/ }),

/***/ 55994:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.min_safe_integer
$({ target: 'Number', stat: true }, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});


/***/ }),

/***/ 61874:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var parseFloat = __webpack_require__(2814);

// `Number.parseFloat` method
// https://tc39.es/ecma262/#sec-number.parseFloat
// eslint-disable-next-line es/no-number-parsefloat -- required for testing
$({ target: 'Number', stat: true, forced: Number.parseFloat != parseFloat }, {
  parseFloat: parseFloat
});


/***/ }),

/***/ 9494:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var parseInt = __webpack_require__(83009);

// `Number.parseInt` method
// https://tc39.es/ecma262/#sec-number.parseint
// eslint-disable-next-line es/no-number-parseint -- required for testing
$({ target: 'Number', stat: true, forced: Number.parseInt != parseInt }, {
  parseInt: parseInt
});


/***/ }),

/***/ 56977:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var toIntegerOrInfinity = __webpack_require__(19303);
var thisNumberValue = __webpack_require__(50863);
var $repeat = __webpack_require__(38415);
var fails = __webpack_require__(47293);

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' ||
    un$ToFixed(0.9, 0) !== '1' ||
    un$ToFixed(1.255, 2) !== '1.25' ||
    un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ 55147:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);
var thisNumberValue = __webpack_require__(50863);

var un$ToPrecision = uncurryThis(1.0.toPrecision);

var FORCED = fails(function () {
  // IE7-
  return un$ToPrecision(1, undefined) !== '1';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToPrecision({});
});

// `Number.prototype.toPrecision` method
// https://tc39.es/ecma262/#sec-number.prototype.toprecision
$({ target: 'Number', proto: true, forced: FORCED }, {
  toPrecision: function toPrecision(precision) {
    return precision === undefined
      ? un$ToPrecision(thisNumberValue(this))
      : un$ToPrecision(thisNumberValue(this), precision);
  }
});


/***/ }),

/***/ 19601:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var assign = __webpack_require__(21574);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ 78011:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var create = __webpack_require__(70030);

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});


/***/ }),

/***/ 59595:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var FORCED = __webpack_require__(69026);
var aCallable = __webpack_require__(19662);
var toObject = __webpack_require__(47908);
var definePropertyModule = __webpack_require__(3070);

// `Object.prototype.__defineGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule.f(toObject(this), P, { get: aCallable(getter), enumerable: true, configurable: true });
    }
  });
}


/***/ }),

/***/ 33321:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var defineProperties = __webpack_require__(36048);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),

/***/ 69070:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var objectDefinePropertyModile = __webpack_require__(3070);

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),

/***/ 35500:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var FORCED = __webpack_require__(69026);
var aCallable = __webpack_require__(19662);
var toObject = __webpack_require__(47908);
var definePropertyModule = __webpack_require__(3070);

// `Object.prototype.__defineSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineSetter__: function __defineSetter__(P, setter) {
      definePropertyModule.f(toObject(this), P, { set: aCallable(setter), enumerable: true, configurable: true });
    }
  });
}


/***/ }),

/***/ 69720:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var $entries = __webpack_require__(44699).entries;

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});


/***/ }),

/***/ 43371:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var FREEZING = __webpack_require__(76677);
var fails = __webpack_require__(47293);
var isObject = __webpack_require__(70111);
var onFreeze = __webpack_require__(62423).onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 38559:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var iterate = __webpack_require__(20408);
var createProperty = __webpack_require__(86135);

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});


/***/ }),

/***/ 38880:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);
var toIndexedObject = __webpack_require__(45656);
var nativeGetOwnPropertyDescriptor = __webpack_require__(31236).f;
var DESCRIPTORS = __webpack_require__(19781);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 49337:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var ownKeys = __webpack_require__(53887);
var toIndexedObject = __webpack_require__(45656);
var getOwnPropertyDescriptorModule = __webpack_require__(31236);
var createProperty = __webpack_require__(86135);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ 36210:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);
var getOwnPropertyNames = __webpack_require__(1156).f;

// eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: getOwnPropertyNames
});


/***/ }),

/***/ 30489:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);
var toObject = __webpack_require__(47908);
var nativeGetPrototypeOf = __webpack_require__(79518);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(49920);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ 46314:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var hasOwn = __webpack_require__(92597);

// `Object.hasOwn` method
// https://github.com/tc39/proposal-accessible-object-hasownproperty
$({ target: 'Object', stat: true }, {
  hasOwn: hasOwn
});


/***/ }),

/***/ 41825:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var $isExtensible = __webpack_require__(52050);

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
// eslint-disable-next-line es/no-object-isextensible -- safe
$({ target: 'Object', stat: true, forced: Object.isExtensible !== $isExtensible }, {
  isExtensible: $isExtensible
});


/***/ }),

/***/ 98410:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);
var isObject = __webpack_require__(70111);
var classof = __webpack_require__(84326);
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(7556);

// eslint-disable-next-line es/no-object-isfrozen -- safe
var $isFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES = fails(function () { $isFrozen(1); });

// `Object.isFrozen` method
// https://tc39.es/ecma262/#sec-object.isfrozen
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE }, {
  isFrozen: function isFrozen(it) {
    if (!isObject(it)) return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return true;
    return $isFrozen ? $isFrozen(it) : false;
  }
});


/***/ }),

/***/ 72200:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var fails = __webpack_require__(47293);
var isObject = __webpack_require__(70111);
var classof = __webpack_require__(84326);
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(7556);

// eslint-disable-next-line es/no-object-issealed -- safe
var $isSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = fails(function () { $isSealed(1); });

// `Object.isSealed` method
// https://tc39.es/ecma262/#sec-object.issealed
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE }, {
  isSealed: function isSealed(it) {
    if (!isObject(it)) return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return true;
    return $isSealed ? $isSealed(it) : false;
  }
});


/***/ }),

/***/ 43304:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var is = __webpack_require__(81150);

// `Object.is` method
// https://tc39.es/ecma262/#sec-object.is
$({ target: 'Object', stat: true }, {
  is: is
});


/***/ }),

/***/ 47941:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var toObject = __webpack_require__(47908);
var nativeKeys = __webpack_require__(81956);
var fails = __webpack_require__(47293);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ 94869:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var FORCED = __webpack_require__(69026);
var toObject = __webpack_require__(47908);
var toPropertyKey = __webpack_require__(34948);
var getPrototypeOf = __webpack_require__(79518);
var getOwnPropertyDescriptor = __webpack_require__(31236).f;

// `Object.prototype.__lookupGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject(this);
      var key = toPropertyKey(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.get;
      } while (O = getPrototypeOf(O));
    }
  });
}


/***/ }),

/***/ 33952:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var FORCED = __webpack_require__(69026);
var toObject = __webpack_require__(47908);
var toPropertyKey = __webpack_require__(34948);
var getPrototypeOf = __webpack_require__(79518);
var getOwnPropertyDescriptor = __webpack_require__(31236).f;

// `Object.prototype.__lookupSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject(this);
      var key = toPropertyKey(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.set;
      } while (O = getPrototypeOf(O));
    }
  });
}


/***/ }),

/***/ 57227:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var isObject = __webpack_require__(70111);
var onFreeze = __webpack_require__(62423).onFreeze;
var FREEZING = __webpack_require__(76677);
var fails = __webpack_require__(47293);

// eslint-disable-next-line es/no-object-preventextensions -- safe
var $preventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES = fails(function () { $preventExtensions(1); });

// `Object.preventExtensions` method
// https://tc39.es/ecma262/#sec-object.preventextensions
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 60514:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var isObject = __webpack_require__(70111);
var onFreeze = __webpack_require__(62423).onFreeze;
var FREEZING = __webpack_require__(76677);
var fails = __webpack_require__(47293);

// eslint-disable-next-line es/no-object-seal -- safe
var $seal = Object.seal;
var FAILS_ON_PRIMITIVES = fails(function () { $seal(1); });

// `Object.seal` method
// https://tc39.es/ecma262/#sec-object.seal
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  seal: function seal(it) {
    return $seal && isObject(it) ? $seal(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 68304:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var setPrototypeOf = __webpack_require__(27674);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});


/***/ }),

/***/ 41539:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(51694);
var redefine = __webpack_require__(31320);
var toString = __webpack_require__(90288);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 26833:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var $values = __webpack_require__(44699).values;

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});


/***/ }),

/***/ 54678:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var $parseFloat = __webpack_require__(2814);

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != $parseFloat }, {
  parseFloat: $parseFloat
});


/***/ }),

/***/ 91058:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var $parseInt = __webpack_require__(83009);

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != $parseInt }, {
  parseInt: $parseInt
});


/***/ }),

/***/ 17922:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var call = __webpack_require__(46916);
var aCallable = __webpack_require__(19662);
var newPromiseCapabilityModule = __webpack_require__(78523);
var perform = __webpack_require__(12534);
var iterate = __webpack_require__(20408);

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 34668:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var aCallable = __webpack_require__(19662);
var getBuiltIn = __webpack_require__(35005);
var call = __webpack_require__(46916);
var newPromiseCapabilityModule = __webpack_require__(78523);
var perform = __webpack_require__(12534);
var iterate = __webpack_require__(20408);

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var AggregateError = getBuiltIn('AggregateError');
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 17727:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var IS_PURE = __webpack_require__(31913);
var NativePromise = __webpack_require__(13366);
var fails = __webpack_require__(47293);
var getBuiltIn = __webpack_require__(35005);
var isCallable = __webpack_require__(60614);
var speciesConstructor = __webpack_require__(36707);
var promiseResolve = __webpack_require__(69478);
var redefine = __webpack_require__(31320);

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = isCallable(onFinally);
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromise)) {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromise.prototype['finally'] !== method) {
    redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
  }
}


/***/ }),

/***/ 88674:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var IS_PURE = __webpack_require__(31913);
var global = __webpack_require__(17854);
var getBuiltIn = __webpack_require__(35005);
var call = __webpack_require__(46916);
var NativePromise = __webpack_require__(13366);
var redefine = __webpack_require__(31320);
var redefineAll = __webpack_require__(12248);
var setPrototypeOf = __webpack_require__(27674);
var setToStringTag = __webpack_require__(58003);
var setSpecies = __webpack_require__(96340);
var aCallable = __webpack_require__(19662);
var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);
var anInstance = __webpack_require__(25787);
var inspectSource = __webpack_require__(42788);
var iterate = __webpack_require__(20408);
var checkCorrectnessOfIteration = __webpack_require__(17072);
var speciesConstructor = __webpack_require__(36707);
var task = __webpack_require__(20261).set;
var microtask = __webpack_require__(95948);
var promiseResolve = __webpack_require__(69478);
var hostReportErrors = __webpack_require__(842);
var newPromiseCapabilityModule = __webpack_require__(78523);
var perform = __webpack_require__(12534);
var InternalStateModule = __webpack_require__(29909);
var isForced = __webpack_require__(54705);
var wellKnownSymbol = __webpack_require__(5112);
var IS_BROWSER = __webpack_require__(7871);
var IS_NODE = __webpack_require__(35268);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromisePrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            call(then, result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromisePrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromisePrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reactions = state.reactions;
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      reactions[reactions.length] = reaction;
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 36535:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var functionApply = __webpack_require__(22104);
var aCallable = __webpack_require__(19662);
var anObject = __webpack_require__(19670);
var fails = __webpack_require__(47293);

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
  // eslint-disable-next-line es/no-reflect -- required for testing
  Reflect.apply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.es/ecma262/#sec-reflect.apply
$({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    return functionApply(aCallable(target), thisArgument, anObject(argumentsList));
  }
});


/***/ }),

/***/ 12419:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var getBuiltIn = __webpack_require__(35005);
var apply = __webpack_require__(22104);
var bind = __webpack_require__(27065);
var aConstructor = __webpack_require__(39483);
var anObject = __webpack_require__(19670);
var isObject = __webpack_require__(70111);
var create = __webpack_require__(70030);
var fails = __webpack_require__(47293);

var nativeConstruct = getBuiltIn('Reflect', 'construct');
var ObjectPrototype = Object.prototype;
var push = [].push;

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});

var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});

var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      apply(push, $args, args);
      return new (apply(bind, Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : ObjectPrototype);
    var result = apply(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ 69596:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var anObject = __webpack_require__(19670);
var toPropertyKey = __webpack_require__(34948);
var definePropertyModule = __webpack_require__(3070);
var fails = __webpack_require__(47293);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = fails(function () {
  // eslint-disable-next-line es/no-reflect -- required for testing
  Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.es/ecma262/#sec-reflect.defineproperty
$({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    var key = toPropertyKey(propertyKey);
    anObject(attributes);
    try {
      definePropertyModule.f(target, key, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});


/***/ }),

/***/ 52586:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var anObject = __webpack_require__(19670);
var getOwnPropertyDescriptor = __webpack_require__(31236).f;

// `Reflect.deleteProperty` method
// https://tc39.es/ecma262/#sec-reflect.deleteproperty
$({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ 95683:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var anObject = __webpack_require__(19670);
var getOwnPropertyDescriptorModule = __webpack_require__(31236);

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-reflect.getownpropertydescriptor
$({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ 39361:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var anObject = __webpack_require__(19670);
var objectGetPrototypeOf = __webpack_require__(79518);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(49920);

// `Reflect.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.getprototypeof
$({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject(target));
  }
});


/***/ }),

/***/ 74819:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var call = __webpack_require__(46916);
var isObject = __webpack_require__(70111);
var anObject = __webpack_require__(19670);
var isDataDescriptor = __webpack_require__(45032);
var getOwnPropertyDescriptorModule = __webpack_require__(31236);
var getPrototypeOf = __webpack_require__(79518);

// `Reflect.get` method
// https://tc39.es/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey);
  if (descriptor) return isDataDescriptor(descriptor)
    ? descriptor.value
    : descriptor.get === undefined ? undefined : call(descriptor.get, receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});


/***/ }),

/***/ 51037:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);

// `Reflect.has` method
// https://tc39.es/ecma262/#sec-reflect.has
$({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ 5898:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var anObject = __webpack_require__(19670);
var $isExtensible = __webpack_require__(52050);

// `Reflect.isExtensible` method
// https://tc39.es/ecma262/#sec-reflect.isextensible
$({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible(target);
  }
});


/***/ }),

/***/ 67556:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var ownKeys = __webpack_require__(53887);

// `Reflect.ownKeys` method
// https://tc39.es/ecma262/#sec-reflect.ownkeys
$({ target: 'Reflect', stat: true }, {
  ownKeys: ownKeys
});


/***/ }),

/***/ 14361:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var getBuiltIn = __webpack_require__(35005);
var anObject = __webpack_require__(19670);
var FREEZING = __webpack_require__(76677);

// `Reflect.preventExtensions` method
// https://tc39.es/ecma262/#sec-reflect.preventextensions
$({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});


/***/ }),

/***/ 39532:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var anObject = __webpack_require__(19670);
var aPossiblePrototype = __webpack_require__(96077);
var objectSetPrototypeOf = __webpack_require__(27674);

// `Reflect.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) $({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    anObject(target);
    aPossiblePrototype(proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (error) {
      return false;
    }
  }
});


/***/ }),

/***/ 83593:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var call = __webpack_require__(46916);
var anObject = __webpack_require__(19670);
var isObject = __webpack_require__(70111);
var isDataDescriptor = __webpack_require__(45032);
var fails = __webpack_require__(47293);
var definePropertyModule = __webpack_require__(3070);
var getOwnPropertyDescriptorModule = __webpack_require__(31236);
var getPrototypeOf = __webpack_require__(79518);
var createPropertyDescriptor = __webpack_require__(79114);

// `Reflect.set` method
// https://tc39.es/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype, setter;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (isDataDescriptor(ownDescriptor)) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
  } else {
    setter = ownDescriptor.set;
    if (setter === undefined) return false;
    call(setter, receiver, V);
  } return true;
}

// MS Edge 17-18 Reflect.set allows setting the property to object
// with non-writable property on the prototype
var MS_EDGE_BUG = fails(function () {
  var Constructor = function () { /* empty */ };
  var object = definePropertyModule.f(new Constructor(), 'a', { configurable: true });
  // eslint-disable-next-line es/no-reflect -- required for testing
  return Reflect.set(Constructor.prototype, 'a', 1, object) !== false;
});

$({ target: 'Reflect', stat: true, forced: MS_EDGE_BUG }, {
  set: set
});


/***/ }),

/***/ 81299:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var setToStringTag = __webpack_require__(58003);

$({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag(global.Reflect, 'Reflect', true);


/***/ }),

/***/ 24603:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var isForced = __webpack_require__(54705);
var inheritIfRequired = __webpack_require__(79587);
var createNonEnumerableProperty = __webpack_require__(68880);
var defineProperty = __webpack_require__(3070).f;
var getOwnPropertyNames = __webpack_require__(8006).f;
var isPrototypeOf = __webpack_require__(47976);
var isRegExp = __webpack_require__(47850);
var toString = __webpack_require__(41340);
var regExpFlags = __webpack_require__(67066);
var stickyHelpers = __webpack_require__(52999);
var redefine = __webpack_require__(31320);
var fails = __webpack_require__(47293);
var hasOwn = __webpack_require__(92597);
var enforceInternalState = __webpack_require__(29909).enforce;
var setSpecies = __webpack_require__(96340);
var wellKnownSymbol = __webpack_require__(5112);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(38173);

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var SyntaxError = global.SyntaxError;
var getFlags = uncurryThis(regExpFlags);
var exec = uncurryThis(RegExpPrototype.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      result += chr + charAt(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      chr = chr + charAt(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (exec(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace(flags, /s/g, '');
    }

    rawFlags = flags;

    if (UNSUPPORTED_Y && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky) flags = replace(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxy(keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ 28450:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var DESCRIPTORS = __webpack_require__(19781);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var classof = __webpack_require__(84326);
var defineProperty = __webpack_require__(3070).f;
var getInternalState = __webpack_require__(29909).get;

var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;

// `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
  defineProperty(RegExpPrototype, 'dotAll', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).dotAll;
      }
      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}


/***/ }),

/***/ 74916:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var exec = __webpack_require__(22261);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 92087:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(19781);
var objectDefinePropertyModule = __webpack_require__(3070);
var regExpFlags = __webpack_require__(67066);
var fails = __webpack_require__(47293);

var RegExpPrototype = RegExp.prototype;

var FORCED = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  return Object.getOwnPropertyDescriptor(RegExpPrototype, 'flags').get.call({ dotAll: true, sticky: true }) !== 'sy';
});

// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (FORCED) objectDefinePropertyModule.f(RegExpPrototype, 'flags', {
  configurable: true,
  get: regExpFlags
});


/***/ }),

/***/ 88386:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var DESCRIPTORS = __webpack_require__(19781);
var UNSUPPORTED_Y = __webpack_require__(52999).UNSUPPORTED_Y;
var classof = __webpack_require__(84326);
var defineProperty = __webpack_require__(3070).f;
var getInternalState = __webpack_require__(29909).get;

var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;

// `RegExp.prototype.sticky` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
if (DESCRIPTORS && UNSUPPORTED_Y) {
  defineProperty(RegExpPrototype, 'sticky', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).sticky;
      }
      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}


/***/ }),

/***/ 77601:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(74916);
var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var Error = global.Error;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ 39714:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(1702);
var PROPER_FUNCTION_NAME = __webpack_require__(76530).PROPER;
var redefine = __webpack_require__(31320);
var anObject = __webpack_require__(19670);
var isPrototypeOf = __webpack_require__(47976);
var $toString = __webpack_require__(41340);
var fails = __webpack_require__(47293);
var regExpFlags = __webpack_require__(67066);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis(regExpFlags);

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ 70189:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(77710);
var collectionStrong = __webpack_require__(95631);

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 15218:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.anchor` method
// https://tc39.es/ecma262/#sec-string.prototype.anchor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
  anchor: function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  }
});


/***/ }),

/***/ 24506:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(84488);
var toIntegerOrInfinity = __webpack_require__(19303);
var toString = __webpack_require__(41340);
var fails = __webpack_require__(47293);

var charAt = uncurryThis(''.charAt);

var FORCED = fails(function () {
  return '𠮷'.at(0) !== '\uD842';
});

// `String.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$({ target: 'String', proto: true, forced: FORCED }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});


/***/ }),

/***/ 74475:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.big` method
// https://tc39.es/ecma262/#sec-string.prototype.big
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('big') }, {
  big: function big() {
    return createHTML(this, 'big', '', '');
  }
});


/***/ }),

/***/ 57929:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.blink` method
// https://tc39.es/ecma262/#sec-string.prototype.blink
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('blink') }, {
  blink: function blink() {
    return createHTML(this, 'blink', '', '');
  }
});


/***/ }),

/***/ 50915:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.bold` method
// https://tc39.es/ecma262/#sec-string.prototype.bold
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('bold') }, {
  bold: function bold() {
    return createHTML(this, 'b', '', '');
  }
});


/***/ }),

/***/ 79841:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var codeAt = __webpack_require__(28710).codeAt;

// `String.prototype.codePointAt` method
// https://tc39.es/ecma262/#sec-string.prototype.codepointat
$({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt(this, pos);
  }
});


/***/ }),

/***/ 27852:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyDescriptor = __webpack_require__(31236).f;
var toLength = __webpack_require__(17466);
var toString = __webpack_require__(41340);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(84488);
var correctIsRegExpLogic = __webpack_require__(84964);
var IS_PURE = __webpack_require__(31913);

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var un$EndsWith = uncurryThis(''.endsWith);
var slice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return un$EndsWith
      ? un$EndsWith(that, search, end)
      : slice(that, end - search.length, end) === search;
  }
});


/***/ }),

/***/ 29253:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.fixed` method
// https://tc39.es/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});


/***/ }),

/***/ 42125:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.fontcolor` method
// https://tc39.es/ecma262/#sec-string.prototype.fontcolor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontcolor') }, {
  fontcolor: function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  }
});


/***/ }),

/***/ 78830:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.fontsize` method
// https://tc39.es/ecma262/#sec-string.prototype.fontsize
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontsize') }, {
  fontsize: function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  }
});


/***/ }),

/***/ 94953:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var toAbsoluteIndex = __webpack_require__(51400);

var RangeError = global.RangeError;
var fromCharCode = String.fromCharCode;
// eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
var $fromCodePoint = String.fromCodePoint;
var join = uncurryThis([].join);

// length should be 1, old FF problem
var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length != 1;

// `String.fromCodePoint` method
// https://tc39.es/ecma262/#sec-string.fromcodepoint
$({ target: 'String', stat: true, forced: INCORRECT_LENGTH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function fromCodePoint(x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
      elements[i] = code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
    } return join(elements, '');
  }
});


/***/ }),

/***/ 32023:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(84488);
var toString = __webpack_require__(41340);
var correctIsRegExpLogic = __webpack_require__(84964);

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ 58734:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.italics` method
// https://tc39.es/ecma262/#sec-string.prototype.italics
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('italics') }, {
  italics: function italics() {
    return createHTML(this, 'i', '', '');
  }
});


/***/ }),

/***/ 78783:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(28710).charAt;
var toString = __webpack_require__(41340);
var InternalStateModule = __webpack_require__(29909);
var defineIterator = __webpack_require__(70654);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 29254:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.link` method
// https://tc39.es/ecma262/#sec-string.prototype.link
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('link') }, {
  link: function link(url) {
    return createHTML(this, 'a', 'href', url);
  }
});


/***/ }),

/***/ 76373:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-string-prototype-matchall -- safe */
var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var createIteratorConstructor = __webpack_require__(24994);
var requireObjectCoercible = __webpack_require__(84488);
var toLength = __webpack_require__(17466);
var toString = __webpack_require__(41340);
var anObject = __webpack_require__(19670);
var classof = __webpack_require__(84326);
var isPrototypeOf = __webpack_require__(47976);
var isRegExp = __webpack_require__(47850);
var regExpFlags = __webpack_require__(67066);
var getMethod = __webpack_require__(58173);
var redefine = __webpack_require__(31320);
var fails = __webpack_require__(47293);
var wellKnownSymbol = __webpack_require__(5112);
var speciesConstructor = __webpack_require__(36707);
var advanceStringIndex = __webpack_require__(31530);
var regExpExec = __webpack_require__(97651);
var InternalStateModule = __webpack_require__(29909);
var IS_PURE = __webpack_require__(31913);

var MATCH_ALL = wellKnownSymbol('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;
var getFlags = uncurryThis(regExpFlags);
var stringIndexOf = uncurryThis(''.indexOf);
var un$MatchAll = uncurryThis(''.matchAll);

var WORKS_WITH_NON_GLOBAL_REGEX = !!un$MatchAll && !fails(function () {
  un$MatchAll('a', /./);
});

var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
  setInternalState(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: $global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState(this);
  if (state.done) return { value: undefined, done: true };
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec(R, S);
  if (match === null) return { value: undefined, done: state.done = true };
  if (state.global) {
    if (toString(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
    return { value: match, done: false };
  }
  state.done = true;
  return { value: match, done: false };
});

var $matchAll = function (string) {
  var R = anObject(this);
  var S = toString(string);
  var C, flagsValue, flags, matcher, $global, fullUnicode;
  C = speciesConstructor(R, RegExp);
  flagsValue = R.flags;
  if (flagsValue === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype)) {
    flagsValue = getFlags(R);
  }
  flags = flagsValue === undefined ? '' : toString(flagsValue);
  matcher = new C(C === RegExp ? R.source : R, flags);
  $global = !!~stringIndexOf(flags, 'g');
  fullUnicode = !!~stringIndexOf(flags, 'u');
  matcher.lastIndex = toLength(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
};

// `String.prototype.matchAll` method
// https://tc39.es/ecma262/#sec-string.prototype.matchall
$({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible(this);
    var flags, S, matcher, rx;
    if (regexp != null) {
      if (isRegExp(regexp)) {
        flags = toString(requireObjectCoercible('flags' in RegExpPrototype
          ? regexp.flags
          : getFlags(regexp)
        ));
        if (!~stringIndexOf(flags, 'g')) throw TypeError('`.matchAll` does not allow non-global regexes');
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);
      matcher = getMethod(regexp, MATCH_ALL);
      if (matcher === undefined && IS_PURE && classof(regexp) == 'RegExp') matcher = $matchAll;
      if (matcher) return call(matcher, regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);
    S = toString(O);
    rx = new RegExp(regexp, 'g');
    return IS_PURE ? call($matchAll, rx, S) : rx[MATCH_ALL](S);
  }
});

IS_PURE || MATCH_ALL in RegExpPrototype || redefine(RegExpPrototype, MATCH_ALL, $matchAll);


/***/ }),

/***/ 4723:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(46916);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(27007);
var anObject = __webpack_require__(19670);
var toLength = __webpack_require__(17466);
var toString = __webpack_require__(41340);
var requireObjectCoercible = __webpack_require__(84488);
var getMethod = __webpack_require__(58173);
var advanceStringIndex = __webpack_require__(31530);
var regExpExec = __webpack_require__(97651);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ 66528:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $padEnd = __webpack_require__(76650).end;
var WEBKIT_BUG = __webpack_require__(54986);

// `String.prototype.padEnd` method
// https://tc39.es/ecma262/#sec-string.prototype.padend
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 83112:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $padStart = __webpack_require__(76650).start;
var WEBKIT_BUG = __webpack_require__(54986);

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 38992:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var toIndexedObject = __webpack_require__(45656);
var toObject = __webpack_require__(47908);
var toString = __webpack_require__(41340);
var lengthOfArrayLike = __webpack_require__(26244);

var push = uncurryThis([].push);
var join = uncurryThis([].join);

// `String.raw` method
// https://tc39.es/ecma262/#sec-string.raw
$({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(toObject(template).raw);
    var literalSegments = lengthOfArrayLike(rawTemplate);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (literalSegments > i) {
      push(elements, toString(rawTemplate[i++]));
      if (i === literalSegments) return join(elements, '');
      if (i < argumentsLength) push(elements, toString(arguments[i]));
    }
  }
});


/***/ }),

/***/ 82481:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var repeat = __webpack_require__(38415);

// `String.prototype.repeat` method
// https://tc39.es/ecma262/#sec-string.prototype.repeat
$({ target: 'String', proto: true }, {
  repeat: repeat
});


/***/ }),

/***/ 68757:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(84488);
var isCallable = __webpack_require__(60614);
var isRegExp = __webpack_require__(47850);
var toString = __webpack_require__(41340);
var getMethod = __webpack_require__(58173);
var regExpFlags = __webpack_require__(67066);
var getSubstitution = __webpack_require__(10647);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(31913);

var REPLACE = wellKnownSymbol('replace');
var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;
var getFlags = uncurryThis(regExpFlags);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

var stringIndexOf = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return indexOf(string, searchValue, fromIndex);
};

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (searchValue != null) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible('flags' in RegExpPrototype
          ? searchValue.flags
          : getFlags(searchValue)
        ));
        if (!~indexOf(flags, 'g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) {
        return call(replacer, searchValue, O, replaceValue);
      } else if (IS_PURE && IS_REG_EXP) {
        return replace(toString(O), searchValue, replaceValue);
      }
    }
    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = stringIndexOf(string, searchString, 0);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});


/***/ }),

/***/ 15306:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__(22104);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(27007);
var fails = __webpack_require__(47293);
var anObject = __webpack_require__(19670);
var isCallable = __webpack_require__(60614);
var toIntegerOrInfinity = __webpack_require__(19303);
var toLength = __webpack_require__(17466);
var toString = __webpack_require__(41340);
var requireObjectCoercible = __webpack_require__(84488);
var advanceStringIndex = __webpack_require__(31530);
var getMethod = __webpack_require__(58173);
var getSubstitution = __webpack_require__(10647);
var regExpExec = __webpack_require__(97651);
var wellKnownSymbol = __webpack_require__(5112);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 64765:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(46916);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(27007);
var anObject = __webpack_require__(19670);
var requireObjectCoercible = __webpack_require__(84488);
var sameValue = __webpack_require__(81150);
var toString = __webpack_require__(41340);
var getMethod = __webpack_require__(58173);
var regExpExec = __webpack_require__(97651);

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : getMethod(regexp, SEARCH);
      return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ 37268:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.small` method
// https://tc39.es/ecma262/#sec-string.prototype.small
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('small') }, {
  small: function small() {
    return createHTML(this, 'small', '', '');
  }
});


/***/ }),

/***/ 23123:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__(22104);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(27007);
var isRegExp = __webpack_require__(47850);
var anObject = __webpack_require__(19670);
var requireObjectCoercible = __webpack_require__(84488);
var speciesConstructor = __webpack_require__(36707);
var advanceStringIndex = __webpack_require__(31530);
var toLength = __webpack_require__(17466);
var toString = __webpack_require__(41340);
var getMethod = __webpack_require__(58173);
var arraySlice = __webpack_require__(50206);
var callRegExpExec = __webpack_require__(97651);
var regexpExec = __webpack_require__(22261);
var stickyHelpers = __webpack_require__(52999);
var fails = __webpack_require__(47293);

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ 23157:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyDescriptor = __webpack_require__(31236).f;
var toLength = __webpack_require__(17466);
var toString = __webpack_require__(41340);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(84488);
var correctIsRegExpLogic = __webpack_require__(84964);
var IS_PURE = __webpack_require__(31913);

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var un$StartsWith = uncurryThis(''.startsWith);
var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return un$StartsWith
      ? un$StartsWith(that, search, index)
      : stringSlice(that, index, index + search.length) === search;
  }
});


/***/ }),

/***/ 7397:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.strike` method
// https://tc39.es/ecma262/#sec-string.prototype.strike
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('strike') }, {
  strike: function strike() {
    return createHTML(this, 'strike', '', '');
  }
});


/***/ }),

/***/ 60086:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.sub` method
// https://tc39.es/ecma262/#sec-string.prototype.sub
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
  sub: function sub() {
    return createHTML(this, 'sub', '', '');
  }
});


/***/ }),

/***/ 83650:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(84488);
var toIntegerOrInfinity = __webpack_require__(19303);
var toString = __webpack_require__(41340);

var stringSlice = uncurryThis(''.slice);
var max = Math.max;
var min = Math.min;

// eslint-disable-next-line unicorn/prefer-string-slice -- required for testing
var FORCED = !''.substr || 'ab'.substr(-1) !== 'b';

// `String.prototype.substr` method
// https://tc39.es/ecma262/#sec-string.prototype.substr
$({ target: 'String', proto: true, forced: FORCED }, {
  substr: function substr(start, length) {
    var that = toString(requireObjectCoercible(this));
    var size = that.length;
    var intStart = toIntegerOrInfinity(start);
    var intLength, intEnd;
    if (intStart === Infinity) intStart = 0;
    if (intStart < 0) intStart = max(size + intStart, 0);
    intLength = length === undefined ? size : toIntegerOrInfinity(length);
    if (intLength <= 0 || intLength === Infinity) return '';
    intEnd = min(intStart + intLength, size);
    return intStart >= intEnd ? '' : stringSlice(that, intStart, intEnd);
  }
});


/***/ }),

/***/ 80623:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var createHTML = __webpack_require__(14230);
var forcedStringHTMLMethod = __webpack_require__(43429);

// `String.prototype.sup` method
// https://tc39.es/ecma262/#sec-string.prototype.sup
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sup') }, {
  sup: function sup() {
    return createHTML(this, 'sup', '', '');
  }
});


/***/ }),

/***/ 48702:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $trimEnd = __webpack_require__(53111).end;
var forcedStringTrimMethod = __webpack_require__(76091);

var FORCED = forcedStringTrimMethod('trimEnd');

var trimEnd = FORCED ? function trimEnd() {
  return $trimEnd(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// https://tc39.es/ecma262/#String.prototype.trimright
$({ target: 'String', proto: true, name: 'trimEnd', forced: FORCED }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});


/***/ }),

/***/ 55674:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $trimStart = __webpack_require__(53111).start;
var forcedStringTrimMethod = __webpack_require__(76091);

var FORCED = forcedStringTrimMethod('trimStart');

var trimStart = FORCED ? function trimStart() {
  return $trimStart(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://tc39.es/ecma262/#sec-string.prototype.trimstart
// https://tc39.es/ecma262/#String.prototype.trimleft
$({ target: 'String', proto: true, name: 'trimStart', forced: FORCED }, {
  trimStart: trimStart,
  trimLeft: trimStart
});


/***/ }),

/***/ 73210:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var $trim = __webpack_require__(53111).trim;
var forcedStringTrimMethod = __webpack_require__(76091);

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ 72443:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');


/***/ }),

/***/ 41817:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(92597);
var isCallable = __webpack_require__(60614);
var isPrototypeOf = __webpack_require__(47976);
var toString = __webpack_require__(41340);
var defineProperty = __webpack_require__(3070).f;
var copyConstructorProperties = __webpack_require__(99920);

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 92401:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');


/***/ }),

/***/ 8722:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');


/***/ }),

/***/ 32165:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ 82526:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var getBuiltIn = __webpack_require__(35005);
var apply = __webpack_require__(22104);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var IS_PURE = __webpack_require__(31913);
var DESCRIPTORS = __webpack_require__(19781);
var NATIVE_SYMBOL = __webpack_require__(30133);
var fails = __webpack_require__(47293);
var hasOwn = __webpack_require__(92597);
var isArray = __webpack_require__(43157);
var isCallable = __webpack_require__(60614);
var isObject = __webpack_require__(70111);
var isPrototypeOf = __webpack_require__(47976);
var isSymbol = __webpack_require__(52190);
var anObject = __webpack_require__(19670);
var toObject = __webpack_require__(47908);
var toIndexedObject = __webpack_require__(45656);
var toPropertyKey = __webpack_require__(34948);
var $toString = __webpack_require__(41340);
var createPropertyDescriptor = __webpack_require__(79114);
var nativeObjectCreate = __webpack_require__(70030);
var objectKeys = __webpack_require__(81956);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternal = __webpack_require__(1156);
var getOwnPropertySymbolsModule = __webpack_require__(25181);
var getOwnPropertyDescriptorModule = __webpack_require__(31236);
var definePropertyModule = __webpack_require__(3070);
var propertyIsEnumerableModule = __webpack_require__(55296);
var arraySlice = __webpack_require__(50206);
var redefine = __webpack_require__(31320);
var shared = __webpack_require__(72309);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);
var uid = __webpack_require__(69711);
var wellKnownSymbol = __webpack_require__(5112);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineWellKnownSymbol = __webpack_require__(97235);
var setToStringTag = __webpack_require__(58003);
var InternalStateModule = __webpack_require__(29909);
var $forEach = __webpack_require__(42092).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  redefine(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!SymbolPrototype[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype.valueOf;
  // eslint-disable-next-line no-unused-vars -- required for .length
  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 16066:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall
defineWellKnownSymbol('matchAll');


/***/ }),

/***/ 69007:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');


/***/ }),

/***/ 83510:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');


/***/ }),

/***/ 41840:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');


/***/ }),

/***/ 6982:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');


/***/ }),

/***/ 32159:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');


/***/ }),

/***/ 96649:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');


/***/ }),

/***/ 39341:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');


/***/ }),

/***/ 60543:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(97235);

// `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');


/***/ }),

/***/ 48675:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var lengthOfArrayLike = __webpack_require__(26244);
var toIntegerOrInfinity = __webpack_require__(19303);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});


/***/ }),

/***/ 92990:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(1702);
var ArrayBufferViewCore = __webpack_require__(90260);
var $ArrayCopyWithin = __webpack_require__(1048);

var u$ArrayCopyWithin = uncurryThis($ArrayCopyWithin);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return u$ArrayCopyWithin(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),

/***/ 18927:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $every = __webpack_require__(42092).every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 33105:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var call = __webpack_require__(46916);
var $fill = __webpack_require__(21285);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  return call(
    $fill,
    aTypedArray(this),
    value,
    length > 1 ? arguments[1] : undefined,
    length > 2 ? arguments[2] : undefined
  );
});


/***/ }),

/***/ 35035:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $filter = __webpack_require__(42092).filter;
var fromSpeciesAndList = __webpack_require__(43074);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});


/***/ }),

/***/ 7174:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $findIndex = __webpack_require__(42092).findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 74345:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $find = __webpack_require__(42092).find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 44197:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Float32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 76495:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Float64Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 32846:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $forEach = __webpack_require__(42092).forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 98145:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(63832);
var exportTypedArrayStaticMethod = __webpack_require__(90260).exportTypedArrayStaticMethod;
var typedArrayFrom = __webpack_require__(97321);

// `%TypedArray%.from` method
// https://tc39.es/ecma262/#sec-%typedarray%.from
exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);


/***/ }),

/***/ 44731:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $includes = __webpack_require__(41318).includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 77209:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $indexOf = __webpack_require__(41318).indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 35109:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 65125:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 87145:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 96319:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var PROPER_FUNCTION_NAME = __webpack_require__(76530).PROPER;
var ArrayBufferViewCore = __webpack_require__(90260);
var ArrayIterators = __webpack_require__(66992);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = uncurryThis(ArrayIterators.values);
var arrayKeys = uncurryThis(ArrayIterators.keys);
var arrayEntries = uncurryThis(ArrayIterators.entries);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var PROPER_ARRAY_VALUES_NAME = !!nativeTypedArrayIterator && nativeTypedArrayIterator.name === 'values';

var typedArrayValues = function values() {
  return arrayValues(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, PROPER_FUNCTION_NAME && !PROPER_ARRAY_VALUES_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, PROPER_FUNCTION_NAME && !PROPER_ARRAY_VALUES_NAME);


/***/ }),

/***/ 58867:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var uncurryThis = __webpack_require__(1702);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = uncurryThis([].join);

// `%TypedArray%.prototype.join` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
exportTypedArrayMethod('join', function join(separator) {
  return $join(aTypedArray(this), separator);
});


/***/ }),

/***/ 37789:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var apply = __webpack_require__(22104);
var $lastIndexOf = __webpack_require__(86583);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  var length = arguments.length;
  return apply($lastIndexOf, aTypedArray(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
});


/***/ }),

/***/ 33739:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $map = __webpack_require__(42092).map;
var typedArraySpeciesConstructor = __webpack_require__(66304);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (typedArraySpeciesConstructor(O))(length);
  });
});


/***/ }),

/***/ 95206:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(63832);

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore.exportTypedArrayStaticMethod;

// `%TypedArray%.of` method
// https://tc39.es/ecma262/#sec-%typedarray%.of
exportTypedArrayStaticMethod('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);


/***/ }),

/***/ 14483:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $reduceRight = __webpack_require__(53671).right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduceRight(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 29368:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $reduce = __webpack_require__(53671).left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduce(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 12056:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),

/***/ 3462:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var ArrayBufferViewCore = __webpack_require__(90260);
var lengthOfArrayLike = __webpack_require__(26244);
var toOffset = __webpack_require__(84590);
var toObject = __webpack_require__(47908);
var fails = __webpack_require__(47293);

var RangeError = global.RangeError;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);


/***/ }),

/***/ 30678:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var typedArraySpeciesConstructor = __webpack_require__(66304);
var fails = __webpack_require__(47293);
var arraySlice = __webpack_require__(50206);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = arraySlice(aTypedArray(this), start, end);
  var C = typedArraySpeciesConstructor(this);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),

/***/ 27462:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var $some = __webpack_require__(42092).some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 33824:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(47293);
var aCallable = __webpack_require__(19662);
var internalSort = __webpack_require__(94362);
var ArrayBufferViewCore = __webpack_require__(90260);
var FF = __webpack_require__(68886);
var IE_OR_EDGE = __webpack_require__(30256);
var V8 = __webpack_require__(7392);
var WEBKIT = __webpack_require__(98008);

var Array = global.Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = global.Uint16Array;
var un$Sort = Uint16Array && uncurryThis(Uint16Array.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
  un$Sort(new Uint16Array(2), null);
}) && fails(function () {
  un$Sort(new Uint16Array(2), {});
}));

var STABLE_SORT = !!un$Sort && !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  un$Sort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return un$Sort(this, comparefn);

  return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);


/***/ }),

/***/ 55021:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(90260);
var toLength = __webpack_require__(17466);
var toAbsoluteIndex = __webpack_require__(51400);
var typedArraySpeciesConstructor = __webpack_require__(66304);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  var C = typedArraySpeciesConstructor(O);
  return new C(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),

/***/ 12974:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var apply = __webpack_require__(22104);
var ArrayBufferViewCore = __webpack_require__(90260);
var fails = __webpack_require__(47293);
var arraySlice = __webpack_require__(50206);

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return apply(
    $toLocaleString,
    TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
    arraySlice(arguments)
  );
}, FORCED);


/***/ }),

/***/ 15016:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var exportTypedArrayMethod = __webpack_require__(90260).exportTypedArrayMethod;
var fails = __webpack_require__(47293);
var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var join = uncurryThis([].join);

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return join(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);


/***/ }),

/***/ 8255:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 29135:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Uint32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 82472:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 49743:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(19843);

// `Uint8ClampedArray` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),

/***/ 78221:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(41340);

var fromCharCode = String.fromCharCode;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var stringSlice = uncurryThis(''.slice);

var hex2 = /^[\da-f]{2}$/i;
var hex4 = /^[\da-f]{4}$/i;

// `unescape` method
// https://tc39.es/ecma262/#sec-unescape-string
$({ global: true }, {
  unescape: function unescape(string) {
    var str = toString(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, part;
    while (index < length) {
      chr = charAt(str, index++);
      if (chr === '%') {
        if (charAt(str, index) === 'u') {
          part = stringSlice(str, index + 1, index + 5);
          if (exec(hex4, part)) {
            result += fromCharCode(parseInt(part, 16));
            index += 5;
            continue;
          }
        } else {
          part = stringSlice(str, index, index + 2);
          if (exec(hex2, part)) {
            result += fromCharCode(parseInt(part, 16));
            index += 2;
            continue;
          }
        }
      }
      result += chr;
    } return result;
  }
});


/***/ }),

/***/ 4129:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(17854);
var uncurryThis = __webpack_require__(1702);
var redefineAll = __webpack_require__(12248);
var InternalMetadataModule = __webpack_require__(62423);
var collection = __webpack_require__(77710);
var collectionWeak = __webpack_require__(29320);
var isObject = __webpack_require__(70111);
var isExtensible = __webpack_require__(52050);
var enforceIternalState = __webpack_require__(29909).enforce;
var NATIVE_WEAK_MAP = __webpack_require__(68536);

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.enable();
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = uncurryThis(WeakMapPrototype['delete']);
  var nativeHas = uncurryThis(WeakMapPrototype.has);
  var nativeGet = uncurryThis(WeakMapPrototype.get);
  var nativeSet = uncurryThis(WeakMapPrototype.set);
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      } return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      } return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      } return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);
      return this;
    }
  });
}


/***/ }),

/***/ 38478:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(77710);
var collectionWeak = __webpack_require__(29320);

// `WeakSet` constructor
// https://tc39.es/ecma262/#sec-weakset-constructor
collection('WeakSet', function (init) {
  return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionWeak);


/***/ }),

/***/ 54747:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var DOMIterables = __webpack_require__(48324);
var DOMTokenListPrototype = __webpack_require__(98509);
var forEach = __webpack_require__(18533);
var createNonEnumerableProperty = __webpack_require__(68880);

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ 33948:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(17854);
var DOMIterables = __webpack_require__(48324);
var DOMTokenListPrototype = __webpack_require__(98509);
var ArrayIteratorMethods = __webpack_require__(66992);
var createNonEnumerableProperty = __webpack_require__(68880);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ 84633:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var task = __webpack_require__(20261);

var FORCED = !global.setImmediate || !global.clearImmediate;

// http://w3c.github.io/setImmediate/
$({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});


/***/ }),

/***/ 85844:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var microtask = __webpack_require__(95948);
var IS_NODE = __webpack_require__(35268);

var process = global.process;

// `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
$({ global: true, enumerable: true, noTargetGet: true }, {
  queueMicrotask: function queueMicrotask(fn) {
    var domain = IS_NODE && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),

/***/ 32564:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var apply = __webpack_require__(22104);
var isCallable = __webpack_require__(60614);
var userAgent = __webpack_require__(88113);
var arraySlice = __webpack_require__(50206);

var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var Function = global.Function;

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      apply(isCallable(handler) ? handler : Function(handler), this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ 41637:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(66992);
var $ = __webpack_require__(82109);
var global = __webpack_require__(17854);
var getBuiltIn = __webpack_require__(35005);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var USE_NATIVE_URL = __webpack_require__(590);
var redefine = __webpack_require__(31320);
var redefineAll = __webpack_require__(12248);
var setToStringTag = __webpack_require__(58003);
var createIteratorConstructor = __webpack_require__(24994);
var InternalStateModule = __webpack_require__(29909);
var anInstance = __webpack_require__(25787);
var isCallable = __webpack_require__(60614);
var hasOwn = __webpack_require__(92597);
var bind = __webpack_require__(49974);
var classof = __webpack_require__(70648);
var anObject = __webpack_require__(19670);
var isObject = __webpack_require__(70111);
var $toString = __webpack_require__(41340);
var create = __webpack_require__(70030);
var createPropertyDescriptor = __webpack_require__(79114);
var getIterator = __webpack_require__(18554);
var getIteratorMethod = __webpack_require__(71246);
var wellKnownSymbol = __webpack_require__(5112);
var arraySort = __webpack_require__(94362);

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var n$Fetch = getBuiltIn('fetch');
var N$Request = getBuiltIn('Request');
var Headers = getBuiltIn('Headers');
var RequestPrototype = N$Request && N$Request.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp = global.RegExp;
var TypeError = global.TypeError;
var decodeURIComponent = global.decodeURIComponent;
var encodeURIComponent = global.encodeURIComponent;
var charAt = uncurryThis(''.charAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var splice = uncurryThis([].splice);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace(it, plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace(encodeURIComponent(it), find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = split(query, '&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = split(attribute, '=');
        push(result, {
          key: deserialize(shift(entry)),
          value: deserialize(join(entry, '='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (iteratorMethod) {
        iterator = getIterator(init, iteratorMethod);
        next = iterator.next;
        while (!(step = call(next, iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = call(entryNext, entryIterator)).done ||
            (second = call(entryNext, entryIterator)).done ||
            !call(entryNext, entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          push(entries, { key: $toString(first.value), value: $toString(second.value) });
        }
      } else for (key in init) if (hasOwn(init, key)) push(entries, { key: key, value: $toString(init[key]) });
    } else {
      parseSearchParams(
        entries,
        typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init)
      );
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    push(state.entries, { key: $toString(name), value: $toString(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) splice(entries, index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push(entries, { key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    push(result, serialize(entry.key) + '=' + serialize(entry.value));
  } return join(result, '&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && isCallable(Headers)) {
  var headersHas = uncurryThis(HeadersPrototype.has);
  var headersSet = uncurryThis(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable(n$Fetch)) {
    $({ global: true, enumerable: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return n$Fetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(N$Request)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestPrototype);
      return new N$Request(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $({ global: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ 60285:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(78783);
var $ = __webpack_require__(82109);
var DESCRIPTORS = __webpack_require__(19781);
var USE_NATIVE_URL = __webpack_require__(590);
var global = __webpack_require__(17854);
var bind = __webpack_require__(49974);
var call = __webpack_require__(46916);
var uncurryThis = __webpack_require__(1702);
var defineProperties = __webpack_require__(36048);
var redefine = __webpack_require__(31320);
var anInstance = __webpack_require__(25787);
var hasOwn = __webpack_require__(92597);
var assign = __webpack_require__(21574);
var arrayFrom = __webpack_require__(48457);
var arraySlice = __webpack_require__(50206);
var codeAt = __webpack_require__(28710).codeAt;
var toASCII = __webpack_require__(33197);
var $toString = __webpack_require__(41340);
var setToStringTag = __webpack_require__(58003);
var URLSearchParamsModule = __webpack_require__(41637);
var InternalStateModule = __webpack_require__(29909);

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global.URL;
var TypeError = global.TypeError;
var parseInt = global.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (charAt(input, 0) == '[') {
    if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(stringSlice(input, 1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) == '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }
    push(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() == ':') {
    if (charAt(input, 1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex == 8) return;
    if (chr() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (chr() == ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    } return join(result, '.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return hasOwn(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && exec(ALPHA, charAt(string, 0))
    && ((second = charAt(string, 1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
    string.length == 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.length--;
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements -- TODO
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, chr, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = replace(input, TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    chr = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (chr && exec(ALPHA, chr)) {
          buffer += toLowerCase(chr);
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
          buffer += toLowerCase(chr);
        } else if (chr == ':') {
          if (stateOverride && (
            (isSpecial(url) != hasOwn(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            push(url.path, '');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && chr == '#') {
          url.scheme = base.scheme;
          url.path = arraySlice(base.path);
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (chr == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (chr == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (chr == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = arraySlice(base.path);
          url.query = base.query;
        } else if (chr == '/' || (chr == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (chr == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = arraySlice(base.path);
          url.query = '';
          state = QUERY;
        } else if (chr == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = arraySlice(base.path);
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = arraySlice(base.path);
          url.path.length--;
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (chr == '/' || chr == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (chr == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (chr != '/' && chr != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (chr == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
          (chr == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += chr;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (chr == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
          (chr == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (chr == '[') seenBracket = true;
          else if (chr == ']') seenBracket = false;
          buffer += chr;
        } break;

      case PORT:
        if (exec(DIGIT, chr)) {
          buffer += chr;
        } else if (
          chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
          (chr == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (chr == '/' || chr == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (chr == EOF) {
            url.host = base.host;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr == '?') {
            url.host = base.host;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.host = base.host;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
              url.host = base.host;
              url.path = arraySlice(base.path);
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (chr == '/' || chr == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
          if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += chr;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (chr != '/' && chr != '\\') continue;
        } else if (!stateOverride && chr == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && chr == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (chr != EOF) {
          state = PATH;
          if (chr != '/') continue;
        } break;

      case PATH:
        if (
          chr == EOF || chr == '/' ||
          (chr == '\\' && isSpecial(url)) ||
          (!stateOverride && (chr == '?' || chr == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (chr != '/' && !(chr == '\\' && isSpecial(url))) {
              push(url.path, '');
            }
          } else if (isSingleDot(buffer)) {
            if (chr != '/' && !(chr == '\\' && isSpecial(url))) {
              push(url.path, '');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
            }
            push(url.path, buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              shift(url.path);
            }
          }
          if (chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(chr, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (chr == '?') {
          url.query = '';
          state = QUERY;
        } else if (chr == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (chr != EOF) {
          url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && chr == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (chr != EOF) {
          if (chr == "'" && isSpecial(url)) url.query += '%27';
          else if (chr == '#') url.query += '%23';
          else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = $toString(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    try {
      baseState = getInternalURLState(base);
    } catch (error) {
      failure = parseURL(baseState = {}, $toString(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = $toString(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = call(serializeURL, that);
    that.origin = call(getOrigin, that);
    that.protocol = call(getProtocol, that);
    that.username = call(getUsername, that);
    that.password = call(getPassword, that);
    that.host = call(getHost, that);
    that.hostname = call(getHostname, that);
    that.port = call(getPort, that);
    that.pathname = call(getPathname, that);
    that.search = call(getSearch, that);
    that.searchParams = call(getSearchParams, that);
    that.hash = call(getHash, that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URLConstructor(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : $toString(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = $toString(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, $toString(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = $toString(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, $toString(pathname), PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = $toString(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == charAt(search, 0)) search = stringSlice(search, 1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = $toString(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == charAt(hash, 0)) hash = stringSlice(hash, 1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return call(serializeURL, this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return call(serializeURL, this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ 83753:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(82109);
var call = __webpack_require__(46916);

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return call(URL.prototype.toString, this);
  }
});


/***/ }),

/***/ 28594:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(82526);
__webpack_require__(41817);
__webpack_require__(72443);
__webpack_require__(92401);
__webpack_require__(8722);
__webpack_require__(32165);
__webpack_require__(69007);
__webpack_require__(16066);
__webpack_require__(83510);
__webpack_require__(41840);
__webpack_require__(6982);
__webpack_require__(32159);
__webpack_require__(96649);
__webpack_require__(39341);
__webpack_require__(60543);
__webpack_require__(9170);
__webpack_require__(52262);
__webpack_require__(92222);
__webpack_require__(50545);
__webpack_require__(26541);
__webpack_require__(43290);
__webpack_require__(57327);
__webpack_require__(69826);
__webpack_require__(34553);
__webpack_require__(84944);
__webpack_require__(86535);
__webpack_require__(89554);
__webpack_require__(91038);
__webpack_require__(26699);
__webpack_require__(82772);
__webpack_require__(79753);
__webpack_require__(66992);
__webpack_require__(69600);
__webpack_require__(94986);
__webpack_require__(21249);
__webpack_require__(26572);
__webpack_require__(85827);
__webpack_require__(96644);
__webpack_require__(65069);
__webpack_require__(47042);
__webpack_require__(5212);
__webpack_require__(2707);
__webpack_require__(38706);
__webpack_require__(40561);
__webpack_require__(33792);
__webpack_require__(99244);
__webpack_require__(18264);
__webpack_require__(76938);
__webpack_require__(39575);
__webpack_require__(16716);
__webpack_require__(43016);
__webpack_require__(3843);
__webpack_require__(81801);
__webpack_require__(9550);
__webpack_require__(28733);
__webpack_require__(5735);
__webpack_require__(96078);
__webpack_require__(83710);
__webpack_require__(62130);
__webpack_require__(24812);
__webpack_require__(4855);
__webpack_require__(68309);
__webpack_require__(35837);
__webpack_require__(38862);
__webpack_require__(73706);
__webpack_require__(51532);
__webpack_require__(99752);
__webpack_require__(82376);
__webpack_require__(73181);
__webpack_require__(23484);
__webpack_require__(2388);
__webpack_require__(88621);
__webpack_require__(60403);
__webpack_require__(84755);
__webpack_require__(25438);
__webpack_require__(90332);
__webpack_require__(40658);
__webpack_require__(40197);
__webpack_require__(44914);
__webpack_require__(52420);
__webpack_require__(60160);
__webpack_require__(60970);
__webpack_require__(10408);
__webpack_require__(73689);
__webpack_require__(9653);
__webpack_require__(93299);
__webpack_require__(35192);
__webpack_require__(33161);
__webpack_require__(44048);
__webpack_require__(78285);
__webpack_require__(44363);
__webpack_require__(55994);
__webpack_require__(61874);
__webpack_require__(9494);
__webpack_require__(56977);
__webpack_require__(55147);
__webpack_require__(19601);
__webpack_require__(78011);
__webpack_require__(59595);
__webpack_require__(33321);
__webpack_require__(69070);
__webpack_require__(35500);
__webpack_require__(69720);
__webpack_require__(43371);
__webpack_require__(38559);
__webpack_require__(38880);
__webpack_require__(49337);
__webpack_require__(36210);
__webpack_require__(30489);
__webpack_require__(46314);
__webpack_require__(43304);
__webpack_require__(41825);
__webpack_require__(98410);
__webpack_require__(72200);
__webpack_require__(47941);
__webpack_require__(94869);
__webpack_require__(33952);
__webpack_require__(57227);
__webpack_require__(60514);
__webpack_require__(68304);
__webpack_require__(41539);
__webpack_require__(26833);
__webpack_require__(54678);
__webpack_require__(91058);
__webpack_require__(88674);
__webpack_require__(17922);
__webpack_require__(34668);
__webpack_require__(17727);
__webpack_require__(36535);
__webpack_require__(12419);
__webpack_require__(69596);
__webpack_require__(52586);
__webpack_require__(74819);
__webpack_require__(95683);
__webpack_require__(39361);
__webpack_require__(51037);
__webpack_require__(5898);
__webpack_require__(67556);
__webpack_require__(14361);
__webpack_require__(83593);
__webpack_require__(39532);
__webpack_require__(81299);
__webpack_require__(24603);
__webpack_require__(28450);
__webpack_require__(74916);
__webpack_require__(92087);
__webpack_require__(88386);
__webpack_require__(77601);
__webpack_require__(39714);
__webpack_require__(70189);
__webpack_require__(24506);
__webpack_require__(79841);
__webpack_require__(27852);
__webpack_require__(94953);
__webpack_require__(32023);
__webpack_require__(78783);
__webpack_require__(4723);
__webpack_require__(76373);
__webpack_require__(66528);
__webpack_require__(83112);
__webpack_require__(38992);
__webpack_require__(82481);
__webpack_require__(15306);
__webpack_require__(68757);
__webpack_require__(64765);
__webpack_require__(23123);
__webpack_require__(23157);
__webpack_require__(83650);
__webpack_require__(73210);
__webpack_require__(48702);
__webpack_require__(55674);
__webpack_require__(15218);
__webpack_require__(74475);
__webpack_require__(57929);
__webpack_require__(50915);
__webpack_require__(29253);
__webpack_require__(42125);
__webpack_require__(78830);
__webpack_require__(58734);
__webpack_require__(29254);
__webpack_require__(37268);
__webpack_require__(7397);
__webpack_require__(60086);
__webpack_require__(80623);
__webpack_require__(44197);
__webpack_require__(76495);
__webpack_require__(87145);
__webpack_require__(35109);
__webpack_require__(65125);
__webpack_require__(82472);
__webpack_require__(49743);
__webpack_require__(8255);
__webpack_require__(29135);
__webpack_require__(48675);
__webpack_require__(92990);
__webpack_require__(18927);
__webpack_require__(33105);
__webpack_require__(35035);
__webpack_require__(74345);
__webpack_require__(7174);
__webpack_require__(32846);
__webpack_require__(98145);
__webpack_require__(44731);
__webpack_require__(77209);
__webpack_require__(96319);
__webpack_require__(58867);
__webpack_require__(37789);
__webpack_require__(33739);
__webpack_require__(95206);
__webpack_require__(29368);
__webpack_require__(14483);
__webpack_require__(12056);
__webpack_require__(3462);
__webpack_require__(30678);
__webpack_require__(27462);
__webpack_require__(33824);
__webpack_require__(55021);
__webpack_require__(12974);
__webpack_require__(15016);
__webpack_require__(78221);
__webpack_require__(4129);
__webpack_require__(38478);
__webpack_require__(54747);
__webpack_require__(33948);
__webpack_require__(84633);
__webpack_require__(85844);
__webpack_require__(32564);
__webpack_require__(60285);
__webpack_require__(83753);
__webpack_require__(41637);

/* unused reexport */ __webpack_require__(40857);


/***/ }),

/***/ 8269:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
;(function(root, factory) {
	// https://github.com/umdjs/umd/blob/master/returnExports.js
	if (true) {
		// For Node.js.
		module.exports = factory(root);
	} else {}
}(typeof __webpack_require__.g != 'undefined' ? __webpack_require__.g : this, function(root) {

	if (root.CSS && root.CSS.escape) {
		return root.CSS.escape;
	}

	// https://drafts.csswg.org/cssom/#serialize-an-identifier
	var cssEscape = function(value) {
		if (arguments.length == 0) {
			throw new TypeError('`CSS.escape` requires an argument.');
		}
		var string = String(value);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
			// (U+FFFD).
			if (codeUnit == 0x0000) {
				result += '\uFFFD';
				continue;
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index == 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit == 0x002D
				)
			) {
				// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			if (
				// If the character is the first character and is a `-` (U+002D), and
				// there is no second character, […]
				index == 0 &&
				length == 1 &&
				codeUnit == 0x002D
			) {
				result += '\\' + string.charAt(index);
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit == 0x002D ||
				codeUnit == 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// https://drafts.csswg.org/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}
		return result;
	};

	if (!root.CSS) {
		root.CSS = {};
	}

	root.CSS.escape = cssEscape;
	return cssEscape;

}));


/***/ }),

/***/ 31795:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2016 Benjamin Tan <https://demoneaux.github.io/>
 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes["object"] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof __webpack_require__.g == 'object' && __webpack_require__.g;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'WebPositive',
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chrome',
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation 3',
      'PlayStation 4',
      'PlayStation Vita',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation 4': 1, 'PlayStation 3': 1, 'PlayStation Vita': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (isModuleScope && isHostType(context, 'system') && (data = [context.system])[0]) {
          os || (os = data[0].os || null);
          try {
            data[1] = context.require('ringo/engine').version;
            version = data[1].join('.');
            name = 'RingoJS';
          } catch(e) {
            if (data[0].global.system == context.system) {
              name = 'Narwhal';
            }
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          name = 'Node.js';
          arch = data.arch;
          os = data.platform;
          version = /[\d.]+/.exec(data.version)[0];
        }
        else if (rhino) {
          name = 'Rhino';
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      os = null;
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures && context.external === null) {
      description.unshift('platform preview');
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
       * "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (true) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return platform;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else {}
}.call(this));


/***/ }),

/***/ 35666:
/***/ (function(module) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ 1803:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "accessibility-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#accessibility",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 98323:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "add-alt-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#add-alt",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 26215:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "add-comment-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#add-comment",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 79498:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "add-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#add",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 59009:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "arrow-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#arrow",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 24702:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "calendar-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#calendar",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 34443:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "check-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#check",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 68056:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "chevron-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#chevron",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 83364:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "close-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#close",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 48469:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "document-blank-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#document-blank",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 60649:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "download-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#download",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 58286:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "dashboard-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#dashboard",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 24459:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "news-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#news",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 13211:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "notification-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#notification",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 31275:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "edifycalendar-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#edifycalendar",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 88173:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "edit-filter-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#edit-filter",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 64998:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "email-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#email",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 84634:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "event-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#event",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 22247:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "external-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#external",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 55798:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "favorite-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#favorite",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 74086:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "file-anyfile-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#file-anyfile",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 10400:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "file-doc-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#file-doc",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 15904:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "file-pdf-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#file-pdf",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 1559:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "file-ppt-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#file-ppt",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 44532:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "file-xls-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#file-xls",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 42174:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "generic-file-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#generic-file",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 86593:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "grid-view-usage",
      viewBox: "0 0 34 34",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#grid-view",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 76339:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "home-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#home",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 45962:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "information-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#information",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 86952:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "link-hover-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#link-hover",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 82125:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "list-view-usage",
      viewBox: "0 0 34 34",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#list-view",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 33154:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "logo-facebook-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#logo-facebook",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 21853:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "logo-instagram-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#logo-instagram",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 72195:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "logo-linkedin-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#logo-linkedin",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 19243:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "logo-twitter-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#logo-twitter",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 41783:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "logo-uni-usage",
      viewBox: "0 0 71 71",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#logo-uni",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 53296:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "map-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#map",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 48141:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "menu-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#menu",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 61011:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "ms-excel-document-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#ms-excel-document",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 85329:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "ms-powerpoint-document-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#ms-powerpoint-document",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 23944:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "ms-word-document-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#ms-word-document",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 63439:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "next-outline-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#next-outline",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 18069:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "no-results-usage",
      viewBox: "0 0 53 48",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#no-results",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 83292:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "overflow-menu-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#overflow-menu",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 82265:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "pause-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#pause",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 66663:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "pdf-file-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#pdf-file",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 19867:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "phone-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#phone",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 75853:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "play-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#play",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 14914:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "scroll-me-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#scroll-me",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 16897:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "search-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#search",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 35435:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "send-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#send",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 78731:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "subtract-alt-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#subtract-alt",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 21967:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "subtract-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#subtract",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 15877:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "time-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#time",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 90691:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "user-avatar-usage",
      viewBox: "0 0 32 32",
      url: __webpack_require__.p + "mysource_files/sprite-map.svg#user-avatar",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ 9034:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./accessibility.svg": 1803,
	"./add-alt.svg": 98323,
	"./add-comment.svg": 26215,
	"./add.svg": 79498,
	"./arrow.svg": 59009,
	"./calendar.svg": 24702,
	"./check.svg": 34443,
	"./chevron.svg": 68056,
	"./close.svg": 83364,
	"./document-blank.svg": 48469,
	"./download.svg": 60649,
	"./edify/dashboard.svg": 58286,
	"./edify/news.svg": 24459,
	"./edify/notification.svg": 13211,
	"./edifycalendar.svg": 31275,
	"./edit-filter.svg": 88173,
	"./email.svg": 64998,
	"./event.svg": 84634,
	"./external.svg": 22247,
	"./favorite.svg": 55798,
	"./file-anyfile.svg": 74086,
	"./file-doc.svg": 10400,
	"./file-pdf.svg": 15904,
	"./file-ppt.svg": 1559,
	"./file-xls.svg": 44532,
	"./generic-file.svg": 42174,
	"./grid-view.svg": 86593,
	"./home.svg": 76339,
	"./information.svg": 45962,
	"./link-hover.svg": 86952,
	"./list-view.svg": 82125,
	"./logo-facebook.svg": 33154,
	"./logo-instagram.svg": 21853,
	"./logo-linkedin.svg": 72195,
	"./logo-twitter.svg": 19243,
	"./logo-uni.svg": 41783,
	"./map.svg": 53296,
	"./menu.svg": 48141,
	"./ms-excel-document.svg": 61011,
	"./ms-powerpoint-document.svg": 85329,
	"./ms-word-document.svg": 23944,
	"./next-outline.svg": 63439,
	"./no-results.svg": 18069,
	"./overflow-menu.svg": 83292,
	"./pause.svg": 82265,
	"./pdf-file.svg": 66663,
	"./phone.svg": 19867,
	"./play.svg": 75853,
	"./scroll-me.svg": 14914,
	"./search.svg": 16897,
	"./send.svg": 35435,
	"./subtract-alt.svg": 78731,
	"./subtract.svg": 21967,
	"./time.svg": 15877,
	"./user-avatar.svg": 90691
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9034;

/***/ }),

/***/ 88593:
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"_args":[["axios@0.21.4","/Users/gtran/Development/stencils/design-system"]],"_from":"axios@0.21.4","_id":"axios@0.21.4","_inBundle":false,"_integrity":"sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==","_location":"/axios","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"axios@0.21.4","name":"axios","escapedName":"axios","rawSpec":"0.21.4","saveSpec":null,"fetchSpec":"0.21.4"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.21.4.tgz","_spec":"0.21.4","_where":"/Users/gtran/Development/stencils/design-system","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.14.0"},"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"homepage":"https://axios-http.com","jsdelivr":"dist/axios.min.js","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","fix":"eslint --fix lib/**/*.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","unpkg":"dist/axios.min.js","version":"0.21.4"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(27695);
/******/ 	__webpack_require__(29289);
/******/ 	__webpack_require__(25508);
/******/ 	__webpack_require__(67317);
/******/ 	__webpack_require__(40297);
/******/ 	__webpack_require__(90357);
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(58433);
/******/ 	__webpack_require__(57286);
/******/ 	__webpack_require__(17680);
/******/ 	__webpack_require__(80377);
/******/ 	__webpack_require__(73821);
/******/ 	__webpack_require__(88689);
/******/ 	__webpack_require__(86379);
/******/ 	__webpack_require__(23878);
/******/ 	__webpack_require__(95003);
/******/ 	__webpack_require__(64878);
/******/ 	__webpack_require__(46347);
/******/ 	__webpack_require__(28591);
/******/ 	__webpack_require__(25476);
/******/ 	__webpack_require__(93541);
/******/ 	__webpack_require__(66985);
/******/ 	__webpack_require__(44383);
/******/ 	__webpack_require__(41809);
/******/ 	__webpack_require__(79709);
/******/ 	__webpack_require__(98061);
/******/ 	__webpack_require__(98314);
/******/ 	__webpack_require__(2701);
/******/ 	__webpack_require__(68973);
/******/ 	__webpack_require__(11652);
/******/ 	__webpack_require__(11685);
/******/ 	__webpack_require__(40640);
/******/ 	__webpack_require__(27272);
/******/ 	__webpack_require__(43884);
/******/ 	__webpack_require__(73747);
/******/ 	__webpack_require__(1930);
/******/ 	__webpack_require__(77099);
/******/ 	__webpack_require__(67233);
/******/ 	var __webpack_exports__ = __webpack_require__(68199);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map