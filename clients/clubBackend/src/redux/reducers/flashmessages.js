import { DISMISS_FLASH_MESSAGE, ADD_FLASH_MESSAGES, DISMISS_All_FLASH_MESSAGE } from '../actions/flashmessages';

const messages = [];

export default function flashmessageReducer(state = messages, action) {
    switch (action.type) {
        case DISMISS_FLASH_MESSAGE:
            return state.filter((m, i) => action.index !== i);
        case DISMISS_All_FLASH_MESSAGE:
            return messages;
        case ADD_FLASH_MESSAGES:
            return state.concat(action.messages);
        default:
            return state;
    }
}
