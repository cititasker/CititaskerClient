import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { connectionFee } from "@/constant";
import moment from "moment";
dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorHandler = (error: any) => {
  if (error) {
    if (error?.errors) {
      let message = "";
      Object.entries(error.errors).forEach(([, value]: any) => {
        if (Array.isArray(value)) {
          message = value[0];
        } else {
          message = value;
        }
      });
      if (message.toLowerCase().includes("http")) {
        return "Something went wrong!";
      }
      return message;
    } else {
      return error?.message || error?.error;
    }
  } else {
    return "Something went wrong!";
  }
};

export const formatDate = (
  date: Date | string | undefined,
  outputFormat = "D MMM YYYY",
  inputFormat = "DD-MM-YYYY"
) => {
  if (!date) return "";
  return dayjs(date, inputFormat).format(outputFormat);
};

export const formatISODate = (
  date: Date | string | undefined,
  outputFormat = "DD-MM-YYYY",
  inputFormat = "YYYY-MM-DD"
) => {
  if (!date) return "";
  return dayjs(date, inputFormat).format(outputFormat);
};

export const formatDateAgo = (date: Date | string) => {
  return dayjs(date).fromNow();
};

export const truncate = (value: any, limit = 30) => {
  if (value) {
    return value.length <= limit ? value : value.substring(0, limit) + "...";
  }
  return null;
};

export const capitalize = (str: string | null) => {
  if (!str) return "";
  return str
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const convertBase64ToFile = (base64File: any, i: any) => {
  if (base64File) {
    const byteCharacters = atob(base64File.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }
    const blob = new Blob(byteArrays, { type: "application/octet-stream" });
    return new File([blob], `restoredFile${i}`, { type: blob.type });
  }

  return null;
};

export function base64ToFile(base64: string, filename: string): File {
  const mimeTypeMatch = base64.match(/^data:(image\/\w+);base64,/);
  if (!mimeTypeMatch) {
    throw new Error("Invalid base64 string or unsupported format");
  }
  const mimeType = mimeTypeMatch[1];

  const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
  const binaryString = atob(cleanBase64);

  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryString.length; i++) {
    uintArray[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([uintArray], { type: mimeType });
  return new File([blob], `image${filename}`, { type: mimeType });
}

export const formatCurrency = ({
  value,
  locale = "en-US",
  currencySymbol = "₦",
  noFraction = true,
}: {
  value: number | string | undefined;
  locale?: string;
  currencySymbol?: string;
  noFraction?: boolean;
}): string => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "";
  }

  const amount = typeof value === "string" ? parseFloat(value) : value;

  // Use Intl.NumberFormat to format the number without a currency code
  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: noFraction ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Prefix the formatted number with the "N" symbol
  return `${currencySymbol}${formattedAmount}`;
};

export const purgeData = ({
  storagePath,
  path,
}: {
  storagePath?: string;
  path: string;
}) => {
  if (typeof window !== "undefined") {
    const localPath = storagePath ?? "persist:task";
    const persistedTaskData = localStorage.getItem(localPath);
    if (persistedTaskData) {
      const taskSliceState = JSON.parse(persistedTaskData);
      delete taskSliceState[path];
      localStorage.setItem(localPath, JSON.stringify(taskSliceState));
    } else {
      console.error("No persist data found in localStorage");
    }
  }
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

interface InitializeNameProps {
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
}

export function initializeName({
  first_name,
  last_name,
  full_name,
}: InitializeNameProps): string {
  const firstName = first_name?.trim();
  const lastName = last_name?.trim();

  if (firstName && lastName) return `${firstName} ${getInitials(lastName)}.`;
  if (firstName) return firstName;
  if (lastName) return lastName;

  if (full_name?.trim()) {
    const parts = full_name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${getInitials(parts[parts.length - 1])}.`;
  }

  return "Anonymous";
}

export const getPartialInitials = (
  name?:
    | {
        first_name?: string;
        last_name?: string;
      }
    | IUser
) => {
  if (!name) return;
  return initializeName({
    first_name: name.first_name,
    last_name: name.last_name,
  });
};

export function loggedInUser(first_name: any, last_name: any) {
  if (first_name && last_name) {
    return `${first_name} ${last_name}`;
  } else if (first_name) return first_name;
  else if (last_name) return last_name;
  return "Anonymous";
}
export function formatTime(dateString: string, format = "hh:mm a"): string {
  // Parse the date string and format it as time (11:23 am)
  return dayjs(dateString).format(format);
}
export const maxDate = moment().endOf("day").toDate();

/**
 * Returns a maxDate based on how many years ago you want to subtract.
 * @param years - number of years to subtract from today (e.g., 18 for DOB)
 * @returns Date object
 */
export function getMaxDate(years?: number): Date {
  if (typeof years === "number") {
    return moment().subtract(years, "years").endOf("day").toDate();
  }

  return moment().endOf("day").toDate(); // default to today
}

export const updateQueryParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  return params.toString();
};

export const calculateFees = (amount: number, percentage = connectionFee) => {
  const fee = (percentage / 100) * amount;
  const receive = amount - fee;
  return { fee, receive };
};

export const normalizeUrl = (url: string): string => {
  if (/^https:\/\//i.test(url)) return url; // already https
  if (/^http:\/\//i.test(url)) return url.replace(/^http:\/\//i, "https://"); // convert http to https
  return `https://${url}`; // no protocol, prepend https
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export function extractPublicIdFromUrl(url?: any): string | undefined {
  if (!url) return undefined;
  const afterUpload = url.split("/upload/")[1] || url;
  return afterUpload.replace(/^v\d+\//, "").replace(/\.[^.]+$/, "");
}
