import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '345px', // 16:9
    cursor: "pointer",
    backgroundPosition: "top",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const MovieList = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(undefined);
  const [rank, setRank] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

  const handleExpandClick = (id) => {
    setExpanded(id);
  };

  React.useEffect(() => {
    if (props.movielist) {

      const sorted_data1 = props.movielist[1].items.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
      setMovies(sorted_data1)
    }
    // eslint-disable-next-line
  }, [])

  const sortbyRelease = () => {
    const sorted_data2 = movies.sort((a, b) => parseFloat(a.releaseDate) - parseFloat(b.releaseDate));
    return setMovies([...sorted_data2])
  }
  const sortbyRank = () => {
    const sorted_data3 = movies.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
    return setMovies([...sorted_data3])
  }
  const changeRank = (oldRank) => {

    let _movies = [...movies];

    let oldMovie = _movies.filter(movie => movie.rank === parseInt(oldRank))[0];
    let newMovie = _movies.filter(movie => movie.rank === parseInt(rank))[0];
    _movies = _movies.filter(movie => movie.rank !== parseInt(oldRank) && movie.rank !== parseInt(rank));
    oldMovie.rank = parseInt(rank);
    newMovie.rank = parseInt(oldRank);

    _movies.push(newMovie);
    _movies.push(oldMovie);

    const sorted_data5 = _movies.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
    setMovies(sorted_data5)
  }

  return (
    <>
      <Grid container spacing={0} className="headerWrapper">
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <h1 className="page-title">{props.movielist[1].type}</h1>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Button variant="contained" color="primary" className="sortBtn" onClick={sortbyRank}>
            <SortIcon />{props.movielist[0].items[1].label}
          </Button>
          <Button variant="contained" color="primary" className="sortBtn" onClick={sortbyRelease}>
            <SortIcon />{props.movielist[0].items[0].label}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        {movies.map((item, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg xl key={i}>
              <Card className="cardWrapper" >
                <CardMedia
                  className={classes.media}
                  image={movies[i].imageUrl}
                  title="Movie Poster"
                  onClick={() => handleExpandClick(i)}
                />
                <CardHeader
                  title={movies[i].title}
                  subheader={movies[i].releaseDate}
                  className="customCardHeader"
                />
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 5, min: 10
                    }
                  }}
                  size="small"
                  id="outlined-basic" label="Order" variant="outlined" onChange={(e) => setRank(e.target.value)} />
                <Button variant="contained" className="orderBtn" color="primary" onClick={() => changeRank(item.rank)}>
                  Set Order
                </Button>
                <Collapse in={expanded === i} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movies[i].synopsis}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          )
        }
        )
        }
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    movielist: state.movieList.components,
  };
};

export default connect(mapStateToProps)(MovieList);