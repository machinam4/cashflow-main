import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDropzone } from 'react-dropzone';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { addNewStyles } from '../styles';


export default function AddNewMovie(props) {
    const classes = addNewStyles()
    const [title, setTitle] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [cover, setCover] = React.useState([]);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    // grqphql operations begin***********
    const ADD_MOVIE = gql`
    mutation AddMovie($title: String!, $cover: Upload!) {
        addMovie(title: $title, cover: $cover) {
        id
        title
        cover
        }
    }
`;

    const thumbs = files.map(file => (
        <div className={classes.thumb} key={file.name}>
            <div className={classes.thumbInner}>
                <img
                    src={file.preview}
                    className={classes.img}
                />
            </div>
        </div>
    ));

    React.useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            setCover(acceptedFiles[0])
        }
    });

    return (
        <Mutation mutation={ADD_MOVIE}>
            {(addMovie, { loading, error, data }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add New
                        </Typography>
                        <form className={classes.form} validate="true" onSubmit={e => {
                            e.preventDefault();
                            addMovie({ variables: { title: title, cover: cover } });
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
                            <section className="container">
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop the files here ...</p>
                                    ) : (
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                        )}
                                </div>
                                <aside className={classes.thumbsContainer}>
                                    {thumbs}
                                </aside>
                            </section>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                startIcon={<SaveIcon />}
                            >
                                Add New
                        </Button>
                        </form>
                    </div>
                    {loading && <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                    {error && <p>Error :( Please try again</p>}
                    {data && props.closeModal()}
                </Container>
            )}</Mutation>
    );
}
