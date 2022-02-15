(self["webpackChunkPlug_and_Play_Template"] = self["webpackChunkPlug_and_Play_Template"] || []).push([[701],{

/***/ 82424:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ AutocompleteProvider; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(33948);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/@react-aria/interactions/dist/module.js
var dist_module = __webpack_require__(27354);
// EXTERNAL MODULE: ./src/modules/autocomplete-concierge/jsx/store.jsx
var store = __webpack_require__(48131);
// EXTERNAL MODULE: ./src/modules/autocomplete-concierge/jsx/reducer.js
var reducer = __webpack_require__(6838);
// EXTERNAL MODULE: ./src/modules/autocomplete-concierge/jsx/helpers.js
var helpers = __webpack_require__(66004);
;// CONCATENATED MODULE: ./src/modules/_data-layer/js/Services/AutocompleteService/AutocompleteService.js


/*!
 * @license
 * Copyright Squiz Australia Pty Ltd. All Rights Reserved.
 */

/* eslint-disable import/prefer-default-export */
class AutocompleteService {
  constructor(adapters) {
    if (!adapters || adapters.length === 0) {
      throw new Error("At least one adapter is required for AutocompleteService");
    }

    this.autocompleteAdapters = [];
    const availableAdapters = ['FunnelbackAutocompleteAdapter'];
    Array.from(adapters).forEach(adapter => {
      if (availableAdapters.indexOf(adapter.constructor.name) === -1) {
        throw new Error("".concat(adapter.constructor.name, " is not implemented yet"));
      } else {
        this.registerAdapter(adapter);
      }
    });
  }

  registerAdapter(adapter) {
    this.autocompleteAdapters.push(adapter);
  }
  /**
   * Get search results.
   *
   * @param {string} args query string.
   * @param {function} mockFn Unit test mock function.
   *
   * @returns {Promise<array>} A promised list of search results.
   */


  getResults(args, mockFn) {
    return Promise.all(this.autocompleteAdapters.map(adapter => adapter.getResults(args, mockFn))).then(result => {
      const mappedResults = [];
      let resultsCount = 0;
      let i = 0; // Match each result with its template id.

      result.map((_ref, idx) => {
        let {
          data
        } = _ref;
        resultsCount += data.length;
        mappedResults[idx] = [];

        if (data.length) {
          data.forEach(element => {
            // eslint-disable-next-line no-plusplus
            mappedResults[idx][i++] = element;
          });
        }

        return mappedResults;
      });
      return {
        results: mappedResults,
        count: resultsCount
      };
    }).catch(error => {
      /* eslint-disable no-console */
      console.error(error);
      return {
        results: 0,
        count: 0,
        error
      };
    });
  }

}
;// CONCATENATED MODULE: ./src/modules/autocomplete-concierge/jsx/autocomplete.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



/* eslint-disable react/jsx-props-no-spreading */







/**
 * Lazy load result templates. We could not use standard hook to laad, as we need to pass array of refs.
 * With memo we caching function but still have ability to rebuild props when refs are changed.
 *
 * @param {object} props Object with props we want to pass into component.
 *
 * @returns {JSX.Element}
 * @constructor
 */

const LoadTemplates = props => {
  const componentName = props.template.toLowerCase();
  const DynamicComponent = (0,react.useMemo)(() => /*#__PURE__*/(0,react.lazy)(() => __webpack_require__(42276)("./".concat(componentName))), []);
  return /*#__PURE__*/react.createElement(react.Suspense, {
    key: "component-".concat(componentName),
    fallback: /*#__PURE__*/react.createElement("span", {
      className: "sr-only"
    }, "Loading component...")
  }, /*#__PURE__*/react.createElement(DynamicComponent, props));
};

function Autocomplete(props) {
  const {
    id,
    templates,
    placeholder,
    debounce,
    action,
    method,
    hiddenFields
  } = props;
  const {
    setSelectedIndex,
    selectedIndex,
    count,
    fetchResults
  } = (0,store/* useStore */.o)();
  const [activeDescendant, setActiveDescendant] = (0,react.useState)(null);
  const [submit, setSubmit] = (0,react.useState)(null);
  const [showResults, setShowResults] = (0,react.useState)(null);
  const [query, setQuery] = (0,react.useState)("");
  const [readerAnnounce, setReaderAnnounce] = (0,react.useState)("");
  const formRef = (0,react.useRef)();
  const searchBox = /*#__PURE__*/(0,react.createRef)();
  const [elements, childRefs] = (0,helpers/* useArrayRef */.S5)();
  const {
    keyboardProps
  } = (0,dist_module/* useKeyboard */.v5)({
    onKeyUp: e => {
      let index = -1; // ESC

      if (e.keyCode === 27) {
        setShowResults(false);
        setSelectedIndex(-1);
        return;
      } // Down


      if (e.keyCode === 40) {
        index = selectedIndex + 1 >= count ? 0 : selectedIndex + 1;
      } // Up


      if (e.keyCode === 38) {
        index = selectedIndex - 1 < 0 ? count - 1 : selectedIndex - 1;
      } // Enter


      if (e.keyCode === 13) {
        // Nothing selected and enter hit we will post form.
        if (selectedIndex === -1) {
          setSubmit(true);
          return;
        } // We will fire onClick event when enter hit


        elements[selectedIndex].click();
      }

      setSelectedIndex(index);
      setActiveDescendant(index);
      setShowResults(count > 0);
    },
    onKeyDown: e => {
      // This wil prevent moving cursor on input field when press down or up also stop form from being posted when enter pressed.
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13) {
        e.preventDefault();
      }

      return false;
    }
  }); // This is to handle clicks outside the combobox.

  const {
    focusWithinProps
  } = (0,dist_module/* useFocusWithin */.L_)({
    onFocusWithin: () => {
      setShowResults(count > 0);
    },
    onBlurWithin: () => {
      setShowResults(false);
    }
  }); // Let the screen readers know we have or not results.

  (0,react.useEffect)(() => {
    setShowResults(count > 0);
    const message = count > 0 ? "".concat(count, " results for ").concat(query) : "No results found for ".concat(query);
    setReaderAnnounce(message);
  }, [count, query]); // When query changed we debounce network request.

  (0,react.useEffect)(() => {
    const delayDebounceFn = setTimeout(async () => {
      await fetchResults(query, templates);
    }, debounce);
    return () => clearTimeout(delayDebounceFn);
  }, [query]); // This is to handle form submissions.

  (0,react.useEffect)(() => {
    if (submit && formRef.current && searchBox.current) {
      searchBox.current.value = query;
      formRef.current.submit();
    }
  }, [submit]);

  const handleInputOnChange = _ref => {
    let {
      currentTarget: {
        value
      }
    } = _ref;
    setQuery(value);
  }; // Standard onClick handler, can be overridden within template component.


  const handleClick = (e, value) => {
    e.preventDefault();
    setQuery(value);
    setSubmit(true);
  };

  return /*#__PURE__*/react.createElement("div", {
    className: "autocomplete-concierge no-wysiwyg"
  }, /*#__PURE__*/react.createElement("div", _extends({}, focusWithinProps, {
    role: "combobox",
    "aria-expanded": showResults,
    "aria-owns": "".concat(id, "-grid"),
    "aria-haspopup": "grid",
    "aria-controls": "".concat(id, "-input"),
    id: "".concat(id, "-combobox")
  }), /*#__PURE__*/react.createElement("form", {
    ref: formRef,
    action: action,
    method: method,
    onSubmit: e => e.preventDefault(),
    className: "autocomplete-concierge__form-wrapper"
  }, /*#__PURE__*/react.createElement("label", {
    htmlFor: "".concat(id, "-input"),
    id: "".concat(id, "-label"),
    className: "sr-only"
  }, "Autocomplete search concierge"), /*#__PURE__*/react.createElement("input", _extends({}, keyboardProps, {
    ref: searchBox,
    type: "text",
    id: "".concat(id, "-input"),
    autoComplete: "off",
    "aria-autocomplete": "list",
    "aria-controls": "".concat(id, "-grid"),
    "aria-activedescendant": activeDescendant,
    placeholder: placeholder,
    onChange: handleInputOnChange,
    onClick: () => setShowResults(count > 0),
    value: query,
    className: "autocomplete-concierge__input",
    name: "query"
  })), hiddenFields && hiddenFields.map(el => /*#__PURE__*/react.createElement("input", {
    key: el.id,
    type: "hidden",
    name: el.name,
    value: el.value
  })), /*#__PURE__*/react.createElement("button", {
    type: "submit",
    className: "autocomplete-concierge__submit",
    onClick: () => setSubmit(true)
  }, /*#__PURE__*/react.createElement("svg", {
    className: "svg-icon"
  }, /*#__PURE__*/react.createElement("title", null, "Submit search"), /*#__PURE__*/react.createElement("use", {
    href: "#search"
  }))), /*#__PURE__*/react.createElement("div", {
    className: "sr-only",
    "aria-live": "polite"
  }, readerAnnounce)), /*#__PURE__*/react.createElement("div", _extends({}, keyboardProps, {
    role: "grid",
    "aria-labelledby": "".concat(id, "-label"),
    id: "".concat(id, "-grid"),
    className: ["autocomplete-concierge__results", !showResults && "hidden"].join(' '),
    tabIndex: -1
  }), templates && templates.map((el, templateId) => LoadTemplates({ ...el,
    templateId,
    handleClick,
    childRefs
  })))));
}

function AutocompleteProvider(props) {
  const {
    adapters
  } = props;
  const autocompleteService = new AutocompleteService(adapters);
  return /*#__PURE__*/react.createElement(store/* StoreProvider */.g, {
    initialState: reducer/* initialState */.E3,
    reducer: reducer/* searchReducer */.fG,
    autocompleteService: autocompleteService
  }, /*#__PURE__*/react.createElement(Autocomplete, props));
}
const {
  string,
  arrayOf,
  shape,
  number
} = (prop_types_default());
Autocomplete.propTypes = {
  id: string,
  templates: arrayOf(shape({
    id: string,
    label: string,
    template: string,
    serviceUrl: string,
    params: string
  })).isRequired,
  placeholder: string,
  debounce: number,
  action: string,
  method: string
};
Autocomplete.defaultProps = {
  id: 'autocomplete-search',
  placeholder: 'Start your search here...',
  debounce: 500,
  action: 'search.html',
  method: 'GET'
};

/***/ }),

