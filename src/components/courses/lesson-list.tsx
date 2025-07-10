'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDuration } from '@/lib/utils';
import { CheckCircle, Circle, Clock, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface LessonListProps {
  lessons: {
    id: string;
    title: string;
    description: string | null;
    duration: number | null;
    progress: { completed: boolean }[];
    notes: unknown[];
  }[];
  courseId: string;
}

export function LessonList({ lessons, courseId }: LessonListProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const filteredLessons = lessons.filter((lesson) => {
    const isCompleted = lesson.progress.some((p) => p.completed);
    if (filter === 'completed') return isCompleted;
    if (filter === 'incomplete') return !isCompleted;
    return true;
  });

  const completedCount = lessons.filter((lesson) =>
    lesson.progress.some((p) => p.completed)
  ).length;

  if (lessons.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-4 text-xl font-semibold">No lessons yet</h3>
        <p className="text-muted-foreground mb-6">
          Add your first lesson to get started with this course
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Lessons</h2>
          <Badge variant="secondary">
            {completedCount}/{lessons.length} completed
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'incomplete' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('incomplete')}
          >
            Incomplete
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLessons.map((lesson, index) => {
          const isCompleted = lesson.progress.some((p) => p.completed);
          return (
            <Card key={lesson.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      {lesson.description && (
                        <CardDescription className="mt-1">{lesson.description}</CardDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="text-muted-foreground h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                    {lesson.duration && (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatDuration(lesson.duration)}
                      </div>
                    )}
                    {lesson.notes.length > 0 && (
                      <Badge variant="outline">
                        {lesson.notes.length} note{lesson.notes.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
                    <Button>
                      <Play className="mr-2 h-4 w-4" />
                      {isCompleted ? 'Review' : 'Watch'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
