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

export function updateChildren(oldVnode, vnode, render) {
    const elem = (vnode.elem = oldVnode.elem);
    let i = 0,
        commonLen = 0,
        oldCh = oldVnode.children,
        newCh = vnode.children;

    if (!oldCh && !newCh) return;
    if (oldCh === newCh) return;
    // 新孩子为文本类型时，如果旧孩子为数组则直接清空节点替换
    if (is.primitive(newCh)) {
        if (is.array(oldCh)) {
            elem.innerHTML = '';
            elem.textContent = newCh;
        } else if (is.primitive(oldCh)) {
            // 如果都为文本则比较是否相同
            if (newCh !== oldCh) {
                elem.textContent = newCh;
            } else {
                elem.textContent = newCh;
            }
        }
    } else if (is.array(newCh)) {
        // 新孩子为数组时，旧孩子为文本类型，则清空元素内容，挂载新节点
        if (is.primitive(oldCh)) {
            elem.innerHTML = '';
            createChildren(elem, newCh, render);
        } else if (is.array(oldCh)) {
            // 新旧孩子都为数组时，则对相同长度的部分重新比较
            commonLen = Math.min(oldCh.length, newCh.length);
            for (i = 0; i <= commonLen; i++) updateChildren(oldCh[i], newCh[i], render);
            // 新孩子长度如果大于旧孩子长度，则挂载那截长出来的部分
            if (oldCh.length < newCh.length) {
                for (i = 0; i < newCh.slice(oldCh.length); i++) render(oldCh[i], elem);
            }
            // 旧孩子长度如果大于新孩子长度，则移除旧孩子长出来的部分
            if (oldCh.length > newCh.length) {
                for (i = 0; i < oldCh.slice(newCh.length); i++) elem.removeChild(newCh[i]);
            }
        }
    }
}