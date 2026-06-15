class ProductServices {
    baseUrl: string

    constructor() {
        this.baseUrl = 'http://localhost:3000'
    }

    async request(url: string, method = "GET", body: unknown = null) {
        const headers = {
            "Content-Type": "application/json"
        }

        const options: RequestInit = { method, headers }

        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
        }

        return response.json()
    }

    async createProduct(userData: Record<string, unknown>) {
        return this.request(`${this.baseUrl}/products`, "POST", userData)
    }
}

const productServices = new ProductServices()
export default productServices