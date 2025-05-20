import { getMonobankRates } from "../services/monobankService.js";

export const fetchRates = async (req, res, next) => {
    try {
        const data = await getMonobankRates();
        res.json(data);
    } catch (error) {
        next(error);
    }
};
