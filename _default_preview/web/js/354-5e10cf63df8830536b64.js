"use strict";
(self["webpackChunkPlug_and_Play_Template"] = self["webpackChunkPlug_and_Play_Template"] || []).push([[354],{

/***/ 27354:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Jz": function() { return /* binding */ getInteractionModality; },
/* harmony export */   "L_": function() { return /* binding */ useFocusWithin; },
/* harmony export */   "Fc": function() { return /* binding */ useInteractOutside; },
/* harmony export */   "v5": function() { return /* binding */ useKeyboard; }
/* harmony export */ });
/* unused harmony exports usePress, Pressable, PressResponder, useFocus, isFocusVisible, setInteractionModality, useInteractionModality, useFocusVisible, useFocusVisibleListener, useHover, useMove, useScrollWheel, useLongPress */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _react_aria_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47106);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87462);




// Note that state only matters here for iOS. Non-iOS gets user-select: none applied to the target element
// rather than at the document level so we just need to apply/remove user-select: none for each pressed element individually
let $e17c9db826984f8ab8e5d837bf0b8$var$state = 'default';
let $e17c9db826984f8ab8e5d837bf0b8$var$savedUserSelect = '';
let $e17c9db826984f8ab8e5d837bf0b8$var$modifiedElementMap = new WeakMap();

function $e17c9db826984f8ab8e5d837bf0b8$export$disableTextSelection(target) {
  if (isIOS()) {
    if ($e17c9db826984f8ab8e5d837bf0b8$var$state === 'default') {
      $e17c9db826984f8ab8e5d837bf0b8$var$savedUserSelect = document.documentElement.style.webkitUserSelect;
      document.documentElement.style.webkitUserSelect = 'none';
    }

    $e17c9db826984f8ab8e5d837bf0b8$var$state = 'disabled';
  } else if (target) {
    // If not iOS, store the target's original user-select and change to user-select: none
    // Ignore state since it doesn't apply for non iOS
    $e17c9db826984f8ab8e5d837bf0b8$var$modifiedElementMap.set(target, target.style.userSelect);
    target.style.userSelect = 'none';
  }
}

function $e17c9db826984f8ab8e5d837bf0b8$export$restoreTextSelection(target) {
  if (isIOS()) {
    // If the state is already default, there's nothing to do.
    // If it is restoring, then there's no need to queue a second restore.
    if ($e17c9db826984f8ab8e5d837bf0b8$var$state !== 'disabled') {
      return;
    }

    $e17c9db826984f8ab8e5d837bf0b8$var$state = 'restoring'; // There appears to be a delay on iOS where selection still might occur
    // after pointer up, so wait a bit before removing user-select.

    setTimeout(() => {
      // Wait for any CSS transitions to complete so we don't recompute style
      // for the whole page in the middle of the animation and cause jank.
      runAfterTransition(() => {
        // Avoid race conditions
        if ($e17c9db826984f8ab8e5d837bf0b8$var$state === 'restoring') {
          if (document.documentElement.style.webkitUserSelect === 'none') {
            document.documentElement.style.webkitUserSelect = $e17c9db826984f8ab8e5d837bf0b8$var$savedUserSelect || '';
          }

          $e17c9db826984f8ab8e5d837bf0b8$var$savedUserSelect = '';
          $e17c9db826984f8ab8e5d837bf0b8$var$state = 'default';
        }
      });
    }, 300);
  } else {
    // If not iOS, restore the target's original user-select if any
    // Ignore state since it doesn't apply for non iOS
    if (target && $e17c9db826984f8ab8e5d837bf0b8$var$modifiedElementMap.has(target)) {
      let targetOldUserSelect = $e17c9db826984f8ab8e5d837bf0b8$var$modifiedElementMap.get(target);

      if (target.style.userSelect === 'none') {
        target.style.userSelect = targetOldUserSelect;
      }

      if (target.getAttribute('style') === '') {
        target.removeAttribute('style');
      }

      $e17c9db826984f8ab8e5d837bf0b8$var$modifiedElementMap.delete(target);
    }
  }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
// Original licensing for the following method can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/blob/3c713d513195a53788b3f8bb4b70279d68b15bcc/packages/react-interactions/events/src/dom/shared/index.js#L74-L87
// Keyboards, Assistive Technologies, and element.click() all produce a "virtual"
// click event. This is a method of inferring such clicks. Every browser except
// IE 11 only sets a zero value of "detail" for click events that are "virtual".
// However, IE 11 uses a zero value for all click events. For IE 11 we rely on
// the quirk that it produces click events that are of type PointerEvent, and
// where only the "virtual" click lacks a pointerType field.
function $f67ef9f1b8ed09b4b00fd0840cd8b94b$export$isVirtualClick(event) {
  // JAWS/NVDA with Firefox.
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }

  return event.detail === 0 && !event.pointerType;
}

const $a3ff51240de6f955c79cf17a88e349$export$PressResponderContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

$a3ff51240de6f955c79cf17a88e349$export$PressResponderContext.displayName = 'PressResponderContext';

function $ffc54430b1dbeee65879852feaaff07d$var$usePressResponderContext(props) {
  // Consume context from <PressResponder> and merge with props.
  let context = useContext($a3ff51240de6f955c79cf17a88e349$export$PressResponderContext);

  if (context) {
    let {
      register
    } = context,
        contextProps = _babelRuntimeHelpersEsmObjectWithoutPropertiesLoose(context, ["register"]);

    props = mergeProps(contextProps, props);
    register();
  }

  useSyncRef(context, props.ref);
  return props;
}
/**
 * Handles press interactions across mouse, touch, keyboard, and screen readers.
 * It normalizes behavior across browsers and platforms, and handles many nuances
 * of dealing with pointer and keyboard events.
 */


