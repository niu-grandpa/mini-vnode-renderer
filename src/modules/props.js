import { is, createAttributes, createListener } from './index.js';

/**
 * 创建节点属性
 * @param {HTMLElement} el
 * @param {object} vnode
 * @returns
 */
export function createProps(el, vnode) {
    const { data } = vnode;
    let key, value;
    if (!is.object(data)) {
        return;
    }
    for (key in data) {
        value = data[key];
        if (key !== 'key') {
            if (key.startsWith('on')) {
                createListener(vnode, el, key, value);
            } else {
                createAttributes(el, key, value);
            }
        }
    }
}