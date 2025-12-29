import { useState, useEffect, useRef } from 'react';

export default function Clicker({ increment, keyName, color = "black" }) {
    // props are the properties passed into the component
    // here we've destructured it to return increment, keyName, and color (default color of black)
    console.log(color)
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0)); // argument is default state, return 0 if count is null or undefined (first visit)
    // useState returns an array, the first value is count and the second is the setter function

    // useRef is used to access the actual DOM elements
    // to get access, it has to be executed after the first render (can be put inside useEffect)
    const buttonRef = useRef();
    console.log(buttonRef);

    // to control when useEffect is called, we can pass it an array of dependencies as the second argument
    // if it's empty, the function will only be called on the first render
    // if it's not empty, it will trigger when its contents change

    useEffect(() => {
        // change button color using useRef
        buttonRef.current.style.backgroundColor = 'yellow';
        buttonRef.current.style.color = 'red';

        return () => {
            localStorage.removeItem(keyName);
        };
    }, []); // called on first render (when the clicker is shown)

    // set count in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [ count ]);

    // what will happen after you click the button
    const buttonClick = () => {
        setCount(count + 1);
        increment(); // for global count
        console.log(count);
    }

    return <>
        <div style={{color: color}}>Click count: {count}</div>
        <button ref={buttonRef} onClick={buttonClick}>Click me!</button>
    </>
}