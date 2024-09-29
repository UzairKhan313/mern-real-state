import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigation } from "swiper/modules";

import { Hero, ListingItem } from "../components";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <>
      <Hero />
      <div className="mt-[32rem]">
        {/* top */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="font-bold text-3xl lg:text-6xl">
            Find your next <span className="text-primary">Perfect</span>
            <br />
            place with ease
          </h1>
          <div className="text-lg sm:text-sm">
            <span className="font-bold text-xl text-primary">
              UK Real EState
            </span>{" "}
            is the best place to find your next perfect place to live.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:bg-primary hover:text-white transition-all duration-300 text-primary px-2 py-2 text-center border-2 border-primary w-40 rounded-lg"
          >
            Let&apos;s get started
          </Link>
        </div>

        {/* listing results for offer, sale and rent */}

        <div className="max-w-6xl mx-auto px-3 flex flex-col gap-8">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="">
                <h2 className="text-2xl font-semibold ">
                  Recent
                  <span className="text-primary"> Offers</span>
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:text-primary"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-8 ">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold">
                  Recent places for <span className="text-primary">Rent</span>
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:text-primary"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold ">
                  Recent places for <span className="text-primary">Sale</span>
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:text-primary"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
