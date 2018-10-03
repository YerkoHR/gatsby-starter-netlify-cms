import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// the contentComponent || content lines ad relations are to fix a preview bug in the netlify cms

export const BlogPostTemplate = ({
  content,
  tags,
  title,
  contentComponent,
  faction,
  debut,
  nen,
  img,
  imgFluid
}) => {
  const PostContent = contentComponent || Content;
  return (
    <div className="profile">
      <Helmet title={`${title} | Character`} />
      <div className="grid">
        <div className="sub-grid">
          <ul className="section-1">
            <h3 className="character__name">{title}</h3>

            {faction && <li>Faction: {faction}</li>}
            {nen && <li>Nen type: {nen}</li>}
            {debut && <li>DC debut: {debut}</li>}
          </ul>
          <PostContent className="section-2" content={content} />

          {tags && tags.length ? (
            <div className="section-3">
              <ul className="taglist">
                {tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link className={`${tag}`} to={`/tags/${kebabCase(tag)}/`}>
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        {imgFluid ? <Img fluid={imgFluid} /> : <img src={img} alt="" />}
      </div>
    </div>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string
};

const BlogPost = ({ data }) => {
  const { frontmatter: post } = data.markdownRemark;
  return (
    <Layout>
      <BlogPostTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        faction={post.faction}
        tags={post.tags}
        title={post.title}
        debut={post.debut}
        imgFluid={post.profileImage.childImageSharp.fluid}
        img={post.profileImage.childImageSharp.fluid.src}
        nen={post.nen}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        faction
        title
        nen
        profileImage {
          childImageSharp {
            fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
        debut
      }
    }
  }
`;