function usePress(props) {
  let _usePressResponderCon = $ffc54430b1dbeee65879852feaaff07d$var$usePressResponderContext(props),
      {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    isPressed: isPressedProp,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    allowTextSelectionOnPress
  } = _usePressResponderCon,
      domProps = _babelRuntimeHelpersEsmObjectWithoutPropertiesLoose(_usePressResponderCon, ["onPress", "onPressChange", "onPressStart", "onPressEnd", "onPressUp", "isDisabled", "isPressed", "preventFocusOnPress", "shouldCancelOnPointerExit", "allowTextSelectionOnPress", "ref"]);

  let propsRef = useRef(null);
  propsRef.current = {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    shouldCancelOnPointerExit
  };
  let [isPressed, setPressed] = useState(false);
  let ref = useRef({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    ignoreClickAfterPress: false,
    didFirePressStart: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null
  });
  let {
    addGlobalListener,
    removeAllGlobalListeners
  } = useGlobalListeners();
  let pressProps = useMemo(() => {
    let state = ref.current;

    let triggerPressStart = (originalEvent, pointerType) => {
      let {
        onPressStart,
        onPressChange,
        isDisabled
      } = propsRef.current;

      if (isDisabled || state.didFirePressStart) {
        return;
      }

      if (onPressStart) {
        onPressStart({
          type: 'pressstart',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }

      if (onPressChange) {
        onPressChange(true);
      }

      state.didFirePressStart = true;
      setPressed(true);
    };

    let triggerPressEnd = function triggerPressEnd(originalEvent, pointerType, wasPressed) {
      if (wasPressed === void 0) {
        wasPressed = true;
      }

      let {
        onPressEnd,
        onPressChange,
        onPress,
        isDisabled
      } = propsRef.current;

      if (!state.didFirePressStart) {
        return;
      }

      state.ignoreClickAfterPress = true;
      state.didFirePressStart = false;

      if (onPressEnd) {
        onPressEnd({
          type: 'pressend',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }

      if (onPressChange) {
        onPressChange(false);
      }

      setPressed(false);

      if (onPress && wasPressed && !isDisabled) {
        onPress({
          type: 'press',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }
    };

    let triggerPressUp = (originalEvent, pointerType) => {
      let {
        onPressUp,
        isDisabled
      } = propsRef.current;

      if (isDisabled) {
        return;
      }

      if (onPressUp) {
        onPressUp({
          type: 'pressup',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }
    };

    let cancel = e => {
      if (state.isPressed) {
        if (state.isOverTarget) {
          triggerPressEnd($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), state.pointerType, false);
        }

        state.isPressed = false;
        state.isOverTarget = false;
        state.activePointerId = null;
        state.pointerType = null;
        removeAllGlobalListeners();

        if (!allowTextSelectionOnPress) {
          $e17c9db826984f8ab8e5d837bf0b8$export$restoreTextSelection(state.target);
        }
      }
    };

    let pressProps = {
      onKeyDown(e) {
        if ($ffc54430b1dbeee65879852feaaff07d$var$isValidKeyboardEvent(e.nativeEvent) && e.currentTarget.contains(e.target)) {
          e.preventDefault();
          e.stopPropagation(); // If the event is repeating, it may have started on a different element
          // after which focus moved to the current element. Ignore these events and
          // only handle the first key down event.

          if (!state.isPressed && !e.repeat) {
            state.target = e.currentTarget;
            state.isPressed = true;
            triggerPressStart(e, 'keyboard'); // Focus may move before the key up event, so register the event on the document
            // instead of the same element where the key down event occurred.

            addGlobalListener(document, 'keyup', onKeyUp, false);
          }
        }
      },

      onKeyUp(e) {
        if ($ffc54430b1dbeee65879852feaaff07d$var$isValidKeyboardEvent(e.nativeEvent) && !e.repeat && e.currentTarget.contains(e.target)) {
          triggerPressUp($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), 'keyboard');
        }
      },

      onClick(e) {
        if (e && !e.currentTarget.contains(e.target)) {
          return;
        }

        if (e && e.button === 0) {
          e.stopPropagation();

          if (isDisabled) {
            e.preventDefault();
          } // If triggered from a screen reader or by using element.click(),
          // trigger as if it were a keyboard click.


          if (!state.ignoreClickAfterPress && !state.ignoreEmulatedMouseEvents && (state.pointerType === 'virtual' || $f67ef9f1b8ed09b4b00fd0840cd8b94b$export$isVirtualClick(e.nativeEvent))) {
            // Ensure the element receives focus (VoiceOver on iOS does not do this)
            if (!isDisabled && !preventFocusOnPress) {
              focusWithoutScrolling(e.currentTarget);
            }

            triggerPressStart(e, 'virtual');
            triggerPressUp(e, 'virtual');
            triggerPressEnd(e, 'virtual');
          }

          state.ignoreEmulatedMouseEvents = false;
          state.ignoreClickAfterPress = false;
        }
      }

    };

    let onKeyUp = e => {
      if (state.isPressed && $ffc54430b1dbeee65879852feaaff07d$var$isValidKeyboardEvent(e)) {
        e.preventDefault();
        e.stopPropagation();
        state.isPressed = false;
        let target = e.target;
        triggerPressEnd($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), 'keyboard', state.target.contains(target));
        removeAllGlobalListeners(); // If the target is a link, trigger the click method to open the URL,
        // but defer triggering pressEnd until onClick event handler.

        if (state.target.contains(target) && $ffc54430b1dbeee65879852feaaff07d$var$isHTMLAnchorLink(state.target) || state.target.getAttribute('role') === 'link') {
          state.target.click();
        }
      }
    };

    if (typeof PointerEvent !== 'undefined') {
      pressProps.onPointerDown = e => {
        // Only handle left clicks, and ignore events that bubbled through portals.
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) {
          return;
        } // iOS safari fires pointer events from VoiceOver with incorrect coordinates/target.
        // Ignore and let the onClick handler take care of it instead.
        // https://bugs.webkit.org/show_bug.cgi?id=222627
        // https://bugs.webkit.org/show_bug.cgi?id=223202


        if ($ffc54430b1dbeee65879852feaaff07d$var$isVirtualPointerEvent(e.nativeEvent)) {
          state.pointerType = 'virtual';
          return;
        } // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on pointer down and handle focusing the pressable element ourselves.


        if ($ffc54430b1dbeee65879852feaaff07d$var$shouldPreventDefault(e.target)) {
          e.preventDefault();
        }

        state.pointerType = e.pointerType;
        e.stopPropagation();

        if (!state.isPressed) {
          state.isPressed = true;
          state.isOverTarget = true;
          state.activePointerId = e.pointerId;
          state.target = e.currentTarget;

          if (!isDisabled && !preventFocusOnPress) {
            focusWithoutScrolling(e.currentTarget);
          }

          if (!allowTextSelectionOnPress) {
            $e17c9db826984f8ab8e5d837bf0b8$export$disableTextSelection(state.target);
          }

          triggerPressStart(e, state.pointerType);
          addGlobalListener(document, 'pointermove', onPointerMove, false);
          addGlobalListener(document, 'pointerup', onPointerUp, false);
          addGlobalListener(document, 'pointercancel', onPointerCancel, false);
        }
      };

      pressProps.onMouseDown = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        if (e.button === 0) {
          // Chrome and Firefox on touch Windows devices require mouse down events
          // to be canceled in addition to pointer events, or an extra asynchronous
          // focus event will be fired.
          if ($ffc54430b1dbeee65879852feaaff07d$var$shouldPreventDefault(e.target)) {
            e.preventDefault();
          }

          e.stopPropagation();
        }
      };

      pressProps.onPointerUp = e => {
        // iOS fires pointerup with zero width and height, so check the pointerType recorded during pointerdown.
        if (!e.currentTarget.contains(e.target) || state.pointerType === 'virtual') {
          return;
        } // Only handle left clicks
        // Safari on iOS sometimes fires pointerup events, even
        // when the touch isn't over the target, so double check.


        if (e.button === 0 && $ffc54430b1dbeee65879852feaaff07d$var$isOverTarget(e, e.currentTarget)) {
          triggerPressUp(e, state.pointerType || e.pointerType);
        }
      }; // Safari on iOS < 13.2 does not implement pointerenter/pointerleave events correctly.
      // Use pointer move events instead to implement our own hit testing.
      // See https://bugs.webkit.org/show_bug.cgi?id=199803


      let onPointerMove = e => {
        if (e.pointerId !== state.activePointerId) {
          return;
        }

        if ($ffc54430b1dbeee65879852feaaff07d$var$isOverTarget(e, state.target)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), state.pointerType, false);

          if (propsRef.current.shouldCancelOnPointerExit) {
            cancel(e);
          }
        }
      };

      let onPointerUp = e => {
        if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0) {
          if ($ffc54430b1dbeee65879852feaaff07d$var$isOverTarget(e, state.target)) {
            triggerPressEnd($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), state.pointerType);
          } else if (state.isOverTarget) {
            triggerPressEnd($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), state.pointerType, false);
          }

          state.isPressed = false;
          state.isOverTarget = false;
          state.activePointerId = null;
          state.pointerType = null;
          removeAllGlobalListeners();

          if (!allowTextSelectionOnPress) {
            $e17c9db826984f8ab8e5d837bf0b8$export$restoreTextSelection(state.target);
          }
        }
      };

      let onPointerCancel = e => {
        cancel(e);
      };

      pressProps.onDragStart = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        } // Safari does not call onPointerCancel when a drag starts, whereas Chrome and Firefox do.


        cancel(e);
      };
    } else {
      pressProps.onMouseDown = e => {
        // Only handle left clicks
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) {
          return;
        } // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on mouse down and handle focusing the pressable element ourselves.


        if ($ffc54430b1dbeee65879852feaaff07d$var$shouldPreventDefault(e.target)) {
          e.preventDefault();
        }

        e.stopPropagation();

        if (state.ignoreEmulatedMouseEvents) {
          return;
        }

        state.isPressed = true;
        state.isOverTarget = true;
        state.target = e.currentTarget;
        state.pointerType = $f67ef9f1b8ed09b4b00fd0840cd8b94b$export$isVirtualClick(e.nativeEvent) ? 'virtual' : 'mouse';

        if (!isDisabled && !preventFocusOnPress) {
          focusWithoutScrolling(e.currentTarget);
        }

        triggerPressStart(e, state.pointerType);
        addGlobalListener(document, 'mouseup', onMouseUp, false);
      };

      pressProps.onMouseEnter = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = true;
          triggerPressStart(e, state.pointerType);
        }
      };

      pressProps.onMouseLeave = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = false;
          triggerPressEnd(e, state.pointerType, false);

          if (propsRef.current.shouldCancelOnPointerExit) {
            cancel(e);
          }
        }
      };

      pressProps.onMouseUp = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        if (!state.ignoreEmulatedMouseEvents && e.button === 0) {
          triggerPressUp(e, state.pointerType);
        }
      };

      let onMouseUp = e => {
        // Only handle left clicks
        if (e.button !== 0) {
          return;
        }

        state.isPressed = false;
        removeAllGlobalListeners();

        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
          return;
        }

        if ($ffc54430b1dbeee65879852feaaff07d$var$isOverTarget(e, state.target)) {
          triggerPressEnd($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), state.pointerType);
        } else if (state.isOverTarget) {
          triggerPressEnd($ffc54430b1dbeee65879852feaaff07d$var$createEvent(state.target, e), state.pointerType, false);
        }

        state.isOverTarget = false;
      };

      pressProps.onTouchStart = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();
        let touch = $ffc54430b1dbeee65879852feaaff07d$var$getTouchFromEvent(e.nativeEvent);

        if (!touch) {
          return;
        }

        state.activePointerId = touch.identifier;
        state.ignoreEmulatedMouseEvents = true;
        state.isOverTarget = true;
        state.isPressed = true;
        state.target = e.currentTarget;
        state.pointerType = 'touch'; // Due to browser inconsistencies, especially on mobile browsers, we prevent default
        // on the emulated mouse event and handle focusing the pressable element ourselves.

        if (!isDisabled && !preventFocusOnPress) {
          focusWithoutScrolling(e.currentTarget);
        }

        if (!allowTextSelectionOnPress) {
          $e17c9db826984f8ab8e5d837bf0b8$export$disableTextSelection(state.target);
        }

        triggerPressStart(e, state.pointerType);
        addGlobalListener(window, 'scroll', onScroll, true);
      };

      pressProps.onTouchMove = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (!state.isPressed) {
          return;
        }

        let touch = $ffc54430b1dbeee65879852feaaff07d$var$getTouchById(e.nativeEvent, state.activePointerId);

        if (touch && $ffc54430b1dbeee65879852feaaff07d$var$isOverTarget(touch, e.currentTarget)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart(e, state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd(e, state.pointerType, false);

          if (propsRef.current.shouldCancelOnPointerExit) {
            cancel(e);
          }
        }
      };

      pressProps.onTouchEnd = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (!state.isPressed) {
          return;
        }

        let touch = $ffc54430b1dbeee65879852feaaff07d$var$getTouchById(e.nativeEvent, state.activePointerId);

        if (touch && $ffc54430b1dbeee65879852feaaff07d$var$isOverTarget(touch, e.currentTarget)) {
          triggerPressUp(e, state.pointerType);
          triggerPressEnd(e, state.pointerType);
        } else if (state.isOverTarget) {
          triggerPressEnd(e, state.pointerType, false);
        }

        state.isPressed = false;
        state.activePointerId = null;
        state.isOverTarget = false;
        state.ignoreEmulatedMouseEvents = true;

        if (!allowTextSelectionOnPress) {
          $e17c9db826984f8ab8e5d837bf0b8$export$restoreTextSelection(state.target);
        }

        removeAllGlobalListeners();
      };

      pressProps.onTouchCancel = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (state.isPressed) {
          cancel(e);
        }
      };

      let onScroll = e => {
        if (state.isPressed && e.target.contains(state.target)) {
          cancel({
            currentTarget: state.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false
          });
        }
      };

      pressProps.onDragStart = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        cancel(e);
      };
    }

    return pressProps;
  }, [addGlobalListener, isDisabled, preventFocusOnPress, removeAllGlobalListeners, allowTextSelectionOnPress]); // Remove user-select: none in case component unmounts immediately after pressStart
  // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    return () => {
      if (!allowTextSelectionOnPress) {
        $e17c9db826984f8ab8e5d837bf0b8$export$restoreTextSelection(ref.current.target);
      }
    };
  }, [allowTextSelectionOnPress]);
  return {
    isPressed: isPressedProp || isPressed,
    pressProps: mergeProps(domProps, pressProps)
  };
}

