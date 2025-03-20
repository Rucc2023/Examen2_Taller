import express from "express"
import dot from "dotenv"
import { productosRoutes } from "./routes/index.ts"

dot.config({path: "/home/taller4O/productos/src/.env"})

const app = express()
const port = process.env.PORT
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Microservicio Productos Chambeando!')
  })

app.use("/Productos", productosRoutes)
  
// Iniciar servidor
app.listen(port, () => {
    console.log(`Microservicio de Productos corriendo en el puerto ${port}`);
});
