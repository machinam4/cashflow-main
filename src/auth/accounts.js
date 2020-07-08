import { AccountsClient } from '@accounts/client'
import { AccountsClientPassword } from '@accounts/client-password'
import GraphQLClient from '@accounts/graphql-client'
import { accountsLink } from '@accounts/apollo-link'
import { ApolloClient, HttpLink, InMemoryCache, from } from 'apollo-boost'
import { createUploadLink } from "apollo-upload-client"




// This auth link will inject the token in the headers on every request you make using apollo client
const authLink = accountsLink(() => accountsClient)

const httpLink = createUploadLink({
    // uri: "http://localhost:4000",
    uri: 'https://cashflow.evoton.co.ke/bckend/',
    headers: { authorization: localStorage.getItem('cashflowtoken') }
    //   fetchOptions: {
    //     mode: 'no-cors'
    //   }
})

const apolloClient = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache()
})

const accountsGraphQL = new GraphQLClient({ graphQLClient: apolloClient })
const accountsClient = new AccountsClient({}, accountsGraphQL)
const accountsPassword = new AccountsClientPassword(accountsClient)

export { accountsClient, accountsGraphQL, accountsPassword, apolloClient }