function $ffc54430b1dbeee65879852feaaff07d$var$isHTMLAnchorLink(target) {
  return target.tagName === 'A' && target.hasAttribute('href');
}

function $ffc54430b1dbeee65879852feaaff07d$var$isValidKeyboardEvent(event) {
  const {
    key,
    code,
    target
  } = event;
  const element = target;
  const {
    tagName,
    isContentEditable
  } = element;
  const role = element.getAttribute('role'); // Accessibility for keyboards. Space and Enter only.
  // "Spacebar" is for IE 11

  return (key === 'Enter' || key === ' ' || key === 'Spacebar' || code === 'Space') && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && isContentEditable !== true && ( // A link with a valid href should be handled natively,
  // unless it also has role='button' and was triggered using Space.
  !$ffc54430b1dbeee65879852feaaff07d$var$isHTMLAnchorLink(element) || role === 'button' && key !== 'Enter') && // An element with role='link' should only trigger with Enter key
  !(role === 'link' && key !== 'Enter');
}

function $ffc54430b1dbeee65879852feaaff07d$var$getTouchFromEvent(event) {
  const {
    targetTouches
  } = event;

  if (targetTouches.length > 0) {
    return targetTouches[0];
  }

  return null;
}

function $ffc54430b1dbeee65879852feaaff07d$var$getTouchById(event, pointerId) {
  const changedTouches = event.changedTouches;

  for (let i = 0; i < changedTouches.length; i++) {
    const touch = changedTouches[i];

    if (touch.identifier === pointerId) {
      return touch;
    }
  }

  return null;
}

function $ffc54430b1dbeee65879852feaaff07d$var$createEvent(target, e) {
  return {
    currentTarget: target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey
  };
}

function $ffc54430b1dbeee65879852feaaff07d$var$getPointClientRect(point) {
  let offsetX = point.width / 2 || point.radiusX || 0;
  let offsetY = point.height / 2 || point.radiusY || 0;
  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX
  };
}

function $ffc54430b1dbeee65879852feaaff07d$var$areRectanglesOverlapping(a, b) {
  // check if they cannot overlap on x axis
  if (a.left > b.right || b.left > a.right) {
    return false;
  } // check if they cannot overlap on y axis


  if (a.top > b.bottom || b.top > a.bottom) {
    return false;
  }

  return true;
}

function $ffc54430b1dbeee65879852feaaff07d$var$isOverTarget(point, target) {
  let rect = target.getBoundingClientRect();
  let pointRect = $ffc54430b1dbeee65879852feaaff07d$var$getPointClientRect(point);
  return $ffc54430b1dbeee65879852feaaff07d$var$areRectanglesOverlapping(rect, pointRect);
}

function $ffc54430b1dbeee65879852feaaff07d$var$shouldPreventDefault(target) {
  // We cannot prevent default if the target is inside a draggable element.
  return !target.closest('[draggable="true"]');
}

function $ffc54430b1dbeee65879852feaaff07d$var$isVirtualPointerEvent(event) {
  // If the pointer size is zero, then we assume it's from a screen reader.
  // Android TalkBack double tap will sometimes return a event with width and height of 1
  // and pointerType === 'mouse' so we need to check for a specific combination of event attributes.
  // Cannot use "event.pressure === 0" as the sole check due to Safari pointer events always returning pressure === 0
  // instead of .5, see https://bugs.webkit.org/show_bug.cgi?id=206216
  return event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0;
}

const Pressable = /*#__PURE__*/(/* unused pure expression or super */ null && (_react.forwardRef((_ref, ref) => {
  var _ref2;

  let {
    children
  } = _ref,
      props = _babelRuntimeHelpersEsmObjectWithoutPropertiesLoose(_ref, ["children"]);

  let newRef = useRef();
  ref = (_ref2 = ref) != null ? _ref2 : newRef;
  let {
    pressProps
  } = usePress(_babelRuntimeHelpersEsmExtends({}, props, {
    ref
  }));

  let child = _react.Children.only(children);

  return /*#__PURE__*/_react.cloneElement(child, // @ts-ignore
  _babelRuntimeHelpersEsmExtends({
    ref
  }, mergeProps(child.props, pressProps)));
})));
const PressResponder = /*#__PURE__*/(/* unused pure expression or super */ null && (_react.forwardRef((_ref, ref) => {
  let {
    children
  } = _ref,
      props = _babelRuntimeHelpersEsmObjectWithoutPropertiesLoose(_ref, ["children"]);

  let isRegistered = useRef(false);
  let prevContext = useContext($a3ff51240de6f955c79cf17a88e349$export$PressResponderContext);
  let context = mergeProps(prevContext || {}, _babelRuntimeHelpersEsmExtends({}, props, {
    ref: ref || (prevContext == null ? void 0 : prevContext.ref),

    register() {
      isRegistered.current = true;

      if (prevContext) {
        prevContext.register();
      }
    }

  }));
  useSyncRef(prevContext, ref);
  useEffect(() => {
    if (!isRegistered.current) {
      console.warn('A PressResponder was rendered without a pressable child. ' + 'Either call the usePress hook, or wrap your DOM node with <Pressable> component.');
    }
  }, []);
  return /*#__PURE__*/_react.createElement($a3ff51240de6f955c79cf17a88e349$export$PressResponderContext.Provider, {
    value: context
  }, children);
})));
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

/**
 * Handles focus events for the immediate target.
 * Focus events on child elements will be ignored.
 */
function useFocus(props) {
  if (props.isDisabled) {
    return {
      focusProps: {}
    };
  }

  let onFocus, onBlur;

  if (props.onFocus || props.onFocusChange) {
    onFocus = e => {
      if (e.target === e.currentTarget) {
        if (props.onFocus) {
          props.onFocus(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(true);
        }
      }
    };
  }

  if (props.onBlur || props.onFocusChange) {
    onBlur = e => {
      if (e.target === e.currentTarget) {
        if (props.onBlur) {
          props.onBlur(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(false);
        }
      }
    };
  }

  return {
    focusProps: {
      onFocus,
      onBlur
    }
  };
}
let $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality = null;
let $d01f69bb2ab5f70dfd0005370a2a2cbc$var$changeHandlers = new Set();
let $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasSetupGlobalListeners = false;
let $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus = false;
let $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasBlurredWindowRecently = false; // Only Tab or Esc keys will make focus visible on text input elements

const $d01f69bb2ab5f70dfd0005370a2a2cbc$var$FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true
};

function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$triggerChangeHandlers(modality, e) {
  for (let handler of $d01f69bb2ab5f70dfd0005370a2a2cbc$var$changeHandlers) {
    handler(modality, e);
  }
}
/**
 * Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus styles visible.
 */


function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$isValidKey(e) {
  // Control and Shift keys trigger when navigating back to the tab with keyboard.
  return !(e.metaKey || !(0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_1__/* .isMac */ .V5)() && e.altKey || e.ctrlKey || e.key === 'Control' || e.key === 'Shift' || e.key === 'Meta');
}

function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleKeyboardEvent(e) {
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus = true;

  if ($d01f69bb2ab5f70dfd0005370a2a2cbc$var$isValidKey(e)) {
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality = 'keyboard';
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$triggerChangeHandlers('keyboard', e);
  }
}

function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handlePointerEvent(e) {
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality = 'pointer';

  if (e.type === 'mousedown' || e.type === 'pointerdown') {
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus = true;
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$triggerChangeHandlers('pointer', e);
  }
}

function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleClickEvent(e) {
  if ($f67ef9f1b8ed09b4b00fd0840cd8b94b$export$isVirtualClick(e)) {
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus = true;
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality = 'virtual';
  }
}

function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleFocusEvent(e) {
  // Firefox fires two extra focus events when the user first clicks into an iframe:
  // first on the window, then on the document. We ignore these events so they don't
  // cause keyboard focus rings to appear.
  if (e.target === window || e.target === document) {
    return;
  } // If a focus event occurs without a preceding keyboard or pointer event, switch to virtual modality.
  // This occurs, for example, when navigating a form with the next/previous buttons on iOS.


  if (!$d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus && !$d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasBlurredWindowRecently) {
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality = 'virtual';
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$triggerChangeHandlers('virtual', e);
  }

  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus = false;
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasBlurredWindowRecently = false;
}

function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleWindowBlur() {
  // When the window is blurred, reset state. This is necessary when tabbing out of the window,
  // for example, since a subsequent focus event won't be fired.
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus = false;
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasBlurredWindowRecently = true;
}
/**
 * Setup global event listeners to control when keyboard focus style should be visible.
 */


function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$setupGlobalFocusEvents() {
  if (typeof window === 'undefined' || $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasSetupGlobalListeners) {
    return;
  } // Programmatic focus() calls shouldn't affect the current input modality.
  // However, we need to detect other cases when a focus event occurs without
  // a preceding user event (e.g. screen reader focus). Overriding the focus
  // method on HTMLElement.prototype is a bit hacky, but works.


  let focus = HTMLElement.prototype.focus;

  HTMLElement.prototype.focus = function () {
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };

  document.addEventListener('keydown', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleKeyboardEvent, true);
  document.addEventListener('keyup', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleKeyboardEvent, true);
  document.addEventListener('click', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleClickEvent, true); // Register focus events on the window so they are sure to happen
  // before React's event listeners (registered on the document).

  window.addEventListener('focus', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleFocusEvent, true);
  window.addEventListener('blur', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handleWindowBlur, false);

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerdown', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handlePointerEvent, true);
    document.addEventListener('pointermove', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handlePointerEvent, true);
    document.addEventListener('pointerup', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handlePointerEvent, true);
  } else {
    document.addEventListener('mousedown', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handlePointerEvent, true);
    document.addEventListener('mousemove', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handlePointerEvent, true);
    document.addEventListener('mouseup', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$handlePointerEvent, true);
  }

  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$hasSetupGlobalListeners = true;
}

if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') {
    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$setupGlobalFocusEvents();
  } else {
    document.addEventListener('DOMContentLoaded', $d01f69bb2ab5f70dfd0005370a2a2cbc$var$setupGlobalFocusEvents);
  }
}
/**
 * If true, keyboard focus is visible.
 */


