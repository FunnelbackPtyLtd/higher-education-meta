"use strict";
(self["webpackChunkPlug_and_Play_Template"] = self["webpackChunkPlug_and_Play_Template"] || []).push([[213],{

/***/ 19677:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Calendar; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(33948);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@react-aria/overlays/dist/module.js + 2 modules
var dist_module = __webpack_require__(39861);
// EXTERNAL MODULE: ./src/modules/_data-layer/jsx/global.js + 3 modules
var global = __webpack_require__(86632);
// EXTERNAL MODULE: ./src/modules/_data-layer/js/global.js + 16 modules
var js_global = __webpack_require__(20459);
// EXTERNAL MODULE: ./node_modules/@react-aria/interactions/dist/module.js
var interactions_dist_module = __webpack_require__(27354);
;// CONCATENATED MODULE: ./src/modules/button-menu/jsx/button-menu.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



/* eslint-disable react/prefer-stateless-function */


function ButtonMenu(_ref) {
  let {
    uniqueId,
    icon,
    iconTitle,
    text,
    children,
    className
  } = _ref;
  const buttonRef = /*#__PURE__*/(0,react.createRef)();
  const [isOpen, setIsOpen] = (0,react.useState)(false); // Watch the focus and blur on the menu and close if focus leaves the control

  const {
    focusWithinProps
  } = (0,interactions_dist_module/* useFocusWithin */.L_)({
    onBlurWithin: () => {
      setIsOpen(false);
    }
  }); // Listen for Esc key within this element

  const {
    keyboardProps
  } = (0,interactions_dist_module/* useKeyboard */.v5)({
    onKeyDown: e => {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current.focus(); // Restore focus to the element which opened the menu
      }
    }
  }); // Wrap the children onClick so the menu can be closed at the same time

  const modifiedChildren = react.Children.map(children, child => {
    if ( /*#__PURE__*/react.isValidElement(child)) {
      return /*#__PURE__*/react.cloneElement(child, {
        onClick: () => {
          setIsOpen(false);
          buttonRef.current.focus(); // Restore focus to the element which opened the menu

          child.props.onClick();
        }
      });
    }

    return child;
  });
  return /*#__PURE__*/react.createElement("div", _extends({}, focusWithinProps, keyboardProps, {
    className: "button-menu ".concat(className)
  }), /*#__PURE__*/react.createElement("button", {
    ref: buttonRef,
    type: "button",
    "aria-expanded": isOpen,
    "aria-controls": "".concat(uniqueId, "-button-menu-menu"),
    onClick: () => setIsOpen(!isOpen),
    className: "button-menu__button"
  }, icon && /*#__PURE__*/react.createElement("svg", {
    className: "svg-icon button-menu__icon"
  }, iconTitle && /*#__PURE__*/react.createElement("title", null, iconTitle), /*#__PURE__*/react.createElement("use", {
    href: "#".concat(icon)
  })), text && /*#__PURE__*/react.createElement("span", {
    className: "button-menu__label"
  }, text)), /*#__PURE__*/react.createElement("ul", {
    id: "".concat(uniqueId, "-button-menu-menu"),
    className: "button-menu__menu ".concat(isOpen ? 'button-menu__menu--open' : '')
  }, modifiedChildren));
}
function ButtonMenuItem(_ref2) {
  let {
    label,
    onClick
  } = _ref2;
  return /*#__PURE__*/react.createElement("li", {
    className: "button-menu__item"
  }, /*#__PURE__*/react.createElement("button", {
    type: "button",
    onClick: onClick,
    className: "button-menu__item-select"
  }, /*#__PURE__*/react.createElement("span", {
    className: "button-menu__item-label"
  }, label)));
}
// EXTERNAL MODULE: ./node_modules/@react-aria/dialog/dist/module.js
var dialog_dist_module = __webpack_require__(34708);
// EXTERNAL MODULE: ./node_modules/@react-aria/focus/dist/module.js
var focus_dist_module = __webpack_require__(49641);
;// CONCATENATED MODULE: ./src/modules/modal/jsx/modal.jsx
function modal_extends() { modal_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return modal_extends.apply(this, arguments); }

/* eslint-disable react/jsx-props-no-spreading */
// Disabled as prop spreading is the documented way to use the @react-aria framework




/**
 * React implementation of the Plug and Play Modal, uses the Adobe @react-aria package
 * to handle the modal / dialog related accessability concerns such as focus movement, focus traps,
 * ESC to close ect.
 *
 * Needs to be wrapped within a <OverlayProvider> to aria hide the application when the modal opens.
 *
 * Comments on @react-aria hooks come directly from their documentation.
 */

function Modal(_ref) {
  let {
    title,
    closeLabel,
    onClose,
    children,
    footer,
    customFooter,
    className
  } = _ref;
  return /*#__PURE__*/react.createElement(dist_module/* OverlayContainer */.Xj, null, /*#__PURE__*/react.createElement("div", {
    className: "no-wysiwyg modal-wrapper ".concat(className, "-wrapper")
  }, /*#__PURE__*/react.createElement(focus_dist_module/* FocusScope */.MT, {
    contain: true,
    restoreFocus: true,
    autoFocus: true
  }, /*#__PURE__*/react.createElement(ModalContent, {
    title: title,
    closeLabel: closeLabel,
    onClose: onClose,
    footer: footer,
    customFooter: customFooter,
    className: className
  }, children))));
}

function ModalContent(_ref2) {
  let {
    title,
    closeLabel,
    onClose,
    children,
    footer,
    customFooter,
    className
  } = _ref2;
  // Base settings for @react-aria hooks
  const settings = {
    title,
    onClose,
    isDismissable: true,
    isOpen: true
  };
  const modalRef = react.useRef();
  const modalContentRef = react.useRef();
  const focusManager = (0,focus_dist_module/* useFocusManager */.bO)();
  /*
      Provides the behavior for overlays such as dialogs, popovers, and menus. Hides the overlay when 
      the user interacts outside it, when the Escape key is pressed, or optionally, on blur. 
  */

  const {
    overlayProps,
    underlayProps
  } = (0,dist_module/* useOverlay */.Ir)(settings, modalContentRef);
  /*
      Prevents scrolling on the document body on mount, and restores it on unmount. 
      Also ensures that content does not shift due to the scrollbars disappearing.
  */

  (0,dist_module/* usePreventScroll */.tk)();
  /*
      Hides content outside the current <OverlayContainer> from screen readers on mount and restores it on unmount.
  */

  const {
    modalProps
  } = (0,dist_module/* useModal */.dd)();
  /*
      Provides the behavior and accessibility implementation for a dialog component.
  */

  const {
    dialogProps,
    titleProps
  } = (0,dialog_dist_module/* useDialog */.R)(settings, modalContentRef);
  /*
      Remove the hidden attribute as soon as its drawn to the DOM so it transitions open like
      the base ES6 modal in the framework.
  */

  (0,react.useEffect)(() => {
    modalRef.current.removeAttribute('hidden');
    focusManager.focusFirst(); // FocusScope autofocus property wont work due to being hidden so focus first now
  }, [modalRef]);
  return /*#__PURE__*/react.createElement("div", modal_extends({
    ref: modalRef
  }, underlayProps, {
    hidden: true,
    className: "modal  ".concat(className)
  }), /*#__PURE__*/react.createElement("div", modal_extends({
    ref: modalContentRef
  }, overlayProps, dialogProps, modalProps, {
    tabIndex: "-1",
    className: "modal__content ".concat(className, "__content")
  }), title &&
  /*#__PURE__*/
  // Only include if title provided
  react.createElement("header", {
    className: "".concat(className, "__header")
  }, /*#__PURE__*/react.createElement("h1", modal_extends({}, titleProps, {
    className: "".concat(className, "__title")
  }), title), /*#__PURE__*/react.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "".concat(className, "__header-close")
  }, /*#__PURE__*/react.createElement("svg", {
    className: "svg-icon"
  }, /*#__PURE__*/react.createElement("title", null, "Close modal"), /*#__PURE__*/react.createElement("use", {
    href: "#close"
  })))), /*#__PURE__*/react.createElement("section", {
    className: "".concat(className, "__body")
  }, children), !footer && !customFooter &&
  /*#__PURE__*/
  // Allow disabling of footer
  react.createElement("footer", {
    className: "".concat(className, "__footer")
  }, /*#__PURE__*/react.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "".concat(className, "__close")
  }, closeLabel || 'Close')), !footer && !!customFooter && customFooter));
}
// EXTERNAL MODULE: ./src/modules/calendar/jsx/enums.jsx
var enums = __webpack_require__(46984);
// EXTERNAL MODULE: ./node_modules/react-day-picker/lib/react-day-picker.min.js
var react_day_picker_min = __webpack_require__(63738);
var react_day_picker_min_default = /*#__PURE__*/__webpack_require__.n(react_day_picker_min);
// EXTERNAL MODULE: ./node_modules/react-day-picker/lib/style.css
var style = __webpack_require__(6564);
;// CONCATENATED MODULE: ./src/modules/calendar/jsx/dateControlHeader.jsx
function dateControlHeader_extends() { dateControlHeader_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return dateControlHeader_extends.apply(this, arguments); }



