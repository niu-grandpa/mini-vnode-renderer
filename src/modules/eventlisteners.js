export function addEventListenrs(elm, vnode, data) {
    let key, type, listener;
    for (key in data) {
        if (key.startsWith('on')) {
            type = key.slice(2).toLowerCase();
            listener = data[key];
            elm.addEventListener(type, ev => listener.call(vnode, ev, vnode), false);
        }
    }
}