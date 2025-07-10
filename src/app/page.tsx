import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { CourseCard } from '@/components/courses/course-card';
import { CreateCourseDialog } from '@/components/courses/create-course-dialog';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default async function Home() {
  const user = await requireAuth();

  const courses = await db.course.findMany({
    where: { userId: user.id },
    include: {
      lessons: {
        include: {
          progress: {
            where: { userId: user.id },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your personal learning journey
            </p>
          </div>
          <CreateCourseDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </CreateCourseDialog>
        </div>

        {courses.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="mb-4 text-xl font-semibold">No courses yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first course to get started with your personal learning journey
            </p>
            <CreateCourseDialog>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Course
              </Button>
            </CreateCourseDialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
