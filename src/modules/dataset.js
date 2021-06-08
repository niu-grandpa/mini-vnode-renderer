/**
 * 更新元素 dataset 属性
 */
export function updateDataset(oldVnode, vnode) {
    const elem = oldVnode.elem;

    let newDataset = vnode.data.dataset,
        oldDataset = oldVnode.data.dataset;

    if (!oldDataset && !newDataset) return;
    // 直接比较新旧两个对象是否相同
    if (JSON.stringify(oldDataset) === JSON.stringify(newDataset)) return;

    let key, value, oldValue;

    oldDataset = oldDataset || {};
    newDataset = newDataset || {};

    for (key in newDataset) {
        value = newDataset[key];
        oldValue = oldDataset[key];
        if (value === oldValue) return;
        if (value !== oldValue) {
            elem.setAttribute(`data-${key}`, value);
        }
    }

    // 如果新对象的 key 不存在旧对象中则直接移除
    for (key in oldDataset) {
        if (!(key in newDataset)) {
            elem.removeAttribute(`data-${key}`);
        }
    }

    oldVnode.data.dataset = newDataset;
}