import React, { useState, useEffect} from 'react'

export default function LoginCheck() {
    const [login, setLogin] = useState(false);
    useEffect(() => {
        // Generate the random string when the component mounts
        const randomString = generateRandomString(30);
        setLogin(randomString);
        console.log(randomString);
        localStorage.setItem('logindash', randomString);
    }, []); // Empty dependency array ensures this runs once on component mount

    function generateRandomString(length) {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }

        return randomString;
    }
    return (
        {}
    )
}
