// Updated CareerGoalsForm with import for CheckCircle
"use client";
import { updateCareerGoals } from "@/actions/career-path";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Save, Target } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="w-4 h-4 mr-2" />
          Save Goals
        </>
      )}
    </Button>
  );
}

export default function CareerGoalsForm() {
  const [goals, setGoals] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(formData) {
    const goals = formData.get("goals");
    await updateCareerGoals(goals);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <Card className="border border-purple-800/20 bg-black/30 backdrop-blur-md">
      <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
        <CardTitle className="text-xl font-semibold text-purple-100 flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-400" />
          Your Career Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={handleSubmit}>
          <div className="space-y-4">
            <div>
              <p className="text-purple-200 text-sm mb-4">
                Describe your career aspirations and objectives for the next 5
                years. This will help tailor your roadmap to your goals.
              </p>

              <Textarea
                name="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Example: I want to transition from a developer role to a technical lead position. I'm interested in cloud architecture and team management."
                className="h-32 bg-indigo-950/30 border-indigo-700/30 text-indigo-100 placeholder:text-indigo-400/50"
              />
            </div>

            <div className="flex items-center justify-between">
              <SubmitButton />

              {saved && (
                <span className="text-green-400 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Goals saved successfully
                </span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
