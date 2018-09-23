import axios from '../../axios-orders';
import * as actionsType from './actionsType';


export const purchaseInit = () => {
	return {
		type: actionsType.PURCHASE_INIT
	}
}

export const fetchOrderStart = (id,orderData) => {
	return {
		type: actionsType.FETCH_ORDER_START
	}
}

export const fetchOrderSucces = (id,orderData) => {
	return {
		type: actionsType.FETCH_ORDER_SUCCES,
		orderId: id,
		orderData: orderData
	}
}

export const fetchOrderFailed = () => {
	return {
		type: actionsType.FETCH_ORDER_FAILED
	}
}

export const sendOrder = (orderData, token) => {
	
	return dispatch => {
		dispatch( fetchOrderStart() );
		axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => dispatch( fetchOrderSucces(response.data.name, orderData) ) )
            .catch( dispatch( fetchOrderFailed() ) );
	}

}

export const mainOrdersSuccess = ( orders ) => {
    return {
        type: actionsType.MAIN_ORDERS_SUCCESS,
        orders: orders
    };
};


export const mainOrdersFail = ( error ) => {
    return {
        type: actionsType.MAIN_ORDERS_FAIL,
        error: error
    };
};

export const mainOrdersStart = () => {
    return {
        type:actionsType.MAIN_ORDERS_START
    };
};

export const mainhOrders = (token, userId) => {
    return dispatch => {
        dispatch(mainOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(mainOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(mainOrdersFail(err));
            } );
    };
};
