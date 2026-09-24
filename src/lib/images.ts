import gymHero from "@/assets/gym-hero.jpg";
import gymPt from "@/assets/gym-pt.jpg";
import gymWeights from "@/assets/gym-weights.jpg";
import gymClass from "@/assets/gym-class.jpg";
import gymWorkout from "@/assets/gym-workout.jpg";
import gymCardio from "@/assets/gym-cardio.jpg";

/** Shared gym imagery for the single GymFit gym. */
export const gymImages = {
  hero: gymHero,
  pt: gymPt,
  weights: gymWeights,
  class: gymClass,
  workout: gymWorkout,
  cardio: gymCardio,
};

const rotation = [gymWeights, gymWorkout, gymPt, gymCardio, gymClass, gymHero];

/** Deterministic image pick for a string id (packages, exercises, plans…). */
export function imageFor(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return rotation[h % rotation.length];
}
