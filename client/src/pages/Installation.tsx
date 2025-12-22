import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, FileText, Download } from "lucide-react";

export default function Installation() {
  const videos = [
    { title: "How to Install Standoff Barrels", id: "v1", url: "https://www.youtube.com/embed/placeholder1" },
    { title: "Wire Suspension Kit Installation", id: "v2", url: "https://www.youtube.com/embed/placeholder2" },
    { title: "Edge Grip Mounting Guide", id: "v3", url: "https://www.youtube.com/embed/placeholder3" },
    { title: "LED Standoff Wiring Tutorial", id: "v4", url: "https://www.youtube.com/embed/placeholder4" }
  ];

  const guides = [
    { title: "Standard Standoff Installation PDF", size: "1.2 MB" },
    { title: "Wire System Layout Guide", size: "2.4 MB" },
    { title: "StructureLite Assembly Instructions", size: "3.1 MB" },
    { title: "Load Capacity Chart", size: "0.5 MB" }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Install Gyford Standoff Systems",
    "description": "Step-by-step guide for installing aluminum standoffs for signage mounting.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Mark Holes",
        "text": "Hold your sign against the wall and mark the hole locations."
      },
      {
        "@type": "HowToStep",
        "name": "Drill & Anchor",
        "text": "Drill holes in the wall and insert appropriate anchors for your wall type."
      },
      {
        "@type": "HowToStep",
        "name": "Mount Barrels",
        "text": "Screw the standoff barrels into the anchors using the provided screws."
      },
      {
        "@type": "HowToStep",
        "name": "Attach Sign",
        "text": "Place your sign over the barrels, insert the caps through the sign holes, and hand-tighten into the barrels."
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Installation Guides & Videos | Mounting Standoffs</title>
        <meta name="description" content="Learn how to install standoff systems, wire kits, and edge grips. Watch video tutorials and download PDF guides." />
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <h1 className="text-4xl font-bold text-slate-900 mb-6">Installation Center</h1>
      <p className="text-lg text-slate-600 mb-12 max-w-3xl">
        Proper installation is critical for safety and longevity. Browse our library of video tutorials 
        and downloadable PDF guides to ensure your project is a success.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Video Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <PlayCircle className="h-6 w-6 text-primary" /> Video Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
                  <PlayCircle className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                  <Button variant="link" className="p-0 h-auto text-primary">Watch Video &rarr;</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* PDF Guides Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Downloadable Guides
          </h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <ul className="space-y-4">
              {guides.map((guide, idx) => (
                <li key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-400 group-hover:text-primary" />
                    <div>
                      <div className="font-medium text-slate-900">{guide.title}</div>
                      <div className="text-xs text-slate-500">{guide.size} • PDF</div>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="font-bold text-sm mb-2">Need Technical Help?</h4>
              <p className="text-sm text-slate-600 mb-4">
                Our support team can assist with load calculations and hardware selection.
              </p>
              <Button className="w-full">Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
