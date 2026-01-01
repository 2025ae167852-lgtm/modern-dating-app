import imgWoman1 from "@assets/stock_images/portrait_of_a_young__6a830260.jpg";
import imgWoman2 from "@assets/stock_images/portrait_of_a_young__e87fc139.jpg";
import imgWoman3 from "@assets/stock_images/portrait_of_a_young__cb1eee85.jpg";
import imgMan1 from "@assets/stock_images/portrait_of_a_young__4a9469d0.jpg";
import imgMan2 from "@assets/stock_images/portrait_of_a_young__366382f0.jpg";
import imgMan3 from "@assets/stock_images/portrait_of_a_young__15be29c6.jpg";

export type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  tags: string[];
  distance: number; // km
  job?: string;
};

export const MOCK_PROFILES: Profile[] = [
  {
    id: "1",
    name: "Sarah",
    age: 24,
    bio: "Coffee addict, travel enthusiast, and always looking for the best tacos in town. Let's go on an adventure! 🌮✈️",
    images: [imgWoman1, imgWoman2],
    tags: ["Travel", "Coffee", "Photography", "Tacos"],
    distance: 3,
    job: "Graphic Designer"
  },
  {
    id: "2",
    name: "Michael",
    age: 28,
    bio: "Software engineer by day, musician by night. Looking for someone to jam with or just chill and watch Netflix.",
    images: [imgMan1, imgMan2],
    tags: ["Music", "Coding", "Netflix", "Guitar"],
    distance: 5,
    job: "Developer"
  },
  {
    id: "3",
    name: "Elena",
    age: 26,
    bio: "Art lover and museum hopper. I paint in my free time and love a good glass of wine. 🍷🎨",
    images: [imgWoman3, imgWoman2],
    tags: ["Art", "Wine", "Museums", "Painting"],
    distance: 8,
    job: "Art Curator"
  },
  {
    id: "4",
    name: "David",
    age: 25,
    bio: "Fitness junkie and outdoor explorer. If I'm not at the gym, I'm probably hiking a mountain. 🏔️💪",
    images: [imgMan3, imgMan1],
    tags: ["Fitness", "Hiking", "Outdoors", "Gym"],
    distance: 12,
    job: "Personal Trainer"
  },
  {
    id: "5",
    name: "Jessica",
    age: 23,
    bio: "Just graduated and figuring out life. love dogs, spontaneous road trips, and sushi dates. 🐶🍣",
    images: [imgWoman2, imgWoman1],
    tags: ["Dogs", "Road Trips", "Sushi", "Students"],
    distance: 2,
    job: "Marketing Intern"
  },
  {
    id: "6",
    name: "James",
    age: 29,
    bio: "Chef who loves to cook for people. My love language is food. Let me make you dinner? 🍝",
    images: [imgMan2, imgMan3],
    tags: ["Cooking", "Foodie", "Chef", "Wine"],
    distance: 6,
    job: "Sous Chef"
  }
];
