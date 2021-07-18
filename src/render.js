import * as is from './is.js';

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
    const fragment = document.createDocumentFragment();
    const tag = vnode.tag;
    const children = vnode.children;
    const text = vnode.text;

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

    if (children !== undefined) {
        if (is.array(children)) {
            len = children.length;
            for (; i < len; ++i) {
                addVnodes(elm, vnode[i]);
            }
        }
    }

    if (text !== undefined) {
        if (is.primitive(text)) {
            elm.appendChild(createNode(vnode, 'text'));
        }
    }

    fragment.appendChild(elm);
    parent.appendChild(fragment);
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
            elm = document.createElement(vnode.tag, { is: vnode.data.is });
            break;
        case 'text':
            elm = document.createTextNode(vnode.tag);
            break;
        case 'comment':
            vnode.tag = '';
            elm = document.createComment(vnode.text);
            break;
    }
    return (vnode.elm = elm);
}

function removeVnodes(vnode) {
    vnode.parentElement.removeChild(vnode.elm);
}

function patchVnode(oldVnode, vnode) {
    //
}