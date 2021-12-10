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
} from './actions';

const initialState = {
  name: '',
  address: '',
  email: '',
  phone: '',
  letter_content: '',
  free_content: '',
  userfont: '',
  usercolor: 'beige',
  flowersList: [],
  poems: [],
  user_flower: '',
  title: '너에게 쓰는 편지',
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
    case SAVE_TITLE: {
      return {
        ...state,
        title: action.finalTitle,
      };
    }
    default:
      return state;
  }
};

export default reducer;
