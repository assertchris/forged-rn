import React from 'react'
import { NativeRouter, Route } from 'react-router-native'
import { Dashboard, Splash } from './screens'

const App = () => (
    <NativeRouter>
        <Route exact path="/" component={Splash} />
        <Route exact path="/dashboard" component={Dashboard} />
    </NativeRouter>
)

export { App }