/* eslint-disable react/prefer-stateless-function */




function DateControlHeader(_ref) {
  let {
    date,
    onDateChange
  } = _ref;
  const datePickerButtonRef = /*#__PURE__*/(0,react.createRef)();
  const [isDatePickerOpen, setIsDatePickerOpen] = (0,react.useState)(false); // Handlers for changing the date via the header buttons

  const addDaysToDate = _ref2 => {
    let {
      numberOfDays
    } = _ref2;
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numberOfDays);
    onDateChange(newDate);
  };

  const handleSetDateToday = () => {
    onDateChange(new Date());
  };

  const handleDatePickerSelected = selectedDate => {
    onDateChange(selectedDate);
    setIsDatePickerOpen(false); // Restore focus to the element which opened the picker

    datePickerButtonRef.current.focus();
  }; // Watch the focus and blur on the date picker and close if focus leaves the control


  const {
    focusWithinProps
  } = (0,interactions_dist_module/* useFocusWithin */.L_)({
    onBlurWithin: () => {
      setIsDatePickerOpen(false);
    }
  }); // Listen for Esc key within the date picker

  const {
    keyboardProps
  } = (0,interactions_dist_module/* useKeyboard */.v5)({
    onKeyDown: e => {
      if (isDatePickerOpen && e.key === 'Escape') {
        setIsDatePickerOpen(false); // Restore focus to the element which opened the picker

        datePickerButtonRef.current.focus();
      }
    }
  });
  return /*#__PURE__*/react.createElement("div", {
    className: "calendar-sub-header"
  }, /*#__PURE__*/react.createElement("div", dateControlHeader_extends({}, focusWithinProps, keyboardProps, {
    className: "calendar-date-picker"
  }), /*#__PURE__*/react.createElement("button", {
    ref: datePickerButtonRef,
    type: "button",
    onClick: () => setIsDatePickerOpen(!isDatePickerOpen),
    className: "calendar-date-picker__button"
  }, /*#__PURE__*/react.createElement("span", {
    className: "calendar-date-picker__button-aria"
  }, "Toggle date picker"), date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }), /*#__PURE__*/react.createElement("svg", {
    "aria-hidden": true,
    className: "svg-icon svg-icon--small"
  }, /*#__PURE__*/react.createElement("use", {
    href: "#chevron"
  }))), /*#__PURE__*/react.createElement("div", {
    className: "calendar-date-picker__picker ".concat(isDatePickerOpen ? 'calendar-date-picker__picker--open' : '')
  }, /*#__PURE__*/react.createElement((react_day_picker_min_default()), {
    onDayClick: handleDatePickerSelected
  }))), /*#__PURE__*/react.createElement("div", {
    className: "calendar-sub-header__date-controls"
  }, /*#__PURE__*/react.createElement("button", {
    type: "button",
    onClick: handleSetDateToday,
    className: "calendar-sub-header__date-action"
  }, "Today"), /*#__PURE__*/react.createElement("button", {
    type: "button",
    onClick: () => addDaysToDate({
      numberOfDays: -1
    }),
    className: "calendar-sub-header__date-action"
  }, /*#__PURE__*/react.createElement("svg", {
    className: "svg-icon svg-icon--small svg-icon--previous"
  }, /*#__PURE__*/react.createElement("title", null, "Previous day"), /*#__PURE__*/react.createElement("use", {
    href: "#chevron"
  }))), /*#__PURE__*/react.createElement("button", {
    type: "button",
    onClick: () => addDaysToDate({
      numberOfDays: 1
    }),
    className: "calendar-sub-header__date-action"
  }, /*#__PURE__*/react.createElement("svg", {
    className: "svg-icon svg-icon--small svg-icon--next"
  }, /*#__PURE__*/react.createElement("title", null, "Next day"), /*#__PURE__*/react.createElement("use", {
    href: "#chevron"
  })))));
}
// EXTERNAL MODULE: ./node_modules/@fullcalendar/react/dist/main.js + 1 modules
var main = __webpack_require__(306);
// EXTERNAL MODULE: ./node_modules/@fullcalendar/timegrid/main.js + 3 modules
var timegrid_main = __webpack_require__(23574);
// EXTERNAL MODULE: ./node_modules/@fullcalendar/rrule/main.js + 29 modules
var rrule_main = __webpack_require__(51872);
;// CONCATENATED MODULE: ./src/modules/calendar/jsx/event-types/BaseCalendarEvent.jsx


