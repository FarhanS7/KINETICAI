import { serve } from "inngest/next";

import { generateIndustryInsights } from "@/lib/inngest/functions";
import { inngest } from "@lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateIndustryInsights],
});
