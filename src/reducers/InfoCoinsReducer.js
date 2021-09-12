const InfoCoinsReducer = (state = [], action) => {

    switch (action.type) {
        case "INFO_COINS": {

            return action.payload
        }

        default:
            return state
    }
};

export default InfoCoinsReducer;