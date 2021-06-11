import { createProps, createChildren } from './modules/index.js';

/**
 * 渲染虚拟DOM并挂载到页面中
 * @param {{}} vdom
 * @param {HTMLElement} container
 * @returns {Node}
 */
export function render(vdom, container = undefined) {
    const elem = (vdom.elem = document.createElement(vdom.tag));
    createProps(elem, vdom);
    createChildren(elem, vdom.children, render);
    if (container) {
        container.appendChild(elem);
    }
    return elem;
}