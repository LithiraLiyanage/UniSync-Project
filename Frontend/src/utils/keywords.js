const FORBIDDEN_KEYWORDS = ['assignment completion','do my assignment','exam answers','cheat','homework for me'];

export const checkIntegrity = (text) => {
  return FORBIDDEN_KEYWORDS.some(k => text.toLowerCase().includes(k));
};
