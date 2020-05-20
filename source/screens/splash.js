import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useHistory } from 'react-router-native'

const Splash = () => {
    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/dashboard')
        }, 3000)
    })

    return (
        <View>
            <Text>splash</Text>
        </View>
    )
}

export { Splash }
