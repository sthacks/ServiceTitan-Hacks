import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Sparkles, AlertCircle, Download } from "lucide-react";
import titleBg from "@assets/title-background.png";

export default function FixUglyFormsCourse() {
  const tools = [
    "A Zapier account",
    "Access to ServiceTitan's API through Zapier",
    "An OpenAI account (we'll use GPT-4o Mini for speed and accuracy)",
  ];

  const bestUseCases = [
    "Install checklists",
    "Post-job summaries",
    "Service evaluations",
  ];

  const formattingTips = [
    "Bullet points make scanning faster",
    "Bold important keywords or amounts",
    "Use ✅ or other visual markers for action items",
    "Keep paragraphs short and clean",
  ];

  const troubleshootingChecklist = [
    "Is your test form fully filled out?",
    "Are the form fields showing up in Zapier?",
    "Does your AI output look as expected?",
    "Is the note posting to the right job or project?",
    "Are line breaks or special formatting being lost?",
  ];

  const expansionIdeas = [
    "Create versions for service checklists, install reports, or feedback forms",
    "Adjust the AI prompt to match the tone of each form type",
    "Use job tags or form names to trigger different formatting logic",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Fix Your Ugly Forms Course"
        description="Transform messy form submissions into polished job notes using ChatGPT and Zapier. Streamline your documentation process and save time."
        keywords="ServiceTitan forms, AI automation, Zapier integration, ChatGPT, job notes"
        canonicalUrl="https://servicetitanhacks.com/fix-ugly-forms-course"
        ogImage="https://servicetitanhacks.com/og-fix-ugly-forms.png"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #09090b 0%, #1a1b20 100%)' }}
          />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4" data-testid="badge-course">AI Automation Course</Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                Fix Ugly Forms: Auto-Clean Job Notes with AI
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transform messy form submissions into polished job notes using ChatGPT and Zapier. Streamline your documentation process and save time.
              </p>
            </div>
          </div>
        </section>

        {/* What This Does Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <Card>
              <CardHeader>
                <h2 className="text-3xl font-bold font-heading">What This Automation Does (And Why It Matters)</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">The Problem:</h3>
                  <p className="text-muted-foreground">
                    Most forms submitted in ServiceTitan are stored as PDFs—hard to read, not searchable, and often ignored.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">The Solution:</h3>
                  <p className="mb-3">We'll use Zapier + ChatGPT to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Trigger automation from a submitted ServiceTitan form</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Clean up spelling and formatting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Convert the form data into a structured job note</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Upload it directly into the job for quick reference</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Why it matters:</h3>
                  <p className="font-semibold">
                    Clear notes save time, prevent miscommunication, and eliminate the need to dig through PDFs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tools Needed Section */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">🛠️ Tools You'll Need: ServiceTitan, Zapier, OpenAI</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-6 font-semibold">Let's get our toolbox ready. Here's what you need to build this automation:</p>
                <ul className="space-y-3">
                  {tools.map((tool, idx) => (
                    <li key={idx} className="flex items-start gap-3" data-testid={`tool-${idx}`}>
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-muted-foreground">
                  We'll show you how to connect each piece and offer recommendations on the best setup for reliability and performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Understanding Limitations */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <Card className="border-amber-500/20 bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                  <h2 className="text-2xl font-bold font-heading">Understanding ServiceTitan Form Limitations</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold">Important Limitation You Need to Know:</p>
                <p>ServiceTitan does <em>not</em> send blank form fields through Zapier. That means:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-500">•</span>
                    <span>If a field was left unanswered, it won't appear in your Zap data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-500">•</span>
                    <span>Conditional fields that didn't trigger won't be visible</span>
                  </li>
                </ul>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg mt-4">
                  <p className="font-semibold">What You Should Do:</p>
                  <p className="mt-2">
                    When preparing your test form, make sure <strong>every field is answered</strong>, including all conditionals. This step is crucial so your AI formatting step has all the info it needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Choosing the Right Form */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Choosing the Right Form for This</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>Not all forms are created equal. For this automation to be useful, the form should:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Contain structured information (not long open-ended essays)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Be consistently used in your workflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Include relevant tech or job data (e.g., install details, checklists, or summaries)</span>
                  </li>
                </ul>

                <div className="bg-primary/10 p-4 rounded-lg mt-6">
                  <p className="font-semibold mb-2">Best Use Cases:</p>
                  <ul className="space-y-1 ml-4">
                    {bestUseCases.map((useCase, idx) => (
                      <li key={idx}>• {useCase}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-muted-foreground">Forms used by technicians in the field tend to be the best candidates.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Submit Complete Test Form */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">How to Submit a Fully Completed Test Form</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Why a Complete Sample Matters</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Zapier only pulls in data from fields that were filled out. That's why you need a complete form to use during setup.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Steps to Follow:</p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Choose a job in ServiceTitan</li>
                    <li>Open the form you want to use</li>
                    <li>Fill in <em>every</em> field — even conditional ones</li>
                    <li>Submit the form</li>
                    <li>Save the Job ID to use in Zapier testing</li>
                  </ol>
                </div>

                <p className="text-muted-foreground italic">
                  This will ensure all data fields are available when building your automation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fill Every Field */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <Card className="border-primary/20">
              <CardHeader>
                <h2 className="text-2xl font-bold font-heading">Why You Must Fill In Every Field (Including Conditionals)</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold">No Placeholders? No Problem — If You Plan Ahead</p>
                <p>ServiceTitan only sends what's visible and filled. That means:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Blank fields are dropped</li>
                  <li>• Hidden conditional fields are ignored</li>
                </ul>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold mb-2">The Fix:</p>
                  <p>
                    Make sure you answer every single field when submitting your test form — yes, even the ones that normally stay hidden unless triggered.
                  </p>
                  <p className="mt-2">
                    This ensures your Zap sees the full structure of your form data and allows you to design a complete, reliable automation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Setting the Trigger */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">⚡ Setting the Trigger: New Form Submission in ServiceTitan</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Time to Build the Zap!</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Start by setting the trigger that kicks everything off: a new form submission in ServiceTitan.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Steps:</p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>In Zapier, choose ServiceTitan as the app</li>
                    <li>Select <strong>New Form Submission</strong> as the trigger event</li>
                    <li>Connect your ServiceTitan account</li>
                    <li>Choose the form you want to automate</li>
                    <li>Use the test form you submitted earlier to pull in sample data</li>
                  </ol>
                </div>

                <p className="text-muted-foreground italic">
                  This is the foundation of your automation. Without the sample data, the rest of the steps won't work.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pulling Form Data */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Pulling in Form Data (and Why You Need a Complete Sample)</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Verify Your Sample Data</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Once your test form is pulled in, take a close look at the data fields Zapier shows.</p>
                
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Key Tip:</p>
                  <p>If a question or answer is missing, it likely means it wasn't filled out or visible in your original test.</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Double Check:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Do all expected units (questions/answers) show up?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Are the field labels and responses what you expect?</span>
                    </li>
                  </ul>
                </div>

                <p className="text-muted-foreground italic">
                  If not, go back and submit a more complete form. You can't build a reliable automation on partial data.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Structuring Data */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Structuring the Data for AI (Units Name + Value Format)</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Make the Data Easy for AI to Read</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To get the best results from ChatGPT, you need to organize the form data into a consistent, readable format.</p>
                
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <p className="font-semibold mb-2 font-sans">Recommended Layout:</p>
                  <pre className="whitespace-pre-wrap">
Unit 0 Name
Unit 0 Value

Unit 1 Name
Unit 1 Value

Unit 2 Name
Unit 2 Value
...
                  </pre>
                </div>

                <div>
                  <p className="font-semibold mb-2">How to Build This:</p>
                  <p>
                    Use a <strong>Formatter &gt; Text</strong> step in Zapier or write your own structure in a <strong>Code</strong> or <strong>Text</strong> step. Keep line breaks clean and avoid adding extra punctuation.
                  </p>
                </div>

                <p className="text-muted-foreground italic">
                  This structure is what you'll feed into ChatGPT in the next step.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Download Template */}
        <section className="py-16 bg-primary text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Download className="h-8 w-8" />
              <h2 className="text-3xl font-bold font-heading">Download the Zap Template</h2>
            </div>
            <p className="text-xl mb-6 text-gray-200">
              Get started faster with our pre-built Zapier template
            </p>
            <a 
              href="https://zapier.com/shared/5e2464f7083f12bec2378432807bffed1f18abb7" 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid="link-zap-template"
            >
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20">
                Download Zap Template
              </Button>
            </a>
          </div>
        </section>

        {/* ChatGPT Step */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">
              <Sparkles className="inline h-8 w-8 text-primary mr-2" />
              Setting Up the ChatGPT Step in Zapier
            </h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Now We Add the AI!</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>In this step, you'll send your structured form data to ChatGPT using Zapier.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Steps:</p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Add a new <strong>OpenAI (ChatGPT)</strong> action step</li>
                    <li>Choose the <strong>Conversation</strong> or <strong>Send Prompt</strong> action</li>
                    <li>Use the structured form text you created in the last lesson as the input</li>
                    <li>Choose a reliable model — we recommend GPT-4o (Mini)</li>
                  </ol>
                </div>

                <p className="text-muted-foreground italic">
                  You're now telling the AI: "Here's the data. Make it clean, clear, and readable."
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Writing the Prompt */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Writing the Prompt to Format Notes, Fix Grammar, and Add Highlights</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">This Is Where the Magic Happens</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>The prompt you write here is what tells ChatGPT how to handle your form data.</p>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold mb-3">Recommended Prompt Starter:</p>
                  <div className="bg-muted p-4 rounded font-mono text-sm">
                    <p>Take the following form responses and:</p>
                    <ul className="mt-2 space-y-1">
                      <li>- Fix any spelling or grammar mistakes</li>
                      <li>- Format into bullet points</li>
                      <li>- Bold any dollar amounts</li>
                      <li>- Highlight technician action items as ✅ Action Item (in green if possible)</li>
                    </ul>
                  </div>
                </div>

                <p className="text-muted-foreground italic">
                  Test and tweak until you get output that looks the way you want. This is the "secret sauce" that turns your automation into a true upgrade.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Creating Job Note */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">
              <FileText className="inline h-8 w-8 text-primary mr-2" />
              Creating the Job or Project Note
            </h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Where the Magic Lands</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Now that your form data has been cleaned and formatted by ChatGPT, it's time to send it back into ServiceTitan.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Steps:</p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Add a new <strong>ServiceTitan</strong> action in Zapier</li>
                    <li>Choose <strong>Create Job Note</strong> or <strong>Create Project Note</strong> (depending on your workflow)</li>
                    <li>Map the formatted output from ChatGPT into the note body</li>
                    <li>Use the Job ID from the original trigger to ensure it's linked to the right job</li>
                  </ol>
                </div>

                <p className="text-muted-foreground italic">
                  You'll now have a clear, readable note directly inside the job, automatically.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mapping Output */}
        <section className="py-16 bg-muted">
          <div className="mx-au max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Mapping the Formatted Output Back into ServiceTitan</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Keep It Clean and Clear</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>This step ensures that your beautifully formatted note makes it into ServiceTitan the way you intended.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Tips:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Preserve <strong>line breaks</strong> and <strong>bullet points</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Wrap currency values in <code className="bg-muted px-1 rounded">&lt;b&gt;$amount&lt;/b&gt;</code> if you want bold formatting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Make sure the job ID or project ID is correctly mapped</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>If using a rich text field, test formatting behavior (bold, bullets, checkmarks)</span>
                    </li>
                  </ul>
                </div>

                <p className="text-muted-foreground italic">
                  Preview your note in a test job before going live to make sure everything looks perfect.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testing Workflow */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Testing the Workflow from End to End</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Time to See It in Action</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Before turning this automation on, run a complete test to verify every piece is working.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Test Steps:</p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Submit a real form in ServiceTitan</li>
                    <li>Watch it trigger your Zap</li>
                    <li>Review the AI's formatted output</li>
                    <li>Confirm the note is added to the correct job or project</li>
                  </ol>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Final Check:</p>
                  <ul className="space-y-1">
                    <li>✓ Does the note look clean?</li>
                    <li>✓ Is everything spelled correctly?</li>
                    <li>✓ Are action items clearly marked?</li>
                  </ul>
                </div>

                <p className="text-lg font-semibold text-primary">
                  Once it all looks good — you're ready to go live.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Formatting Tips */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Making Notes Easy to Scan and Search</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Write Notes Your Team Will Actually Read</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>The whole goal of this automation is to make job notes faster to read and easier to understand. Use formatting intentionally.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-3">Formatting Tips:</p>
                  <ul className="space-y-2">
                    {formattingTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold">Bonus:</p>
                  <p>Clean formatting makes it easier to <strong>search</strong> in ServiceTitan when reviewing job history.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Troubleshooting Common Issues</h2>
            <Card className="border-amber-500/20 bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                  <h3 className="text-xl font-semibold">Running Into Problems? Here's What to Check</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>If your automation isn't working as expected, don't panic. Start by checking these areas:</p>
                
                <div className="bg-background p-4 rounded-lg">
                  <p className="font-semibold mb-3">Checklist:</p>
                  <ul className="space-y-2">
                    {troubleshootingChecklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-muted-foreground italic">
                  99% of issues come down to sample data, prompt structure, or field mapping.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Pro Tips for Expanding This Automation to Other Forms</h2>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Scale Your Automation Across the Business</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Once you've built one of these automations, it's easy to duplicate and adjust it for other forms in your workflow.</p>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold mb-3">Ideas for Expansion:</p>
                  <ul className="space-y-2">
                    {expansionIdeas.map((idea, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{idea}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-lg font-semibold text-primary mt-6">
                  You've built the engine — now apply it anywhere consistent, clean notes are needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">💬 Questions or need help?</h2>
            <p className="text-xl mb-6">Feel free to contact me directly!</p>
            <a href="/contact" data-testid="link-contact-course">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20">
                Bill@st-hacks.com
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
