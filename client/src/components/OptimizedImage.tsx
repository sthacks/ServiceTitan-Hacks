import { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
  fallbackSrc?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  webpSrc,
  fallbackSrc,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [webpError, setWebpError] = useState(false);

  const imageSrc = imageError 
    ? (fallbackSrc || src) 
    : (!webpError && webpSrc) 
      ? webpSrc 
      : src;

  return (
    <picture>
      {webpSrc && !webpError && (
        <source 
          type="image/webp" 
          srcSet={webpSrc}
          onError={() => setWebpError(true)}
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setImageError(true)}
        {...props}
      />
    </picture>
  );
}
