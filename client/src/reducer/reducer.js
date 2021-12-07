import { AlertTitle } from '@chakra-ui/alert';
import { SAVE_FREECONTENT, SAVE_LETTER, SAVE_FONT, SAVE_COLOR} from './actions';

const initialState = {
    name: '',
    address: '',
    email: '',
    phone: '',
    letter_title:'',
    letter_content:'',
    free_content:'',
    userfont:'',
    usercolor:''

}

const reducer = (state=initialState, action)=>{
    switch(action.type){

        case SAVE_LETTER:{
            return{
                ...state,
                letter_title:action.title,
                letter_content:action.content

            }
        }
        case SAVE_FREECONTENT:{
            return{
                ...state,
                free_content:action.content
            }
        }
        
        case SAVE_FONT:{
            return{
                ...state,
                userfont:action.userFont
            }
        }
        case SAVE_COLOR:{
            return{
                ...state,
                usercolor:action.userColor
            }
        }
        
        default:
            return state;
    }
}

export default reducer;