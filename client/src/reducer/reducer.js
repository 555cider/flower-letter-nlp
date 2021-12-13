import { AlertTitle } from '@chakra-ui/alert';

import {
  SAVE_FREECONTENT,
  SAVE_LETTER,
  SAVE_FONT,
  SAVE_COLOR,
  SAVE_FLOWER_DATA,
  SAVE_USER_FLOWER,
  SAVE_POEMS,
  SAVE_TITLE,
  SAVE_KEYWORDS,
} from './actions';

const initialState = {
  name: '',
  address: '',
  email: '',
  phone: '',
  letter_content: '',
  free_content: [],
  userfont: 'Sungsil',
  usercolor: 'beige',
  flowersList: [],
  poems: [],
  user_flower_id: '',
  user_flower_symbol: '',
  user_flower_url: 'tulip',
  title: '너에게 쓰는 편지',
  keywords: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LETTER: {
      return {
        ...state,
        letter_content: action.content,
      };
    }
    case SAVE_FREECONTENT: {
      return {
        ...state,
        free_content: state.free_content.concat(action.content),
      };
    }

    case SAVE_FONT: {
      return {
        ...state,
        userfont: action.userFont,
      };
    }
    case SAVE_COLOR: {
      return {
        ...state,
        usercolor: action.userColor,
      };
    }

    case SAVE_FLOWER_DATA: {
      return {
        ...state,
        flowersList: action.flowersList,
      };
    }
    case SAVE_POEMS: {
      return {
        ...state,
        poems: action.poems,
      };
    }
    case SAVE_USER_FLOWER: {
      return {
        ...state,
        user_flower_id: action.user_flower_id,
        user_flower_symbol: action.user_flower_symbol,
        user_flower_url: action.user_flower_url,
      };
    }
    case SAVE_TITLE: {
      return {
        ...state,
        title: action.finalTitle,
      };
    }
    case SAVE_KEYWORDS: {
      return {
        ...state,
        keywords: action.keywords,
      };
    }
    default:
      return state;
  }
};

export default reducer;
