import { Briefcase, CheckCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const allTasks = [
  { occupation: "Medical and Health Services Managers", sector: "Health Care and Social Assistance" },
  { occupation: "Nurse Practitioners", sector: "Health Care and Social Assistance" },
  { occupation: "Registered Nurses", sector: "Health Care and Social Assistance" },
  { occupation: "Pharmacists", sector: "Retail Trade" },
  { occupation: "Child, Family, and School Social Workers", sector: "Government" },
  { occupation: "Private Detectives and Investigators", sector: "Retail Trade" },
  { occupation: "First-Line Supervisors of Police and Detectives", sector: "Government" },
  { occupation: "Lawyers", sector: "Professional, Scientific, and Technical Services" },
  { occupation: "Medical Secretaries and Administrative Assistants", sector: "Health Care and Social Assistance" },
  { occupation: "Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products", sector: "Wholesale Trade" },
  { occupation: "Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products", sector: "Wholesale Trade" },
  { occupation: "First-Line Supervisors of Retail Sales Workers", sector: "Retail Trade" },
  { occupation: "General and Operations Managers", sector: "Retail Trade" },
  { occupation: "Counter and Rental Clerks", sector: "Real Estate and Rental and Leasing" },
  { occupation: "First-Line Supervisors of Production and Operating Workers", sector: "Manufacturing" },
  { occupation: "First-Line Supervisors of Office and Administrative Support Workers", sector: "Health Care and Social Assistance" },
  { occupation: "Sales Managers", sector: "Wholesale Trade" },
  { occupation: "Concierges", sector: "Real Estate and Rental and Leasing" },
  { occupation: "Property, Real Estate, and Community Association Managers", sector: "Real Estate and Rental and Leasing" },
  { occupation: "Real Estate Brokers", sector: "Real Estate and Rental and Leasing" },
  { occupation: "Real Estate Sales Agents", sector: "Real Estate and Rental and Leasing" },
  { occupation: "Project Management Specialists", sector: "Professional, Scientific, and Technical Services" },
  { occupation: "Shipping, Receiving, and Inventory Clerks", sector: "Manufacturing" },
  { occupation: "Editors", sector: "Information" },
  { occupation: "News Analysts, Reporters, and Journalists", sector: "Information" },
  { occupation: "Administrative Services Managers", sector: "Government" },
  { occupation: "Recreation Workers", sector: "Government" },
  { occupation: "Customer Service Representatives", sector: "Finance and Insurance" },
  { occupation: "First-Line Supervisors of Non-Retail Sales Workers", sector: "Wholesale Trade" },
  { occupation: "Industrial Engineers", sector: "Manufacturing" },
  { occupation: "Mechanical Engineers", sector: "Manufacturing" },
  { occupation: "Computer and Information Systems Managers", sector: "Professional, Scientific, and Technical Services" },
  { occupation: "Software Developers", sector: "Professional, Scientific, and Technical Services" },
  { occupation: "Audio and Video Technicians", sector: "Information" },
  { occupation: "Film and Video Editors", sector: "Information" },
  { occupation: "Producers and Directors", sector: "Information" },
  { occupation: "Accountants and Auditors", sector: "Professional, Scientific, and Technical Services" },
  { occupation: "Buyers and Purchasing Agents", sector: "Manufacturing" },
  { occupation: "Compliance Officers", sector: "Government" },
  { occupation: "Financial and Investment Analysts", sector: "Finance and Insurance" },
  { occupation: "Financial Managers", sector: "Finance and Insurance" },
  { occupation: "Personal Financial Advisors", sector: "Finance and Insurance" },
  { occupation: "Securities, Commodities, and Financial Services Sales Agents", sector: "Finance and Insurance" },
  { occupation: "Order Clerks", sector: "Wholesale Trade" },
];

// Highlighted example task
const highlightedTask = { occupation: "Administrative Services Managers", sector: "Government" };

// Filter out the highlighted task from the main list
const otherTasks = allTasks.filter(
  t => t.occupation !== highlightedTask.occupation
);

// Get unique sectors for grouping display
const sectorColors: Record<string, string> = {
  "Government": "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
  "Health Care and Social Assistance": "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/30",
  "Retail Trade": "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30",
  "Professional, Scientific, and Technical Services": "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
  "Wholesale Trade": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  "Real Estate and Rental and Leasing": "bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/30",
  "Manufacturing": "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  "Information": "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  "Finance and Insurance": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
};

const ChooseTaskSection = () => {
  return (
    <div className="space-y-8">
      {/* What is a Prompt? */}
      <div className="p-5 rounded-xl bg-muted/50 border border-border">
        <h3 className="text-lg font-bold text-foreground mb-2">What is a Prompt?</h3>
        <p className="text-foreground leading-relaxed">
          In Beet 2.0, a prompt is a request that mimics a real-world task or request that will be given to a professional in your respective domain.
        </p>
      </div>

      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 1: Choose a Task Relevant to Your Professional Domain</h3>
            <p className="text-base text-foreground leading-relaxed">
              From the available tasks, select one that is tied to a specific occupation and sector that you have expertise in.
            </p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground">Selection Criteria</h4>
        <div className="p-5 rounded-xl bg-card border border-border">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">Is tied to a <strong>specific occupation + sector</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">Matches your <strong>credible expertise</strong>, so you can add realistic nuance and constraints</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Highlighted Example */}
      <div className="rounded-2xl border-2 border-primary bg-primary/5 overflow-hidden shadow-lg">
        <div className="p-4 bg-primary/10 border-b border-primary/20 flex items-center gap-2">
          <Star className="w-5 h-5 text-primary fill-primary" />
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Example Selection (Used Throughout This Guide)
          </p>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-xl bg-card border-2 border-primary/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Occupation</p>
              <p className="text-foreground font-bold text-lg">{highlightedTask.occupation}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border-2 border-primary/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sector</p>
              <p className="text-foreground font-bold text-lg">{highlightedTask.sector}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Task List */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Beet 2.0 Occupations and Sectors
          </p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-card sticky top-0 z-10 shadow-sm">
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-bold text-foreground uppercase tracking-wider w-1/2 bg-card">
                  Occupation
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-foreground uppercase tracking-wider w-1/2 bg-card">
                  Sector
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {otherTasks.map((task, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground font-medium align-top">
                    {task.occupation}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-xs font-medium border inline-block",
                      sectorColors[task.sector] || "bg-muted text-muted-foreground"
                    )}>
                      {task.sector}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-muted/30 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Scroll to see all {allTasks.length} available occupations
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseTaskSection;
