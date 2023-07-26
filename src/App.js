import {Switch, Route} from 'react-router-dom'
import ProductList from './components/ProductsList'
import ProductItem from './components/ProductItem'

const App = () => (
  <Switch>
    <Route exact path="/" component={ProductList} />
    <Route exact path="/products/:id" component={ProductItem} />
  </Switch>
)

export default App
