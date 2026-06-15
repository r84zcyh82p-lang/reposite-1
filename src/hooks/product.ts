import { useState } from "react"
import productServices from "../services/product.api"

interface ProductPayload {
    [key: string]: string
}

export const useProduct = () => {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const productUser = async (userData: ProductPayload) => {
        setSuccess(false)
        setLoading(true)
        setError(null)

        try {
            await productServices.createProduct(userData)
            setSuccess(true)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Ошибка сервера"
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return { productUser, success, error, loading }
}
