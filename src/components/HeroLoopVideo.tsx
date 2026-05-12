import { useRef, useState } from 'react';

const crossfadeSeconds = 0.7;

interface HeroLoopVideoProps {
  src: string;
  className?: string;
}

export default function HeroLoopVideo({ src, className = '' }: HeroLoopVideoProps) {
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const isCrossfadingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTimeUpdate = (index: number) => {
    const activeVideo = videoRefs[index].current;
    const nextIndex = index === 0 ? 1 : 0;
    const nextVideo = videoRefs[nextIndex].current;

    if (!activeVideo || !nextVideo || isCrossfadingRef.current || !Number.isFinite(activeVideo.duration)) {
      return;
    }

    if (activeVideo.duration - activeVideo.currentTime > crossfadeSeconds) {
      return;
    }

    isCrossfadingRef.current = true;
    nextVideo.currentTime = 0;
    void nextVideo.play();
    setActiveIndex(nextIndex);

    window.setTimeout(() => {
      activeVideo.pause();
      activeVideo.currentTime = 0;
      isCrossfadingRef.current = false;
    }, crossfadeSeconds * 1000);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[0, 1].map((index) => (
        <video
          key={index}
          ref={videoRefs[index]}
          className={`${className} absolute inset-0 transition-opacity duration-700 ease-linear ${
            activeIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onTimeUpdate={() => handleTimeUpdate(index)}
        />
      ))}
    </div>
  );
}
