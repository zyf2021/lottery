import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ProfilePage} from './pages/ProfilePage'
import {CreatePage} from './pages/CreatePage'
import {TicketsPage} from './pages/TicketsPage'
import {Activate} from './pages/Activate'
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
                <Route path = "/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path = "/activate/activ_token" exact>
                    <Activate />
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