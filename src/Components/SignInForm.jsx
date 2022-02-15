import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import logo from "../static/img/githublogo.png";

const SignInForm = ({ formik, isFetching, inputRef }) => {
  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 shadow-lg rounded" md="8" xxl="6">
          <Row className="justify-content-center mt-mb-3">
            <Image className="w-25" roundedCircle alt="Enter" src={logo} />
          </Row>
          <Row className="justify-content-center">
            <Col className="col-12" sm="8" lg="6">
              <Form className="mb-4" onSubmit={formik.handleSubmit}>
                <h4 className="text-center mb-4">
                  Please, enter the credentials
                </h4>
                <Form.Group className="mb-3">
                  <FloatingLabel label="username" controlId="username">
                    <Form.Control
                      ref={inputRef}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.username && formik.errors.username
                      }
                      name="username"
                      placeholder="username"
                      disabled={isFetching}
                      required
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <FloatingLabel label="repository" controlId="repository">
                    <Form.Control
                      name="repository"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.repository && formik.errors.repository
                      }
                      placeholder="repository"
                      disabled={isFetching}
                      required
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {formik.errors.repository}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-dark"
                  disabled={isFetching}
                  className="w-100 mt-3 mb-3"
                >
                  Sign in
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
