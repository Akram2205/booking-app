
export function usersReducer(currentState,action){
    const {type,payload} = action;
    
    switch (type) {
        case "edit":
            let usersEdited = currentState.map((el)=>{
                if(el.id == payload.userEdited.id){
                    return payload.userEdited
                }else{
                    return el
                }
            })
            return usersEdited
            break;
        
        case "delete":
            let usersDeleted = currentState.filter((el)=>{
                return el.id !== payload.userId
            })
            return usersDeleted
            break;    
            case "add":
                let i = currentState.length - 1
                let id = currentState[i].id + 1
                let user = {...payload.newUser, id: id}
                let usersAdded = [...currentState, user]
                return usersAdded
                break; 
            
        default:
            break;
    }
}