import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonNavigationProps {
  courseId: string;
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
}

export function LessonNavigation({ courseId, prevLesson, nextLesson }: LessonNavigationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div>
        {prevLesson && (
          <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`}>
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous: {prevLesson.title}
            </Button>
          </Link>
        )}
      </div>

      <div>
        <Link href={`/courses/${courseId}`}>
          <Button variant="outline">Back to Course</Button>
        </Link>
      </div>

      <div>
        {nextLesson && (
          <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
            <Button>
              Next: {nextLesson.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
