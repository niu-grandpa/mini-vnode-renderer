const CAPS_REGEX = /[A-Z]/g;

export function setIdAndClass(elm, data) {
    const id = data.id;
    const cn = data.class;
    let name;
    if (id) {
        for (name in id) {
            if (id[name] === true || id[name] === name) {
                elm.setAttribute('id', name.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    if (cn) {
        for (name in cn) {
            if (cn[name] === true || cn[name] === name) {
                elm.setAttribute('class', name.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
}

export function update(oldVnode, vnode) {
    const elm = (vnode.elm = oldVnode.elm);
    let klass = vnode.data.class;
    let oldClass = oldVnode.data.class;
    let id = vnode.data.id;
    let oldId = oldVnode.data.id;
    let name, cur, old;

    if ((!oldClass && !klass) || (!oldId && !id)) return;
    if (oldClass !== klass) {
        klass = klass || {};
        oldClass = oldClass || {};
        for (name in klass) {
            name = name.replace(CAPS_REGEX, '-$&').toLowerCase();
            cur = klass[name];
            old = oldClass[name];
            if (cur !== old) {
                elm.classList[cur ? 'add' : 'remove'](name);
            }
        }

        for (name in oldClass) {
            name = name.replace(CAPS_REGEX, '-$&').toLowerCase();
            if (oldClass[name] === true && !Object.prototype.hasOwnProperty.call(klass, name)) {
                elm.classList.remove(name);
            }
        }
    }
    if (oldId !== id) {
        id = id || {};
        oldId = oldId || {};
        for (name in id) {
            name = name.replace(CAPS_REGEX, '-$&').toLowerCase();
            cur = id[name];
            old = oldId[name];
            if (cur !== old) {
                if (cur === true) {
                    elm.id = elm.id + ` ${name}`;
                } else if (cur === false) {
                    elm.id = elm.id.split(name).join('');
                } else {
                    elm.id = elm.id + ` ${name}`;
                }
            }
        }

        for (name in oldId) {
            name = name.replace(CAPS_REGEX, '-$&').toLowerCase();
            if (oldId[name] === true && !Object.prototype.hasOwnProperty.call(id, name)) {
                elm.id = elm.id.split(name).join('');
            }
        }
    }
}