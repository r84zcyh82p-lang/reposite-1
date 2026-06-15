export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Category {
    id: string;
    name: string;
    emoji: string;
    color: string;
}

export interface Transaction {
    productName: string;
    id: string;
    category: string;
    price: number;
    date: string;
}

// ========== MOCK DATA ==========

export const categories: Category[] = [
    {
        id: "food",
        name: "Еда",
        emoji: "🍕",
        color: "#FF6B6B",
    },
    {
        id: "transport",
        name: "Транспорт",
        emoji: "🚗",
        color: "#4ECDC4",
    },
    {
        id: "shopping",
        name: "Покупки",
        emoji: "🛍️",
        color: "#FFE66D",
    },
    {
        id: "other",
        name: "Другое",
        emoji: "📦",
        color: "#95E1D3",
    },
];

// export const MOCK_TRANSACTIONS: Transaction[] = [
//     {
//         id: "1",
//         categoryId: "food",
//         amount: 450,
//         description: "Ужин в ресторане",
//         date: "2026-06-15",
//         userId: "user1",
//     },
//     {
//         id: "2",
//         categoryId: "transport",
//         amount: 200,
//         description: "Бензин",
//         date: "2026-06-15",
//         userId: "user1",
//     },
//     {
//         id: "3",
//         categoryId: "shopping",
//         amount: 1200,
//         description: "Одежда",
//         date: "2026-06-14",
//         userId: "user1",
//     },
//     {
//         id: "4",
//         categoryId: "food",
//         amount: 350,
//         description: "Продукты",
//         date: "2026-06-14",
//         userId: "user1",
//     },
//     {
//         id: "5",
//         categoryId: "other",
//         amount: 100,
//         description: "Подписка",
//         date: "2026-06-13",
//         userId: "user1",
//     },
//     {
//         id: "6",
//         categoryId: "transport",
//         amount: 50,
//         description: "Такси",
//         date: "2026-06-13",
//         userId: "user1",
//     },
//     {
//         id: "7",
//         categoryId: "shopping",
//         amount: 800,
//         description: "Обувь",
//         date: "2026-06-12",
//         userId: "user1",
//     },
//     {
//         id: "8",
//         categoryId: "food",
//         amount: 280,
//         description: "Кофе и завтрак",
//         date: "2026-06-12",
//         userId: "user1",
//     },
// ];

export const userData: User = {
    id: "user1",
    name: "Qwerty Йцукен",
    email: "qwerty@example.com",
    password: "password123",
};


