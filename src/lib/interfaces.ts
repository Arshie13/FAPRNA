import { NewsType } from "@/generated/prisma";

export interface INews {
  id: string;
  type: NewsType;
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