
const BFF_ERROR_MAP = new Map<string, string>([
    ['EMAIL_ALREADY_TAKEN', 'Email is already taken, please try different.'],
    ['INVALID_INPUT', 'Provided input is not correct.'],
    ['UNAUTHORIZED', 'You are not authorized to take this action.'],
    ['UNMAPPED', 'Something went wrong, try again.'],
    ['NO_USERS_FOUND', 'No users found in the system'],
    ['TEST_CYCLE_CLOSED', 'Testing cycle closed.']
]);

export default function getErrorMessage(errorCode: string): string {
  return BFF_ERROR_MAP.get(errorCode) ?? BFF_ERROR_MAP.get('UNMAPPED') ?? 'Unknown error';
}