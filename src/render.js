/**
 * 渲染`vnode`并挂载到页面中
 * @param {object | Element} oldVnode
 * @param {object | undefined} vnode
 * @returns {{mount: (sel) => void}}
 */
export default function render(oldVnode, vnode) {
    return {
        mount(sel) {
            const container = document.querySelector(sel);
        },
    };
}

function createElem(vnode) {
    //
}

function addVnodes(parent, vnode) {
    //
}