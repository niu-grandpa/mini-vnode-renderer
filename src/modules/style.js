export function updateStyle(oldVnode, vnode) {
    const elem = (vnode.elem = oldVnode.elem);
    let oldStyle = oldVnode.data.style,
        newStyle = vnode.data.style,
        name = '',
        value = '';

    if (!oldStyle && !newStyle) return;
    if (JSON.stringify(oldStyle) === JSON.stringify(newStyle)) return;

    oldStyle = oldStyle || {};
    newStyle = newStyle || {};

    for (name in newStyle) {
        value = newStyle[name];
        if (name[0] === '-' && name[1] === '-') {
            elm.style.setProperty(name, value);
        } else {
            elm.style[name] = value;
        }
    }
    for (name in oldStyle) {
        if (!newStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elem.style.removeProperty(name);
            } else {
                elem.style[name] = '';
            }
        }
    }
}