import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Root from './pages/Root'

import Router from './lib/Router';
import Route from './lib/Route';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    {/* <Route path="/" component={<Root/>}/> */}
  </Router>
)
