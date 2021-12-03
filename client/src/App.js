import { Route, Routes } from 'react-router-dom';
import {createStore} from 'redux';

import About from './pages/About';
import Question from './pages/Question';
import Create from './pages/Create';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import Start from './pages/Start';
import EditAnthology from './components/EditAnthology';
import Loading from './components/Loading';
import HowToUse from './pages/HowToUse';

import { Provider } from 'react-redux';
import reducer from './reducer/reducer';

const store = createStore(reducer)

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Routes>
          <Route exact={true} path='/' element={<Home />} />
          <Route exact={true} path='/about' element={<About />} />
          <Route exact={true} path='/create' element={<Create />} />
          <Route exact={true} path='/create/edit' element={<EditAnthology />} />
          <Route exact={true} path='/question' element={<Question />} />
          <Route exact={true} path='/orders' element={<Orders />} />
          <Route exact={true} path='/checkout' element={<Checkout />} />
          <Route exact={true} path='/start' element={<Start />} />
          <Route exact={true} path='/loading' element={<Loading/>} />
          <Route exact={true} path='/howtouse' element={<HowToUse />} />
        </Routes>
      </Provider>
    </div>
  );
}
export default App;
