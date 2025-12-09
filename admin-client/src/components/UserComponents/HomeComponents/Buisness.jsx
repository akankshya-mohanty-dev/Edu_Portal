import React from "react";

const Buisness = () => {
  const categories = [
    "Ayurvedic Medicine",
    "Soya Milk & Soya Paneer",
    "Grocery and Cosmetics",
    "Cow Milk and Milk Products",
    "Mineral Water",
    "Food Products",
    "Agriculture Product",
    "Agriculture Equipment",
    "Solar Energy System",
    "Electrical & Electronics",
    "Furniture",
    "Smart Gadget Items",
  ];
  return (
    <section className="text-center lg:mx-20 mx-10 bg-white mt-10">
      <h2
        className="sm:text-5xl text-3xl font-medium text-[#000000]  mb-5 belleza text-center"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        Company Business
      </h2>
      <p className="text-[#252525] text-sm md:text-xl font-light tracking-wide mt-2 mb-10  mx-auto montserrat">
        India is the birthplace of Ayurveda, Yoga and Naturopathy and recognized
        globally as the cradle of healing and wellness. Holistic living is a
        part of life here and culturally imbibed into the soul of the country
        and its people.
      </p>
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6 lg:gap-10">
          {categories.map((item, index) => (
            <div
              key={index}
              className="shadow-md border rounded-lg px-5 py-8 text-[#008590] text-xl font-medium text-start"
            >
              {index + 1}. {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Buisness;
