import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LoanCalculator from "@/components/LoanCalculator";
import EligibilityChecker from "@/components/EligibilityChecker";
import LoanComparison from "@/components/LoanComparison";
import UserDashboard from "@/components/UserDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LoanCalculator />
      <EligibilityChecker />
      <LoanComparison />
      <UserDashboard />
      <Footer />
    </div>
  );
};

export default Index;
