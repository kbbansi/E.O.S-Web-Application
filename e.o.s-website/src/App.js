//import logo from './logo.svg';
import './App.css';
import { Route, Switch} from "react-router-dom";
//import Home from './components/homepage/Home';
import Dashboard from './components/dashboard/Dashboard';
import DashboardProduct from './components/dashboard/DashboardProduct';
import Home2 from './components/homepage2/Home2';
import CartPage from './components/cart/CartPage';
import CheckoutPage from './components/cart/CheckoutPage';
import ProductPage from './components/productpage/ProductPage';
import DashboardSales from './components/dashboard/DashboardSales';
import LoginPage from './components/cart/LoginPage';
import RegisterPage from './components/cart/RegisterPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home2} />
      <Route exact path="/dashboard" component={DashboardProduct} />
      {/* <Route exact path="/dashboard_product" component={DashboardProduct} /> */}
      <Route exact path="/dashboard_sales" component={DashboardSales} />
      <Route
        path="/products/:slug"
        render={({ match }) => {
            return <ProductPage productId={parseInt(match.params.slug)} />;
        }}
      />
      {/* <Route exact path="/product" component={ProductPage} /> */}
      <Route exact path="/cart" component={CartPage} />
      {/* <Route exact path="/checkout" component={CheckoutPage} /> */}
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
  );
}

export default App;