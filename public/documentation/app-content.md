# Project Beet Complete Documentation

This document contains ALL text content from the Project Beet application, organized into two main parts:

1. **INSTRUCTIONS** — Step-by-step procedural guides for completing tasks
2. **EDUCATIONAL COURSE** — Learning modules for understanding concepts

---

# ═══════════════════════════════════════════════════════════════════════════
# SECTION A: INSTRUCTIONS
# Reference guides for completing prompt writing and rubric creation tasks
# ═══════════════════════════════════════════════════════════════════════════

---

# PART 1: RUBRIC WRITING INSTRUCTIONS

## Introduction

### Welcome to Project Beet

In this half of the project, we will write and edit rubrics that will be used to train and evaluate large language models.

### What is a rubric?

A rubric is a collection of criteria that collectively define a good response to a specific prompt. The goal of the rubric is to grade the quality of any current or future response to a specific prompt.

Your rubric will be a generally-applicable list of specific criteria that, when taken as a whole, can evaluate any possible response to your prompt. Each criterion will be a simple, declarative statement that can be evaluated as true or false for any given response. Each criterion will also have an associated point value that will be awarded to a given response if that statement is true.

Together, the rubric "paints a picture" of a good response, and allows us to enumerate or rank responses.

### Example

**Task Prompt:** What's a convenient restaurant that I can walk to from 123 Main Street?

**Rubric:**
- **55 pts** - Mentions that Jane's Tavern is at 482 Main Street
- **35 pts** - Mentions that Jane's Tavern is about a 20 minute walk from 123 Main Street
- **15 pts** - Mentions that 482 Main Street is 1 mile from 123 Main Street

*Note: Item 3 is "extra credit" – it's not strictly necessary to answer the prompt, but it helps provide good context for a quality answer.*

Each criterion touches upon one element of a good response: 1 requires that a specific valid answer to the question is provided, 2 proves that the answer is valid, and 3 provides validation. Multiple answers could be various levels of correct; this rubric helps us enumerate which answers are better than others!

### How Responses Get Scored

**Response 1 (55/105 pts):** "One restaurant that fits the bill is Jane's Tavern at 482 Main Street."
- This response is good – it answers the question – but it doesn't provide any information about why it is convenient.

**Response 2 (70/105 pts):** "Jane's Tavern at 482 Main Street is 1 mile from 123 Main Street, which is highly walkable!"
- This response is better, but could be improved by including information about what a 1 mile walk looks like.

**Response 3 (105/105 pts):** "Jane's Tavern at 482 Main Street is 1 mile away, or about a 20 minute walk. If you're a fast walker, you might get there sooner!"
- This is the best response of all – the total score here is 105 points!

---

## Rubric Items

For this project, each criterion requires the following 6 pieces of supporting information:

### 1. Criterion
A statement that asserts what a model response would do to earn points. It should be clear, concise, readable, and atomic. It should be evaluable (there should never be ambiguity in whether or not a model response has fulfilled the criteria). These statements should be binary – they can only be true or false, with no shades of grey.

### 2. Rationale
A brief explanation of why this criterion is included.

### 3. Weight
A score representing its relative importance compared to all other points in the rubric.

### 4. Category
Each criterion must fall under one of the designated categories: Instruction Following, Reasoning, Extraction, or Formatting.

### 5. Citation
A publicly accessible web URL that supports the decision for including the criterion. Citations are optional, but they are required when the criterion depends on factual information.

### 6. Implicit/Explicit
Tag each criterion as Implicit or Explicit to clarify where the requirement comes from.

### Key Principles for Writing Criteria

| Principle | Description |
|-----------|-------------|
| Atomicity | Each criterion evaluates exactly one concept |
| Self-Containment | A criterion can be evaluated using only the information it contains (plus the response being graded) |
| Objectivity | Criteria use specific, measurable language—not vague qualifiers |
| Independence | Criteria do not reference or depend on other criteria |
| Binary Evaluation | Each criterion is clearly satisfied or not satisfied—no partial credit |
| Weight Calibration | Weights reflect relative importance to task success |

### Criteria Count Requirements

- **Minimum 20 criteria:** A rubric with less than 20 criteria is insufficient to capture all of the elements of the response we need to evaluate.
- **Maximum 250 criteria:** So many items makes evaluating an accurate response difficult. Too many criteria diminishes the importance of each criteria.

### Common Vocab / Acronyms

- **C1, C2, C3…** = Short-hand for rubric 'Criterion 1', 'Criterion 2', etc. You may see these abbreviations in feedback from reviewers (e.g. C1 has issues with stacking because…)
- **R1, R2** = 'Review 1', 'Review 2'. These are the review tiers for the project. Tasks are usually reviewed at R1 and potentially again at R2.

---

## Category Guidelines

Each criterion must fall under one of the following categories:

### Instruction Following
These are rubric items that assert broad instruction following as opposed to concrete factual correctness. Any time you are asserting a very similar thing to what the prompt has stated it will likely be instruction following. The rationales for these items will typically read as "The user explicitly requested SOMETHING in the prompt"

**Example:**
- Prompt: "Please provide me with an exercise program to help me run a 5k! Plan around my calendar which is attached as a spreadsheet."
- Criterion: "States an itemized list of exercises."
- Rationale: "The prompt explicitly asks for an exercise program."

### Reasoning
Logic, calculation steps, or justification (e.g., mathematical reasoning). These criteria contain concrete answers to requests that require reasoning (inference, deduction, research, etc.)

**Example:**
- Criterion: "Includes twice or three times weekly runs in the exercise program."
- Rationale: "Because the user wants to run a 5k, the exercise program should include frequent running."

### Extraction
Pulls relevant information from a data source - this includes information from any input files from the relevant BeetID Input folder (e.g. information from a url, spreadsheet, PDF, video, etc.)

**Example:**
- Criterion: "Identifies that the user is very busy on saturdays."
- Rationale: "Per the attached calendar, the user does not have time to work out on saturdays."

### Formatting
Response structure (e.g. calculation formatting, heading, lists, JSON structure)

**Example:**
- Criterion: "Tabulates exercise dates, times, and locations."
- Rationale: "The user would be benefited from a highly readable format such as a table."

---

## Criterion Weighting Guidelines

**Remember:** weighting is relative – similar criteria should receive similar or the same weights.

### High Weight: 50 - 100 (Critical)

Highly relevant to prompt. A key answer to an explicitly asked question.

**Example:**
- Prompt: What phase of tides is the northeastern US experiencing right now?
- Criterion: Response states that the Northeastern US is experiencing high tide at midnight on December 6th.
- Weight: 100

**NOTE:** The main concept and deliverable should likely be weighted 100. Key details that are necessary to answer the prompt should likely be in the 70-90 range. Other important aspects of answers to explicitly asked questions should be 50-70.

### Medium Weight: 20 - 50 (Important)

An important explanation, an implicit ask, or a common incorrect answer.

**Examples:**
- Criterion: Response explains that the northeastern US is experiencing high tide because *CONCISE EXPLANATION*
- Weight: 25

- Criterion: Response does not state that the Northeastern US is experiencing low tide at midnight December 6th.
- Weight: 25

### Low Weight: 1 - 20 (Nice to Have)

Something that is nice to have but is ultimately not critical. A fringe inclusion in the rubric.

**Example:**
- Prompt: What phase of tides is the northeastern US experiencing right now?
- Criterion: Response explains that the Northeastern US experiences a semidiurnal tidal period.
- Weight: 1

### How Weights Affect Scoring

- **Response A:** "The NE US is in low tide." → 0/125 points
- **Response B:** "Hey, unfortunately I don't know the tide right now." → 25/125 points (Gets points for not stating incorrect information)
- **Response C:** "The NE US is in high tide." → 125/125 points

### Key Takeaway

You should not be afraid to give something a lower weight. **The most important thing is that the weights reflect relative importance.**

---

## General vs Specific Criteria

Every truly ideal response should score 100% on your rubric. Any non-ideal response should score below 100%.

Every request is to some extent verifiable, and this extent varies from request to request. You should attempt to **rightsize the specificity** of your rubric items to the request.

### Highly Verifiable – One Objective Answer

