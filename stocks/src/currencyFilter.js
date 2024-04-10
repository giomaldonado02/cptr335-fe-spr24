// CurrencyFilter.js
export function currencyFilter(value, currencySign = '$', decimalDigits = 2) {
    // Convert the value to a number if it's not already
    const parsedValue = parseFloat(value);
  
    // Check if the value is a valid number
    if (!isNaN(parsedValue)) {
      // Use toFixed to round the number to the specified decimalDigits
      const formattedValue = parsedValue.toFixed(decimalDigits);
      // Add currency sign before the numberconst stringValue = value.toString();
      let stringValue = formattedValue.toString();
      let parts = stringValue.split('.');
      if (parts.length > 1) {
        return currencySign + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + parts[1];
      }
      return currencySign + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      // If the value is not a valid number, return it as is
      return value;
    }
  }
  