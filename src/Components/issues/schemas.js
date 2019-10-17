import { gql } from 'apollo-boost'

export const LOGGED_IN_USER = gql`
  {
    viewer {
      login
    }
  }
`
export const ISSUES_ASSIGNED = gql`
  query issues($assignee: String!) {
    viewer {
      repositories(first: 100) {
        edges {
          node {
            issues(first: 50, states: OPEN, filterBy: { assignee: $assignee }) {
              nodes {
                id
                closed
                bodyText
                number
                authorAssociation
                locked
                title
                labels(first: 15) {
                  nodes {
                    id
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const CLOSE_ISSUE = gql`
  mutation closeIssue($issueId: ID!) {
    closeIssue(input: { issueId: $issueId }) {
      issue {
        closed
      }
    }
  }
`
