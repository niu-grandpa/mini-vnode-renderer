/**
 * 将虚拟 dom 转换为真实 dom
 * @param {object} vnode 虚拟节点
 * @param {Element} container 指定挂载的容器
 * @returns Node
 */
export function mount(vnode, container) {
    const { tag, props, children } = vnode;
    const el = (vnode.elem = document.createElement(tag));

    let i = 0,
        len = 0;

    if (!props) return;
    if (typeof props !== 'object') return;

    for (const key in props) {
        const value = props[key];
        el.setAttribute(key, value);
    }

    if (!children) return;
    if (typeof children === 'string') {
        el.textContent = children;
    } else if (typeof children === 'number' || typeof children === 'boolean') {
        el.textContent = String(children);
    }
    if (Array.isArray(children)) {
        len = children.length;
        for (; i < len; i++) {
            mount(children[i], el);
        }
    }

    container.appendChild(el);
    return el;
}