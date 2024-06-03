import React from "react";
import facebook from "../footer-images/facebook.svg";
import twitter from "../footer-images/twitter.svg";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled("footer")({
  padding: "20px",
  color: "white",
  background: "black",
});

const StyledBox = styled(Box)({
  padding: "10px",
  marginRight: "10px",
});

const Title = styled(Typography)({
  color: "white",
  marginBottom: "10px",
  textAlign: "left",
});

const LinkList = styled("ul")({
  listStyle: "none",
  padding: 0,
  textAlign: "left",
  lineHeight: "30px",
});

const StyledLink = styled("a")({
  color: "black",
  textDecoration: "none",
});

const SocialIcon = styled("img")({
  width: "40px",
  height: "40px",
  marginRight: "10px",
  cursor: "pointer",
  textAlign: "left",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <StyledBox>
            <Title variant="h6">Company</Title>
            <LinkList>
              <li>Community</li>
              <li>Blog</li>
              <li>Events</li>
            </LinkList>
          </StyledBox>
        </Grid>
        <Grid item xs={3}>
          <StyledBox>
            <Title variant="h6">Open Source</Title>
            <LinkList>
              <li>react-slick</li>
              <li>react-highlight</li>
            </LinkList>
          </StyledBox>
        </Grid>
        <Grid item xs={3}>
          <StyledBox>
            <Title variant="h6">Meetups</Title>
            <LinkList>
              <li>ReactJS Bangalore</li>
              <li>Blockchain Bangalore</li>
            </LinkList>
          </StyledBox>
        </Grid>
        <Grid item xs={3}>
          <StyledBox>
            <Title variant="h6">Social</Title>
            <StyledLink href="/twitter" target="_blank">
              <SocialIcon src={twitter} alt="Twitter" />
            </StyledLink>
            <StyledLink href="/facebook" target="_blank">
              <SocialIcon src={facebook} alt="Facebook" />
            </StyledLink>
          </StyledBox>
        </Grid>
      </Grid>
    </FooterContainer>
  );
};

export default Footer;
