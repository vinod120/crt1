import { format, isValid, parseISO } from "date-fns";

export const STALE_TIME = 5 * 60 * 1000;
export const DEBOUNCE_DELAY = 500;

export const getDateFormat = (date?: string | Date) => {
  let dateToFormat: Date;

  if (typeof date === "string") {
    const parsed = parseISO(date);
    dateToFormat = isValid(parsed) ? parsed : new Date();
  } else {
    dateToFormat = date && isValid(date) ? date : new Date();
  }
  return format(dateToFormat, "dd-MMM-yyyy, hh:mm:ss");
};

export const formatNumber = (num: any) => {
  if (num == 0) return num;
  return num?.toString()?.padStart(2, "0");
};
export const getReportPdfUrl = (fileName: string) =>
  `${
    import.meta.env?.VITE_BASE_API_URL
  }/api/Reporting/GetReportPdf/${encodeURIComponent(fileName)}`;

export const reportTypeStyles: Record<
  string,
  { symbol: string; color: string }
> = {
  SetupReport: { symbol: "Setup Report", color: "#1890ff" },
  DetailedReport: { symbol: "Detailed Report", color: "#52c41a" },
  SummaryReport: { symbol: "Summary Report", color: "#fa8c16" },
  SpreadSheetReport: { symbol: "SpreadSheet Report", color: "#eb2f96" },
  AuditTrailReport: { symbol: "Audit Trail Report", color: "#722ed1" },
  PassFailCriteriaReport: {
    symbol: "Pass/Fail Criteria Report",
    color: "#13c2c2",
  },
};
