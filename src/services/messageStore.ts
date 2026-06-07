export type CoffeeMood = 'happy' | 'curious' | 'chat';

export type CoffeeMessage = {
  id: string;
  content: string;
  mood: CoffeeMood;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'solsken-coffee-chat-v1';

function readMessages(): CoffeeMessage[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeMessages(messages: CoffeeMessage[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const messageStore = {
  listOwnMessages() {
    return readMessages().sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  },

  createMessage(content: string, mood: CoffeeMood) {
    const now = new Date().toISOString();
    const message: CoffeeMessage = {
      id: createId(),
      content,
      mood,
      createdAt: now,
      updatedAt: now,
    };
    writeMessages([message, ...readMessages()]);
    return message;
  },

  updateMessage(id: string, content: string, mood: CoffeeMood) {
    const now = new Date().toISOString();
    let updated: CoffeeMessage | null = null;
    const messages = readMessages().map((message) => {
      if (message.id !== id) return message;
      updated = { ...message, content, mood, updatedAt: now };
      return updated;
    });
    writeMessages(messages);
    return updated;
  },

  deleteMessage(id: string) {
    writeMessages(readMessages().filter((message) => message.id !== id));
  },
};
