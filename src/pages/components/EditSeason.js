import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { useSnackbar } from 'notistack';
import { addNewStyles } from "../styles"


export default function EditSeason(props) {
    const classes = addNewStyles()
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = React.useState(props.season.title);
    const [episodes, setEpisodes] = React.useState(props.season.episodes);
    const [trailer, setTrailer] = React.useState("https://www.youtube.com/watch?v=" + props.season.trailer)
    const [dlink, setDlink] = React.useState(props.season.dlink);


    const UPDATE_SEASON = gql`
    mutation UpdateSeason( $id: String!, $title: String!, $episodes: String!, $trailer: String!, $dlink: String!) {
        updateSeason(id: $id, title: $title, episodes: $episodes, trailer:$trailer, dlink:$dlink) {
        id
        title
        episodes
        trailer
        dlink
        }
    }
`;
    const changeEpisodes = (event) => {
        setEpisodes(event.target.value);
    };
    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    const changeTrailer = (event) => {
        setTrailer(event.target.value);
    };
    const changeDlink = (event) => {
        setDlink(event.target.value);
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
                            if (!trailer.includes("https://www.youtube.com/watch?v=")) {
                                return enqueueSnackbar('LINK MUST HAVE "https://www.youtube.com/watch?v="', { variant: "error" });
                            }
                            updateSeason({ variables: { id: props.season.id, title: title, episodes: episodes, trailer: trailer, dlink: dlink } });
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
                    {error && <p>Error :( Please try again</p>}
                    {data && props.closeModal()}
                </Container>)}</Mutation>
    );
}
// ********** Season Deletion****************/////

export function DeleteSeason(props) {
    const classes = addNewStyles()

    const DELETE_SEASON = gql`
    mutation DeleteSeason($id: String!, $cover: String!) {
        deleteSeason(id: $id, cover:$cover)
    }
`;

    return (
        <Mutation mutation={DELETE_SEASON}>
            {(deleteSeason, { loading, error, data }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <DeleteIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Delete {props.season.title}
                        </Typography>

                        <form className={classes.form} onSubmit={e => {
                            e.preventDefault();
                            deleteSeason({ variables: { id: props.season.id, cover: props.season.cover } });
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
                    {error && <p>{error.message}</p>}
                    {data && props.closeModal()}
                </Container>)}</Mutation>
    );
}
