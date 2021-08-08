import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ProfilePage} from './pages/ProfilePage'
import {CreatePage} from './pages/CreatePage'
import {TicketsPage} from './pages/TicketsPage'
import {AuthPage} from './pages/AuthPage'
import {RegisPage} from './pages/RegisPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path = "/tickets" exact>
                    <TicketsPage />
                </Route>
                <Route path = "/create" exact>
                    <CreatePage />
                </Route>
                <Route path = "/profile/:id" exact>
                    <ProfilePage />
                </Route>
                <Redirect to ="/create"/>
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path = "/" exact>
                <AuthPage />
            </Route>
            <Route path = "/registration" exact>
                <RegisPage/>
            </Route>
            <Redirect to ="/"/>        
        </Switch>
    )
}