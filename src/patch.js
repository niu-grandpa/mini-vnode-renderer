/**
 * 对比新旧虚拟节点树并修改不同部分，并将其映射到真实节点
 * @param {object} oldVnode
 * @param {object} vnode
 */
export function patch(oldVnode, vnode) {}

function sameVnode(vnode1, vnode2) {
    const isSameKey = vnode1.key === vnode2.key;
    const isSameIS = vnode1.data.is === vnode2.data.is;
    const isSameTag = vnode1.tag === vnode2.tag;

    return isSameIS && isSameKey && isSameTag;
}