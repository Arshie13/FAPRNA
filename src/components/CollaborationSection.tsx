export default function CollaborationSection() {
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#003366] md:text-3xl">In Collaboration with:</h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* Placeholder for collaboration logos */}
          <div className="flex h-20 w-40 items-center justify-center rounded-lg border bg-gray-50 p-4">
            <span className="text-center text-sm text-gray-500">Partner Logo</span>
          </div>
          <div className="flex h-20 w-40 items-center justify-center rounded-lg border bg-gray-50 p-4">
            <span className="text-center text-sm text-gray-500">Partner Logo</span>
          </div>
          <div className="flex h-20 w-40 items-center justify-center rounded-lg border bg-gray-50 p-4">
            <span className="text-center text-sm text-gray-500">Partner Logo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
