
export type DesignPhilosophy = 'Modernist' | 'Industrial' | 'Classical' | 'Biophilic';

export type ProjectCapacity = '1-2' | '3-5' | '6+';

export type ProfessionalRole = 'Interior Designer' | 'Architect' | 'Contractor' | 'Other' | 'Contact Inquiry';

export interface Lead {
  id: string;
  type?: 'booking' | 'contact_form' | 'callback_request';
  role?: ProfessionalRole;
  name: string;
  email: string;
  phone: string;
  philosophy?: DesignPhilosophy;
  capacity?: ProjectCapacity; 
  barrier?: string;
  message?: string; // Field for contact form messages
  scheduledDate?: string;
  scheduledTime?: string;
  submittedAt: string;
}

export interface AdminCredentials {
  username: string;
  pass: string;
}
