import { CourseHeader } from '@/components/courses/course-header';
import { LessonList } from '@/components/courses/lesson-list';
import { Header } from '@/components/header';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const user = await requireAuth();
  const { id: courseId } = await params;

  const course = await db.course.findFirst({
    where: {
      id: courseId, // ✅ Use params.id directly here (no destructuring above)
      userId: user.id,
    },
    include: {
      lessons: {
        include: {
          progress: {
            where: { userId: user.id },
          },
          notes: {
            where: { userId: user.id },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CourseHeader course={course} />
        <div className="mt-8">
          <LessonList lessons={course.lessons} courseId={course.id} />
        </div>
      </main>
    </div>
  );
}
