import api from "@/lib/api";

export const mentorService = {
  async chat(question: string) {
    const { data } = await api.post("/mentor/chat", { question });
    return data;
  },

  async getHistory() {
    const { data } = await api.get("/mentor/history");
    return data;
  },
};
