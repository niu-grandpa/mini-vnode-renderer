import * as is from './modules/is.js';

/**
 * 渲染虚拟DOM并挂载到页面中
 * @param {object} vdom
 * @param {HTMLElement} container
 * @returns {Node}
 */
export function render(vdom, container) {
    return renderWithMount(vdom, container);
}

function renderWithMount(vdom, container) {
    const elem = (vdom.elem = document.createElement(vdom.tag));
    createProps(elem, vdom.data);
    createChildren(elem, vdom.children);
    container.appendChild(elem);
    return elem;
}

function createChildren(el, children) {
    let i = 0,
        len = 0,
        vnode;
    if (!children) return;
    if (is.primitive(children)) {
        vnode = String(children);
        el.textContent = vnode;
    } else if (is.array(children)) {
        len = children.length;
        for (; i < len; i++) {
            vnode = children[i];
            renderWithMount(vnode, el);
        }
    }
}

function createProps(el, data) {
    let key, value;
    if (!is.object(data)) {
        return;
    }
    for (key in data) {
        value = data[key];
        if (key !== 'key') {
            if (key.startsWith('on')) {
                createEventListener(el, key, value);
            } else {
                createAttributes(el, key, value);
            }
        }
    }
}

function createAttributes(el, key, value) {
    let name, _value;
    if (key === 'id' || key === 'class') {
        el.setAttribute(key, value);
    }
    if (key === 'style') {
        for (name in value) {
            _value = value[name];
            el.style[name] = _value;
        }
    }
    if (key === 'dataset') {
        for (name in value) {
            _value = value[name];
            el.dataset[name] = _value;
        }
    }
    if (key === 'attrs') {
        for (name in value) {
            _value = value[name];
            // example: { disabled: true } -> <div disabled></div>
            if (_value === true) {
                el.setAttribute(name, '');
            } else if (_value === false) {
                el.removeAttribute(name);
            } else {
                el.setAttribute(name, _value);
            }
        }
    }
}

function createEventListener(el, key, value) {
    // onClick -> click
    const type = key.slice(2).toLowerCase();
    el.addEventListener(type, value, false);
}