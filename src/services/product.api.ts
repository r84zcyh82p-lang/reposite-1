class ProductServices {
    baseUrl: string

    constructor() {
        this.baseUrl = 'http://localhost:3000'
    }

    async request(url: string, method = "GET", body: unknown = null) {
        const headers = {
            "Content-Type": "application/json",
        }

        const options: RequestInit = { method, headers }

        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
        }

        const text = await response.text()
        return text ? JSON.parse(text) : null
    }

    async getTransactions() {
        return this.request(`${this.baseUrl}/transactions`)
    }

    async getUser(userId: string | number = 0) {
        return this.request(`${this.baseUrl}/users/${userId}`)
    }

    async updateUser(userId: string | number, body: unknown) {
        return this.request(`${this.baseUrl}/users/${userId}`, "PATCH", body)
    }

    async deleteTransaction(transactionId: string) {
        return this.request(`${this.baseUrl}/transactions/${transactionId}`, "DELETE")
    }

    async createProduct(userData: Record<string, unknown>) {
        return this.request(`${this.baseUrl}/transactions`, "POST", userData)
    }
}

const productServices = new ProductServices()
export default productServices