import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { VideoPlayer } from '@/components/media/video-player';
import { LessonNotes } from '@/components/courses/lesson-notes';
import { LessonNavigation } from '@/components/courses/lesson-navigation';
import { Header } from '@/components/header';

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default async function LessonPage(props: LessonPageProps) {
  // ✅ Safely extract params AFTER component begins executing
  const { id: courseId, lessonId } = await props.params;

  // ✅ Get authenticated user
  const user = await requireAuth();

  // ✅ Find the lesson (and ensure user owns it)
  const lesson = await db.lesson.findFirst({
    where: {
      id: lessonId,
      courseId,
      userId: user.id,
    },
    include: {
      course: true,
      progress: {
        where: { userId: user.id },
      },
      notes: {
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!lesson) {
    notFound();
  }

  // ✅ Get all lessons to determine navigation
  const allLessons = await db.lesson.findMany({
    where: {
      courseId,
      userId: user.id,
    },
    orderBy: { order: 'asc' },
  });

  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VideoPlayer lesson={lesson} />
            <LessonNavigation
              courseId={courseId}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
            />
          </div>
          <div className="lg:col-span-1">
            <LessonNotes
              lesson={{ id: lesson.id, title: lesson.title }}
              notes={lesson.notes.map((note) => ({
                id: note.id,
                content: note.content,
                createdAt: note.createdAt.toISOString(),
                updatedAt: note.updatedAt.toISOString(),
              }))}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
