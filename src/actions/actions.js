export const getData = content => ({
    type: "DATA",
    payload: content
});

export const getAllInfoCoin = content => ({
    type: "INFO_COINS",
    payload: content
})

export const setUser = user => ({
    type: "SET_USER",
    payload: user
})
