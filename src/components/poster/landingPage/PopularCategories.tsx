import Link from "next/link";
import React from "react";

const categories = [
  {
    name: "Home Chef & Catering",
    href: "#",
    img: "/images/categories/popular/popular_chef.png",
  },
  {
    name: "Interior Design",
    href: "#",
    img: "/images/categories/popular/popular_interior.png",
  },
  {
    name: "Cleaning",
    href: "#",
    img: "/images/categories/popular/popular_cleaning.png",
  },
  {
    name: "Fashion & Beauty",
    href: "#",
    img: "/images/categories/popular/popular_fashion.png",
  },
  {
    name: "House Painting",
    href: "#",
    img: "/images/categories/popular/popular_chef.png",
  },
  {
    name: "Event Planning",
    href: "#",
    img: "/images/categories/popular/popular_event.png",
  },
  {
    name: "Automobile",
    href: "#",
    img: "/images/categories/popular/popular_automobile.png",
  },
];

const PopularCategories = () => {
  return (
    <div className="mt-[3.125rem]">
      <h2 className="text-2xl font-semibold leading-normal mb-7">
        Most Popular Categories
      </h2>
      <div className="grid gap-5 poster_popular_categories h-[21.875rem]">
        {categories.map((el, i) => (
          <Link
            href={el.href}
            key={i}
            className="relative rounded-20 flex items-center justify-center overflow-hidden"
            style={{
              background: `url(${el.img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute top-0 left-0 bottom-0 right-0 w-full flex items-center justify-center bg-[rgba(2,22,55,0.30)]">
              <p className="text-white text-xl font-semibold">{el.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
