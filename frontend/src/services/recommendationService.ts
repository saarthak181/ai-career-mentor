import api from "@/lib/api";

export const recommendationService = {
  async getCareerPlan(skills: string[], targetRole: string) {
    const { data } = await api.post("/recommendation/career-plan", {
      skills,
      target_role: targetRole,
    });
    return data;
  },
};
