

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Get Your Dream Loan
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Simplified</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Calculate EMI, check eligibility, and manage your loans with our comprehensive tools.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
