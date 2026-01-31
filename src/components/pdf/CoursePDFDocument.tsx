import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';

// Register fonts (using system fonts for compatibility)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf', fontWeight: 700 },
  ],
});

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  coverPage: {
    padding: 60,
    backgroundColor: '#7c3aed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 24,
    color: '#E9D5FF',
    marginBottom: 40,
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 14,
    color: '#C4B5FD',
    textAlign: 'center',
  },
  coverBadge: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 30,
  },
  coverBadgeText: {
    fontSize: 12,
    color: '#7c3aed',
    fontWeight: 'bold',
  },
  sectionPage: {
    padding: 40,
    backgroundColor: '#F5F3FF',
  },
  sectionHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#7c3aed',
  },
  sectionDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 1.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 10,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerSection: {
    fontSize: 10,
    color: '#7c3aed',
    fontWeight: 'bold',
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.7,
    marginBottom: 12,
  },
  bulletList: {
    marginLeft: 16,
    marginBottom: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 11,
    color: '#7c3aed',
    marginRight: 8,
    width: 12,
  },
  bulletText: {
    fontSize: 11,
    color: '#374151',
    flex: 1,
    lineHeight: 1.6,
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#7c3aed',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardContent: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
  },
  exampleCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  badExampleCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  exampleLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  goodLabel: {
    color: '#059669',
  },
  badLabel: {
    color: '#DC2626',
  },
  exampleText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  elementBox: {
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementNumber: {
    backgroundColor: '#7c3aed',
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  elementNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  elementName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  pageNumber: {
    fontSize: 9,
    color: '#7c3aed',
    fontWeight: 'bold',
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  highlight: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 4,
  },
  checkboxIcon: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#7c3aed',
    borderRadius: 3,
    marginRight: 10,
    marginTop: 1,
  },
  checklistText: {
    fontSize: 11,
    color: '#374151',
    flex: 1,
    lineHeight: 1.5,
  },
});

