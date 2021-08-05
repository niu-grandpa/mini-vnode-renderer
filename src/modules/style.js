export function setStyle(elm, data) {
    const s = data.style;
    let key;
    if (!s) return;
    for (key in s) elm.style[key] = s[key];
}

export function updateStyle(oldVnode, vnode) {
    const elm = oldVnode.elm;
    let oldStyle = oldVnode.data.style;
    let curStyle = vnode.data.style;
    let key, val;

    if (!oldStyle && !curStyle) return;
    if (oldStyle === curStyle) return;

    oldStyle = oldStyle || {};
    curStyle = curStyle || {};

    for (key in curStyle) {
        val = curStyle[key];
        if (!key in oldStyle) {
            elm.style[key] = val;
        }
    }
}