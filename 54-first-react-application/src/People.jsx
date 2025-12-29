import { useState, useEffect } from 'react';

export default function People() {
    const [people, setPeople] = useState([]);

    const getPeople = async () => {
        // fetch data
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        // parse response
        const result = await response.json();
        // log result
        setPeople(result);
    };

    // only called on first render
    useEffect(() => {
        getPeople();
    }, []);

    return <>
        <h2>People</h2>
        <ul>
            {people.map((person) => {
                return <li key={person.id}>{person.name}</li>;
            })}
        </ul>
    </>
}