import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Upload, FileSpreadsheet, Mail, AlertCircle, X, Search } from "lucide-react";
import { Link } from "wouter";

const MAX_SIZE_BYTES = 40 * 1024 * 1024; // 40 MB (Resend attachment limit)
const ALLOWED_EXTS = [".xlsx", ".xls"];
const ALLOWED_MIME = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function OverhaulUpload() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string => {
    const ext = "." + f.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) return "Only .xlsx and .xls files are accepted.";
    if (f.size > MAX_SIZE_BYTES) return `File is too large. Maximum size is 40 MB.`;
    return "";
  };

  const handleFile = (f: File) => {
    const err = validateFile(f);
    setFileError(err);
    if (!err) setFile(f);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, []);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const removeFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!file) {
      setSubmitError("Please attach your pricebook file.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("notes", notes);
      formData.append("file", file);

      const res = await fetch("/api/pricebook-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed.");
      setSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please email bill@st-hacks.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <SEO title="Pricebook Received | ServiceTitan Hacks" description="" canonicalUrl="https://servicetitanhacks.com/overhaul-upload" />
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="text-center max-w-lg">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Got it. Check your email for confirmation.
            </h1>
            <p className="text-zinc-400 leading-relaxed mb-3">
              I'll send your rewritten pricebook back within 72 hours. Usually faster.
            </p>
            <p className="text-zinc-500 text-sm mb-8">
              Questions? Reply to the confirmation email anytime.
            </p>
            <Link href="/overhaul-status">
              <Button variant="outline" size="sm" className="gap-2" data-testid="link-track-order">
                <Search className="h-3 w-3" />
                Track Your Order Status
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <SEO
        title="Upload Your Pricebook | ServiceTitan Pricebook Overhaul"
        description="Upload your ServiceTitan pricebook Excel file. We'll rewrite every description in plain homeowner-friendly language and return it within 72 hours."
        canonicalUrl="https://servicetitanhacks.com/overhaul-upload"
      />
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-black text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
              You're In. Welcome aboard.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Your ServiceTitan Pricebook Overhaul is reserved. Let's get your file uploaded.
            </p>
          </div>
        </section>

        {/* ── Steps + Form ─────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-2xl px-6">

            {/* Step 1 */}
            <div className="flex gap-5 mb-10">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm mt-0.5">
                1
              </div>
              <div>
                <h2 className="text-xl font-semibold font-heading mb-2">
                  Export your pricebook from ServiceTitan
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  In ServiceTitan, go to <span className="text-white font-medium">Pricebook → Export → Full Pricebook</span>. Save the file as Excel (.xlsx).
                </p>
                <a href="mailto:bill@st-hacks.com?subject=Help%20exporting%20pricebook" className="text-sm text-primary hover:underline">
                  Need help? Email bill@st-hacks.com
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-5 mb-10">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm mt-0.5">
                2
              </div>
              <div className="w-full">
                <h2 className="text-xl font-semibold font-heading mb-2">
                  Upload your file below
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Drop your Excel file in the box below or click to browse.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white text-sm font-medium">
                      Email you used at checkout
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-primary"
                      data-testid="input-email"
                      required
                    />
                    <p className="text-xs text-zinc-500">We use this to match your file to your order.</p>
                  </div>

                  {/* File drop zone */}
                  <div className="space-y-2">
                    <Label className="text-white text-sm font-medium">Your pricebook file</Label>

                    {!file ? (
                      <div
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                          relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                          ${dragging
                            ? "border-primary bg-primary/5"
                            : "border-zinc-700 bg-zinc-950 hover:border-zinc-500"}
                        `}
                        data-testid="dropzone-file"
                      >
                        <Upload className="h-8 w-8 mx-auto mb-3 text-zinc-500" />
                        <p className="text-zinc-300 text-sm font-medium mb-1">
                          Drop your Excel file here, or click to browse
                        </p>
                        <p className="text-zinc-600 text-xs">.xlsx or .xls — max 40 MB</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                          onChange={onInputChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          data-testid="input-file"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4">
                        <FileSpreadsheet className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{file.name}</p>
                          <p className="text-zinc-500 text-xs">{formatSize(file.size)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-zinc-500 hover:text-white transition-colors flex-shrink-0"
                          data-testid="button-remove-file"
                          aria-label="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {fileError}
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-white text-sm font-medium">
                      Anything I should know about your pricebook?{" "}
                      <span className="text-zinc-500 font-normal">(optional)</span>
                    </Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={e => setNotes(e.target.value.slice(0, 500))}
                      placeholder="e.g. We have HVAC, plumbing, and electrical items mixed in. Please keep the category names as-is."
                      rows={4}
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-primary resize-none"
                      data-testid="textarea-notes"
                    />
                    <p className="text-xs text-zinc-600 text-right">{notes.length}/500</p>
                  </div>

                  {/* Error */}
                  {submitError && (
                    <div className="flex items-start gap-3 bg-red-950/50 border border-red-800 rounded-lg px-4 py-3 text-sm text-red-300">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      {submitError}
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base"
                    disabled={submitting || !!fileError}
                    data-testid="button-submit"
                  >
                    {submitting ? "Sending..." : "Submit My Pricebook"}
                  </Button>

                  <p className="text-xs text-zinc-600 text-center">
                    By submitting you confirm this is your ServiceTitan pricebook file.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
