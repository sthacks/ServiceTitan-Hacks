import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dashboard-course-progress';

export interface CourseProgress {
  completedLessons: string[];
  lastAccessedLesson?: string;
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>({
    completedLessons: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse course progress:', e);
      }
    }
  }, []);

  const saveProgress = (newProgress: CourseProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const markLessonComplete = (lessonKey: string) => {
    const newProgress = {
      ...progress,
      completedLessons: progress.completedLessons.includes(lessonKey)
        ? progress.completedLessons
        : [...progress.completedLessons, lessonKey],
    };
    saveProgress(newProgress);
  };

  const markLessonIncomplete = (lessonKey: string) => {
    const newProgress = {
      ...progress,
      completedLessons: progress.completedLessons.filter(l => l !== lessonKey),
    };
    saveProgress(newProgress);
  };

  const isLessonComplete = (lessonKey: string): boolean => {
    return progress.completedLessons.includes(lessonKey);
  };

  const updateLastAccessed = (lessonKey: string) => {
    const newProgress = {
      ...progress,
      lastAccessedLesson: lessonKey,
    };
    saveProgress(newProgress);
  };

  const getCompletionPercentage = (totalLessons: number): number => {
    if (totalLessons === 0) return 0;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  return {
    progress,
    markLessonComplete,
    markLessonIncomplete,
    isLessonComplete,
    updateLastAccessed,
    getCompletionPercentage,
  };
}
