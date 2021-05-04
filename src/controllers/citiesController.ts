import express from "express";
import cityModel from "../models/cityModel";

// search for areas
export const searchController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { query } = req.params;

  const mongoRes = await cityModel.find({ $text: { $search: query } });
  const arrToReturn = [...mongoRes];

  mongoRes.forEach((city: any, index) => {
    const toRet = `${city.city}, ${city.state}`;
    console.log(toRet);
    return (arrToReturn[index] = city);
  });

  res.status(200).json(arrToReturn);
};
