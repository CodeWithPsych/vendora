class BrandApi {
  async request(endpoint, { method = "GET", body } = {}) {
    const response = await fetch(`/api/brands${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  // Get all brands
  async getAllBrands() {
    const brands = await this.request("/get-all-brands");
    console.log("Fetched brands:", brands);
    return brands;
  }
}

export const brandApi = new BrandApi();
