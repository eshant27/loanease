import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, Calendar, CreditCard } from "lucide-react";

const UserDashboard = () => {
  // Sample data for demonstration
  const loans = [
    {
      id: 1,
      type: "Home Loan",
      amount: 2500000,
      disbursed: 2500000,
      outstanding: 1875000,
      emi: 23500,
      nextDue: "15 Jan 2025",
      status: "Active",
    },
    {
      id: 2,
      type: "Personal Loan",
      amount: 500000,
      disbursed: 500000,
      outstanding: 325000,
      emi: 8750,
      nextDue: "20 Jan 2025",
      status: "Active",
    },
  ];

  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstanding, 0);
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);
  const totalDisbursed = loans.reduce((sum, loan) => sum + loan.disbursed, 0);

  return (
    <section id="dashboard" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">User Dashboard</h2>
          <p className="text-xl text-muted-foreground">
            Track and manage your loans in one place
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border animate-fade-in-up">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Total Outstanding</div>
              </div>
              <div className="text-2xl font-bold">₹{totalOutstanding.toLocaleString('en-IN')}</div>
            </CardContent>
          </Card>

          <Card className="border-border animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">Total Disbursed</div>
              </div>
              <div className="text-2xl font-bold">₹{totalDisbursed.toLocaleString('en-IN')}</div>
            </CardContent>
          </Card>

          <Card className="border-border animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Monthly EMI</div>
              </div>
              <div className="text-2xl font-bold">₹{totalEMI.toLocaleString('en-IN')}</div>
            </CardContent>
          </Card>

          <Card className="border-border animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">Active Loans</div>
              </div>
              <div className="text-2xl font-bold">{loans.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Details */}
        <div className="space-y-4">
          {loans.map((loan, index) => {
            const paidPercentage = ((loan.disbursed - loan.outstanding) / loan.disbursed) * 100;
            
            return (
              <Card
                key={loan.id}
                className="border-border shadow-soft animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{loan.type}</CardTitle>
                    <Badge className="bg-accent text-accent-foreground">{loan.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Loan Amount</div>
                        <div className="text-lg font-semibold">
                          ₹{loan.amount.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Outstanding Amount</div>
                        <div className="text-lg font-semibold text-primary">
                          ₹{loan.outstanding.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Repayment Progress</div>
                        <Progress value={paidPercentage} className="h-2 mb-2" />
                        <div className="text-sm text-muted-foreground">
                          {paidPercentage.toFixed(1)}% paid
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-hero rounded-lg p-4 border border-border">
                        <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
                        <div className="text-2xl font-bold text-primary">
                          ₹{loan.emi.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="bg-gradient-hero rounded-lg p-4 border border-border">
                        <div className="text-sm text-muted-foreground mb-1">Next Due Date</div>
                        <div className="text-lg font-semibold">{loan.nextDue}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
