export function setAttributes(elm, data) {
    const attrs = data.attrs;
    const o = ['class', 'id', 'style', 'dataset'];
    let key;
    if (!attrs) return;
    for (key in attrs) {
        if (!o.includes(key)) {
            if (is.object(key)) {
                setAttributes(elm, key);
            } else {
                elm.setAttribute(key, attrs[key] || '');
            }
        }
    }
}

export function update(oldVnode, vnode) {
    const elm = (vnode.elm = oldVnode.elm);
    let attrs = vnode.data.attrs;
    let oldAttrs = oldVnode.data.attrs;
    let key, old, cur;

    if (!attrs && !oldAttrs) return;
    if (attrs === oldAttrs) return;

    attrs = attrs || {};
    oldAttrs = oldAttrs || {};

    for (key in attrs) {
        old = oldAttrs[key];
        cur = attrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, cur);
            } else if (cur === false) {
                elm.removeAttribute(key);
            } else {
                elm.setAttribute(key, cur);
            }
        }
    }

    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}