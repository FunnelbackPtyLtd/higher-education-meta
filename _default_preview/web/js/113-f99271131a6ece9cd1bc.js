"use strict";
(self["webpackChunkPlug_and_Play_Template"] = self["webpackChunkPlug_and_Play_Template"] || []).push([[113],{

/***/ 44113:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Organic; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15306);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48131);





function partial(_ref) {
  let {
    index,
    data,
    query,
    selectedIndex,
    handleClick,
    childRefs
  } = _ref;
  const item = data.replace(new RegExp(query, 'gi'), match => "<span class=\"highlight\">".concat(match, "</span>"));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", {
    ref: childRefs,
    role: selectedIndex === index && 'gridcell',
    "aria-label": "".concat(data),
    id: "".concat(index),
    key: "organic-".concat(index),
    "aria-selected": selectedIndex === index,
    className: "autocomplete-concierge__search-result-item organic",
    dangerouslySetInnerHTML: {
      __html: item
    },
    onClick: e => handleClick(e, data)
  });
}

function Organic(props) {
  const {
    id,
    label,
    className,
    templateId,
    childRefs,
    handleClick
  } = props;
  const {
    results,
    selectedIndex,
    query
  } = (0,_store__WEBPACK_IMPORTED_MODULE_3__/* .useStore */ .o)();

  if (!results[templateId] || results[templateId].length === 0) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    id: "result-row-".concat(id),
    className: ["autocomplete-concierge__section", className].join(' '),
    role: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    className: "autocomplete-concierge__section-title"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("ul", {
    role: "rowgroup"
  }, results[templateId] && results[templateId].map((data, index) => partial({
    index,
    data,
    query,
    selectedIndex,
    handleClick,
    childRefs
  }))));
}
const {
  string,
  number,
  func
} = (prop_types__WEBPACK_IMPORTED_MODULE_2___default());
Organic.propTypes = {
  id: string.isRequired,
  label: string,
  className: string,
  templateId: number.isRequired,
  childRefs: func.isRequired,
  handleClick: func
};
Organic.defaultProps = {
  label: "",
  className: "",
  handleClick: () => {}
};

/***/ })

}]);
//# sourceMappingURL=113-f99271131a6ece9cd1bc.js.map