/**
 * BaseCalendarEvent which contains the generic event rendering templates used within the application
 * for the various Full Calendar view render hooks and the onClick modal view.
 */

class BaseCalendarEvent {
  constructor(event, fcEvent) {
    this.event = event; // This is always the full payload from the data source, NEVER the fcEvent

    this.fcEvent = fcEvent; // Optional
  }
  /**
   * Get the title to use in the event render
   * @returns {string} title to use in FullCalendar event displays
   */


  getCalendarItemTitle() {
    return this.event.title;
  }
  /**
   * Get the Full Calendar event content for the DayView
   * @returns {JSX Object} content
   */


  getDayViewContent() {
    const title = this.getCalendarItemTitle();
    let {
      start,
      end
    } = this.event;
    const {
      allDay,
      type,
      icon,
      iconAlt,
      description,
      duration,
      bannerHighlight,
      // True when a user clicks the top 'banner' to highlight counted events
      recurrence
    } = this.event;
    const isRecurring = recurrence && recurrence.length !== 0;

    if (isRecurring) {
      ({
        start,
        end
      } = this.fcEvent); // Just a destruction without a declaration (let/const)
    } // Get string formatted dates for screen reader sections of event details


    const startTime = (0,main/* formatDate */.p6d)(start, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
    const endTime = end && (0,main/* formatDate */.p6d)(end, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
    return /*#__PURE__*/react.createElement("div", {
      className: "calendar-event ".concat(bannerHighlight ? 'calendar-event--highlighted' : '', " ").concat(type ? "calendar-event--".concat(type) : '')
    }, /*#__PURE__*/react.createElement("div", {
      className: "calendar-event__header"
    }, icon && /*#__PURE__*/react.createElement("svg", {
      className: "svg-icon"
    }, iconAlt && /*#__PURE__*/react.createElement("title", null, iconAlt), /*#__PURE__*/react.createElement("use", {
      href: "#".concat(icon)
    })), /*#__PURE__*/react.createElement("span", {
      className: "calendar-event__title"
    }, title)), /*#__PURE__*/react.createElement("div", {
      className: "calendar-event__time"
    }, allDay && "All day event", !allDay && /*#__PURE__*/react.createElement("time", {
      dateTime: startTime
    }, startTime), !allDay && endTime && " to ", !allDay && endTime && /*#__PURE__*/react.createElement("time", {
      dateTime: endTime
    }, endTime)), (!duration || duration >= 900000) &&
    /*#__PURE__*/
    // Briefer events dont have space to fit the description
    react.createElement("div", {
      className: "calendar-event__description"
    }, description));
  }

  getScheduleViewContent() {
    const title = this.getCalendarItemTitle();
    let {
      start,
      end
    } = this.event;
    const {
      allDay,
      icon,
      iconAlt,
      recurrence
    } = this.event;
    const isRecurring = recurrence && recurrence.length !== 0;

    if (isRecurring) {
      ({
        start,
        end
      } = this.fcEvent); // Just a destruction without a declaration (let/const)
    } // Get string formatted dates for screen reader sections of event details


    let startTime = (0,main/* formatDate */.p6d)(start, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
    let endTime = end && (0,main/* formatDate */.p6d)(end, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    }); // If the event spans multiple days include the day and month in the description

    const spansMultipleDays = false;

    if (end && !isRecurring && (start.getDate() !== end.getDate() || start.getMonth() !== end.getMonth() || start.getYear() !== end.getYear())) {
      startTime = (0,main/* formatDate */.p6d)(start, {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });
      endTime = end && (0,main/* formatDate */.p6d)(end, {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });
    }

    return /*#__PURE__*/react.createElement("div", {
      role: "link",
      tabIndex: "0",
      className: "calendar-event"
    }, /*#__PURE__*/react.createElement("div", {
      className: "calendar-event__header"
    }, icon && /*#__PURE__*/react.createElement("svg", {
      className: "svg-icon svg-icon--expand"
    }, iconAlt && /*#__PURE__*/react.createElement("title", null, iconAlt), /*#__PURE__*/react.createElement("use", {
      href: "#".concat(icon)
    })), /*#__PURE__*/react.createElement("span", {
      className: "calendar-event__title"
    }, title)), !allDay && !spansMultipleDays && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("time", {
      dateTime: startTime,
      className: "calendar-event__time"
    }, startTime), endTime && " to ", endTime && /*#__PURE__*/react.createElement("time", {
      dateTime: endTime,
      className: "calendar-event__time"
    }, endTime)));
  }
  /**
   * Get the title to show in the modal popup's H1 tag
   * @returns {string} title
   */


  getModalTitle() {
    return this.event.title;
  }
  /**
   * Get the modal body content for this type of event
   * @returns {JSX Object} content
   */


  getModalContent() {
    let {
      start,
      end
    } = this.event;
    const {
      allDay,
      type,
      description,
      recurrence
    } = this.event;
    const isRecurring = recurrence && recurrence.length !== 0;

    if (isRecurring) {
      ({
        start,
        end
      } = this.fcEvent); // Just a destruction without a declaration (let/const)
    } // Use FullCalendar utility to format the dates into the structure we need for display


    const startDate = (0,main/* formatDate */.p6d)(start, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }); // e.g. December 20, 2021

    const startTime = (0,main/* formatDate */.p6d)(start, {
      hour: 'numeric',
      minute: '2-digit'
    }); // e.g. 2:15 PM

    const endDate = end && (0,main/* formatDate */.p6d)(end, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }); // e.g. December 21, 2021

