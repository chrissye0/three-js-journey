import { useState, useMemo } from 'react';
import Clicker from './Clicker.jsx';
import People from './People.jsx';

export default function App({ clickersCount, children }) {
    // children returns the content inside the called App component (in index.jsx)
    const [hasClicker, setHasClicker] = useState(true); // clicker is visible by default
    // global count state
    const [count, setCount] = useState(0);

    const toggleClicker = () => {
        setHasClicker(!hasClicker);
    }

    const increment = () => {
        setCount(count + 1);
    }

    // create an array and keep it as is even if App is being re-rendered (unless clickersCount changes)
    // needs a function for first parameter and then dependencies array for the second parameter (like useEffect)
    // update colors only if clickersCount changes - if clickersCount changes, useMemo will call the function again
    // useMemo is usually used to handle complex calculations and prevent that calculation from happening on each draw unless it's really necessary
    const colors = useMemo(() => {
        const colors = [];

        for(let i = 0; i < clickersCount; i++) {
            colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
        }

        return colors;
    }, [clickersCount]);

    return <>
        { children }
        <div>Total Count: { count }</div>
        {/* Change contents based on value of hasClicker */}
        <button onClick={toggleClicker}>{hasClicker ? 'Hide' : 'Show'}</button>
        {/* { hasClicker ? <Clicker/> : null } */}
        {/* with &&, JS checks the value on the left first, and if it's true, it returns the next value */}
        { /* create clickers based on clickersCount length */}
        { hasClicker && <>
            { [...Array(clickersCount)].map((value, index) => 
                <Clicker
                    key={index}
                    increment={increment}
                    keyName={`count${index}`} // unique keyName for each clicker based on index
                    color={colors[index]}
                />
            )}
        </> }
        <People/> 
    </>
}