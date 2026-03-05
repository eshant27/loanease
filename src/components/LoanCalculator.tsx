import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [showResults, setShowResults] = useState(false);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = loanTerm * 12;
    
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
    };
  };

  const { emi, totalAmount, totalInterest } = calculateEMI();

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <section id="calculator" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">Loan Calculator</h2>
          <p className="text-xl text-muted-foreground">
            Calculate your estimated monthly payments
          </p>
        </div>

        <Card className="shadow-medium border-border animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl">Calculate Your EMI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">Loan Amount</Label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      min={100000}
                      max={10000000}
                      className="w-40 text-right"
                    />
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    min={100000}
                    max={10000000}
                    step={50000}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">Interest Rate</Label>
                    <span className="text-lg font-semibold text-primary">{interestRate.toFixed(2)}%</span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={3}
                    max={15}
                    step={0.1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>3%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">Loan Term</Label>
                    <span className="text-lg font-semibold text-primary">{loanTerm} years</span>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleCalculate}
                  className="w-full"
                  size="lg"
                >
                  Calculate
                </Button>

                {showResults && (
                  <div className="bg-gradient-hero rounded-xl p-6 border border-border animate-fade-in-up">
                    <div className="text-sm text-muted-foreground mb-2">Monthly EMI</div>
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                      ₹{emi.toLocaleString('en-IN')}
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Principal Amount</span>
                        <span className="font-semibold">₹{loanAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span className="font-semibold text-accent">₹{totalInterest.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-border">
                        <span className="text-muted-foreground font-medium">Total Amount</span>
                        <span className="font-bold text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoanCalculator;