    const endTime = end && (0,main/* formatDate */.p6d)(end, {
      hour: 'numeric',
      minute: '2-digit'
    }); // e.g. 12:15 AM
    // Check if the event spans across days (not necessarily lasts for more than 24 hours)

    let spansMultipleDays = false;

    if (end && (start.getDate() !== end.getDate() || start.getMonth() !== end.getMonth() || start.getYear() !== end.getYear())) {
      spansMultipleDays = true;
    }

    return /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details calendar-event-details--".concat(type)
    }, /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details__time"
    }, /*#__PURE__*/react.createElement("time", {
      dateTime: startDate,
      className: "calendar-event-details__start-date"
    }, startDate), allDay && /*#__PURE__*/react.createElement("span", {
      className: "calendar-event-details__all-day"
    }, " All day "), !allDay && /*#__PURE__*/react.createElement(react.Fragment, null, " from ", /*#__PURE__*/react.createElement("time", {
      dateTime: startTime,
      className: "calendar-event-details__start-time"
    }, startTime)), !allDay && endTime && " to ", spansMultipleDays && endDate && /*#__PURE__*/react.createElement("time", {
      dateTime: endDate,
      className: "calendar-event-details__end-date"
    }, " ".concat(endDate, " ")), !allDay && endTime && /*#__PURE__*/react.createElement("time", {
      dateTime: endTime,
      className: "calendar-event-details__end-time"
    }, endTime)), /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details__description"
    }, description));
  }
  /**
   * Get the footer controls for this type of event
   * @returns {array} array of additional footer controls
   */


  getModalFooterControls() {
    return [];
  }

}
;// CONCATENATED MODULE: ./src/modules/calendar/jsx/event-types/AssignmentCalendarEvent.jsx



