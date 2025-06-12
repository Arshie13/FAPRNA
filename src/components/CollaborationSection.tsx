import Image from "next/image"

export default function CollaborationSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-2xl font-semibold text-gray-800 md:text-3xl">
          In Collaboration with:
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6">
          <div className="flex justify-center">
            <div className="relative h-28 w-56 max-w-full">
              <Image
                src="/collab1.png"
                alt="EXEL Labs"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-28 w-56 max-w-full">
              <Image
                src="/collab2.png"
                alt="Dynamic Manpower Consulting"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-28 w-56 max-w-full">
              <Image
                src="/collab3.png"
                alt="Apollo Medical Group"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-28 w-56 max-w-full">
              <Image
                src="/collab4.png"
                alt="iCare Psychiatry"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-28 w-56 max-w-full">
              <Image
                src="/collab5.png"
                alt="Advance HealthCare Solutions"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-28 w-56 max-w-full">
              <Image
                src="/collab6.png"
                alt="Goodwill Pharmacy"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
