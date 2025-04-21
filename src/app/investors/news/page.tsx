import NewsItems from "@/components/NewsItems"

export default function NewsPage() {
    return (
        <section id="news" className="items-center justify-center px-4">
            <h1 className="text-center text-5xl font-light mt-16">Recent News</h1>
            <hr className="mb-16 mt-2 text-slate-300"/>
            <NewsItems />
        </section>
    )
}