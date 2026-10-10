import { useState, useEffect } from "react";

function GetCurrentAddress() {
    const [address, setAddress] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        if (!navigator.geolocation){
            setError('geolocation is not supported by your browser')
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords

                try {
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                    const response = await fetch(url, {
                        headers: {
                        "Accept-Language": "en", // optional: get address in English
                        },
                    })

                    if (!response.ok) {
                        throw new Error('failed to fetch address')
                    }

                    const data = await response.json()
                    setAddress(data.address)
                } catch (err) {
                    console.error(err)
                    setError('unable to retrieve address')
                } finally {
                    setLoading(false)
                }
            },

            (err) => {
                let message = 'unable to retrive your location'

                if (err.code === 1)
                {
                    message = 'location permission denied'
                } else if (err.code === 2)
                {
                    message = 'location unavailable'
                } else if (err.code === 3)
                {
                    message = 'location request timed out'
                }

                setError(message)
                setLoading(false)
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    }, [])

    return {address, loading, error}
}

export default GetCurrentAddress