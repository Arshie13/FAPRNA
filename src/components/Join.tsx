import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WhyJoin() {
  const benefits = [
    {
      text: "You will develop personal and professional growth.",
      highlight: true,
    },
    {
      text: "You will have the opportunity to influence policy that affects nursing at the state and national level.",
      highlight: false,
    },
    {
      text: "You will learn how to engage with a diverse group of professionals in different fields.",
      highlight: true,
    },
    {
      text: "You will have unlimited networking opportunities.",
      highlight: false,
    },
    {
      text: "You will gain practical experience, career and leadership skills.",
      highlight: true,
    },
    {
      text: "You will expand your resume making you more viable as a job candidate.",
      highlight: false,
    },
    {
      text: "You are able to give back to the community.",
      highlight: true,
    },
    {
      text: "You'll have support and resource in times of need.",
      highlight: false,
    },
    {
      text: "You will improve future career prospects.",
      highlight: true,
    },
    {
      text: "Connect you to career boards and scholarship opportunities.",
      highlight: false,
    },
    {
      text: "You will be updated on current industry trends, new legislative rulings, and advances in technology.",
      highlight: true,
    },
    {
      text: "You will carry a degree of respectability when applying for jobs or presenting credentials to potential clients.",
      highlight: false,
    },
    {
      text: "We can provide stepping stones into additional career opportunities.",
      highlight: true,
    },
    {
      text: "You will have access to continuing education opportunities.",
      highlight: false,
    },
  ]

  return (
    <section className="w-full bg-[#f8ffdc] py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm uppercase tracking-wider text-purple-500">MORE INFORMATION</p>
          <h2 className="mb-10 text-4xl font-bold text-purple-800 md:text-5xl">Why Join</h2>

          <ul className="mb-12 space-y-3 text-left">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className={`flex items-start ${benefit.highlight ? "text-purple-800 font-medium" : "text-gray-700"}`}
              >
                <span className="mr-2 text-purple-600">◆</span>
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>

          <Link href="/join">
            <Button className="rounded-full bg-red-600 px-10 py-6 text-lg font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg">
              JOIN NOW!
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
