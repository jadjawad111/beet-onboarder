// Additional practice exercises for prompt failure identification
// Each exercise contains injected failures for training purposes

export interface ExerciseFeedback {
  element: string;
  status: "ERROR" | "NO_ERROR";
  text: string;
}

export interface AdditionalExercise {
  id: string;
  title: string;
  promptPlain: string;
  promptReveal: string;
  correctSelections: string[];
  detailedFeedback: ExerciseFeedback[];
}

// Map display names to internal keys
export const elementKeyMap: Record<string, string> = {
  "Unambiguous": "unambiguous",
  "Professional Role & Context": "professional",
  "Realistic & Not Contrived": "realistic",
  "Timelessness (Relative Dating)": "timelessness",
  "Clear Deliverable": "clearAsks",
  "Clear Constraints": "clearConstraints",
};

// Reverse map for feedback
export const elementDisplayMap: Record<string, string> = {
  "unambiguous": "Unambiguous",
  "professional": "Professional Role & Context",
  "realistic": "Realistic & Not Contrived",
  "timelessness": "Timelessness (Relative Dating)",
  "clearAsks": "Clear Deliverable",
  "clearConstraints": "Clear Constraints",
};

export const additionalExercises: AdditionalExercise[] = [
  {
    id: "EX-01",
    title: "Luxury Concierge: Napa Wineries",
    promptPlain: `It is August 20, 2025 and you are a Senior Lifestyle Manager at a luxury concierge company for ultra-high-net-worth individuals.

A member is currently staying at The Westin Verasa Napa in Napa Valley, United States. He has emailed you to request a list of wineries located near the hotel. The selected wineries should offer tasting experiences and a variety of grape types.

Create a shareable document containing the requested information. Add a footer titled Napa Valley Wineries. Include a relevant photo.

Each winery recommendation should include: name, grape varieties offered, a one- to two-sentence description of the winery, and address.

The purpose of this task is to present the information in a visually appealing document, enabling the member to compare options and make informed decisions.`,
    promptReveal: `It is 🟢August 20, 2025🟢 and you are a 🟢Senior Lifestyle Manager🟢 at a 🟢luxury concierge company for ultra-high-net-worth individuals🟢.

A member is currently staying at 🟢The Westin Verasa Napa🟢 in 🟢Napa Valley, United States🟢. He has emailed you to request a list of wineries located 🔴near the hotel🔴. The selected wineries should offer tasting experiences and a variety of grape types.

🔴Create a shareable document🔴 containing the requested information. 🟢Add a footer titled Napa Valley Wineries🟢. 🔴Include a relevant photo🔴.

Each winery recommendation should include: 🔴name, grape varieties offered, a one- to two-sentence description of the winery, and address🔴.

The purpose of this task is to present the information in a 🔴visually appealing🔴 document, enabling the member to compare options and make informed decisions.`,
    correctSelections: ["Unambiguous", "Clear Deliverable", "Clear Constraints"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `The phrases 🔴"near the hotel"🔴 and 🔴"visually appealing"🔴 are subjective, and the required fields were reduced to a minimal list, making it unclear what completeness looks like.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "The prompt clearly establishes 🟢Senior Lifestyle Manager🟢, 🟢luxury concierge🟢, and an 🟢ultra-high-net-worth🟢 client context, setting an appropriate professional standard."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "A concierge compiling winery options is a realistic task, and the wording reads like a plausible member request."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: `The scenario is anchored with 🟢August 20, 2025🟢, avoiding unstable phrases like "today" without context.`
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: `🔴"Create a shareable document"🔴 does not specify Word vs PDF, page count, or formatting requirements beyond a footer. Output expectations are underspecified.`
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: `Real-world constraints are missing: budget limitations, member preferences, scheduling windows, or sourcing rules (e.g., only verified wineries, distance limits). Without these operational guardrails, the task lacks meaningful tradeoffs.`
      }
    ]
  },
  {
    id: "EX-02",
    title: "Ultra-HNW Istanbul Itinerary (Excel)",
    promptPlain: `You are the Chief of Staff and Head of Concierge for an ultra-high net worth individual. He exited his last venture for over $1 billion dollars.

Your principal has an upcoming trip to Istanbul, Turkey for a wedding. Your task is to create an itinerary in an Excel document with tabs representing the four day journey.

The itinerary should include logistics and travel coordination, restaurants and activities with links, and any other miscellaneous items you can suggest. Conduct factual research from publicly available sources to identify relevant links.

The first day is June 1 and starts with a pickup at the main house front door at 8am. Thereafter is Wheels Up from JVY Airport at 9am.

Ensure the formatting is easy to read and that all links are clickable in the itinerary.`,
    promptReveal: `You are the 🟢Chief of Staff and Head of Concierge🟢 for an 🟢ultra-high net worth individual🟢. He 🟢exited his last venture for over $1 billion dollars🟢.

Your principal has an upcoming trip to 🟢Istanbul, Turkey🟢 for a wedding. Your task is to create an itinerary in an 🟢Excel🟢 document with 🟢tabs representing the four day journey🟢.

The itinerary should include logistics and travel coordination, restaurants and activities with links, and 🔴any other miscellaneous items you can suggest🔴. Conduct 🟢factual research🟢 from 🟢publicly available sources🟢 to identify relevant links.

The first day is 🟢June 1🟢 and starts with a pickup at the main house front door at 🟢8am🟢. Thereafter is Wheels Up from JVY Airport at 🟢9am🟢.

Ensure the formatting is 🔴easy to read🔴 and that all links are 🟢clickable🟢 in the itinerary.`,
    correctSelections: ["Unambiguous", "Clear Constraints"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"any other miscellaneous items you can suggest"🔴 and 🔴"easy to read"🔴 are subjective without concrete criteria for what must be included or how readability should be judged.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "The role and stakes are explicit: 🟢Chief of Staff and Head of Concierge🟢 for an 🟢ultra-high net worth🟢 principal."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This resembles a real concierge itinerary request with real-world logistics and research requirements."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "The prompt anchors days (e.g., 🟢June 1🟢) within the scenario logic, avoiding unstable relative dating."
      },
      {
        element: "clearAsks",
        status: "NO_ERROR",
        text: "The deliverable is clear: an 🟢Excel🟢 itinerary with 🟢four tabs🟢 and 🟢clickable links🟢."
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: "Real-world constraints are missing: budget limits, travel time windows between activities, dietary restrictions, or security protocols for the principal. These operational boundaries create meaningful tradeoffs."
      }
    ]
  },
  {
    id: "EX-03",
    title: "Car Rental: New Rental Agreement Guide",
    promptPlain: `You are a car rental clerk with five years of experience at an international airport. Due to the high volume of business at this location, it also serves as a final training site for onboarding new rental clerks.

Because of your seniority, you've been asked to create a step-by-step instructional guide that explains how to create a new Rental Agreement.

Your guide should include steps required to open a new Rental Agreement and practical tips to help new clerks complete the process efficiently.

The goal is to ensure smooth, accurate, and independent execution of the Rental Agreement process, even during peak hours.`,
    promptReveal: `You are a 🟢car rental clerk🟢 with 🟢five years of experience🟢 at an 🟢international airport🟢. Due to the 🟢high volume of business🟢 at this location, it also serves as a 🟢final training site🟢 for onboarding new rental clerks.

Because of your seniority, you've been asked to create a 🟢step-by-step instructional guide🟢 that explains how to create a new Rental Agreement.

Your guide should include 🔴steps required🔴 to open a new Rental Agreement and 🟢practical tips🟢 to help new clerks complete the process efficiently.

The goal is to ensure 🟢smooth, accurate, and independent execution🟢 of the Rental Agreement process, even during peak hours.`,
    correctSelections: ["Clear Deliverable", "Clear Constraints"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "NO_ERROR",
        text: "The task is broadly understandable: produce an onboarding guide to create a Rental Agreement."
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "Role and use case are explicit (🟢car rental clerk🟢, 🟢training site🟢, 🟢new clerks🟢)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This is a plausible operational training request."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "No unstable date references are required."
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: `The original required 🟢Word format🟢 and more detailed content categories; this version omits format and reduces required sections to 🔴"steps required"🔴 without specifying structure.`
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: `Real-world operational constraints are missing: what happens during system downtime, how to handle difficult customers, or when to escalate. These situational guardrails reflect actual job complexity.`
      }
    ]
  },
  {
    id: "EX-04",
    title: "Daily Closed Operational Report",
    promptPlain: `It is June 27, 2025, and you are a Car Rental Clerk assigned for the second shift at an airport location.

As part of your daily closing responsibilities, you are required to prepare a Daily Closed Operational Report for your location by analyzing closed rental agreements provided in the attached spreadsheet.

Create a report including daily activity and key trends and include a breakdown by category.

At the end of the report include brief observations relevant to management.

Reference Material: Closed Rental Agreements - June 27, 2025.xlsx`,
    promptReveal: `It is 🟢June 27, 2025🟢, and you are a 🟢Car Rental Clerk🟢 assigned for the 🟢second shift🟢 at an 🟢airport location🟢.

As part of your daily closing responsibilities, you are required to prepare a 🟢Daily Closed Operational Report🟢 for your location by analyzing closed rental agreements provided in the attached spreadsheet.

Create a 🔴report🔴 including 🔴daily activity and key trends🔴 and include a 🔴breakdown by category🔴.

At the end of the report include 🔴brief observations🔴 relevant to management.

Reference Material: 🟢Closed Rental Agreements - June 27, 2025.xlsx🟢`,
    correctSelections: ["Unambiguous", "Clear Deliverable", "Clear Constraints"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"key trends"🔴 and 🔴"brief observations"🔴 are subjective without defining which metrics must be computed and how insights should be framed.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "The role and operational setting are clear (🟢Car Rental Clerk🟢 producing an end-of-day 🟢Operational Report🟢)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This is a realistic closing responsibility for an airport rental location."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "The prompt is anchored to 🟢June 27, 2025🟢 and references a dated spreadsheet."
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: `🔴"Create a report"🔴 does not specify the required output file (Excel vs PDF), naming, tabs/sections, or exact metrics.`
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: "Real-world constraints are missing: threshold levels for flagging issues, comparison to previous periods, or escalation criteria. These operational boundaries define what 'actionable insights' means for management."
      }
    ]
  },
  {
    id: "EX-05",
    title: "ORD Damage + Damage Revenue Report",
    promptPlain: `Today is September 18th and you are a Car Rental Clerk working at the ORD (Chicago O'Hare Airport) location.

During your shift today a client returned a car with a broken (left/driver's) rearview mirror and was charged $200.

Create a Service Request Form in Word using the provided information so the maintenance team can address the damage.

Then analyze the attached file "Damage list.xlsx" and create a report summarizing damage revenue and conclusions.

The purpose is to help management track impact and support decision-making.`,
    promptReveal: `Today is 🔴September 18th🔴 and you are a 🟢Car Rental Clerk🟢 working at the 🟢ORD (Chicago O'Hare Airport)🟢 location.

During your shift today a client returned a car with a 🟢broken (left/driver's) rearview mirror🟢 and was charged 🟢$200🟢.

Create a 🟢Service Request Form🟢 in 🟢Word🟢 using the provided information so the maintenance team can address the damage.

Then analyze the attached file 🟢"Damage list.xlsx"🟢 and create a 🔴report🔴 summarizing 🔴damage revenue🔴 and 🔴conclusions🔴.

The purpose is to help management track impact and support decision-making.`,
    correctSelections: ["Timelessness (Relative Dating)", "Clear Deliverable", "Unambiguous"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `The second deliverable is underspecified: 🔴"create a report"🔴 with 🔴"conclusions"🔴 does not define required cuts (by category/type) or what conclusions should cover.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "The role and location are clear (🟢Car Rental Clerk🟢 at 🟢ORD🟢), and the maintenance workflow is realistic."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "A service request + damage analytics is a plausible operational pairing."
      },
      {
        element: "timelessness",
        status: "ERROR",
        text: `🔴"Today is September 18th"🔴 is unstable (no year). This will be incorrect when reused later.`
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: "The first deliverable specifies 🟢Word🟢, but the second does not specify Excel vs PDF, structure, or required summary tables."
      },
      {
        element: "clearConstraints",
        status: "NO_ERROR",
        text: "Constraints are not the primary failure; the issue is missing time anchoring and underspecified deliverables for the second report."
      }
    ]
  },
  {
    id: "EX-06",
    title: "Move-Out Inspections Email + Tracker",
    promptPlain: `You are a leasing agent at Qyrevia Property Management, overseeing a community consisting of 98 units. Part of the move-out procedure is to conduct the final inspection before the end of the month in which a tenant is departing. Your manager asked you to contact the residents who are moving out at the end of this upcoming September.

Please create an email to notify residents of the scheduled inspection and create a document that lists the unit #, resident's name, move-out date and scheduled inspection date. The tentative move-out inspection will be scheduled for 9/23 unless residents ask for a different date.

Refer to the attached reference files: "MOVE_OUT RPT" and "NOTES".`,
    promptReveal: `You are a 🟢leasing agent🟢 at 🟢Qyrevia Property Management🟢, overseeing a community consisting of 🟢98 units🟢. Part of the move-out procedure is to conduct the 🟢final inspection🟢 before the end of the month in which a tenant is departing. Your manager asked you to contact the residents who are moving out at the end of 🔴this upcoming September🔴.

Please create an 🔴email🔴 to notify residents of the scheduled inspection and create a 🔴document🔴 that lists the 🟢unit #🟢, 🟢resident's name🟢, 🟢move-out date🟢 and 🟢scheduled inspection date🟢. The tentative move-out inspection will be scheduled for 🔴9/23🔴 unless residents ask for a different date.

Refer to the attached reference files: 🟢"MOVE_OUT RPT"🟢 and 🟢"NOTES"🟢.`,
    correctSelections: ["Timelessness (Relative Dating)", "Clear Deliverable"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "NO_ERROR",
        text: "The requested fields for the tracker are explicit (unit, name, dates), and the basic task is understandable."
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "The role and workflow are well-defined (🟢leasing agent🟢, move-out inspections, manager request)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This mirrors standard property management operations."
      },
      {
        element: "timelessness",
        status: "ERROR",
        text: `🔴"this upcoming September"🔴 and 🔴"9/23"🔴 lack a year, which will age out and become ambiguous.`
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: `The deliverable formats were weakened: 🔴"create an email"🔴 and 🔴"create a document"🔴 do not specify PDF vs Word, naming, or whether both should be PDFs.`
      },
      {
        element: "clearConstraints",
        status: "NO_ERROR",
        text: "Constraints aren't the core issue; the task has a clear two-part structure and specific tracker fields."
      }
    ]
  },
  {
    id: "EX-07",
    title: "Turn Vacant Units Timeline",
    promptPlain: `You are a leasing agent at TR Apartments. There were 4 move outs on 6/30/25. Since your manager is on vacation this week, you will prepare a report that will help her plan a timeline to turn these vacant units.

Create a report formatted as a PDF that contains 2 sections. The first section will list by vendor the apartments that will require contracted services, and note whether any new appliances need to be ordered.

The second section will list by apartment number the type of work required and the date of work.

Attached reference files: Vendor Schedules, Availability and Inspection Report.`,
    promptReveal: `You are a 🟢leasing agent🟢 at 🟢TR Apartments🟢. There were 🟢4 move outs on 6/30/25🟢. Since your manager is on vacation this week, you will prepare a report that will help her plan a timeline to turn these vacant units.

Create a report formatted as a 🟢PDF🟢 that contains 🟢2 sections🟢. The first section will list 🟢by vendor🟢 the apartments that will require contracted services, and note whether any new appliances need to be ordered.

The second section will list 🟢by apartment number🟢 the type of work required and 🔴the date of work🔴.

Attached reference files: 🟢Vendor Schedules🟢, 🟢Availability🟢 and 🟢Inspection Report🟢.`,
    correctSelections: ["Clear Constraints", "Unambiguous"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"the date of work"🔴 is underspecified because the scheduling rules (no vendor overlap, staff workdays, appliance installation lead rules, weekends/holidays) were removed, leaving ambiguity about how to pick dates.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "Role, stakes, and scenario are clear (leasing agent planning turn timeline while manager is away)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This is a realistic property operations deliverable."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: `The move-out date is anchored (🟢6/30/25🟢), avoiding unstable phrases like "today" without context.`
      },
      {
        element: "clearAsks",
        status: "NO_ERROR",
        text: "The output format and structure are clear: 🟢PDF🟢 with 🟢2 sections🟢, vendor view + unit view."
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: "Real-world scheduling constraints are missing: vendor availability windows, staff working days, no overlap rules, and lead times for appliance installation. These operational boundaries make the timeline solvable."
      }
    ]
  },
  {
    id: "EX-08",
    title: "TSP Funds + Transition Benefits Email",
    promptPlain: `You are a dedicated service representative at a government agency responsible for helping customers with inquiries relating to the Thrift Savings Plan (TSP).

A client who is a long-tenured military member transitioning to federal civilian service is preparing for retirement and wants a breakdown of investment funds available within the TSP.

Please draft an email responding to the client's requests. You may research and consult the open web for further reference and additional details.`,
    promptReveal: `You are a 🟢dedicated service representative🟢 at a 🟢government agency🟢 responsible for helping customers with inquiries relating to the 🟢Thrift Savings Plan (TSP)🟢.

A client who is a 🟢long-tenured military member transitioning to federal civilian service🟢 is preparing for retirement and wants a breakdown of investment funds available within the TSP.

Please draft an 🔴email🔴 responding to the client's 🔴requests🔴. You may 🟢research and consult the open web🟢 for further reference and additional details.`,
    correctSelections: ["Clear Deliverable", "Unambiguous"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"requests"🔴 is vague here because the specific requested items (fund list and transition benefits) were removed, so it's unclear what must be covered.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "Role and audience context are strong (🟢service representative🟢, 🟢TSP🟢, transitioning service member)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This resembles a realistic constituent/client support scenario."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "No unstable date phrasing is introduced."
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: "The email is underspecified: no subject line, no structure, and the two-part request definition was removed, so the deliverable requirements are unclear."
      },
      {
        element: "clearConstraints",
        status: "NO_ERROR",
        text: "Constraints are not the primary failure; the issue is missing clarity on scope and deliverable specs."
      }
    ]
  },
  {
    id: "EX-09",
    title: "Elder Exploitation Training Deck + Roleplay PDFs",
    promptPlain: `You're a Senior Customer Service Representative helping train new hires at your financial services contact center.

Create a quick training deck explaining financial exploitation and elder abuse and how to respond. Include examples and tie in the Senior Safe Act and FINRA Rule 2165.

Also create a second PDF that includes three fictional mutual fund accounts with red flags to use for role play.

Keep the tone practical and engaging.`,
    promptReveal: `You're a 🟢Senior Customer Service Representative🟢 helping 🟢train new hires🟢 at your 🟢financial services contact center🟢.

Create a 🔴quick training deck🔴 explaining 🟢financial exploitation and elder abuse🟢 and how to respond. Include examples and tie in the 🟢Senior Safe Act🟢 and 🟢FINRA Rule 2165🟢.

Also create a 🟢second PDF🟢 that includes 🟢three fictional mutual fund accounts🟢 with 🟢red flags🟢 to use for 🟢role play🟢.

Keep the tone 🔴practical and engaging🔴.`,
    correctSelections: ["Clear Deliverable", "Clear Constraints", "Unambiguous"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"quick training deck"🔴 and 🔴"practical and engaging"🔴 are subjective without defining length, structure, or what "engaging" should look like.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "Role, audience, and stakes are clear (🟢Senior CSR🟢, 🟢train new hires🟢, contact center use in real calls)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This aligns with real contact-center training needs and uses plausible examples."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "No unstable time anchoring is required."
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: "The prompt does not specify output format for the deck (PPT vs PDF), page count, or how content should be structured; only the second deliverable is explicitly a 🟢PDF🟢."
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: `Real-world training constraints are missing: escalation protocols, when to involve supervisors, compliance boundaries, or time limits for customer interactions. These operational guardrails reflect actual job complexity.`
      }
    ]
  },
  {
    id: "EX-10",
    title: "ECID Constituent Summary + Talking Points",
    promptPlain: `You are a customer service representative working at the Enterprise County Improvement District (ECID).

You have been requested to prepare a one-page general summary of constituent comments from the attached Excel document. The final document should be saved as a .pdf file.

After completion of the summary document, please also draft some talking points in a PDF that can be referred to during the board meeting.`,
    promptReveal: `You are a 🟢customer service representative🟢 working at the 🟢Enterprise County Improvement District (ECID)🟢.

You have been requested to prepare a 🟢one-page🟢 general summary of constituent comments from the attached Excel document. The final document should be saved as a 🟢.pdf🟢 file.

After completion of the summary document, please also draft some 🔴talking points🔴 in a 🟢PDF🟢 that can be referred to during the 🟢board meeting🟢.`,
    correctSelections: ["Unambiguous", "Clear Constraints"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"talking points"🔴 is vague without specifying the number, structure (by district/member), or what topics to prioritize.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "The role and governance context are clear (ECID, constituent feedback, board meeting usage)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This resembles a realistic public-agency support deliverable."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "No unstable time references are used; the board meeting is contextual."
      },
      {
        element: "clearAsks",
        status: "NO_ERROR",
        text: "Deliverables and formats are stated (summary 🟢PDF🟢, talking points 🟢PDF🟢, one-page summary)."
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: "Real-world constraints are missing for the talking points: priority topics for the board, time limits for presentation, or political sensitivities to avoid. The summary has a page limit but the second deliverable lacks operational boundaries."
      }
    ]
  },
  {
    id: "EX-11",
    title: "Identity Theft Claims: Slide Deck",
    promptPlain: `You've worked for six years as a reimbursement services representative for a digital security services company that provides identity theft insurance.

The CEO has tasked you with reviewing the company's policy documentation and a sample of recent claims (both attached) to determine if they fall within the parameters for reimbursement.

Create a slide deck containing an agenda, purpose, and summary of results, as well as a recommendation for remediation and next steps.`,
    promptReveal: `You've worked for 🟢six years🟢 as a 🟢reimbursement services representative🟢 for a 🟢digital security services company🟢 that provides 🟢identity theft insurance🟢.

The 🟢CEO🟢 has tasked you with reviewing the company's 🟢policy documentation🟢 and a 🟢sample of recent claims🟢 (both attached) to determine if they fall within the parameters for reimbursement.

Create a 🔴slide deck🔴 containing an 🟢agenda🟢, 🟢purpose🟢, and 🔴summary of results🔴, as well as a 🔴recommendation🔴 for remediation and next steps.`,
    correctSelections: ["Clear Deliverable", "Unambiguous", "Clear Constraints"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"summary of results"🔴 and 🔴"recommendation"🔴 are vague without defining required metrics (financial impact, dollars, %, policy language options) and decision criteria.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "Role, domain, and audience are clear (reimbursement services, identity theft claims, CEO/leadership review)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This mirrors a plausible internal investigation and executive readout."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "No unstable time references are introduced."
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: `🔴"Create a slide deck"🔴 does not specify slide count, output format (PPT vs PDF), or required sections beyond a few headings.`
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: "Real-world decision constraints are missing: financial thresholds for escalation, policy interpretation boundaries, or compliance requirements. These operational guardrails define how recommendations should be framed for leadership."
      }
    ]
  },
  {
    id: "EX-12",
    title: "Live Chat Case Feedback",
    promptPlain: `You are a customer service representative who works for a bank and provides assistance via the organization's live chat channel.

A fellow representative shared three chat logs where he followed policies but got low customer satisfaction scores. Review each case and provide feedback on what he could have done differently.

Create a document titled "Case Feedback" with your feedback for each case.`,
    promptReveal: `You are a 🟢customer service representative🟢 who works for a 🟢bank🟢 and provides assistance via the organization's 🟢live chat🟢 channel.

A fellow representative shared 🟢three chat logs🟢 where he followed policies but got low customer satisfaction scores. Review each case and provide feedback on 🔴what he could have done differently🔴.

Create a 🔴document🔴 titled 🟢"Case Feedback"🟢 with your feedback for each case.`,
    correctSelections: ["Unambiguous", "Clear Deliverable", "Clear Constraints"],
    detailedFeedback: [
      {
        element: "unambiguous",
        status: "ERROR",
        text: `🔴"what he could have done differently"🔴 is subjective without criteria (tone, empathy, clarity, resolution steps) or guidance on what "better" means.`
      },
      {
        element: "professional",
        status: "NO_ERROR",
        text: "The role and channel context are clear (bank CSR, live chat coaching)."
      },
      {
        element: "realistic",
        status: "NO_ERROR",
        text: "This resembles real peer coaching based on chat logs."
      },
      {
        element: "timelessness",
        status: "NO_ERROR",
        text: "No unstable time anchoring is used."
      },
      {
        element: "clearAsks",
        status: "ERROR",
        text: `🔴"Create a document"🔴 is underspecified: no required structure (problem statements, alternatives), no per-case formatting requirements, no length guidance.`
      },
      {
        element: "clearConstraints",
        status: "ERROR",
        text: `Real-world coaching constraints are missing: what topics are off-limits (policy criticism), time constraints for responses, or escalation thresholds. These operational boundaries reflect actual coaching limitations.`
      }
    ]
  }
];
