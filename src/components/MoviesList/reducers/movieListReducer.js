import { MOVIES_LIST } from '../action/actionTypes';

const jsonData = require('../../../DATA/data.json');

const movieListReducer = (state = jsonData, action) => {
    switch (action.type) {
        case MOVIES_LIST:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}
export default movieListReducer;