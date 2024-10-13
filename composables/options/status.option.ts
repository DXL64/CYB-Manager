type Status = {
    label: string,
    value: string,
}

const StatusOptions: Status[] = [
    { value: "working", label: "Đang công tác" },
    { value: "retired", label: "Đã nghỉ hưu" },
    { value: "transfer", label: "Chuyển công tác" },
    { value: "passed_away", label: "Đã mất" },
]

export const StatusMap: Record<string, string> = {
  working: "Đang công tác",
  retired: "Nghỉ hưu",
  transfer: "Chuyển công tác",
  passed_away: "Đã mất",
};

export default StatusOptions