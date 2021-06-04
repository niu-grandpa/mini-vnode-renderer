import { render } from '../src/index.js';
import { Header, Content, Footer } from './components/index.js';

const App = render({
    el: '#app',
    components: {
        Header,
        Content,
        Footer,
    },
    beforeCreate: () => {
        console.log('beforeCreate!');
    },
    beforeMount: () => {
        console.log('beforeMount!');
    },
    created: () => {
        console.log('created!');
    },
    mounted: () => {
        console.log('mounted!');
    },
});