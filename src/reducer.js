const reducer = (state,action) => {
    if(action.type === 'ADD_EC2'){
    
        const newEC2_list = [...state.allEC2, action.payload ]//有[]，代表複製...state，再加上新的object
        return {...state,allEC2:newEC2_list} //先抓出全部的state內容後，再去更新allEC2

    } 

    if(action.type === 'SUBNET_UPDATE'){
        console.log(action)
        const update_subnet = action.payload
        return {...state,subnet:update_subnet} 

    } 

    if(action.type === 'DELETE_EC2'){
      
        return {...state,allEC2:action.payload} //先抓出全部的state內容後，再去更新allEC2，action.payload == newEC2s


    } 



        
        
}

export default reducer;