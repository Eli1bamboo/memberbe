import {GLOBAL_DIALOG, OPEN_VIEW_SITE_AS_DIALOG} from '../actions/globalDialog';

const dialogs = {
    textDialog: null,
    viewSiteAsDialog: false
};

export default function globalDialogReducer(state = dialogs, action) {
    switch (action.type) {
        case GLOBAL_DIALOG:
            return {...state, textDialog: action.text} ;
        case OPEN_VIEW_SITE_AS_DIALOG:
            return {...state, viewSiteAsDialog: action.viewSiteAsDialogOpened};
        default:
            return state;
    }
}