import Image from "next/image";

export default function CollaborationSection() {
  // Add a delay for each logo for staggered fade-in
  const logos = [
    { src: "/collab1.png", alt: "EXEL Labs" },
    { src: "/collab2.png", alt: "Dynamic Manpower Consulting" },
    { src: "/collab3.png", alt: "Apollo Medical Group" },
    { src: "/collab4.png", alt: "iCare Psychiatry" },
    { src: "/collab5.png", alt: "Advance HealthCare Solutions" },
    { src: "/collab6.png", alt: "Goodwill Pharmacy" },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-2xl font-semibold text-gray-800 md:text-3xl">
          In Collaboration with:
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {logos.map((logo, idx) => (
            <div className="flex justify-center" key={logo.src}>
              <div
                className="relative h-20 w-full max-w-48 rounded-lg transition-all duration-700 opacity-0 animate-fade-in-left hover:scale-105 hover:shadow-xl hover:bg-blue-50 sm:h-24 md:h-28"
                style={{ animationDelay: `${idx * 0.3 + 0.2}s` }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
