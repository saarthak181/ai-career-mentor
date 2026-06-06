import api from "@/lib/api";

export const resumeService = {
  async upload(file: File) {
    const form = new FormData();
    form.append("file", file);
    const { data } = await api.post("/resume/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async getLatest() {
    const { data } = await api.get("/resume/latest");
    return data;
  },
};
