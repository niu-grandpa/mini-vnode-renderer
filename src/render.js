let isMount = false;

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
    if (isMount) {
        patchVnode(oldVnode, vnode);
    } else {
        elm = createElem(oldVnode);
    }

    return {
        mount(sel) {
            if (isMount) return;
            else {
                isMount = true;
                const container = document.querySelector(sel);
                addVnodes(container, elm);
            }
        },
    };
}

/**
 * @param {object} vnode
 * @returns {Element}
 */
function createElem(vnode) {
    //
}

function addVnodes(parent, vnode) {
    //
}

function patchVnode(oldVnode, vnode) {
    //
}