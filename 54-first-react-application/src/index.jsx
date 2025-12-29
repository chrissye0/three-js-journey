import './style.css'
import { createRoot } from 'react-dom/client'
import './style.css';
import App from './App.jsx';

const root = createRoot(document.querySelector('#root'));

const foo = true;

root.render(
    <>
        <App clickersCount={3}>
            <h1>Some content!</h1>
            <h2>Some more content!</h2>
        </App>
        <h1 style = {{
            color: 'coral',
            backgroundColor: 'floralwhite'
         }}>
            {/** {} doesn't support if and for loops */} 
            Hello {foo ? 'friend' : 'foe'}!
        </h1>
        <p className="cute-paragraph">Lorem <strong>ipsum</strong> dolor sit amet</p>
        <input type="checkbox" id="checkbox-id"/>
        <label htmlFor="checkbox-id">Checkbox</label>
    </>
)