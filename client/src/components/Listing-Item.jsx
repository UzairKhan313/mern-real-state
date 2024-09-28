import React from "react";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <div
      key={listing._id}
      className="border rounded-lg p-3 flex justify-between items-center gap-4"
    >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-16 w-16 object-contain"
        />
      </Link>
      <Link
        className="text-slate-700 font-semibold  hover:underline truncate flex-1"
        to={`/listing/${listing._id}`}
      >
        <p>{listing.name}</p>
      </Link>

      <div className="flex flex-col item-center">
        <button
          onClick={() => handleListingDelete(listing._id)}
          className="text-secondary uppercase"
        >
          Delete
        </button>
        <Link to={`/update-listing/${listing._id}`}>
          <button className="text-success uppercase">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default ListingItem;
