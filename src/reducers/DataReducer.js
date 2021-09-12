const DataReducer = (state = [], action) => {

    switch (action.type) {
        case "DATA": {

            return action.payload
        }

        default:
            return state
    }
};

export default DataReducer;