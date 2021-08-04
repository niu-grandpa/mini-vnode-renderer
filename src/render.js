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
    if (isMounted) patchVnode(oldVnode, vnode);

    return {
        mount(sel) {
            if (isMounted) return;
            else {
                isMounted = true;
                const container = document.querySelector(sel);
                addVnodes(container, oldVnode);
            }
        },
    };
}

function createElm(vnode) {
    const { tag, data, children, text } = vnode;
    if (tag === '!') {
        vnode.elm = api.createComment(text || '');
    } else {
        vnode.elm = api.createElement(tag, { is: data.is });
    }
    return vnode.elm;
}

function addVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        //
    }
}

function addCIDAndClass(elm, data) {
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

function addStyle(elm, data) {
    const s = data.style;
    let key;
    if (!s) return;
    for (key in s) elm.style[key] = s[key];
}

function addDataset(elm, data) {
    const d = data.dataset;
    let key;
    if (!d) return;
    for (key in d) {
        elm.setAttribute(`data-${key.replace(CAPS_REGEX, '-$&').toLowerCase()}`, d[key]);
    }
}

function addAttributes(elm, data) {
    const attrs = data.attrs;
    const o = ['class', 'id', 'style', 'dataset'];
    let key;
    if (!attrs) return;
    for (key in attrs) {
        if (!o.includes(key)) {
            if (is.object(key)) {
                addAttributes(elm, key);
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

function removeVnode(vnode) {
    api.removeChild(api.parentNode(vnode), vnode.elm);
}

function updateChildren(parentElm, oldCh, newCh) {
    //
}

function patchVnode(oldVnode, vnode) {
    //
}

function isSameVnode(vnode1, vnode2) {
    const isSameTag = (vnode1.tag = vnode2.tag);
    const isSamekey = vnode1.key === vnode2.key;
    const isSameis = vnode1.is === vnode2.is;

    return isSameTag && isSamekey && isSameis;
}