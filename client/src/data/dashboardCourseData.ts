export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  resourceUrl?: string;
  content?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export const dashboardCourseData: Chapter[] = [
  {
    id: "introduction",
    title: "Introduction to ServiceTitan Dashboards",
    lessons: [
      {
        id: "welcome",
        title: "👋 Welcome to the TV Dashboard Automation Course",
        description: "Overview of the course and what you'll learn about automating ServiceTitan dashboards.",
        videoUrl: "/attached_assets/Dashboard Course_1761236537264.mp4",
        content: "Welcome to the DIY ServiceTitan Dashboards course! In this comprehensive course, you'll learn how to create automated TV dashboards that display your ServiceTitan data in real-time."
      },
      {
        id: "before-you-begin",
        title: "📊 Before You Begin: A Quick Note About Dashboarding with ServiceTitan",
        description: "Important concepts and prerequisites before starting your dashboard journey.",
        content: `<p>There are <strong>many ways to connect to ServiceTitan data</strong> and build dashboards &mdash; some involve APIs, middleware, or advanced reporting tools.</p>

<p>What you're about to learn is the <strong>lowest-code, most DIY-friendly</strong> method available.&nbsp;</p>

<p>It uses tools you likely already have &mdash; Gmail, Google Sheets, Zapier, and Looker Studio.</p>

<p>💡 <em>Don't get discouraged if it feels like a lot at first.</em> Once you get this initial setup dialed in, <strong>adding new reports and dashboards becomes fast and easy</strong>.</p>

<p>You've got this &mdash; and I'll walk you through every step.&nbsp;</p>

<p>Let's get started!</p>`
      },
      {
        id: "workflow-overview",
        title: "➡️ Workflow Overview",
        description: "Understanding the complete workflow from ServiceTitan to your TV dashboard.",
        content: `<p>This lesson provides a high-level overview of how data flows from ServiceTitan through various tools to your final TV dashboard.</p>
<img src="/attached_assets/ServiceTitan_Report_1761237313582.png" alt="Workflow Overview Diagram" class="w-full max-w-3xl mx-auto my-6 rounded-lg shadow-lg" />`
      },
      {
        id: "create-schedule-report",
        title: "🗓️ Create & Schedule your ServiceTitan Report",
        description: "Step-by-step guide to creating and scheduling automated reports in ServiceTitan.",
        content: `<p>Learn how to set up automated reports in ServiceTitan that will feed data to your dashboard automatically.</p>

<p style="text-align: center;"><strong>This walkthrough guide allows you to see each individual click💥</strong></p>

<p>
        <iframe src="https://app.tango.us/app/embed/5de81e74-ffd1-4685-a4c5-39339d609df2" style="width: 100%; height: 640px; border: none;" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="1) Create and Schedule the ServiceTitan Report" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""> </iframe>
</p>`
      },
      {
        id: "import-to-sheets",
        title: "🗳️ Import the ServiceTitan Report to Google Sheets",
        description: "How to automatically import your ServiceTitan reports into Google Sheets.",
        content: `<p>Set up the integration between ServiceTitan reports and Google Sheets for seamless data flow.</p>

<p>
        <iframe src="https://app.tango.us/app/embed/ee01e776-ca12-4b98-ab34-401b82b78246" style="width: 100%; height: 640px; border: none;" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="2) Import the ServiceTitan Report to Google Sheets" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""> </iframe>
</p>`
      },
      {
        id: "gmail-filter",
        title: "📧 Creating a Filter/Label in Gmail",
        description: "Configure Gmail filters to organize your ServiceTitan report emails.",
        content: `<p>Learn how to create Gmail filters and labels to automatically organize incoming ServiceTitan reports.</p>

<p>
        <iframe src="https://app.tango.us/app/embed/b57aa3bf-df61-4ea7-bd4b-747dc417ac83" style="width: 100%; height: 640px; border: none;" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="3) Creating a Filter/Label in Gmail" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""> </iframe>
</p>`
      },
      {
        id: "creating-zap",
        title: "⚡️ Creating the Zap",
        description: "Build your Zapier automation to connect ServiceTitan, Gmail, and Google Sheets.",
        content: `<p>Step-by-step walkthrough of creating the Zapier automation that powers your dashboard data flow.</p>

<p>
        <iframe src="https://app.tango.us/app/embed/b707444d-939f-40e2-b8a8-f24f21741bfa" style="width: 100%; height: 640px; border: none;" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="4) Creating the Zap" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""> </iframe>
</p>`
      },
      {
        id: "why-two-sheets",
        title: "🧠 Why Do We Use Two Google Sheets?",
        description: "Understanding the two-sheet architecture for reliable dashboard updates.",
        content: `<p>Learn the reasoning behind using two separate Google Sheets and how it ensures data integrity.</p>

<p>To keep this system reliable and flexible, we use a <strong>two-sheet setup</strong>:</p>

<ol>
        <li><strong>Sheet 1:</strong> This is the file that gets <em>automatically replaced every 15 minutes</em> by Zapier. It's the raw data dump from ServiceTitan.</li>
        <li><strong>Sheet 2:</strong> This is our <em>"TV Dashboard Feed"</em> — the one we connect to Looker Studio. It references the first sheet but doesn't get overwritten.</li>
</ol>

<p><strong>Why it matters:</strong></p>

<ul>
        <li>✅ We only need <em>one stable connection</em> to Looker Studio (which makes it fast and less error-prone)</li>
        <li>✅ We can build custom formulas, filters, or formatting in our feed sheet — and those changes won't get erased</li>
        <li>✅ This setup makes it super easy to scale: you can reference <em>multiple raw data files</em> if needed</li>
</ul>

<p>It might sound a little technical now — but once you see it in action, it'll click.</p>

<p>Let's keep moving!</p>`
      },
      {
        id: "loom-two-sheets",
        title: "🎥 Loom Video on the 2 Google Sheets",
        description: "Visual demonstration of the two-sheet system in action.",
        content: `<div style="position: relative; padding-bottom: 59.8669623059867%; height: 0;">
        <iframe src="https://www.loom.com/embed/b31b7d6ab50c4b2f882b8d00de499ab6?sid=66a7fdd9-3de4-4e5b-8aee-956dea2c21e0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>`
      },
      {
        id: "tv-dashboard-feed",
        title: "📺 Creating the TV Dashboard Feed - the 2nd Google Sheet",
        description: "Setting up the second Google Sheet that feeds your TV dashboard.",
        content: `<p>
        <iframe src="https://app.tango.us/app/embed/3674234a-5b5b-4161-8329-7363e5fd1f08" style="width: 100%; height: 640px; border: none;" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="5) Creating the TV Dashboard Feed" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""> </iframe>
</p>`
      },
      {
        id: "dashboard-template",
        title: "📊 Dashboard Template",
        description: "Access and customize the pre-built dashboard template.",
        content: `<p style="text-align: center;"><span style="font-size: 36px;">Dashboard Template</span></p>

<p style="text-align: center;">👉 <a href="https://lookerstudio.google.com/reporting/69e01907-bc29-420f-9d0b-12accfd503a6/page/3s4FF/copy" rel="noopener noreferrer" target="_blank">https://lookerstudio.google.com/reporting/69e01907-bc29-420f-9d0b-12accfd503a6/page/3s4FF/copy</a></p>

<p>
        <a href="https://lookerstudio.google.com/reporting/69e01907-bc29-420f-9d0b-12accfd503a6/page/3s4FF/copy" rel="noopener noreferrer" target="_blank"><img src="https://files.cdn.thinkific.com/file_uploads/1072722/images/09d/c1f/d8d/Untitled_design_%2832%29.png" style="width: 817px;" class="fr-fic fr-dib" srcset="https://files.cdn.thinkific.com/file_uploads/1072722/images/09d/c1f/d8d/Untitled_design_%2832%29.png?width=1920 1x, https://files.cdn.thinkific.com/file_uploads/1072722/images/09d/c1f/d8d/Untitled_design_%2832%29.png?width=1920&dpr=2 2x, https://files.cdn.thinkific.com/file_uploads/1072722/images/09d/c1f/d8d/Untitled_design_%2832%29.png?width=1920&dpr=3 3x"></a>
        <br>
</p>`,
        resourceUrl: "https://lookerstudio.google.com/reporting/69e01907-bc29-420f-9d0b-12accfd503a6/page/3s4FF/copy"
      },
      {
        id: "first-metric",
        title: "📁 Creating the Report and the First Metric",
        description: "Build your first dashboard metric in Google Data Studio (Looker Studio).",
        content: `<p>
        <iframe src="https://app.tango.us/app/embed/14e40fc6-1fea-4a5b-9e48-7ba26c711da5" style="width: 100%; height: 640px; border: none;" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="6) Creating the Report and the first metric" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""> </iframe>
</p>`
      },
      {
        id: "customizing-dashboard",
        title: "🎨 Customizing Google Data Studio Dashboards",
        description: "Advanced customization techniques for professional-looking dashboards.",
        content: `<div style="position: relative; padding-bottom: 62.93706293706294%; height: 0;">
        <iframe src="https://www.loom.com/embed/44d14b4c99db4332900b1e8e1c7a4a8b?sid=c8373163-e273-4300-b91a-6abc7ec5fa24" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>`
      },
      {
        id: "questions-help",
        title: "💬 Questions or Need Help?",
        description: "How to get support and connect with the community.",
        content: `<p style="text-align: center;">Feel free to contact me directly!</p>

<p style="text-align: center;"><strong>Bill@st-hacks.com</strong></p>`
      }
    ]
  },
  {
    id: "common-questions",
    title: "Common Questions with Answers",
    lessons: [
      {
        id: "fix-totals-row",
        title: "🔧 Fixing the Totals Row Issue in ServiceTitan Reports",
        description: "Troubleshooting guide for fixing the totals row display in ServiceTitan reports.",
        videoUrl: "https://www.youtube.com/embed/example15",
        content: "Learn how to resolve common issues with the totals row in ServiceTitan reports that can affect your dashboard accuracy."
      }
    ]
  }
];

