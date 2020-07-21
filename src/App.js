import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'

import Signin from "./auth/signin"
import { ProtectedRoute } from './auth/userFunctions'
import Dashboard from "./dashboard"

function App() {
  const Theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={Theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Signin} />
            <ProtectedRoute path='/home' component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