In cases where one true answer exists, it is important that we explicitly describe that one true answer in our criteria.

**Prompt:** "What are the 5 highest grossing (adjusted for inflation as of June 2020) American films made before 1980? How much did they each gross at the time of their production? Calculate their gross adjusted for inflation based on the price of tickets in 2020 and the total number of tickets each movie has sold."

- ✅ **Good:** "States that Gone with The Wind is the highest grossing American film made before 1980." (Category: Reasoning or potentially Extraction)
- ❌ **Bad:** "Includes the highest grossing American film made before 1980." (Category: Instruction Following - too vague!)

**Note for finance and quantitative sciences:** always include a ± to account for differences in rounding.

### Verifiable, But Too Many Items

In cases where the range grows to an inordinate number (greater than 20), we need to generalize our criteria. There are multiple ways to do this, and we should attempt to specify the traits that characterize the set of correct answers.

**Prompt:** "Attached are the prices and earnings of every stock in the S&P 500. Please return a new spreadsheet with the P/E ratio for each one."

- ✅ **Good:** "Calculates price to earnings ratio for each stock listed with '=price/earnings'" (Uses a formula to describe the pattern)
- ❌ **Bad:** "Criterion 1: Calculates P/E ratio of AAPL as 37.2." "Criterion 2: Calculates P/E ratio of AMZN as 32.1." …500 more criteria…

### Semi-Verifiable – An Allowable Range

In cases where a range of allowable answers exist, we should provide the range.

**Example:** "I used to run in my free time during college but I haven't done any cardiovascular training in five years. I want to run a 5k but find it hard to fit training into my schedule..."

If there are two possible answers for where the exercises may occur, we must provide both as concrete rubric items:

- **Criterion 1:** "The exercise program suggests Fort Green park as one potential location for exercising."
  - Rationale: There are only two large parks near downtown Brooklyn. The user specifically requested to work out in parks. Fort Green is one of the two.
- **Criterion 2:** "The exercise program suggests Prospect Park as one potential location for exercising."

OR, alternatively:
- **Criterion 1:** "The exercise program suggests parks in south Brooklyn as locations." (Category: Instruction Following)

### Avoid Being Too Restrictive

We must be careful to not word criteria in restrictive ways, for example by prescribing that only one single park is allowable when multiple parks are adequate or by prescribing one single way to word a document.

- ❌ **Too Restrictive:** "Creates document titled 'Change Control Standard Operating Procedure (SOP) v_1.00.docx'"
- ✅ **Appropriately Flexible:** "Creates a document with a title that indicates it is an SOP for Change Management"

### Key Takeaway

Rightsize the specificity of your rubric items to the request. Be specific enough to validate correct answers, but not so specific that you reject valid alternatives.

---

## Criteria Rules

Each rubric criterion should adhere to the following rules, in order from most to least important.

### HIGHEST: Clear and Unambiguous

Each criterion should be clear, descriptive, unambiguous, specific, and concise. Criteria should be binary (true or false) and objective.

- ❌ **Bad:** "[80 points] The output document states that the nurse correctly adjusted the patient's medications based on the lab results."
  - This criterion is too vague—"correctly" is undefined, it doesn't specify which labs, which medications, which standing orders apply, or what changes should be made.
- ✅ **Good:** "[80 points] The output document states that the nurse initiated Aranesp 10 mcg IVP each treatment for any patient with HGB < 10.0."

### HIGHEST: Self-Contained

Each criterion will be evaluated on the task response independently, and separately from the others. It must contain complete, full information so we can judge whether the criterion is true or false for the particular task response.

The grader model will only be able to see the response it is grading and a single criterion at a time. Each criterion should contain all necessary information to grade a response.

- ❌ **Bad:** "Mentions the male lead actor in the 2021 movie 'Dune: Part One'"
  - This would not be considered assessable without knowing who the relevant actors are.
- ✅ **Good:** "Mentions the male lead actor in the 2021 movie 'Dune: Part One' is Timothée Chalamet."

**Important:** Criteria should be evaluable without internet access. Avoid criteria that require additional research via the internet. Related to internet access, submitting rubric items like "is this link broken" or "does this link go to a 404 error page" is not answerable without internet access. Please avoid those rubric items.

### IMPORTANT: No References to Other Criteria

Criteria should not reference each other.

- ❌ Don't have criteria like: "[30] Includes a valid experimental approach not listed above" – what's above? What if we shuffle the order?
- ❌ Abbreviations need to be expanded in every criterion. "[30] Mentions that Gabrieli et al looks at control of memory retrieval" should be rewritten as "[50] Mentions that 'Neural Systems Underlying the Suppression of Unwanted Memories' (John Gabrieli et al, Science, 2001) looks at control of memory retrieval."
- ✅ If you have a few consecutive criteria about the same scientific paper, each criterion should repeat the name of the paper.

### HIGHEST: Non-Stacked

Each criterion should have a single statement / thesis, so a partially-correct answer can better earn partial credit. Most stacked criteria with the word "and" can be broken up into multiple pieces.

- ❌ **Stacked (Bad):** "[65] Includes the Greek alphabet and states that it has 24 letters."
  - What happens if a response mentions the Greek alphabet but doesn't state how many letters it has? Then this item would be false, even though it's sort of 50% true.
- ✅ **Split (Good):**
  - "[65] Includes the Greek alphabet."
  - "[65] States that the Greek alphabet has 24 letters."

**Exception:** If you believe that two different things need to be included for either to have any value, you can group them together. For example, a task that includes "What are the coordinates of the Imperial Palace in Tokyo, to two decimal places?" might have a rubric item like:

"[35] Includes the latitude 139.75°E and the longitude 35.69°N"

This is one statement, and not a stacked criterion because a longitude is not very helpful without a latitude!

### MODERATE: Negative Criteria

Negative examples are as helpful as positive examples. Any task will have an infinite number of incorrect responses. However, negative criteria can be useful when they are specifically targeted at ways you think the model might get confused.

**Example:** "[75] Doesn't include the coordinate pair 39.92°N, 116.40°E."
- Justification: These are the coordinates of the imperial palace in Beijing, when the prompt asked for the coordinates of the imperial palace in Tokyo.

**Gotcha:** Avoid double counting with both positive and negative criteria:
- ❌ "[5] Includes reference to X"
- ❌ "[5] Doesn't include reference to X"
- This double counts the reference to X!

### DOES NOT MATTER: Default Criteria

You can assume the following are default criteria for all good answers, and so you don't need to write criteria about:
- Correct grammar and spelling
- Making sure the response cites sources
- Cited sources must contain the information referenced

### Key Takeaway

The order of criteria in the rubric doesn't matter. What matters is that each criterion is clear, self-contained, non-stacked, and properly weighted.

---

## Negatively Weighted Criteria

**Penalties for common wrong responses**

A negatively weighted criterion is a clear, yes/no check for a serious mistake. It is written as a positive statement (something that could be true). If it is true, you apply a negative weight and reduce the score.

### Use Negatively Weighted Criteria When:

- The mistake is severe (misleading, unusable, or professionally unacceptable).
- The mistake is common.
- You want to prevent "polished but wrong" outputs from scoring well.

### How to Write Strong Negative Criteria:

- Make it specific and observable, so a reviewer can mark it true/false quickly.
- Focus on high-impact failures, not minor style preferences.
- Avoid overlap with your positive criteria so you don't punish the same issue twice.

### How to Choose Negative Weights:

- **Large negative weights** when the mistake breaks core instructions or makes the deliverable misleading.
- **Smaller negative weights** when the mistake is still wrong, but not catastrophic.

### Examples of Negative Criteria

**Example 1:**
- Prompt Requirement: "In the argument brief, do not include any arguments that rely on the legal doctrine of 'assumption of risk.'"
- Negative Criterion: "The argument brief contains the exact phrase 'assumption of risk' at least once."
- Weight: -100
- Why This Penalty? The response includes a forbidden legal concept explicitly banned by the prompt.

**Example 2:**
- Prompt Requirement: "Anonymize the name 'Tyler Haight' by replacing it with '[REDACTED]' everywhere it appears in all output documents."
- Negative Criterion: "The subject review document refers to the patient by their name 'Tyler Haight'."
- Weight: -100
- Why This Penalty? A prohibited identifier appears in the outputs, directly violating the anonymization requirement.

