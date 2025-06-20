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

export interface Nomination {
  id: string
  nominatorId: string
  nominee1Id: string
  createdAt: Date
  updatedAt: Date
  category: string
  reason: string
  status: string
  nominator: {
    id: string
    fullName: string
    email: string
  }
  nominee1: {
    id: string
    fullName: string
    email: string
  }
  nominee2?: {
    id: string
    fullName: string
    email: string
  }
  nominee3?: {
    id: string
    fullName: string
    email: string
  }
}

export interface NominationStats {
  total: number
  pending: number
  approved: number
  rejected: number
  categories: { [key: string]: number }
}

export interface Member {
  fullName: string
  email: string
  phone: string
}

export interface NominationForm {
  nominator: Member
  nominee: Member
  reason: string
  category: string
}