function isFocusVisible() {
  return $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality !== 'pointer';
}
function getInteractionModality() {
  return $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality;
}
function setInteractionModality(modality) {
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality = modality;
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$triggerChangeHandlers(modality, null);
}
/**
 * Keeps state of the current modality.
 */

function useInteractionModality() {
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$setupGlobalFocusEvents();
  let [modality, setModality] = useState($d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality);
  useEffect(() => {
    let handler = () => {
      setModality($d01f69bb2ab5f70dfd0005370a2a2cbc$var$currentModality);
    };

    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$changeHandlers.add(handler);
    return () => {
      $d01f69bb2ab5f70dfd0005370a2a2cbc$var$changeHandlers.delete(handler);
    };
  }, []);
  return modality;
}
/**
 * If this is attached to text input component, return if the event is a focus event (Tab/Escape keys pressed) so that
 * focus visible style can be properly set.
 */

function $d01f69bb2ab5f70dfd0005370a2a2cbc$var$isKeyboardFocusEvent(isTextInput, modality, e) {
  return !(isTextInput && modality === 'keyboard' && e instanceof KeyboardEvent && !$d01f69bb2ab5f70dfd0005370a2a2cbc$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
/**
 * Manages focus visible state for the page, and subscribes individual components for updates.
 */


function useFocusVisible(props) {
  if (props === void 0) {
    props = {};
  }

  let {
    isTextInput,
    autoFocus
  } = props;
  let [isFocusVisibleState, setFocusVisible] = useState(autoFocus || isFocusVisible());
  useFocusVisibleListener(isFocusVisible => {
    setFocusVisible(isFocusVisible);
  }, [isTextInput], {
    isTextInput
  });
  return {
    isFocusVisible: isFocusVisibleState
  };
}
/**
 * Listens for trigger change and reports if focus is visible (i.e., modality is not pointer).
 */

function useFocusVisibleListener(fn, deps, opts) {
  $d01f69bb2ab5f70dfd0005370a2a2cbc$var$setupGlobalFocusEvents();
  useEffect(() => {
    let handler = (modality, e) => {
      if (!$d01f69bb2ab5f70dfd0005370a2a2cbc$var$isKeyboardFocusEvent(opts == null ? void 0 : opts.isTextInput, modality, e)) {
        return;
      }

      fn(isFocusVisible());
    };

    $d01f69bb2ab5f70dfd0005370a2a2cbc$var$changeHandlers.add(handler);
    return () => $d01f69bb2ab5f70dfd0005370a2a2cbc$var$changeHandlers.delete(handler);
  }, deps);
}

/**
 * Handles focus events for the target and its descendants.
 */
function useFocusWithin(props) {
  let state = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    isFocusWithin: false
  }).current;

  if (props.isDisabled) {
    return {
      focusWithinProps: {}
    };
  }

  let onFocus = e => {
    if (!state.isFocusWithin) {
      if (props.onFocusWithin) {
        props.onFocusWithin(e);
      }

      if (props.onFocusWithinChange) {
        props.onFocusWithinChange(true);
      }

      state.isFocusWithin = true;
    }
  };

  let onBlur = e => {
    // We don't want to trigger onBlurWithin and then immediately onFocusWithin again
    // when moving focus inside the element. Only trigger if the currentTarget doesn't
    // include the relatedTarget (where focus is moving).
    if (state.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
      if (props.onBlurWithin) {
        props.onBlurWithin(e);
      }

      if (props.onFocusWithinChange) {
        props.onFocusWithinChange(false);
      }

      state.isFocusWithin = false;
    }
  };

  return {
    focusWithinProps: {
      onFocus: onFocus,
      onBlur: onBlur
    }
  };
}
// iOS fires onPointerEnter twice: once with pointerType="touch" and again with pointerType="mouse".
// We want to ignore these emulated events so they do not trigger hover behavior.
// See https://bugs.webkit.org/show_bug.cgi?id=214609.
let $b1a784c66b81d90efa4f74e05b$var$globalIgnoreEmulatedMouseEvents = false;
let $b1a784c66b81d90efa4f74e05b$var$hoverCount = 0;

function $b1a784c66b81d90efa4f74e05b$var$setGlobalIgnoreEmulatedMouseEvents() {
  $b1a784c66b81d90efa4f74e05b$var$globalIgnoreEmulatedMouseEvents = true; // Clear globalIgnoreEmulatedMouseEvents after a short timeout. iOS fires onPointerEnter
  // with pointerType="mouse" immediately after onPointerUp and before onFocus. On other
  // devices that don't have this quirk, we don't want to ignore a mouse hover sometime in
  // the distant future because a user previously touched the element.

  setTimeout(() => {
    $b1a784c66b81d90efa4f74e05b$var$globalIgnoreEmulatedMouseEvents = false;
  }, 50);
}

function $b1a784c66b81d90efa4f74e05b$var$handleGlobalPointerEvent(e) {
  if (e.pointerType === 'touch') {
    $b1a784c66b81d90efa4f74e05b$var$setGlobalIgnoreEmulatedMouseEvents();
  }
}

function $b1a784c66b81d90efa4f74e05b$var$setupGlobalTouchEvents() {
  if (typeof document === 'undefined') {
    return;
  }

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerup', $b1a784c66b81d90efa4f74e05b$var$handleGlobalPointerEvent);
  } else {
    document.addEventListener('touchend', $b1a784c66b81d90efa4f74e05b$var$setGlobalIgnoreEmulatedMouseEvents);
  }

  $b1a784c66b81d90efa4f74e05b$var$hoverCount++;
  return () => {
    $b1a784c66b81d90efa4f74e05b$var$hoverCount--;

    if ($b1a784c66b81d90efa4f74e05b$var$hoverCount > 0) {
      return;
    }

    if (typeof PointerEvent !== 'undefined') {
      document.removeEventListener('pointerup', $b1a784c66b81d90efa4f74e05b$var$handleGlobalPointerEvent);
    } else {
      document.removeEventListener('touchend', $b1a784c66b81d90efa4f74e05b$var$setGlobalIgnoreEmulatedMouseEvents);
    }
  };
}
/**
 * Handles pointer hover interactions for an element. Normalizes behavior
 * across browsers and platforms, and ignores emulated mouse events on touch devices.
 */


function useHover(props) {
  let {
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled
  } = props;
  let [isHovered, setHovered] = useState(false);
  let state = useRef({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: '',
    target: null
  }).current;
  useEffect($b1a784c66b81d90efa4f74e05b$var$setupGlobalTouchEvents, []);
  let {
    hoverProps,
    triggerHoverEnd
  } = useMemo(() => {
    let triggerHoverStart = (event, pointerType) => {
      state.pointerType = pointerType;

      if (isDisabled || pointerType === 'touch' || state.isHovered || !event.currentTarget.contains(event.target)) {
        return;
      }

      state.isHovered = true;
      let target = event.currentTarget;
      state.target = target;

      if (onHoverStart) {
        onHoverStart({
          type: 'hoverstart',
          target,
          pointerType
        });
      }

      if (onHoverChange) {
        onHoverChange(true);
      }

      setHovered(true);
    };

    let triggerHoverEnd = (event, pointerType) => {
      state.pointerType = '';
      state.target = null;

      if (pointerType === 'touch' || !state.isHovered) {
        return;
      }

      state.isHovered = false;
      let target = event.currentTarget;

      if (onHoverEnd) {
        onHoverEnd({
          type: 'hoverend',
          target,
          pointerType
        });
      }

      if (onHoverChange) {
        onHoverChange(false);
      }

      setHovered(false);
    };

    let hoverProps = {};

    if (typeof PointerEvent !== 'undefined') {
      hoverProps.onPointerEnter = e => {
        if ($b1a784c66b81d90efa4f74e05b$var$globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') {
          return;
        }

        triggerHoverStart(e, e.pointerType);
      };

      hoverProps.onPointerLeave = e => {
        if (!isDisabled && e.currentTarget.contains(e.target)) {
          triggerHoverEnd(e, e.pointerType);
        }
      };
    } else {
      hoverProps.onTouchStart = () => {
        state.ignoreEmulatedMouseEvents = true;
      };

      hoverProps.onMouseEnter = e => {
        if (!state.ignoreEmulatedMouseEvents && !$b1a784c66b81d90efa4f74e05b$var$globalIgnoreEmulatedMouseEvents) {
          triggerHoverStart(e, 'mouse');
        }

        state.ignoreEmulatedMouseEvents = false;
      };

      hoverProps.onMouseLeave = e => {
        if (!isDisabled && e.currentTarget.contains(e.target)) {
          triggerHoverEnd(e, 'mouse');
        }
      };
    }

    return {
      hoverProps,
      triggerHoverEnd
    };
  }, [onHoverStart, onHoverChange, onHoverEnd, isDisabled, state]);
  useEffect(() => {
    // Call the triggerHoverEnd as soon as isDisabled changes to true
    // Safe to call triggerHoverEnd, it will early return if we aren't currently hovering
    if (isDisabled) {
      triggerHoverEnd({
        currentTarget: state.target
      }, state.pointerType);
    }
  }, [isDisabled]);
  return {
    hoverProps,
    isHovered
  };
}

/**
 * Example, used in components like Dialogs and Popovers so they can close
 * when a user clicks outside them.
 */
