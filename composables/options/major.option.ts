type Major = {
    label: string,
    value: string,
}

const MajorOptions: Major[] = [
    { value: "math", label: "Toán" },
    { value: "information", label: "Toán Tin" },
    { value: "literature", label: "Văn" },
    { value: "english", label: "Anh" },
    { value: "biology", label: "Sinh học" },
    { value: "history", label: "Lịch sử" },
    { value: "geography", label: "Địa lý" },
    { value: "chinese", label: "Trung" },
    { value: "physics", label: "Vật lý" },
    { value: "chemistry", label: "Hoá học" },
    { value: "unknown", label: "Chất lượng cao" },
    { value: "other", label: "Khác" },
]

export const MajorMap: Record<string, string> = {
  math: "Toán",
  information: "Toán Tin",
  literature: "Văn",
  english: "Anh",
  biology: "Sinh học",
  history: "Lịch sử",
  geography: "Địa lý",
  chinese: "Trung",
  physics: "Vật lý",
  chemistry: "Hoá học",
  unknown: "Chất lượng cao",
  other: "Khác"
};

export default MajorOptions