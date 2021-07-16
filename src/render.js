import is from './is.js';

let isMounted = false;

/**
 * 渲染`vnode`并挂载到页面中
 * @param {object | Element} oldVnode
 * @param {object | undefined} vnode
 * @returns {{mount: (sel) => void}}
 */
export default function render(oldVnode, vnode) {
    let elm;

    // 如果已经挂载过则再使用 render 只是进行两个 vnode 的比较和更新
    // 否则的话是执行首次挂载 vnode 到容器
    if (isMounted) {
        patchVnode(oldVnode, vnode);
    } else {
        elm = createElem(oldVnode);
    }

    return {
        mount(sel) {
            if (isMounted) return;
            else {
                isMounted = true;
                const container = document.querySelector(sel);
                addVnodes(container, elm);
            }
        },
    };
}

function addVnodes(parent, vnode) {
    const fragment = document.createDocumentFragment();
    const children = vnode.children;
    let i = 0,
        len,
        elm;

    if (children !== undefined) {
        if (is.array(children)) {
            len = children.length;
            for (; i < len; ++i) {
                addVnodes(elm, vnode[i]);
            }
        } else if (is.primitive(children)) {
            elm = createNode(vnode, 'text');
        }
    }

    fragment.appendChild((elm = createNode(vnode, 'elm')));
    parent.appendChild(fragment);
}

/**
 * 创建真实节点
 * @param {object} vnode
 * @param {'elm' | 'text' | 'comment'} type 节点类型
 */
function createNode(vnode, type) {
    switch (type) {
        case 'elm':
            document.createElement(vnode.tag, { is: vnode.data.is });
            break;
        case 'text':
            document.createTextNode(vnode.tag);
            break;
        case 'comment':
            document.createComment(vnode.tag);
            break;
    }
}

function patchVnode(oldVnode, vnode) {
    //
}