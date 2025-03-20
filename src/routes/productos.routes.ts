import { Router } from "express";
import { getAll, getaddProduct, updateProduct, deleteProduct} from "../controllers/productos.controller.ts";

const router = Router();

router.get("/all", getAll);
router.post("/add", getaddProduct); 
router.put("/update/:id", updateProduct); 
router.delete("/delete/:id", deleteProduct); 
export default router;
