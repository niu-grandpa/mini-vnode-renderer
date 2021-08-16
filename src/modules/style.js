export function setStyle(elm, data) {
    const s = data.style;
    let key;
    if (!s) return;
    for (key in s) elm.style[key] = s[key];
}

export function update(oldVnode, vnode) {
    const elm = oldVnode.elm;
    let oldStyle = oldVnode.data.style;
    let curStyle = vnode.data.style;
    let key, old, cur;

    if (!oldStyle && !curStyle) return;
    if (oldStyle === curStyle) return;

    oldStyle = oldStyle || {};
    curStyle = curStyle || {};

    for (key in curStyle) {
        old = oldStyle[key];
        cur = curStyle[key];
        if (old !== cur) {
            elm.style[key] = cur;
        }
    }

    for (key in oldStyle) {
        old = oldStyle[key];
        cur = curStyle[key];
        if (old && !Object.prototype.hasOwnProperty.call(curStyle, key)) {
            elm.style[key] = '';
        }
    }
}