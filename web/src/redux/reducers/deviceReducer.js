const initialState = {
    devices: [],
    currentDevice: null,
    loading: false,
    error: null,
};

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        // **FETCH DEVICES**
        case 'FETCH_DEVICES_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_DEVICES_SUCCESS':
            return { ...state, loading: false, devices: Array.isArray(action.payload) ? action.payload : [] };
        case 'UPDATE_REAL_TIME_DEVICE':
            return { ...state, devices: action.payload };
        case 'FETCH_DEVICES_FAILURE':
            return { ...state, loading: false, error: action.payload };

        // **FETCH DEVICE BY ID**
        case 'FETCH_DEVICE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_DEVICE_SUCCESS':
            return { ...state, loading: false, currentDevice: action.payload };
        case 'FETCH_DEVICE_FAILURE':
            return { ...state, loading: false, error: action.payload };

        // **ADD DEVICE**
        case 'ADD_DEVICE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_DEVICE_SUCCESS':
            return { 
                ...state, 
                loading: false, 
                devices: [...state.devices, action.payload] 
            };
        case 'ADD_DEVICE_FAILURE':
            return { ...state, loading: false, error: action.payload };

        // **UPDATE DEVICE**
        case 'UPDATE_DEVICE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'UPDATE_DEVICE_SUCCESS':
            return {
                ...state,
                loading: false,
                devices: state.devices.map((device) =>
                    device._id === action.payload._id ? action.payload : device
                ),
            };

        case 'UPDATE_DEVICE_FAILURE':
            return { ...state, loading: false, error: action.payload };

        // **DELETE DEVICE**
        case 'DELETE_DEVICE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'DELETE_DEVICE_SUCCESS':
            return {
                ...state,
                loading: false,
                devices: state.devices.filter((device) => device._id !== action.payload),
            };
        case 'DELETE_DEVICE_FAILURE':
            return { ...state, loading: false, error: action.payload };


        default:
            return state;
    }
};

export default deviceReducer;