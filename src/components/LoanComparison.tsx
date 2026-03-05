import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const LoanComparison = () => {
  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const handleCompare = () => {
    // Placeholder for future backend integration
    console.log("Comparing loans:", { loanType, loanAmount });
  };

  return (
    <section id="comparison" className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Compare Loan Offers
          </h2>
          <p className="text-muted-foreground text-lg">
            Find the best loan rates from top banks
          </p>
        </div>

        <Card className="shadow-elegant border-border/50 animate-fade-in">
          <CardHeader>
            <CardTitle>Loan Comparison</CardTitle>
            <CardDescription>
              Select your loan type and amount to compare offers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="loan-type">Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger id="loan-type">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="education">Education Loan</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-amount">Loan Amount</Label>
                <Input
                  id="loan-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleCompare} 
              className="w-full"
              size="lg"
            >
              Compare
            </Button>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Available Bank Offers
              </h3>
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">
                  Select loan type and amount, then click Compare to view available offers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoanComparison;
