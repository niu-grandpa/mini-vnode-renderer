export function setDataSet(elm, data) {
    const d = data.dataset;
    let key;
    if (!d) return;
    for (key in d) {
        elm.setAttribute(`data-${key.replace(CAPS_REGEX, '-$&').toLowerCase()}`, d[key]);
    }
}