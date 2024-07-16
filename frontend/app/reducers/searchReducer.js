export const searchReducer = (currentSearch,action) =>{
    switch (action.type) {
        case 'newSearch':
            return action.payload;
        case 'restSearch':
            return currentSearch;
    }
}