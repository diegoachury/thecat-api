import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1";
const apiKey = process.env.API_KEY;

export class CatService {
  constructor(private httpClient = axios) {}

  async getCatBreeds(limit: number = 5, page: number = 0) {
    try {
      const response = await this.httpClient.get(`${API_URL}/breeds`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        params: {
          limit,
          page,
        },
      });
      console.log("response.data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cat breeds:", error);
      throw error;
    }
  }

  async getCatBreedById(breedId: string) {
    try {
      const response = await this.httpClient.get(
        `${API_URL}/breeds/${breedId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cat breed by ID:", error);
      throw error;
    }
  }

  async searchCatBreeds(query: string, attachImage: boolean = false) {
    try {
      const response = await this.httpClient.get(`${API_URL}/breeds/search`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        params: {
          q: query,
          attach_breed: attachImage ? 1 : 0,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching cat breeds:", error);
      throw error;
    }
  }

  async getImagesByBreedId(breedId: string, limit: number = 5) {
    try {
      const response = await this.httpClient.get(`${API_URL}/images/search`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        params: {
          breed_id: breedId,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching images for breed ID:", error);
      throw error;
    }
  }
}