**Example 3:**
- Prompt Requirement: "Using only the listed symptoms, draft a treatment chart."
- Negative Criterion: "The treatment chart states that Acute Stress Disorder is the confirmed diagnosis."
- Weight: -40
- Why This Penalty? Expert judgement is required here — it asserts diagnostic certainty when most medical professionals would not do this.

### Guideline

Include at least **five negatively weighted criteria** in your rubric to catch major failures and penalize outputs that look good but fail in important ways.

---

## Error Categories

Fellows will be evaluated by the number of Major and Minor Issues identified in tasks by reviewers. Similarly, if you are a reviewer, your work may also be evaluated by a senior reviewer.

**Major Issues** are critical errors that materially affect the quality of the task. **Minor Issues** are less significant errors that still need to be fixed. When either Major or Minor Issues are identified, the issues can either be fixed by the reviewer or the task can be sent back for fixing.

### Major Errors

| Error Type | Description |
|------------|-------------|
| Criterion Stacked | There are two or more criteria in one line-item that should be broken up into multiple criteria line-items. |
| Criterion Redundant | Multiple criteria are objectively overlapping – one cannot be satisfied without the other and vice versa. |
| Missing Criterion | A criterion that would be weighted as 5 or a 3 is missing from the rubric. |
| Criterion Inaccurate | A criterion contains an inaccuracy in the criterion description, or there are multiple inaccuracies across the rationale, quote, or source. |
| Criterion Not Self-Contained | A criterion doesn't contain all the necessary info to grade a response and/or isn't able to be evaluated without access to the prompt or internet access. |
| Criterion Ambiguous | The criterion is objectively ambiguous and can't be accurately evaluated. |
| Criterion Restrictive | The criterion is too limiting, and may fail some good responses (e.g. if the prompt asks for a list of doctors often quoted in the media, a criterion states the list must include Dr. XYZ when many lists that answer the prompt might not). |
| Criterion Weight Incorrect | A criterion is weighted incorrectly. |

### Minor Errors

| Error Type | Description |
|------------|-------------|
| Missing Citation | A rubric item that is missing a citation. Not all rubric items require citations. However, if a reviewer is unsure of, skeptical of, or confused by a criterion and there is no supporting citation, this error tag may be applied at the reviewer's discretion. |
| Rationale Error | A rubric item where the rationale is underdeveloped or unclear. If a reviewer is unsure of, skeptical of, or confused by a criterion and there is not proper justification in the rationale field, this error tag may be applied at the reviewer's discretion. |
| Wording Error | A rubric item with errors in wording or language. For example, if a criterion does not start with a verb or a reference to the response making a statement or claim, the rubric item should be tagged for wording. |
| Improper Categorization | A criterion's label is incorrect. For example, an explicit instruction from the prompt is tagged as "Formatting" instead of "Instruction Following". |

---

## Writing Rubrics for Spreadsheets

### Always Consider Adding Rubric Items For:

**Table names/concepts**
- Most rubrics should include one or more items on the names of the critical tables contained in the spreadsheet
- Example: "Spreadsheet includes a table describing the allocation of assets in the investment portfolio"

**Column, row names/concepts**
- Rubrics must describe the columns and rows of each critical table. If columns or rows have specific names, include a rubric item for each individual name. If columns or rows are series (such as years or quarters) then include one rubric item that describes the series. Be careful: if the table could be transposed (rows and columns flip-flop) then we should not overly prescribe column vs row distinctions.
- Example: "In the spreadsheet, the table describing the allocation of assets in the investment portfolio has one column for 'non-qualified stock options'" OR "In the spreadsheet, the table describing the allocation of assets in the investment portfolio has rows that represent years 2020 through 2025"

**Key values**
- Throughout the critical tables within the spreadsheet, each key value should have an individual criterion associated. Be careful: numeric key values will frequently be rounded. Include '±' bounds to protect against restrictiveness.
- Example: "In the spreadsheet, the table describing the allocation of assets in the investment portfolio states that in 2025 50% (± 1%) of assets were non-qualified stock options"

### Consider Adding If Specified in Prompt or Strong Industry Conventions:

**Spreadsheet file name**
- It can be helpful to consider how the deliverable file should be named
- Example: "The spreadsheet's file name communicates that it contains a cash flow analysis"

**Tab names**
- If there are multiple tabs in the spreadsheet and it is relevant to the prompt, you should include rubric items that describe what each tab contains
- Example: "The spreadsheet contains one tab for FY25 revenue"

**Important formulas**
- It is fair to assert that certain formulas be present in the spreadsheet. This is most relevant when the prompt specifies that the spreadsheet use a specific formula or where the user is requesting a spreadsheet where the input values will change but the logic will remain the same. Be careful: There can be multiple valid formulas that arrive at the same answer – it is difficult to write rubric items on formulas without being restrictive.
- Example: "In the spreadsheet, the table dedicated to cash flow analysis uses 'Revenue-Costs' to calculate margin"

**Specific formatting**
- Rubric items on spreadsheet formatting are allowed. They should only be included if there are strong industry conventions.
- Example: "The spreadsheet includes all losses as red colored text" OR "The spreadsheet includes all profits as black colored text"

### Key Takeaway

For spreadsheet rubrics, focus on table structure, column/row names, and key values. Always include ± bounds for numeric values to account for rounding differences.

---

## Writing Rubrics for Videos

The following is a list of concepts or dimensions to consider when writing a rubric for a video or video editing task. Each rubric may include rubric items on less than all of these concepts. However, it is wise to consider if each concept is materially important for any given task.

### Technical Specifications

| Concept | Goal | Example |
|---------|------|---------|
| Duration of video (with a ±) | Ensures the final product meets specified distribution or platform limits. | "Response includes video of length 15.0 ± 0.5 seconds" |
| Duration of individual shots (with a ±) | Controls the editing pace and prevents viewer disorientation from overly brief or overly long shots. | "The video includes a shot of duration at least 10 seconds ± 1 second" |
| File management | Guarantees required organizational structure and naming conventions for handoff and archival. | "The video file follows specified naming convention (e.g., AD_ProductX_vFinal.mp4)." |
| Aspect ratios | Ensures the video is correctly framed for its intended viewing environment (e.g., cinema, social media, broadcast). | "The video adheres to a 16:9 aspect ratio without letterboxing or pillarboxing." |
| Frame rate | Maintains consistency and fluidity of motion required for the delivery platform. | "The video maintains a consistent frame rate of 24 ± 0.05 frames per second." |
| File codecs | Make sure codecs comply with the forum where the video will live (e.g., social media requires a specific codec). | "The video is encoded using the H.264 codec." |
| Bitrate | Ensures adequate visual quality while managing file size, adhering to minimum/maximum bandwidth. | "The video's average variable bitrate (VBR) is between 8 and 12 Mbps." |
| File size | Adheres to strict limits imposed by hosting services or distribution channels. | "The video file size does not exceed 250 MB (megabytes)." |

### Cinematography & Visual Production

| Concept | Goal | Example |
|---------|------|---------|
| Visual content (logos, shots/frames) | Ensures key visual elements are present for the required duration and placement according to the prompt or brand guidelines. | "The video features a legible logo in the bottom right corner of the screen." OR "The video includes a shot of at least one of the following: a dog, a child, a baseball, a tennis ball, a park, a field, or a blue sky." |
| Shot descriptions | Verifies appropriate variety and intention in visual storytelling techniques. | "The video opens with a dutched shot." |
| Camera movements | Evaluates the intentional use of motion to emphasize emotional or visual moments. | "The video opens with a panning shot of a dog in a field." |
| Consistency of visual language | Ensures the overall aesthetic (e.g., filters, graphics) is unified throughout the entire video. | "The video is entirely in black and white." |
| Exposure / Lighting / Focus | Ensures technical integrity so that footage is clear, properly exposed, and free of distracting flaws. | "The video only uses a shallow depth of field." |
| Resolution | Guarantees the final output quality meets the minimum display standard. | "The video maintains a minimum resolution of 1920 x 1080 with no visible compression artifacts or pixelation." |
| Color grading | Confirms the color palette is intentionally crafted and consistently applied to achieve the desired tone. | "The video maintains uniform color saturation." |

