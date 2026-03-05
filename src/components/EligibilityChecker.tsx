import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const EligibilityChecker = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [existingEMI, setExistingEMI] = useState("");
  const [age, setAge] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [result, setResult] = useState<{
    eligible: boolean;
    maxLoan: number;
    message: string;
    score: number;
  } | null>(null);

  const calculateEligibility = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const emi = parseFloat(existingEMI) || 0;
    const ageValue = parseInt(age) || 0;
    const credit = parseInt(creditScore) || 0;

    // Calculate available income (50% of income should be free after EMIs)
    const availableIncome = income - emi;
    const maxEMI = availableIncome * 0.5;
    
    // Assume 8.5% interest for 20 years to calculate max loan
    const rate = 8.5 / 12 / 100;
    const time = 20 * 12;
    const maxLoan = maxEMI * ((Math.pow(1 + rate, time) - 1) / (rate * Math.pow(1 + rate, time)));

    // Calculate eligibility score
    let score = 0;
    let eligible = true;
    let message = "";

    // Income check
    if (income < 25000) {
      eligible = false;
      message = "Minimum monthly income should be ₹25,000";
    } else {
      score += 25;
    }

    // Age check
    if (ageValue < 21 || ageValue > 65) {
      eligible = false;
      message = "Age should be between 21 and 65 years";
    } else {
      score += 25;
    }

    // Credit score check
    if (credit < 650) {
      eligible = false;
      message = "Credit score should be at least 650";
    } else if (credit >= 750) {
      score += 35;
    } else {
      score += 20;
    }

    // EMI to Income ratio
    const emiRatio = (emi / income) * 100;
    if (emiRatio > 50) {
      eligible = false;
      message = "Existing EMI exceeds 50% of income";
    } else {
      score += 15;
    }

    if (eligible) {
      if (score >= 80) {
        message = "Excellent! You are eligible for a premium loan";
      } else if (score >= 60) {
        message = "Good! You are eligible for a standard loan";
      } else {
        message = "You are eligible, but with limited loan amount";
      }
    }

    setResult({
      eligible,
      maxLoan: Math.round(maxLoan),
      message,
      score,
    });
  };

  return (
    <section id="eligibility" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">Check Your Eligibility</h2>
          <p className="text-xl text-muted-foreground">
            Find out your loan eligibility in seconds
          </p>
        </div>

        <Card className="shadow-medium border-border animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl">Loan Eligibility Predictor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter your monthly income"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emi">Existing Monthly EMI (₹)</Label>
                  <Input
                    id="emi"
                    type="number"
                    placeholder="Total existing EMIs"
                    value={existingEMI}
                    onChange={(e) => setExistingEMI(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credit">Credit Score</Label>
                  <Input
                    id="credit"
                    type="number"
                    placeholder="Your credit score (300-900)"
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                  />
                </div>

                <Button
                  onClick={calculateEligibility}
                  className="w-full bg-gradient-primary shadow-soft hover:shadow-medium transition-all"
                  size="lg"
                >
                  Check Eligibility
                </Button>
              </div>

              <div className="space-y-4">
                {result ? (
                  <div className="bg-gradient-hero rounded-xl p-6 border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Eligibility Status</span>
                      {result.eligible ? (
                        <Badge className="bg-accent text-accent-foreground">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Eligible
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Not Eligible
                        </Badge>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-start gap-2 mb-4">
                        <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                        <p className="text-muted-foreground">{result.message}</p>
                      </div>

                      {result.eligible && (
                        <>
                          <div className="mb-4">
                            <div className="text-sm text-muted-foreground mb-2">
                              Maximum Eligible Loan Amount
                            </div>
                            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                              ₹{result.maxLoan.toLocaleString('en-IN')}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Eligibility Score</span>
                              <span className="font-semibold">{result.score}/100</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: `${result.score}%` }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-hero rounded-xl p-6 border border-border h-full flex items-center justify-center">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Enter your details and click "Check Eligibility" to see your results
                      </p>
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

export default EligibilityChecker;
