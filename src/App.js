import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import TaskPage from "./components/taskPage/TaskPage";
import PageNotFound from "./components/welcomePage/PageNotFound";
import WelcomePage from "./components/welcomePage/WelcomePage";
import ModalContent from "./components/modalPage/ModalContent";
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/main" component={MainPage} />
        <Route path="/task" component={TaskPage} />
        <Route path="/modal" component={ModalContent} />
        <Route path="/welcome" component={WelcomePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
