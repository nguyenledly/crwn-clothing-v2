import { takeLatest, all, call, put } from "redux-saga/effects";
import { createAuthUserFromEmailAndPassword, createUserToFireStore, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from "../../utils/firebase/firebase.util";
import { ForwardTo } from "../../utils/redirect/redirect";
import { signInFailed, signInStart, signInSuccess, signOutFailed, signOutSuccess } from "./user.actions";
import { USER_ACTION_TYPES } from "./user.types";

export function* getUserSnapShot(authUser, additionalData = {}, navigate = null) {
    try {
        const userSnapShot = yield call(createUserToFireStore, authUser, additionalData)
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
        if (navigate) {
            console.log(123);
            navigate('/shop');
        }
    } catch (error) {
        yield call(signInFailed(error))
    }
}

function* onSignInStart() {
    yield put(signInStart());
}

export function* isUserAuthenticated() {
    try {
        const authUser = yield call(getCurrentUser);
        if (!authUser) return;
        yield call(getUserSnapShot, authUser);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    yield call(onSignInStart);
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getUserSnapShot, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmailAndPassword(action) {
    yield call(onSignInStart);
    try {
        const { email, password, navigate } = action.payload;
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getUserSnapShot, user, {}, navigate);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signUp(action) {
    try {
        const { email, password, displayName } = action.payload;
        const { user } = yield call(createAuthUserFromEmailAndPassword, email, password);
        yield call(getUserSnapShot, user, { displayName });
    } catch (error) {
        yield put(signInFailed(error));
    }
}

// saga listener
// Sign in
export function* checkUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword);
}

// Sign out
export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

// Sign up
export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}
// main saga
export function* userSaga() {
    yield all([
        call(checkUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
    ]);
}