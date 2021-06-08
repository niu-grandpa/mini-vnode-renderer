/**
 * 对比新旧虚拟节点树并修改不同部分，并将其映射到真实节点
 * @param {object} oldVnode
 * @param {object} vnode
 */
export function patch(oldVnode, vnode) {
    updateProps(oldVnode, vnode);
}