export function addEventListenrs(elm, vnode, data) {
    let key, type, listener;
    for (key in data) {
        if (key.startsWith('on')) {
            // exp: 'onClick' --> 'click
            type = key.slice(2).toLowerCase();
            listener = data[key];
            elm.addEventListener(type, ev => listener.call(vnode, ev, vnode), false);
        }
    }
}

export function update(oldVnode, vnode) {
    const elm = (vnode.elm = oldVnode.elm);
    const newData = vnode.data;
    const oldData = oldVnode.data;
    let key, listener, oldListener;

    for (key in oldData) {
        if (!key.startsWith('on')) return;
        type = key.slice(2).toLowerCase();
        // 旧节点的事件监听不存在新节点中，则移除
        if (!key in newData) {
            oldListener = oldData[key];
            elm.removeEventListener(type, oldListener);
        }
    }

    for (key in newData) {
        if (!key.startsWith('on')) return;
        type = key.slice(2).toLowerCase();
        listener = newData[key];
        oldListener = oldData[key];
        // 旧节点的事件监听和新节点的事件监听不相同，则再新增新的事件到节点中，
        // 而不是移除旧事件添加新事件，除非旧节点的事件监听key值移除
        if (oldListener !== listener) {
            elm.addEventListener(type, ev => listener.call(vnode, ev, vnode), false);
        }
    }
}