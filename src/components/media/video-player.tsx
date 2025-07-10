'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface VideoPlayerProps {
  lesson: {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string;
    duration: number | null;
    progress: { completed: boolean }[];
  };
  // courseId: string;
}

export function VideoPlayer({ lesson /**,courseId*/ }: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(lesson.progress.some((p) => p.completed));
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  console.log("Video URL: ", lesson.videoUrl)

  const toggleCompletion = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/lessons/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          completed: !isCompleted,
        }),
      });

      if (response.ok) {
        setIsCompleted(!isCompleted);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{lesson.title}</CardTitle>
            {lesson.description && (
              <CardDescription className="mt-2 text-base">{lesson.description}</CardDescription>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {lesson.duration && <Badge variant="outline">{formatDuration(lesson.duration)}</Badge>}
            <Button
              variant={isCompleted ? 'default' : 'outline'}
              size="sm"
              onClick={toggleCompletion}
              disabled={loading}
            >
              {isCompleted ? (
                <CheckCircle className="mr-2 h-4 w-4" />
              ) : (
                <Circle className="mr-2 h-4 w-4" />
              )}
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-lg bg-black">
          <video
            ref={videoRef}
            className="aspect-video w-full"
            src={lesson.videoUrl}
            controls={false}
            onClick={togglePlayPause}
          />

          {/* Custom Controls */}
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <span className="text-sm">
                  {formatDuration(currentTime)} / {formatDuration(duration)}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="h-1 w-full rounded bg-white/20">
                <div
                  className="h-1 rounded bg-white transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