/**
 * Assignment type event rendering templates.
 */

class AssignmentCalendarEvent extends BaseCalendarEvent {
  /**
   * Assignments use the courseCode instead of the event title
   * @returns {string} title to use in FullCalendar event displays
   */
  getCalendarItemTitle() {
    return this.event.courseCode;
  }
  /**
   * Get the title to show in the modal popup's H1 tag
   * @returns {string} title
   */


  getModalTitle() {
    return this.event.courseName;
  }
  /**
   * Get the modal body content for this type of event
   * @returns {JSX Object} content
   */


  getModalContent() {
    let {
      start
    } = this.event;
    const {
      type,
      title,
      description,
      submissionType,
      recurrence
    } = this.event;
    const isRecurring = recurrence && recurrence.length !== 0;

    if (isRecurring) {
      ({
        start
      } = this.fcEvent); // Just a destruction without a declaration (let/const)
    } // Use FullCalendar utility to format the dates into the structure we need for display


    const dueDate = (0,main/* formatDate */.p6d)(start, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }); // e.g. December 23, 2021, 2:15 PM

    return /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details calendar-event-details--".concat(type)
    }, /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details__due"
    }, /*#__PURE__*/react.createElement("h2", {
      className: "calendar-event-details__due-title"
    }, "Assignment due"), "Due ", /*#__PURE__*/react.createElement("time", {
      dateTime: dueDate,
      className: "calendar-event-details__due-date"
    }, dueDate), /*#__PURE__*/react.createElement("svg", {
      "aria-hidden": true,
      className: "svg-icon"
    }, /*#__PURE__*/react.createElement("use", {
      href: "#edit"
    }))), /*#__PURE__*/react.createElement("h2", {
      className: "calendar-event-details__sub-title"
    }, title), /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details__description"
    }, description), /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details__submit-method"
    }, /*#__PURE__*/react.createElement("svg", {
      "aria-hidden": true,
      className: "svg-icon"
    }, /*#__PURE__*/react.createElement("use", {
      href: "#information"
    })), "Submit ", submissionType), /*#__PURE__*/react.createElement("div", {
      className: "calendar-event-details__submit-note"
    }, "More details available in Canvas"));
  }
  /**
   * Get the footer controls for this type of event
   * @returns {array} array of additional footer controls
   */


  getModalFooterControls() {
    const additionalControls = [];

    if (this.event.url) {
      additionalControls.push({
        url: this.event.url,
        icon: 'external',
        label: 'Canvas'
      });
    }

    return additionalControls;
  }

}
;// CONCATENATED MODULE: ./src/modules/calendar/jsx/event-types/EventTypes.jsx
/* eslint-disable import/prefer-default-export */


/**
 * Get the event type customisation object which can be used to get specific rendering HTML/JSX objects based on the event type.
 *
 * @param {Object} event data object containing event information from the apps data source, NOT the fcEvent
 * @returns {Object} customisation object
 */

function getEventTypeCustomisations(event, fcEvent) {
  if (event.type === 'assignment') {
    return new AssignmentCalendarEvent(event, fcEvent);
  }

  return new BaseCalendarEvent(event, fcEvent);
}
;// CONCATENATED MODULE: ./src/modules/calendar/jsx/dayView.jsx


/* eslint-disable react/prefer-stateless-function */







