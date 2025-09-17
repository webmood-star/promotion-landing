import { Suspense } from "react";
import PlanSurvey from "@/components/PlanSurvey";

export default function SurveyPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PlanSurvey />
    </Suspense>
  );
}