export function createAttributes(el, key, value) {
    let name, _value;
    if (key === 'id' || key === 'class') {
        el.setAttribute(key, value);
    }
    if (key === 'style' || key === 'dataset') {
        for (name in value) {
            _value = value[name];
            el[key][name] = _value;
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

const DEFAULTPROPS = ['id', 'class', 'style', 'dataset'];

export function updateAttributes(oldVnode, vnode) {
    const elem = (vnode.elem = oldVnode.elem);
    let key,
        value,
        oldAttrs = oldVnode.data.attrs,
        newAttrs = vnode.data.attrs;

    if (!oldAttrs && !newAttrs) return;
    if (oldAttrs === newAttrs) return;

    oldAttrs = oldAttrs || {};
    newAttrs = newAttrs || {};

    for (key in newAttrs) {
        if (key.includes(DEFAULTPROPS)) {
            console.error(
                '[Render warn] Do not try to set these attributes `id`, `class`, `style`, `dataset` by the attrs attribute'
            );
            return;
        }
        value = newAttrs[key];
        if (value !== oldAttrs[key]) {
            if (value === true) {
                elem.setAttribute(key, '');
            } else if (value === false) {
                elem.removeAttribute(key);
            } else {
                elem.setAttribute(key, value);
            }
        }
    }
    for (key in oldAttrs) {
        if (!(key in newAttrs)) {
            elem.removeAttribute(key);
        }
    }
}