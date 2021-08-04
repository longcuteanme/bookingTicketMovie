import axios from 'axios'
import { DOMAIN, TOKEN} from '../utils/constants/settingSystem.js';

export default class baseService {
    get=(url)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
            headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN))},
        })
    }
    put=(url,model)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'PUT',
            data:model,
            headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN))},
        })
    }
    post=(url,model)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'POST',
            data:model,
            headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN))},
        })
    }
    del=(url,model)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'DELETE',
            data:model,
            headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN))},
        })
    }
}