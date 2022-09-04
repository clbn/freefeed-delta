export function preventDefault(realFunction) {
  return (event) => {
    // Check if it's a "click" (not "submit", "keydown" etc).
    // Also, check if it's a "fancy" one (made with middle button, or with Shift pressed etc).
    // Then, if it's a "fancy click", don't prevent default action.
    // Prevent custom action ("realFunction") instead.
    if (event.type === 'click' && (event.button !== 0 || event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)) {
      return true;
    }

    event.preventDefault();
    return realFunction && realFunction(event);
  };
}
