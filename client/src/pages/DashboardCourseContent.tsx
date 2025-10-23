import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ArrowLeft,
  BookOpen,
  Download
} from "lucide-react";
import { dashboardCourseData, getLesson, getNextLesson, getPreviousLesson, getTotalLessons } from "@/data/dashboardCourseData";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { cn } from "@/lib/utils";

export default function DashboardCourseContent() {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Parse URL to get current chapter and lesson
  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get('chapter') || dashboardCourseData[0].id;
  const lessonId = params.get('lesson') || dashboardCourseData[0].lessons[0].id;
  
  const {
    isLessonComplete,
    markLessonComplete,
    markLessonIncomplete,
    updateLastAccessed,
    getCompletionPercentage
  } = useCourseProgress();

  // Helper function to navigate to a lesson
  const navigateToLesson = (newChapterId: string, newLessonId: string) => {
    window.location.href = `/dashboard-course/content?chapter=${newChapterId}&lesson=${newLessonId}`;
  };

  const currentLesson = getLesson(chapterId, lessonId);
  const totalLessons = getTotalLessons();
  const completionPercentage = getCompletionPercentage(totalLessons);

  const lessonKey = `${chapterId}-${lessonId}`;
  const isCompleted = isLessonComplete(lessonKey);

  // Update last accessed lesson
  useEffect(() => {
    if (currentLesson) {
      updateLastAccessed(lessonKey);
    }
  }, [lessonKey]);

  const toggleCompletion = () => {
    if (isCompleted) {
      markLessonIncomplete(lessonKey);
    } else {
      markLessonComplete(lessonKey);
    }
  };

  const nextLesson = getNextLesson(chapterId, lessonId);
  const prevLesson = getPreviousLesson(chapterId, lessonId);

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
            <Link href="/dashboard-course/content">
              <Button>Back to Course</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const { chapter, lesson } = currentLesson;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Progress Bar */}
      <div className="bg-background border-b sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/dashboard-course" data-testid="link-back-to-landing">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Course Home
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
              data-testid="button-toggle-sidebar"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-80 bg-muted/30 border-r overflow-y-auto transition-transform lg:translate-x-0",
            isSidebarOpen ? "translate-x-0 fixed inset-y-0 z-30 lg:static" : "-translate-x-full lg:translate-x-0 lg:static"
          )}
          data-testid="sidebar-course-nav"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-semibold font-heading">Course Content</h2>
            </div>

            {dashboardCourseData.map((ch, chIndex) => (
              <div key={ch.id} className="mb-6">
                <h3 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">
                  Chapter {chIndex + 1}: {ch.title}
                </h3>
                <div className="space-y-1">
                  {ch.lessons.map((les, lesIndex) => {
                    const key = `${ch.id}-${les.id}`;
                    const completed = isLessonComplete(key);
                    const isCurrent = ch.id === chapterId && les.id === lessonId;

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          navigateToLesson(ch.id, les.id);
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full text-left p-3 rounded-md hover-elevate flex items-start gap-3 transition-colors",
                          isCurrent && "bg-primary/10 border border-primary/20"
                        )}
                        data-testid={`lesson-nav-${les.id}`}
                      >
                        {completed ? (
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium line-clamp-2">{les.title}</div>
                          {isCurrent && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-6 py-8">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2">
                {chapter.title}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {lesson.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {lesson.description}
              </p>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={toggleCompletion}
                  variant={isCompleted ? "secondary" : "default"}
                  className="gap-2"
                  data-testid="button-toggle-complete"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle className="h-4 w-4" />
                      Mark Complete
                    </>
                  )}
                </Button>
                
                {lesson.resourceUrl && (
                  <a href={lesson.resourceUrl} download data-testid="link-download-resource">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Resource
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Video Player */}
            {lesson.videoUrl && (
              <Card className="mb-8">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    {lesson.videoUrl.endsWith('.mp4') || lesson.videoUrl.includes('/attached_assets/') ? (
                      <video
                        src={lesson.videoUrl}
                        controls
                        className="w-full h-full"
                        data-testid="video-player"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        src={lesson.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        data-testid="video-player"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lesson Content */}
            {lesson.content && (
              <Card className="mb-8">
                <CardContent className="p-8 prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed">{lesson.content}</p>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t">
              {prevLesson ? (
                <Button 
                  variant="outline" 
                  className="gap-2" 
                  onClick={() => navigateToLesson(prevLesson.chapterId, prevLesson.lessonId)}
                  data-testid="button-prev-lesson"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Lesson
                </Button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Button 
                  className="gap-2" 
                  onClick={() => navigateToLesson(nextLesson.chapterId, nextLesson.lessonId)}
                  data-testid="button-next-lesson"
                >
                  Next Lesson
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Link href="/dashboard-course">
                  <Button className="gap-2" data-testid="button-finish-course">
                    Finish Course
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
