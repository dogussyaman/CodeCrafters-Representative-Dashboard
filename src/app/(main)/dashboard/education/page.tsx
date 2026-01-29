"use client";

import { TrainingHero } from "./_components/training-hero";
import { UnitTabs } from "./_components/unit-tabs";

export default function EducationPage() {
  return (
    <div className="space-y-8 p-6">
      <TrainingHero />
      <UnitTabs />
    </div>
  );
}