export const GLOBAL_DIALOG = 'GLOBAL_DIALOG';
export const OPEN_VIEW_SITE_AS_DIALOG = 'OPEN_VIEW_SITE_AS_DIALOG';

export function globalDialog(text) {
    return {
        type: GLOBAL_DIALOG,
        text: text
    };
}

export function openViewSiteAsDialog(open = true) {
    return {
        type: OPEN_VIEW_SITE_AS_DIALOG,
        viewSiteAsDialogOpened: open
    };
}