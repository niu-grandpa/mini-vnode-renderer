export function setAttributes(elm, data) {
    const attrs = data.attrs;
    const o = ['class', 'id', 'style', 'dataset'];
    let key;
    if (!attrs) return;
    for (key in attrs) {
        if (!o.includes(key)) {
            if (is.object(key)) {
                setAttributes(elm, key);
            } else {
                elm.setAttribute(key, attrs[key] || '');
            }
        }
    }
}