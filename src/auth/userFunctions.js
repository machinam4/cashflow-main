import { accountsPassword } from './accounts'

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




