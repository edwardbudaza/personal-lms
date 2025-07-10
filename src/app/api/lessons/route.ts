import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStorageProvider } from '@/lib/storage/factory';
import { db } from '@/lib/db'; // Prisma client

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) console.error('❌ Supabase user fetch error:', userError);
    if (!user) {
      console.warn('⚠️ Unauthorized: No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const courseId = formData.get('courseId') as string;
    const videoFile = formData.get('video') as File;

    if (!videoFile) {
      console.warn('⚠️ No video file provided');
      return NextResponse.json({ error: 'Video file is required' }, { status: 400 });
    }

    // ✅ Check course ownership using Prisma
    const course = await db.course.findFirst({
      where: { id: courseId, userId: user.id },
    });

    if (!course) {
      console.warn(`⚠️ Course not found or access denied for courseId=${courseId}`);
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // ✅ Count lessons for ordering
    const lessonCount = await db.lesson.count({
      where: { courseId },
    });

    // ✅ Upload to storage (R2, S3, etc.)
    const timestamp = Date.now();
    const filename = `${courseId}/${timestamp}_${videoFile.name}`;
    const storage = getStorageProvider();

    console.log('📤 Uploading to storage provider:', {
      filename,
      provider: storage.constructor.name,
    });

    const videoUrl = await storage.upload(videoFile, filename);

    console.log('✅ Video uploaded:', videoUrl);

    // ✅ Create lesson using Prisma
    const lesson = await db.lesson.create({
      data: {
        title,
        description,
        videoUrl,
        order: lessonCount,
        courseId,
        userId: user.id,
      },
    });

    console.log('✅ Lesson created:', lesson.id);
    return NextResponse.json(lesson);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
