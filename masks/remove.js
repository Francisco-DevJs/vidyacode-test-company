export const removeSpecialCaracters = value => {
    return value
    .replace(/[^A-Z0-9]/ig, "");
  } 