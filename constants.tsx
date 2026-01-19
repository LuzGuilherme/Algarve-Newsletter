
import React from 'react';
import { MailCheck, Map, Ticket, Mail, Coffee, Waves } from 'lucide-react';
import { EventHighlight, Testimonial } from './types';

export const TRIPSTAR_FEATURES = [
  {
    icon: <img src="/icons/newsletter-icon.png" alt="Weekly Curation" className="w-24 h-24 object-contain mix-blend-multiply -rotate-6" />,
    title: "Weekly Curation",
    description: "Every Thursday, we deliver the top 3 handpicked events for your weekend. No spam, just the essentials."
  },
  {
    icon: <img src="/icons/map-icon.png" alt="Local Tips" className="w-24 h-24 object-contain mix-blend-multiply rotate-6" />,
    title: "Local Friend Tips",
    description: "Places you won't find on Google Maps. That hidden family tavern or a beach without the crowds."
  },
  {
    icon: <img src="/icons/ticket-icon.png" alt="Exclusive Access" className="w-24 h-24 object-contain mix-blend-multiply -rotate-3" />,
    title: "Exclusive Access",
    description: "Partnerships with local organizers to offer discounts and early-bird access to our subscribers."
  }
];

export const HIGHLIGHTS: EventHighlight[] = [
  {
    id: '1',
    title: "Sunset Jazz at Praia da Rocha",
    date: "Aug 20, 2024",
    location: "Portimão",
    description: "A smooth jazz evening by the shore. Tip: arrive 30 minutes early to grab the best spot on the sand.",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '2',
    title: "Silves Medieval Fair",
    date: "Aug 22-25, 2024",
    location: "Silves Castle",
    description: "The best historical event of the year. Find out where to park stress-free in our full guide.",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '3',
    title: "Seafood Festival",
    date: "Aug 28, 2024",
    location: "Olhão Waterfront",
    description: "Where the locals eat. Skip the main queues; we'll reveal the fishermen's favorite stall.",
    imageUrl: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&q=80&w=800"
  }
];

export const CATEGORIES = [
  { name: "Mountains", img: "/mountains.jpg" }, // Monchique/Interior
  { name: "Beaches", img: "/beaches.jpg" }, // Benagil/Cliffs
  { name: "Taverns", img: "/taverns.jpg" }, // Seafood/Authentic Food
  { name: "Culture", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400" }  // Azulejos/Tiles
];

export const SNEAK_PEEK_CARDS = [
  {
    id: '1',
    title: "Hidden Gems",
    tag: "",
    description: "The beaches, caves, and trails that aren't on the tourist maps. GPS coordinates included.",
    img: "/local-secrets.jpg", // Swapped: Landscape now here
    actionPayload: "Discover"
  },
  {
    id: '2',
    title: "The Weekly Agenda",
    tag: "",
    description: "From jazz in the park to village seafood festivals. We filter the noise so you don't have to.",
    img: "/weekly-agenda.jpg",
    actionPayload: "Plan"
  },
  {
    id: '3',
    title: "Local Secrets",
    tag: "",
    description: "Stories, traditional recipes, and history that make the Algarve unique.",
    img: "/hidden-gems.jpg", // Swapped: Sardines now here
    actionPayload: "Read"
  }
];

export const TOP_PARTNERS = [
  { id: '1', name: "João 'The Fisherman'", rating: 5.0, reviews: 42, img: "https://picsum.photos/seed/p1/400/300" },
  { id: '2', name: "Maria Pottery", rating: 4.9, reviews: 88, img: "https://picsum.photos/seed/p2/400/300" },
  { id: '3', name: "Chef Algarve", rating: 4.8, reviews: 120, img: "https://picsum.photos/seed/p3/400/300" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Joana Santos",
    role: "Faro, Resident",
    content: "Subscribing was the best decision. I finally know what's happening in my city without having to check 10 different websites.",
    avatar: "https://i.pravatar.cc/150?u=joana",
    rating: 5.0
  },
  {
    id: '2',
    name: "Mark Thompson",
    role: "Expat in Lagos",
    content: "The 'Hidden Gems' section is incredible. I found a deserted beach in the middle of August thanks to this newsletter!",
    avatar: "https://i.pravatar.cc/150?u=mark",
    rating: 4.9
  },
  {
    id: '3',
    name: "Sílvia Pereira",
    role: "Frequent Traveler",
    content: "I love the tone of voice; it really feels like a friend giving you tips. It's my Thursday morning ritual.",
    avatar: "https://i.pravatar.cc/150?u=silvia",
    rating: 5.0
  }
];

export const HOW_IT_WORKS = [
  {
    icon: <img src="/icons/mailbox-icon.png" alt="Subscribe Free" className="w-24 h-24 object-contain mix-blend-multiply -rotate-3" />,
    title: "Subscribe Free",
    desc: "Join the community of those who really know the region and personalize your interests."
  },
  {
    icon: <img src="/icons/coffee-icon.png" alt="Thursday Reading" className="w-24 h-24 object-contain mix-blend-multiply rotate-3" />,
    title: "Thursday Reading",
    desc: "Open your email, grab a coffee, and discover the 3 gems we chose for your weekend."
  },
  {
    icon: <img src="/icons/waves-icon.png" alt="Live the Real Algarve" className="w-24 h-24 object-contain mix-blend-multiply -rotate-3" />,
    title: "Live the Real Algarve",
    desc: "Follow our tips and experience the Algarve like you were born here. No lines, no clichés."
  }
];
