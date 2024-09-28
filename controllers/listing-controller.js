import { StatusCodes } from "http-status-codes";
import Listing from "../models/listing-model.js";
import { NotFoundError, UnauthorizedError } from "../errors/custom-error.js";

//Create Listing
export const createListing = async (req, res, next) => {
  const listing = await Listing.create(req.body);
  return res.status(StatusCodes.CREATED).json(listing);
};

//Delete Listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new NotFoundError("Listing not found!");
  }

  if (req.user.id !== listing.userRef) {
    throw new UnauthorizedError("You can only delete your own listings!");
  }

  await Listing.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "Listing has been deleted!" });
};

//Update Listing
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new NotFoundError("Listing not found!");
  }
  //Check Authenticate User
  if (req.user.id !== listing.userRef) {
    throw new UnauthorizedError("You can only delete your own listings!");
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(StatusCodes.OK).json(updatedListing);
};
//Get Listing
export const getListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new NotFoundError("Listing not found!");
  }
  res.status(StatusCodes.OK).json(listing);
};

//Search Functionality
export const getListings = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  let offer = req.query.offer;

  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }

  let furnished = req.query.furnished;

  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }

  let parking = req.query.parking;

  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }

  let type = req.query.type;

  if (type === undefined || type === "all") {
    type = { $in: ["sale", "rent"] };
  }

  const searchTerm = req.query.searchTerm || "";

  const sort = req.query.sort || "createdAt";

  const order = req.query.order || "desc";

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  res.status(StatusCodes.OK).json(listings);
};
