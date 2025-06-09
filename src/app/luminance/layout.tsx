export default function LuminanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-black text-white min-h-screen w-full flex flex-col">
      {children}
    </main>
  )
}