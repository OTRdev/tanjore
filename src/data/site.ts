// Single source of truth for business facts. Used by the UI and the JSON-LD.
export const site = {
  name: "Tanjore Indian Cuisine",
  tagline: "Authentic Indian Cuisine · Family recipes since 2004",
  url: "https://www.tanjore.ca",
  phone: "+1-613-967-5967",
  phoneDisplay: "(613) 967-5967",
  orderUrl: "https://order.online/store/tanjore-indian-cuisine-belleville-30281115",
  address: {
    street: "151 Pinnacle St",
    city: "Belleville",
    region: "ON",
    postalCode: "K8N 3A5",
    country: "CA",
  },
  social: {
    facebook: "https://www.facebook.com/TanjoreIndianCuisine/",
    instagram: "https://www.instagram.com/tanjoreindiancuisine/",
  },
  fullAddress: "151 Pinnacle St, Belleville, ON K8N 3A5",
  // Plain Google Maps embed, no API key needed.
  mapEmbedUrl: "https://www.google.com/maps?q=151+Pinnacle+St,+Belleville,+ON+K8N+3A5&output=embed",
  // Confirmed by owner: closes 7 PM, closed Mondays.
  hours: {
    timezone: "America/Toronto",
    days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "12:00",
    closes: "19:00",
    /** 0 = Sunday ... 6 = Saturday. */
    closedDays: [1],
    display: "Tuesday to Sunday, 12 PM to 7 PM",
  },
  description:
    "Family-run authentic North Indian restaurant in Belleville, Ontario. Butter chicken, biryanis, tandoori, fresh naan, vegetarian dishes and lunch thalis. Dine in, takeout and online ordering.",
} as const;
