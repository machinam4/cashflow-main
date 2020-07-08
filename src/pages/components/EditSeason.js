import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { addNewStyles } from "../styles"


export default function EditSeason(props) {
    const classes = addNewStyles()
    const [title, setTitle] = React.useState(props.season.title);
    const [episodes, setEpisodes] = React.useState(props.season.episodes);

    const UPDATE_SEASON = gql`
    mutation UpdateSeason( $id: String!, $title: String!, $episodes: String!) {
        updateSeason(id: $id, title: $title, episodes: $episodes) {
        id
        title
        episodes
        }
    }
`;
    const changeEpisodes = (event) => {
        setEpisodes(event.target.value);
    };
    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    return (
        <Mutation mutation={UPDATE_SEASON}>
            {(updateSeason, { loading, error, data }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit {props.season.title}
                        </Typography>

                        <form className={classes.form} validate="true" onSubmit={e => {
                            e.preventDefault();
                            updateSeason({ variables: { id: props.season.id, title: title, episodes: episodes } });
                        }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="text"
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                autoComplete="title"
                                value={title}
                                onChange={changeTitle}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="text"
                                fullWidth
                                id="episodes"
                                label="Episodes"
                                name="episodes"
                                autoComplete="episodes"
                                value={episodes}
                                onChange={changeEpisodes}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                startIcon={<SaveIcon />}
                            >
                                Save Changes
                        </Button>
                        </form>

                    </div>
                    {loading && <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="primary" />
                    </Backdrop>}
                    {error && <p>Error :( Please try again</p>}
                    {data && props.closeModal()}
                </Container>)}</Mutation>
    );
}
