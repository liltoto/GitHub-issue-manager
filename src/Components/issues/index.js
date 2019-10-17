import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Loader, PanelGroup, Panel, ButtonToolbar, Button } from 'rsuite'
import { LOGGED_IN_USER, ISSUES_ASSIGNED, CLOSE_ISSUE } from './schemas'

export const removeIssueFromList = (data, issueId) => ({
  ...data,
  viewer: {
    ...data.viewer,
    repositories: {
      ...data.viewer.repositories,
      edges: data?.viewer?.repositories?.edges.map(nodes => ({
        ...nodes,
        node: {
          ...nodes.node,
          issues: {
            ...nodes.node.issues,
            nodes: nodes.node?.issues?.nodes?.filter(
              ({ id }) => id !== issueId
            ),
          },
        },
      })),
    },
  },
})

const CloseIssue = ({ issueId, assignee }) => {
  const [closeIssue] = useMutation(CLOSE_ISSUE)
  const closeIt = () =>
    closeIssue({
      variables: { issueId },
      update: proxy => {
        const data = proxy.readQuery({
          query: ISSUES_ASSIGNED,
          variables: { assignee },
        })
        proxy.writeQuery({
          query: ISSUES_ASSIGNED,
          variables: { assignee },
          data: removeIssueFromList(data, issueId),
        })
      },
    })
  return (
    <ButtonToolbar>
      <Button color="red" appearance="ghost" onClick={closeIt}>
        CLOSE ISSUE
      </Button>
    </ButtonToolbar>
  )
}

export const allIssuesFlatten = data =>
  [].concat(
    ...data?.viewer?.repositories?.edges.map(({ node }) => node.issues.nodes)
  )

const listOfIssues = (data, assignee) =>
  allIssuesFlatten(data).map(({ id, title, bodyText, labels }) => (
    <Panel key={id} header={title} eventKey={id}>
      {labels.nodes.map(({ name, color, id }) => (
        <div
          key={id}
          style={{
            backgroundColor: `#${color}`,
            padding: 15,
            marginBottom: 15,
          }}
        >
          {name}
        </div>
      ))}
      <div
        style={{
          marginBottom: 15,
        }}
      >
        {bodyText}
      </div>
      <div
        style={{
          marginBottom: 15,
        }}
      >
        <CloseIssue issueId={id} assignee={assignee} />
      </div>
    </Panel>
  ))

const Issues = ({ assignee }) => {
  const { loading, error, data } = useQuery(ISSUES_ASSIGNED, {
    variables: { assignee },
  })

  if (loading)
    return <Loader backdrop size="lg" content="fetching..." vertical />
  if (error) return <p>Error :(</p>

  return (
    <div style={{ padding: 15 }}>
      <PanelGroup accordion bordered>
        {listOfIssues(data, assignee)}
      </PanelGroup>
    </div>
  )
}

const CurrentUser = () => {
  const { loading, error, data } = useQuery(LOGGED_IN_USER)
  if (loading)
    return <Loader backdrop size="lg" content="fetching..." vertical />
  if (error) return <p>Error :(</p>
  return <Issues assignee={data.viewer.login}></Issues>
}

export default CurrentUser