export function getTotalLessons(): number {
  return dashboardCourseData.reduce((total, chapter) => total + chapter.lessons.length, 0);
}

export function getLesson(chapterId: string, lessonId: string): { chapter: Chapter; lesson: Lesson } | null {
  const chapter = dashboardCourseData.find(ch => ch.id === chapterId);
  if (!chapter) return null;
  
  const lesson = chapter.lessons.find(l => l.id === lessonId);
  if (!lesson) return null;
  
  return { chapter, lesson };
}

export function getNextLesson(currentChapterId: string, currentLessonId: string): { chapterId: string; lessonId: string } | null {
  const chapterIndex = dashboardCourseData.findIndex(ch => ch.id === currentChapterId);
  if (chapterIndex === -1) return null;
  
  const chapter = dashboardCourseData[chapterIndex];
  const lessonIndex = chapter.lessons.findIndex(l => l.id === currentLessonId);
  
  if (lessonIndex === -1) return null;
  
  // Check if there's a next lesson in current chapter
  if (lessonIndex < chapter.lessons.length - 1) {
    return {
      chapterId: currentChapterId,
      lessonId: chapter.lessons[lessonIndex + 1].id
    };
  }
  
  // Check if there's a next chapter
  if (chapterIndex < dashboardCourseData.length - 1) {
    const nextChapter = dashboardCourseData[chapterIndex + 1];
    if (nextChapter.lessons.length > 0) {
      return {
        chapterId: nextChapter.id,
        lessonId: nextChapter.lessons[0].id
      };
    }
  }
  
  return null;
}

export function getPreviousLesson(currentChapterId: string, currentLessonId: string): { chapterId: string; lessonId: string } | null {
  const chapterIndex = dashboardCourseData.findIndex(ch => ch.id === currentChapterId);
  if (chapterIndex === -1) return null;
  
  const chapter = dashboardCourseData[chapterIndex];
  const lessonIndex = chapter.lessons.findIndex(l => l.id === currentLessonId);
  
  if (lessonIndex === -1) return null;
  
  // Check if there's a previous lesson in current chapter
  if (lessonIndex > 0) {
    return {
      chapterId: currentChapterId,
      lessonId: chapter.lessons[lessonIndex - 1].id
    };
  }
  
  // Check if there's a previous chapter
  if (chapterIndex > 0) {
    const prevChapter = dashboardCourseData[chapterIndex - 1];
    if (prevChapter.lessons.length > 0) {
      return {
        chapterId: prevChapter.id,
        lessonId: prevChapter.lessons[prevChapter.lessons.length - 1].id
      };
    }
  }
  
  return null;
}
