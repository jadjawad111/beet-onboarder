import { Video, Lightbulb, Clock, Camera, Music, Film } from "lucide-react";

const VideoRubricsSection = () => {
  const technicalSpecs = [
    {
      concept: "Duration of video (with a ±)",
      goal: "Ensures the final product meets specified distribution or platform limits.",
      example: "Response includes video of length 15.0 ± 0.5 seconds"
    },
    {
      concept: "Duration of individual shots (with a ±)",
      goal: "Controls the editing pace and prevents viewer disorientation from overly brief or overly long shots.",
      example: "The video includes a shot of duration at least 10 seconds ± 1 second"
    },
    {
      concept: "File management",
      goal: "Guarantees required organizational structure and naming conventions for handoff and archival.",
      example: "The video file follows specified naming convention (e.g., AD_ProductX_vFinal.mp4)."
    },
    {
      concept: "Aspect ratios",
      goal: "Ensures the video is correctly framed for its intended viewing environment (e.g., cinema, social media, broadcast).",
      example: "The video adheres to a 16:9 aspect ratio without letterboxing or pillarboxing."
    },
    {
      concept: "Frame rate",
      goal: "Maintains consistency and fluidity of motion required for the delivery platform.",
      example: "The video maintains a consistent frame rate of 24 ± 0.05 frames per second."
    },
    {
      concept: "File codecs",
      goal: "Make sure codecs comply with the forum where the video will live (e.g., social media requires a specific codec).",
      example: "The video is encoded using the H.264 codec."
    },
    {
      concept: "Bitrate",
      goal: "Ensures adequate visual quality while managing file size, adhering to minimum/maximum bandwidth.",
      example: "The video's average variable bitrate (VBR) is between 8 and 12 Mbps."
    },
    {
      concept: "File size",
      goal: "Adheres to strict limits imposed by hosting services or distribution channels.",
      example: "The video file size does not exceed 250 MB (megabytes)."
    }
  ];

  const visualProduction = [
    {
      concept: "Visual content (logos, shots/frames)",
      goal: "Ensures key visual elements are present for the required duration and placement according to the prompt or brand guidelines.",
      example: "The video features a legible logo in the bottom right corner of the screen.\n\nThe video includes a shot of at least one of the following: a dog, a child, a baseball, a tennis ball, a park, a field, or a blue sky."
    },
    {
      concept: "Shot descriptions",
      goal: "Verifies appropriate variety and intention in visual storytelling techniques.",
      example: "The video opens with a dutched shot."
    },
    {
      concept: "Camera movements",
      goal: "Evaluates the intentional use of motion to emphasize emotional or visual moments.",
      example: "The video opens with a panning shot of a dog in a field."
    },
    {
      concept: "Consistency of visual language",
      goal: "Ensures the overall aesthetic (e.g., filters, graphics) is unified throughout the entire video.",
      example: "The video is entirely in black and white."
    },
    {
      concept: "Exposure / Lighting / Focus",
      goal: "Ensures technical integrity so that footage is clear, properly exposed, and free of distracting flaws.",
      example: "The video only uses a shallow depth of field."
    },
    {
      concept: "Resolution",
      goal: "Guarantees the final output quality meets the minimum display standard.",
      example: "The video maintains a minimum resolution of 1920 x 1080 with no visible compression artifacts or pixelation."
    },
    {
      concept: "Color grading",
      goal: "Confirms the color palette is intentionally crafted and consistently applied to achieve the desired tone.",
      example: "The video maintains uniform color saturation."
    }
  ];

  const audioProduction = [
    {
      concept: "Audio quality / No clipping",
      goal: "Ensures all dialogue and sound effects are clear, audible, and free from unwanted noise. Sets the average dialogue volume level appropriate for broadcast readiness.",
      example: "The video includes audible spoken dialogue.\n\nThe audio master track volume does not exceed 0 dBFS at any point during the video playback.\n\nThe video's dialogue maintains levels between 12 dBFS and 6 dBFS for broadcast readiness."
    },
    {
      concept: "Soundtracks",
      goal: "Confirms music usage is appropriate and legally compliant (if required by the prompt).",
      example: "The video employs a soundtrack of string instruments."
    },
    {
      concept: "No background noise",
      goal: "Ensures that important dialogue tracks are isolated and clean for clear comprehension. Maintains audio immersion and consistency during pauses or cuts within a scene.",
      example: "The video's dialogue tracks do not contain any of the following: audible background noise, wind, or distracting sounds during speaking segments.\n\nThe video features a continuous layer of matched room tone throughout all non-dialogue, non-music segments."
    },
    {
      concept: "Correctly synced to visuals",
      goal: "Ensures that all sound effects and dialogue match the corresponding on-screen action exactly.",
      example: "The video's dialogue is synchronized exactly to the corresponding on-screen visual action (lip-sync)."
    },
    {
      concept: "Stereo vs mono",
      goal: "Ensures the final audio mix is delivered in the correct channel format for the required distribution.",
      example: "The video's audio mix is delivered in stereo format, clearly distinguishing left and right channels."
    }
  ];

  const editingPacing = [
    {
      concept: "Temporal Pacing",
      goal: "Ensures the editing rhythm is engaging and guides the audience logically toward the conclusion.",
      example: "The video's tempo of the cuts accelerates in the last two minutes of run time."
    },
    {
      concept: "Eye tracking / Intershot continuity",
      goal: "Maintains continuity of sightlines to prevent visual disorientation across edits. Ensures spatial relationships and action flow seamlessly between consecutive shots.",
      example: "The video's edit maintains continuity of sightlines.\n\nThe video displays spatial relationships that flow between consecutive shots, avoiding visual disorientation."
    },
    {
      concept: "Transitions between shots",
      goal: "Confirms transitions are intentionally selected and aesthetically appropriate to the video's tone.",
      example: "The video employs dissolves to transition between each shot."
    },
    {
      concept: "Match cuts, jump cuts",
      goal: "Ensures continuity is maintained by linking similar visual elements and avoiding jarring, unintentional edits.",
      example: "The video edits utilizes a match cut to visually link the sun to the tennis ball."
    },
    {
      concept: "Captions",
      goal: "Ensures accessibility and clear delivery of information that may be visually or audibly conveyed in text.",
      example: "The video includes closed captions matching the audio dialogue.\n\nEach caption segment of the video remains on screen for a minimum of 1.5 seconds and a maximum of 4.0 seconds."
    },
    {
      concept: "Sequential logic",
      goal: "Confirms the narrative maintains chronological and causal consistency, providing a clear and coherent message flow.",
      example: "The video edit depicts the ball being thrown before the dog running into the field."
    }
  ];

  const renderTable = (items: Array<{concept: string, goal: string, example: string}>, icon: React.ReactNode, title: string, colorClass: string) => (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
      <div className={`px-5 py-4 ${colorClass} border-b border-border flex items-center gap-3`}>
        {icon}
        <span className="font-bold text-foreground">{title}</span>
      </div>
      <div className="divide-y divide-border">
        {items.map((item, index) => (
          <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
            <h5 className="font-semibold text-foreground mb-2">{item.concept}</h5>
            <p className="text-sm text-muted-foreground mb-3">{item.goal}</p>
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Example</p>
              <p className="text-sm text-foreground whitespace-pre-line">{item.example}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Video className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Writing Rubrics for Videos</h3>
            <p className="text-base text-foreground leading-relaxed">
              The following is a list of concepts or dimensions to consider when writing a rubric for a video or video editing task. Each rubric may include rubric items on less than all of these concepts. However, it is wise to consider if each concept is materially important for any given task.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      {renderTable(technicalSpecs, <Clock className="w-5 h-5 text-blue-600" />, "Technical Specifications", "bg-blue-500/10")}

      {/* Cinematography & Visual Production */}
      {renderTable(visualProduction, <Camera className="w-5 h-5 text-purple-600" />, "Cinematography & Visual Production", "bg-purple-500/10")}

      {/* Audio Production & Sound Design */}
      {renderTable(audioProduction, <Music className="w-5 h-5 text-green-600" />, "Audio Production & Sound Design", "bg-green-500/10")}

      {/* Editing, Pacing, and Narrative Flow */}
      {renderTable(editingPacing, <Film className="w-5 h-5 text-orange-600" />, "Editing, Pacing, and Narrative Flow", "bg-orange-500/10")}

      {/* Key Takeaway */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Key Takeaway</h4>
            <p className="text-sm text-foreground leading-relaxed">
              For video rubrics, consider all dimensions from technical specs to narrative flow. Always include ± tolerances for measurable values like duration, frame rate, and file size.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRubricsSection;
