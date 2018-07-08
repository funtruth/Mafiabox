// app/router.js
import { StackNavigator } from "react-navigation";

import Loading from '../modules/appState/LoadingScreen';
import HomeNavigator from '../modules/home/HomeNavigator';
import Lobby from '../modules/lobby/LobbyView';
import Pregame from "../modules/pregame/PregameScreen";
import Game from "../modules/game/GameScreen";

const Router = StackNavigator(
      {
        Loading: {
          screen: Loading
        },
        HomeNav: {
          screen: HomeNavigator
        },
        Lobby: {
          screen: Lobby
        },
        Pregame:{
          screen: Pregame
        },
        Game: {
          screen: Game
        }
      },
      {
        headerMode: "none",
        initialRouteName: "Loading",
        cardStyle: {backgroundColor:'transparent'}
      }
);

export default Router