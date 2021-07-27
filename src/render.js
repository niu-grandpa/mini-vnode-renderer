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
    // 如果已经挂载过则再使用 render 只是进行两个 vnode 的比较和更新
    // 否则的话是执行首次挂载 vnode 到容器
    if (isMounted) {
        patchVnode(oldVnode, vnode);
    }
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

function addVnodes(parent, vnode) {
    const { tag, data, children, text } = vnode;
    const fragment = document.createDocumentFragment();

    let i = 0,
        len,
        elm;

    if (tag !== '!') {
        elm = createNode(vnode, 'elm');
    } else if (tag === '') {
        elm = createNode(vnode, 'text');
    } else {
        elm = createNode(vnode, 'comment');
    }

    if (data !== undefined) {
        addCIDAndClass(elm, data);
        addStyle(elm, data);
        addDataset(elm, data);
        addAttributes(elm, data);
        addEventListenrs(elm, vnode, data);
    }

    if (children !== undefined) {
        if (is.array(children)) {
            len = children.length;
            for (; i < len; ++i) {
                addVnodes(elm, children[i]);
            }
        }
    }

    if (text !== undefined) {
        if (is.primitive(text)) {
            api.appendChild(elm, createNode(vnode, 'text'));
        }
    }

    api.appendChild(fragment, (vnode.elm = elm));
    api.appendChild(parent, fragment);
}

/**
 * 创建真实节点
 * @param {object} vnode
 * @param {'elm' | 'text' | 'comment'} type 节点类型
 * @returns {Element|Comment|Text}
 */
function createNode(vnode, type) {
    let elm;
    switch (type) {
        case 'elm':
            elm = api.createElement(vnode.tag, { is: vnode.data.is });
            break;
        case 'text':
            elm = api.createTextNode(vnode.text);
            break;
        case 'comment':
            elm = api.createComment(vnode.text ? vnode.text : '');
            break;
    }
    return elm;
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