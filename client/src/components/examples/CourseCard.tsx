import CourseCard from "../CourseCard";

export default function CourseCardExample() {
  return (
    <div className="max-w-sm">
      <CourseCard
        title="ServiceTitan API Mastery"
        level="Advanced"
        duration="4 hours"
        outcomes={[
          "Build custom integrations",
          "Automate data sync",
          "Create custom reports",
        ]}
        included={[
          "Video tutorials",
          "Code samples",
          "Live Q&A session",
        ]}
      />
    </div>
  );
}
