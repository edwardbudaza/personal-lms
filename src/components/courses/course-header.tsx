'use client';

import { AddLessonDialog } from '@/components/courses/add-lesson-dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatDuration } from '@/lib/utils';
import { BookOpen, Clock, Plus } from 'lucide-react';

interface CourseHeaderProps {
  course: {
    id: string;
    title: string;
    description: string | null;
    lessons: {
      id: string;
      duration: number | null;
      progress: { completed: boolean }[];
    }[];
  };
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter((lesson) =>
    lesson.progress.some((p) => p.completed)
  ).length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const totalDuration = course.lessons.reduce((acc, lesson) => {
    return acc + (lesson.duration || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          {course.description && (
            <p className="text-muted-foreground text-lg">{course.description}</p>
          )}
        </div>
        <AddLessonDialog courseId={course.id}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        </AddLessonDialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="text-muted-foreground h-5 w-5" />
          <div>
            <p className="text-muted-foreground text-sm">Lessons</p>
            <p className="text-2xl font-bold">{totalLessons}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="text-muted-foreground h-5 w-5" />
          <div>
            <p className="text-muted-foreground text-sm">Duration</p>
            <p className="text-2xl font-bold">{formatDuration(totalDuration)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Progress</span>
            <span className="text-sm font-medium">
              {completedLessons}/{totalLessons} complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
    </div>
  );
}
