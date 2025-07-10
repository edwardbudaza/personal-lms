import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Play } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface CourseCardProps {
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

export function CourseCard({ course }: CourseCardProps) {
  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter((lesson) =>
    lesson.progress.some((p) => p.completed)
  ).length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const totalDuration = course.lessons.reduce((acc, lesson) => {
    return acc + (lesson.duration || 0);
  }, 0);

  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="cursor-pointer transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {course.description || 'No description available'}
              </CardDescription>
            </div>
            <Play className="text-muted-foreground h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-muted-foreground flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {formatDuration(totalDuration)}
              </div>
              <Badge variant="secondary">
                {totalLessons} lesson{totalLessons !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>
                  {completedLessons}/{totalLessons} complete
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
