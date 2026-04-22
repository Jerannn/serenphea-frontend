import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const email = params.get("email");

  return (
    <Card className="w-full xs:w-md">
      <Button variant="link" className="w-fit">
        <ArrowLeft />
        Back
      </Button>
      <CardContent className="flex flex-col items-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Check your email</h2>
        <p className="text-muted-foreground">
          We sent a verification code to {email}
        </p>
      </CardContent>
    </Card>
  );
}
