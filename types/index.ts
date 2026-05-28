export type UserRole = "STUDENT" | "ADMIN";

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface CollegeType {
  id: string;
  name: string;
  location: string;
  rank?: number;
  fees?: number;
  placement?: string;
  rating?: number;
  images: string[];
  slug: string;
  createdAt: Date;
}

export interface CourseType {
  id: string;
  collegeId: string;
  courseName: string;
  duration: string;
  eligibility: string;
}

export interface ReviewType {
  id: string;
  userId: string;
  collegeId: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: Date;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}