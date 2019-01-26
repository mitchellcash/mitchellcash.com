import React from 'react'
import { Link, graphql } from 'gatsby'
import Card from 'react-bootstrap/lib/Card'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Layout from '../layout/layout'
import styles from "./blog.module.css"

export default ({ data }) => {
  return (
    <Layout>
      <Row>
        <Col lg="2"></Col>
        <Col xs={12} lg={8}>
          <Row className="mb-3">
            <Col>
              <h1 class="display-4">Blog</h1>
              <small>Subscribe <a href="/rss.xml">via RSS</a>.</small>
            </Col>
          </Row>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Row key={node.id} className="mb-3">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Subtitle className="text-muted mb-2"><small>{node.frontmatter.date}</small></Card.Subtitle>
                    <Link to={node.fields.slug} className={styles.postTitle}>
                      <Card.Title>{node.frontmatter.title}</Card.Title>
                    </Link>
                    <Link to={node.fields.slug} className={styles.postExcerpt}>
                      <Card.Text className="text-muted">{node.excerpt}</Card.Text>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </Col>
        <Col lg="2"></Col>
      </Row>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            title
            date(formatString: "D MMMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
