import { Request, Response } from "express";
import { CatService } from "../services/cat.service";

export class CatController {
  constructor(private catService: CatService) {}

  async getCatBreeds(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      console.log("limit, page: ", limit, page);
      const breeds = await this.catService.getCatBreeds(limit, page);
      console.log("breeds:", breeds);
      if (!breeds) {
        return res.status(404).json({ message: "No cat breeds found" });
      }
      res.status(200).json(breeds);
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ message: "Failed to fetch cat breeds" });
    }
  }
  async getCatBreedById(req: Request, res: Response) {
    try {
      const breedId = req.params.breedId;
      const breed = await this.catService.getCatBreedById(breedId);
      if (!breed) {
        res.status(404).json({ message: "Breed not found" });
      }
      const images = await this.catService.getImagesByBreedId(breedId);
      const result = {
        ...breed,
        images: images.map((image: { url: any }) => image.url),
      };
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch breed by ID" });
    }
  }
  async searchCatBreeds(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      const attachImage = req.query.attachImage === "true";
      const breeds = await this.catService.searchCatBreeds(query, attachImage);
      res.json(breeds);
    } catch (error) {
      res.status(500).json({ message: "Failed to search breeds" });
    }
  }
  async getImagesByBreedId(req: Request, res: Response) {
    try {
      const breedId = req.params.breedId;
      const limit = parseInt(req.query.limit as string) || 5;
      const images = await this.catService.getImagesByBreedId(breedId, limit);
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch images for breed" });
    }
  }
}
