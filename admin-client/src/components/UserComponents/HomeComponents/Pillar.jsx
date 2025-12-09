import React from "react";
import img1 from "../../../assets/pillars/ayurveda.png";
import img2 from "../../../assets/pillars/yoga.png";
import img3 from "../../../assets/pillars/naturopathy.png";
const Pillar = () => {
  return (
    <section className="text-center xl:mx-20 mx-10 bg-white">
      <h2
        className="sm:text-5xl text-3xl font-medium text-[#000000]  mb-5 belleza text-center"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        Our Pillars
      </h2>
      <p className="text-[#252525] text-sm md:text-xl font-light tracking-wide mt-2 mb-10  mx-auto montserrat">
        India is the birthplace of Ayurveda, Yoga and Naturopathy and recognized
        globally as the cradle of healing and wellness. Holistic living is a
        part of life here and culturally imbibed into the soul of the country
        and its people.
      </p>
      <div className="space-y-8 xl:mx-20">
        <div className="flex flex-col gap-4 lg:gap-10 md:flex-row items-center border rounded-lg ">
          <img
            src={img1}
            alt="ayurvedic"
            className={` h-32 md:w-96 md:h-60 object-cover rounded-lg `}
          />
          <div className="text-left p-2">
            <h3 className="text-xl md:text-2xl xl:text-4xl font-semibold text-[#535F2A]">
              AYURVEDA
            </h3>
            <p className="mt-2 md:text-lg lg:text-2xl font-normal tracking-wide text-[#2F2F2F]">
              Translating to 'the science of life', Ayurveda recognizes human
              beings and nature to be one. With wisdom that dates back to more
              than 5,000 years, it describes movement, transformation and
              structure as the three fundamental energies that govern our inner
              and outer environment.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-10 md:flex-row items-center border rounded-lg ">
          <div className="text-left ml-2 xl:ml-10">
            <h3 className="text-xl md:text-2xl xl:text-4xl font-semibold text-[#355C5F]">
              YOGA
            </h3>
            <p className="mt-2 md:text-lg lg:text-2xl font-normal tracking-wide text-[#2F2F2F]">
              Believed to have originated during the pre-Vedic era in India,
              yoga is a set of physical, mental and spiritual practices that
              heal the body, mind and soul. With several schools of yoga taught
              and practiced in India, it has been the medium to holistic
              wellbeing for centuries.
            </p>
          </div>
          <img
            src={img2}
            alt="yoga"
            className={`h-32 md:w-96 md:h-60 object-cover rounded-lg `}
          />
        </div>
        <div className="flex flex-col gap-4 lg:gap-10 md:flex-row items-center border rounded-lg ">
          <img
            src={img3}
            alt="naturopathy"
            className={`h-32 md:w-96 md:h-60 object-cover rounded-lg `}
          />

          <div className="text-left p-2">
            <h3 className="text-xl md:text-2xl xl:text-4xl font-semibold text-[#5F4C3C]">
              NATUROPATHY
            </h3>
            <p className="mt-2 md:text-lg lg:text-2xl font-normal tracking-wide text-[#2F2F2F] ">
              After a few centuries of craze for conventional therapies, the
              world is now embracing traditional healing practices again. And
              Naturopathy has become the treatment synonymous with 'harmless
              healing through the powers of nature'.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillar;
