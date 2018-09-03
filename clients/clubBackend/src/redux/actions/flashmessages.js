export const DISMISS_FLASH_MESSAGE = 'DISMISS_FLASH_MESSAGE';
export const ADD_FLASH_MESSAGES = 'ADD_FLASH_MESSAGES';
export const DISMISS_All_FLASH_MESSAGE = 'DISMISS_All_FLASH_MESSAGE';

export function DismissFlashMessage(index) {
    return {
        type: DISMISS_FLASH_MESSAGE,
        index
    };
}
export function DismissAllFlashMessages() {
    return {
        type: DISMISS_All_FLASH_MESSAGE,
    };
}
export function AddFlashMessages(messages) {
    return {
        type: ADD_FLASH_MESSAGES,
        messages
    };
}

