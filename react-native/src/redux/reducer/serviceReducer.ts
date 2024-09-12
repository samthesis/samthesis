import * as constants from '../constants/constants';

const defautState = {
    data: null,
};
const INITIAL_STATE = defautState;

export default function serviceReducer(state = INITIAL_STATE, action: { type: any; payload: any; }) {
    switch (action.type) {
        case constants.ON_SERVICES:
            console.log('ON_SERVICES', action.payload);
            return { ...action.payload };
        // case constants.ON_DEMO:
        //     console.log('Demo USER', action.payload);
        //     return { ...action.payload };
        default:
            return state;
    }
}
