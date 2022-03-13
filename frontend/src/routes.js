import { Switch, Route, Router } from "react-router-dom";
import { history } from "./history.js";
import Create from "./pages/Create";
import Home from './pages/Home'
import Update from "./pages/Update";

export default function App(){
    return(
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/novo" component={Create} />
                <Route exact path="/editar/:id" component={Update} />
            </Switch>  
        </Router>
    )
}