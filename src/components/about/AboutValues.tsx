import Image from "next/image";

export default function AboutValues() {
  return (
    <section className="relative px-4 py-16 md:px-12 md:py-20 bg-white overflow-hidden">
      {/* Background circles */}
      <Image
        src="/images/orange-circle.svg"
        alt="Orange circle"
        width={120}
        height={120}
        className="absolute top-[20px] right-[0px] z-0"
      />
      <Image
        src="/images/green-circle.svg"
        alt="Green circle"
        width={120}
        height={120}
        className="absolute bottom-[-10px] left-[-25px] z-0"
      />
      <Image
        src="/images/yellow-circle.svg"
        alt="Yellow circle"
        width={60}
        height={60}
        className="absolute top-[10px] left-[10px] z-0"
      />

      {/* Content box */}
      <div className="relative z-10 bg-[#036A84] text-white rounded-2xl w-full p-6 sm:p-10 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Our Values</h2>
        <ol className="space-y-5 text-[16px] md:text-[20px] ">
          <li>
            <span className="font-semibold">1. Customer-Centric</span>
            <br />
            Our users are at the heart of everything we do. We're committed to delivering exceptional service and continuously improving our platform to meet your needs.
          </li>
          <li>
            <span className="font-semibold">2. Innovation</span>
            <br />
            We embrace technology to create smarter, faster, and more efficient solutions. Our platform is constantly evolving to provide the best possible experience.
          </li>
          <li>
            <span className="font-semibold">3. Empowerment</span>
            <br />
            We believe in empowering both clients and taskers. Whether you're looking for help or offering your skills, CitiTasker is here to support you every step of the way.
          </li>
          <li>
            <span className="font-semibold">4. Community</span>
            <br />
            We're proud to foster a community where people can connect, collaborate, and achieve their goals together.
          </li>
        </ol>
      </div>
    </section>
  );
}
