import express, { Router, json, urlencoded } from 'express';
const app = express();
const router = Router()
//llamamos a la biblioteca fileSystem para poder acceder a archivos JSON etc.
//llamamos a la biblioteca path de mandera de poder unir archivos
import { join ,dirname} from 'path';
import { fileURLToPath } from 'url';

//importamos la biblioteca uuid para poder crear el id con esta
// obtenemos una funcion de exhbs
import { create } from 'express-handlebars';
import cors from 'cors';
//importamos la ruta
import rutas from './routes/views.routes.js'
import apiMascotasCrud from './routes/endMascotas.routes.js'
import apiPropietarioCrud from './routes/endPropietario.routes.js'


// se establece el puerto a utilizar
const port = 3000;
//en caso de utilizar envio entre servidores
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors())
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//union de archivos estaticos y rutas dinamicas
app.use(express.static(join(__dirname, 'public')));
//vistas
app.use('/',rutas)
app.use('/',apiMascotasCrud)
app.use('/',apiPropietarioCrud)






app.set("views", join(__dirname, "views/"));
//configuracion de motor hbs
const hbs = create({
  //se define la pagina principal la cual contendra todo
  defaultLayout: "main",
  //definimos y unimos los layouts y partials
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  //definimos la extencion a utilizar
  extname: ".handlebars",
});
app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");


//routes se crea el prefijo de las rutas /
// app.use('/', router)

//escuchamos el puerto en el cual se mantendra encendido el servidor
app.listen(port, () => {
  console.log(`puerto ${port}`)
})