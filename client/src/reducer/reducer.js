import { AlertTitle } from '@chakra-ui/alert';

import {
  SAVE_FREECONTENT,
  SAVE_LETTER,
  SAVE_FONT,
  SAVE_COLOR,
  SAVE_FLOWER_DATA,
  SAVE_USER_FLOWER,
  SAVE_POEMS,
} from './actions';

const initialState = {
  name: '',
  address: '',
  email: '',
  phone: '',
  letter_title: '',
  letter_content: '',
  free_content: '',
  userfont: '',

  usercolor: '',
  flowersList: [],
  poems: [],
  user_flower: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LETTER: {
      return {
        ...state,
        letter_title: action.title,
        letter_content: action.content,
      };
    }
    case SAVE_FREECONTENT: {
      return {
        ...state,
        free_content: action.content,
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
        user_flower: action.user_flower,
      };
    }
    default:
      return state;
  }
};

export default reducer;