function useInteractOutside(props) {
  let {
    ref,
    onInteractOutside,
    isDisabled,
    onInteractOutsideStart
  } = props;
  let stateRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
    onInteractOutside,
    onInteractOutsideStart
  });
  let state = stateRef.current;
  state.onInteractOutside = onInteractOutside;
  state.onInteractOutsideStart = onInteractOutsideStart;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isDisabled) {
      return;
    }

    let onPointerDown = e => {
      if ($e415bb64ab27cb8fbfac2f417412022f$var$isValidEvent(e, ref) && state.onInteractOutside) {
        if (state.onInteractOutsideStart) {
          state.onInteractOutsideStart(e);
        }

        state.isPointerDown = true;
      }
    }; // Use pointer events if available. Otherwise, fall back to mouse and touch events.


    if (typeof PointerEvent !== 'undefined') {
      let onPointerUp = e => {
        if (state.isPointerDown && state.onInteractOutside && $e415bb64ab27cb8fbfac2f417412022f$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      }; // changing these to capture phase fixed combobox


      document.addEventListener('pointerdown', onPointerDown, true);
      document.addEventListener('pointerup', onPointerUp, true);
      return () => {
        document.removeEventListener('pointerdown', onPointerDown, true);
        document.removeEventListener('pointerup', onPointerUp, true);
      };
    } else {
      let onMouseUp = e => {
        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
        } else if (state.isPointerDown && state.onInteractOutside && $e415bb64ab27cb8fbfac2f417412022f$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      };

      let onTouchEnd = e => {
        state.ignoreEmulatedMouseEvents = true;

        if (state.onInteractOutside && state.isPointerDown && $e415bb64ab27cb8fbfac2f417412022f$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      };

      document.addEventListener('mousedown', onPointerDown, true);
      document.addEventListener('mouseup', onMouseUp, true);
      document.addEventListener('touchstart', onPointerDown, true);
      document.addEventListener('touchend', onTouchEnd, true);
      return () => {
        document.removeEventListener('mousedown', onPointerDown, true);
        document.removeEventListener('mouseup', onMouseUp, true);
        document.removeEventListener('touchstart', onPointerDown, true);
        document.removeEventListener('touchend', onTouchEnd, true);
      };
    }
  }, [ref, state, isDisabled]);
}

function $e415bb64ab27cb8fbfac2f417412022f$var$isValidEvent(event, ref) {
  if (event.button > 0) {
    return false;
  } // if the event target is no longer in the document


  if (event.target) {
    const ownerDocument = event.target.ownerDocument;

    if (!ownerDocument || !ownerDocument.documentElement.contains(event.target)) {
      return false;
    }
  }

  return ref.current && !ref.current.contains(event.target);
}

/**
 * This function wraps a React event handler to make stopPropagation the default, and support continuePropagation instead.
 */
function $dc0d75166de722fbf58eb6c3552$export$createEventHandler(handler) {
  if (!handler) {
    return;
  }

  let shouldStopPropagation = true;
  return e => {
    let event = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)({}, e, {
      preventDefault() {
        e.preventDefault();
      },

      isDefaultPrevented() {
        return e.isDefaultPrevented();
      },

      stopPropagation() {
        console.error('stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.');
      },

      continuePropagation() {
        shouldStopPropagation = false;
      }

    });

    handler(event);

    if (shouldStopPropagation) {
      e.stopPropagation();
    }
  };
}

/**
 * Handles keyboard interactions for a focusable element.
 */
function useKeyboard(props) {
  return {
    keyboardProps: props.isDisabled ? {} : {
      onKeyDown: $dc0d75166de722fbf58eb6c3552$export$createEventHandler(props.onKeyDown),
      onKeyUp: $dc0d75166de722fbf58eb6c3552$export$createEventHandler(props.onKeyUp)
    }
  };
}

/**
 * Handles move interactions across mouse, touch, and keyboard, including dragging with
 * the mouse or touch, and using the arrow keys. Normalizes behavior across browsers and
 * platforms, and ignores emulated mouse events on touch devices.
 */
function useMove(props) {
  let {
    onMoveStart,
    onMove,
    onMoveEnd
  } = props;
  let state = useRef({
    didMove: false,
    lastPosition: null,
    id: null
  });
  let {
    addGlobalListener,
    removeGlobalListener
  } = useGlobalListeners();
  let moveProps = useMemo(() => {
    let moveProps = {};

    let start = () => {
      $e17c9db826984f8ab8e5d837bf0b8$export$disableTextSelection();
      state.current.didMove = false;
    };

    let move = (pointerType, deltaX, deltaY) => {
      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      if (!state.current.didMove) {
        state.current.didMove = true;
        onMoveStart == null ? void 0 : onMoveStart({
          type: 'movestart',
          pointerType
        });
      }

      onMove({
        type: 'move',
        pointerType,
        deltaX: deltaX,
        deltaY: deltaY
      });
    };

    let end = pointerType => {
      $e17c9db826984f8ab8e5d837bf0b8$export$restoreTextSelection();

      if (state.current.didMove) {
        onMoveEnd == null ? void 0 : onMoveEnd({
          type: 'moveend',
          pointerType
        });
      }
    };

    if (typeof PointerEvent === 'undefined') {
      let onMouseMove = e => {
        if (e.button === 0) {
          move('mouse', e.pageX - state.current.lastPosition.pageX, e.pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
        }
      };

      let onMouseUp = e => {
        if (e.button === 0) {
          end('mouse');
          removeGlobalListener(window, 'mousemove', onMouseMove, false);
          removeGlobalListener(window, 'mouseup', onMouseUp, false);
        }
      };

      moveProps.onMouseDown = e => {
        if (e.button === 0) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
          addGlobalListener(window, 'mousemove', onMouseMove, false);
          addGlobalListener(window, 'mouseup', onMouseUp, false);
        }
      };

      let onTouchMove = e => {
        // @ts-ignore
        let touch = [...e.changedTouches].findIndex((_ref) => {
          let {
            identifier
          } = _ref;
          return identifier === state.current.id;
        });

        if (touch >= 0) {
          let {
            pageX,
            pageY
          } = e.changedTouches[touch];
          move('touch', pageX - state.current.lastPosition.pageX, pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX,
            pageY
          };
        }
      };

      let onTouchEnd = e => {
        // @ts-ignore
        let touch = [...e.changedTouches].findIndex((_ref2) => {
          let {
            identifier
          } = _ref2;
          return identifier === state.current.id;
        });

        if (touch >= 0) {
          end('touch');
          state.current.id = null;
          removeGlobalListener(window, 'touchmove', onTouchMove);
          removeGlobalListener(window, 'touchend', onTouchEnd);
          removeGlobalListener(window, 'touchcancel', onTouchEnd);
        }
      };

      moveProps.onTouchStart = e => {
        if (e.changedTouches.length === 0 || state.current.id != null) {
          return;
        }

        let {
          pageX,
          pageY,
          identifier
        } = e.changedTouches[0];
        start();
        e.stopPropagation();
        e.preventDefault();
        state.current.lastPosition = {
          pageX,
          pageY
        };
        state.current.id = identifier;
        addGlobalListener(window, 'touchmove', onTouchMove, false);
        addGlobalListener(window, 'touchend', onTouchEnd, false);
        addGlobalListener(window, 'touchcancel', onTouchEnd, false);
      };
    } else {
      let onPointerMove = e => {
        if (e.pointerId === state.current.id) {
          // @ts-ignore
          let pointerType = e.pointerType || 'mouse'; // Problems with PointerEvent#movementX/movementY:
          // 1. it is always 0 on macOS Safari.
          // 2. On Chrome Android, it's scaled by devicePixelRatio, but not on Chrome macOS

          move(pointerType, e.pageX - state.current.lastPosition.pageX, e.pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
        }
      };

      let onPointerUp = e => {
        if (e.pointerId === state.current.id) {
          // @ts-ignore
          let pointerType = e.pointerType || 'mouse';
          end(pointerType);
          state.current.id = null;
          removeGlobalListener(window, 'pointermove', onPointerMove, false);
          removeGlobalListener(window, 'pointerup', onPointerUp, false);
          removeGlobalListener(window, 'pointercancel', onPointerUp, false);
        }
      };

      moveProps.onPointerDown = e => {
        if (e.button === 0 && state.current.id == null) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
          state.current.id = e.pointerId;
          addGlobalListener(window, 'pointermove', onPointerMove, false);
          addGlobalListener(window, 'pointerup', onPointerUp, false);
          addGlobalListener(window, 'pointercancel', onPointerUp, false);
        }
      };
    }

    let triggerKeyboardMove = (deltaX, deltaY) => {
      start();
      move('keyboard', deltaX, deltaY);
      end('keyboard');
    };

    moveProps.onKeyDown = e => {
      switch (e.key) {
        case 'Left':
        case 'ArrowLeft':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(-1, 0);
          break;

        case 'Right':
        case 'ArrowRight':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(1, 0);
          break;

        case 'Up':
        case 'ArrowUp':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(0, -1);
          break;

        case 'Down':
        case 'ArrowDown':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(0, 1);
          break;
      }
    };

    return moveProps;
  }, [state, onMoveStart, onMove, onMoveEnd, addGlobalListener, removeGlobalListener]);
  return {
    moveProps
  };
}
// scroll wheel needs to be added not passively so it's cancelable, small helper hook to remember that
function useScrollWheel(props, ref) {
  let {
    onScroll,
    isDisabled
  } = props;
  let onScrollHandler = useCallback(e => {
    // If the ctrlKey is pressed, this is a zoom event, do nothing.
    if (e.ctrlKey) {
      return;
    } // stop scrolling the page


    e.preventDefault();
    e.stopPropagation();

    if (onScroll) {
      onScroll({
        deltaX: e.deltaX,
        deltaY: e.deltaY
      });
    }
  }, [onScroll]);
  useEvent(ref, 'wheel', isDisabled ? null : onScrollHandler);
}
const $cd8e0096d064b4c36af8a188dfbda75c$var$DEFAULT_THRESHOLD = 500;
/**
 * Handles long press interactions across mouse and touch devices. Supports a customizable time threshold,
 * accessibility description, and normalizes behavior across browsers and devices.
 */

