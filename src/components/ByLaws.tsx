"use client";

import { useState, useEffect } from "react";

export default function FAPRNABylawsPage() {
  const [activeSection, setActiveSection] = useState("article-i");

  // Array of all articles for the table of contents
  const articles = [
    { id: "article-i", title: "Article I", subtitle: "Definitions" },
    {
      id: "article-ii",
      title: "Article II",
      subtitle: "Purposes, Objectives and Governing Instruments",
    },
    { id: "article-iii", title: "Article III", subtitle: "Membership" },
    { id: "article-iv", title: "Article IV", subtitle: "Board of Directors" },
    { id: "article-v", title: "Article V", subtitle: "Officers" },
    {
      id: "article-vi",
      title: "Article VI",
      subtitle: "Bank Accounts, Checks, Contracts and Investments",
    },
    {
      id: "article-vii",
      title: "Article VII",
      subtitle: "Conflict of Interest and Compensation",
    },
    { id: "article-viii", title: "Article VIII", subtitle: "Indemnification" },
    { id: "article-ix", title: "Article IX", subtitle: "Dissolution" },
    { id: "article-x", title: "Article X", subtitle: "Amendments" },
    { id: "article-xi", title: "Article XI", subtitle: "Construction" },
  ];

  // Scroll to section when clicking on TOC link
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Title */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12 hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              BY-LAWS
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
              OF
            </h2>
            <h2 className="text-xl md:text-2xl font-semibold text-[#003366] mb-6 leading-tight">
              FILIPINO-AMERICAN ADVANCED PRACTICE REGISTERED NURSES
              <br />
              ASSOCIATION OF NEVADA (FAPRNA-NV)
            </h2>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Adopted 2018
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a1 1 0 01-1-1v-2h8z"
                    clipRule="evenodd"
                  />
                </svg>
                11 Articles
              </span>
            </div>
          </div>
        </div>

        {/* Main Content with Two-Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Article I */}
            <section id="article-i" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article I
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Definitions
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1.01
                      </span>
                      Name
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The “Corporation” shall mean:{" "}
                      <b>
                        Filipino-American Advanced Practice Registered Nurses
                        Association of Nevada, also known as FAPRNA-NV
                      </b>
                      , its successors and assigns.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1.02
                      </span>
                      Board
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The “Board” shall mean the Board of Directors of the
                      Corporation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article II */}
            <section id="article-ii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article II
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Purposes, Objectives and Governing Instruments
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2.01
                      </span>
                      Specific Purpose
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The specific purpose of the corporation is to foster
                      excellence in areas of advanced nurse practice through
                      education of its members, promote professional growth
                      through advocacy, research, leadership, and community
                      service.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2.02
                      </span>
                      Charitable, Educational, and Scientific Purposes and
                      Powers
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The purposes of the Corporation, as set forth in the
                      Articles of Incorporation, are exclusively charitable,
                      educational, or religious, within the meaning of section
                      501(c)(3) of the Internal Revenue Code of 1986, as
                      amended, or the corresponding provision of any future
                      Federal tax law (“Section 501(c)(3)”). In furtherance of
                      such purposes, the Corporation shall have the same powers
                      as an individual to do all things necessary or convenient
                      to carry out the purposes, as set forth in the Articles of
                      Incorporation and these Bylaws.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2.03
                      </span>
                      Governing Instruments
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Corporation shall be governed by its Articles of
                      Incorporation and its Bylaws.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2.04
                      </span>
                      Nondiscrimination Policy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Corporation will not practice or permit any unlawful
                      discrimination on the basis of sex, age, race, color,
                      national origin, religion, physical handicap or
                      disability, or any other basis prohibited by law.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2.05
                      </span>
                      Operating Provision
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      No part of the net earnings of the corporation shall inure
                      to the benefit of, or be distributable to its members,
                      trustees, officers, or other private persons, except that
                      the corporation shall be authorized and empowered to pay
                      reasonable compensation for services rendered and to make
                      payments and distributions in furtherance of the purposes
                      described in section 501(c)(3).
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2.06
                      </span>
                      Limitations on Activities
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      No part of the activities of the Corporation shall consist
                      of participating in, or intervening in, any political
                      campaign on behalf of or in opposition to any candidate
                      for public office, nor shall the Corporation operate a
                      social club or carry on business with the general public
                      in a manner similar to an organization operated for
                      profit. Notwithstanding any other provision of these
                      Bylaws, the Corporation shall not carry on any activity
                      not permitted to be carried on by a corporation exempt
                      from federal income tax under Section 501(c)(3) of the
                      Internal Revenue Code of 1986, as amended, or the
                      corresponding provisions of any future federal tax law.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article III */}
            <section id="article-iii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article III
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Membership
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3.01
                      </span>
                      {/* Membership */} Pseudo Title
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The membership of the corporation shall consist of the
                      Board of Directors.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3.02
                      </span>
                      {/* Non-voting Categories */} Pseudo Title
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Board shall have the authority to establish and define
                      non-voting categories of membership.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3.03
                      </span>
                      {/* Dues */} Pseudo Title
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Board of Directors may assess an annual dues to its
                      members and to its non-voting categories of membership
                      through a board resolution approved by the majority of the
                      board.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3.04
                      </span>
                      {/* Board Contribution */} Pseudo Title
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Each member of the Board of Directors shall contribute at
                      least one hundred cash dollars ($100) to the organization
                      annually, all or part of which may come from the tax
                      deductible value paid for or solicited by the Board
                      member, and received by the Corporation. No contribution
                      credit shall be given for in-kind donations. Provided,
                      however, that the $100 cash requirement for any member who
                      joins after the beginning of the fiscal year for his or
                      her initial one-year term shall be prorated accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article IV */}
            <section id="article-iv" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article IV
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Board of Directors
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Repeat for each section 4.01 to 4.15, using the text from your prompt */}
                  {/* Example for 4.01 */}
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.01
                      </span>
                      Members
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The members of the Board shall be composed of advanced
                      practice registered nurses in the state of Nevada that
                      support the purposes of the organization. Membership are
                      open to those who will voluntarily serve and commit to the
                      responsibilities assigned to the Board of Directors. All
                      membership shall be granted upon a majority vote of the
                      Board.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.02
                      </span>
                      Number
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The number of Directors constituting the entire Board
                      shall be fixed by the Board, but such number shall not be
                      less than five (5) and not more than fifteen (15).
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.03
                      </span>
                      Annual Meeting
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A meeting of the Board shall be held annually at such
                      place, on such date and at such time as may be fixed by
                      the Board, for the purpose of electing Directors,
                      receiving annual reports of the Board and Officers, and
                      for the transaction of such other business as may be
                      brought before the meeting.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.04
                      </span>
                      Election and Term of Office
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The initial Directors of the Corporation shall be those
                      persons specified in the Articles of Incorporation of the
                      Corporation. Each Director shall hold office until the
                      next annual meeting of the Board and until such Director’s
                      successor has been qualified and elected, or until his or
                      her death, resignation or removal.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.05
                      </span>
                      Powers and Duties
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Subject to the provisions of law, of the Articles of
                      Incorporation and these By-Laws, but in furtherance and
                      not in limitation of any rights and powers thereby
                      conferred, the Board shall have the control and management
                      of the affairs and operations of the Corporation and shall
                      exercise all the powers that may be exercised by the
                      Corporation.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.06
                      </span>
                      Additional Meetings
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Regular meetings of the Board may be held at such times as
                      the Board may from time to time determine. Special
                      meetings of the Board may also be called at any time by
                      the Board’s President or by a majority of the Directors
                      then in office.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.07
                      </span>
                      Notice of Meetings
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      No notice need be given of any annual or regular meeting
                      of the Board. Notice of a special meeting of the Board
                      shall be given by service upon each Director in person or
                      by mailing the same to him at his or her post office
                      address as it appears upon the books of the Corporation at
                      least two business days (Saturdays, Sundays and legal
                      holidays not being considered business days for the
                      purpose of these By-Laws) if given in person, or at least
                      four business days, if given by mailing the same, before
                      the date designated for such meeting specifying the place,
                      date and hour of the meeting. Whenever all of the
                      Directors shall have waived notice of any meeting either
                      before or after such meeting, such meeting shall be valid
                      for all purposes. A Director who shall be present at any
                      meeting and who shall not have protested, prior to the
                      meeting or at its commencement, the lack of notice to him,
                      shall be deemed to have waived notice of such meeting. In
                      any case, any acts or proceedings taken at a Directors’
                      meeting not validly called or constituted may be made
                      valid and fully effective by ratification at a subsequent
                      Directors’ meeting that is legally and validly called.
                      Except as otherwise provided herein, notice of any
                      Directors’ meeting or any waiver thereof need not state
                      the purpose of the meeting, and, at any Directors’ meeting
                      duly held as provided in these By-Laws, any business
                      within the legal province and authority of the Board may
                      be transacted.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.08
                      </span>
                      Quorum
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      At any meeting of the Board, a majority of the Directors
                      then in office shall be necessary to constitute a quorum
                      for the transaction of business. However, should a quorum
                      not be present, a majority of the Directors present may
                      adjourn the meeting from time to time to another time and
                      place, without notice other than announcement at such
                      meetings, until a quorum shall be present.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.09
                      </span>
                      Voting
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      At all meetings of the Board, each Director shall have one
                      vote. In the event that there is a tie in any vote, the
                      President shall have an additional vote to be the
                      tie-breaker.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.10
                      </span>
                      Action Without a Meeting
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Any action required or permitted to be taken by the Board
                      or any committee thereof may be taken without a meeting if
                      all members of the Board or any such committee consent in
                      writing to the adoption of a resolution authorizing the
                      action. The resolution and the written consents thereto by
                      the members of the Board or any such committee shall be
                      filed with the minutes of the proceedings of the Board or
                      such committee
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.11
                      </span>
                      Removal
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Any Director may be removed for cause by vote of the Board
                      provided there is a quorum of not less than a majority
                      present at the meeting at which such action is taken.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.12
                      </span>
                      Resignation
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Any Director may resign from office at any time by
                      delivering a resignation in writing to the Board of
                      Directors, and the acceptance of the resignation, unless
                      required by its terms, shall not be necessary to make the
                      resignation effective.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.13
                      </span>
                      Vacancies
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Any newly created directorships and any vacancy occurring
                      on the Board arising at any time and from any cause may be
                      filled by the vote of a majority of the Directors then in
                      office at any Directors’ meeting. A Director elected to
                      fill a vacancy shall hold office for the unexpired term of
                      his or her predecessor.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.14
                      </span>
                      Committee
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Board, by resolution adopted by a majority of the
                      entire Board, may designate from among the Directors an
                      executive committee and other standing committees, each
                      consisting of three or more Directors, to serve at the
                      pleasure of the Board, and each of which, to the extent
                      provided in such resolution, shall have the authority of
                      the Board. The Board may designate one or more Directors
                      as alternate members of any such committee, who may
                      replace any absent member or members at any meeting of
                      such committee.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4.15
                      </span>
                      Participation by Telephone or Online Communication
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Any one or more members of the Board or any committee
                      thereof may participate in a meeting of the Board or such
                      committee by means of a conference telephone or similar
                      communications equipment allowing all persons
                      participating in the meeting to hear each other at the
                      same time. Participation by such means shall constitute
                      presence in person at a meeting.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article V */}
            <section id="article-v" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article V
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">Officers</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        5.01
                      </span>
                      Election and Qualifications; Term of Office
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Officers of the Corporation shall be a President, a
                      President-Elect, a VP of Internal Affairs, a VP of
                      Finance, a VP of External Affairs, a Secretary, a
                      Treasurer, and an Auditor. The Officers shall be elected
                      by the Board at the annual meeting of the Board and each
                      Officer shall hold office for a term of one year and until
                      such Officer’s successor has been elected or appointed and
                      qualified, unless such Officer shall have resigned or
                      shall have been removed as provided in Sections 8 and 9 of
                      this Article V. The same person may hold more than one
                      office, except that the same person may not be both
                      President and Secretary. The Board may appoint such other
                      Officers as may be deemed desirable, including one or more
                      Vice-Presidents, one or more Assistant Secretaries, and
                      one or more Assistant Treasurers. Such Officers shall
                      serve for such period as the Board may designate.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        5.01a
                      </span>
                      President
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      President. The President presides over meetings of the
                      organization, facilitates executive board meetings,
                      appoints committee chair people, terminates
                      non-functioning committees with board approval, maintains
                      contacts with with organization advisers, serves as a
                      spokesperson for the organization, serves as a secondary
                      signatory on financial accounts, assists all executive
                      officers, represents organization at official functions or
                      designates an alternative and provides encouragement &
                      motivation to officers and members.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        5.01b
                      </span>
                      President-Elect
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Assumes the office of the President for the regular term
                      after the term of the President, provides advice on
                      parliamentary matters, serves as the Chairperson of the
                      ByLaws Committee, reviews and makes recommendations to the
                      Board regarding organizational policies and procedures.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        5.01c
                      </span>
                      VP of Enternal Affairs
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Provides oversight to the Chairs of Education; Community &
                      Media Officer, serves as an ex-officio member of standing
                      committees as designated by the President, represents
                      organization at official functions, performs other duties
                      as directed by the President, assumes the duties of the
                      President in her absence as designated and performs duties
                      as the President and/or as the Board designates.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        5.01d
                      </span>
                      VP of Internal Affairs
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Provides oversight to the Secretary, serves as a
                      Parliamentarian, provides oversight to the organizes an
                      end-of-year celebration, retreats, etc. serves as an
                      ex-officio member of standing committees such as By-Laws
                      Committee, represents organization at official functions,
                      performs other duties as directed by the President and
                      assumes the duties of the President in her absence as
                      designated and performs duties as the President and/or as
                      the Board designates.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        5.01d
                      </span>
                      VP of Finance
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Provides oversight to the Treasurer and Auditor, serves as
                      an ex-officio member of standing committees such as
                      Membership and Fundraising Committees, serves as a
                      tertiary signatory on financial accounts, represents
                      organization at official functions, performs other duties
                      as directed by the President, assumes the duties of the
                      President in her absence as designated, and performs
                      duties as the President and/or as the Board designates.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.02
                        </span>
                        Vacancies
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Any vacancy occurring in any office, whether because of
                        death, resignation or removal, with or without cause, or
                        any other reason, shall be filled by the Board.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.03
                        </span>
                        Powers and Duties of the President
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        The President shall be the Chief Executive Officer of
                        the Corporation. The President shall from time to time
                        make such reports of the affairs and operations of the
                        Corporation as the Board may direct and shall preside at
                        all meetings of the Board. The President shall have such
                        other powers and shall perform such other duties as may
                        from time to time be assigned to the President by the
                        Board.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.04
                        </span>
                        Powers and Duties of the Vice-Presidents
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Each of the Vice-Presidents, if any, shall have such
                        powers and shall perform such duties as may from time to
                        time be assigned to such Vice President by the Board.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.05
                        </span>
                        Powers and Duties of the Secretary
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        The Secretary shall record and keep the minutes of all
                        meetings of the Board. The Secretary shall be the
                        custodian of, and shall make or cause to be made the
                        proper entries in the minute book of the Corporation and
                        such books and records as the Board may direct. The
                        Secretary shall be the custodian of the seal of the
                        Corporation and shall affix such seal to such contracts,
                        instruments and other documents as the Board or any
                        committee thereof may direct. The Secretary shall have
                        such other powers and shall perform such other duties as
                        may from time to time be assigned to the Secretary by
                        the Board.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.06
                        </span>
                        Powers and Duties of the Treasurer
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        The Treasurer shall be the custodian of all funds and
                        securities of the Corporation. Whenever so directed by
                        the Board, the Treasurer shall render a statement of the
                        cash and other accounts of the Corporation, and the
                        Treasurer shall cause to be entered regularly in the
                        books and records of the Corporation to be kept for such
                        purpose full and accurate accounts of the Corporation’s
                        receipts and disbursements. The Treasurer shall at all
                        reasonable times exhibit the books and accounts to any
                        Director upon application at the principal office of the
                        Corporation during business hours. The Treasurer shall
                        have such other powers and shall perform such other
                        duties as may from time to time be assigned to the
                        Treasurer by the Board.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.07
                        </span>
                        Delegation
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        In. In case of the absence of any Officer of the
                        Corporation, or for any other reason that the Board may
                        deem sufficient, the Board may at any time and from time
                        to time delegate all or any part of the powers or duties
                        of any Officer to any other Officer or to any Director
                        or Directors
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.08
                        </span>
                        Removal
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Any Officer may be removed from office at any time, with
                        or without cause, by a vote of a majority of the
                        Directors then in office at any meeting of the Board.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          5.09
                        </span>
                        Resignation
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Any Officer may resign his or her office at any time,
                        such resignation to be made in writing and to take
                        effect immediately without acceptance by the
                        Corporation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Article VI */}
            <section id="article-vi" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article VI
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Bank Accounts, Checks, Contracts and Investments
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        6.01
                      </span>
                      Bank Accounts, Checks and Notes
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Board is authorized to select the banks or
                      depositories it deems proper for the funds of the
                      Corporation. The Board shall determine who shall be
                      authorized from time to time on the Corporation’s behalf
                      to sign checks, drafts or other orders for the payment of
                      money, acceptances, notes or other evidences of
                      indebtedness.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        6.02
                      </span>
                      Contracts
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Board may authorize any Officer or Officers, agent or
                      agents, in addition to those specified in these By-Laws,
                      to enter into any contract or execute and deliver any
                      instrument in the name of and on behalf of the
                      Corporation, and such authority may be general or confined
                      to specific instances. Unless so authorized by the Board,
                      no Officer, agent or employee shall have any power or
                      authority to bind the Corporation by any contract or
                      engagement or to pledge its credit or render it liable for
                      any purpose or to any amount.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        6.03
                      </span>
                      Investments
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The funds of the Corporation may be retained in whole or
                      in part in cash or be invested and reinvested from time to
                      time in such property, real, personal or otherwise, or
                      stocks, bonds or other securities, as the Board may deem
                      desirable.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article VII */}
            <section id="article-vii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article VII
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Conflict of Interest and Compensation
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.01
                      </span>
                      Purpose
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The purpose of the conflict of interest policy is to
                      protect this tax- contemplating entering into a
                      transaction or arrangement that might benefit the private
                      interest of an officer or director of the Organization or
                      might result in a possible excess benefit transaction.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.02
                      </span>
                      Definitions
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <div className="pl-2">
                        <span className="font-semibold">
                          a. Interested Person
                        </span>{" "}
                        – Any director, principal officer, or member of a
                        committee with governing board delegated powers, who has
                        a direct or indirect financial interest, as defined
                        below, is an interested person.
                      </div>
                      <section className="pl-2">
                        <span className="font-semibold">
                          b. Financial Interest
                        </span>
                        <div className="pl-4">
                          A person has a financial interest if the person has,
                          directly or indirectly, through business, investment,
                          or family:
                          <ol className="list-decimal pl-6 mt-2 space-y-1">
                            <li>
                              An ownership or investment interest in any entity
                              with which the Organization has a transaction or
                              arrangement,
                            </li>
                            <li>
                              A compensation arrangement with the Organization
                              or with any entity or individual with which the
                              Organization has a transaction or arrangement, or
                            </li>
                            <li>
                              A potential ownership or investment interest in,
                              or compensation arrangement with, any entity or
                              individual with which the Organization is
                              negotiating a transaction or arrangement.
                            </li>
                          </ol>
                          <div className="mt-2">
                            Compensation includes direct and indirect
                            remuneration as well as gifts or favors that are not
                            insubstantial.
                          </div>
                          <div className="mt-2">
                            A financial interest is not necessarily a conflict
                            of interest. A person who has a financial interest
                            may have a conflict of interest only if the
                            appropriate governing board or committee decides
                            that a conflict of interest exists.
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.03
                      </span>
                      Procedures
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <div>
                        <span className="font-semibold">
                          a. Duty to Disclose.
                        </span>{" "}
                        In connection with any actual or possible conflict of
                        interest, an interested person must disclose the
                        existence of the financial interest and be given the
                        opportunity to disclose all material facts to the
                        directors and members of committees with governing board
                        delegated powers considering the proposed transaction or
                        arrangement.
                      </div>
                      <div>
                        <span className="font-semibold">
                          b. Determining Whether a Conflict of Interest Exists.
                        </span>{" "}
                        After disclosure of the financial interest and all
                        material facts, and after any discussion with the
                        interested person, he/she shall leave the governing
                        board or committee meeting while the determination of a
                        conflict of interest is discussed and voted upon. The
                        remaining board or committee members shall decide if a
                        conflict of interest exists.
                      </div>
                      <div>
                        <span className="font-semibold">
                          c. Procedures for Addressing the Conflict of Interest
                        </span>
                        <ol className="list-decimal pl-6 mt-2 space-y-1">
                          <li>
                            An interested person may make a presentation at the
                            governing board or committee meeting, but after the
                            presentation, he/she shall leave the meeting during
                            the discussion of, and the vote on, the transaction
                            or arrangement involving the possible conflict of
                            interest.
                          </li>
                          <li>
                            The chairperson of the governing board or committee
                            shall, if appropriate, appoint a disinterested
                            person or committee to investigate alternatives to
                            the proposed transaction or arrangement.
                          </li>
                          <li>
                            After exercising due diligence, the governing board
                            or committee shall determine whether the
                            Organization can obtain with reasonable efforts a
                            more advantageous transaction or arrangement from a
                            person or entity that would not give rise to a
                            conflict of interest.
                          </li>
                          <li>
                            If a more advantageous transaction or arrangement is
                            not reasonably possible under circumstances not
                            producing a conflict of interest, the governing
                            board or committee shall determine by a majority
                            vote of the disinterested directors whether the
                            transaction or arrangement is in the Organization&apos;s
                            best interest, for its own benefit, and whether it
                            is fair and reasonable. In conformity with the above
                            determination it shall make its decision as to
                            whether to enter into the transaction or
                            arrangement.
                          </li>
                        </ol>
                      </div>
                      <div>
                        <span className="font-semibold">
                          d. Violations of the Conflicts of Interest Policy
                        </span>
                        <ol className="list-decimal pl-6 mt-2 space-y-1">
                          <li>
                            If the governing board or committee has reasonable
                            cause to believe a member has failed to disclose
                            actual or possible conflicts of interest, it shall
                            inform the member of the basis for such belief and
                            afford the member an opportunity to explain the
                            alleged failure to disclose.
                          </li>
                          <li>
                            If, after hearing the member&apos;s response and after
                            making further investigation as warranted by the
                            circumstances, the governing board or committee
                            determines the member has failed to disclose an
                            actual or possible conflict of interest, it shall
                            take appropriate disciplinary and corrective action.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.04
                      </span>
                      Records of Proceedings
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <p>
                        The minutes of the governing board and all committees
                        with board delegated powers shall contain:
                      </p>
                      <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                        <li>
                          The names of the persons who disclosed or otherwise
                          were found to have a financial interest in connection
                          with an actual or possible conflict of interest, the
                          nature of the financial interest, any action taken to
                          determine whether a conflict of interest was present,
                          and the governing board&apos;s decision as to whether a
                          conflict of interest in fact existed.
                        </li>
                        <li>
                          The names of the persons who were present for
                          discussions and votes relating to the transaction or
                          arrangement, the content of the discussion, including
                          any alternatives to the proposed transaction or
                          arrangement, and a record of any votes taken in
                          connection with the proceedings.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.05
                      </span>
                      Compensation
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                        <li>
                          A voting member of the governing board who receives
                          compensation, directly or indirectly, from the
                          Organization for services is precluded from voting on
                          matters pertaining to that member&apos;s compensation.
                        </li>
                        <li>
                          A voting member of any committee whose jurisdiction
                          includes compensation matters and who receives
                          compensation, directly or indirectly, from the
                          Organization for services is precluded from voting on
                          matters pertaining to that member&apos;s compensation.
                        </li>
                        <li>
                          No voting member of the governing board or any
                          committee whose jurisdiction includes compensation
                          matters and who receives compensation, directly or
                          indirectly, from the Organization, either individually
                          or collectively, is prohibited from providing
                          information to any committee regarding compensation.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.06
                      </span>
                      Annual Statements
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <p>
                        Each director, principal officer and member of a
                        committee with governing board delegated powers shall
                        annually sign a statement which affirms such person:
                      </p>
                      <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                        <li>
                          Has received a copy of the conflicts of interest
                          policy,
                        </li>
                        <li>Has read and understands the policy,</li>
                        <li>Has agreed to comply with the policy, and</li>
                        <li>
                          Understands the Organization is charitable and in
                          order to maintain its federal tax exemption it must
                          engage primarily in activities which accomplish one or
                          more of its tax-exempt purposes.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.07
                      </span>
                      Periodic Reviews
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <p>
                        To ensure the Organization operates in a manner
                        consistent with charitable purposes and does not engage
                        in activities that could jeopardize its tax-exempt
                        status, periodic reviews shall be conducted. The
                        periodic reviews shall, at a minimum, include the
                        following subjects:
                      </p>
                      <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                        <li>
                          Whether compensation arrangements and benefits are
                          reasonable, based on competent survey information, and
                          the result of arm&apos;s length bargaining.
                        </li>
                        <li>
                          Whether partnerships, joint ventures, and arrangements
                          with management organizations conform to the
                          Organization&apos;s written policies, are properly
                          recorded, reflect reasonable investment or payments
                          for goods and services, further charitable purposes
                          and do not result in inurement, impermissible private
                          benefit or in an excess benefit transaction.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        7.08
                      </span>
                      Use of Outside Experts
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      When conducting the periodic reviews as provided for in
                      Article VII, the Organization may, but need not, use
                      outside advisors. If outside experts are used, their use
                      shall not relieve the governing board of its
                      responsibility for ensuring periodic reviews are
                      conducted.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article VIII */}
            <section id="article-viii" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article VIII
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Indemnification
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Section 8.01 */}
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        8.01
                      </span>
                      Indemnity Under Law
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Corporation shall indemnify and advance the expenses
                      of each person to the full extent permitted by law.
                    </p>
                  </div>

                  {/* Section 8.02 */}
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        8.02
                      </span>
                      Additional Indemnification
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="block mb-4">
                        (i) The Corporation hereby agrees to hold harmless and
                        indemnify each of its Directors, Officers, employees and
                        agents (the “Indemnitee”) from and against, and to
                        reimburse the Indemnitee for, any and all judgments,
                        fines, liabilities, amounts paid in settlement and
                        reasonable expenses, including attorneys’ fees actually
                        and necessarily incurred, as a result of or in
                        connection with any threatened, pending or completed
                        action, suit or proceeding, whether civil, criminal,
                        administrative or investigative, other than one by or in
                        the right of the Corporation to procure a judgment in
                        its favor, including an action, suit or proceeding by or
                        in the right of any other corporation of any type or
                        kind, domestic or foreign, or any partnership, joint
                        venture, trust, employee benefit plan or other
                        enterprise for which the Indemnitee served in any
                        capacity at the request of the Corporation, to which the
                        Indemnitee is, was or at any time becomes a party, or is
                        threatened to be made a party, or as a result of or in
                        connection with any appeal therein, by reason of the
                        fact that the Indemnitee is, was or at any time becomes
                        a Director or Officer of the Corporation, or is or was
                        serving or at any time serves such other corporation,
                        partnership, joint venture, trust, employee benefit plan
                        or other enterprise in any capacity, whether arising out
                        of any breach of the Indemnitee’s fiduciary duty as a
                        Director, Officer, employee or agent of such other
                        corporation, partnership, joint venture, trust, employee
                        benefit plan or other enterprise under any state or
                        federal law or otherwise; provided, however, that no
                        indemnity pursuant to this Section 2 shall be paid by
                        the Corporation (i) if a judgment or other final
                        adjudication adverse to the Indemnitee establishes that
                        the Indemnitee’s acts were committed in bad faith or
                        were the result of active and deliberate dishonesty and
                        were material to the cause of action so adjudicated, or
                        that the Indemnitee personally gained in fact a
                        financial profit or other advantage to which the
                        Indemnitee was not legally entitled; or (ii) if a final
                        judgment by a court having jurisdiction in the matter
                        shall determine that such indemnification is not lawful.
                        The termination of any such civil or criminal action or
                        proceeding by judgment, order, settlement, conviction,
                        or upon a plea of nolo contendere or its equivalent,
                        shall not, of itself, create any presumption that the
                        Indemnitee acted in bad faith and/or was dishonest.
                      </span>
                      <span className="block mb-4">
                        (ii) The obligation of the Corporation to indemnify
                        contained herein shall continue during the period the
                        Indemnitee serves as a Director, Officer, employee or
                        agent of the Corporation and shall continue thereafter
                        so long as the Indemnitee shall be subject to any
                        possible claim or threatened, pending or completed
                        action, suit or proceeding, whether civil, criminal,
                        administrative or investigative, by reason of the fact
                        that the Indemnitee was a Director or Officer of the
                        Corporation or served at the request of the Corporation
                        in any capacity for any other corporation, partnership,
                        joint venture, trust, employee benefit plan or other
                        enterprise.
                      </span>
                      <span className="block mb-4">
                        (iii) Promptly after receipt by the Indemnitee of notice
                        of the commencement of any action, suit or proceeding,
                        the Indemnitee will, if a claim in respect thereof is to
                        be made against the Corporation under this Section 2,
                        notify the Corporation of the commencement thereof; but
                        the omission so to notify the Corporation will not
                        relieve it from any liability which it may have to the
                        Indemnitee otherwise than under this Section 2. With
                        respect to any such action, suit or proceeding as to
                        which the Indemnitee notifies the Corporation of the
                        commencement thereof:
                        <br />
                        <br />
                        a) The Corporation will be entitled to participate
                        therein at its own expense; and,
                        <br />
                        b) Except as otherwise provided in the last sentence of
                        this subpart ii, to the extent that it may wish, the
                        Corporation jointly with any other indemnifying party
                        similarly notified will be entitled to assume the
                        defense thereof, with counsel satisfactory to the
                        Indemnitee. After notice from the Corporation to the
                        Indemnitee of its election so to assume the defense
                        thereof, the Corporation will not be liable to the
                        Indemnitee under this Section 2 for any legal or other
                        expenses subsequently incurred by the Indemnitee in
                        connection with the defense thereof other than
                        reasonable costs of investigation or as otherwise
                        provided in the last sentence of this subpart ii. The
                        Indemnitee shall have the right to employ his or her own
                        counsel in such action, suit or proceeding but the fees
                        and expenses of such counsel incurred after notice from
                        the Corporation of its assumption of the defense thereof
                        shall be at the expense of the Indemnitee unless (A) the
                        employment of counsel by the Indemnitee has been
                        authorized by the Corporation in connection with the
                        defense of such action, (B) the Indemnitee shall have
                        reasonably concluded that there may be a conflict of
                        interest between the Corporation and the Indemnitee in
                        the conduct of the defense of such action, or (C) the
                        Corporation shall not in fact have employed counsel to
                        assume the defense of such action, in each of which
                        cases the fees and expenses of counsel for the
                        Indemnitee shall be borne by the Corporation (it being
                        understood, however, that the Corporation shall not be
                        liable for the expenses of more than one counsel for the
                        Indemnitee in connection with any action or separate but
                        similar or related actions in the same jurisdiction
                        arising out of the same general allegations or
                        circumstances). The Corporation shall not be entitled to
                        assume the defense of any action, suit or proceeding
                        brought by or on behalf of the Corporation or as to
                        which the Indemnitee shall have made the conclusion
                        provided for in clause (B) of the preceding sentence of
                        this subpart ii.
                        <br />
                        c) Anything in this Section 2 to the contrary
                        notwithstanding, the Corporation shall not be liable to
                        indemnify the Indemnitee under this Section 2 for any
                        amounts paid in settlement of any action or claim
                        effected without its written consent. The Corporation
                        shall not settle any action or claim in any manner which
                        would impose any penalty or limitation on the Indemnitee
                        without the Indemnitee’s written consent. Neither the
                        Corporation nor any such person will unreasonably
                        withhold their consent to any proposed settlement.
                      </span>
                      <span className="block mb-4">
                        (iv) In the event of any threatened or pending action,
                        suit or proceeding which may give rise to a right of
                        indemnification from the Corporation to the Indemnitee
                        pursuant to this Section 2, the Corporation shall pay,
                        on demand, in advance of the final disposition thereof,
                        expenses incurred by the Indemnitee in defending such
                        action, suit or proceeding, other than those expenses
                        for which the Indemnitee is not entitled to
                        indemnification pursuant to clause (ii) of the proviso
                        to part (a) of this Section 2 or part (b) of this
                        Section 2. The Corporation shall make such payments upon
                        receipt of a written request made by the Indemnitee for
                        payment of such expenses, (ii) an undertaking by or on
                        behalf of the Indemnitee to repay such amount if it
                        shall ultimately be determined that he or she is not
                        entitled to be indemnified by the Corporation hereunder,
                        and (iii) evidence satisfactory to the Corporation as to
                        the amount of such expenses. The Indemnitee’s written
                        certification together with a copy of the statement paid
                        or to be paid by the Indemnitee shall constitute
                        satisfactory evidence as to the amount of such expenses.
                      </span>
                      <span className="block">
                        (v) The rights to indemnification and advancement of
                        expenses granted to the Indemnitee under this Section 2
                        shall not be deemed exclusive, or in limitation of any
                        other rights to which the Indemnitee may now or
                        hereafter be entitled under the Corporation’s
                        Certificate of Incorporation or otherwise under the
                        Corporation’s By-Laws, as now in effect or as hereafter
                        amended, any agreement, any vote of members or
                        Directors, any applicable law, or otherwise.
                      </span>
                    </p>
                  </div>

                  {/* Section 8.03 */}
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        8.03
                      </span>
                      Limitation
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      No amendment, modification, or rescission of this Article
                      VIII shall affect any indemnification right related to
                      incidents occurring before the date of such change.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article IX */}
            <section id="article-ix" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article IX
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Dissolution
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-gray-700 leading-relaxed">
                      The Corporation may be dissolved only upon adoption of a
                      plan of dissolution and distribution of assets by the
                      Board that is consistent with the Articles of
                      Incorporation and with State law. Upon the dissolution of
                      this organization, assets shall be distributed for one or
                      more exempt purposes within the meaning of section
                      501(c)(3) of the Internal Revenue Code, or corresponding
                      section of any future federal tax code, or shall be
                      distributed to the federal government, or to a state or
                      local government, for a public purpose.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article X */}
            <section id="article-x" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article X
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Amendments
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-gray-700 leading-relaxed">
                      These By-Laws may be altered, amended, added to or
                      repealed at any meeting of the Board called for that
                      purpose by the vote of a majority of the Directors then in
                      office.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Article XI */}
            <section id="article-xi" className="mb-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="border-l-4 border-[#003366] pl-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Article XI
                  </h2>
                  <p className="text-lg text-[#003366] font-medium">
                    Construction
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-gray-700 leading-relaxed">
                      In the case of any conflict between the Articles of
                      Incorporation of the Corporation and these By-Laws, the
                      Articles of Incorporation of the Corporation shall
                      control.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="text-center">
                  <div className="mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#003366] rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Official Adoption
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 text-lg">
                    These Bylaws were ADOPTED and APPROVED at a meeting of the
                    Board of Directors of the Filipino-American Advanced
                    Practice Registered Nurses Association of Nevada (FAPRNA-NV)
                  </p>
                  <p className="text-gray-600 mb-12 text-lg">
                    on _______________________, 2018.
                  </p>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="border-b-2 border-gray-400 w-48 mx-auto mb-4 pb-2"></div>
                      <p className="text-gray-600 font-medium">Name</p>
                      <p className="text-gray-800 font-semibold">
                        President, FAPRNA-NV
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-600 mb-4 font-medium">ATTEST:</p>
                      <div className="border-b-2 border-gray-400 w-48 mx-auto mb-4 pb-2"></div>
                      <p className="text-gray-600 font-medium">Name</p>
                      <p className="text-gray-800 font-semibold">
                        Secretary, FAPRNA-NV
                      </p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                  Table of Contents
                </h3>
                <ul className="space-y-3">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <button
                        onClick={() => scrollToSection(article.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${activeSection === article.id
                            ? "bg-[#003366] text-white font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        <div className="font-medium">{article.title}</div>
                        <div className="text-xs truncate opacity-80">
                          {article.subtitle}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-sm text-gray-600">
                  <div className="font-medium mb-1">Currently Viewing:</div>
                  <div className="font-bold text-[#003366]">
                    {activeSection &&
                      activeSection.replace("-", " ").toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
