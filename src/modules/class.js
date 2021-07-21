export default function updateClass(oldVnode, vnode) {
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