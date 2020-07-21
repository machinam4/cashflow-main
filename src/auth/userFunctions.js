import { accountsPassword } from './accounts'
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export var Message = ''


export const login = async users => {
    try {
        const response = await accountsPassword.login({
            user: {
                email: users.email
            },
            password: users.password
        })
        localStorage.setItem('cashflowtoken', response.tokens.accessToken)
        return response
    } catch (err) {
        console.log(err)
        Message = err.message
    }
}

export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.cashflowtoken) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};