function eventClickEl(el) {
    var event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    el.dispatchEvent(event);
}