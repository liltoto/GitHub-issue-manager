import { allIssuesFlatten, removeIssueFromList } from './'

const mock = {
  viewer: {
    repositories: {
      edges: [
        {
          node: {
            issues: {
              nodes: [],
            },
          },
        },
        {
          node: {
            issues: {
              nodes: [
                {
                  id: 'MDU6SXNzdWU1MDgxNjYxMzg=',
                  closed: false,
                  bodyText: 'testing',
                  number: 1,
                  authorAssociation: 'OWNER',
                  locked: false,
                  title: 'Another Issue',
                  labels: {
                    nodes: [
                      {
                        id: 'MDU6TGFiZWw0NzQ1MDk3Nzk=',
                        name: 'question',
                        color: 'cc317c',
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            issues: {
              nodes: [],
            },
          },
        },
        {
          node: {
            issues: {
              nodes: [
                {
                  id: 'MDU6SXNzdWU1MDgwODA1ODM=',
                  closed: false,
                  bodyText: 'Demo description',
                  number: 1,
                  authorAssociation: 'OWNER',
                  locked: false,
                  title: 'Demo of bug',
                  labels: {
                    nodes: [
                      {
                        id: 'MDU6TGFiZWwxMzU0NDgzNTMy',
                        name: 'bug',
                        color: 'd73a4a',
                      },
                    ],
                  },
                },
                {
                  id: 'MDU6SXNzdWU1MDgwOTE3Mzk=',
                  closed: false,
                  bodyText: 'help me pls',
                  number: 2,
                  authorAssociation: 'OWNER',
                  locked: false,
                  title: 'Demo help',
                  labels: {
                    nodes: [
                      {
                        id: 'MDU6TGFiZWwxMzU0NDgzNTQx',
                        name: 'help wanted',
                        color: '008672',
                      },
                      {
                        id: 'MDU6TGFiZWwxMzU0NDgzNTUz',
                        name: 'question',
                        color: 'd876e3',
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            issues: {
              nodes: [],
            },
          },
        },
      ],
    },
  },
}

describe('<Issues />', () => {
  it('allIssuesFlatten', () => {
    expect(allIssuesFlatten(mock)).toHaveLength(3)
  })
  it('removeIssueFromList', () => {
    expect(
      allIssuesFlatten(removeIssueFromList(mock, 'MDU6SXNzdWU1MDgwOTE3Mzk='))
    ).toHaveLength(2)
  })
})
