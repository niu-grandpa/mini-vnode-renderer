import { h, render } from '../../src/index.js';

const Header = h('main', {}, [
    h(
        'header', {
            class: {
                header: true,
            },
        },
        'This is an Header Component'
    ),
    h(
        'aside', {
            class: {
                aside: true,
            },
        },
        'This is an Header Component'
    ),
    h(
        'section', {
            class: {
                section: true,
            },
        },
        'This is an Section Component'
    ),
    h(
        'footer', {
            class: {
                footer: true,
            },
        },
        'This is an Footer Component'
    ),
]);

render(Header).mount('#container');