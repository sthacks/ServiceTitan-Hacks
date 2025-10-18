import TestimonialCard from "../TestimonialCard";
import photo from "@assets/generated_images/Testimonial_contractor_photo_1_f4717a9d.png";

export default function TestimonialCardExample() {
  return (
    <div className="max-w-md">
      <TestimonialCard
        quote="Cut our follow-up time in half with automated call summaries. Game changer."
        name="Mike Reynolds"
        company="Reynolds HVAC"
        photo={photo}
      />
    </div>
  );
}
