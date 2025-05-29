import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

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
  format = "DD/MM/YYYY"
) => {
  if (date) {
    return dayjs(date, "DD-MM-YYYY").format(format);
  }
  return "";
};

export function convertDate(date: string, format: string): string {
  const parsedDate = dayjs(date, "MM-DD-YYYY");
  return parsedDate.format(format);
}

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
  noFraction = false,
}: {
  value: number | string | undefined;
  locale?: string;
  currencySymbol?: string;
  noFraction?: boolean;
}): string => {
  if (!value || isNaN(Number(value))) {
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

interface initializeNameProp {
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
}
export function initializeName({
  first_name,
  last_name,
  full_name,
}: initializeNameProp) {
  if (first_name && last_name) {
    return `${first_name} ${last_name.charAt(0)}.`;
  } else if (first_name) return first_name;
  else if (last_name) return last_name;
  else if (full_name) {
    const nameParts = full_name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `${firstName} ${lastName.charAt(0)}.`;
  }
  return "Guest";
}
export function loggedInUser(first_name: any, last_name: any) {
  if (first_name && last_name) {
    return `${first_name} ${last_name}`;
  } else if (first_name) return first_name;
  else if (last_name) return last_name;
  return "Guest";
}
export function formatTime(dateString: string, format = "hh:mm a"): string {
  // Parse the date string and format it as time (11:23 am)
  return dayjs(dateString).format(format);
}
export const maxDate = dayjs().subtract(18, "year");

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
