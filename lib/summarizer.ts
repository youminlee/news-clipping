export async function summarize(text: string): Promise<string> {
  // TODO: Replace with OpenAI, HuggingFace, or open-source summarizer
  // For now, return the first 2 sentences as a mock summary
  const sentences = text.split(/(?<=\.|!|\?)\s/);
  return sentences.slice(0, 2).join(' ');
} 