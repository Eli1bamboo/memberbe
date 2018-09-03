export const SIGNIN = 'SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNOUT = 'SIGNOUT';
export const UPDATE = 'UPDATE';
export const EDIT_INFO = 'EDIT_INFO';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const RETRIEVE_PASSWORD = 'RETRIEVE_PASSWORD';
export const RETRIEVE_PASSWORD_STEP_TWO = 'RETRIEVE_PASSWORD_STEP_TWO';

export function SignIn(params) {
    return { type: SIGNIN, params };
}
export function SignUp(params) {
    return { type: SIGNUP, params };
}
export function SignOut() {
    return { type: SIGNOUT };
}
export function UpdateUser(user) {
    return { type: UPDATE, user };
}
export function EditInfo(params) {
    return { type: EDIT_INFO, params };
}
export function ChangePasswordUser(params) {
    return { type: CHANGE_PASSWORD, params };
}
export function RetrievePasswordUser(params) {
    return { type: RETRIEVE_PASSWORD, params };
}
export function RetrievePasswordUserStepTwo(params) {
    return { type: RETRIEVE_PASSWORD_STEP_TWO, params };
}
