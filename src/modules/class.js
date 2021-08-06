const CAPS_REGEX = /[A-Z]/g;

export function setIdAndClass(elm, data) {
    const id = data.id;
    const cn = data.class;
    let name;
    if (id) {
        for (name in id) {
            if (id[name] === true || id[name] === name) {
                elm.setAttribute('id', name.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    if (cn) {
        for (name in cn) {
            if (cn[name] === true || cn[name] === name) {
                elm.setAttribute('class', name.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
}

export function updateIdAndClass(oldVnode, vnode) {
    let oldCls = oldVnode.data.class,
        newCls = vnode.data.class,
        elm = oldVnode.elm,
        cur,
        name;

    if (!oldCls && !newCls) return;
    if (oldCls === newCls) return;

    oldCls = oldCls || {};
    newCls = newCls || {};

    for (name in oldCls) {
        if (oldCls[name] && !Object.prototype.hasOwnProperty.call(newCls, name)) {
            elm.classList.remove(name);
        }
    }

    for (name in newCls) {
        cur = newCls[name];
        if (cur !== oldCls[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}