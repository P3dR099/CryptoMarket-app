const DataReducer = (state = [], action) => {

    switch (action.type) {
        case "DATA": {
            state = action.payload
            return state
        }

        default:
            return state
    }
};

export default DataReducer;