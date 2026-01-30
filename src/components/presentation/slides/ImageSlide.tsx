import { cn } from "@/lib/utils";

interface ImageSlideProps {
  title?: string;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  layout?: 'full' | 'centered' | 'side';
  children?: React.ReactNode;
}

const ImageSlide = ({ 
  title, 
  imageSrc, 
  imageAlt, 
  caption,
  layout = 'centered',
  children 
}: ImageSlideProps) => {
  if (layout === 'side') {
    return (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {title}
            </h2>
          )}
          <div className="text-lg text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full rounded-2xl shadow-lg"
          />
          {caption && (
            <p className="text-sm text-muted-foreground text-center mt-3">
              {caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "text-center",
      layout === 'full' && "h-full flex flex-col justify-center"
    )}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          {title}
        </h2>
      )}
      
      <img 
        src={imageSrc} 
        alt={imageAlt} 
        className={cn(
          "rounded-2xl shadow-lg mx-auto",
          layout === 'full' && "max-h-[60vh] w-auto",
          layout === 'centered' && "max-w-2xl w-full"
        )}
      />
      
      {caption && (
        <p className="text-sm text-muted-foreground mt-4">
          {caption}
        </p>
      )}
      
      {children && (
        <div className="mt-6 text-lg text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
};

export default ImageSlide;
