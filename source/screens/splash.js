import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useHistory } from 'react-router-native'
import tailwind from 'tailwind-rn'

const Splash = () => {
    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/dashboard')
        }, 250)
    })

    return (
        <View className="p-8 bg-blue-200">
            <Text className="text-2xl">splash</Text>
        </View>
    )
}

export { Splash }
