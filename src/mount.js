/**
 * @param {Node} el
 * @param {object} props
 */
function addProps(el, props) {
    let key, value;
    if (props && typeof props === 'object') {
        for (key in props) {
            value = props[key];
            el.setAttribute(key, value);
        }
    }
}

/**
 * @param {Node} el
 * @param {string | Array<string | object>} children
 */
function addChildren(el, children) {
    let i = 0,
        len = 0;

    if (!children) return;
    if (typeof children === 'string') {
        el.textContent = children;
    } else if (typeof children === 'number' || typeof children === 'boolean') {
        // 需要将数字和布尔类型转换为字符串
        el.textContent = String(children);
    }
    if (Array.isArray(children)) {
        len = children.length;
        for (; i < len; i++) {
            mount(children[i], el);
        }
    }
}

/**
 * 将虚拟 dom 转换为真实 dom 并挂载到页面中
 * @param {object} vnode 虚拟节点
 * @param {Element} container 指定挂载的容器
 * @returns Node
 */
export function mount(vnode, container) {
    const { tag, props, children } = vnode;
    const el = (vnode.elem = document.createElement(tag));

    addProps(el, props);
    addChildren(el, children);
    container.appendChild(el);

    return el;
}