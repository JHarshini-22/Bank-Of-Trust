export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  phoneNumber?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  TELLER = 'teller',
  COMPLIANCE_OFFICER = 'compliance_officer',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
}
