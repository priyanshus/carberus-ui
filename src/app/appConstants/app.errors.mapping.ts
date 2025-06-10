
const BFF_ERROR_MAP = new Map<string, string>([
    ['EMAIL_ALREADY_TAKEN', 'Email is already taken, please try different.'],
    ['INVALID_INPUT', 'Provided input is not correct.'],
    ['UNAUTHORIZED', 'You are not authorized to take this action.'],
    ['UNMAPPED', 'Something went wrong, try again.'],
    ['NO_USERS_FOUND', 'No users found in the system'],
    ['TEST_CYCLE_CLOSED', 'Testing cycle closed.'],

    ['PROJECT_PREFIX_ALREADY_EXIST', 'Project code already exists, please try different.'],
    ['PROJECT_NAME_ALREADY_EXIST', 'Project name already exists, please try different.'],
    ['PROJECT_IN_ARCHIVED_STATE', 'Project is in archived state, cannot perform this action.'],
]);

export default function getErrorMessage(errorCode: string): string {
  return BFF_ERROR_MAP.get(errorCode) ?? BFF_ERROR_MAP.get('UNMAPPED') ?? 'Unknown error';
}