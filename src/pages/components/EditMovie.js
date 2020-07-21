import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { useSnackbar } from 'notistack';
import { addNewStyles } from "../styles"


export default function EditMovie(props) {
    const classes = addNewStyles()
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = React.useState(props.movie.title);
    const [trailer, setTrailer] = React.useState("https://www.youtube.com/watch?v=" + props.movie.trailer)
    const [dlink, setDlink] = React.useState(props.movie.dlink);

    const changeTrailer = (event) => {
        setTrailer(event.target.value);
    };
    const changeDlink = (event) => {
        setDlink(event.target.value);
    };

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const UPDATE_MOVIE = gql`
    mutation UpdateMovie($id: String!, $title: String!, $trailer: String!, $dlink: String!) {
        updateMovie(id: $id, title: $title, trailer:$trailer, dlink:$dlink) {
        id
        title
        trailer
        dlink
        cover
        }
    }
`;

    return (
        <Mutation mutation={UPDATE_MOVIE}>
            {(updateMovie, { loading, error, data }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit {props.movie.title}
                        </Typography>

                        <form className={classes.form} validate="true" onSubmit={e => {
                            e.preventDefault();
                            if (!trailer.includes("https://www.youtube.com/watch?v=")) {
                                return enqueueSnackbar('LINK MUST HAVE "https://www.youtube.com/watch?v="', { variant: "error" });
                            }
                            updateMovie({ variables: { id: props.movie.id, title: title, trailer: trailer, dlink: dlink } });
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
                                id="trailer"
                                label="Trailer"
                                name="trailer"
                                autoComplete="trailer"
                                value={trailer}
                                onChange={changeTrailer}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="text"
                                fullWidth
                                id="dlink"
                                label="Google Drive Link"
                                name="dlink"
                                autoComplete="dlink"
                                value={dlink}
                                onChange={changeDlink}
                                autoFocus
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
                    {error && <p>{error.message}</p>}
                    {data && props.closeModal()}
                </Container>)}</Mutation>
    );
}

// ********** Movie Deletion****************/////

export function DeleteMovie(props) {
    const classes = addNewStyles()

    const DELETE_MOVIE = gql`
    mutation DeleteMovie($id: String!, $cover: String!) {
        deleteMovie(id: $id, cover:$cover)
    }
`;

    return (
        <Mutation mutation={DELETE_MOVIE}
        >
            {(deleteMovie, { loading, error, data }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <DeleteIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Delete {props.movie.title}
                        </Typography>

                        <form className={classes.form} onSubmit={e => {
                            e.preventDefault();
                            deleteMovie({ variables: { id: props.movie.id, cover: props.movie.cover } });
                        }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                startIcon={<DeleteIcon />}
                            >
                                Yes, Delete
                        </Button>
                        </form>

                    </div>
                    {loading && <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="primary" />
                    </Backdrop>}
                    {error && error.message}
                    {data && props.closeModal()}
                </Container>)}</Mutation>
    );
}
