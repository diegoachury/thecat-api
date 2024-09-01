import { Router } from "express";
import { CatController } from "../controllers/cat.controller";
import { CatService } from "../services/cat.service";

const router = Router();
const catService = new CatService();
const catController = new CatController(catService);

router.get("/breeds", catController.getCatBreeds.bind(catController));
router.get(
  "/breeds/:breedId",
  catController.getCatBreedById.bind(catController)
);
router.get("/breeds/search", catController.searchCatBreeds.bind(catController));
router.get(
  "/breeds/:breedId/images",
  catController.getImagesByBreedId.bind(catController)
);

export default router;
