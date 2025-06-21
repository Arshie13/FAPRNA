import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

export default function NotFound() {

  // const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8 p-8">
      <h1 className="text-6xl font-bold text-blue-700">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="text-gray-500 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      {/* <Button onClick={() => router.back()}>
        Go Back
      </Button> */}
      <Link href="/" className="inline-block mt-4">
        <span className="rounded-full bg-blue-600 px-8 py-3 text-white font-bold shadow-lg hover:bg-blue-700 transition-all">
          Go Home
        </span>
      </Link>
    </div>
  );
}
