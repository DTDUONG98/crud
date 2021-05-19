import * as customer from './customer-group.constant'

const initialState = {
    data: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case customer.GET_CUSTOMER_GROUP_PENDING: {
            return {
                ...state,
                data: [],
                loading: true
            }
        }
        case customer.GET_CUSTOMER_GROUP_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                loading: false
            }
        }
        case customer.GET_CUSTOMER_GROUP_ERROR: {
            return {
                ...state,
                data: [],
                loading : false
            }
        }
        default: 
        return state;
    }
}

export default reducer;