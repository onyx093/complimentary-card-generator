export type CardFormData = {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  website?: string;
};

export type SavedCards = {
  template_id: string;
  user_id: string;
  full_name: string;
  position: string;
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
  id: string;
}

export type SavedCardGroup = {
  date: string;
  entries: SavedCards[];
};

export type SaveCardPayload = {
  templateId: string;
  formData: CardFormData;
};