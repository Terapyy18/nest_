import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('Product Creation (e2e)', () => {
  let app: INestApplication<App>;
  let materialId: string;
  let printerId: string;
  let salesChannelId: string;
  let shippingProfileId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('should create a printer', async () => {
    const res = await request(app.getHttpServer())
      .post('/tools/printers')
      .send({
        brand: 'Bambu Lab',
        model: 'X1 Carbon',
        buildVolume: { x: 256, y: 256, z: 256 },
        nozzleTemperatureMax: 300,
        bedTemperatureMax: 100,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    printerId = res.body.id;
  });

  it('should create a sales channel', async () => {
    const res = await request(app.getHttpServer())
      .post('/tools/sales-channels')
      .send({
        name: 'Etsy',
        commissionPercentage: 0.06,
        fixedTransactionFee: 0.2,
        feesApplyToShipping: false,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    salesChannelId = res.body.id;
  });

  it('should create a shipping profile', async () => {
    const res = await request(app.getHttpServer())
      .post('/tools/shipping-profiles')
      .send({
        name: 'Standard',
        carrierCost: 7.99,
        packagingCost: 1.5,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    shippingProfileId = res.body.id;
  });

  it('should create a product configuration', async () => {
    const res = await request(app.getHttpServer())
      .post('/tools/product-configs')
      .send({
        name: 'Test Product',
        salesChannelId,
        shippingProfileId,
        desiredMargin: 0.3,
        electricityPrice: 0.15,
        parts: [
          {
            name: 'Main Part',
            printerId,
            materialId,
            printTimeHours: 2,
            weightGrams: 100,
          },
        ],
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Product');
    expect(res.body.parts).toHaveLength(1);
  });

  it('should get all products', async () => {
    const res = await request(app.getHttpServer())
      .get('/tools/product-configs')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
