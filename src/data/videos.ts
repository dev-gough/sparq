// Educational Videos
export const educationalVideos = [
    { id: 1, title: 'PV Systems 101', thumbnail: '/pv101_thumbnail.jpg', url: 'gl5tY5Noacc', iFrame: true },
    { id: 2, title: 'Global Warming 101', thumbnail: '/globalwarming101_thumbnail.jpg', url: 'oJAbATJCugs', iFrame: true },
    { id: 3, title: 'Climate Change 101', thumbnail: '/climatechange101_thumbnail.jpg', url: 'jAa58N4Jlos', iFrame: true },
]

// Investor Videos
export const investorVideos = [
    { id: 6, title: 'Sparq Systems Investor Presentation', thumbnail: 'https://img.youtube.com/vi/gaFi_dPnYNk/maxresdefault.jpg', url: 'gaFi_dPnYNk', iFrame: true },
    { id: 7, title: 'CEO Interview - Market Strategy', thumbnail: 'https://img.youtube.com/vi/0sdcGgL9228/maxresdefault.jpg', url: '0sdcGgL9228', iFrame: true }
]

// Installer Videos
export const installerVideos = [
    { id: 8, title: 'Quad2/3 Installation Guide', thumbnail: 'https://img.youtube.com/vi/r05zC7wY7NQ/maxresdefault.jpg', url: 'r05zC7wY7NQ', iFrame: true },
    { id: 9, title: 'SparqLinq Installation Guide', thumbnail: 'https://img.youtube.com/vi/nhH8LrnONxs/maxresdefault.jpg', url: 'nhH8LrnONxs', iFrame: true },
    { id: 10, title: 'SparqSync Demo', thumbnail: '/sparqsync_splash.jpg', url: '/external-sparq-app.mp4', iFrame: false }
]

// Homeowner Videos
export const homeownerVideos = [
    { id: 5, title: "JioThings Sparq Microinverter Overview", thumbnail: "/jio_thumbnail.jpg", url: "a9tKIsI6t4I", iFrame: true },
    { id: 12, title: 'Sparq Microinverter Overview', thumbnail: 'https://img.youtube.com/vi/5u3KVFYHfk0/maxresdefault.jpg', url: '5u3KVFYHfk0', iFrame: true }
]

// All videos combined for popup handling
export const allVideos = [...educationalVideos, ...investorVideos, ...installerVideos, ...homeownerVideos]

export interface Video {
    id: number;
    title: string;
    thumbnail: string;
    url: string;
    iFrame: boolean;
}