import { render } from '../src/index.js';
import { Layout } from './layout/index.js';

const App = render({
    el: '#app',
    components: {
        Layout,
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