/***/ 6838:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E3": function() { return /* binding */ initialState; },
/* harmony export */   "fG": function() { return /* binding */ searchReducer; },
/* harmony export */   "Ix": function() { return /* binding */ autocompleteContext; }
/* harmony export */ });
/* unused harmony exports UPDATE_QUERY, UPDATE_RESULTS, SET_SELECTED */
const UPDATE_QUERY = 'PNP/AUTOCOMPLETE/UPDATE_QUERY';
const UPDATE_RESULTS = 'PNP/AUTOCOMPLETE/UPDATE_RESULTS';
const SET_SELECTED = 'PNP/AUTOCOMPLETE/SET_SELECTED';
const initialState = {
  results: [],
  count: 0,
  selectedIndex: -1
};
const searchReducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case UPDATE_RESULTS:
      return { ...state,
        results: action.results,
        count: action.count,
        selectedIndex: -1
      };

    case SET_SELECTED:
      return { ...state,
        selectedIndex: action.selectedIndex
      };

    default:
      return { ...state
      };
  }
};
const autocompleteContext = (dispatch, service) => ({
  updateResults: (results, count) => {
    dispatch({
      type: UPDATE_RESULTS,
      results,
      count
    });
  },
  setSelectedIndex: selectedIndex => {
    dispatch({
      type: SET_SELECTED,
      selectedIndex
    });
  },
  fetchResults: async query => {
    if (!query) {
      dispatch({
        type: UPDATE_RESULTS,
        results: [],
        count: 0
      });
      return;
    }

    const {
      results,
      count,
      error
    } = await service.getResults(query);

    if (error) {
      console.error("There was an error fetching results from the service");
      console.info(error.message);
      dispatch({
        type: UPDATE_RESULTS,
        results: [],
        count: 0
      });
      return;
    }

    dispatch({
      type: UPDATE_RESULTS,
      results,
      count
    });
  }
});

