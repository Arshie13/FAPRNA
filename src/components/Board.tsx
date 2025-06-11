import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const boardMembers = [
  {
    name: "Mary Betita, MD, MSN, APRN, FNP-BC, MAP",
    title: "Founding President/Co-Founder FAPRNA-NV",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "Practice: UMCSN/Primary Care",
      "CEO/Medical Aesthetic Provider, Rejuvenesce Wellness Solutions, LLC",
      "NSBN, APRN Advisory Committee Member (2012-Present)",
      "ANCC, Content Expert Panel (2009-2014)",
      "Certified USMLE/ECFMG",
      "Winner, Advanced Practice Nurse of the Year, March of Dimes (2011)",
      "Multi-Awarded NP for involvement in clinical, nursing education & research",
      "AB170 Advocate & Lobbyist",
    ],
  },
  {
    name: "Rhigel Tan, DNP, APRN, PMHNP, GNP, ANP, FAAN",
    title: "Executive Director",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "President, Nevada State Board of Nursing",
      "NCSBN/NCLEX, Executive Board",
      "AB170 Advocate & Lobbyist",
      "CEO, iCare Psychiatry",
      "Assistant Professor, UNLV School of Nursing",
      "Healthcare Hero Award (2013)",
      "Founding President/Co-Founder: Kalahi Philippine Folkloric Ensemble",
      "Multi-Awarded for involvement in local & national professional nursing organizations",
    ],
  },
  {
    name: "Louvie Dizon-Alexander, MSN, APRN, NP-C, AACC",
    title: "Current President",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "Practice: UMCSN Heart Failure Clinic, Cardiology Department",
      "NV Representative, American College of Cardiology",
      "Award Recipient, March of Dimes Advanced Practice Category (2014)",
      "Member, Society of Clinical Research Associates",
      "Cardiovascular Research Coordinator",
      "Co-Investigator, CVRx BEAT Heart Failure Trial",
    ],
  },
  {
    name: "Irene Benliro DNP, MSN, APRN, FNP-C",
    title: "Founding VP of External Affairs",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "President/Founder: World Cultural Foundation",
      "Owner/Healthcare Provider, Medical Weight Loss & Family Clinic, Take Charge of Your Life (TCOYL) clinic",
      "Former Program Director, Charles R. Drew Univ. Medicine & Science, MSN/FNP",
      "ExamMaster Test Item Writer & Adjunct Assistant Professor, Charles Drew and Chamberlain University",
    ],
  },
  {
    name: "Wilva Anne Cadianza, MSN, APRN, NP-C",
    title: "Founding VP of Internal Affairs",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "Practice: Western Critical Care NP Intensivist",
      "Medical Aesthetic Provider",
      "CEO, Vivid Glow Aesthetics & Wellness Clinic",
      "Actively involved in community activities and volunteer work",
    ],
  },
  {
    name: "Cherry Maglaya-Lee MD, MSN, APRN, FNP-C",
    title: "Founding VP of Finance",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "President, Maglaya Medical-Legal Missions, Inc (MMLM), a 501(c)(3) non-profit Charity",
      "Co-Owner, Imaj Skin & Wellness Center",
      "Virtual Medicine Provider, SWMA",
      "Professor, National University, MSN-FNP Program",
      "2019 Most Outstanding Alumna, Leadership and Governance UERMMMCI",
    ],
  },
  {
    name: "Emerlinda Sambo, MSN, APRN, NP-C",
    title: "Founding Secretary",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "Practice: NV Kidney & Hypertension Center",
      "Clinical Nurse Specialist, Valley Health System",
      "Service Excellence facilitator, United Healthcare Services (2017)",
      "Winner, March of Dimes Nurse of the Year Long-Term Acute Care (2011)",
      "Actively involved with 'From the Heart Charitable Group'",
      "Former Hospitalist NP for Sound Physicians, St. Rose Hospital",
      "Former Nurse Manager, UMC Kidney Transplant Unit",
    ],
  },
  {
    name: "Julie Buensalida, MSN, APRN, CCRN, FNP-C",
    title: "Founding Treasurer",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "Practice: Valley Pediatrics & Specialty Center, UMCSN NP",
      "Winner, March of Dimes Nurse of the Year Critical Care Category (2013)",
      "Former IPC Hospitalist, Southern Nevada Internist",
      "Former Home Health NP",
    ],
  },
  {
    name: "Marvi Socorro Navarra, MD, MSN, APRN, NP-C",
    title: "Founding Auditor",
    image: "/placeholder.svg?height=300&width=300",
    credentials: [
      "Practice: CVS Minute Clinic NP, Value Health Mobile Clinic",
      "CEO, VM Healthcare Consulting",
      "Former NP for Optum, UHC Group, H2U Clinic, HealthFair Mobile Clinic, Gerinet of NV",
      "Assistant Professor, Charles R Drew University of Medicine & Science; Mervyn M. Dymally School of Nursing",
      "Actively involved in community activities and volunteer work",
    ],
  },
];

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-[#003366] text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our Board of Directors
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Meet our distinguished charter board of directors - nine exceptional
            leaders advancing Filipino-American nursing excellence across Nevada
          </p>
        </div>
      </div>

      {/* Board Members Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:gap-12">
          {boardMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="md:flex">
                  {/* Image Section */}
                  <div className="md:w-1/3 bg-gradient-to-br  p-8 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-65 h-65 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-[#003366] text-white p-2 rounded-full">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-2/3 p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-[#003366] text-sm font-medium px-3 py-1"
                      >
                        {member.title}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Professional Highlights
                      </h4>
                      {member.credentials.map((credential, credIndex) => (
                        <div
                          key={credIndex}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-[#003366] rounded-full mt-2"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {credential}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
