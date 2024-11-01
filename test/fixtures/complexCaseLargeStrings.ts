// complexCaseEntities are passed into save for the complex case.
const longString = Buffer.alloc(1501, '.').toString();
export const complexCaseEntities = {
  longString,
  notMetadata: true,
  longStringArray: [longString],
  metadata: {
    longString,
    otherProperty: 'value',
    obj: {
      longStringArray: [
        {
          longString,
          nestedLongStringArray: [
            {
              longString,
              nestedProperty: true,
            },
            {
              longString,
            },
          ],
        },
      ],
    },
    longStringArray: [
      {
        longString,
        nestedLongStringArray: [
          {
            longString,
            nestedProperty: true,
          },
          {
            longString,
          },
        ],
      },
    ],
  },
};
