const CAPS_REGEX = /[A-Z]/g;

export function setDataSet(elm, data) {
    const d = data.dataset;
    let key;
    if (!d) return;
    for (key in d) {
        elm.setAttribute(`data-${key.replace(CAPS_REGEX, '-$&').toLowerCase()}`, d[key]);
    }
}

export function update(oldVnode, vnode) {
    const elm = (vnode.elm = oldVnode.elm);
    let oldDataset = oldVnode.data.dataset;
    let dataset = vnode.dataset;
    let key, old, cur;

    if (!oldDataset && !dataset) return;
    if (oldDataset === dataset) return;

    oldDataset = oldDataset || {};
    dataset = dataset || {};
    const d = elm.dataset;

    for (key in oldDataset) {
        old = oldDataset[key];
        cur = dataset[key];
        if (!cur) {
            if (d) {
                if (key in d) {
                    delete d[key];
                }
            } else {
                elm.removeAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }

    for (key in dataset) {
        old = oldDataset[key];
        cur = dataset[key];
        if (old !== cur) {
            if (d) {
                d[key] = cur;
            } else {
                elm.setAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase(), cur);
            }
        }
    }
}