function DayView(_ref) {
  let {
    date,
    allDaySlot,
    nowIndicator,
    events,
    onEventClick
  } = _ref;
  const calendarRef = /*#__PURE__*/(0,react.createRef)();
  const [calendarAPI, setCalendarAPI] = (0,react.useState)(); // Once the Full Calendar has been created, keep it so its API can be referenced when needed.

  (0,react.useEffect)(() => {
    if (calendarRef && calendarRef.current) {
      setCalendarAPI(calendarRef.current.getApi());
    }
  }, [calendarRef]); // If the date changes, instruct Full Calendar to change via its API

  (0,react.useEffect)(() => {
    if (calendarAPI) {
      calendarAPI.gotoDate(date);
    }
  }, [calendarAPI, date]);
  /*
      This function is an extension point of Full Calendar to allow custom
      rendering of the event content within this view type.
  */

  const printEventContent = _ref2 => {
    let {
      event
    } = _ref2;
    const eventCustomisation = getEventTypeCustomisations(event.extendedProps, // Pass the full event data payload not only the fcEvent data
    event);
    return eventCustomisation.getDayViewContent();
  };
  /*
      Add some extra ARIA bits to the FullCalendar HTML based on how the application is
      configured.
  */


  const adjustDomAfterRender = arg => {
    const interactionType = arg.event.extendedProps._eventInteractionType; // Inject a button/link role to override the inherited 'presentation' role so screen readers pick it up easier

    arg.el.setAttribute('role', interactionType === enums/* EventActions.OpenInModal */.D.OpenInModal ? 'button' : 'link'); // If new window override link with target=_blank

    if (interactionType === enums/* EventActions.OpenInNewPage */.D.OpenInNewPage) {
      arg.el.setAttribute('target', '_blank');
    }
  };

  return /*#__PURE__*/react.createElement("div", {
    className: "calendar-day-view"
  }, /*#__PURE__*/react.createElement(main/* default */.ZPm, {
    height: "100%",
    ref: calendarRef,
    plugins: [timegrid_main/* default */.ZP, rrule_main/* default */.Z],
    initialView: "timeGridDay",
    scrollTime: "07:00:00" // Default time to scroll the calendar to
    ,
    headerToolbar: false,
    titleFormat: false,
    allDaySlot: allDaySlot,
    nowIndicator: nowIndicator,
    events: events,
    eventClick: onEventClick,
    eventContent: printEventContent,
    eventDidMount: adjustDomAfterRender,
    eventMinHeight: 48 // SCSS .fc-timegrid-slot needs to be changed to match (minus margins)

  }));
}

/* harmony default export */ var dayView = (/*#__PURE__*/react.memo(DayView));
// EXTERNAL MODULE: ./node_modules/@fullcalendar/list/main.js + 1 modules
var list_main = __webpack_require__(52263);
;// CONCATENATED MODULE: ./src/modules/calendar/jsx/scheduleView.jsx
/* eslint-disable react/prefer-stateless-function */






function ScheduleView(_ref) {
  let {
    events,
    onEventClick
  } = _ref;
  let monthPrimaryLabelCurrent = ''; // Used to determine if a new month section should start

  /* 
      This function is an extension point of Full Calendar to allow custom class names to be applied.
       If the month changes between this event and the last, add a class to this item so
      a new section can be started by not hiding the 'listDaySideFormat' configured above.
  */

  const showMonthLabelWhenMonthChanges = args => {
    if (!monthPrimaryLabelCurrent) {
      monthPrimaryLabelCurrent = args.sideText;
    }

    if (monthPrimaryLabelCurrent !== args.sideText) {
      monthPrimaryLabelCurrent = args.sideText;
      return 'calendar-schedule-view-new-month';
    }

    return '';
  };
  /*
      This function is an extension point of Full Calendar to allow custom
      rendering of the event content within this view type.
  */


  const printEventContent = _ref2 => {
    let {
      event
    } = _ref2;
    const eventCustomisation = getEventTypeCustomisations(event.extendedProps, // Pass the full event data payload not only the fcEvent data,
    event);
    return eventCustomisation.getScheduleViewContent();
  };

  return /*#__PURE__*/react.createElement("div", {
    className: "calendar-schedule-view"
  }, /*#__PURE__*/react.createElement(main/* default */.ZPm, {
    height: "100%",
    plugins: [list_main/* default */.Z, rrule_main/* default */.Z],
    views: {
      // Custom view type based on list so we get a whole 365 days, not just to the end of the current year
      oneYear: {
        type: 'list',
        duration: {
          days: 365
        },
        buttonText: 'One Year'
      }
    },
    initialView: "oneYear" // Set to custom view above
    ,
    headerToolbar: false,
    titleFormat: false,
    events: events,
    eventClick: onEventClick,
    listDayFormat: {
      // e.g. Dec 21
      month: 'short',
      day: 'numeric'
    },
    listDaySideFormat: {
      // listDaySideFormat is used to title the new section when a month change occurs e.g. January 2022
      month: 'long',
      year: 'numeric'
    },
    dayHeaderClassNames: showMonthLabelWhenMonthChanges,
    eventContent: printEventContent
  }));
}

/* harmony default export */ var scheduleView = (/*#__PURE__*/react.memo(ScheduleView));
;// CONCATENATED MODULE: ./src/modules/calendar/css/_global.scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/modules/calendar/jsx/calendar.jsx


/* eslint-disable react/prefer-stateless-function */

 // Data layer imports




 // Internal module imports






 // Last so our CSS overrides any dependencies above

/**
 * Wrapper for calendar application to provide event context
 *
 * @param {BaseEventAdapter} eventAdapter event adapter either concrete or mock
 * @returns Calendar object
 */

function Calendar(_ref) {
  let {
    defaultView,
    allDaySlot,
    nowIndicator,
    title,
    bannerEnabled,
    bannerText,
    bannerCountType,
    eventAdapter,
    typeIconMap = {},
    eventAction = enums/* EventActions.OpenInModal */.D.OpenInModal
  } = _ref;
  const eventService = new js_global/* EventService */.PO({
    eventAdapter
  }); // Wrap the CalendarContent with the EventProvider so the event context can be accessed within

  return /*#__PURE__*/react.createElement(global/* EventProvider */.dd, {
    eventService: eventService
  }, /*#__PURE__*/react.createElement(CalendarContent, {
    defaultView: defaultView,
    allDaySlot: allDaySlot,
    nowIndicator: nowIndicator,
    title: title,
    bannerEnabled: bannerEnabled,
    bannerText: bannerText,
    bannerCountType: bannerCountType,
    typeIconMap: typeIconMap,
    eventAction: eventAction
  }));
}
/**
 * Calendar application
 * @returns CalendarContent object
 */