/***/ }),

/***/ 48131:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": function() { return /* binding */ useStore; },
/* harmony export */   "g": function() { return /* binding */ StoreProvider; }
/* harmony export */ });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33948);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6838);



const Store = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
Store.displayName = 'PNP-STORE';
const useStore = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Store);
const StoreProvider = _ref => {
  let {
    children,
    initialState,
    reducer,
    autocompleteService
  } = _ref;
  const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, initialState);
  const autocomplete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_reducer__WEBPACK_IMPORTED_MODULE_2__/* .autocompleteContext */ .Ix)(dispatch, autocompleteService), []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Store.Provider, {
    value: { ...autocomplete,
      dispatch,
      ...state
    }
  }, children);
};

/***/ }),

/***/ 92703:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(50414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 45697:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(92703)();
}


/***/ }),

/***/ 50414:
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 42276:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./organic": [
		44113,
		113
	],
	"./organic.jsx": [
		44113,
		113
	],
	"./people": [
		37943,
		943
	],
	"./people.jsx": [
		37943,
		943
	],
	"./programs": [
		53489,
		489
	],
	"./programs.jsx": [
		53489,
		489
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function() { return Object.keys(map); };
webpackAsyncContext.id = 42276;
module.exports = webpackAsyncContext;

/***/ })

}]);
//# sourceMappingURL=AutocompleteProvider-fe1b96e9da8b550ffbb7.js.map