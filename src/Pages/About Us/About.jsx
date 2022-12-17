import { Badge, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import HeaderNew from "../../Components/Header/Header";

import './About.styles.scss'
export default function About() {
  return (
    <div className="about-container">
      <HeaderNew />
      <Container
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "200px",
          width: "100vw",
          flexWrap: "wrap",
          height: "500px",
        }}
      >
        <Card style={{ width: "55%", marginBottom: "30px", height: "50%" }}>
          <Card.Header as="h2">Aviral Budhani</Card.Header>
          <Card.Body>
            I am currently pursuing my under graduation in Information Technology
            Engineering from Maharaja Agrasen Institute of Technology in New
            Delhi. I am a keen learner ready to learn new and exciting
            technologies.
          </Card.Body>
          <Card.Footer>
            GitHub Code
            <span style={{ marginLeft: "4px" }}>
              <Link
                to={{ pathname: "https://github.com/itachi1101/Blog" }}
                target="_blank"
              >
                Link
              </Link>
            </span>
          </Card.Footer>
        </Card>
        <Card style={{ width: "40%", marginLeft: "20px", height: "50%" }}>
          <Card.Body>
            <Card.Title as="h5" style={{ textAlign: "center" }}>
              My Socials
            </Card.Title>
            <Container
              style={{
                display: "flex",
                marginBottom: "40px",
                justifyContent: "center",
              }}
            >
              <Link
                to={{ pathname: "https://www.linkedin.com/in/aviral1101/" }}
                target="_blank"
                style={{ marginLeft: "10px", textDecoration: "none" }}
              >
                <LinkedInIcon style={{ fontSize: "40px" }} />
              </Link>
              <Link
                to={{ pathname: "https://github.com/itachi1101" }}
                target="_blank"
                style={{ marginLeft: "30px", textDecoration: "none" }}
              >
                <GitHubIcon style={{ fontSize: "40px" }} />
              </Link>
            </Container>
            <Card.Title as="h5" style={{ textAlign: "center" }}>
              Coding PlatForms
            </Card.Title>
            <Container
              style={{
                display: "flex",
                marginBottom: "40px",
                justifyContent: "center",
              }}
            >
              <Link
                to={{ pathname: "https://leetcode.com/_helios" }}
                target="_blank"
                style={{ marginLeft: "30px", textDecoration: "none" }}
              >
                <Badge bg="warning" text="dark">
                  LEETCODE
                </Badge>
              </Link>
              <Link
                to={{
                  pathname:
                    "https://auth.geeksforgeeks.org/user/uchiha1101/practice/",
                }}
                target="_blank"
                style={{ marginLeft: "30px", textDecoration: "none" }}
              >
                <Badge bg="success">GEEKS FOR GEEKS</Badge>
              </Link>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
