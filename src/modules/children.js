import * as is from './is.js';

/**
 * 创建子节点
 * @param {HTMLElement} el
 * @param {string | []} children
 * @param {Function} render
 * @returns
 */
export function createChildren(el, children, render) {
    let i = 0,
        len = 0,
        vnode;

    if (!children) return;
    if (is.primitive(children)) {
        vnode = String(children);
        el.textContent = vnode;
    } else if (is.array(children)) {
        len = children.length;
        // 当 children 属性为数组时，假如里面有字符串值则创建文本节点，vnode则创建元素节点，递归执行
        // example: h('xxx', {}, ['sting', h('xxx', {}, []), ...])
        for (; i < len; i++) {
            vnode = children[i];
            if (is.primitive(vnode)) {
                el.appendChild(document.createTextNode(String(vnode)));
            } else {
                render(vnode, el);
            }
        }
    }
}