import { h, render } from '../../src/index.js';

const Header = h('section', { class: { header: true } }, 'header');
const Content = h('section', { class: { content: true } }, 'content');
const Footer = h('section', { class: { footer: true } }, 'footer');
const Layout = h('main', { class: { layout: true } }, [Header, Content, Footer]);

render(Layout).mount('#app');