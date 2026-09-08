import { createContext, useContext, useEffect, useState } from "react";

import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "@/features/favorite/services/favoriteService";
import { useAuth } from "./AuthContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const { user } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    const fetchFavorites = async () => {
        try {
            setLoadingFavorites(true);

            const res = await getFavorites();

            setFavorites(res.data.favorites);
        } catch (error) {
            console.error("Failed fetching favorites:", error);
        } finally {
            setLoadingFavorites(false);
        }
    };

    const handleAddFavorite = async (productId) => {
        try {
            const res = await addFavorite(productId);

            setFavorites(res.data.favorites);
        } catch (error) {
            console.error("Failed adding favorite:", error);
        }
    };

    const handleRemoveFavorite = async (productId) => {
        try {
            const res = await removeFavorite(productId);

            setFavorites(res.data.favorites);
        } catch (error) {
            console.error("Failed removing favorite:", error);
        }
    };

    const isFavorite = (productId) => {
        return favorites.some((product) => product._id === productId);
    };

    const toggleFavorite = async (productId) => {
        if (isFavorite(productId)) {
            await handleRemoveFavorite(productId);
        } else {
            await handleAddFavorite(productId);
        }
    };

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            return;
        }
        fetchFavorites();
    }, [user?._id]);

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                loadingFavorites,
                fetchFavorites,
                isFavorite,
                toggleFavorite,
                handleAddFavorite,
                handleRemoveFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    return useContext(FavoriteContext);
};
