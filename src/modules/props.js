export function updateProps(oldVnode, vnode) {
    const elem = (vnode.elem = oldVnode.elem);
    let oldProps = oldVnode.props;
    let newProps = vnode.props;

    if (!oldProps && !newProps) return;
    if (oldProps === newProps) return;

    let key, oldValue, newValue;

    oldProps = oldProps || {};
    newProps = newProps || {};

    for (key in newProps) {
        oldValue = oldProps[key];
        newValue = newProps[key];
        if (newValue !== oldValue) {
            elem.setAttribute(key, newValue);
        }
    }

    for (key in oldProps) {
        if (!(key in newProps)) {
            elem.removeAttribute(key);
        }
    }

    oldVnode.props = vnode.props;
    return oldVnode.props;
}