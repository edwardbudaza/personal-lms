import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { lessonId, completed } = await req.json();

    const existing = await db.lessonProgress.findUnique({
      where: {
        lessonId_userId: {
          lessonId,
          userId: user.id,
        },
      },
    });

    if (existing) {
      const updated = await db.lessonProgress.update({
        where: { lessonId_userId: { lessonId, userId: user.id } },
        data: {
          completed,
          completedAt: completed ? new Date() : null,
        },
      });
      return NextResponse.json(updated);
    } else {
      const created = await db.lessonProgress.create({
        data: {
          lessonId,
          userId: user.id,
          completed,
          completedAt: completed ? new Date() : null,
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
