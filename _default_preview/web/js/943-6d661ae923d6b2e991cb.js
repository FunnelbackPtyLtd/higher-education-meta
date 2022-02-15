"use strict";
(self["webpackChunkPlug_and_Play_Template"] = self["webpackChunkPlug_and_Play_Template"] || []).push([[943],{

/***/ 37943:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ People; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48131);




function partial(props) {
  const {
    data,
    index,
    handleClick,
    selectedIndex,
    childRefs
  } = props;
  const {
    action,
    disp: {
      metaData
    }
  } = data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
    tabIndex: -1,
    ref: childRefs,
    id: "".concat(index),
    key: "result-people-".concat(index),
    role: selectedIndex === index && 'gridcell',
    "aria-selected": selectedIndex === index,
    className: "autocomplete-concierge__search-result-item",
    onClick: e => handleClick(e, action),
    "data-link": action
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", {
    className: "title"
  }, metaData.peopleFirstName, metaData.peopleLastName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "details"
  }, metaData.peopleDepartment && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "autocomplete-results__metadata"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: "svg-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", {
    href: "#building"
  })), metaData.peopleDepartment), metaData.peoplePhone && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "autocomplete-results__metadata"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: "svg-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", {
    href: "#phone"
  })), metaData.peoplePhone), metaData.peopleEmail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "autocomplete-results__metadata"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: "svg-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", {
    href: "#email"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: "mailto:".concat(metaData.peopleEmail)
  }, metaData.peopleEmail))));
}

function People(props) {
  const {
    id,
    label,
    className,
    templateId,
    childRefs
  } = props;
  const {
    results,
    selectedIndex
  } = (0,_store__WEBPACK_IMPORTED_MODULE_2__/* .useStore */ .o)();

  const handleClick = (e, action) => {
    e.preventDefault();
    document.location.href = action;
  };

  if (!results[templateId] || results[templateId].length === 0) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    id: "result-row-".concat(id),
    className: ["autocomplete-concierge__section", className].join(' '),
    role: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "autocomplete-concierge__section-title"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", null, results[templateId] && results[templateId].map((data, index) => partial({
    data,
    index,
    handleClick,
    selectedIndex,
    childRefs
  }))));
}
const {
  string,
  number,
  func
} = (prop_types__WEBPACK_IMPORTED_MODULE_1___default());
People.propTypes = {
  id: string.isRequired,
  label: string,
  className: string,
  templateId: number.isRequired,
  childRefs: func.isRequired
};
People.defaultProps = {
  label: "",
  className: ""
};

/***/ })

}]);
//# sourceMappingURL=943-6d661ae923d6b2e991cb.js.map