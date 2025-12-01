import { 
  getSpookyStatus, 
  createResponse, 
  createError,
  GRAVEDIGGER_ERRORS 
} from '../utils/responseHelper.js';

describe('Response Helper', () => {
  test('getSpookyStatus returns a string', () => {
    const status = getSpookyStatus();
    expect(typeof status).toBe('string');
    expect(status.length).toBeGreaterThan(0);
  });

  test('createResponse includes spooky_status and data', () => {
    const data = { test: 'value' };
    const response = createResponse(data);
    
    expect(response).toHaveProperty('spooky_status');
    expect(response).toHaveProperty('data');
    expect(response.data).toEqual(data);
  });

  test('createResponse accepts custom spooky status', () => {
    const customStatus = 'Custom spooky message';
    const response = createResponse({}, customStatus);
    
    expect(response.spooky_status).toBe(customStatus);
  });

  test('createError includes spooky_status and error object', () => {
    const error = createError('Test error', 'TEST_CODE', 400);
    
    expect(error).toHaveProperty('spooky_status');
    expect(error).toHaveProperty('error');
    expect(error.error.message).toBe('Test error');
    expect(error.error.code).toBe('TEST_CODE');
    expect(error.statusCode).toBe(400);
  });

  test('GRAVEDIGGER_ERRORS contains all expected error types', () => {
    const expectedErrors = [
      'INVALID_URL',
      'NETWORK_ERROR',
      'DATABASE_ERROR',
      'TIMEOUT',
      'NOT_FOUND',
      'RATE_LIMIT',
      'LLM_FAILURE',
      'WAYBACK_UNAVAILABLE',
      'SCAN_FAILED',
      'INVALID_REQUEST',
      'INTERNAL_ERROR'
    ];

    expectedErrors.forEach(errorType => {
      expect(GRAVEDIGGER_ERRORS).toHaveProperty(errorType);
      expect(GRAVEDIGGER_ERRORS[errorType]).toHaveProperty('message');
      expect(GRAVEDIGGER_ERRORS[errorType]).toHaveProperty('code');
    });
  });

  test('gravedigger error messages are in character', () => {
    // Check that error messages contain gravedigger-themed language
    const errorMessage = GRAVEDIGGER_ERRORS.INVALID_URL.message;
    expect(errorMessage.toLowerCase()).toMatch(/bones|dig|grave|cursed|ground/);
  });
});
