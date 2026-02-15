// Images from public/images – use in src via process.env.PUBLIC_URL
const imageFilenames = [
  'WhatsApp Image 2026-02-15 at 10.00.09.jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.34.jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.35.jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.36.jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.37.jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.38.jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.39.jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.39 (1).jpeg',
  'WhatsApp Image 2026-02-15 at 10.01.39 (2).jpeg',
];

const memoryCaptions = [
  "A moment I never want to forget",
  "You make every second worth living",
  "A timeless frame",
  "Happiness looks good",
  "Forever isn't long enough",
  "The good time",
  "My favorite view",
  "Where love lives",
  "Ferry in the world",
];

export const getGalleryImages = () =>
  imageFilenames.map((filename, index) => ({
    src: `${process.env.PUBLIC_URL || ''}/images/${encodeURIComponent(filename)}`,
    caption: memoryCaptions[index % memoryCaptions.length],
    id: `mem-${index}`,
  }));

// First 4 for featured section on landing
export const getFeaturedImages = () => getGalleryImages().slice(0, 4);
