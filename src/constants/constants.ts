import PedroPascal from "../assets/img/pedro-pascal.jpg";
import BellaRamsey from "../assets/img/BellaRamsy.jpg";
import ep1 from "../assets/img/ep1.jpg";
import imgMovie from "../assets/img/movieImg.jpg";

export interface MenuItem {
    id: number;
    nav: string;
    path: string;
}

export interface Movie {
    id: number;
    title: string;
    genre: string;
    releaseDate: string;
    rating: number;
    description: string;
}

export interface CastMember {
    id: number;
    name: string;
    img: string;
    character: string;
}

export interface Episode {
    id: number;
    title: string;
    duration: string;
    description: string;
    img: string;
}

export interface SimilarMovie {
    id: number;
    title: string;
    releaseDate: string;
    rating: number;
    img: string;
    genre: string;
}

export const menuList: MenuItem[] = [
    { id: 0, nav: "Home", path: "/" },
    { id: 1, nav: "Discover", path: "/discover" },
    { id: 2, nav: "Movies", path: "/movies" },
    { id: 3, nav: "Favorites", path: "/favorites" },
    { id: 4, nav: "Profile", path: "/profile" },
];

export const mockMovies: Movie[] = [
    {
        id: 0,
        title: "Lost Galaxy",
        genre: "Sci-Fi",
        releaseDate: "2025-11-03",
        rating: 8.2,
        description: "A bold journey through space and time.",
    },
    {
        id: 1,
        title: "Midnight Horizon",
        genre: "Drama",
        releaseDate: "2024-08-18",
        rating: 7.6,
        description: "A moving story of love and second chances.",
    },
    {
        id: 2,
        title: "Neon Streets",
        genre: "Action",
        releaseDate: "2023-12-12",
        rating: 7.9,
        description: "Fast-paced thriller set in a neon-lit city.",
    },
];

export const topCast: CastMember[] = [
    { id: 0, name: "Pedro Pascal", img: PedroPascal, character: "Joel" },
    { id: 1, name: "Bella Ramsey", img: BellaRamsey, character: "Ellie" },
    { id: 2, name: "Pedro Pascal", img: PedroPascal, character: "Joel" },
    { id: 3, name: "Pedro Pascal", img: PedroPascal, character: "Joel" },
    { id: 4, name: "Pedro Pascal", img: PedroPascal, character: "Joel" },
    { id: 5, name: "Pedro Pascal", img: PedroPascal, character: "Joel" },
    { id: 6, name: "Pedro Pascal", img: PedroPascal, character: "Joel" },
];

export const episodes: Episode[] = [
    {
        id: 0,
        title: "Chapter 1",
        duration: "1h 20m",
        description: "Joel and Ellie embark on their perilous journey through a post-apocalyptic world.",
        img: ep1,
    },
    {
        id: 1,
        title: "Chapter 2",
        duration: "1h 15m",
        description: "The duo faces new threats and challenges as they navigate through dangerous territories.",
        img: ep1,
    },
    {
        id: 2,
        title: "Chapter 3",
        duration: "1h 30m",
        description: "Joel and Ellie encounter a group of survivors with their own agenda.",
        img: ep1,
    },
    {
        id: 3,
        title: "Chapter 4",
        duration: "1h 25m",
        description: "A tense standoff forces them to choose between revenge and survival.",
        img: ep1,
    },
    {
        id: 4,
        title: "Chapter 5",
        duration: "1h 35m",
        description: "An uneasy alliance is formed as secrets from the past come to light.",
        img: ep1,
    },
    {
        id: 5,
        title: "Chapter 6",
        duration: "1h 40m",
        description: "The journey reaches a critical turning point with a dramatic escape.",
        img: ep1,
    },
];

export const similarMovies: SimilarMovie[] = [
    { id: 0, title: "TOP GUN:Maverick", releaseDate: "2020-06-19", rating: 4.5, img: imgMovie, genre: "| Action • Movie" },
    { id: 1, title: "TOP GUN:Maverick", releaseDate: "2020-06-19", rating: 4.5, img: imgMovie, genre: "| Action • Movie" },
    { id: 2, title: "TOP GUN:Maverick", releaseDate: "2020-06-19", rating: 4.5, img: imgMovie, genre: "| Action • Movie" },
    { id: 3, title: "TOP GUN:Maverick", releaseDate: "2020-06-19", rating: 4.5, img: imgMovie, genre: "| Action • Movie" },
    { id: 4, title: "TOP GUN:Maverick", releaseDate: "2020-06-19", rating: 4.5, img: imgMovie, genre: "| Action • Movie" },
];