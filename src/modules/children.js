import * as is from './is.js';

/**
 * 创建子节点
 * @param {HTMLElement} el
 * @param {string | []} children
 * @param {Function} handler
 * @returns
 */
export function createChildren(el, children, handler) {
    let i = 0,
        len = 0,
        vnode;

    if (!children) return;
    if (is.primitive(children)) {
        vnode = String(children);
        el.textContent = vnode;
    } else if (is.array(children)) {
        len = children.length;
        for (; i < len; i++) {
            vnode = children[i];
            handler(vnode, el);
        }
    }
}