export const errorParser = (errors: any, touched: any, type: string) => {
  if (touched[type] && errors[type]) {
    return errors[type];
  } else {
    return null;
  }
};

/**
 * Function that retrieves a given item from LocalStorage.
 * @param {String} key LocalStorage lookup key.
 * @returns Parsed object value associated with the given key or null.
 */
export const retrieveToken = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) ?? "{}");
  }
};

/**
 * Function that stores a given object by key in LocalStorage.
 * @param {String} key LocalStorage lookup key.
 * @param {Object} object The object to store in LocalStorage.
 */
export const storeToken = (key: string, object: any) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const readableDate = (date: any) => {
  const d = new Date(date);
  return d.toDateString();
};

// export const ggg = (arr1 = [], arr2 = [], dataArray: any) => {
//   dataArray.forEach((item: any) => {
//     arr1.push(item);
//     arr2.push(item)
//   })
//   return { arr1, arr2 }
// }

export const formatAmount = (value: number | string | undefined): string => {
  if (!value) return "0.00";

  // Convert to string and split by decimal point
  const [integerPart, decimalPart = "00"] = String(value).split(".");

  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Ensure decimal part has exactly 2 digits
  const formattedDecimal = decimalPart.padEnd(2, "0").slice(0, 2);

  return `₦${formattedInteger}.${formattedDecimal}`;
};

// Improved formatNumberWithCommas function that preserves decimal points
export const formatNumberWithCommas = (value: string | number): string => {
  if (value === undefined || value === null) return "";

  // Convert to string if it's a number
  const stringValue = String(value);

  // Split the input at decimal point
  const parts = stringValue.split(".");

  // Format the integer part with commas
  const integerPart = parts[0]
    .replace(/[^\d]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Check if there was a decimal part
  if (parts.length > 1) {
    // Keep only the decimal part (no commas here)
    const decimalPart = parts[1].replace(/[^\d]/g, "");
    return `${integerPart}.${decimalPart}`;
  }

  // If there was a decimal point but no digits after it (e.g., "100.")
  if (stringValue.endsWith(".")) {
    return `${integerPart}.`;
  }

  return integerPart;
};

// Parse the formatted number back to a numeric value for submission
export const parseFormattedNumber = (value: string): number => {
  // Remove commas and convert to number
  const parsedValue = parseFloat(value.replace(/,/g, "") || "0");
  return isNaN(parsedValue) ? 0 : parsedValue;
};

// Custom handler for number input fields with comma formatting
export const handleFormattedNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any) => void,
  pushData?: (e: any) => void
) => {
  const { name, value } = e.target;

  // Keep the raw value (with decimal point) in formik state
  // This allows correct numeric submission
  const numericValue = value.replace(/,/g, "");

  // Update the form value with the raw numeric string
  setFieldValue(name, numericValue);

  // Call pushData if provided
  if (pushData) {
    pushData(e);
  }
};

// Custom change handler
export const handleNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any) => void
) => {
  const { name, value } = e.target;

  // Store the raw number (without commas) in form values
  const rawValue = value.replace(/,/g, "");
  setFieldValue(name, rawValue);

  // Format the display value with commas
  const formattedValue = formatNumberWithCommas(value);
  e.target.value = formattedValue;
};
