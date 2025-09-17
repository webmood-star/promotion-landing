import { Suspense } from "react";
import TermsContent from "@/components/TermsContent";

export default function TermsPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <TermsContent />
    </Suspense>
  );
}