// Course content sections for the PDF
const CoursePDFDocument = () => {
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Project Beet 2.0</Text>
        <Text style={styles.coverSubtitle}>Training Course Reference Guide</Text>
        <View style={styles.coverBadge}>
          <Text style={styles.coverBadgeText}>✓ COURSE COMPLETED</Text>
        </View>
        <Text style={styles.coverDate}>Completed on {completionDate}</Text>
      </Page>

      {/* Section 1: Overview */}
      <Page size="A4" style={styles.sectionPage}>
        <Text style={styles.sectionHeader}>Section 1: Overview of Project Beet</Text>
        <Text style={styles.sectionDescription}>
          Understanding the goals and methodology of Project Beet 2.0 — training AI models to handle complex professional tasks.
        </Text>
      </Page>

      {/* Overview Content */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Overview</Text>
        </View>

        <Text style={styles.slideTitle}>What is the Goal?</Text>
        <Text style={styles.paragraph}>
          AI models are good at a lot of things; however, they struggle significantly when completing tasks that resemble professional domains — for instance, trying to create complicated financial reports or complete nuanced tax forms.
        </Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Core Objective</Text>
          <Text style={styles.cardContent}>
            The goal is to produce high-quality training data to help models improve across multiple occupations.
          </Text>
        </View>

        <Text style={styles.slideTitle}>What Will You Do?</Text>
        <Text style={styles.paragraph}>
          You will be designing tasks that you ideally would want your model to do in your job. Task design will be specific to your industry.
        </Text>
        <Text style={styles.paragraph}>
          In order for models to learn from the tasks you create, each task needs:
        </Text>
        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>A prompt / input information that instructs the model what you want it to do</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>A rubric where you are breaking down, in a systematic way, what a good response or output will be</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>3</Text>
        </View>
      </Page>

      {/* How AI Learning Works */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Overview</Text>
        </View>

        <Text style={styles.slideTitle}>How Does AI Learning Work?</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reinforcement Learning</Text>
          <Text style={styles.cardContent}>
            In AI research today, reinforcement learning is one of the primary ways models are trained to perform well on professional tasks.
          </Text>
        </View>
        <Text style={styles.paragraph}>
          The AI lab takes your prompt, runs models against it multiple times, evaluates the outputs using your rubrics, and uses those evaluations to guide the model toward better performance over time.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>4</Text>
        </View>
      </Page>

      {/* Section 2: Prompt Writing */}
      <Page size="A4" style={styles.sectionPage}>
        <Text style={styles.sectionHeader}>Section 2: Prompt Writing</Text>
        <Text style={styles.sectionDescription}>
          Master the 6 core elements of writing effective prompts that challenge AI models with realistic professional scenarios.
        </Text>
      </Page>

      {/* Good Prompt Qualities */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Prompt Writing</Text>
        </View>

        <Text style={styles.slideTitle}>What Makes a "Good" Prompt?</Text>
        <Text style={styles.paragraph}>
          A good prompt in Project Beet 2.0 must satisfy all of the following criteria:
        </Text>
        
        <View style={styles.bulletList}>
          <View style={styles.checklistItem}>
            <View style={styles.checkboxIcon} />
            <Text style={styles.checklistText}>Unambiguous task — The prompt clearly defines what the model should do</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={styles.checkboxIcon} />
            <Text style={styles.checklistText}>Professional context — The scenario represents real professional work</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={styles.checkboxIcon} />
            <Text style={styles.checklistText}>Realistic constraints — The task operates within real-world limitations</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={styles.checkboxIcon} />
            <Text style={styles.checklistText}>Clear deliverable — The expected output format is specified</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>6</Text>
        </View>
      </Page>

      {/* The 6 Core Elements */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Prompt Writing</Text>
        </View>

        <Text style={styles.slideTitle}>The 6 Core Elements of a Good Prompt</Text>
        <Text style={styles.paragraph}>
          Every prompt in Beet 2.0 should incorporate these six essential attributes:
        </Text>

        <View style={styles.elementBox}>
          <View style={styles.elementNumber}>
            <Text style={styles.elementNumberText}>1</Text>
          </View>
          <Text style={styles.elementName}>Unambiguous</Text>
        </View>
        <View style={styles.elementBox}>
          <View style={styles.elementNumber}>
            <Text style={styles.elementNumberText}>2</Text>
          </View>
          <Text style={styles.elementName}>Professional Tone & Domain Authenticity</Text>
        </View>
        <View style={styles.elementBox}>
          <View style={styles.elementNumber}>
            <Text style={styles.elementNumberText}>3</Text>
          </View>
          <Text style={styles.elementName}>Realistic & NOT Contrived</Text>
        </View>
        <View style={styles.elementBox}>
          <View style={styles.elementNumber}>
            <Text style={styles.elementNumberText}>4</Text>
          </View>
          <Text style={styles.elementName}>Timelessness</Text>
        </View>
        <View style={styles.elementBox}>
          <View style={styles.elementNumber}>
            <Text style={styles.elementNumberText}>5</Text>
          </View>
          <Text style={styles.elementName}>Clear Asks / Deliverable</Text>
        </View>
        <View style={styles.elementBox}>
          <View style={styles.elementNumber}>
            <Text style={styles.elementNumberText}>6</Text>
          </View>
          <Text style={styles.elementName}>Clear Constraints</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>7</Text>
        </View>
      </Page>

      {/* Element 1: Unambiguous */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Element #1</Text>
        </View>

        <Text style={styles.slideTitle}>Element #1 — Unambiguous</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Definition</Text>
          <Text style={styles.cardContent}>
            The prompt contains all the information needed for the task to be completed without requiring any outside research or assumptions.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Why It Matters</Text>
          <Text style={styles.cardContent}>
            AI models cannot search external databases or make phone calls. Every piece of information the model needs must be contained within the prompt itself.
          </Text>
        </View>

        <View style={styles.badExampleCard}>
          <Text style={[styles.exampleLabel, styles.badLabel]}>✗ Bad Example</Text>
          <Text style={styles.exampleText}>
            "Please review the Johnson account and prepare a summary."
          </Text>
          <Text style={[styles.exampleText, { marginTop: 6, fontStyle: 'normal', fontSize: 9 }]}>
            Issue: References external data (Johnson account) that the model cannot access.
          </Text>
        </View>

        <View style={styles.exampleCard}>
          <Text style={[styles.exampleLabel, styles.goodLabel]}>✓ Good Example</Text>
          <Text style={styles.exampleText}>
            "Review the following client data: [full data included]. Prepare a summary covering account status, recent transactions, and recommended next steps."
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>8</Text>
        </View>
      </Page>

      {/* Element 3: Realistic */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Element #3</Text>
        </View>

        <Text style={styles.slideTitle}>Element #3 — Realistic & NOT Contrived</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Definition</Text>
          <Text style={styles.cardContent}>
            A realistic prompt asks the model to perform a task that a real professional in that role would plausibly be responsible for, using outputs they could actually produce within real workflows and constraints.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          A prompt is contrived when it asks for an outcome that bypasses systems, approvals, or role boundaries, even if it sounds professional.
        </Text>

        <View style={styles.badExampleCard}>
          <Text style={[styles.exampleLabel, styles.badLabel]}>✗ Bad Example (Finance)</Text>
          <Text style={styles.exampleText}>
            "Go into Workday and modify the payroll records for three employees to adjust their salaries and tax withholdings."
          </Text>
          <Text style={[styles.exampleText, { marginTop: 6, fontStyle: 'normal', fontSize: 9 }]}>
            Issue: Finance professionals do not directly edit payroll records. Changes require HR coordination and approvals.
          </Text>
        </View>

        <View style={styles.exampleCard}>
          <Text style={[styles.exampleLabel, styles.goodLabel]}>✓ Good Example</Text>
          <Text style={styles.exampleText}>
            "Review the payroll data for three employees and prepare a spreadsheet summarizing proposed salary and tax adjustments needed to meet budget targets. Include justification and notes for HR review."
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>9</Text>
        </View>
      </Page>

      {/* Section 3: Bronze Responses */}
      <Page size="A4" style={styles.sectionPage}>
        <Text style={styles.sectionHeader}>Section 3: "Bronze" Responses</Text>
        <Text style={styles.sectionDescription}>
          Understanding what constitutes a Bronze-level response and why these baseline examples are essential for AI training.
        </Text>
      </Page>

      {/* Bronze Content */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Bronze Responses</Text>
        </View>

        <Text style={styles.slideTitle}>What is a Bronze Response?</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Definition</Text>
          <Text style={styles.cardContent}>
            A Bronze response represents the minimum acceptable quality level. It completes the core task requirements but may lack polish, depth, or optimal structure.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Bronze responses are essential for training because they help establish the baseline threshold that models must exceed to be considered successful.
        </Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Addresses the main task requirements</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>May have minor formatting or structural issues</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Demonstrates basic domain knowledge</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Would require editing before professional use</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>11</Text>
        </View>
      </Page>

      {/* Section 4: Rubrics */}
      <Page size="A4" style={styles.sectionPage}>
        <Text style={styles.sectionHeader}>Section 4: Rubrics</Text>
        <Text style={styles.sectionDescription}>
          Learn how to create effective rubrics that systematically evaluate AI responses across multiple criteria.
        </Text>
      </Page>

      {/* Rubric Basics */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Rubrics</Text>
        </View>

        <Text style={styles.slideTitle}>Understanding Rubrics</Text>
        
        <Text style={styles.paragraph}>
          A rubric is a systematic framework for evaluating AI responses. It breaks down the evaluation into specific criteria, each with defined levels of quality.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Components</Text>
          <Text style={styles.cardContent}>
            Each rubric criterion should include:
          </Text>
        </View>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>1.</Text>
            <Text style={styles.bulletText}>Category — The area being evaluated (e.g., "Technical Accuracy")</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>2.</Text>
            <Text style={styles.bulletText}>Criterion — The specific quality being measured</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>3.</Text>
            <Text style={styles.bulletText}>Weight — How important this criterion is (1-5 scale)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>4.</Text>
            <Text style={styles.bulletText}>Rationale — Why this criterion matters for the task</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>13</Text>
        </View>
      </Page>

      {/* Quick Reference */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Beet 2.0 Training Course</Text>
          <Text style={styles.headerSection}>Quick Reference</Text>
        </View>

        <Text style={styles.slideTitle}>Quick Reference Checklist</Text>
        
        <Text style={styles.paragraph}>
          Use this checklist when creating prompts and rubrics:
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prompt Checklist</Text>
          <View style={styles.bulletList}>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>All necessary information is included (unambiguous)</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>Uses professional tone and domain-appropriate language</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>Task is realistic for the specified role</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>No time-sensitive references (timeless)</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>Clear deliverable format specified</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>Constraints and limitations are defined</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rubric Checklist</Text>
          <View style={styles.bulletList}>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>Each criterion is clearly defined</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>Weights reflect relative importance</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>Rationale explains why each criterion matters</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkboxIcon} />
              <Text style={styles.checklistText}>All criteria are evaluable from the response alone</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Project Beet 2.0 Reference Guide</Text>
          <Text style={styles.pageNumber}>14</Text>
        </View>
      </Page>

      {/* Completion Page */}
      <Page size="A4" style={[styles.coverPage, { backgroundColor: '#059669' }]}>
        <Text style={styles.coverTitle}>Congratulations!</Text>
        <Text style={styles.coverSubtitle}>You've completed the Project Beet 2.0 Training Course</Text>
        <View style={[styles.coverBadge, { marginTop: 20 }]}>
          <Text style={[styles.coverBadgeText, { color: '#059669' }]}>REFERENCE GUIDE</Text>
        </View>
        <Text style={[styles.coverDate, { marginTop: 30, color: '#A7F3D0' }]}>
          Keep this document for future reference when creating prompts and rubrics.
        </Text>
      </Page>
    </Document>
  );
};

export default CoursePDFDocument;
