import './App.css';
import Links from './components/links/Links';
import Header from '../src/components/header/Header';
import AddLink from './components/addLink/AddLink';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <>
      <div className='container'>
        <Header />
        <div className='layout'>
          <Router>

              <Route exact path='/' scrict
                render= {
                  props => (
                    <Links />
                  )
                } 
              />
              
            <Switch>
              <Route exact path='/add-link' scrict
                render={
                  props => (
                    <AddLink />
                  )}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;