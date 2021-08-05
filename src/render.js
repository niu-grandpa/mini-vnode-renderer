import * as is from './is.js';
import { htmlDomApi as api } from './htmldomapi.js';

const CAPS_REGEX = /[A-Z]/g;
let isMounted = false;

/**
 * 渲染`vnode`并挂载到页面中
 * @param {object | Element} oldVnode
 * @param {object | undefined} vnode
 * @returns {{mount: (sel) => void}}
 */
export default function render(oldVnode, vnode) {
    // 判断vnode是否已经挂载到页面中
    // 如果已经执行过mount方法挂载，那么后续在使用render则是用来进行vnode间的更新
    if (isMounted) {
        // 判断两个节点是否相同，不是的话则移除旧节点添加新节点
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode);
        } else {
            //
        }
    }

    return {
        mount(sel) {
            if (isMounted) return;
            else {
                const container = document.querySelector(sel);
                api.appendChild(container, createElm(oldVnode));
                isMounted = true;
            }
        },
    };
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
    } else if (tag !== undefined) {
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

function setIdClass(elm, data) {
    const id = data.id;
    const cn = data.class;
    let name;
    if (id) {
        for (name in id) {
            if (id[name] === true || id[name] === name) {
                elm.setAttribute('id', name.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    if (cn) {
        for (name in cn) {
            if (cn[name] === true || cn[name] === name) {
                elm.setAttribute('class', name.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
}

function setStyle(elm, data) {
    const s = data.style;
    let key;
    if (!s) return;
    for (key in s) elm.style[key] = s[key];
}

function setDataSet(elm, data) {
    const d = data.dataset;
    let key;
    if (!d) return;
    for (key in d) {
        elm.setAttribute(`data-${key.replace(CAPS_REGEX, '-$&').toLowerCase()}`, d[key]);
    }
}

function setAttributes(elm, data) {
    const attrs = data.attrs;
    const o = ['class', 'id', 'style', 'dataset'];
    let key;
    if (!attrs) return;
    for (key in attrs) {
        if (!o.includes(key)) {
            if (is.object(key)) {
                setAttributes(elm, key);
            } else {
                elm.setAttribute(key, attrs[key] || '');
            }
        }
    }
}

function addEventListenrs(elm, vnode, data) {
    let key, type, listener;
    for (key in data) {
        if (key.startsWith('on')) {
            type = key.slice(2).toLowerCase();
            listener = data[key];
            elm.addEventListener(type, ev => listener.call(vnode, ev, vnode), false);
        }
    }
}

function updateChildren(parentElm, oldCh, newCh) {
    //
}

function patchVnode(oldVnode, vnode) {
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