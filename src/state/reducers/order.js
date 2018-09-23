import * as actionsType from '../actions/actionsType';
import { updateObject } from '../utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
}

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseBurgerStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionsType.PURCHASE_INIT: return purchaseInit( state, action );
        case actionsType.FETCH_ORDER_START: return purchaseBurgerStart( state, action );
        case actionsType.FETCH_ORDER_SUCCES: return purchaseBurgerSuccess( state, action )
        case actionsType.FETCH_ORDER_FAILED: return purchaseBurgerFail( state, action );
        case actionsType.MAIN_ORDERS_START: return fetchOrdersStart( state, action );
        case actionsType.MAIN_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        case actionsType.MAIN_ORDERS_FAIL: return fetchOrdersFail( state, action );
        default: return state;
    }
};

export default reducer;
