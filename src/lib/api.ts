const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  createdAt: string;
}

export interface LeaderSlot {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: 'circle' | 'rectangle' | 'oval';
  borderColor?: string;
}

export interface CandidateSlot {
  x: number;
  y: number;
  width: number;
  height: number;
  blendBottom?: boolean;
}

export interface TextSlot {
  label: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  align?: 'left' | 'center' | 'right';
  y: number;
  defaultBangla?: string;
  backgroundColor?: string;
}

export interface Template {
  _id: string;
  title: string;
  occasionType: 'victory_day' | 'condolence' | 'campaign' | 'greetings' | 'eid';
  thumbnailUrl: string;
  canvasDimensions: { width: number; height: number };
  layoutConfig: {
    backgroundColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    leaderSlots: LeaderSlot[];
    candidateSlot: CandidateSlot;
    textSlots: {
      headline: TextSlot;
      candidateName: TextSlot;
      designation: TextSlot;
      party: TextSlot;
      footerCredit: TextSlot;
    };
  };
  isActive: boolean;
}

export interface Poster {
  _id: string;
  userId: string;
  templateId: Template | string;
  formData: {
    occasionType?: string;
    headlineBangla: string;
    candidateName: string;
    designation?: string;
    party?: string;
    area?: string;
    footerCredit?: string;
    customNotes?: string;
  };
  uploadedPhotos: {
    leaderPhotos: string[];
    candidatePhoto?: string;
  };
  generatedImageUrl?: string;
  previewUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  regenerationCount?: number;
  remainingRetries?: number;
  errorMessage?: string;
  createdAt: string;
}

class ApiClient {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('poster_token');
    }
    return null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during API request');
    }

    return data.data !== undefined ? data.data : data;
  }

  // --- Auth APIs ---
  async register(payload: { name: string; email?: string; phone?: string; password: string }): Promise<{ user: User; token: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async login(payload: { identifier: string; password: string }): Promise<{ user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getMe(): Promise<{ user: User }> {
    return this.request('/auth/me');
  }

  // --- Template APIs ---
  async getTemplates(occasionType?: string): Promise<{ templates: Template[]; count: number }> {
    const query = occasionType && occasionType !== 'all' ? `?occasionType=${occasionType}` : '';
    return this.request(`/templates${query}`);
  }

  async getTemplateById(id: string): Promise<Template> {
    return this.request(`/templates/${id}`);
  }

  // --- Upload APIs ---
  async uploadSingle(file: File, folder = 'candidates'): Promise<{ url: string; publicId: string; bytes: number }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request(`/upload/single?folder=${folder}`, {
      method: 'POST',
      body: formData,
    });
  }

  async uploadMultiple(files: File[], folder = 'leaders'): Promise<{ files: Array<{ url: string; publicId: string; bytes: number }>; count: number }> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    return this.request(`/upload/multiple?folder=${folder}`, {
      method: 'POST',
      body: formData,
    });
  }

  // --- Poster APIs ---
  async createPoster(payload: {
    templateId: string;
    candidateName: string;
    headlineBangla?: string;
    designation?: string;
    party?: string;
    area?: string;
    footerCredit?: string;
    customNotes?: string;
    uploadedPhotos?: {
      candidatePhoto?: string;
      leaderPhotos?: string[];
    };
    useAiSlogans?: boolean;
  }): Promise<Poster> {
    return this.request('/posters', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getPosterById(id: string): Promise<Poster> {
    return this.request(`/posters/${id}`);
  }

  async getUserPosters(): Promise<{ posters: Poster[]; count: number }> {
    return this.request('/posters/my-posters');
  }

  async regeneratePoster(
    id: string,
    payload: Partial<Poster['formData']> & { useAiSlogans?: boolean }
  ): Promise<Poster> {
    return this.request(`/posters/${id}/regenerate`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async deletePoster(id: string): Promise<{ id: string }> {
    return this.request(`/posters/${id}`, {
      method: 'DELETE',
    });
  }

  async polishText(payload: {
    occasionType: string;
    candidateName?: string;
    designation?: string;
    party?: string;
    area?: string;
    headlineBangla?: string;
    customNotes?: string;
  }): Promise<{
    headlineBangla: string;
    footerCreditBangla?: string;
    campaignMarka?: string;
    isAiGenerated: boolean;
  }> {
    return this.request('/posters/polish-text', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export const api = new ApiClient();
