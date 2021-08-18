import * as is from './is.js';
import { htmlDomApi as api } from './htmldomapi.js';
import toVnode from './tovnode.js';
import { setModules, updateModules } from './modules/index.js';

/**
 * 渲染`vnode`并挂载到页面中
 * @param {object | Element} oldVnode
 * @param {object | undefined} vnode
 * @returns {{mount: (sel: string) => void}}
 */
export default function render(oldVnode, vnode) {
    let elm, parent;

    if (isDef(vnode)) {
        // 如果旧节点是真实DOM则转换为虚拟的
        if (!isVnode(oldVnode) && api.isElement(oldVnode)) oldVnode = toVnode(oldVnode);
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
            const container = document.querySelector(sel);
            const child = createElm(oldVnode);
            api.appendChild(container, child);
        },
    };
}

/**
 *
 * @param {object} vnode
 * @returns {Element}
 */
function createElm(vnode) {
    let { tag, data, children, text, elm } = vnode;
    if (tag === '!') {
        elm = api.createComment(text || '');
    } else if (isDef(tag)) {
        elm = api.createElement(tag, { is: data.is });
        // 处理孩子部分
        if (is.array(children)) {
            for (let i = 0; i < children.length; ++i) {
                const ch = children[i];
                if (ch != null) api.appendChild(elm, createElm(ch));
            }
        } else if (is.primitive(children)) {
            api.appendChild(elm, api.createTextNode(children));
        }
    } else {
        // 创建文本节点：h(undefined, {}, [], 'text')
        elm = api.createTextNode(text);
    }

    setModules(elm, data);

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
        updateModules(oldVnode, vnode);
    }

    if (isUndef(vnode.text)) {
        // 新旧节点都有孩子数组并且它们都不同则更新孩子节点
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
    let oldStartIdx = 0,
        newStartIdx = 0,
        oldEndIdx = oldCh.length - 1,
        newEndIdx = newCh.length - 1,
        oldStartVnode = oldCh[0],
        newStartVnode = newCh[0],
        oldEndVnode = oldCh[oldEndIdx],
        newEndVnode = newCh[newEndIdx],
        oldKeyToIdx,
        idxInOld,
        elmToMove,
        before;

    // 循环条件：当旧结束指针大于或等于旧开始指针，并且新的指针也是如此
    // 4个指针不断地向中间靠拢
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 1.判断节点位置是否发生了移动，如果是则把对应指针向前或向右移动
        if (oldStartVnode === null) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode === null) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode === null) {
            newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode === null) {
            newEndVnode = newCh[--newEndIdx];
        }
        // 2.以上四种情况不存在的话，则开始新旧节点首尾两两比较
        else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        // 3.可能存在节点首尾位置交换，进行旧开始和新结束以及旧结束和新开始的比较
        else if (sameVnode(oldStartVnode, newEndVnode)) {
            // 节点向右移动了
            patchVnode(oldStartVnode, newEndVnode);
            // 首部的节点插入到最后一个节点之后
            api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // 节点向左移动了
            patchVnode(oldEndVnode, newStartVnode);
            // 尾部的节点插入到第一个节点前面
            api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
            // 如果vnode有设置key，则利用key精准的找到新旧两个节点变化前后的索引
            // !可以跳过上面繁琐的对比，这也是为什么说设置key可以提高diff算法性能
        } else {
            // 获取旧vnode设置了key的节点的那个索引值
            // 如果没有则新建一张索引表，对应key值
            if (isUndef(oldKeyToIdx)) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            // 获取新vnode的key值是否有在索引表中
            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (isUndef(idxInOld)) {} else {}
        }
    }
}

/**
 * 创建索引表
 * @param {object[]} children
 * @param {number} beginIdx
 * @param {number} endIdx
 * @returns  {{[key: string]: number}}
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

function isVnode(vnode) {
    return vnode.tag === undefined;
}

function sameVnode(vnode1, vnode2) {
    const isSameTag = (vnode1.tag = vnode2.tag);
    const isSamekey = vnode1.key === vnode2.key;
    const isSameis = vnode1.is === vnode2.is;

    return isSameTag && isSamekey && isSameis;
}