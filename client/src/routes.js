import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ProfilePage} from './pages/ProfilePage'
import {CreatePage} from './pages/CreatePage'
import {PayTicketPage} from './pages/PayTicketPage'
import {TicketsPage} from './pages/TicketsPage'
import {Activate} from './pages/Activate'
import {AuthPage} from './pages/AuthPage'
import {RegisPage} from './pages/RegisPage'
import {UserInfoPage} from './pages/UserInfoPage'
import {AllUsersInfoPage} from './pages/AllUserInfoPage'


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
                <Route path = "/pay/:id" exact>
                    <PayTicketPage />
                </Route>
                <Route path = "/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path = "/info" exact>
                    <UserInfoPage />
                </Route>
                <Route path = "/all_info" exact>
                    <AllUsersInfoPage />
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
            <Route path = "/activate/:token" exact>
                    <Activate/>
            </Route>
            <Redirect to ="/"/>        
        </Switch>
    )
}