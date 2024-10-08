import Fees from "../models/fees.js"; // Import the Fees model

// Function to create initial fees if none exist
export const createInitialFees = async () =>{
  try {
    // Check if any documents exist
    const count = await Fees.countDocuments();
    if (count === 0) {
      // Create three new documents
      const fees = [
        { section: 'nursery', amount: 5000 },
        { section: 'primary', amount: 8000 },
        { section: 'juniorSecondary', amount: 10000 },
        { section: 'seniorSecondary', amount: 14000}
      ];
      // Insert the documents
      const createdFees = await Fees.create(fees);
      console.log('Created fees documents:', createdFees);
    }
  } catch (error) {
    console.error('Error creating fees:', error);
  } 
}

export function splitName(fullName) {
  // Trim any extra spaces and split the string by spaces
  const nameParts = fullName.trim().split(' ');

  // Initialize firstName and lastName
  let firstName = '';
  let lastName = '';

  // Assign values based on the length of the nameParts array
  if (nameParts.length > 1) {
    firstName = nameParts[0];
    lastName = nameParts.slice(1).join(' ');
  } else {
    firstName = nameParts[0]; 
  }

  return { firstName, lastName };
}