### Audio Production & Sound Design

| Concept | Goal | Example |
|---------|------|---------|
| Audio quality / No clipping | Ensures all dialogue and sound effects are clear, audible, and free from unwanted noise. Sets the average dialogue volume level appropriate for broadcast readiness. | "The video includes audible spoken dialogue." OR "The audio master track volume does not exceed 0 dBFS at any point during the video playback." OR "The video's dialogue maintains levels between 12 dBFS and 6 dBFS for broadcast readiness." |
| Soundtracks | Confirms music usage is appropriate and legally compliant (if required by the prompt). | "The video employs a soundtrack of string instruments." |
| No background noise | Ensures that important dialogue tracks are isolated and clean for clear comprehension. Maintains audio immersion and consistency during pauses or cuts within a scene. | "The video's dialogue tracks do not contain any of the following: audible background noise, wind, or distracting sounds during speaking segments." OR "The video features a continuous layer of matched room tone throughout all non-dialogue, non-music segments." |
| Correctly synced to visuals | Ensures that all sound effects and dialogue match the corresponding on-screen action exactly. | "The video's dialogue is synchronized exactly to the corresponding on-screen visual action (lip-sync)." |
| Stereo vs mono | Ensures the final audio mix is delivered in the correct channel format for the required distribution. | "The video's audio mix is delivered in stereo format, clearly distinguishing left and right channels." |

### Editing, Pacing, and Narrative Flow

| Concept | Goal | Example |
|---------|------|---------|
| Temporal Pacing | Ensures the editing rhythm is engaging and guides the audience logically toward the conclusion. | "The video's tempo of the cuts accelerates in the last two minutes of run time." |
| Eye tracking / Intershot continuity | Maintains continuity of sightlines to prevent visual disorientation across edits. Ensures spatial relationships and action flow seamlessly between consecutive shots. | "The video's edit maintains continuity of sightlines." OR "The video displays spatial relationships that flow between consecutive shots, avoiding visual disorientation." |
| Transitions between shots | Confirms transitions are intentionally selected and aesthetically appropriate to the video's tone. | "The video employs dissolves to transition between each shot." |
| Match cuts, jump cuts | Ensures continuity is maintained by linking similar visual elements and avoiding jarring, unintentional edits. | "The video edits utilizes a match cut to visually link the sun to the tennis ball." |
| Captions | Ensures accessibility and clear delivery of information that may be visually or audibly conveyed in text. | "The video includes closed captions matching the audio dialogue." OR "Each caption segment of the video remains on screen for a minimum of 1.5 seconds and a maximum of 4.0 seconds." |
| Sequential logic | Confirms the narrative maintains chronological and causal consistency, providing a clear and coherent message flow. | "The video edit depicts the ball being thrown before the dog running into the field." |

### Key Takeaway

For video rubrics, consider all dimensions from technical specs to narrative flow. Always include ± tolerances for measurable values like duration, frame rate, and file size.

---

## Formatting Criteria Examples

Please feel free to use all of the criteria that apply to your task!

### Excel / Spreadsheet Criteria

1. Creates a [Type of Deliverable] in a spreadsheet format (.xslx).
2. Titles the spreadsheet [Name mentioned in the prompt (if any)].
3. The first letter of each noun and verb is capitalized in spreadsheet titles.
4. The first letter of the first word is capitalized in spreadsheet titles.
5. The first letter of each noun and verb is capitalized for each tab name in the spreadsheet.
6. The first letter of the first word is capitalized for each tab name in the spreadsheet.
7. Each title in the spreadsheet is bold.
8. All text in the spreadsheet is in the same font or font style.
9. [XYZ important data] is highlighted in the spreadsheet.
10. All text is fully displayed in the spreadsheet.
11. The spreadsheet uses text wrapping in each cell.
12. Text does not overflow cells in the spreadsheet.
13. Text is not clipped in the spreadsheet.
14. The spreadsheet contains no Error fields.
15. In the spreadsheet, Row 1 contains at least one of the following: Titles, groupings, OR categories.
16. In the spreadsheet, Column A contains at least one of the following: Titles, groupings, OR categories.
17. Every other row or column in the spreadsheet has one color of shading.
18. Column A and Row 1 have the darkest shading in the spreadsheet.
19. Uses consistent formatting across all tabs in the spreadsheet.
20. All numbers are rounded to [X.XX] in the spreadsheet.
21. All columns [with the exception of the first] in the spreadsheet have the same width.
22. Text in columns [B-X] are right aligned in the spreadsheet.
23. Text in column [A] is left aligned in the spreadsheet.

### Word Document Criteria

1. Creates a [Type of Deliverable] in a Word Document.
2. The Word document has [X] Sections.
3. The Word document is titled [XYZ].
4. The first letter of each noun and verb is capitalized in the title and each section of the Word document.
5. The first letter of the first word is capitalized in the title and each section of the Word document.
6. Each title in the document is bolded.
7. Uses consistent formatting throughout the Word document.
8. Uses consistent bulleting and bullet formatting throughout the Word document.
9. Uses consistent spacing between sections throughout the Word document.
10. Section headers in the Word document are at least 1 font size bigger than the paragraph fonts.
11. All text in the Word document is in the same font or font style.
12. All text in the Word document is colored [black].

### Key Takeaway

These are template criteria you can adapt to your specific task. Replace the bracketed placeholders with the specific values relevant to your rubric.

---

# PART 2: PROMPT WRITING INSTRUCTIONS

## Step 1: Choose a Task Relevant to Your Professional Domain

From the available tasks, select one that is tied to a specific occupation and sector that you have expertise in.

### Selection Criteria

- Is tied to a **specific occupation + sector**
- Matches your **credible expertise**, so you can add realistic nuance and constraints

### Example Selection (Used Throughout This Guide)

- **Occupation:** Administrative Services Managers
- **Sector:** Government

---

## Step 2: Review Job Description

Once you select a task, review the job description to understand the role context.

### Example Job Description

**Occupation:** Administrative Services Managers  
**Sector:** Government

Plan, direct, or coordinate one or more administrative services of an organization, such as records and information management, mail distribution, and other office support services.

---

## Step 3: Select the Workflow Type

Select your workflow based on the type of deliverable you'll be creating.

### Workflow Types

| Workflow | Description |
|----------|-------------|
| Document | Word documents, PDFs, memos, reports |
| Spreadsheet | Excel files, data analysis, calculations |
| Audio | Sound editing, mixing, production |
| Video | Video editing, production |
| Presentation | PowerPoint, slide decks |
| Code | Programming, scripts, applications |
| Image/CAD | Design files, technical drawings |
| Multimodal | Combination of multiple deliverable types |

---

## Step 4: Prompt Requirements

Your prompt must include these five elements:

### Element A: Role
Assign a specific professional persona with skin in the game. Define hierarchy, audience, and stakes.

**Example:**
"You are a Government Administrative Operations Lead who manages records and coordinates office support services for a city department."

### Element B: Scenario
Describe the realistic professional context that sets up the task.

**Example:**
"Your department is implementing a new blight remediation program that leverages volunteer assistance to clean up blighted properties across the city."

### Element C: Constraints
Explicit "must nots," resource limitations, and style rules that create realistic tradeoffs.

**Example:**
"Do not schedule any cleanup events on federal holidays. Budget is limited to $5,000 per month for supplies."

### Element D: Deliverables
Specifically define the output format, audience, and quality bar.

**Example:**
"Create a detailed PDF memo (2-3 pages) outlining the volunteer coordination schedule for Q1 2026, including property assignments and supply requirements."

### Element E: Input Files
Reference any attached files that provide context or data.

**Example:**
"Attached is the sample blight remediation schedule template for reference."

---

## Step 5: Quality Checklist

Before submitting, verify your prompt meets all requirements:

### Core Attributes (ALL REQUIRED)

