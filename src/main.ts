// Importing 'sass' and main MVC elements to work with them  :
import "../src/sass/main.scss";

import { MainController } from "./MVC/controllers/MainController";
import { MainModel } from "./MVC/models/MainModel";
import { MainView } from "./MVC/views/MainView";

// Creating one controller element to fill all logic into our project :
const controller = new MainController(new MainModel(), new MainView());
