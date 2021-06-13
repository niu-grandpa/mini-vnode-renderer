import { h } from '../../src/h.js';
import { Header, Content, Footer } from '../components/index.js';

export const Layout = h('!', { class: 'layout' }, [Header, Content, Footer]);