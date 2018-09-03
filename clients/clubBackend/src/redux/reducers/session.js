import { VIEWAS } from '../actions/session';

const session = {
    viewAs: {customerName: '', customerId: ''}
};

export default function globalDialogReducer(state = session, action) {
    switch (action.type) {
        case VIEWAS:
            return {...state, viewAs: {customerId: action.customerId, customerName: action.customerName}};
        default:
            return state;
    }
}

