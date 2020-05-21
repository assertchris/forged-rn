import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native'
import tailwind from 'tailwind-rn'
import { refreshApps } from '../state'

const Dashboard = () => {
    const [apps, setApps] = useState([])
    const [filterSize, setFilterSize] = useState({ width: undefined, height: undefined })
    const [outerListSize, setOuterListSize] = useState({ width: undefined, height: undefined })
    const [innerListSize, setInnerListSize] = useState({ width: undefined, height: undefined })
    const [currentApp, setCurrentApp] = useState(undefined)
    const previewRef = useRef()

    useEffect(() => {
        refreshApps().then(setApps)
    }, [])

    const { height: windowHeight } = Dimensions.get('window')

    return (
        <View className="flex flex-row w-full" style={{ minWidth: 1024 }}>
            <View className="flex flex-col w-1/6 bg-white">
                <View className="flex flex-shrink w-full p-4 border-b border-gray-300">
                    <View onLayout={e => setFilterSize(e.nativeEvent.layout)}>
                        <TextInput
                            placeholder="Filter"
                            className="text-lg p-2 bg-transparent border border-gray-300"
                            style={{ height: 36 }}
                        />
                    </View>
                </View>
                <View
                    className="flex flex-grow w-full"
                    style={{
                        height: filterSize.height ? windowHeight - filterSize.height : 50,
                    }}
                >
                    <ScrollView className="flex w-full h-full" onLayout={e => setOuterListSize(e.nativeEvent.layout)}>
                        <View className="w-full" onLayout={e => setInnerListSize(e.nativeEvent.layout)}>
                            {apps.map(app => {
                                let extraViewStyles = {}
                                let extraTextStyles = {}

                                if (currentApp && currentApp.id == app.id) {
                                    extraViewStyles = {
                                        ...tailwind('bg-blue-100 border-blue-500 border-r-2'),
                                        width:
                                            innerListSize.height > outerListSize.height
                                                ? innerListSize.width - 15
                                                : innerListSize.width,
                                    }
                                    extraTextStyles = tailwind('text-blue-600')
                                }

                                return (
                                    <TouchableWithoutFeedback onPress={() => setCurrentApp(app)} key={app.id}>
                                        <View className="p-3" style={{ ...extraViewStyles }}>
                                            <Text className="text-sm text-gray-700" style={{ ...extraTextStyles }}>
                                                {app.name}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View className="flex w-5/6 bg-gray-100 p-6">
                {currentApp ? (
                    <TouchableWithoutFeedback onPress={() => setCurrentApp(undefined)} ref={previewRef}>
                        <View>
                            <Text>{currentApp.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}
            </View>
        </View>
    )
}

export { Dashboard }
