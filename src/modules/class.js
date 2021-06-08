/**
 * 更新元素样式类名
 *
 * 通过比较新旧节点类名的差异计算出需要更新的地方
 */
export function updateClass(oldVnode, vnode) {
    const elem = oldVnode.elem;
    const oldClass = oldVnode.data.class;
    const clazz = vnode.data.class;

    if (!oldClass && !clazz) return;
    if (oldClass === clazz) return;
    if (clazz !== oldClass) {
        elem.className = clazz;
    } else if (oldClass && !clazz) {
        elem.removeAttribute('class');
    }
}