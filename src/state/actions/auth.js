import * as actionsType from './actionsType';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionsType.AUTH_START,

	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionsType.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	}
}

export const authFail = (error) => {
	return {
		type: actionsType.AUTH_FAIL,
		error: error
	}
}

export const authLogOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationTime');
	localStorage.removeItem('userId');
	return {
		type: actionsType.AUTH_LOG_OUT
	}
}


const checkAuthLogOut = (sessionTime) => {
	return dispatch => {
		setTimeout( () => {
			dispatch( authLogOut() );
		}, sessionTime * 1000)
	}

}

export const auth = (email, password, isSign) => {
	let signLink;

	if ( !isSign) {
		signLink = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDf4kxFltu_hqdNSJcA_BnQBk2xf_qo2bk'
	} else {
		signLink = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDf4kxFltu_hqdNSJcA_BnQBk2xf_qo2bk'
	}

	return dispatch => {
		dispatch( authStart() );

		const authData = {
            email: email,
            password: password,
            returnSecureToken: true
		}
		axios.post(signLink, authData)
			.then(response => {
				console.log(response);
				const expirationTime = new Date( new Date().getTime() + response.data.expiresIn * 1000 );
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationTime', expirationTime);
				localStorage.setItem('userId', response.data.localId);
				dispatch( authSuccess(response.data.idToken, response.data.localId) );
				dispatch ( checkAuthLogOut (response.data.expiresIn) );
			})
			.catch(err => {
				console.log(err.response);
				dispatch( authFail(err.response.data.error) )
			})
		;
	}
}

export const setAuthRedirectPath = path => {
	return {
		type: actionsType.SET_AUTH_REDIRECT_PATH,
		path: path
	}
} 

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogOut());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch( checkAuthLogOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};