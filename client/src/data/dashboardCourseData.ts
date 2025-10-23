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
        videoUrl: "https://www.youtube.com/embed/example8",
        content: "Learn the reasoning behind using two separate Google Sheets and how it ensures data integrity."
      },
      {
        id: "loom-two-sheets",
        title: "🎥 Loom Video on the 2 Google Sheets",
        description: "Visual demonstration of the two-sheet system in action.",
        videoUrl: "https://www.youtube.com/embed/example9",
        content: "Watch a detailed walkthrough showing how the two-sheet system works in practice."
      },
      {
        id: "tv-dashboard-feed",
        title: "📺 Creating the TV Dashboard Feed - the 2nd Google Sheet",
        description: "Setting up the second Google Sheet that feeds your TV dashboard.",
        videoUrl: "https://www.youtube.com/embed/example10",
        content: "Create the second Google Sheet that will serve as the data source for your visual dashboard."
      },
      {
        id: "dashboard-template",
        title: "📊 Dashboard Template",
        description: "Access and customize the pre-built dashboard template.",
        videoUrl: "https://www.youtube.com/embed/example11",
        content: "Get started quickly with our pre-built dashboard template designed for ServiceTitan data.",
        resourceUrl: "#"
      },
      {
        id: "first-metric",
        title: "📁 Creating the Report and the First Metric",
        description: "Build your first dashboard metric in Google Data Studio (Looker Studio).",
        videoUrl: "https://www.youtube.com/embed/example12",
        content: "Create your first dashboard metric and learn the fundamentals of Google Data Studio visualization."
      },
      {
        id: "customizing-dashboard",
        title: "🎨 Customizing Google Data Studio Dashboards",
        description: "Advanced customization techniques for professional-looking dashboards.",
        videoUrl: "https://www.youtube.com/embed/example13",
        content: "Make your dashboard look professional with custom colors, layouts, and branding."
      },
      {
        id: "questions-help",
        title: "💬 Questions or Need Help?",
        description: "How to get support and connect with the community.",
        videoUrl: "https://www.youtube.com/embed/example14",
        content: "Learn how to get help, ask questions, and connect with other students in the community."
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
