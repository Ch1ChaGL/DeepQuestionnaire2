import { $authHost, $host } from "./index";

export const createReport = async (report) => {
  const createdReport = await $authHost.post("api/report", report);
  return createdReport;
};