function useLongPress(props) {
  let {
    isDisabled,
    onLongPressStart,
    onLongPressEnd,
    onLongPress,
    threshold = $cd8e0096d064b4c36af8a188dfbda75c$var$DEFAULT_THRESHOLD,
    accessibilityDescription
  } = props;
  const timeRef = useRef(null);
  let {
    addGlobalListener,
    removeGlobalListener
  } = useGlobalListeners();
  let {
    pressProps
  } = usePress({
    isDisabled,

    onPressStart(e) {
      if (e.pointerType === 'mouse' || e.pointerType === 'touch') {
        if (onLongPressStart) {
          onLongPressStart(_babelRuntimeHelpersEsmExtends({}, e, {
            type: 'longpressstart'
          }));
        }

        timeRef.current = setTimeout(() => {
          // Prevent other usePress handlers from also handling this event.
          e.target.dispatchEvent(new PointerEvent('pointercancel', {
            bubbles: true
          }));

          if (onLongPress) {
            onLongPress(_babelRuntimeHelpersEsmExtends({}, e, {
              type: 'longpress'
            }));
          }

          timeRef.current = null;
        }, threshold); // Prevent context menu, which may be opened on long press on touch devices

        if (e.pointerType === 'touch') {
          let onContextMenu = e => {
            e.preventDefault();
          };

          addGlobalListener(e.target, 'contextmenu', onContextMenu, {
            once: true
          });
          addGlobalListener(window, 'pointerup', () => {
            // If no contextmenu event is fired quickly after pointerup, remove the handler
            // so future context menu events outside a long press are not prevented.
            setTimeout(() => {
              removeGlobalListener(e.target, 'contextmenu', onContextMenu);
            }, 30);
          }, {
            once: true
          });
        }
      }
    },

    onPressEnd(e) {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }

      if (onLongPressEnd && (e.pointerType === 'mouse' || e.pointerType === 'touch')) {
        onLongPressEnd(_babelRuntimeHelpersEsmExtends({}, e, {
          type: 'longpressend'
        }));
      }
    }

  });
  let descriptionProps = useDescription(onLongPress && !isDisabled ? accessibilityDescription : null);
  return {
    longPressProps: mergeProps(pressProps, descriptionProps)
  };
}
//# sourceMappingURL=module.js.map


/***/ }),

/***/ 47106:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "tS": function() { return /* binding */ chain; },
  "zL": function() { return /* binding */ filterDOMProps; },
  "Ao": function() { return /* binding */ focusWithoutScrolling; },
  "rP": function() { return /* binding */ getScrollParent; },
  "gn": function() { return /* binding */ isIOS; },
  "V5": function() { return /* binding */ isMac; },
  "QB": function() { return /* binding */ runAfterTransition; },
  "bt": function() { return /* binding */ module_useLayoutEffect; },
  "mp": function() { return /* binding */ useSlotId; }
});

// UNUSED EXPORTS: clamp, getOffset, isAndroid, isAppleDevice, isChrome, isIPad, isIPhone, isWebKit, mergeIds, mergeProps, snapValueToStep, useDescription, useDrag1D, useEvent, useGlobalListeners, useId, useLabels, useObjectRef, useResizeObserver, useSyncRef, useUpdateEffect, useValueEffect, useViewportSize

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
;// CONCATENATED MODULE: ./node_modules/@react-aria/ssr/dist/module.js

// Default context value to use in case there is no SSRProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. SSRProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of React Aria is not supported.
const $f01a183cc7bdff77849e49ad26eb904$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 10000000000)),
  current: 0
};

const $f01a183cc7bdff77849e49ad26eb904$var$SSRContext = /*#__PURE__*/react.createContext($f01a183cc7bdff77849e49ad26eb904$var$defaultContext);

/**
 * When using SSR with React Aria, applications must be wrapped in an SSRProvider.
 * This ensures that auto generated ids are consistent between the client and server.
 */
function SSRProvider(props) {
  let cur = useContext($f01a183cc7bdff77849e49ad26eb904$var$SSRContext);
  let value = useMemo(() => ({
    // If this is the first SSRProvider, start with an empty string prefix, otherwise
    // append and increment the counter.
    prefix: cur === $f01a183cc7bdff77849e49ad26eb904$var$defaultContext ? '' : cur.prefix + "-" + ++cur.current,
    current: 0
  }), [cur]);
  return /*#__PURE__*/_react.createElement($f01a183cc7bdff77849e49ad26eb904$var$SSRContext.Provider, {
    value: value
  }, props.children);
}
let $f01a183cc7bdff77849e49ad26eb904$var$canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
/** @private */

function useSSRSafeId(defaultId) {
  let ctx = (0,react.useContext)($f01a183cc7bdff77849e49ad26eb904$var$SSRContext); // If we are rendering in a non-DOM environment, and there's no SSRProvider,
  // provide a warning to hint to the developer to add one.

  if (ctx === $f01a183cc7bdff77849e49ad26eb904$var$defaultContext && !$f01a183cc7bdff77849e49ad26eb904$var$canUseDOM) {
    console.warn('When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.');
  }

  return (0,react.useMemo)(() => defaultId || "react-aria" + ctx.prefix + "-" + ++ctx.current, [defaultId]);
}
/**
 * Returns whether the component is currently being server side rendered or
 * hydrated on the client. Can be used to delay browser-specific rendering
 * until after hydration.
 */

function useIsSSR() {
  let cur = useContext($f01a183cc7bdff77849e49ad26eb904$var$SSRContext);
  let isInSSRContext = cur !== $f01a183cc7bdff77849e49ad26eb904$var$defaultContext;
  let [isSSR, setIsSSR] = useState(isInSSRContext); // If on the client, and the component was initially server rendered,
  // then schedule a layout effect to update the component after hydration.

  if (typeof window !== 'undefined' && isInSSRContext) {
    // This if statement technically breaks the rules of hooks, but is safe
    // because the condition never changes after mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      setIsSSR(false);
    }, []);
  }

  return isSSR;
}
//# sourceMappingURL=module.js.map

;// CONCATENATED MODULE: ./node_modules/@react-aria/utils/dist/module.js






// During SSR, React emits a warning when calling useLayoutEffect.
// Since neither useLayoutEffect nor useEffect run on the server,
// we can suppress this by replace it with a noop on the server.
const module_useLayoutEffect = typeof window !== 'undefined' ? react.useLayoutEffect : () => {};
let $f8b5fdd96fb429d7102983f777c41307$var$idsUpdaterMap = new Map();
/**
 * If a default is not provided, generate an id.
 * @param defaultId - Default component id.
 */

function useId(defaultId) {
  let isRendering = (0,react.useRef)(true);
  isRendering.current = true;
  let [value, setValue] = (0,react.useState)(defaultId);
  let nextId = (0,react.useRef)(null);
  let res = useSSRSafeId(value); // don't memo this, we want it new each render so that the Effects always run

  let updateValue = val => {
    if (!isRendering.current) {
      setValue(val);
    } else {
      nextId.current = val;
    }
  };

  $f8b5fdd96fb429d7102983f777c41307$var$idsUpdaterMap.set(res, updateValue);
  module_useLayoutEffect(() => {
    isRendering.current = false;
  }, [updateValue]);
  module_useLayoutEffect(() => {
    let r = res;
    return () => {
      $f8b5fdd96fb429d7102983f777c41307$var$idsUpdaterMap.delete(r);
    };
  }, [res]);
  (0,react.useEffect)(() => {
    let newId = nextId.current;

    if (newId) {
      setValue(newId);
      nextId.current = null;
    }
  }, [setValue, updateValue]);
  return res;
}
/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */

function mergeIds(idA, idB) {
  if (idA === idB) {
    return idA;
  }

  let setIdA = $f8b5fdd96fb429d7102983f777c41307$var$idsUpdaterMap.get(idA);

  if (setIdA) {
    setIdA(idB);
    return idB;
  }

  let setIdB = $f8b5fdd96fb429d7102983f777c41307$var$idsUpdaterMap.get(idB);

  if (setIdB) {
    setIdB(idA);
    return idA;
  }

  return idB;
}
/**
 * Used to generate an id, and after render, check if that id is rendered so we know
 * if we can use it in places such as labelledby.
 * @param depArray - When to recalculate if the id is in the DOM.
 */

function useSlotId(depArray) {
  if (depArray === void 0) {
    depArray = [];
  }

  let id = useId();
  let [resolvedId, setResolvedId] = useValueEffect(id);
  let updateId = (0,react.useCallback)(() => {
    setResolvedId(function* () {
      yield id;
      yield document.getElementById(id) ? id : null;
    });
  }, [id, setResolvedId]);
  module_useLayoutEffect(updateId, [id, updateId, ...depArray]);
  return resolvedId;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
function chain() {
  for (var _len = arguments.length, callbacks = new Array(_len), _key = 0; _key < _len; _key++) {
    callbacks[_key] = arguments[_key];
  }

  return function () {
    for (let callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...arguments);
      }
    }
  };
}

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
function mergeProps() {
  // Start with a base clone of the first argument. This is a lot faster than starting
  // with an empty object and adding properties as we go.
  let result = _babelRuntimeHelpersEsmExtends({}, arguments.length <= 0 ? undefined : arguments[0]);

  for (let i = 1; i < arguments.length; i++) {
    let props = i < 0 || arguments.length <= i ? undefined : arguments[i];

    for (let key in props) {
      let a = result[key];
      let b = props[key]; // Chain events

      if (typeof a === 'function' && typeof b === 'function' && // This is a lot faster than a regex.
      key[0] === 'o' && key[1] === 'n' && key.charCodeAt(2) >=
      /* 'A' */
      65 && key.charCodeAt(2) <=
      /* 'Z' */
      90) {
        result[key] = chain(a, b); // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') {
        result[key] = _clsx(a, b);
      } else if (key === 'id' && a && b) {
        result.id = mergeIds(a, b); // Override others
      } else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }

  return result;
}
const $f6a965352cabf1a7c37e8c1337e5eab$var$DOMPropNames = new Set(['id']);
const $f6a965352cabf1a7c37e8c1337e5eab$var$labelablePropNames = new Set(['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-details']);
const $f6a965352cabf1a7c37e8c1337e5eab$var$propRe = /^(data-.*)$/;
/**
 * Filters out all props that aren't valid DOM props or defined via override prop obj.
 * @param props - The component props to be filtered.
 * @param opts - Props to override.
 */

function filterDOMProps(props, opts) {
  if (opts === void 0) {
    opts = {};
  }

  let {
    labelable,
    propNames
  } = opts;
  let filteredProps = {};

  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(props, prop) && ($f6a965352cabf1a7c37e8c1337e5eab$var$DOMPropNames.has(prop) || labelable && $f6a965352cabf1a7c37e8c1337e5eab$var$labelablePropNames.has(prop) || propNames != null && propNames.has(prop) || $f6a965352cabf1a7c37e8c1337e5eab$var$propRe.test(prop))) {
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}
// Currently necessary for Safari and old Edge:
// https://caniuse.com/#feat=mdn-api_htmlelement_focus_preventscroll_option
// See https://bugs.webkit.org/show_bug.cgi?id=178583
//
// Original licensing for the following methods can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/calvellido/focus-options-polyfill
function focusWithoutScrolling(element) {
  if ($bc7c9c3af78f5218ff72cecce15730$var$supportsPreventScroll()) {
    element.focus({
      preventScroll: true
    });
  } else {
    let scrollableElements = $bc7c9c3af78f5218ff72cecce15730$var$getScrollableElements(element);
    element.focus();
    $bc7c9c3af78f5218ff72cecce15730$var$restoreScrollPosition(scrollableElements);
  }
}
let $bc7c9c3af78f5218ff72cecce15730$var$supportsPreventScrollCached = null;

function $bc7c9c3af78f5218ff72cecce15730$var$supportsPreventScroll() {
  if ($bc7c9c3af78f5218ff72cecce15730$var$supportsPreventScrollCached == null) {
    $bc7c9c3af78f5218ff72cecce15730$var$supportsPreventScrollCached = false;

    try {
      var focusElem = document.createElement('div');
      focusElem.focus({
        get preventScroll() {
          $bc7c9c3af78f5218ff72cecce15730$var$supportsPreventScrollCached = true;
          return true;
        }

      });
    } catch (e) {// Ignore
    }
  }

  return $bc7c9c3af78f5218ff72cecce15730$var$supportsPreventScrollCached;
}

function $bc7c9c3af78f5218ff72cecce15730$var$getScrollableElements(element) {
  var parent = element.parentNode;
  var scrollableElements = [];
  var rootScrollingElement = document.scrollingElement || document.documentElement;

  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    }

    parent = parent.parentNode;
  }

  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  }

  return scrollableElements;
}

