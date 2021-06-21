import { combineReducers } from 'redux';
import movieListReducer from '../components/MoviesList/reducers/movieListReducer';

export default combineReducers({
    movieList: movieListReducer,
});
