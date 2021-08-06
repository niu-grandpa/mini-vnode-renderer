import * as is from './is.js';
import { htmlDomApi as api } from './htmldomapi.js';
import toVnode from './tovnode.js';
import update from './modules/index.js';

let isMounted = false;

/**
 * 渲染`vnode`并挂载到页面中
 * @param {object | Element} oldVnode
 * @param {object | undefined} vnode
 * @returns {{mount: (sel: string) => void}}
 */
export default function render(oldVnode, vnode) {
    let elm, parent;
    // 判断vnode是否已经挂载到页面中
    // 如果已经执行过mount方法挂载，那么后续在使用render则是用来进行vnode间的更新
    if (isMounted) {
        if (isUndef(vnode)) return;

        if (!isVnode(oldVnode) && api.isElement(oldVnode)) {
            oldVnode = toVnode(oldVnode);
        }

        // 如果新旧节点相同则只需要打补丁，否则移除旧节点挂载新节点
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode);
        } else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);

            createElm(vnode);

            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnode(parent, [oldVnode], 0, 0);
            }
        }
    }

    return {
        mount(sel) {
            if (!isMounted) {
                isMounted = true;
                const container = document.querySelector(sel);
                api.appendChild(container, createElm(oldVnode));
            }
        },
    };
}

function isVnode(vnode) {
    return vnode.tag === undefined;
}

function sameVnode(vnode1, vnode2) {
    const isSameTag = (vnode1.tag = vnode2.tag);
    const isSamekey = vnode1.key === vnode2.key;
    const isSameis = vnode1.is === vnode2.is;

    return isSameTag && isSamekey && isSameis;
}

function createElm(vnode) {
    const { tag, data, children, text, elm } = vnode;
    if (tag === '!') {
        elm = api.createComment(text || '');
    } else if (isDef(tag)) {
        elm = api.createElement(tag, { is: data.is });
        // 处理孩子部分
        if (is.array(children)) {
            for (let i = 0; i < children.length; ++i) {
                const ch = children[i];
                if (ch != null) createElm(ch);
            }
        } else if (is.primitive(children)) {
            api.appendChild(elm, api.createTextNode(children));
        }
    } else {
        // 创建文本节点：h(undefined, {}, [], 'text')
        elm = api.createTextNode(text);
    }
    return (vnode.elm = elm);
}

function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        if (ch != null) {
            api.insertBefore(parentElm, createElm(ch), before);
        }
    }
}

function removeVnode(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        if (ch != null) {
            api.removeChild(parentElm, ch.elm);
        }
    }
}

function patchVnode(oldVnode, vnode) {
    const elm = (vnode.elm = oldVnode.elm);
    const oldCh = oldVnode.children;
    const ch = vnode.children;

    // 相同节点则退出比较
    if (oldVnode === vnode) return;

    // 更新data
    if (isDef(vnode.data)) {
        update(oldVnode, vnode);
    }

    if (isUndef(oldVnode.text)) {
        // 新旧节点都要孩子数组并且它们都不同则更新孩子节点
        if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) updateChildren(oldCh, ch);
        } else if (isDef(ch)) {
            // 新节点有孩子且旧节点没有，则看旧节点是否有设置了文本，如果有则清除
            // 插入新节点
            if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
            addVnodes(elm, null, ch, 0, ch.length - 1);
        } else if (isDef(oldCh)) {
            // 旧节点有孩子数组且新节点没有，则移除所有孩子节点
            removeVnode(elm, oldVnode, 0, oldVnode.length - 1);
        } else if (isDef(oldVnode.text)) {
            api.setTextContent(elm, '');
        }
    } else if (oldVnode.text !== vnode.text) {
        // 如果新旧文本不相同则重新设置，如果旧节点有孩子数组则移除孩子节点
        if (isDef(oldCh)) {
            removeVnode(elm, oldCh, 0, oldCh.length - 1);
        }
        api.setTextContent(elm, vnode.text);
    }
}

function updateChildren(parentElm, oldCh, newCh) {
    //
}

/**
 * 创建索引表
 * @param {object[]} children
 * @param {number} beginIdx
 * @param {number} endIdx
 * @returns  {{[string]: number}}
 */
function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    for (let i = beginIdx; i < endIdx; ++i) {
        const key = children[i].key;
        if (key !== undefined) {
            map[key] = i;
        }
    }
    return map;
}

function isDef(s) {
    return s !== undefined;
}

function isUndef(s) {
    return s === undefined;
}