import { EventType } from "@/generated/prisma";

export interface IEvent {
  id: string;
  type: EventType;
  title: string;
  time: string;
  date: Date;
  location: string;
  address: string;
  description: string;
  ceus: number;
  image: string;
  expected_attendees: number;
  createdAt: Date;
  updatedAt: Date
  isFinished: boolean;
  isLatest: boolean;
}