// export const evaluateConditions = (field, fields, formValues) => {
//   // If no conditions are provided, always show the field
//   if (!field.conditions || field.conditions.length === 0) {
//     return true;
//   }

//   let conditionMet = false; // Track if any condition is met

//   // Loop through each condition of the field
//   for (let condition of field.conditions) {
//     // Find the source field in fields array
//     const sourceField = fields.find(f => f.id === condition.sourceField);
//     if (!sourceField) {
//       continue;
//     }

//     // Get the value of the field from formValues
//     const fieldValue = formValues[`field_${sourceField.id}`];

//     const conditionValue = condition.value;
//     let conditionResult = false; // Result of the current condition

//     switch (condition.operator) {
//       case 'equals':
//         conditionResult = fieldValue?.trim() === conditionValue?.trim();
//         break;
//       case 'not_equals':
//         conditionResult = fieldValue?.trim() !== conditionValue?.trim();
//         break;
//       case 'greater_than':
//         conditionResult = parseFloat(fieldValue) > parseFloat(conditionValue);
//         break;
//       case 'less_than':
//         conditionResult = parseFloat(fieldValue) < parseFloat(conditionValue);
//         break;
//       case 'contains': // Check if the field contains the condition value
//         conditionResult = fieldValue && fieldValue.includes(conditionValue);
//         break;
//       default:
//         break;
//     }

//     // If any condition is met, set conditionMet to true and break out of the loop
//     if (conditionResult) {
//       conditionMet = true;
//       break; 
//     }
//   }

//   return conditionMet;
// };

// export const evaluateConditions = (field, fields, formValues) => {
//   // If no conditions are provided, always show the field
//   if (!field.conditions || field.conditions.length === 0) {
//     return true;
//   }

//   // Check if any condition is met using the `some` method
//   return field.conditions.some(condition => {
//     // Find the source field in fields array
//     const sourceField = fields.find(f => f.id === condition.sourceField);
//     if (!sourceField) {
//       return false; // Skip this condition if the source field is not found
//     }

//     // Get the value of the field from formValues
//     const fieldValue = formValues[`field_${sourceField.id}`];

//     const conditionValue = condition.value;
//     let conditionResult = false; // Result of the current condition

//     switch (condition.operator) {
//       case 'equals':
//         conditionResult = fieldValue?.trim() === conditionValue?.trim();
//         break;
//       case 'not_equals':
//         conditionResult = fieldValue?.trim() !== conditionValue?.trim();
//         break;
//       case 'greater_than':
//         conditionResult = parseFloat(fieldValue) > parseFloat(conditionValue);
//         break;
//       case 'less_than':
//         conditionResult = parseFloat(fieldValue) < parseFloat(conditionValue);
//         break;
//       case 'contains': // Check if the field contains the condition value
//         conditionResult = fieldValue && fieldValue.includes(conditionValue);
//         break;
//       default:
//         break;
//     }

//     return conditionResult; // If any condition returns true, `some` will stop and return true
//   });
// };

export const evaluateConditions = (field, fields, formValues) => {
  // If no conditions are provided, always show the field
  if (!field.conditions || field.conditions.length === 0) {
    return true;
  }

  // Check if any condition is met using the `some` method
  return field.conditions.some(condition => {
    // Find the source field in fields array
    const sourceField = fields.find(f => f.id === condition.sourceField);
    if (!sourceField) {
      return false; // Skip this condition if the source field is not found
    }

    // Get the value of the field from formValues
    const fieldValue = formValues[`field_${sourceField.id}`];
    const conditionValue = condition.value;

    let conditionResult = false; // Result of the current condition

    // Function to safely parse numbers
    const parseNumber = (value) => {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? NaN : parsed;
    };

    // Ensure fieldValue is treated as a string before calling trim
    const fieldValueAsString = typeof fieldValue === 'string' ? fieldValue : String(fieldValue);

    switch (condition.operator) {
      case 'equals':
        conditionResult = fieldValueAsString.trim() === conditionValue?.trim();
        break;
      case 'not_equals':
        conditionResult = fieldValueAsString.trim() !== conditionValue?.trim();
        break;
      case 'greater_than':
        // Parse values as numbers and compare
        conditionResult = parseNumber(fieldValue) > parseNumber(conditionValue);
        break;
      case 'less_than':
        // Parse values as numbers and compare
        conditionResult = parseNumber(fieldValue) < parseNumber(conditionValue);
        break;
      case 'contains': // Check if the field contains the condition value
        conditionResult = fieldValueAsString && fieldValueAsString.includes(conditionValue);
        break;
      default:
        break;
    }

    return conditionResult; // If any condition returns true, `some` will stop and return true
  });
};
