interface QuoteSlideProps {
  quote: string;
  attribution?: string;
  source?: string;
}

const QuoteSlide = ({ quote, attribution, source }: QuoteSlideProps) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="text-6xl text-primary/30 mb-4">"</div>
      
      <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed mb-8">
        {quote}
      </blockquote>
      
      {(attribution || source) && (
        <div className="text-muted-foreground">
          {attribution && (
            <p className="text-lg font-medium">{attribution}</p>
          )}
          {source && (
            <p className="text-sm mt-1">{source}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteSlide;
