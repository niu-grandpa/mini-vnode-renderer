import { createProps, createChildren } from './modules/index.js';

/**
 * 渲染虚拟DOM并挂载到页面中
 * @param {{tag: string; data: {}; children: string | (string | object | any)[]}} vdom
 * @param {HTMLElement} container
 * @returns {Node}
 */
export function render(vdom, container = undefined) {
    let elem = null;
    if (vdom.tag === '!') {
        vdom.tag = '';
        elem = document.createComment(vdom.tag);
    } else {
        elem = document.createElement(vdom.tag);
        createProps(elem, vdom);
        createChildren(elem, vdom.children, render);
    }
    if (container) {
        container.appendChild(elem);
    }
    vdom.elem = elem;
    return elem;
}