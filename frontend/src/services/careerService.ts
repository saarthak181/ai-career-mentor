import api from "@/lib/api";

export const careerService = {
  async matchCareers(skills: string[]) {
    const { data } = await api.post("/career/match", { skills });
    return data;
  },

  async gapAnalysis(skills: string[], targetRole: string) {
    const { data } = await api.post("/career/gap-analysis", {
      skills,
      target_role: targetRole,
    });
    return data;
  },
};