function CalendarContent(_ref2) {
  let {
    defaultView,
    allDaySlot = enums/* CalendarViews.Day */.Y.Day,
    nowIndicator,
    title,
    bannerEnabled,
    bannerText,
    bannerCountType,
    typeIconMap,
    eventAction = enums/* EventActions.OpenInModal */.D.OpenInModal
  } = _ref2;
  const [viewType, setViewType] = (0,react.useState)(defaultView);
  const {
    events,
    getEvents
  } = (0,global/* useEvents */.hI)(); // Custom useContext

  const [bannerCount, setBannerCount] = (0,react.useState)(0);
  const [allDaySlotEnabled, setAllDaySlotEnabled] = (0,react.useState)(allDaySlot);
  const [highlightBanner, setHighlightBanner] = (0,react.useState)(false);
  const [currentDate, setCurrentDate] = (0,react.useState)(new Date());
  const [selectedEvent, setSelectedEvent] = (0,react.useState)(undefined); // When the Calendar first loads update the events in the EventsContext to todays

  (0,react.useEffect)(() => {
    if (viewType === enums/* CalendarViews.Day */.Y.Day) {
      getEvents({
        start: new Date(new Date().setHours(0, 0, 0, 0)),
        end: new Date(new Date().setHours(23, 59, 59, 999))
      });
    }
  }, [getEvents]); // When the 'currentDate' changes update the events in the EventsContext based on the new date

  (0,react.useEffect)(() => {
    if (viewType === enums/* CalendarViews.Day */.Y.Day) {
      getEvents({
        start: new Date(currentDate.setHours(0, 0, 0, 0)),
        end: new Date(currentDate.setHours(23, 59, 59, 999))
      });
    }
  }, [currentDate]); // When the view type changes request update the events in the EventsContext based on the required date ranges for the view type

  (0,react.useEffect)(() => {
    // Day view is filtered from the date selected in the DateControlHeader (default current date)
    if (viewType === enums/* CalendarViews.Day */.Y.Day) {
      getEvents({
        start: new Date(currentDate.setHours(0, 0, 0, 0)),
        end: new Date(currentDate.setHours(23, 59, 59, 999))
      });
    } else if (viewType === enums/* CalendarViews.Schedule */.Y.Schedule) {
      // Schedule always show current date to a year in the future
      const start = new Date(new Date().setHours(0, 0, 0, 0));
      getEvents({
        start,
        end: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      });
    }
  }, [viewType]); // When the events from the EventsContent changes, re-calculate the number to show in the banner

  (0,react.useEffect)(() => {
    if (bannerEnabled) {
      const newCount = events.reduce((count, event) => {
        if (event.type === bannerCountType) {
          return count + 1;
        }

        return count;
      }, 0);
      setBannerCount(newCount);
    }
  }, [events]); // When the events from the EventsContent changes, re-calculate all day slot validity

  (0,react.useEffect)(() => {
    if (allDaySlot) {
      if (events.find(event => event.allDay)) {
        setAllDaySlotEnabled(true);
      } else {
        setAllDaySlotEnabled(false);
      }
    }
  }, [allDaySlot, events]);
  /*
      Transform from PNP Calendar data format into the FullCalendar format via clone. Also 
      applies any calculated fields which are needed in the event render hook.
       FullCalendar will discard any properties it does not know about so
      everything is also copied into the extension area 'extendedProps'.
  */

  const getFullCalendarEvents = (0,react.useCallback)((fetchInfo, successCallback, failureCallback) => {
    const fcEvents = events.map((event, index) => {
      const fcEvent = { ...event,
        interactive: true,
        extendedProps: { ...event,
          _calendarEventIndex: index,
          // Used to match the fcEvent to the internal state onClick
          _eventInteractionType: eventAction,
          // Used to determine if the tag role should be button or link
          duration: Math.floor(Math.abs(event.end - event.start) / 1000 / 60) // Short events (< 30min) dont show the event description on Day view

        }
      }; // If open in modal is activated delete the URL from the payload as this causes FC to make the event a link on click

      if (eventAction === enums/* EventActions.OpenInModal */.D.OpenInModal && event.url) {
        fcEvent.extendedProps.url = event.url;
        delete fcEvent.url;
      } // If the type matches with a configuration in the icon map add it


      if (typeIconMap[event.type]) {
        fcEvent.extendedProps.icon = typeIconMap[event.type];
        fcEvent.extendedProps.iconAlt = event.type;
      } // If banner highlighting is enabled tag those events for altered display


      if (highlightBanner && event.type === bannerCountType) {
        fcEvent.extendedProps.bannerHighlight = true;
      }

      if (event.recurrence && event.recurrence.length > 0) {
        fcEvent.rrule = "".concat(event.recurrence[0]);
      }

      return fcEvent;
    });
    successCallback(fcEvents);
  }, [events, highlightBanner]); // Handler for event being clicked

  const handleEventClick = (0,react.useCallback)(_ref3 => {
    let {
      el,
      event: fcEvent
    } = _ref3;

    // If the eventAction isn't set to modal, try to resolve it first
    if (eventAction !== enums/* EventActions.OpenInModal */.D.OpenInModal) {
      // If there isn't a URL, fall back to the modal
      if (fcEvent.extendedProps.url) {
        return;
      }
    }
    /* 
        Either the eventAction is OpenInModal or the event properties didn't contain a URL 
        so set the selected event for the next render to pickup and show a modal.
    */


    const calendarEvent = events[fcEvent.extendedProps._calendarEventIndex];
    setSelectedEvent({
      event: calendarEvent,
      fcEvent,
      element: el
    });
  }, [events]);
  const handleEventModalClose = (0,react.useCallback)(e => {
    /* if (e.type !== 'click') {
        selectedEvent.element.focus();
    } */
    setSelectedEvent(undefined);
  }, [selectedEvent]);
  let selectedEventCustomisation;

  if (selectedEvent) {
    selectedEventCustomisation = getEventTypeCustomisations(selectedEvent.event, selectedEvent.fcEvent);
  }

  return /*#__PURE__*/react.createElement(dist_module/* OverlayProvider */.N3, null, /*#__PURE__*/react.createElement("div", {
    className: "no-wysiwyg calendar ".concat(viewType === enums/* CalendarViews.Day */.Y.Day ? 'calendar--sub-header' : '')
  }, /*#__PURE__*/react.createElement("div", {
    className: "calendar__header"
  }, /*#__PURE__*/react.createElement("div", {
    className: "calendar__title"
  }, title), /*#__PURE__*/react.createElement(ButtonMenu, {
    uniqueId: "calendar-view-switcher",
    icon: "overflow-menu",
    iconTitle: "Toggle view switcher menu",
    className: "calendar-view-select"
  }, viewType === enums/* CalendarViews.Day */.Y.Day && /*#__PURE__*/react.createElement(ButtonMenuItem, {
    label: "Schedule",
    onClick: () => setViewType(enums/* CalendarViews.Schedule */.Y.Schedule)
  }), viewType === enums/* CalendarViews.Schedule */.Y.Schedule && /*#__PURE__*/react.createElement(ButtonMenuItem, {
    label: "Day",
    onClick: () => setViewType(enums/* CalendarViews.Day */.Y.Day)
  }))), viewType === enums/* CalendarViews.Day */.Y.Day && /*#__PURE__*/react.createElement(DateControlHeader, {
    date: currentDate,
    onDateChange: date => {
      setCurrentDate(date);
    }
  }), viewType === enums/* CalendarViews.Day */.Y.Day && bannerEnabled && bannerCount > 0 && /*#__PURE__*/react.createElement("button", {
    type: "button",
    "aria-label": "Highlight ".concat(bannerText),
    onClick: () => setHighlightBanner(!highlightBanner),
    className: "calendar__banner"
  }, bannerText, /*#__PURE__*/react.createElement("span", {
    className: "calendar__banner-count"
  }, bannerCount)), /*#__PURE__*/react.createElement("div", {
    className: "calendar__body"
  }, viewType === enums/* CalendarViews.Day */.Y.Day && /*#__PURE__*/react.createElement(dayView, {
    date: currentDate,
    allDaySlot: allDaySlotEnabled,
    nowIndicator: nowIndicator,
    events: getFullCalendarEvents,
    onEventClick: handleEventClick
  }), viewType === enums/* CalendarViews.Schedule */.Y.Schedule && /*#__PURE__*/react.createElement(scheduleView, {
    events: getFullCalendarEvents,
    onEventClick: handleEventClick
  }))), selectedEvent && /*#__PURE__*/react.createElement(Modal, {
    title: selectedEventCustomisation.getModalTitle(),
    onClose: handleEventModalClose,
    customFooter: /*#__PURE__*/react.createElement("footer", {
      className: "calendar-modal__footer"
    }, /*#__PURE__*/react.createElement("button", {
      type: "button",
      onClick: handleEventModalClose,
      className: "calendar-modal__close"
    }, "Close"), selectedEventCustomisation.getModalFooterControls().map(config => {
      return /*#__PURE__*/react.createElement("a", {
        key: config.url,
        href: config.url,
        target: "_blank",
        className: "calendar-modal__link",
        rel: "noreferrer"
      }, config.icon ? /*#__PURE__*/react.createElement("svg", {
        className: "svg-icon"
      }, /*#__PURE__*/react.createElement("use", {
        href: "#".concat(config.icon)
      })) : /*#__PURE__*/react.createElement(react.Fragment, null), config.label);
    })),
    className: "calendar-modal"
  }, selectedEventCustomisation.getModalContent()));
}

/***/ })

}]);
//# sourceMappingURL=Calendar-85705e2b40cedb8549ea.js.map