
export enum ComplaintStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

export enum ComplaintCategory {
  Roads = 'Roads',
  Electricity = 'Electricity',
  Water = 'Water',
  Garbage = 'Garbage',
  Other = 'Other',
}

export interface AdminReply {
  id: string;
  author: string;
  date: string;
  message: string;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  imageUrl?: string;
  status: ComplaintStatus;
  submittedDate: string;
  replies: AdminReply[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Admin {
    id: string;
    name: string;
    email: string;
}
