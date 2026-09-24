import { createStore } from "@/lib/trainer-store";
import { certificates, exercises, lessonPlans, plans, trainerReviews } from "@/lib/mock/trainer";

export const certStore = createStore(certificates);
export const lessonStore = createStore(lessonPlans);
export const exerciseStore = createStore(exercises);
export const reviewStore = createStore(trainerReviews);
export const planStore = createStore(plans);