function $bc7c9c3af78f5218ff72cecce15730$var$restoreScrollPosition(scrollableElements) {
  for (let {
    element,
    scrollTop,
    scrollLeft
  } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

function getOffset(element, reverse, orientation) {
  if (orientation === void 0) {
    orientation = 'horizontal';
  }

  let rect = element.getBoundingClientRect();

  if (reverse) {
    return orientation === 'horizontal' ? rect.right : rect.bottom;
  }

  return orientation === 'horizontal' ? rect.left : rect.top;
}
// mapped to a set of CSS properties that are transitioning for that element.
// This is necessary rather than a simple count of transitions because of browser
// bugs, e.g. Chrome sometimes fires both transitionend and transitioncancel rather
// than one or the other. So we need to track what's actually transitioning so that
// we can ignore these duplicate events.
let $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionsByElement = new Map(); // A list of callbacks to call once there are no transitioning elements.

let $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionCallbacks = new Set();

function $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$setupGlobalEvents() {
  if (typeof window === 'undefined') {
    return;
  }

  let onTransitionStart = e => {
    // Add the transitioning property to the list for this element.
    let transitions = $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionsByElement.get(e.target);

    if (!transitions) {
      transitions = new Set();
      $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionsByElement.set(e.target, transitions); // The transitioncancel event must be registered on the element itself, rather than as a global
      // event. This enables us to handle when the node is deleted from the document while it is transitioning.
      // In that case, the cancel event would have nowhere to bubble to so we need to handle it directly.

      e.target.addEventListener('transitioncancel', onTransitionEnd);
    }

    transitions.add(e.propertyName);
  };

  let onTransitionEnd = e => {
    // Remove property from list of transitioning properties.
    let properties = $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionsByElement.get(e.target);

    if (!properties) {
      return;
    }

    properties.delete(e.propertyName); // If empty, remove transitioncancel event, and remove the element from the list of transitioning elements.

    if (properties.size === 0) {
      e.target.removeEventListener('transitioncancel', onTransitionEnd);
      $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionsByElement.delete(e.target);
    } // If no transitioning elements, call all of the queued callbacks.


    if ($b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionsByElement.size === 0) {
      for (let cb of $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionCallbacks) {
        cb();
      }

      $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionCallbacks.clear();
    }
  };

  document.body.addEventListener('transitionrun', onTransitionStart);
  document.body.addEventListener('transitionend', onTransitionEnd);
}

if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') {
    $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$setupGlobalEvents();
  } else {
    document.addEventListener('DOMContentLoaded', $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$setupGlobalEvents);
  }
}

function runAfterTransition(fn) {
  // Wait one frame to see if an animation starts, e.g. a transition on mount.
  requestAnimationFrame(() => {
    // If no transitions are running, call the function immediately.
    // Otherwise, add it to a list of callbacks to run at the end of the animation.
    if ($b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionsByElement.size === 0) {
      fn();
    } else {
      $b3e8d5c5f32fa26afa6df1b81f09b6b8$var$transitionCallbacks.add(fn);
    }
  });
}
// Keep track of elements that we are currently handling dragging for via useDrag1D.
// If there's an ancestor and a descendant both using useDrag1D(), and the user starts
// dragging the descendant, we don't want useDrag1D events to fire for the ancestor.
const $be9622dfd8e876c0943b0b4e429554f3$var$draggingElements = (/* unused pure expression or super */ null && ([])); // created for splitview, this should be reusable for things like sliders/dials
// It also handles keyboard events on the target allowing for increment/decrement by a given stepsize as well as minifying/maximizing and toggling between minified and previous size
// It can also take a 'reverse' param to say if we should measure from the right/bottom instead of the top/left
// It can also handle either a vertical or horizontal movement, but not both at the same time

function useDrag1D(props) {
  console.warn('useDrag1D is deprecated, please use `useMove` instead https://react-spectrum.adobe.com/react-aria/useMove.html');
  let {
    containerRef,
    reverse,
    orientation,
    onHover,
    onDrag,
    onPositionChange,
    onIncrement,
    onDecrement,
    onIncrementToMax,
    onDecrementToMin,
    onCollapseToggle
  } = props;

  let getPosition = e => orientation === 'horizontal' ? e.clientX : e.clientY;

  let getNextOffset = e => {
    let containerOffset = getOffset(containerRef.current, reverse, orientation);
    let mouseOffset = getPosition(e);
    let nextOffset = reverse ? containerOffset - mouseOffset : mouseOffset - containerOffset;
    return nextOffset;
  };

  let dragging = useRef(false);
  let prevPosition = useRef(0); // Keep track of the current handlers in a ref so that the events can access them.

  let handlers = useRef({
    onPositionChange,
    onDrag
  });
  handlers.current.onDrag = onDrag;
  handlers.current.onPositionChange = onPositionChange;

  let onMouseDragged = e => {
    e.preventDefault();
    let nextOffset = getNextOffset(e);

    if (!dragging.current) {
      dragging.current = true;

      if (handlers.current.onDrag) {
        handlers.current.onDrag(true);
      }

      if (handlers.current.onPositionChange) {
        handlers.current.onPositionChange(nextOffset);
      }
    }

    if (prevPosition.current === nextOffset) {
      return;
    }

    prevPosition.current = nextOffset;

    if (onPositionChange) {
      onPositionChange(nextOffset);
    }
  };

  let onMouseUp = e => {
    const target = e.target;
    dragging.current = false;
    let nextOffset = getNextOffset(e);

    if (handlers.current.onDrag) {
      handlers.current.onDrag(false);
    }

    if (handlers.current.onPositionChange) {
      handlers.current.onPositionChange(nextOffset);
    }

    $be9622dfd8e876c0943b0b4e429554f3$var$draggingElements.splice($be9622dfd8e876c0943b0b4e429554f3$var$draggingElements.indexOf(target), 1);
    window.removeEventListener('mouseup', onMouseUp, false);
    window.removeEventListener('mousemove', onMouseDragged, false);
  };

  let onMouseDown = e => {
    const target = e.currentTarget; // If we're already handling dragging on a descendant with useDrag1D, then
    // we don't want to handle the drag motion on this target as well.

    if ($be9622dfd8e876c0943b0b4e429554f3$var$draggingElements.some(elt => target.contains(elt))) {
      return;
    }

    $be9622dfd8e876c0943b0b4e429554f3$var$draggingElements.push(target);
    window.addEventListener('mousemove', onMouseDragged, false);
    window.addEventListener('mouseup', onMouseUp, false);
  };

  let onMouseEnter = () => {
    if (onHover) {
      onHover(true);
    }
  };

  let onMouseOut = () => {
    if (onHover) {
      onHover(false);
    }
  };

  let onKeyDown = e => {
    switch (e.key) {
      case 'Left':
      case 'ArrowLeft':
        if (orientation === 'horizontal') {
          e.preventDefault();

          if (onDecrement && !reverse) {
            onDecrement();
          } else if (onIncrement && reverse) {
            onIncrement();
          }
        }

        break;

      case 'Up':
      case 'ArrowUp':
        if (orientation === 'vertical') {
          e.preventDefault();

          if (onDecrement && !reverse) {
            onDecrement();
          } else if (onIncrement && reverse) {
            onIncrement();
          }
        }

        break;

      case 'Right':
      case 'ArrowRight':
        if (orientation === 'horizontal') {
          e.preventDefault();

          if (onIncrement && !reverse) {
            onIncrement();
          } else if (onDecrement && reverse) {
            onDecrement();
          }
        }

        break;

      case 'Down':
      case 'ArrowDown':
        if (orientation === 'vertical') {
          e.preventDefault();

          if (onIncrement && !reverse) {
            onIncrement();
          } else if (onDecrement && reverse) {
            onDecrement();
          }
        }

        break;

      case 'Home':
        e.preventDefault();

        if (onDecrementToMin) {
          onDecrementToMin();
        }

        break;

      case 'End':
        e.preventDefault();

        if (onIncrementToMax) {
          onIncrementToMax();
        }

        break;

      case 'Enter':
        e.preventDefault();

        if (onCollapseToggle) {
          onCollapseToggle();
        }

        break;
    }
  };

  return {
    onMouseDown,
    onMouseEnter,
    onMouseOut,
    onKeyDown
  };
}
function useGlobalListeners() {
  let globalListeners = useRef(new Map());
  let addGlobalListener = useCallback((eventTarget, type, listener, options) => {
    // Make sure we remove the listener after it is called with the `once` option.
    let fn = options != null && options.once ? function () {
      globalListeners.current.delete(listener);
      listener(...arguments);
    } : listener;
    globalListeners.current.set(listener, {
      type,
      eventTarget,
      fn,
      options
    });
    eventTarget.addEventListener(type, listener, options);
  }, []);
  let removeGlobalListener = useCallback((eventTarget, type, listener, options) => {
    var _globalListeners$curr;

    let fn = ((_globalListeners$curr = globalListeners.current.get(listener)) == null ? void 0 : _globalListeners$curr.fn) || listener;
    eventTarget.removeEventListener(type, fn, options);
    globalListeners.current.delete(listener);
  }, []);
  let removeAllGlobalListeners = useCallback(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [removeGlobalListener]); // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    return removeAllGlobalListeners;
  }, [removeAllGlobalListeners]);
  return {
    addGlobalListener,
    removeGlobalListener,
    removeAllGlobalListeners
  };
}

