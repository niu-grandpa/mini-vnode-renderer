export function setProps(elm, data) {
    const { props } = data;
    let key, val;

    if (!props) return;
    for (key in props) {
        val = props[key];
        elm[key] = val;
    }
}

export function update(oldVnode, vnode) {
    const elm = (vnode.elm = oldVnode.elm);
    const oldProps = oldVnode.data.props;
    const props = vnode.data.props;
    let key, cur, old;

    if (!oldProps && !props) return;
    if (oldProps === props) return;

    for (key in oldProps) {
        old = oldProps[key];
        cur = props[key];
        if (old !== cur && key !== 'value' && elm[key] !== cur) {
            elm[key] = cur;
        }
    }
}