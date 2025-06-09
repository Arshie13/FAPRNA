"use client"

import { useState, useEffect } from "react"

export default function FAPRNABylawsPage() {
  const [activeSection, setActiveSection] = useState("article-i")

  // Array of all articles for the table of contents
  const articles = [
    { id: "article-i", title: "Article I", subtitle: "Definitions" },
    { id: "article-ii", title: "Article II", subtitle: "Purposes, Objectives and Governing Instruments" },
    { id: "article-iii", title: "Article III", subtitle: "Membership" },
    { id: "article-iv", title: "Article IV", subtitle: "Board of Directors" },
    { id: "article-v", title: "Article V", subtitle: "Officers" },
    { id: "article-vi", title: "Article VI", subtitle: "Bank Accounts, Checks, Contracts and Investments" },
    { id: "article-vii", title: "Article VII", subtitle: "Conflict of Interest and Compensation" },
    { id: "article-viii", title: "Article VIII", subtitle: "Indemnification" },
    { id: "article-ix", title: "Article IX", subtitle: "Dissolution" },
    { id: "article-x", title: "Article X", subtitle: "Amendments" },
    { id: "article-xi", title: "Article XI", subtitle: "Construction" },
  ]

  // Scroll to section when clicking on TOC link
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Content with Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Title */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12 hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">BY-LAWS</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">OF</h2>
            <h2 className="text-xl md:text-2xl font-semibold text-[#EB0000] mb-6 leading-tight">
              FILIPINO-AMERICAN ADVANCED PRACTICE REGISTERED NURSES
              <br />
              ASSOCIATION OF NEVADA (FAPRNA-NV)
            </h2>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Adopted 2018
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2h8z"
                    clipRule="evenodd"
                  />
                </svg>
                11 Articles
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4">
            <section id="article-i" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article I</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Definitions</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1.01
                      </span>
                      Name
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The &quot;Corporation&quot; shall mean: Filipino-American Advanced Practice Registered Nurses Association of
                      Nevada, also known as FAPRNA-NV, its successors and assigns.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1.02
                      </span>
                      Board
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The &quot;Board&quot; shall mean the Board of Directors of the Corporation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-ii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article II</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Purposes, Objectives and Governing Instruments</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2.01
                      </span>
                      Specific Purpose
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The specific purpose of the corporation is to foster excellence in areas of advanced nurse
                      practice through education of its members, promote professional growth through advocacy, research,
                      leadership, and community service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-iii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article III</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Membership</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3.01
                      </span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The membership of the corporation shall consist of the Board of Directors.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3.02
                      </span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Board shall have the authority to establish and define non-voting categories of membership.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-iv" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article IV</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Board of Directors</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.01
                      </span>
                      Members
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The members of the Board shall be composed of advanced practice registered nurses in the state of
                      Nevada that support the purposes of the organization.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-v" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article V</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Officers</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        5.01
                      </span>
                      Election and Qualifications; Term of Office
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Officers of the Corporation shall be a President, a President-Elect, a VP of Internal Affairs,
                      a VP of Finance, a VP of External Affairs, a Secretary, a Treasurer, and an Auditor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-vi" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article VI</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Bank Accounts, Checks, Contracts and Investments</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        6.01
                      </span>
                      Bank Accounts, Checks and Notes
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Board is authorized to select the banks or depositories it deems proper for the funds of the
                      Corporation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-vii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article VII</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Conflict of Interest and Compensation</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.01
                      </span>
                      Purpose
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The purpose of the conflict of interest policy is to protect this tax-exempt organization&apos;s
                      interest when it is contemplating entering into a transaction or arrangement that might benefit
                      the private interest of an officer or director.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-viii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article VIII</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Indemnification</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-[#EB0000] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        8.01
                      </span>
                      Indemnity Under Law
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Corporation shall indemnify and advance the expenses of each person to the full extent
                      permitted by law.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-ix" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article IX</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Dissolution</p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-gray-700 leading-relaxed">
                      The Corporation may be dissolved only upon adoption of a plan of dissolution and distribution of
                      assets by the Board that is consistent with the Articles of Incorporation and with State law.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-x" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article X</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Amendments</p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-gray-700 leading-relaxed">
                      These By-Laws may be altered, amended, added to or repealed at any meeting of the Board called for
                      that purpose by the vote of a majority of the Directors then in office.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article-xi" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#EB0000] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Article XI</h2>
                  <p className="text-lg text-[#EB0000] font-medium">Construction</p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-gray-700 leading-relaxed">
                      In the case of any conflict between the Articles of Incorporation of the Corporation and these
                      By-Laws, the Articles of Incorporation of the Corporation shall control.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="text-center">
                  <div className="mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#EB0000] rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Official Adoption</h3>
                  </div>

                  <p className="text-gray-600 mb-4 text-lg">
                    These Bylaws were ADOPTED and APPROVED at a meeting of the Board of Directors of the
                  </p>
                  <p className="text-gray-600 mb-4 font-semibold text-lg">
                    Filipino-American Advanced Practice Registered Nurses Association of Nevada (FAPRNA-NV)
                  </p>
                  <p className="text-gray-600 mb-12 text-lg">on _______________________, 2018.</p>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="border-b-2 border-gray-400 w-48 mx-auto mb-4 pb-2"></div>
                      <p className="text-gray-600 font-medium">Name</p>
                      <p className="text-gray-800 font-semibold">President, FAPRNA-NV</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-600 mb-4 font-medium">ATTEST:</p>
                      <div className="border-b-2 border-gray-400 w-48 mx-auto mb-4 pb-2"></div>
                      <p className="text-gray-600 font-medium">Name</p>
                      <p className="text-gray-800 font-semibold">Secretary, FAPRNA-NV</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents - Right Side */}
          <div className="md:w-1/4">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Table of Contents</h3>
                <ul className="space-y-3">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <button
                        onClick={() => scrollToSection(article.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                          activeSection === article.id
                            ? "bg-[#EB0000] text-white font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="font-medium">{article.title}</div>
                        <div className="text-xs truncate opacity-80">{article.subtitle}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-sm text-gray-600">
                  <div className="font-medium mb-1">Currently Viewing:</div>
                  <div className="font-bold text-[#EB0000]">
                    {activeSection && activeSection.replace("-", " ").toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
