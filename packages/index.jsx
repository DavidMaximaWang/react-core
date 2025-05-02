import { createRoot } from 'react-dom/client';
let element = (
    <div>
        <div>hand write react18</div>
        <div style={{ color: 'blue' }}>author: David</div>
        <div>It is amazing</div>
    </div>
);
const root = createRoot(document.getElementById('root'));
root.render(element);
console.log('index.jsx', element);
