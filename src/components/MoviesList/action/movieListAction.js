import {MOVIES_LIST} from './actionTypes';

 const movieLlistAction = (payload)=>{
    return{
        type:MOVIES_LIST,
        payload
    }
}

export default movieLlistAction;
