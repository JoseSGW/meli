import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import { Catalogue } from './components/Catalogue';
import { DetailsProduct } from './components/DetailsProduct';
import { Nav } from './components/Nav';

//context

import { SearchState } from './context/DataSearch/SearchState';
import { DetailsState } from './context/DetailsProduct/DetailsState';


function App() {
  return (
    <Router>

      <SearchState>
        <DetailsState>

          <div className="App">

            <Nav />

            <Switch>
              <Route path="/items/:id" component={DetailsProduct} />
              <Route path="/items" component={Catalogue} />

            </Switch>

          </div>
        </DetailsState>

      </SearchState>

    </Router>

  );
}

export default App;