- [ ] **Unambiguous:** The primary task is clear and specific
- [ ] **Professional Role & Context:** A specific professional role is assigned with clear stakes
- [ ] **Realistic (Not Contrived):** The scenario plausibly occurs in real professional work
- [ ] **Timeless (Relative Dating):** The scenario defines its own internal "current date"
- [ ] **Clear Ask:** The required deliverable is explicitly defined
- [ ] **Clear Constraints:** Real-world constraints are explicitly stated
- [ ] **Possible to Solve:** A competent professional could complete the task with the given inputs

### Model Failure Modes (AT LEAST ONE REQUIRED)

- [ ] **Extraction Failure:** Hallucination, omission, or misinterpretation of input data
- [ ] **Reasoning Failure:** Dependency collapse, constraint violation, or invalid inference
- [ ] **Formatting/Deliverable Failure:** Wrong format, structure mismatch, or hard-coded outputs

---

# ═══════════════════════════════════════════════════════════════════════════
# SECTION B: EDUCATIONAL COURSE
# Learning modules for understanding concepts before applying instructions
# ═══════════════════════════════════════════════════════════════════════════

---

# PART 1: PROMPT WRITING COURSE

## Module 1: The "Knowledge Work" Gap

### Overview

Understanding why AI models struggle with professional work — and how Beet prompts help solve this.

### Essential Context

AI models have become exceptionally good at verifiable, discrete tasks:
- Fact-checking
- Simple coding
- Summarizing short texts

However, real-world professional work involves **long-horizon reasoning** and **nuanced taste** — areas where current models are far from succeeding.

Professional domains (like Law, Medicine, Finance, and Engineering) don't just require "answers"; they require navigating complex sequences of logic, managing conflicting constraints, and interpreting messy input files with a specific professional judgment.

In this section, we are tackling the critical first step of solving this problem: **Writing realistic "Beet" Prompts.**

### The Gap at a Glance

**What AI Does Well (Discrete, verifiable tasks):**
- Fact-checking
- Simple coding
- Summarizing

**Professional Reality (Complex judgment & expertise):**
- Long-horizon reasoning
- Nuanced taste
- Conflicting constraints
- Multi-step logic

### The "70% Failure" Rule

By generating prompts that induce failure modes and are representative of real world tasks, we create the high-value training data necessary to teach AI models how to actually perform professional work.

The two hardest skills for a prompt writer are gaining an intuition for how a model fails and how to make it harder without making it longer.

### The Quality Bar is Unforgiving

Quality is not just "important" in Project Beet — **it is the entire product**. The bar for acceptance is extremely high.

1. **If it feels easy to write** — it will likely be easy for the model to solve — not useful data.
2. **Do not skim.** — Fellows who don't read every word fail the assessment.
3. **You're engineering professional scenarios.** — Take your time.

---

## Module 2: Unpacking the Prompt

### The 6 Core Attributes of a Beet 2.0 Prompt

#### Attribute 1: Unambiguous

**Definition:** The prompt avoids vague terms and is generally pretty prescriptive of what needs to be done as long as it resembles realistic asks of a professional.

