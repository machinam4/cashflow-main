import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MovieIcon from '@material-ui/icons/Movie';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import AddNewMovie from "./components/AddNewMovie"
import EditMovie from "./components/EditMovie"

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginLeft: theme.spacing(6)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const MOVIES = gql`
  {
    movies{
    id
    title
    cover 
    path   
  }
  }
`;
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Movies() {
    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [EditCard, setEditCard] = React.useState("");

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    // handle edit Movies???????
    const handleOpenEdit = (card) => {
        setEditCard(card)
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar>
                    <MovieIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Moviez
          </Typography>
                    <Button
                        variant="contained"
                        color="warning"
                        className={classes.addButton}
                        onClick={handleOpenAdd}
                        startIcon={<AddIcon />}
                    >
                        Add Movie
                         </Button>
                </Toolbar>
            </AppBar>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openAdd}
                onClose={handleCloseAdd}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openAdd}>
                    <div className={classes.paper}>
                        <AddNewMovie closeModal={handleCloseAdd} />
                    </div>
                </Fade>
            </Modal>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Query query={MOVIES}>
                        {({ loading, error, data }) => {
                            if (loading) return 'Loading...';
                            if (error) return `Error! ${error.message}`;
                            return (
                                <Grid container spacing={4}>
                                    {data.movies.map(movie => (
                                        <Grid item key={movie.id} xs={12} sm={6} md={4}>
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={movie.path + movie.cover}
                                                    // image="https://source.unsplash.com/random"
                                                    title="Image title"
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography variant="h5" component="h2">
                                                        {movie.title}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" variant="outlined" color="secondary" onClick={() => { handleOpenEdit(movie) }}>
                                                        Edit
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                    {/* Edit Movie Modal */}
                                    <Modal
                                        aria-labelledby="Edit-Movie-title"
                                        aria-describedby="Edit-Movie-description"
                                        className={classes.modal}
                                        open={openEdit}
                                        onClose={handleCloseEdit}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={openEdit}>
                                            <div className={classes.paper}>
                                                <EditMovie movie={EditCard} closeModal={handleCloseEdit} />
                                            </div>
                                        </Fade>
                                    </Modal>
                                    {/* Edit Movie Modal End */}
                                </Grid>
                            )
                        }}
                    </Query>
                </Container>
            </main>
        </React.Fragment>
    );
}