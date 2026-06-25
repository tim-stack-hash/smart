import type { CourseDirection } from '../types';

export type LeadPayload = {
  parentName: string;
  phone: string;
  childName: string;
  childAge: number;
  direction: CourseDirection | 'all';
  format: 'offline' | 'online';
};

export async function sendLeadToServer(payload: LeadPayload): Promise<void> {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to send lead: ${res.status}`);
  }
}

