const InfoCoinsReducer = (state = [], action) => {

    switch (action.type) {
        case "INFO_COINS": {
            state = action.payload;
            return state
        }

        default:
            return state
    }
};

export default InfoCoinsReducer;