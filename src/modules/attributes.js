export function createAttributes(el, key, value) {
    let name, _value;
    if (key === 'id' || key === 'class') {
        el.setAttribute(key, value);
    }
    if (key === 'style') {
        for (name in value) {
            _value = value[name];
            el.style[name] = _value;
        }
    }
    if (key === 'dataset') {
        for (name in value) {
            _value = value[name];
            el.dataset[name] = _value;
        }
    }
    if (key === 'attrs') {
        for (name in value) {
            _value = value[name];
            // example: { disabled: true } -> <div disabled></div>
            if (_value === true) {
                el.setAttribute(name, '');
            } else if (_value === false) {
                el.removeAttribute(name);
            } else {
                el.setAttribute(name, _value);
            }
        }
    }
}