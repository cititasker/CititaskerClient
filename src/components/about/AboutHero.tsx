import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative bg-white py-10 md:py-20 px-4 md:px-16 w-full mt-20 overflow-hidden">
      {/* Left Pink Circle */}
      <div className="absolute bottom-[-80px] left-[-80px] md:bottom-[0px] md:left-[-26px] w-[200px] h-[200px] z-0">
        <Image
          src="/images/circle-pink.svg"
          alt="Decorative pink circle"
          fill
          className="object-contain"
        />
      </div>

      {/* Right Blue Circle */}
      <div className="absolute top-[-60px] right-[-60px] md:top-[50px] md:right-[-30px] w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] z-0">
        <Image
          src="/images/circle-blue.svg"
          alt="Decorative blue circle"
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 bg-black rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 w-full">
        {/* Text Section */}
        <div className="text-white flex-1">
          <h1 className="text-[32px] sm:text-[48px] md:text-[32px] lg:text-[64px] font-bold mb-4 leading-[120%] tracking-tight">
            We're transforming service delivery across Africa.
          </h1>
          <p className="text-[16px] md:text-[20px] text-gray-300">
            Creating a way to connect people ready to work, with people who need
            work done
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <Image
            src="/images/about-hero.svg"
            alt="Team working together"
            width={500}
            height={400}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
