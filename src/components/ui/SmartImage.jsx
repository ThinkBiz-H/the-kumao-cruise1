import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

/**
 * Native lazy-loaded image with intrinsic dimensions (no layout shift),
 * a soft fade-in once decoded, and an optional hover zoom driven by a
 * parent `.group`. Pass `priority` for above-the-fold images.
 */
export default function SmartImage({
  image,
  alt,
  priority = false,
  zoom = false,
  sizes,
  className,
  imgClassName,
}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(priority);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div className={cn('overflow-hidden bg-cream-2', className)}>
      <img
        ref={ref}
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'size-full object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          loaded ? 'opacity-100' : 'opacity-0',
          zoom && 'group-hover:scale-[1.05] motion-reduce:group-hover:scale-100',
          imgClassName,
        )}
      />
    </div>
  );
}
