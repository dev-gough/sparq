import AccordionItem from "./AccordianMenuItem";

interface YTProps {
  videoIds: string[];
}

export default function YTVideo({ videoIds }: YTProps) {
  return (
    <div className="flex flex-col gap-4">
      {videoIds.map((videoId) => (
        <AccordionItem title={videoId} key={videoId}>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={`YouTube video ${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
        </AccordionItem>
      ))}
    </div>
  );
};