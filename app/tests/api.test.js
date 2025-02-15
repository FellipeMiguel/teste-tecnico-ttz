import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getOKRs } from "../api";

describe("API", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("deve verificar a estrutura básica dos OKRs", async () => {
    const mockResponse = [
      {
        id: "1",
        title: "Test OKR",
        name: "Test",
        percent: 0,
        createdAt: new Date().toISOString(),
        keyResults: [
          {
            id: "1-1",
            title: "Test Key Result",
            name: "Test KR",
            percent: 0,
            okrId: "1",
            createdAt: new Date().toISOString(),
            deliveries: [
              {
                name: "Test Delivery",
                percent: 0,
              },
            ],
          },
        ],
      },
    ];

    mockAxios.onGet("/okrs").reply(200, mockResponse);

    const expectedStructure = expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        name: expect.any(String),
        percent: expect.any(Number),
        createdAt: expect.any(String),
        keyResults: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            name: expect.any(String),
            percent: expect.any(Number),
            okrId: expect.any(String),
            createdAt: expect.any(String),
            deliveries: expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                percent: expect.any(Number),
              }),
            ]),
          }),
        ]),
      }),
    ]);

    const response = await getOKRs();

    expect(response.data).toEqual(expectedStructure);

    response.data.forEach((okr) => {
      expect(okr.keyResults).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            deliveries: expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                percent: expect.any(Number),
              }),
            ]),
          }),
        ])
      );
    });
  });
});
