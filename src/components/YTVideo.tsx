interface YTProps {
  videoIds: string[];
}

export default function YTVideo({ videoIds }: YTProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videoIds.map((videoId) => (
        <div className="relative" key={videoId} style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title={`YouTube video ${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      ))}
    </div>
  );
};