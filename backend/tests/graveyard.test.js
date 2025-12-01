import Graveyard from '../models/Graveyard.js';

describe('Graveyard Model', () => {
  test('should create a graveyard with required fields', () => {
    const graveyardData = {
      originalUrl: 'https://example.com',
      scannedAt: new Date(),
      deadLinks: [
        {
          url: 'https://example.com/dead-page',
          statusCode: 404,
          lastChecked: new Date()
        }
      ],
      totalLinksScanned: 10,
      scanDuration: 5000
    };

    const graveyard = new Graveyard(graveyardData);
    
    expect(graveyard.originalUrl).toBe('https://example.com');
    expect(graveyard.deadLinks).toHaveLength(1);
    expect(graveyard.deadLinks[0].statusCode).toBe(404);
    expect(graveyard.totalLinksScanned).toBe(10);
  });

  test('should have deadLinkCount virtual property', () => {
    const graveyard = new Graveyard({
      originalUrl: 'https://example.com',
      deadLinks: [
        { url: 'https://example.com/dead1', statusCode: 404, lastChecked: new Date() },
        { url: 'https://example.com/dead2', statusCode: 404, lastChecked: new Date() }
      ],
      totalLinksScanned: 10
    });

    expect(graveyard.deadLinkCount).toBe(2);
  });

  test('should validate required fields', () => {
    const graveyard = new Graveyard({});
    const validationError = graveyard.validateSync();
    
    expect(validationError).toBeDefined();
    expect(validationError.errors.originalUrl).toBeDefined();
  });
});
