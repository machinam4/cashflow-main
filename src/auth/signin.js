import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack'
import { Copyright } from "../pages/includes"
import { login, Message } from "./userFunctions"
import { useStyles } from "./styles"
import transitions from '@material-ui/core/styles/transitions';


class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            BlockUi: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ BlockUi: true })
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push('/home/moviez')
            } else {
                this.setState({ BlockUi: false })
                this.key = this.props.enqueueSnackbar(Message, { variant: 'error' })
            }
        })
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={this.props.classes.form} Validate onSubmit={this.onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="email"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.props.classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
                <Backdrop className={this.props.classes.backdrop} open={this.state.BlockUi}>
                    <CircularProgress color="primary" />
                </Backdrop>
            </Container>
        );
    }
}

export default withSnackbar(withStyles(useStyles)(SignIn))