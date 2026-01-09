"use client";

import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "London, UK",
    rating: 5,
    text: "Exceptional service! Our driver was knowledgeable, courteous, and made our trip to the desert unforgettable.",
    image: "/woman-profile-picture.jpg",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    location: "Paris, France",
    rating: 5,
    text: "Professional, clean car, and very comfortable. Highly recommend for anyone visiting Marrakech!",
    image: "/man-profile-picture.jpg",
  },
  {
    id: 3,
    name: "Emma Johnson",
    location: "New York, USA",
    rating: 5,
    text: "Best transport service in Marrakech. Reliable, affordable, and they go above and beyond to help.",
    image: "/woman-smiling-profile.jpg",
  },
];

export default function Reviews() {
  const { t } = useTranslation();

  return (
    <section id="reviews" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 slide-up">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t("reviews.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="slide-up bg-background rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={review.image || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
