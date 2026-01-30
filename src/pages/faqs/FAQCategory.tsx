import { useParams } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import Callout from "@/components/Callout";
import PageNavigation from "@/components/PageNavigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categoryTitles: Record<string, string> = {
  "category-1": "FAQ Category 1",
  "category-2": "FAQ Category 2",
  "category-3": "FAQ Category 3",
  "category-4": "FAQ Category 4",
};

const FAQCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryTitle = categoryTitles[categoryId || ""] || "FAQ Category";
  const categoryNumber = parseInt(categoryId?.replace("category-", "") || "1");

  const prevCategory = categoryNumber > 1 ? categoryNumber - 1 : null;
  const nextCategory = categoryNumber < 4 ? categoryNumber + 1 : null;

  const faqs = [
    {
      question: "Placeholder: FAQ Question 1?",
      answer: "Placeholder: Add answer to question 1. Include detailed explanation here.",
    },
    {
      question: "Placeholder: FAQ Question 2?",
      answer: "Placeholder: Add answer to question 2. Include detailed explanation here.",
    },
    {
      question: "Placeholder: FAQ Question 3?",
      answer: "Placeholder: Add answer to question 3. Include detailed explanation here.",
    },
    {
      question: "Placeholder: FAQ Question 4?",
      answer: "Placeholder: Add answer to question 4. Include detailed explanation here.",
    },
    {
      question: "Placeholder: FAQ Question 5?",
      answer: "Placeholder: Add answer to question 5. Include detailed explanation here.",
    },
  ];

  return (
    <div>
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold mb-2">{categoryTitle}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Placeholder: Add description for this FAQ category.
      </p>

      <Callout type="note" title="Can't Find Your Answer?">
        Placeholder: Add instructions for getting additional help if question isn't covered.
      </Callout>

      <div className="mt-6">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <PageNavigation
        previousPage={
          prevCategory
            ? { title: `FAQ Category ${prevCategory}`, href: `/faqs/category-${prevCategory}` }
            : undefined
        }
        nextPage={
          nextCategory
            ? { title: `FAQ Category ${nextCategory}`, href: `/faqs/category-${nextCategory}` }
            : undefined
        }
      />
    </div>
  );
};

export default FAQCategory;