/**
 * Merges aria-label and aria-labelledby into aria-labelledby when both exist.
 * @param props - Aria label props.
 * @param defaultLabel - Default value for aria-label when not present.
 */
function useLabels(props, defaultLabel) {
  let {
    id,
    'aria-label': label,
    'aria-labelledby': labelledBy
  } = props; // If there is both an aria-label and aria-labelledby,
  // combine them by pointing to the element itself.

  id = useId(id);

  if (labelledBy && label) {
    let ids = new Set([...labelledBy.trim().split(/\s+/), id]);
    labelledBy = [...ids].join(' ');
  } else if (labelledBy) {
    labelledBy = labelledBy.trim().split(/\s+/).join(' ');
  } // If no labels are provided, use the default


  if (!label && !labelledBy && defaultLabel) {
    label = defaultLabel;
  }

  return {
    id,
    'aria-label': label,
    'aria-labelledby': labelledBy
  };
}

/**
 * Offers an object ref for a given callback ref or an object ref. Especially
 * helfpul when passing forwarded refs (created using `React.forwardRef`) to
 * React Aria Hooks.
 *
 * @param forwardedRef The original ref intended to be used.
 * @returns An object ref that updates the given ref.
 * @see https://reactjs.org/docs/forwarding-refs.html
 */
function useObjectRef(forwardedRef) {
  const objRef = useRef();
  /**
   * We're using `useLayoutEffect` here instead of `useEffect` because we want
   * to make sure that the `ref` value is up to date before other places in the
   * the execution cycle try to read it.
   */

  module_useLayoutEffect(() => {
    if (!forwardedRef) {
      return;
    }

    if (typeof forwardedRef === 'function') {
      forwardedRef(objRef.current);
    } else {
      forwardedRef.current = objRef.current;
    }
  }, [forwardedRef]);
  return objRef;
}
// Like useEffect, but only called for updates after the initial render.
function useUpdateEffect(effect, dependencies) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, dependencies);
}

function $d642970c01dc21e3fe2261c17768$var$hasResizeObserver() {
  return typeof window.ResizeObserver !== 'undefined';
}

function useResizeObserver(options) {
  const {
    ref,
    onResize
  } = options;
  useEffect(() => {
    let element = ref == null ? void 0 : ref.current;

    if (!element) {
      return;
    }

    if (!$d642970c01dc21e3fe2261c17768$var$hasResizeObserver()) {
      window.addEventListener('resize', onResize, false);
      return () => {
        window.removeEventListener('resize', onResize, false);
      };
    } else {
      const resizeObserverInstance = new window.ResizeObserver(entries => {
        if (!entries.length) {
          return;
        }

        onResize();
      });
      resizeObserverInstance.observe(element);
      return () => {
        if (element) {
          resizeObserverInstance.unobserve(element);
        }
      };
    }
  }, [onResize, ref]);
}
// Syncs ref from context with ref passed to hook
function useSyncRef(context, ref) {
  module_useLayoutEffect(() => {
    if (context && context.ref && ref) {
      context.ref.current = ref.current;
      return () => {
        context.ref.current = null;
      };
    }
  }, [context, ref]);
}
function getScrollParent(node) {
  while (node && !$a164c39662575b65a0b01a73e313e5$var$isScrollable(node)) {
    node = node.parentElement;
  }

  return node || document.scrollingElement || document.documentElement;
}

function $a164c39662575b65a0b01a73e313e5$var$isScrollable(node) {
  let style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}

// @ts-ignore
let $d662329747d896105af008c761523$var$visualViewport = typeof window !== 'undefined' && window.visualViewport;
function useViewportSize() {
  let [size, setSize] = useState(() => $d662329747d896105af008c761523$var$getViewportSize());
  useEffect(() => {
    // Use visualViewport api to track available height even on iOS virtual keyboard opening
    let onResize = () => {
      setSize(size => {
        let newSize = $d662329747d896105af008c761523$var$getViewportSize();

        if (newSize.width === size.width && newSize.height === size.height) {
          return size;
        }

        return newSize;
      });
    };

    if (!$d662329747d896105af008c761523$var$visualViewport) {
      window.addEventListener('resize', onResize);
    } else {
      $d662329747d896105af008c761523$var$visualViewport.addEventListener('resize', onResize);
    }

    return () => {
      if (!$d662329747d896105af008c761523$var$visualViewport) {
        window.removeEventListener('resize', onResize);
      } else {
        $d662329747d896105af008c761523$var$visualViewport.removeEventListener('resize', onResize);
      }
    };
  }, []);
  return size;
}

function $d662329747d896105af008c761523$var$getViewportSize() {
  return {
    width: ($d662329747d896105af008c761523$var$visualViewport == null ? void 0 : $d662329747d896105af008c761523$var$visualViewport.width) || window.innerWidth,
    height: ($d662329747d896105af008c761523$var$visualViewport == null ? void 0 : $d662329747d896105af008c761523$var$visualViewport.height) || window.innerHeight
  };
}

let $c8aa524f123a75a64d51e06d16b9568$var$descriptionId = 0;
const $c8aa524f123a75a64d51e06d16b9568$var$descriptionNodes = new Map();
function useDescription(description) {
  let [id, setId] = useState(null);
  module_useLayoutEffect(() => {
    if (!description) {
      return;
    }

    let desc = $c8aa524f123a75a64d51e06d16b9568$var$descriptionNodes.get(description);

    if (!desc) {
      let id = "react-aria-description-" + $c8aa524f123a75a64d51e06d16b9568$var$descriptionId++;
      setId(id);
      let node = document.createElement('div');
      node.id = id;
      node.style.display = 'none';
      node.textContent = description;
      document.body.appendChild(node);
      desc = {
        refCount: 0,
        element: node
      };
      $c8aa524f123a75a64d51e06d16b9568$var$descriptionNodes.set(description, desc);
    } else {
      setId(desc.element.id);
    }

    desc.refCount++;
    return () => {
      if (--desc.refCount === 0) {
        desc.element.remove();
        $c8aa524f123a75a64d51e06d16b9568$var$descriptionNodes.delete(description);
      }
    };
  }, [description]);
  return {
    'aria-describedby': description ? id : undefined
  };
}

function $b0986c1243f71db8e992f67117a1ed9$var$testUserAgent(re) {
  return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.userAgent) : false;
}

function $b0986c1243f71db8e992f67117a1ed9$var$testPlatform(re) {
  return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.platform) : false;
}

function isMac() {
  return $b0986c1243f71db8e992f67117a1ed9$var$testPlatform(/^Mac/);
}
function isIPhone() {
  return $b0986c1243f71db8e992f67117a1ed9$var$testPlatform(/^iPhone/);
}
function isIPad() {
  return $b0986c1243f71db8e992f67117a1ed9$var$testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isAppleDevice() {
  return isMac() || isIOS();
}
function isWebKit() {
  return $b0986c1243f71db8e992f67117a1ed9$var$testUserAgent(/AppleWebKit/) && !isChrome();
}
function isChrome() {
  return $b0986c1243f71db8e992f67117a1ed9$var$testUserAgent(/Chrome/);
}
function isAndroid() {
  return $b0986c1243f71db8e992f67117a1ed9$var$testUserAgent(/Android/);
}
function useEvent(ref, event, handler, options) {
  let handlerRef = useRef(handler);
  handlerRef.current = handler;
  let isDisabled = handler == null;
  useEffect(() => {
    if (isDisabled) {
      return;
    }

    let element = ref.current;

    let handler = e => handlerRef.current.call(this, e);

    element.addEventListener(event, handler, options);
    return () => {
      element.removeEventListener(event, handler, options);
    };
  }, [ref, event, options, isDisabled]);
}
// This hook works like `useState`, but when setting the value, you pass a generator function
// that can yield multiple values. Each yielded value updates the state and waits for the next
// layout effect, then continues the generator. This allows sequential updates to state to be
// written linearly.
function useValueEffect(defaultValue) {
  let [value, setValue] = (0,react.useState)(defaultValue);
  let valueRef = (0,react.useRef)(value);
  let effect = (0,react.useRef)(null);
  valueRef.current = value; // Store the function in a ref so we can always access the current version
  // which has the proper `value` in scope.

  let nextRef = (0,react.useRef)(null);

  nextRef.current = () => {
    // Run the generator to the next yield.
    let newValue = effect.current.next(); // If the generator is done, reset the effect.

    if (newValue.done) {
      effect.current = null;
      return;
    } // If the value is the same as the current value,
    // then continue to the next yield. Otherwise,
    // set the value in state and wait for the next layout effect.


    if (value === newValue.value) {
      nextRef.current();
    } else {
      setValue(newValue.value);
    }
  };

  module_useLayoutEffect(() => {
    // If there is an effect currently running, continue to the next yield.
    if (effect.current) {
      nextRef.current();
    }
  });
  let queue = (0,react.useCallback)(fn => {
    effect.current = fn(valueRef.current);
    nextRef.current();
  }, [effect, nextRef]);
  return [value, queue];
}
//# sourceMappingURL=module.js.map


/***/ }),

/***/ 87462:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ })

}]);
//# sourceMappingURL=354-5e10cf63df8830536b64.js.map