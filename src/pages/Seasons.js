import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TheatersIcon from '@material-ui/icons/Theaters';
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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import AddNewSeason from "./components/AddNewSeason"
import EditSeason, { DeleteSeason } from "./components/EditSeason"

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

const SEASONS = gql`
  {
    seasons{
    id
    title
    episodes
    trailer
    dlink
    cover 
    path   
  }
  }
`;
export default function Seasons() {
    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [EditCard, setEditCard] = React.useState("");
    const [openDelete, setOpenDelete] = React.useState(false);
    const [DeleteCard, setDeleteCard] = React.useState('');


    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
        window.location.reload(false);
    };

    // handle edit seasons???????
    const handleOpenEdit = (card) => {
        setEditCard(card)
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    }
    //  ***hnadle season deletion ****//
    const handleOpenDelete = (card) => {
        setDeleteCard(card)
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        window.location.reload(false);
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar>
                    <TheatersIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Seasonz
                    </Typography>
                    <Button
                        variant="contained"
                        color="warning"
                        className={classes.addButton}
                        onClick={handleOpenAdd}
                        startIcon={<AddIcon />}
                    >
                        Add Season
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
                        <AddNewSeason closeModal={handleCloseAdd} />
                    </div>
                </Fade>
            </Modal>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Query query={SEASONS}>
                        {({ loading, error, data }) => {
                            if (loading) return 'Loading...';
                            if (error) return `Error! ${error.message}`;
                            return (
                                <Grid container spacing={4}>
                                    {data.seasons.map(season => (
                                        <Grid item key={season.id} xs={12} sm={6} md={4}>
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={season.path + season.cover}
                                                    // image="https://source.unsplash.com/random"
                                                    title="Image title"
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography variant="h5" component="h2">
                                                        {season.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Episodes: {season.episodes}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" variant="outlined" color="primary" onClick={() => { handleOpenEdit(season) }}>
                                                        Edit
                                                    </Button>
                                                    <Button size="small" variant="outlined" color="secondary" onClick={() => { handleOpenDelete(season) }}>
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                    {/* Edit season Modal */}
                                    <Modal
                                        aria-labelledby="Edit-Season-title"
                                        aria-describedby="Edit-Season-description"
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
                                                <EditSeason season={EditCard} closeModal={handleCloseEdit} />
                                            </div>
                                        </Fade>
                                    </Modal>
                                    {/* Edit Season Modal End */}
                                    {/* Delete Season Modal */}
                                    <Modal
                                        aria-labelledby="Delete-Season-title"
                                        aria-describedby="Delete-Season-description"
                                        className={classes.modal}
                                        open={openDelete}
                                        onClose={handleCloseDelete}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={openDelete}>
                                            <div className={classes.paper}>
                                                <DeleteSeason season={DeleteCard} closeModal={handleCloseDelete} />
                                            </div>
                                        </Fade>
                                    </Modal>
                                    {/* Delete season Modal End */}
                                </Grid>
                            )
                        }}
                    </Query>
                </Container>
            </main>
        </React.Fragment>
    );
}