**Why it matters:** In professional domains, "interpret it how you want" is a failure. We need to grade these models. If the prompt is vague, we cannot distinguish between a model failure (it couldn't do the math) and a prompt failure (the ask was never clear).

**Examples:**

| Context | Bad | Good |
|---------|-----|------|
| Financial Analysis | "Analyze Verizon's free cash flow using EBIT." | "Calculate Unlevered Free Cash Flow using EBIT NOPAT... using the provided 10-K extractions... Assume a tax rate of 28.80%." |
| Nurse Scheduling | "Create a schedule for the hospital using the attached surgeon requests." | "Create a M-F schedule... ORs function 24/7 but surgeons prefer 6am-4pm... The hospital has 4 dedicated trauma ORs." |
| Semiconductor Risk | "Analyze the risk of the ETF based on the provided spreadsheets." | "Quantify the ETF's vulnerability to the six scenarios in the 'Policy_Shocks' tab... Report portfolio return impact as a percent (two decimals)." |
| Legal Review | "Review this contract for any red flags regarding the agency." | "Flag any 'Mother Agency' clauses... She wants to ensure she isn't stuck with the wrong agency if... it's not the right fit." |

#### Attribute 2: Professional Role & Context

**Definition:** The prompt assigns a specific "Persona" with skin in the game. It defines the hierarchy, the audience, and the stakes of the task.

**Why it matters:** The Professional Role is critical because it tells the model exactly what standard to meet (e.g, "Senior VP" analyzes risk differently than a "Junior Assistant."). Context is equally important because it mimics the reality of professional world tasks.

**Examples:**

| Context | Bad | Good |
|---------|-----|------|
| Pharma / Clinical | "You are an AI assistant helping with drug data." | "You are a Clinical Pharmacology Lead at a biopharmaceutical sponsor. The program team requires an interim PK/PD review... to prepare for an internal governance meeting." |
| Concierge | "Plan a trip to Istanbul for a rich client." | "You are the Chief of Staff for an ultra-high net worth individual... who exited his last venture for over $1 billion... you need to ensure every moment is handled with white glove service." |
| Audio Engineering | "Mix this song so it sounds good." | "You are a mixing engineer working with a film studio on a diegetic song in a major motion picture... The director has requested aggressive T-Pain style auto-tune." |
| Govt Admin | "Summarize these articles about AI in government." | "You are an Administrative Operations Lead in a government department... There is a strategic goal to expand automation... Create a scan to guide strategic planning." |

#### Attribute 3: Realistic & NOT Contrived

**Definition:** The prompt mimics the messy, dense, and unpolished nature of real-world artifacts (emails, memos, slack messages). It avoids "AI-speak."

**Why it matters:** We are training models to replace or assist workers in reality, not in a lab. Real work doesn't come with perfectly nested bullet points or "E.g." hints.

**Examples:**

| Context | Bad | Good |
|---------|-----|------|
| Finance / Salary | "Please calculate the following: 1. (E.g. Salary). 2. (E.g. Taxes). Please format as a table." | "Apollo Braun profile: Annual salary $99,604.08... Started working June 1... 12% of Net Pay directed to investment... Create an excel spreadsheet..." |
| Legal | "Translate this modeling contract into a recipe for cookies to explain it to me." | "Please provide a professionally-written, clear and concise email to your client... no longer than 600 words... addressing issues she should look out for." |
| Engineering | "Task: Look at the file. Step 1: Make a 3D model. Step 2: Make a list." | "Your biggest client has sent a 2D drawing... Your job is to (a) Create a 3D part... (b) Select the fastener that fits exactly." |
| Govt / Services | "Write a fake report about blight." | "Historically, cleanup crews have faced challenges in blight remediation due to understaffing... Volunteers have expressed a desire to assist... Please draft a PDF memo." |

#### Attribute 4: Timelessness (Relative Dating)

**Definition:** The prompt establishes a "Current Date" within the scenario logic, rather than relying on the actual calendar date or "current events" that will age out.

**Why it matters:** If a prompt says "Today is Tuesday," it might be false when the model is tested next year. We must anchor the model in a specific time within the prompt.

**Examples:**

| Context | Bad | Good |
|---------|-----|------|
| Retail Planning | "Plan the sales for next month (October 2023)." | "It is September 2024. You have been tasked with leading the 2024 Black Friday event... Create an 8-week preparation plan." |
| Real Estate | "Find houses for sale right now." | "It is June 24, 2025... Select homes to show this weekend... The buyers are only in town for 2 days." |
| Concierge | "Plan a trip for next summer." | "The first day is June 1... Day 2 is June 2... Day 3 is June 3, the wedding day." |
| Supply Chain | "Check if we are out of stock today." | "It is September 25, 2023... Review how set shipments are trending... Determine if current OH inventory is sufficient." |

#### Attribute 5: Clear Deliverable

**Definition:** Specifically defining the Output Format, Audience, and Quality Bar. The model shouldn't have to guess if you want a PDF, a CSV, or a Python script.

**Why it matters:** The format is often part of the work. A Python script is useless to a CEO who asked for a PowerPoint.

**Examples:**

| Context | Bad | Good |
|---------|-----|------|
| Data Analysis | "Give me the data." | "Create an Excel workbook named SemiETF_PolicyRisk.xlsx with exactly five tabs, in exactly this order: Holdings_Clean, Exposure_By_Region..." |
| Design / CAD | "Make a 3D file." | "Save it as a step file with the name 'coverplate.step'... List the number, radius, and length in a separate excel file." |
| Marketing | "Make a presentation." | "Design a modern PDF presentation deck (approx 15-18 slides)... Each slide should focus on a core service category." |
| Journalism | "Write a story." | "Write a pitch (no more than 1,000 words)... Propose a working headline... Offer a tentative timeline." |

#### Attribute 6: Clear Constraints

**Definition:** Explicit "Must Nots," resource limitations, and style rules. These are the guardrails that make the task difficult.

**Why it matters:** Constraints force the model to trade off between conflicting goals (e.g., speed vs. accuracy, or politeness vs. brevity).

**Examples:**

| Context | Bad | Good |
|---------|-----|------|
| Finance | "Make a spreadsheet for the investment." | "The tables should be dynamic with no hardcoded cells... If a number cannot be traced to the spreadsheet output, it must not be stated." |
| Nurse Scheduling | "Schedule the surgeries." | "The hospital tries to prioritize trauma readiness... maximize weekday utilization... ER has mentioned a mass casualty event." |
| Audio | "Auto-tune the vocals." | "The director has specifically requested an aggressive and clearly audible auto-tune effect... similar to T-Pain." |
| Inventory | "Order more stock." | "Do not plan receipts under $10k per month in stores or under $6k per month in e-commerce." |

### The 3 Model Failure Modes

#### A. Extraction Failures (The "Blind Spot")

The model fails to pull correct data from input files. Real-world files are messy, and models often struggle to differentiate between "noise" and "signal."

- **Hallucination:** The model invents data that isn't in the file to fill a gap (e.g., making up a 'Country of Origin' because the cell was blank).
- **Omission:** The model misses a critical detail buried in a large document (e.g., ignoring a footnote in a PDF that changes the tax rate).
- **Misinterpretation:** The model reads the data but misunderstands the context (e.g., treating a 'Projected 2026' column as 'Actual 2025' data).

#### B. Reasoning Failures (The "Logic Break")

The model has the right data but does the wrong thing with it. It fails to connect the dots or follow a complex chain of logic.

- **Dependency Collapse:** The model solves Step 1 correctly but forgets that Step 2 depends on the result of Step 1, leading to a cascading error.
- **Constraint Violation:** The model ignores a negative constraint (e.g., 'Do not schedule overtime') because it is trying too hard to satisfy a positive constraint (e.g., 'Finish the project by Friday').
- **Invalid Inference:** The model makes a logical leap that is factually or professionally unsound (e.g., assuming 'Revenue' equals 'Profit' without checking for expenses).

#### C. Formatting & Deliverable Failures (The "Professional Gap")

In knowledge work, how you deliver the answer is often as important as the answer itself.

- **Wrong Output Format:** You asked for a downloadable .csv file, and it gave you a text table in the chat window.
- **Structure Mismatch:** You asked for a 'Memo with an Executive Summary,' and it gave you a casual email.
- **Formula Stagnation:** You asked for a 'dynamic Excel spreadsheet with active formulas,' and it gave you a sheet with hard-coded numbers (static values).

### Good Traps vs. Bad Traps

The goal is to create realistic failure opportunities, not artificial puzzles.

| Scenario | Bad Trap | Why It's Bad | Good Trap | Why It's Good |
|----------|----------|--------------|-----------|---------------|
| Nurse Manager | "Pretend 'Dr. Kamal' is named 'Dr. Smith' and hours are only 50 minutes long." | It tests "Simon Says" skills, not nursing logic. | "Schedule elective surgeries... However, the ER has declared a mass casualty event, and you must strictly maintain 4 Trauma ORs open 24/7." | Forces the model to prioritize constraints like a real manager. |
| Investment Advisor | "Calculate the ROI, but do not count any money invested on a Tuesday." | This is a riddle. No financial advisor works like this. | "Apollo's annual salary is $99,604. But he started working on June 1st. Calculate his 2023 investment potential." | The trap is realizing June 1st means he only earned ~58% of that salary. |
| Semiconductor Analyst | "Ignore the third tab in the Excel sheet for no reason." | It trains the model to ignore data without a valid reason. | "Calculate the exposure. Note: Some holdings in the 'Holdings' tab do not map to the 'Country_Exposure' tab." | Real data is messy. The model must realize some rows don't match. |
| Pharmacology Lead | "If the patient ID ends in '5', treat their dosage as double." | This is a "game," not pharmacology. | "Identify outliers. One patient shows a baseline PD level of 7.5% (normal is <1%). Discuss if this is a confounder." | Tests domain knowledge. |
| Audio Engineer | "Make the song sound like the color blue." | It's purely subjective and ungradable. | "Apply aggressive T-Pain style auto-tune, but ensure the vocal still blends naturally with the acoustic guitar." | Forces the model to balance two opposing technical goals. |

---

## Module 3: Beet 2.0 Prompt Validation Checklist

### Core Attributes (ALL REQUIRED)

If any Core Attribute is missing, the prompt must be revised.

#### 1. Unambiguous
- The primary task is clear and specific
- A professional would not need to ask clarifying questions
- Ambiguity, if present, reflects real-world messiness—not missing instructions
- The prompt allows reviewers to clearly distinguish model failure from prompt failure

#### 2. Professional Role & Context
- A specific professional role is assigned
- The role implies a standard of judgment (seniority matters)
- The audience and stakeholders are clear
- The task has real professional stakes

#### 3. Realistic (Not Contrived)
- The scenario plausibly occurs in real professional work
- Language mirrors real emails, memos, briefs, or instructions
- Artifacts referenced (files, layouts, contracts, spreadsheets) are realistic
- The prompt does not rely on puzzles, tricks, or artificial rules

#### 4. Timeless (Relative Dating)
- The scenario defines its own internal "current date" or timeline
- The task does not depend on the model's real-world current date
- Dates and time references are internally consistent

#### 5. Clear Ask
- The required deliverable is explicitly defined
- The output format is specified (memo, spreadsheet, PDF, plan, etc.)
- The intended audience and quality bar are clear
- The model does not need to guess how the work should be delivered

#### 6. Clear Constraints
- Real-world constraints are explicitly stated
- Constraints create tradeoffs that require judgment
- "Must not" constraints are clear where relevant
- Constraints are professional—not arbitrary or gimmicky

#### 7. Possible to Solve
- A competent human professional could complete the task with the given inputs
- No missing files, hidden rules, or secret logic
- Required domain knowledge matches the assigned role

### Model Failure Modes (AT LEAST ONE REQUIRED)

A prompt is not a Beet prompt until it reliably induces one or more of these.

#### A. Extraction Failure
- Hallucination: invents data to fill gaps
- Omission: misses critical information buried in the input
- Misinterpretation: reads data but applies it incorrectly (e.g., projections treated as actuals)

#### B. Reasoning Failure
- Dependency collapse: later steps ignore earlier results
- Constraint violation: ignores a "must not" to satisfy another goal
- Invalid inference: draws conclusions that are logically or professionally unsound

#### C. Formatting / Deliverable Failure
- Wrong output format
- Structural mismatch (memo vs email, static vs dynamic)
- Hard-coded or non-functional outputs where dynamic ones are required

### Litmus Test

A prompt qualifies as Beet 2.0 only if:
- It satisfies **every Core Attribute**
- It causes the model to fail via **at least one defined Failure Mode**

**⚠️ If the model output is perfect, the prompt has failed.**

---

# PART 2: RUBRICS COURSE

## Module 1: Rubric Introduction

### Overview

Understanding how rubrics power AI training and why generalizable evaluation matters.

### Essential Context

As AI models move beyond verifiable, discrete tasks and into real-world reasoning tasks, evaluation becomes more complex. For many professional tasks, a response cannot be graded with a simple right/wrong check.

In expert domains, quality depends on multiple dimensions. A response might be factually correct but incomplete, well-written but unsafe, or persuasive but poorly reasoned. That is why evaluation requires **nuanced, multi-criteria judgment**, similar to how people assess work in real jobs.

You will see this across the domains in this project: medicine, customer support, law, music production, finance, computer science, sales, and more. In these contexts, "good enough" is rarely binary. It is a combination of **accuracy, completeness, reasoning, clarity, tone, safety, and task fit**.

In this section, you will learn the most challenging part of Project Beet 2.0: **how to use rubrics to evaluate complex work consistently.**

### The "Generalizable Rubric" Rule

When writing rubrics for a prompt, the goal is to ensure that the rubric can accurately evaluate **any future response**, whether human-generated or model-generated.

This means your rubric should not grade only the specific response you had in mind. If there are other valid responses that fulfill what the prompt is requesting, your rubric should still evaluate them appropriately.

### How Are Rubrics Used in AI Training?

In Project Beet 2.0, rubrics are used to **grade any future response** to a prompt. A rubric is a **collection of criteria** that collectively define what a **good response** is to a specific prompt, now and in the future.

#### What is a criterion?

Each criterion you create includes:

1. **Criterion:** A binary true/false statement that measures something about the expected response.
2. **Weight:** A score from -100 to 100 that evaluates how important that criterion is.
3. **Category:** What aspect of the deliverable the criterion measures (Instruction Following, Reasoning, Extraction, Formatting).
4. **Rationale:** Your explanation for why the criterion exists and why it matters to evaluate.
5. **Implicit or Explicit:** Whether the criterion measures something explicitly asked for in the prompt, or something implied that requires expert judgment.

*Note: On Project Beet, the average rubric had over 90 items.*

### The Rubric Judge (Judge Models)

Once you have created your rubric, future responses to the prompt will be evaluated using a **judge model**.

You can think of a judge model as a very simple AI that does only three things:

1. **Reads one criterion** — The single criterion being evaluated
2. **Reads the deliverable** — The model's output/response
3. **Decides whether the criterion is true or false** based on what it sees in the deliverable

The judge model repeats these steps for every criterion until it reaches the end of the rubric.

#### Important Constraint

The judge model evaluates these in **isolation**:
- It does not read **the prompt**
- It does not read **input files**
- It does not read **other criteria**
- It does not have access to **the Internet**

This constraint is extremely important to remember when writing criteria. Understanding it will help you avoid many common errors.

### The AI Model Training Process

Once a high-quality prompt and rubric is created, they can be provided to an AI model to guide and improve its output through the following process:

1. **Strong Foundations:** You have a strong prompt and a strong rubric.
2. **Mass Generation:** The prompt is given to a model, which generates thousands of responses.
3. **Automated Evaluation:** The judge model evaluates every response using your rubric.
4. **Comparative Ranking:** Responses are grouped into "better" and "worse" based on their rubric scores.
5. **Training Signal:** The ranked data provides a reward signal that reinforces good behavior and discourages bad behavior in future model iterations.

---

## Module 2: Anatomy of a Rubric

### Overview

Break down each component of a rubric, how to write it, and the common mistakes to avoid.

Each rubric item includes:
- Criterion
- Weight
- Category
- Rationale
- Implicit or Explicit

### Section 2A: Criterion

**Definition:** A criterion is a binary statement that can be evaluated as true or false. It measures one component of the expected response.

#### How to determine what criteria to write

1. **Start with an outline or mock version of the deliverable:** Create a detailed outline of the expected prompt response, including the content you expect in the final deliverable.

2. **Add the essential criteria first:** Decompose your prompt. What must be present for the response to be correct? These are explicit asks—requirements that must be included for correctness.

3. **Add additional criteria:** After essentials, consider what makes the response complete and usable. What enriches the answer? What makes the answer polished?

4. **Step back and assess your rubric as a whole:** Ask yourself—does this set of criteria comprehensively evaluate what an ideal future response will look like?

#### General guidelines for a good criterion

**1. Atomic:** Each criterion should measure one specific aspect of the deliverable at a time. Do not bundle multiple requirements into a single check.

- ✅ Good: "The itinerary includes San Francisco as one of the cities in the travel plan."
- ❌ Bad: "The itinerary includes San Francisco and Seattle as cities to travel to." (Measures two things)

**2. Self-contained:** The judge only sees the deliverable and the criterion—nothing else. Include any necessary context inside the criterion so it can be evaluated as true/false without outside knowledge.

- ✅ Good: "The M&A report states that Beet Corp's valuation is $97.56 Billion USD."
- ❌ Bad: "The M&A report states Beet Corp's valuation from the company analysis input file." (Judge model does not read input files)

**3. Unambiguous:** Write criteria in plain, direct language so they can be interpreted in only one way. Minimize subjective wording.

- ✅ Good: "The product specification document states the download feature allows users to download rubrics from the platform."
- ❌ Bad: "The document correctly defines the download feature." ("Correctly defines" is ambiguous)

#### How to write strong criteria

- Use a consistent sentence structure so criteria are easy to write and easy to evaluate
- Reference the deliverable explicitly in every criterion
- Keep criteria short enough to parse quickly, but complete enough to stand alone

**Template A — Deliverable-based:** "The [deliverable] [states/includes/contains] [specific observable detail]."

**Template B — Asset-in-deliverable-based:** "The [asset] in the [deliverable] [states/includes] [specific observable detail]."

### Section 2B: Weight

**Definition:** Weight is a score from -100 to +100 that represents how much a criterion should matter relative to other criteria in the same rubric.

#### The Core Rule

Weights must reflect **relative importance** within this prompt and this deliverable.

- The main ask dominates the score
- Supporting details matter, but don't outweigh the main ask
- Nice-to-haves don't distort evaluation
- Major mistakes can be penalized with negative weights

#### Weight Ranges & Examples

**80–100: Core Requirements (Non-negotiable)**
Essential to meeting the prompt. If it fails, the deliverable has a critical error.

**50–70: Complete & Usable (Secondary requirements)**
Strongly affects completeness or decision usefulness, but still secondary to the main ask.

**30–50: Quality Differentiators (Helpful, not required)**
Improves clarity or ease of use, but the deliverable still counts without them.

**10–30: Nice-to-Haves (Polish & convenience)**
Adds polish or convenience, but should not meaningfully affect whether the deliverable is accepted.

**Negative: Penalties for Mistakes (Score reducers)**
Larger negatives for core instruction violations. Smaller negatives for wrong-but-not-catastrophic mistakes.

**Required Guideline:** Include at least **5 negatively weighted criteria** in your rubric to check for egregious mistakes.

### Section 2C: Category

**Definition:** The Category labels what aspect of the output a criterion is evaluating. Choose **one category per criterion**.

#### The Four Categories

1. **Instruction Following:** If the criterion is about doing what the prompt asked
2. **Reasoning:** If the criterion is about logic, correct application, or calculations
3. **Extraction:** If the criterion is about pulling facts from input files or the web
4. **Formatting:** If the criterion is about structure, layout, and presentation

**Note:** Use Extraction when the prompt requires pulling facts from input files or the web (not the prompt itself). Not every rubric will include Extraction criteria.

**Note:** Include at least 5 formatting criteria in your rubric.

### Section 2D: Rationale

**Definition:** Rationale explains why the criterion exists and why it matters to evaluate. This helps both the reviewer and the client understand your justification for including it.

#### A good rationale should explain:

1. What quality or requirement the criterion protects
2. Why it matters for a good professional deliverable
3. What could go wrong if it is not evaluated

#### Example

**Criterion:** "The Last Will and Testament indicates that David T. Nguyen will take the estate only if they survive the testator."

- ❌ Bad: "cuz david is the spouse" (Ambiguous, unprofessional)
- ❌ Bad: "Since david is her husband, he should get the estate if she passes" (Rationalizes the content, not the criterion)
- ✅ Good: "This criterion ensures The Will correctly identifies David T. Nguyen as the spouse and captures the survivorship condition, which is required for the primary beneficiary clause to function as intended."

**Important:** Always remember we are not rationalizing the response, but the criteria item!

### Section 2E: Implicit vs Explicit

**Definition:** Tag each criterion as Implicit or Explicit to clarify where the requirement comes from.

- **Explicit:** The criterion measures something **specifically asked for** in the prompt.
- **Implicit:** The criterion measures elements that are **not explicitly stated** in the prompt, require **domain-specific judgment**, or function as **intermediate steps** toward satisfying an explicit request.

#### Example

**Prompt:** "Using the files sent in by the client, prepare a 1040 tax return with all the appropriate schedules in PDF format."

- **Explicit Criterion:** "The 1040 tax return package is in PDF format." (The prompt specifically says "in PDF format.")
- **Implicit Criterion:** "The 1040 tax return package includes Schedule A." (Whether Schedule A is required depends on interpreting the client's input files.)

---

## Module 3: Rubric Errors

### Overview

There are many common pitfalls in rubric writing. If you keep the judge model's limitations in mind, you can avoid most of them.

### 5 General Rubric Errors (Criteria-level issues)

#### Error 1: Ambiguous

A criterion is ambiguous when a judge model can't reliably mark it True/False from the deliverable because it uses subjective language, undefined standards, or fuzzy thresholds.

**How to detect:**
- Look for subjective adjectives: good, strong, well-written, clear, professional, appropriate, thorough, compelling, polished, correct
- Look for undefined standards: "industry-standard," "best practices," "proper," "high quality"
- Look for fuzzy quantifiers: "enough," "adequate," "detailed," "concise," "reasonable"
- Quick test: Could two reasonable reviewers disagree while reading the same output? If yes → likely ambiguous.

**How to fix:** Replace subjective words with observable artifacts (sections, headings, specific required statements, counts, or clearly defined thresholds).

#### Error 2: Not Self-Contained

A criterion is not self-contained when it relies on information outside the criterion + deliverable (e.g., prompt text, input files, URLs, or other rubric items).

**How to detect:**
- Look for references like: "from the prompt," "from the input file," "from the spreadsheet"
- Look for pronouns that require context: "this," "that," "the above," "the following"
- Quick test: If you only showed someone the criterion + deliverable, could they judge it? If no → not self-contained.

**How to fix:** Include the needed reference inside the criterion (e.g., the specific number, list of allowed items, required names).

#### Error 3: Stacked

A criterion is stacked when it measures two or more independent checks at once. Because scoring is binary, a response that satisfies half the requirement still fails the entire criterion.

**How to detect:**
- Look for "and / as well as / along with" connecting multiple requirements
- Quick test: Can a response partially satisfy this? If yes → it's stacked.

**How to fix:** Split into multiple atomic criteria, one per check.

#### Error 4: Convoluted Phrasing

A criterion has convoluted phrasing when it's longer or more complex than necessary, making it harder to interpret consistently.

**How to detect:**
- The criterion contains multiple dependent clauses
- You have to reread it to understand what is being checked
- Quick test: Can you rewrite it in 1 sentence with fewer words without losing meaning?

**How to fix:** Use a consistent template: "The [deliverable/section] [states/includes] [specific observable detail]."

#### Error 5: Process Words

A criterion uses process words when it evaluates how the deliverable was produced instead of what the deliverable contains or is. The judge model cannot see process, only the final output.

**How to detect:**
- Look for verbs like: "researched," "confirmed," "validated," "ensured," "considered," "followed," "converted," "calculated," "used"
- Quick test: Could the deliverable be correct even if we don't know how it was made? If yes → measure the deliverable, not the process.

**How to fix:** Convert process → observable output state: "The deliverable includes…" / "The deliverable states…" / "The deliverable is…"

### 5 Task, Prompt & Rubric Specific Errors (Rubric-level issues)

#### Error 6: Missing Criteria

The rubric fails to include criteria for one or more essential requirements (core prompt asks, critical failure modes, or key quality dimensions).

**How to detect:**
- Do a prompt decomposition and make a checklist of explicit must-haves. Verify each has at least one criterion.
- Run a 'bad-but-polished' thought experiment: Could a deliverable omit a core requirement and still score high?

**How to fix:** Start from a mock deliverable outline and ensure each major section/requirement is represented by at least one criterion.

#### Error 7: Criteria Inaccurate

A criterion is inaccurate when it measures something that should not be required for an ideal solution—because it's not asked in the prompt, not justified as a domain-implied requirement, or it contradicts the prompt/goal.

**How to detect:**
- Traceability test: Can you point to a prompt line that requires this?
- 'Correct-but-fails' test: Can you imagine a high-quality deliverable that satisfies the prompt but fails this criterion?

**How to fix:** Remove the requirement, or rewrite it as an optional low-weight polish item.

#### Error 8: Restrictive

A criterion is restrictive when it overfits to a narrow version of the 'right answer,' making the rubric fail the Generalizable Rubric rule.

**How to detect:**
- Look for exactness where the prompt allows flexibility: exact word counts, exact number of bullets, exact ordering
- 'Paraphrase test': If the deliverable uses synonyms or a different but equivalent structure, would this criterion incorrectly fail?

**How to fix:** Replace exact constraints with checks for the underlying requirement (presence of required elements).

#### Error 9: Inaccurate Weighting

A rubric has inaccurate weighting when weights don't reflect relative importance for the prompt and deliverable.

**How to detect:**
- Pairwise test: If two responses differ only on this criterion, should that decide the winner?
- Coverage balance test: Do 'nice-to-haves' collectively outweigh core requirements?

**How to fix:** Re-anchor the rubric: assign 80–100 to true core requirements, 10–30 to polish, and reserve strong negatives for catastrophic failures.

#### Error 10: Incorrect Implicit/Explicit Label

The Implicit/Explicit label is incorrect when it does not align with whether the requirement is directly stated in the prompt (Explicit) or implied by the task (Implicit).

**How to detect:**
- Traceability test: Can you point to a sentence in the prompt that directly states the requirement? Yes → Explicit. No → Implicit.

**How to fix:** Map each criterion to a specific statement or request in the prompt. If it isn't explicitly stated, it is likely implicit.

---

## Module 4: Rubric Checklist

### Overview

Use this comprehensive checklist to validate every rubric item before submission.

### A. Criterion Statement Quality

- [ ] Atomic: Does it measure only one thing?
- [ ] Binary: Can it be judged clearly as true or false?
- [ ] Self-contained: Could a judge evaluate it using only the deliverable (no prompt, no inputs, no other criteria)?
- [ ] Unambiguous: Does it avoid vague words like "good," "correct," "well-written," "appropriate"?
- [ ] No stacking: If there are multiple requirements, did you split them into multiple criteria?
- [ ] No process words: Are you measuring the final output, not a process (for example "converted," "calculated correctly," "documented accurately")?

### B. Wording and Referencing

- [ ] Uses a consistent template: Deliverable-based or asset-in-deliverable-based.
- [ ] References the deliverable semantically: "the audit plan," "the payroll template," not "the PDF" or "the output."
- [ ] Quotes used only when necessary: If quotes are present, does the prompt truly require exact text?

### C. Weight

- [ ] Weight matches impact: If it fails, is the penalty or loss of points proportional to the real-world consequence?
- [ ] Consistent with similar items: Criteria of similar importance have similar weights.

### D. Category

- [ ] Chosen exactly one: Instruction Following, Reasoning, Extraction, or Formatting.
- [ ] Category matches what the criterion measures.

### E. Rationale

- [ ] Explains why the criterion matters for evaluating a good response.
- [ ] Is written clearly and professionally.
- [ ] Does not just restate the prompt or provide a casual justification.

### F. Implicit vs Explicit

- [ ] Explicit if directly asked for in the prompt
- [ ] Implicit if it is implied or requires expert judgment, interpretation of inputs, or inference from intermediate steps to arrive at the explicit request.

### G. Negative Criteria (if applicable)

- [ ] The criterion is positively stated and describes a mistake you want to punish.
- [ ] If it evaluates true, it should clearly represent an egregious or common failure mode.
- [ ] Negative weight magnitude matches severity (bigger negatives for more harmful mistakes).
- [ ] Not used for minor preferences (colors, optional polish, personal style).

### H. Generalizable Rubric Rule

- [ ] Would this criterion still score alternative correct responses as correct?
- [ ] Does this criterion accidentally lock the rubric to one narrow "expected" phrasing or format?

---

# ═══════════════════════════════════════════════════════════════════════════
# END OF DOCUMENT
# ═══════════════════════════════════════════════════════════════════════════

*Last updated: February 2026*
